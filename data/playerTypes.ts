// 野球選手タイプ診断の「タイプ」定義。
// 診断コンポーネント・タイプ解説ページ・OGP生成スクリプトで共有する単一の情報源。
import { PLAYERS, type Player, type Trait } from "./players";

export type PlayerType = {
  slug: string;
  name: string; // 「型」は付けない（表示側で付与）
  emoji: string; // シェア文言（プレーンテキスト）専用。UI表示にはiconを使う
  icon: string; // 表示用アイコン（= slugと同じキーでdata/icons.tsを参照）
  desc: string; // 一言サマリー
  long: string; // 解説（SEO本文）
  advice: string; // 道具えらびの傾向
  adviceHref: string; // 関連する診断・比較ページ
  adviceCta: string;
  match: Trait[]; // 代表選手を拾うための資質
};

type PlayerTypeRaw = Omit<PlayerType, "icon">;

const PLAYER_TYPES_RAW: PlayerTypeRaw[] = [
  {
    slug: "two-way",
    name: "二刀流ドリーマー",
    emoji: "⚾",
    desc: "投げても打っても主役になりたい、夢を追う欲張りタイプ。",
    long:
      "二刀流ドリーマー型は、ピッチャーとしてもバッターとしても活躍したい“欲張り”なタイプ。ひとつの役割に収まらず、試合のあらゆる局面で主役になりたいという強い気持ちを持っています。器用でチャレンジ精神が旺盛な一方、練習量が分散しやすいので、時期ごとにテーマを絞ると伸びやすいのが特徴です。草野球でも「投げて打てる」選手はチームの宝。あなたはまさにその素質の持ち主です。",
    advice:
      "投打どちらもこなすため、オールラウンドに使える道具選びが鍵。グローブは投手向けの操作性と野手向けの捕球性能のバランスを、バットは扱いやすい重量帯を選ぶと安定します。",
    adviceHref: "/tools/",
    adviceCta: "投打の道具を診断でチェック",
    match: ["twoway"],
  },
  {
    slug: "power-pitcher",
    name: "剛腕パワーピッチャー",
    emoji: "🔥",
    desc: "力でねじ伏せる、球威で勝負するエースタイプ。",
    long:
      "剛腕パワーピッチャー型は、速球の球威で相手をねじ伏せる正統派のエースタイプ。細かい制球よりもまず「打たれない強さ」で勝負したい、負けん気の強い性格です。三振を奪う快感がモチベーションで、ここぞの場面でギアを上げられるのも魅力。フォームの再現性を高めると、球威と制球が両立してさらに手が付けられなくなります。",
    advice:
      "投手用グローブは、握りを隠せる深めのポケットと、素早い持ち替えができる軽さがポイント。力の入るスパイクの安定感も球速に直結します。",
    adviceHref: "/glove/",
    adviceCta: "投手向けグローブを見る",
    match: ["pitcher"],
  },
  {
    slug: "smart-pitcher",
    name: "頭脳派クラフト",
    emoji: "🧠",
    desc: "配球と制球で打者を打ち取る、考えるマウンドの主。",
    long:
      "頭脳派クラフト型は、球速よりも配球・制球・変化球のキレで打者を打ち取る“考えるピッチャー”。相手打者のクセを読み、狙い球を外す駆け引きが得意で、少ない球数で試合を作れます。研究熱心で準備を怠らない一方、力みが出ると本来の丁寧さが崩れるので、リラックスを意識すると安定します。草野球では長いイニングを任せられる頼れる存在です。",
    advice:
      "コントロール重視の投球には、指のかかりを一定に保てるグローブと、踏み込みがブレない安定感のあるスパイクが好相性です。",
    adviceHref: "/glove/",
    adviceCta: "投手向けグローブを見る",
    match: ["pitcher", "technician"],
  },
  {
    slug: "fighting-pitcher",
    name: "闘志のマウンド",
    emoji: "🎯",
    desc: "ピンチでこそ燃える、投げ合いが大好きな投手タイプ。",
    long:
      "闘志のマウンド型は、ピンチの場面でこそ燃える負けず嫌いの投手タイプ。ランナーを背負っても物おじせず、気持ちで相手をねじ伏せる勝負師です。感情を力に変えられる強さがある一方、熱くなりすぎると制球を乱すことも。深呼吸ひとつで平常心を取り戻せると、本来の勝負強さがフルに発揮できます。",
    advice:
      "熱くなっても手元が狂わないよう、しっくり手になじむグローブ選びが大切。グリップの効くスパイクで下半身の安定も確保しましょう。",
    adviceHref: "/glove/",
    adviceCta: "投手向けグローブを見る",
    match: ["pitcher", "clutch"],
  },
  {
    slug: "catcher",
    name: "扇の要・女房役",
    emoji: "🧤",
    desc: "試合を組み立て、チームを後ろから支える司令塔。",
    long:
      "扇の要・女房役型は、キャッチャーとして試合全体を組み立てる司令塔タイプ。投手をリードし、守備陣を動かし、チームを後ろから支える縁の下の力持ちです。視野が広く面倒見がよい性格で、周囲からの信頼も厚いのが特徴。派手さより堅実さで勝負するあなたは、どんなチームでも欠かせない存在になります。",
    advice:
      "キャッチャーミットは、扱いやすさと衝撃吸収性が命。手のサイズに合った捕球面と、しっかりしたプロテクター類を揃えると安心してリードに集中できます。",
    adviceHref: "/glove/",
    adviceCta: "キャッチャーミットを見る",
    match: ["catcher"],
  },
  {
    slug: "five-tool",
    name: "5ツール万能",
    emoji: "🌟",
    desc: "打・走・守すべてを高いレベルでこなす二枚看板。",
    long:
      "5ツール万能型は、長打力・ミート・走力・守備・肩のすべてを高いレベルで備えた万能タイプ。どこを守らせても、どの打順に置いても計算できる、チームの中心選手です。器用ゆえに「なんでもできる」からこそ、自分の一番の武器を磨き切ると一気にスターへ。バランス型のあなたは、草野球なら間違いなくレギュラーの柱です。",
    advice:
      "オールラウンドに動くなら、軽量で操作性の高いグローブと、走・守どちらも支える軽量スパイクが好相性。バットは振り抜きやすい中庸の重量帯を。",
    adviceHref: "/tools/",
    adviceCta: "あなた向けの道具を診断",
    match: ["speed", "power"],
  },
  {
    slug: "slugger",
    name: "豪快アーチスト",
    emoji: "💣",
    desc: "一発で試合を決める、ロマン砲タイプ。",
    long:
      "豪快アーチスト型は、一発の長打で試合の流れを変えるロマン砲タイプ。細かいことより「遠くへ飛ばす」快感を大事にする、豪快でおおらかな性格です。ハマったときの破壊力は絶大な一方、力みや引っ張りすぎには注意。広角に打つ意識を持つと、確実性も加わって手が付けられない打者になります。",
    advice:
      "飛距離を求めるなら、反発力の高い（ビヨンド系など）バットが武器。自分のスイングスピードに合った重量・長さを選ぶと、無理なく飛距離が伸びます。",
    adviceHref: "/bat-shindan/",
    adviceCta: "バット相性診断をやってみる",
    match: ["power"],
  },
  {
    slug: "leadoff",
    name: "韋駄天リードオフ",
    emoji: "💨",
    desc: "足でかき回し、チャンスを作る切り込み隊長。",
    long:
      "韋駄天リードオフ型は、俊足を武器に塁上をかき回す切り込み隊長タイプ。出塁すれば盗塁・進塁で相手にプレッシャーをかけ、チームに流れを呼び込みます。行動的でチャンスに強い性格。長打より「塁に出て走る」ことに価値を感じるあなたは、打線の起爆剤として輝きます。",
    advice:
      "走塁で差をつけるなら、軽量で反発性の高いスパイクが最重要。グローブも軽く操作性重視のものを選ぶと、守備でも足の速さが活きます。",
    adviceHref: "/spikes-shindan/",
    adviceCta: "スパイク診断をやってみる",
    match: ["speed"],
  },
  {
    slug: "defender",
    name: "鉄壁の守備職人",
    emoji: "🛡️",
    desc: "華麗な守備でチームを救う、玄人好みのタイプ。",
    long:
      "鉄壁の守備職人型は、華麗な守備でピンチを救う玄人好みのタイプ。派手な打撃より「アウトひとつ」の価値を知る、堅実で責任感の強い性格です。ポジショニングや基本動作を大切にし、ミスの少ないプレーでチームの信頼を勝ち取ります。地味に見えて、勝てるチームに絶対に欠かせないのがこのタイプです。",
    advice:
      "守備の要はグローブ。ポジションに合った型（内野は浅め・外野は深め）と、手になじむ操作性を重視。捕球音が変わるほど守備は上達します。",
    adviceHref: "/glove-shindan/",
    adviceCta: "グローブ診断をやってみる",
    match: ["defense"],
  },
  {
    slug: "clutch",
    name: "勝負師クラッチ",
    emoji: "⚡",
    desc: "痺れる場面ほど強い、頼れる勝負強さ。",
    long:
      "勝負師クラッチ型は、痺れるような場面ほど力を発揮する頼れるタイプ。チャンスやピンチでこそ集中力が増し、ここ一番で結果を出す“持っている”性格です。プレッシャーを楽しめるメンタルが最大の武器。普段から場面を想定した準備をしておくと、その勝負強さがさらに安定して発揮できます。",
    advice:
      "ここぞで振り切れるよう、信頼できる相棒バットを一本持っておくのが吉。手に完全になじんだグローブも、大事な場面での安心感につながります。",
    adviceHref: "/bat-shindan/",
    adviceCta: "バット相性診断をやってみる",
    match: ["clutch"],
  },
  {
    slug: "captain",
    name: "熱血キャプテン",
    emoji: "🔥",
    desc: "背中と声でチームを引っ張る精神的支柱。",
    long:
      "熱血キャプテン型は、プレーと声の両方でチームを引っ張る精神的支柱タイプ。仲間を鼓舞し、雰囲気を作り、いざというときに前に出られるリーダーです。面倒見がよく責任感が強い一方、抱え込みすぎには注意。周囲を信じて任せることを覚えると、チーム全体の力を最大化できます。草野球の運営でも中心になれる人です。",
    advice:
      "チームを率いるなら、まず自分の道具に妥協しないこと。信頼できるギアは自信につながり、その姿勢が仲間の道具選びの手本にもなります。",
    adviceHref: "/hikaku/",
    adviceCta: "道具・ユニフォーム比較を見る",
    match: ["leader"],
  },
  {
    slug: "star",
    name: "スター街道",
    emoji: "✨",
    desc: "華とスター性でスタンドを沸かせる主役タイプ。",
    long:
      "スター街道型は、華やかなプレーで見る人を沸かせる主役タイプ。派手なプレーや目立つ場面が大好きで、注目されるほど力を発揮するエンターテイナーです。ムードメーカーとしてチームを明るくする存在。魅せるプレーと堅実さのバランスを取れると、実力も伴った“本物のスター”になれます。",
    advice:
      "魅せるあなたには、見た目にもこだわった道具を。カラーオーダーやデザイン性の高いモデルを選べば、プレーもテンションも上がります。",
    adviceHref: "/hikaku/",
    adviceCta: "道具・ユニフォーム比較を見る",
    match: ["star", "flashy"],
  },
  {
    slug: "craftsman",
    name: "研究派クラフトマン",
    emoji: "📐",
    desc: "データと技術で積み上げる、努力の理論派。",
    long:
      "研究派クラフトマン型は、データと技術の積み重ねで上達する理論派タイプ。感覚だけに頼らず、動画やスコアを分析して弱点を潰していく努力家です。地道な改善を楽しめる性格で、時間をかけるほど確実に伸びるのが強み。理屈が分かると道具選びも上手なので、自分に最適化した装備でさらに差をつけられます。",
    advice:
      "スペックで選べるあなたには、素材・重量・バランスまで比較できる情報が武器。数値と特徴を見比べて、理詰めで最適な一本を選びましょう。",
    adviceHref: "/hikaku/",
    adviceCta: "スペックで道具を比較する",
    match: ["technician"],
  },
  {
    slug: "stoic",
    name: "求道ストイック",
    emoji: "🧘",
    desc: "黙々と鍛え続ける、努力の求道者。",
    long:
      "求道ストイック型は、黙々と鍛え続ける努力の求道者タイプ。派手さを求めず、地道な反復練習を苦にしないブレない精神力の持ち主です。継続力が最大の武器で、コツコツ積み上げた実力は本物。頑張りすぎて故障しないよう、ケアと休養も“練習の一部”と考えると、長く高いパフォーマンスを保てます。",
    advice:
      "長く使える相棒を選ぶのがこのタイプ。耐久性と手入れのしやすさを重視し、育てる楽しみのある道具を選ぶと、努力の相棒として長持ちします。",
    adviceHref: "/guide/glove-care/",
    adviceCta: "道具のお手入れガイドを見る",
    match: ["stoic"],
  },
  {
    slug: "hitmaker",
    name: "安打製造ヒットマン",
    emoji: "🎯",
    desc: "広角に打ち分ける、確実性重視の巧打者。",
    long:
      "安打製造ヒットマン型は、広角に打ち分けて確実にヒットを重ねる巧打者タイプ。長打より「出塁」と「つなぎ」に価値を感じる、堅実で頭のいい打者です。三振が少なくチャンスに強いので、打線の潤滑油として重宝されます。ミート力に走力や小技を足すと、さらにいやらしい打者に進化できます。",
    advice:
      "ミート重視のあなたには、扱いやすく操作性の高い（やや軽め・短めの）バットが好相性。芯でとらえる感覚を大事に選びましょう。",
    adviceHref: "/bat-shindan/",
    adviceCta: "バット相性診断をやってみる",
    match: ["contact"],
  },
  {
    slug: "allrounder",
    name: "オールラウンダー",
    emoji: "⚾",
    desc: "バランス型。どんなチームでも輝ける万能タイプ。",
    long:
      "オールラウンダー型は、突出した一芸より全体のバランスに優れた万能タイプ。攻守にわたって平均以上をこなし、どんなポジション・打順でもそつなく対応できる調整役です。協調性が高くチームに溶け込みやすい性格。まずは「これだけは負けない」武器をひとつ作ると、器用さが強みに変わって一気に主力へ。",
    advice:
      "まずは基本を押さえた扱いやすい道具から。グローブ・バット・スパイクをバランスよく揃え、使いながら自分の武器を見つけていきましょう。",
    adviceHref: "/tools/",
    adviceCta: "あなた向けの道具を診断",
    match: ["contact", "defense"],
  },
];

