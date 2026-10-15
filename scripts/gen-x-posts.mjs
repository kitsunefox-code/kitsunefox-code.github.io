// 草野球ナビ X（旧Twitter）投稿ストック生成器
//
// ● なぜ「半自動」なのか
//   Xの自動投稿は、APIを使わないブラウザ操作だと規約上グレーで凍結リスクがある。
//   いっぽう「何を書くか」を毎日考えるのが続かない本当の理由なので、
//   **文面の生成だけを自動化し、投稿は人がコピペで出す**という分け方にしている。
//   1日あたりの手間は10秒。凍結リスクはゼロ。
//
// ● 実行
//   node scripts/gen-x-posts.mjs            … 今日から7日分を作る
//   node scripts/gen-x-posts.mjs --days 14  … 14日分
//   出力: x-posts/週間投稿_YYYY-MM-DD.html（コピーボタン付き）と .md
//
// ● 伸びる形（X運用の定石に沿う）
//   ・1行目で完結させる。続きを読ませない前提で書く
//   ・リンクは本文の最後。本文だけで価値が完結していること
//   ・140字前後に収める（引用・埋め込みで全文が見える）
//   ・箇条書きは「・」で3〜5個まで
//   ・絵文字は1〜2個。ハッシュタグは #草野球 を基本1個
//   ・問いかけで終えるとリプライが付きやすい
//
// ● 書かないこと
//   出典のない数字（「草野球の◯%が…」など）は入れない。生成文に統計を混ぜない。

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "x-posts");
const HISTORY = path.join(OUT_DIR, "_history.json");
const SITE = "https://kusayakyu-navi.com";

/* ── 引数 ───────────────────────────── */
const argv = process.argv.slice(2);
const argDays = Number(argv[argv.indexOf("--days") + 1]);
const DAYS = Number.isFinite(argDays) && argDays > 0 ? Math.min(argDays, 60) : 7;

/* ── data/*.ts から素材を読む（TSをそのまま実行できないので取り出す） ── */
function readTs(file) {
  return fs.readFileSync(path.join(ROOT, "data", file), "utf8");
}

/** data/guides.ts の GUIDES から {href,title,description} を拾う */
function loadGuides() {
  const src = readTs("guides.ts");
  const body = src.slice(src.indexOf("export const GUIDES"));
  const out = [];
  const re =
    /href:\s*"([^"]+)"[\s\S]{0,200}?title:\s*"([^"]+)"[\s\S]{0,400}?description:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(body))) out.push({ href: m[1], title: m[2], desc: m[3] });
  return out;
}

/** data/tools.ts の TOOLS から {href,title,desc,badge} を拾う */
function loadTools() {
  const src = readTs("tools.ts");
  const body = src.slice(src.indexOf("export const TOOLS"));
  const out = [];
  const re =
    /href:\s*"([^"]+)"[\s\S]{0,120}?title:\s*"([^"]+)"[\s\S]{0,900}?desc:\s*"([^"]+)"[\s\S]{0,200}?badge:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(body))) out.push({ href: m[1], title: m[2], desc: m[3], badge: m[4] });
  return out;
}

const GUIDES = loadGuides();
// 土曜は必ず打順表を出すので、金曜のツール枠からは外す（2日続けて同じ物を宣伝しない）
const TOOLS = loadTools().filter((t) => t.href !== "/lineup/");

/* ── ネタの型 ────────────────────────
   曜日ごとに役割を変える。毎日同じ型だとフォローを外されるため、
   「共感 → 実用 → 道具 → 問いかけ → 準備 → ツール → 振り返り」で回す。 */

