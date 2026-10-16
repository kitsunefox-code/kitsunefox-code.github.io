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
export async function collectNews(limit = 6) {
  const all = (await Promise.all(FEEDS.map(fetchFeed))).flat();

  // 重複をまとめる（同じ話題を複数媒体が書くので、先に出たほうを残す）
  const seen = new Set();
  const uniq = [];
  for (const it of all.sort((a, b) => b.at - a.at)) {
    const k = normTitle(it.title);
    if (!k || seen.has(k) || seen.has(it.link)) continue;
    seen.add(k);
    seen.add(it.link);
    uniq.push(it);
  }

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;
  // 24時間以内を基本に、少なすぎるときだけ48時間まで広げる
  let fresh = uniq.filter((i) => i.at > 0 && now - i.at < DAY);
  if (fresh.length < limit) fresh = uniq.filter((i) => i.at > 0 && now - i.at < 2 * DAY);
  if (fresh.length === 0) fresh = uniq.slice(0, limit * 2);

  const scored = fresh.map((it) => {
    const sensitive = SENSITIVE.test(it.title);
    const topic = sensitive ? null : topicOf(it.title);
    const hours = it.at > 0 ? (now - it.at) / 3600000 : 48;
    // 新しさ＋話題の強さ。センシティブは候補の下に沈める
    const score =
      (topic?.weight ?? 8) + Math.max(0, 24 - hours) - (sensitive ? 100 : 0) - (GOSSIP.test(it.title) ? 25 : 0);
    return { ...it, sensitive, topic: topic?.key ?? (sensitive ? "要注意" : "その他"), angles: topic?.angles ?? [], score };
  });

  scored.sort((a, b) => b.score - a.score);

  // 同じ話題を2本続けて出すとbotに見えるので、1話題1本に絞る
  const perTopic = new Set();
  const picks = [];
  for (const it of scored) {
    if (it.sensitive) continue;
    if (perTopic.has(it.topic)) continue;
    perTopic.add(it.topic);
    picks.push(it);
    if (picks.length >= limit) break;
  }
  return { picks, skipped: scored.filter((s) => s.sensitive) };
}

/** 投稿文を組み立てる。見出しは書き写さない＝リンクカードに任せる */
export function newsPost(item, angleIndex = 0) {
  const angle = item.angles[angleIndex % Math.max(item.angles.length, 1)] || "";
  return [angle, "", item.link].filter((l) => l !== undefined).join("\n");
}
