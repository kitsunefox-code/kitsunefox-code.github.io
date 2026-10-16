// 毎時1本、注目度の高い野球ニュースを出す。
//
//   node scripts/hourly.mjs          … 1回ぶん実行（タスクスケジューラから毎時呼ぶ）
//   node scripts/hourly.mjs --dry    … 投稿せず、何が出るかだけ見る
//   node scripts/hourly.mjs --force  … 時間帯・間隔の制限を無視して1本出す
//
// ● 動き
//   1. 野球ニュースを集め、**何社が同じ話題を書いたか**で注目度を採点する
//   2. 既に出した話題・リンクを state から除く
//   3. キュー（Claudeが書いた本物のコメント）があればそれを使い、無ければ型で組む
//   4. 鍵があればXへ投稿、無ければ「いま出すやつ」ページに積んで人が出す
//
// ● 無料枠に合わせた上限
//   X APIの無料枠は投稿が月500件（≒1日16件）。24時間まわすと超えるので、
//   稼働は朝7時〜22時の16スロットに絞る。深夜は見る人も少ない。

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectNews, newsPost } from "./news.mjs";
import { loadEnv, hasCredentials, postTweet } from "./x-client.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "x-posts");
const STATE_FILE = path.join(OUT_DIR, "_posted.json");
const QUEUE_FILE = path.join(OUT_DIR, "queue.json");
const LOG_FILE = path.join(OUT_DIR, "_hourly.log");
const NOW_PAGE = path.join(OUT_DIR, "いま出すやつ.html");

const argv = process.argv.slice(2);
const DRY = argv.includes("--dry");
const FORCE = argv.includes("--force");

/** 稼働時間（この時間帯だけ出す。無料枠=1日16件に合わせてある） */
const START_HOUR = 7;
const END_HOUR = 22;
const MAX_PER_DAY = 16;
/** 同じ話題を出さない期間 */
const COOLDOWN_DAYS = 5;

const jread = (f, fb) => {
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return fb;
  }
};
const jwrite = (f, v) => fs.writeFileSync(f, JSON.stringify(v, null, 2), "utf8");

function log(line) {
  const stamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  const text = `${stamp}  ${line}\n`;
  fs.appendFileSync(LOG_FILE, text, "utf8");
  console.log(line);
}

const todayStr = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