// 共感ネタ（あるある）。経験として書き、断定も統計も使わない。
const AARU = [
  "草野球あるある：集合8時と言われたら、全員が8時ちょうどに着く。アップは、ない。",
  "草野球あるある：助っ人で来た人が一番うまい。",
  "草野球あるある：「とりあえず外野で」と言われた人が、その日いちばん難しい打球を処理する。",
  "草野球あるある：バットは5本あるのに、使われるのは結局いつもの1本。",
  "草野球あるある：グラウンド整備のトンボ、毎回いちばん早く来た人が全部やっている。",
  "草野球あるある：1試合目の1回表が、その日いちばん体が動かない。",
  "草野球あるある：「今日は流す」と言っていた人が、ランナーが出た瞬間に本気になる。",
  "草野球あるある：道具を忘れてくる人は、毎回同じ人。",
  "草野球あるある：三振した人ほどベンチで理論を語りはじめる。",
  "草野球あるある：キャッチャーをやってくれる人は、チームで一番えらい。",
  "草野球あるある：雨天中止の連絡が来た瞬間、急に元気になる。",
  "草野球あるある：試合より、試合後の飯のほうが長い。",
  "草野球あるある：新品のグローブを買った日に限って、打球が飛んでこない。",
  "草野球あるある：背番号を決めるのに、ユニフォームを作るより時間がかかる。",
  "草野球あるある：40歳を越えると、走るより投げるほうが怖くなる。",
];

// 問いかけ（リプライを取りにいく）
const TOIKAKE = [
  "草野球やってる人に聞きたい。チームで「いちばん替えが利かない人」って、どのポジションですか。",
  "草野球やってる人に聞きたい。試合の朝、何時に起きてますか。",
  "草野球やってる人に聞きたい。バット、何本持ってますか。使ってるのは何本ですか。",
  "草野球やってる人に聞きたい。助っ人を呼ぶとき、どこで探してますか。",
  "草野球やってる人に聞きたい。打順、どうやって決めてますか。くじ？監督の独断？",
  "草野球やってる人に聞きたい。チームの平均年齢、いくつですか。",
  "草野球やってる人に聞きたい。年間でいくらぐらい使ってますか。",
  "草野球やってる人に聞きたい。ユニフォーム、何年着てますか。",
  "草野球やってる人に聞きたい。試合中、いちばん揉めるルールって何ですか。",
  "草野球やってる人に聞きたい。「このポジションだけはやりたくない」ってどこですか。",
  "草野球やってる人に聞きたい。朝イチの試合と、夕方の試合、どっちが好きですか。",
  "草野球やってる人に聞きたい。チームのLINEグループ、既読だけつけて誰も返さない時間ありますか。",
];

