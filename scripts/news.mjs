// 野球ニュースの取得・選別・下書き化。
//
// ● 方針（著作権とXの規約）
//   ・記事本文はコピーしない。出すのは「自分の一言＋リンク」だけ。
//     見出しとサムネはXがリンクカードとして自動で出すので、本文に書き写す必要がない。
//   ・画像の転載もしない（カードとして出るぶんは各社が許容している形）。
//   ・RSSをそのまま流すbotはXのスパム規定に触れうる。必ず人が一言つけて、手で出す。
//
// ● 一言（angle）はあくまで「型」
//   見出しの中身までは機械で読めないので、話題のキーワードから当たりやすい型を出すだけ。
//   出す前に見出しを見て直すこと。センシティブな話題には型を付けず「見送り」に回す。

const FEEDS = [
  { name: "Full-Count", url: "https://full-count.jp/feed/", baseballOnly: true },
  { name: "BASEBALL KING", url: "https://baseballking.jp/feed/", baseballOnly: true },
  { name: "ベースボールチャンネル", url: "https://www.baseballchannel.jp/feed/", baseballOnly: true },
  // NHKはスポーツ全般なので、野球の語が入ったものだけ拾う
  { name: "NHK", url: "https://www3.nhk.or.jp/rss/news/cat7.xml", baseballOnly: false },
];

const BASEBALL_WORDS =
  /野球|プロ野球|球団|NPB|MLB|メジャー|ドラフト|日本シリーズ|クライマックス|侍ジャパン|甲子園|大谷|投手|打者|本塁打|打点|打率/;

/** 出したらまずい、あるいは軽口を付けてはいけない話題。型を付けずに「見送り」へ回す */
/** 野球そのものではない「周辺の話題」。草野球ナビの口から出すには薄いので順位を下げる */
const GOSSIP =
  /夫人|妻|結婚|熱愛|私服|愛犬|美人|可愛|かわいい|インスタ|SNSで話題|ネット騒然|反響|沸いた|衝撃の一枚|ショット公開/;

const SENSITIVE =
  /死去|訃報|逝去|お別れ|逮捕|書類送検|起訴|送検|不祥事|暴行|暴力|パワハラ|セクハラ|薬物|違法|賭博|八百長|事故|重傷|骨折|手術|離脱|降板|病|入院|解雇|戦力外|退団|解任|謝罪|炎上|差別|告訴|裁判/;

/**
 * 話題ごとの「一言の型」。内容の細部に依存しない言い方だけを置く。
 * 草野球ナビのアカウントなので、どれも最後は草野球側に着地させる。
 */
const ANGLES = [
  {
    key: "ドラフト",
    match: /ドラフト|指名|育成選手|支配下/,
    weight: 30,
    angles: [
      "ドラフトの日は、野球をやってる人間の空気がちょっと変わる。うちのチームにもスカウトが来ないかな、とは誰も言わないけど全員思ってる。",
      "指名された選手の話を読むと、毎回「自分が野球をやめなかった理由」を思い出す。",
    ],
  },
  {
    key: "日本シリーズ・CS",
    match: /日本シリーズ|クライマックス|CS|優勝|胴上げ|日本一/,
    weight: 30,
    angles: [
      "この時期の試合は、見たあとに素振りしたくなる。",
      "短期決戦は、うまい下手より「迷わなかったほう」が勝つ。草野球でも同じで、迷ったスイングはだいたい差し込まれる。",
    ],
  },
  {
    key: "FA・移籍",
    match: /FA|移籍|トレード|契約|入団|復帰|メジャー挑戦|ポスティング/,
    weight: 24,
    angles: [
      "移籍の話は、毎回ちょっと寂しい。草野球でも、転勤でいなくなる人が一番うまかったりする。",
      "来季の並びが変わる。こういうニュースを肴に飲むのが、オフの楽しみでもある。",
    ],
  },
  {
    key: "本塁打・好投",
    match: /本塁打|ホームラン|一発|完封|完投|無失点|奪三振|サヨナラ|逆転/,
    weight: 20,
    angles: [
      "打った瞬間に分かるやつ。草野球だと、一生に何本あるかという種類の当たり。",
      "この一本のために何百回も振ってるんだよな、と思うと見方が変わる。",
    ],
  },
  {
    key: "大谷・MLB",
    match: /大谷|ドジャース|ヤンキース|ワールドシリーズ|メジャー|MLB/,
    weight: 22,
    angles: [
      "数字がもう現実感ない。でも元をたどれば同じ軟式のボールから始まってる人が多いと思うと、野球っておもしろい。",
      "朝からこのニュースを見ると、週末の試合が楽しみになる。",
    ],
  },
  {
    key: "記録・表彰",
    match: /記録|達成|タイトル|最多|最優秀|新人王|MVP|ベストナイン|ゴールデングラブ|通算/,
    weight: 20,
    angles: [
      "記録は積み上げた人にしか出ない。草野球でも、成績をつけ始めると見え方が変わります。",
      "こういう数字を見ると、自分の打率も数えたくなる。",
    ],
  },
  {
    key: "引退",
    match: /引退|現役引退|ラストゲーム|退任/,
    weight: 22,
    // 引退は茶化さない。敬意だけにとどめる型を置く。
    angles: [
      "お疲れさまでした、としか言えない。長く続けることのほうが、うまくなることよりずっと難しい。",
    ],
  },
  {
    key: "監督・采配",
    match: /監督|コーチ|采配|就任|続投|打順|起用/,
    weight: 16,
    angles: [
      "打順と起用は、見てる側がいちばん勝手なことを言える領域。草野球の監督も同じ目に遭ってると思う。",
      "人をどこに置くかで結果が変わるのは、プロも草野球も変わらない。",
    ],
  },
  {
    key: "道具",
    match: /バット|グラブ|グローブ|スパイク|ボール|用具|ユニフォーム|ヘルメット/,
    weight: 18,
    angles: [
      "道具の話は何歳になっても楽しい。",
      "プロが使ってると、同じメーカーのを見にいきたくなる。わかる。",
    ],
  },
  {
    key: "高校野球・アマ",
    match: /高校野球|甲子園|大学野球|社会人野球|少年野球|クラブチーム/,
    weight: 16,
    angles: [
      "この年代の試合は、上手い下手より気持ちで見てしまう。",
      "野球を続けられる場所が増えるのはいいことだと思う。大人になってからでも、草野球という続け方がある。",
    ],
  },
];