/** 人が出すぶんを溜めておくページ。常に最新が一番上 */
function writeNowPage(items) {
  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const cards = items
    .slice(0, 40)
    .map(
      (it, i) => `
  <article class="card${it.posted ? " done" : ""}">
    <header>
      <span class="t">${esc(it.at)}</span>
      <span class="topic">${esc(it.topic)}</span>
      <span class="cov">${it.coverage}社が報道</span>
      ${it.posted ? '<span class="ok">投稿済み</span>' : '<span class="todo">未投稿</span>'}
    </header>
    <p class="headline"><a href="${esc(it.link)}" target="_blank" rel="noopener">${esc(it.title)}</a></p>
    <pre id="p${i}">${esc(it.text)}</pre>
    <div class="ops">
      <button data-i="p${i}">コピー</button>
      <a href="https://x.com/intent/post?text=${encodeURIComponent(it.text)}" target="_blank" rel="noopener">Xで開く</a>
    </div>
  </article>`
    )
    .join("");

  const html = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="300">
<title>いま出すやつ｜草野球ナビ</title>
<style>
  :root{--ink:#1c1b18;--paper:#faf9f6;--accent:#b3472e;--muted:#55524b;--line:#ddd9d1}
  *{box-sizing:border-box}
  body{margin:0;padding:20px 14px 60px;background:var(--paper);color:var(--ink);
       font-family:"Yu Gothic Medium","Hiragino Kaku Gothic ProN","Noto Sans JP",Meiryo,sans-serif;
       line-height:1.7;max-width:640px;margin-inline:auto}
  h1{font-size:18px;margin:0 0 4px}
  .lead{font-size:12.5px;color:var(--muted);margin:0 0 18px}
  .card{border:1px solid var(--line);background:#fff;margin-bottom:12px}
  .card.done{opacity:.5}
  header{display:flex;gap:9px;align-items:center;flex-wrap:wrap;
         padding:8px 12px;background:#f3efe8;border-bottom:1px solid var(--line);font-size:11.5px}
  .t{font-weight:800}
  .topic,.cov{color:var(--muted)}
  .cov{font-weight:700;color:var(--accent)}
  .ok{margin-left:auto;color:#2f6b4f;font-weight:700}
  .todo{margin-left:auto;color:var(--accent);font-weight:700}
  .headline{margin:0;padding:11px 12px 2px;font-size:13px;font-weight:700;line-height:1.55}
  .headline a{color:var(--ink)}
  pre{margin:0;padding:10px 12px;white-space:pre-wrap;word-break:break-word;font-family:inherit;font-size:14.5px}
  .ops{display:flex;gap:8px;padding:0 12px 12px}
  button,.ops a{font:inherit;font-size:12.5px;font-weight:700;padding:8px 13px;
      border:1px solid var(--ink);background:var(--ink);color:#fff;cursor:pointer;text-decoration:none}
  .ops a{background:#fff;color:var(--ink)}
  button.c{background:#2f6b4f;border-color:#2f6b4f}
</style></head><body>
<h1>いま出すやつ</h1>
<p class="lead">毎時0分に更新。上が最新です。「○社が報道」が注目度の目安（各社が独立に出すと判断した本数）。5分ごとに自動で読み直します。</p>
${cards || '<p class="lead">まだありません。</p>'}
<script>
document.querySelectorAll("button[data-i]").forEach(function (b) {
  b.addEventListener("click", function () {
    navigator.clipboard.writeText(document.getElementById(b.dataset.i).textContent).then(function () {
      b.textContent = "コピーした"; b.classList.add("c");
      setTimeout(function () { b.textContent = "コピー"; b.classList.remove("c"); }, 1600);
    });
  });
});
</script>
</body></html>`;
  fs.writeFileSync(NOW_PAGE, html, "utf8");
}

/* ── 実行 ───────────────────────────── */
fs.mkdirSync(OUT_DIR, { recursive: true });

const hour = new Date().getHours();
if (!FORCE && (hour < START_HOUR || hour > END_HOUR)) {
  log(`skip: 稼働時間外（${START_HOUR}時〜${END_HOUR}時）`);
  process.exit(0);
}

const state = jread(STATE_FILE, { posted: [], counts: {} });
const today = todayStr();
const todayCount = state.counts[today] || 0;
if (!FORCE && todayCount >= MAX_PER_DAY) {
  log(`skip: 今日はもう${todayCount}件出した（上限${MAX_PER_DAY}＝APIの無料枠に合わせた数）`);
  process.exit(0);
}

const cutoff = Date.now() - COOLDOWN_DAYS * 24 * 3600 * 1000;
state.posted = state.posted.filter((p) => p.ts > cutoff); // 古い履歴は捨てる
const usedLinks = new Set(state.posted.map((p) => p.link));
const usedKeys = new Set(state.posted.map((p) => p.key));
const usedTopics = state.posted.slice(-3).map((p) => p.topic); // 直近3本と同じ話題は避ける

const news = await collectNews(30);
const candidates = news.all.filter(
  (it) => !it.sensitive && !usedLinks.has(it.link) && !usedKeys.has(it.key) && !usedTopics.includes(it.topic)
);

if (candidates.length === 0) {
  log("skip: 出せる新しいニュースがない（既出か、センシティブのみ）");
  process.exit(0);
}

const pick = candidates[0];

// キューに人/Claudeが書いた本物のコメントがあればそれを優先する
const queue = jread(QUEUE_FILE, []);
const queued = queue.find((q) => !q.used && (q.link === pick.link || q.key === pick.key));
let text;
let source;
if (queued) {
  text = [queued.comment, "", pick.link].join("\n");
  queued.used = true;
  source = "キュー（書き下ろし）";
} else {
  // 型を使う。同じ型が続かないよう、出した回数で候補をずらす
  const idx = state.posted.filter((p) => p.topic === pick.topic).length;
  text = newsPost(pick, idx);
  source = "型";
}

const stampHm = new Date().toTimeString().slice(0, 5);
const record = {
  at: `${today} ${stampHm}`,
  ts: Date.now(),
  key: pick.key,
  link: pick.link,
  title: pick.title,
  topic: pick.topic,
  coverage: pick.coverage,
  score: pick.score,
  text,
  posted: false,
};

if (DRY) {
  console.log(`--- dry run ---\n注目度 ${pick.score}（${pick.coverage}社）／${pick.topic}／文面は${source}`);
  console.log(pick.title);
  console.log("---");
  console.log(text);
  process.exit(0);
}

const env = loadEnv(OUT_DIR);
if (hasCredentials(env)) {
  try {
    const res = await postTweet(env, text);
    record.posted = true;
    record.tweetId = res?.data?.id || null;
    log(`posted: ${pick.topic}／${pick.coverage}社／${pick.title.slice(0, 40)}… (id=${record.tweetId})`);
  } catch (e) {
    // 枠切れ・権限不足はここで分かるようにログに残し、人が出せるよう積んでおく
    log(`FAILED(${e.status ?? "?"}): ${e.message}`);
  }
} else {
  log(`queued(鍵なし): ${pick.topic}／${pick.coverage}社／${pick.title.slice(0, 40)}…`);
}

state.posted.push(record);
state.counts[today] = todayCount + 1;
jwrite(STATE_FILE, state);
if (queued) jwrite(QUEUE_FILE, queue);

writeNowPage([...state.posted].reverse());
console.log(`→ ${NOW_PAGE}`);