// 道具の豆知識。断定を避け、「〜と言われている」「〜する人が多い」の範囲にとどめる。
const GEAR_TIPS = [
  {
    head: "軟式バットで迷ったら、まず決めるのはここ。",
    lines: ["・金属＝軽くて振りやすい", "・カーボン＝飛距離が出やすい", "・ビヨンド系＝打感がやわらかい"],
    tail: "長さと重さは「振り切れるか」が先。重いほうが飛ぶ、とは限りません。",
    href: "/bat-shindan/",
  },
  {
    head: "グローブの型、ポジションより先に見るのは「ウェブ（網）」です。",
    lines: ["・内野＝捕って早く出す形", "・外野＝深く入る形", "・投手＝球種を隠せる形"],
    tail: "店で同じに見えても、使うと一番ちがうのがここです。",
    href: "/glove-shindan/",
  },
  {
    head: "スパイクで金具を買う前に、必ず確認すること。",
    lines: ["・所属リーグの規定", "・よく使う球場（人工芝は不可が多い）", "・大会ごとの個別ルール"],
    tail: "複数の球場を回るなら、使える範囲が広い樹脂ポイントが無難です。",
    href: "/spikes-shindan/",
  },
  {
    head: "バッティンググローブは消耗品です。",
    lines: ["・手のひらが擦り切れたら替えどき", "・破れたまま使うと握りがずれる", "・サイズは実寸を測って合わせる"],
    tail: "月に何度も試合があるなら、最初からコスパ重視を選ぶほうが結果的に安くつきます。",
    href: "/batting-gloves-shindan/",
  },
  {
    head: "グローブの手入れ、やりすぎもよくない。",
    lines: ["・オイルは塗りすぎると重くなる", "・濡れた日は陰干し（直射日光とドライヤーはNG）", "・型崩れ防止はボールを挟んで紐でしばる"],
    tail: "「毎回オイル」より「使ったら土を落とす」のほうが寿命に効きます。",
    href: "/guide/glove-care/",
  },
  {
    head: "試合の翌日がつらい人へ。回復の本体は、実はストレッチより睡眠です。",
    lines: ["・ストレッチは数十分", "・睡眠は6〜8時間", "・寝返りが打ちにくいと朝に腰が固まる"],
    tail: "枕の高さはタオルで変えて試せます。寝具の買い替えはそのあとで十分。",
    href: "/guide/sleep-recovery/",
  },
  {
    head: "ユニフォームを作るとき、見落とされがちなのが納期です。",
    lines: ["・昇華は全面に柄を入れられる", "・刺繍は質感が出るが時間がかかる", "・初戦が決まっているなら逆算が先"],
    tail: "「安さ」より「間に合うか」で絞ると、候補が一気に減って決めやすくなります。",
    href: "/hikaku/",
  },
  {
    head: "試合前の準備、忘れものが多いのはこの3つ。",
    lines: ["・ボール（相手任せにしない）", "・救急セットと氷", "・スコアブックと筆記具"],
    tail: "道具より先に、これを誰が持つか決めておくと当日が静かです。",
    href: "/guide/gear-checklist/",
  },
];

/* ── Xの文字数 ─────────────────────────
   Xは「重み付き280」で数える。日本語などは1文字=2、半角英数は1。
   URLはt.coに短縮されるため、長さに関係なく一律23として数えられる。
   素の文字数で判定すると、収まっている投稿まで警告が出てしまう。 */
const URL_RE = /https?:\/\/\S+/g;

function weightedLength(text) {
  const urls = text.match(URL_RE) || [];
  const rest = text.replace(URL_RE, "");
  let w = urls.length * 23;
  for (const ch of rest) {
    const c = ch.codePointAt(0);
    const one =
      (c >= 0x0000 && c <= 0x10ff) ||
      (c >= 0x2000 && c <= 0x200a) ||
      (c >= 0x2010 && c <= 0x201f) ||
      (c >= 0x2032 && c <= 0x2037);
    w += one ? 1 : 2;
  }
  return w;
}
const X_LIMIT = 280;

/* ── 文面を組み立てる ─────────────────── */
const WDAY = ["日", "月", "火", "水", "木", "金", "土"];

function pick(arr, used, key) {
  // 使い回しを避ける。全部使い切ったら履歴をリセットする
  const fresh = arr.filter((_, i) => !used[key]?.includes(i));
  const pool = fresh.length > 0 ? fresh : arr;
  if (fresh.length === 0) used[key] = [];
  const idx = Math.floor(Math.random() * pool.length);
  const realIdx = arr.indexOf(pool[idx]);
  (used[key] ||= []).push(realIdx);
  return arr[realIdx];
}

function gearPost(t) {
  return [t.head, "", ...t.lines, "", t.tail, "", `${SITE}${t.href}`, "", "#草野球"].join("\n");
}

function toolPost(tool) {
  // 1文目だけだと「4問・約30秒。」で終わってしまうので、60字前後になるまで文を足す
  const sentences = tool.desc.split("。").filter(Boolean);
  let line = "";
  for (const t of sentences) {
    if (line && [...line].length > 60) break;
    line += t + "。";
  }
  return [`${tool.title}を作りました。`, "", line, "登録不要・無料です。", "", `${SITE}${tool.href}`, "", "#草野球"].join(
    "\n"
  );
}

function guidePost(g) {
  return [`${g.title.replace(/【.*?】/g, "")}`, "", g.desc, "", `${SITE}${g.href}`, "", "#草野球"].join("\n");
}