/**
 * 勝った話か負けた話かで、付けてよい一言が変わる。
 * 「敗退」の記事に明るい型を付けると一発で冷める。話題の型より優先して当てる。
 */
const RESULT_ANGLES = [
  {
    key: "敗退・終戦",
    match: /敗退|敗戦|終戦|連敗|屈辱|悔し|涙|散っ|夢潰え|及ばな|消滅|逆転負け|サヨナラ負け|崩れ/,
    angles: [
      "終わるときは、あっけない。見てるだけでこれなんだから、やってる側はもっとだと思う。",
      "負けた日の夜が長いのは、プロも草野球も変わらない。",
      "勝ち続けるのが異常なのであって、負けるほうが普通なんだよな。",
      "この悔しさを来年まで持っていける人が、強い。",
      "こういう日は、何も言えない。お疲れさまでした。",
      "強いチームが必ず勝つわけではない、というのを毎年見せられる。",
    ],
  },
  {
    key: "勝利・突破",
    match: /勝利|勝ち|進出|突破|優勝|日本一|胴上げ|連勝|逆転勝|サヨナラ勝|王手|制し/,
    angles: [
      "勝った日の空気は、いくつになっても同じ。",
      "短期決戦は、うまい下手より「迷わなかったほう」が勝つ。草野球でも、迷ったスイングはだいたい差し込まれる。",
      "勝ちが決まった瞬間のベンチの顔が全部だと思う。",
      "この勢いのまま週末の試合に行きたい。",
      "ここまで来ると、技術より先に雰囲気で決まる気がする。",
    ],
  },
];

function resultAnglesOf(title) {
  for (const r of RESULT_ANGLES) if (r.match.test(title)) return r;
  return null;
}

/** 素朴なRSSパーサ。item単位で title/link/pubDate を取り出すだけ */
function parseRss(xml, sourceName) {
  const out = [];
  const items = xml.match(/<item[\s>][\s\S]*?<\/item>/g) || [];
  for (const it of items) {
    const pick = (tag) => {
      const m = it.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
      if (!m) return "";
      return m[1]
        .replace(/^\s*<!\[CDATA\[/, "")
        .replace(/\]\]>\s*$/, "")
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#8217;|&#039;|&apos;/g, "'")
        .replace(/&nbsp;/g, " ")
        .trim();
    };
    const title = pick("title");
    const link = pick("link");
    if (!title || !link) continue;
    const dateStr = pick("pubDate") || pick("dc:date") || "";
    const t = Date.parse(dateStr);
    out.push({ title, link, at: Number.isFinite(t) ? t : 0, source: sourceName });
  }
  return out;
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; kusayakyu-navi/1.0)" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = parseRss(xml, feed.name);
    return feed.baseballOnly ? items : items.filter((i) => BASEBALL_WORDS.test(i.title));
  } catch {
    return []; // 1社落ちても他で出せるようにする
  }
}