export const PLAYER_TYPES: PlayerType[] = PLAYER_TYPES_RAW.map((t) => ({
  ...t,
  icon: t.slug,
}));

const BY_SLUG = new Map(PLAYER_TYPES.map((t) => [t.slug, t]));
export const typeBySlug = (slug: string): PlayerType | undefined => BY_SLUG.get(slug);

// スコアベクトルから代表タイプの slug を決定（診断コンポーネントと共有）
export function pickTypeSlug(score: Partial<Record<Trait, number>>): string {
  const g = (t: Trait) => score[t] || 0;
  const maxV = Math.max(0, ...Object.values(score).map((v) => v || 0));

  if (g("twoway") > 0) return "two-way";
  if (g("pitcher") > 0 && g("pitcher") >= maxV) {
    if (g("technician") > 0) return "smart-pitcher";
    if (g("power") > 0) return "power-pitcher";
    return "fighting-pitcher";
  }
  if (g("catcher") > 0) return "catcher";
  if (g("power") > 0 && g("speed") > 0 && g("contact") > 0) return "five-tool";

  const order: [Trait, string][] = [
    ["power", "slugger"],
    ["speed", "leadoff"],
    ["defense", "defender"],
    ["clutch", "clutch"],
    ["leader", "captain"],
    ["flashy", "star"],
    ["technician", "craftsman"],
    ["stoic", "stoic"],
    ["contact", "hitmaker"],
  ];
  let best = "allrounder";
  let bestV = 0;
  for (const [t, slug] of order) {
    if (g(t) > bestV) {
      bestV = g(t);
      best = slug;
    }
  }
  return best;
}

// タイプの代表選手（ビルド時に決定＝静的。starを優先しつつ安定順）
export function examplePlayers(t: PlayerType, n = 8): Player[] {
  const pool = PLAYERS.filter((p) => t.match.some((tr) => p.traits.includes(tr)));
  const scored = pool
    .map((p, i) => ({
      p,
      // star/flashy持ちを優先、次に資質の一致数、最後に元順で安定化
      s:
        (p.traits.includes("star") ? 4 : 0) +
        (p.traits.includes("flashy") ? 1 : 0) +
        t.match.filter((tr) => p.traits.includes(tr)).length,
      i,
    }))
    .sort((a, b) => b.s - a.s || a.i - b.i);
  return scored.slice(0, n).map((x) => x.p);
}