function lineupPost() {
  return [
    "今日オーダーを組む人へ。名前を入れるだけで打順表が画像になるやつ、作りました。",
    "",
    "・守備位置つき",
    "・打率も載せられる",
    "・LINEに貼れる文字コピーも同時に出る",
    "",
    "次の試合は相手と日付を変えるだけ。",
    "",
    `${SITE}/lineup/`,
    "",
    "#草野球",
  ].join("\n");
}

/** 曜日ごとの役割 */
function makeDay(date, used) {
  const w = date.getDay();
  const label = `${date.getMonth() + 1}/${date.getDate()}（${WDAY[w]}）`;

  // 曜日ごとに型を変える。土日は試合当日なので実用（ツール）を前に出す。
  switch (w) {
    case 1: // 月：週末の余韻。共感で入る
      return { label, time: "20:00", kind: "共感（あるある）", text: pick(AARU, used, "aaru") + "\n\n#草野球" };
    case 2: // 火：道具の豆知識
      return { label, time: "12:15", kind: "道具の豆知識", text: gearPost(pick(GEAR_TIPS, used, "gear")) };
    case 3: // 水：問いかけ（リプを取る）
      return { label, time: "21:00", kind: "問いかけ", text: pick(TOIKAKE, used, "toi") + "\n\n#草野球" };
    case 4: // 木：ガイド記事
      return { label, time: "12:15", kind: "ガイド記事", text: guidePost(pick(GUIDES, used, "guide")) };
    case 5: // 金：週末前。診断・ツールへ
      return { label, time: "19:30", kind: "診断・ツール", text: toolPost(pick(TOOLS, used, "tool")) };
    case 6: // 土：試合当日の朝。打順表
      return { label, time: "07:00", kind: "試合当日（打順表）", text: lineupPost() };
    default: // 日：試合当日の朝。共感で軽く
      return { label, time: "07:30", kind: "共感（あるある）", text: pick(AARU, used, "aaru") + "\n\n#草野球" };
  }
}

/* ── 出力 ───────────────────────────── */
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function buildHtml(days, madeOn) {
  const cards = days
    .map(
      (d, i) => `
  <article class="card">
    <header>
      <span class="day">${esc(d.label)}</span>
      <span class="time">${esc(d.time)}</span>
      <span class="kind">${esc(d.kind)}</span>
      <span class="len">${weightedLength(d.text)} / ${X_LIMIT}</span>
    </header>
    <pre id="p${i}">${esc(d.text)}</pre>
    <div class="ops">
      <button data-i="${i}">コピー</button>
      <a href="https://x.com/intent/post?text=${encodeURIComponent(d.text)}" target="_blank" rel="noopener">Xを開いて下書きに入れる</a>
    </div>
  </article>`
    )
    .join("");

  return `<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>草野球ナビ Xの投稿ストック ${esc(madeOn)}</title>
<style>
  :root{--ink:#1c1b18;--paper:#faf9f6;--accent:#b3472e;--muted:#55524b;--line:#ddd9d1}
  *{box-sizing:border-box}
  body{margin:0;padding:22px 16px 60px;background:var(--paper);color:var(--ink);
       font-family:"Yu Gothic Medium","Hiragino Kaku Gothic ProN","Noto Sans JP",Meiryo,sans-serif;
       line-height:1.75;max-width:720px;margin-inline:auto}
  h1{font-size:20px;margin:0 0 4px}
  .lead{font-size:13px;color:var(--muted);margin:0 0 22px}
  .card{border:1px solid var(--line);background:#fff;margin-bottom:16px}
  header{display:flex;gap:10px;align-items:center;flex-wrap:wrap;
         padding:10px 14px;background:#f3efe8;border-bottom:1px solid var(--line);font-size:12px}
  .day{font-weight:800;font-size:14px}
  .time{color:var(--accent);font-weight:700}
  .kind{color:var(--muted)}
  .len{margin-left:auto;color:var(--muted)}
  pre{margin:0;padding:16px 14px;white-space:pre-wrap;word-break:break-word;
      font-family:inherit;font-size:15px}
  .ops{display:flex;gap:8px;padding:0 14px 14px;flex-wrap:wrap}
  button,.ops a{font:inherit;font-size:13px;font-weight:700;padding:9px 14px;
      border:1px solid var(--ink);background:var(--ink);color:#fff;cursor:pointer;text-decoration:none}
  .ops a{background:#fff;color:var(--ink)}
  button.done{background:#2f6b4f;border-color:#2f6b4f}
  .note{font-size:12.5px;color:var(--muted);border-top:1px solid var(--line);padding-top:14px;margin-top:26px}
</style></head><body>
<h1>Xの投稿ストック（${esc(madeOn)} 作成）</h1>
<p class="lead">1日1本。表示時刻のあたりに、コピーして自分で投稿してください。自動投稿はしません（凍結リスクを取らないため）。</p>
${cards}
<p class="note">投稿後に反応がよかった型は、次の生成で増やします。文面を直してから出すのも歓迎です。<br>
再生成： <code>node scripts/gen-x-posts.mjs</code></p>
<script>
document.querySelectorAll("button[data-i]").forEach(function(b){
  b.addEventListener("click", function(){
    var t = document.getElementById("p" + b.dataset.i).textContent;
    navigator.clipboard.writeText(t).then(function(){
      b.textContent = "コピーしました"; b.classList.add("done");
      setTimeout(function(){ b.textContent = "コピー"; b.classList.remove("done"); }, 1800);
    });
  });
});
</script>
</body></html>`;
}