/** 見出しの重複判定用。媒体ごとに言い回しが違うので、記号と助詞を落として比べる */
function normTitle(t) {
  return t
    .replace(/[【】「」『』［］（）()[\]、。・…！？!?　\s"'“”‐―ー\-–—]/g, "")
    .slice(0, 22);
}

/**
 * 見出しから「その出来事を指す語」を取り出す。
 * カタカナ3字以上・漢字2字以上・英数2字以上を拾い、どこにでも出る語は捨てる。
 */
const STOP_TERMS = new Set([
  "選手", "監督", "試合", "今季", "来季", "昨季", "今日", "今朝", "今年", "昨年", "去年",
  "発表", "公開", "報道", "記者", "取材", "話題", "注目", "期待", "可能性", "コメント",
  "ファン", "チーム", "球団", "野球", "プロ野球", "自身", "初めて", "一方", "本当", "存在",
]);

function termsOf(title) {
  const t = title.replace(/[【】「」『』［］（）()[\]、。・…！？!?　]/g, " ");
  const out = new Set();
  for (const m of t.match(/[ァ-ヴー]{3,}/g) || []) out.add(m);
  for (const m of t.match(/[一-龥]{2,}/g) || []) out.add(m);
  for (const m of t.match(/[A-Za-z0-9]{2,}/g) || []) out.add(m.toUpperCase());
  for (const w of out) if (STOP_TERMS.has(w)) out.delete(w);
  return out;
}

/** 2語以上を共有していたら「同じ出来事」とみなす */
function sameEvent(a, b) {
  let n = 0;
  for (const w of a) {
    if (b.has(w)) n++;
    if (n >= 2) return true;
  }
  return false;
}

function topicOf(title) {
  let best = null;
  for (const a of ANGLES) {
    if (a.match.test(title) && (!best || a.weight > best.weight)) best = a;
  }
  return best;
}

/**
 * 今日出す候補を返す。
 * @param {number} limit 何本まで出すか
 */
/**
 * 今日の候補を返す。
 *
 * ● 注目度の測り方
 *   インプレッション数は外から取れない。代わりに使えるのが
 *   **何社が同じ話題を書いたか（coverage）**。各社が独立に「これは出す」と
 *   判断した本数なので、世間の注目度の代理指標としてはかなり素直に効く。
 *   これに新しさと話題の強さを足してスコアにする。
 *
 * @param {number} limit 何本まで返すか
 */
export async function collectNews(limit = 6) {
  const all = (await Promise.all(FEEDS.map(fetchFeed))).flat();

  // 同じ話題をまとめつつ、何社が書いたかを数える
  const groups = new Map();
  for (const it of all.sort((a, b) => b.at - a.at)) {
    const k = normTitle(it.title);
    if (!k) continue;
    const g = groups.get(k);
    if (g) {
      if (!g.sources.includes(it.source)) g.sources.push(it.source);
      if (it.at > g.at) { g.at = it.at; } // 最新の配信時刻を採る
    } else {
      groups.set(k, { ...it, key: k, sources: [it.source] });
    }
  }
  const uniq = [...groups.values()];

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;
  let fresh = uniq.filter((i) => i.at > 0 && now - i.at < DAY);
  if (fresh.length < limit) fresh = uniq.filter((i) => i.at > 0 && now - i.at < 2 * DAY);
  if (fresh.length === 0) fresh = uniq.slice(0, limit * 2);

  // 各社が別々の見出しを書くので、見出しの一致では同じ出来事をまとめられない。
  // 語の重なりで「同じ出来事を書いた記事」を数え、それを注目度とする。
  const withTerms = fresh.map((it) => ({ ...it, terms: termsOf(it.title) }));
  for (const it of withTerms) {
    const related = withTerms.filter((o) => o !== it && sameEvent(it.terms, o.terms));
    it.related = related.length;
    it.coverage = new Set([...it.sources, ...related.flatMap((r) => r.sources)]).size;
  }

  const scored = withTerms.map((it) => {
    const sensitive = SENSITIVE.test(it.title);
    const topic = sensitive ? null : topicOf(it.title);
    // 勝敗がはっきり書かれている記事は、話題の型よりそちらを優先する
    const result = sensitive ? null : resultAnglesOf(it.title);
    const hours = it.at > 0 ? (now - it.at) / 3600000 : 48;
    const coverage = it.coverage;
    // 同じ出来事を書いた記事の本数が、いちばん素直な注目度の代理指標になる
    const score =
      it.related * 14 +
      coverage * 10 +
      (topic?.weight ?? 8) +
      Math.max(0, 24 - hours) -
      (sensitive ? 1000 : 0) -
      (GOSSIP.test(it.title) ? 25 : 0);
    return {
      ...it,
      terms: undefined,
      coverage,
      related: it.related,
      sensitive,
      topic: result?.key ?? topic?.key ?? (sensitive ? "要注意" : "その他"),
      angles: result?.angles ?? topic?.angles ?? [],
      score: Math.round(score),
    };
  });

  scored.sort((a, b) => b.score - a.score);

  // 同じ話題を続けて出すとbotに見えるので、1回の出力では1話題1本に絞る
  const perTopic = new Set();
  const picks = [];
  for (const it of scored) {
    if (it.sensitive) continue;
    if (perTopic.has(it.topic)) continue;
    perTopic.add(it.topic);
    picks.push(it);
    if (picks.length >= limit) break;
  }
  return { picks, skipped: scored.filter((s) => s.sensitive), all: scored };
}

/** 投稿文を組み立てる。見出しは書き写さない＝リンクカードに任せる */
export function newsPost(item, angleIndex = 0) {
  const angle = item.angles[angleIndex % Math.max(item.angles.length, 1)] || "";
  return [angle, "", item.link].filter((l) => l !== undefined).join("\n");
}