function buildMd(days, madeOn) {
  const head = `# 草野球ナビ Xの投稿ストック（${madeOn} 作成）\n\n1日1本。自動投稿はしません。コピーして自分で投稿してください。\n`;
  return (
    head +
    days
      .map(
        (d) =>
          `\n---\n\n## ${d.label} ${d.time}　${d.kind}（${weightedLength(d.text)} / ${X_LIMIT}）\n\n\`\`\`\n${d.text}\n\`\`\`\n`
      )
      .join("")
  );
}

/* ── 実行 ───────────────────────────── */
fs.mkdirSync(OUT_DIR, { recursive: true });

let used = {};
try {
  used = JSON.parse(fs.readFileSync(HISTORY, "utf8"));
} catch {
  /* 初回は履歴なし */
}

const start = new Date();
const days = [];
for (let i = 0; i < DAYS; i++) {
  const d = new Date(start);
  d.setDate(start.getDate() + i);
  days.push(makeDay(d, used));
}

const p = (n) => String(n).padStart(2, "0");
const stamp = `${start.getFullYear()}-${p(start.getMonth() + 1)}-${p(start.getDate())}`;
const htmlPath = path.join(OUT_DIR, `週間投稿_${stamp}.html`);
const mdPath = path.join(OUT_DIR, `週間投稿_${stamp}.md`);

fs.writeFileSync(htmlPath, buildHtml(days, stamp), "utf8");
fs.writeFileSync(mdPath, buildMd(days, stamp), "utf8");
fs.writeFileSync(HISTORY, JSON.stringify(used, null, 2), "utf8");

// 長すぎる文面は警告する（Xの上限は重み付き280）
const over = days.filter((d) => weightedLength(d.text) > X_LIMIT);

console.log(`素材: ガイド${GUIDES.length}本 / ツール${TOOLS.length}本`);
console.log(`${DAYS}日分を作成しました。`);
console.log(`  ${htmlPath}`);
console.log(`  ${mdPath}`);
if (over.length > 0) {
  console.log(`\n⚠ Xの上限（${X_LIMIT}）を超えた投稿が${over.length}件あります。短くしてください:`);
  for (const d of over) console.log(`   ${d.label} ${d.kind} … ${weightedLength(d.text)}`);
}
