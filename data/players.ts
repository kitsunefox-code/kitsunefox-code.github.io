// 野球選手の使用メーカー＆プレースタイル・データ。
// NPB選手は公開データベース（12球団ロースター・各賞）から取材し、機械的に構造化。
// MLB選手は公開情報をもとに主要スターを収録。
// 使用ギアは公開情報に基づく参考（時期・場面により変わることがあります）。
// 性格診断で「あなたに近い選手」をマッチし、その選手の使用メーカー／実商品を表示する。
import NPB_JSON from "./npbPlayers.json";

export type Trait =
  | "power"
  | "contact"
  | "speed"
  | "defense"
  | "leader"
  | "clutch"
  | "flashy"
  | "technician"
  | "stoic"
  | "pitcher"
  | "catcher"
  | "twoway"
  | "star";

export type Player = {
  name: string;
  league: "NPB" | "MLB";
  position: string;
  glove: string;
  bat?: string;
  spikes?: string;
  // 実モデル名（判明している選手のみ）。無ければオーダー導線を表示。
  gloveModel?: string;
  batModel?: string;
  spikeModel?: string;
  traits: Trait[];
  note: string;
  productKeyword: string;
  productHeading: string;
};

// メーカーがオーダー（受注生産）に対応しているか＝「近い一本を作る」導線用
export const ORDER_MAKERS = new Set([
  "ミズノ", "ゼット", "SSK", "久保田スラッガー", "ローリングス",
  "アシックス", "ハタケヤマ", "ドナイヤ", "アイピーセレクト", "ザナックス",
  "ワールドペガサス", "ハイゴールド", "シュアプレイ",
]);

// メーカー＋カテゴリ → 楽天のオーダー/実物検索キーワード
export function searchKw(maker: string, kind: "グローブ" | "バット" | "スパイク", order = false): string {
  const m = maker === "各社" || !maker ? "" : maker;
  return order ? `${m} ${kind} オーダー`.trim() : `${m} 軟式 ${kind}`.trim();
}

// ポジションコード → 日本語表記
const POS_JP: Record<string, string> = {
  pitcher: "投手",
  catcher: "捕手",
  infield: "内野手",
  outfield: "外野手",
  ss: "遊撃手",
  "2b": "二塁手",
  "3b": "三塁手",
  "1b": "一塁手",
  of: "外野手",
  dh: "指名打者",
};

// グローブメーカー → 楽天検索キーワード
const GLOVE_KW: Record<string, string> = {
  ミズノ: "軟式 グローブ ミズノ 一般",
  アシックス: "軟式 グローブ アシックス",
  ゼット: "軟式 グローブ ゼット 一般",
  SSK: "軟式 グローブ SSK 一般",
  ローリングス: "軟式 グローブ ローリングス 一般",
  久保田スラッガー: "軟式 グローブ 久保田スラッガー",
  ウィルソン: "軟式 グローブ ウィルソン",
  ドナイヤ: "軟式 グローブ ドナイヤ",
  ハタケヤマ: "軟式 キャッチャーミット ハタケヤマ",
  アンダーアーマー: "野球 グローブ アンダーアーマー",
  シュアプレイ: "軟式 グローブ シュアプレイ",
  アイピーセレクト: "軟式 グローブ アイピーセレクト",
  ザナックス: "軟式 グローブ ザナックス",
  ハイゴールド: "軟式 グローブ ハイゴールド",
  ワールドペガサス: "軟式 グローブ ワールドペガサス",
  ナイキ: "野球 グローブ ナイキ",
  ニューバランス: "野球 グローブ ニューバランス",
  アディダス: "野球 グローブ アディダス",
  マルーチ: "野球 グローブ marucci",
  ヴィクタス: "野球 バット victus",
  DESCENTE: "野球 グローブ デサント",
  各社: "軟式 グローブ 一般",
};

function kwFor(glove: string): string {
  return GLOVE_KW[glove] || `軟式 グローブ ${glove}`;
}

function headFor(glove: string): string {
  if (glove === "各社" || !glove) return "おすすめの軟式グローブを見る";
  return `${glove}のグローブ・ギアを見る`;
}

function noteFor(pos: string, traits: Trait[], glove: string): string {
  const posJ = POS_JP[pos] || pos;
  const bits: string[] = [];
  if (traits.includes("twoway")) bits.push("投打二刀流");
  if (traits.includes("pitcher") && pos === "pitcher") bits.push("マウンドの主役");
  if (traits.includes("power")) bits.push("長打力が武器");
  if (traits.includes("speed")) bits.push("足でかき回す");
  if (traits.includes("contact")) bits.push("広角に打ち分ける巧打");
  if (traits.includes("defense")) bits.push("華麗な守備");
  if (traits.includes("catcher")) bits.push("扇の要");
  if (traits.includes("clutch")) bits.push("勝負強さ");
  if (traits.includes("leader")) bits.push("チームの精神的支柱");
  if (traits.includes("technician")) bits.push("研究熱心な技巧派");
  if (traits.includes("flashy")) bits.push("華のあるプレー");
  if (traits.includes("star")) bits.push("球界を代表する存在");
  if (traits.includes("stoic")) bits.push("ストイックな求道者");
  const style = bits.length ? bits.slice(0, 3).join("・") : posJ;
  return `${posJ}／${style}。グローブは${glove}。`;
}

// スクレイプ生データの型
type Rec = { n: string; l: string; p: string; g: string; t: string[]; b?: string; s?: string };

// メーカー名が選手名として混入した不良データを除外
const JUNK = new Set([
  "ミズノ", "ウィルソン", "アシックス", "ローリングス", "ゼット", "SSK",
  "アディダス", "ナイキ", "久保田スラッガー", "YGS", "ワン",
]);

// 主力選手はプレースタイルを手動で補強（マッチ精度・多様性の担保）
const MARQUEE: Record<string, Trait[]> = {
  大谷翔平: ["twoway", "power", "star", "pitcher", "speed"],
  王貞治: ["power", "leader", "star", "clutch"],
  長嶋茂雄: ["power", "clutch", "flashy", "star"],
  イチロー: ["contact", "speed", "technician", "star"],
  松井秀喜: ["power", "clutch", "star"],
  落合博満: ["power", "contact", "technician"],
  村上宗隆: ["power", "clutch", "star"],
  岡本和真: ["power", "clutch"],
  山川穂高: ["power", "flashy"],
  中村剛也: ["power"],
  佐藤輝明: ["power", "flashy"],
  柳田悠岐: ["power", "speed", "contact", "star"],
  吉田正尚: ["contact", "power", "technician"],
  坂本勇人: ["defense", "leader", "star", "contact"],
  源田壮亮: ["defense", "technician"],
  菊池涼介: ["defense", "flashy"],
  近本光司: ["speed", "contact", "leader"],
  周東佑京: ["speed"],
  松井稼頭央: ["speed", "contact", "leader"],
  赤星憲広: ["speed", "contact"],
  山本由伸: ["pitcher", "technician", "star", "stoic"],
  ダルビッシュ有: ["pitcher", "technician", "star"],
  田中将大: ["pitcher", "leader", "clutch"],
  千賀滉大: ["pitcher", "flashy"],
  菅野智之: ["pitcher", "technician"],
  前田健太: ["pitcher", "technician"],
  岸孝之: ["pitcher", "technician"],
  松坂大輔: ["pitcher", "power", "star", "flashy"],
  黒田博樹: ["pitcher", "leader", "stoic"],
  甲斐拓也: ["catcher", "defense", "leader"],
  梅野隆太郎: ["catcher", "defense"],
  中村悠平: ["catcher", "leader"],
  森友哉: ["catcher", "contact", "power"],
  古田敦也: ["catcher", "leader", "technician"],
  阿部慎之助: ["catcher", "power", "leader"],
  大山悠輔: ["power", "leader"],
  万波中正: ["power", "contact", "flashy"],
  細川成也: ["power", "contact"],
};

// 市販されている本人モデル（判明分のみ）。楽天で実際に検索ヒットする表記にする。
const MODELS: Record<string, { glove?: string; bat?: string; spike?: string }> = {
  坂本勇人: { glove: "ミズノプロ 坂本勇人モデル" },
  源田壮亮: { glove: "ゼット プロステイタス 源田モデル" },
  岡本和真: { glove: "ローリングス 岡本和真モデル" },
  村上宗隆: { glove: "ミズノプロ 村上宗隆モデル", bat: "ミズノ 村上宗隆モデル" },
  菊池涼介: { glove: "ミズノプロ 菊池涼介モデル" },
  山田哲人: { bat: "アシックス 山田哲人モデル" },
  柳田悠岐: { bat: "アンダーアーマー 柳田悠岐モデル" },
  大谷翔平: { bat: "アシックス STAR SHINE" },
};

const SCRAPED: Player[] = (NPB_JSON as Rec[])
  .filter((r) => !JUNK.has(r.n) && r.n.length >= 2)
  .map((r) => {
    const traits = (MARQUEE[r.n] || r.t) as Trait[];
    const bat = r.b && r.b !== "調査中" ? r.b : undefined;
    const spikes = r.s && r.s !== "調査中" ? r.s : undefined;
    const m = MODELS[r.n];
    return {
      name: r.n,
      league: r.l as "NPB" | "MLB",
      position: POS_JP[r.p] || r.p,
      glove: r.g,
      bat,
      spikes,
      gloveModel: m?.glove,
      batModel: m?.bat,
      spikeModel: m?.spike,
      traits,
      note: noteFor(r.p, traits, r.g),
      productKeyword: kwFor(r.g),
      productHeading: headFor(r.g),
    };
  });

// ── MLB（アメリカ）主要スター：公開情報ベースの手動収録 ─────────────
type MRec = {
  name: string;
  pos: string;
  glove: string;
  bat?: string;
  spikes?: string;
  gloveModel?: string;
  batModel?: string;
  spikeModel?: string;
  traits: Trait[];
  note: string;
};

const MLB_RAW: MRec[] = [
  // 現役スター（野手）
  { name: "マイク・トラウト", pos: "外野手", glove: "ローリングス", bat: "オールドヒッコリー", spikes: "ナイキ", traits: ["power", "speed", "contact", "star", "clutch"], note: "MLBを代表する5ツールプレーヤー。パワー・走・守すべて最高峰。" },
  { name: "アーロン・ジャッジ", pos: "外野手", glove: "ローリングス", bat: "チャンドラー", spikes: "アディダス", traits: ["power", "clutch", "leader", "star"], note: "球界屈指の長距離砲。規格外の飛距離を誇るヤンキースの主将。" },
  { name: "ムーキー・ベッツ", pos: "外野手", glove: "ウィルソン", bat: "ヴィクタス", spikes: "ジョーダン", traits: ["contact", "speed", "defense", "flashy", "star"], note: "攻守走そろった万能型。守備範囲とスローイングも一級品。" },
  { name: "ブライス・ハーパー", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "アンダーアーマー", traits: ["power", "flashy", "clutch", "star"], note: "華のあるスラッガー。フルスイングと勝負強さでファンを沸かせる。" },
  { name: "フェルナンド・タティスJr.", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "アディダス", traits: ["power", "speed", "flashy", "star"], note: "身体能力の塊。豪快な打撃と派手なプレーが魅力。" },
  { name: "ロナルド・アクーニャJr.", pos: "外野手", glove: "ローリングス", bat: "チャンドラー", spikes: "アディダス", traits: ["power", "speed", "flashy", "star", "clutch"], note: "40-40超えの怪物。パワーとスピードを兼備した看板選手。" },
  { name: "フレディ・フリーマン", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact", "power", "leader", "clutch"], note: "安定感抜群の巧打者。広角に打ち分けチームを牽引する。" },
  { name: "ホセ・アルトゥーベ", pos: "二塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact", "speed", "clutch", "star"], note: "小柄ながら勝負強い巧打者。俊足と広角打法が武器。" },
  { name: "フランシスコ・リンドール", pos: "遊撃手", glove: "ウィルソン", bat: "マルーチ", spikes: "ニューバランス", traits: ["defense", "power", "speed", "flashy", "star"], note: "笑顔の司令塔。華麗な守備とパンチ力を併せ持つ遊撃手。" },
  { name: "ノーラン・アレナード", pos: "三塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["defense", "power", "technician", "star"], note: "史上屈指の名三塁手。ゴールドグラブ常連の鉄壁守備。" },
  { name: "マニー・マチャド", pos: "三塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ジョーダン", traits: ["defense", "power", "star"], note: "強肩強打の三塁手。守備範囲とパワーを高次元で両立。" },
  { name: "コーリー・シーガー", pos: "遊撃手", glove: "ローリングス", bat: "チャンドラー", spikes: "ナイキ", traits: ["power", "contact", "clutch", "star"], note: "大舞台に強い長打型遊撃手。ワールドシリーズMVPの実績。" },
  { name: "ホアン・ソト", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "アディダス", traits: ["power", "contact", "star", "clutch"], note: "選球眼と長打力を兼ね備えた若き主砲。出塁能力も一級。" },
  { name: "ヴラディミール・ゲレーロJr.", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "アディダス", traits: ["power", "contact", "star"], note: "父譲りの打撃センス。広角に長打を放つ次世代スラッガー。" },
  { name: "トレイ・ターナー", pos: "遊撃手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["speed", "contact", "star"], note: "球界屈指の俊足巧打。走塁でも試合を動かす。" },
  { name: "カイル・タッカー", pos: "外野手", glove: "ローリングス", bat: "ヴィクタス", spikes: "ナイキ", traits: ["power", "contact", "speed"], note: "確実性とパワーを備えた完成度の高いスラッガー。" },
  { name: "ヨーダン・アルバレス", pos: "指名打者", glove: "ミズノ", bat: "チャンドラー", spikes: "ナイキ", traits: ["power", "clutch", "star"], note: "圧倒的な打球速度を誇る左の主砲。大舞台に強い。" },
  { name: "ピート・アロンソ", pos: "一塁手", glove: "ローリングス", bat: "ルイスビルスラッガー", spikes: "ナイキ", traits: ["power", "flashy"], note: "本塁打ダービー王の生粋のスラッガー。豪快な一発が魅力。" },
  { name: "ジャンカルロ・スタントン", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "star"], note: "規格外のパワーヒッター。放たれる打球は場外級。" },
  { name: "ポール・ゴールドシュミット", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "contact", "leader", "technician"], note: "堅実な打撃と守備を兼ね備えたMVP一塁手。" },
  { name: "J.T.リアルミュート", pos: "捕手", glove: "ローリングス", bat: "ヴィクタス", spikes: "ナイキ", traits: ["catcher", "defense", "power", "speed"], note: "走れる強打の捕手。守備・打撃・機動力すべてトップクラス。" },
  { name: "サルバドール・ペレス", pos: "捕手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["catcher", "power", "leader"], note: "長打力のある扇の要。チームを鼓舞するリーダー。" },
  // 投手
  { name: "ゲリット・コール", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "star", "stoic"], note: "剛速球と制球を兼ね備えたエース右腕。奪三振能力が高い。" },
  { name: "ジェイコブ・デグロム", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "technician", "star"], note: "圧巻の球速と制球のサイ・ヤング右腕。芸術的な投球。" },
  { name: "マックス・シャーザー", pos: "投手", glove: "ウィルソン", spikes: "ナイキ", traits: ["pitcher", "power", "leader", "clutch", "stoic"], note: "闘志あふれる大ベテラン。三度のサイ・ヤング賞。" },
  { name: "クレイトン・カーショウ", pos: "投手", glove: "ウィルソン", spikes: "ナイキ", traits: ["pitcher", "technician", "leader", "star", "stoic"], note: "精密なコントロールの左腕レジェンド。ドジャースの象徴。" },
  { name: "スペンサー・ストライダー", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "flashy"], note: "圧倒的な奪三振能力を誇る若きパワーピッチャー。" },
  { name: "コービン・バーンズ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "technician", "star"], note: "カッターを軸にした技巧派エース。サイ・ヤング賞受賞。" },
  { name: "ジャスティン・バーランダー", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "leader", "star", "stoic"], note: "息の長い剛腕。ノーヒットノーラン複数回の大投手。" },
  { name: "エドウィン・ディアス", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "flashy", "clutch", "star"], note: "登場曲でも沸かせる守護神。圧倒的な奪三振クローザー。" },
  { name: "アロルディス・チャップマン", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "flashy"], note: "160km超の剛速球左腕。球界最速クラスの守護神。" },
  // レジェンド
  { name: "デレク・ジーター", pos: "遊撃手", glove: "ローリングス", bat: "ルイスビルスラッガー", spikes: "ジョーダン", traits: ["defense", "contact", "leader", "clutch", "star"], note: "ヤンキースの主将。勝負強さとリーダーシップの象徴。" },
  { name: "ケン・グリフィーJr.", pos: "外野手", glove: "ローリングス", bat: "ルイスビルスラッガー", spikes: "ナイキ", traits: ["power", "speed", "contact", "defense", "flashy", "star"], note: "美しいスイングの5ツール。守備でも魅せた球界の華。" },
  { name: "アルバート・プホルス", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "contact", "leader", "clutch", "star"], note: "通算700本塁打超の右の大砲。安定した勝負強さ。" },
  { name: "デビッド・オルティーズ", pos: "指名打者", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "clutch", "leader", "star"], note: "ビッグパピの愛称。大舞台に無類の強さを誇る左の主砲。" },
  { name: "チッパー・ジョーンズ", pos: "三塁手", glove: "ローリングス", bat: "ルイスビルスラッガー", spikes: "ナイキ", traits: ["power", "contact", "star"], note: "スイッチヒッターの強打者。ブレーブス一筋の名三塁手。" },
  { name: "マイク・ピアッツァ", pos: "捕手", glove: "ローリングス", bat: "ルイスビルスラッガー", spikes: "ナイキ", traits: ["catcher", "power", "star"], note: "捕手史上最強クラスの打撃。長打力抜群の扇の要。" },
  { name: "マリアノ・リベラ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "clutch", "leader", "star", "stoic"], note: "カッター一本で頂点に立った史上最高の守護神。" },
  { name: "ペドロ・マルティネス", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "flashy", "star"], note: "小柄ながら圧倒的な奪三振。全盛期は無双の右腕。" },
  { name: "ランディ・ジョンソン", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "star", "stoic"], note: "長身から投げ下ろす豪速球左腕。ビッグユニットの異名。" },
  { name: "バリー・ボンズ", pos: "外野手", glove: "ローリングス", bat: "サムバット", spikes: "ナイキ", traits: ["power", "star"], note: "通算最多本塁打の記録保持者。規格外の長打力。" },
  { name: "アレックス・ロドリゲス", pos: "遊撃手", glove: "ローリングス", bat: "ルイスビルスラッガー", spikes: "ナイキ", traits: ["power", "contact", "star"], note: "打てる遊撃手の代表格。パワーと確実性を両立。" },
];

// MLB 現役中堅どころ・注目株を大量追加（メーカーは公開情報ベースの参考）
const MLB_RAW2: MRec[] = [
  // 内野手
  { name: "ボビー・ウィットJr.", pos: "遊撃手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "speed", "defense", "star"], note: "走攻守そろった次世代のスーパースター遊撃手。" },
  { name: "ガナー・ヘンダーソン", pos: "遊撃手", glove: "ローリングス", bat: "ルイスビルスラッガー", spikes: "ナイキ", traits: ["power", "defense", "star"], note: "長打力と守備を兼ね備えた若きMVP候補。" },
  { name: "エリー・デラクルーズ", pos: "遊撃手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "speed", "flashy", "star"], note: "規格外の身体能力。豪快な打球と俊足で魅せる。" },
  { name: "アンソニー・ボルピー", pos: "遊撃手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["defense", "speed"], note: "堅実な守備と機動力が光るヤンキースの遊撃手。" },
  { name: "ザンダー・ボガーツ", pos: "遊撃手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact", "power", "leader"], note: "安定した打撃を誇るベテラン遊撃手。" },
  { name: "ダンズビー・スワンソン", pos: "遊撃手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["defense", "leader"], note: "堅守が持ち味のリーダー気質の遊撃手。" },
  { name: "CJ・エイブラムス", pos: "遊撃手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["speed", "contact"], note: "俊足を武器にかき回すリードオフマン。" },
  { name: "ジェレミー・ペーニャ", pos: "遊撃手", glove: "ウィルソン", bat: "マルーチ", spikes: "ナイキ", traits: ["defense", "contact"], note: "堅守好打の遊撃手。ワールドシリーズMVP経験も。" },
  { name: "マーカス・シミエン", pos: "二塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "defense", "leader"], note: "パワーと守備を兼備するタフな二塁手。" },
  { name: "オジー・アルビーズ", pos: "二塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "speed"], note: "小柄ながらパンチ力と俊足を持つ二塁手。" },
  { name: "アンドレス・ヒメネス", pos: "二塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["defense", "speed"], note: "ゴールドグラブ級の守備が光る二塁手。" },
  { name: "ケテル・マルテ", pos: "二塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact", "power"], note: "広角に打ち分ける中軸の二塁手。" },
  { name: "ジャズ・チゾムJr.", pos: "二塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["speed", "power", "flashy"], note: "スピードと華やかさでファンを沸かせる。" },
  { name: "ノーラン・ゴーマン", pos: "二塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "左の長距離砲タイプの二塁手。" },
  { name: "ジャクソン・ホリデー", pos: "二塁手", glove: "ローリングス", bat: "ルイスビルスラッガー", spikes: "ナイキ", traits: ["contact", "star"], note: "ドラフト1位の超有望株。将来のスター候補。" },
  { name: "マット・オルソン", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "本塁打を量産する長距離砲一塁手。" },
  { name: "ヴィニー・パスクアンティーノ", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact", "power"], note: "確実性の高いミートが持ち味の一塁手。" },
  { name: "スペンサー・トーケルソン", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "全体1位指名のパワー型一塁手。" },
  { name: "トリストン・カサス", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "長打力が魅力の若手一塁手。" },
  { name: "クリスチャン・ウォーカー", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "defense"], note: "守備も上手いパワー型一塁手。" },
  { name: "ヤンディ・ディアス", pos: "一塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact"], note: "出塁率の高い巧打者。首位打者経験も。" },
  { name: "オースティン・ライリー", pos: "三塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "中軸を担う長打型三塁手。" },
  { name: "ラファエル・デバース", pos: "三塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "star"], note: "レッドソックスの主砲。豪快な打撃が魅力。" },
  { name: "アレックス・ブレグマン", pos: "三塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact", "leader", "clutch"], note: "選球眼と勝負強さに長けた頭脳派。" },
  { name: "ホセ・ラミレス", pos: "三塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "speed", "star"], note: "パワーとスピードを高次元で両立するスター。" },
  { name: "マット・チャップマン", pos: "三塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["defense", "power"], note: "ゴールドグラブ常連の鉄壁三塁手。" },
  { name: "マックス・マンシー", pos: "三塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "選球眼と一発長打が魅力の内野手。" },
  { name: "ジャスティン・ターナー", pos: "三塁手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact", "leader"], note: "ベテランの巧打者。勝負強さも兼備。" },
  // 外野手
  { name: "ルイス・ロバートJr.", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "speed", "star"], note: "5ツールを備えた身体能力抜群の外野手。" },
  { name: "バイロン・バクストン", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["speed", "power", "defense"], note: "驚異的な守備範囲と俊足を誇る中堅手。" },
  { name: "コーディ・ベリンジャー", pos: "外野手", glove: "ローリングス", bat: "ルイスビルスラッガー", spikes: "ナイキ", traits: ["power", "defense", "star"], note: "MVP経験のある攻守そろった外野手。" },
  { name: "ジョージ・スプリンガー", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "leader"], note: "リードオフから長打を放つベテラン外野手。" },
  { name: "テオスカー・ヘルナンデス", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "長打力が魅力の右の強打者。" },
  { name: "ランディ・アロザレーナ", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "flashy", "clutch"], note: "ポストシーズンに強い華のあるスラッガー。" },
  { name: "ブライアン・レイノルズ", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact", "power"], note: "スイッチヒッターの安定した中軸打者。" },
  { name: "スティーブン・クワン", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact", "defense"], note: "三振の少ない巧打と堅守が持ち味。" },
  { name: "マイケル・ハリスII", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["speed", "power", "defense", "star"], note: "攻守走そろった若き中堅のスター候補。" },
  { name: "クリスチャン・イエリッチ", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "speed", "contact", "star"], note: "MVP経験の万能型スラッガー。" },
  { name: "ジャクソン・チュリオ", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "speed"], note: "パワーと走力を兼ね備えた超有望株。" },
  { name: "ジャクソン・メリル", pos: "外野手", glove: "ローリングス", bat: "ルイスビルスラッガー", spikes: "ナイキ", traits: ["contact", "star"], note: "打撃センス抜群の若き中堅手。" },
  { name: "ジェームズ・ウッド", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "長身から長打を量産するパワー外野手。" },
  { name: "ワイアット・ラングフォード", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "speed"], note: "即戦力として期待される二刀の外野手。" },
  { name: "セドリック・マリンズ", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["speed", "power"], note: "俊足とパンチ力を兼ねた中堅手。" },
  { name: "マックス・ケプラー", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "パワーのある右翼手。" },
  { name: "アンソニー・サンタンデール", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "スイッチの本塁打量産型スラッガー。" },
  { name: "ラーズ・ナットバー", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["contact"], note: "出塁能力の高い巧打の外野手。" },
  { name: "カイル・シュワーバー", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power", "clutch"], note: "豪快なアーチを描く左の主砲。" },
  { name: "タイラー・オニール", pos: "外野手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["power"], note: "筋骨隆々のパワーヒッター。" },
  // 捕手
  { name: "アドリー・ラッチマン", pos: "捕手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["catcher", "leader"], note: "打てるスイッチ捕手。チームの司令塔。" },
  { name: "ウィリアム・コントレラス", pos: "捕手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["catcher", "power"], note: "強打が魅力の攻撃型捕手。" },
  { name: "カル・ローリー", pos: "捕手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["catcher", "power"], note: "本塁打を量産するスイッチ捕手。" },
  { name: "ショーン・マーフィー", pos: "捕手", glove: "ローリングス", bat: "マルーチ", spikes: "ナイキ", traits: ["catcher", "power", "defense"], note: "守備・打撃に優れた総合力の高い捕手。" },
  // 投手（先発）
  { name: "タリク・スクーバル", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "technician", "star"], note: "サイ・ヤング賞左腕。制球と球威を両立。" },
  { name: "ポール・スキーンズ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "star"], note: "160km超を投げ込む怪物ルーキー右腕。" },
  { name: "ザック・ウィーラー", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "star"], note: "安定感抜群のエース右腕。" },
  { name: "ローガン・ウェブ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "technician"], note: "ゴロを打たせる技巧派の先発。" },
  { name: "フランバー・バルデス", pos: "投手", glove: "ウィルソン", spikes: "ナイキ", traits: ["pitcher", "technician"], note: "重いシンカーでゴロの山を築く左腕。" },
  { name: "パブロ・ロペス", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "technician"], note: "多彩な変化球を操る技巧派。" },
  { name: "ケビン・ゴーズマン", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "technician"], note: "スプリットを武器にする奪三振投手。" },
  { name: "ディラン・シース", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power"], note: "キレのある速球とスライダーが武器。" },
  { name: "フレディ・ペラルタ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power"], note: "浮き上がる速球で三振を奪う右腕。" },
  { name: "ソニー・グレイ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "technician"], note: "多彩な球種を操るベテラン右腕。" },
  { name: "アーロン・ノラ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "technician"], note: "安定した制球のイニングイーター。" },
  { name: "ザック・ギャレン", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "technician", "star"], note: "頭脳的な投球が光るエース右腕。" },
  { name: "ブレイク・スネル", pos: "投手", glove: "ウィルソン", spikes: "ナイキ", traits: ["pitcher", "power", "flashy"], note: "二度のサイ・ヤング賞左腕。" },
  { name: "クリス・セール", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "star"], note: "スリークォーターの豪腕左腕。" },
  { name: "ネスター・コルテス", pos: "投手", glove: "ウィルソン", spikes: "ナイキ", traits: ["pitcher", "technician", "flashy"], note: "多彩なフォームで打者を惑わす技巧派。" },
  { name: "ジョージ・カービー", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "technician"], note: "抜群の制球力を誇る先発右腕。" },
  { name: "ルイス・カスティーヨ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power"], note: "威力ある速球が武器のエース。" },
  { name: "タイラー・グラスノー", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power"], note: "長身から投げ下ろす剛速球右腕。" },
  { name: "カルロス・ロドン", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power"], note: "パワー系の左腕先発。" },
  { name: "ボビー・ミラー", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power"], note: "100マイルを投げる若手右腕。" },
  { name: "グレイソン・ロドリゲス", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power"], note: "球威十分の有望な先発右腕。" },
  { name: "ヘスス・ルサルド", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power"], note: "力のある速球が武器の左腕。" },
  // 投手（救援）
  { name: "エマニュエル・クラセ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "clutch", "flashy"], note: "強烈なカッターで抑える守護神。" },
  { name: "デビン・ウィリアムズ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "clutch"], note: "魔球チェンジアップの守護神。" },
  { name: "ライアン・ヘルズリー", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "clutch"], note: "160km超の速球を投げる守護神。" },
  { name: "メイソン・ミラー", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power", "flashy"], note: "驚異的な球速を誇る新世代クローザー。" },
  { name: "フェリックス・バティスタ", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "power"], note: "長身から投げ込む豪腕リリーバー。" },
  { name: "ジョシュ・ヘイダー", pos: "投手", glove: "ローリングス", spikes: "ナイキ", traits: ["pitcher", "clutch"], note: "圧倒的な奪三振率を誇る左の守護神。" },
];

// NPB レジェンド・名選手（球団ロースター外を手動補完）
const NPB_LEGENDS_RAW: MRec[] = [
  { name: "金本知憲", pos: "外野手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "leader", "stoic"], note: "鉄人と称された連続試合出場記録の主。パワーと勝負強さ。" },
  { name: "新井貴浩", pos: "内野手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "leader", "clutch"], note: "人柄で慕われた右の長距離砲。のちに監督としても手腕を発揮。" },
  { name: "前田智徳", pos: "外野手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["contact", "technician", "star"], note: "天才と称された広角に打ち分ける巧打者。" },
  { name: "立浪和義", pos: "内野手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["contact", "defense", "leader"], note: "ミスタードラゴンズ。二塁打の記録を持つ巧打者。" },
  { name: "掛布雅之", pos: "三塁手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "star", "clutch"], note: "ミスタータイガース。1980年代の阪神の主砲。" },
  { name: "ランディ・バース", pos: "一塁手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "contact", "clutch", "star"], note: "三冠王を獲得した阪神の伝説的助っ人。" },
  { name: "秋山幸二", pos: "外野手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "speed", "defense", "star"], note: "西武黄金期の中心。バック宙で本塁を踏んだ名手。" },
  { name: "清原和博", pos: "一塁手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "flashy", "star", "clutch"], note: "PL学園からの怪物。豪快な本塁打が魅力の主砲。" },
  { name: "桑田真澄", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "technician", "stoic"], note: "頭脳的な投球で巨人を支えた技巧派右腕。" },
  { name: "斎藤雅樹", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "technician", "star"], note: "平成の大エース。安定した投球で数々のタイトルを獲得。" },
  { name: "江川卓", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "power", "star"], note: "怪物と呼ばれた快速球投手。" },
  { name: "村田兆治", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "power", "stoic"], note: "マサカリ投法の剛腕。フォークを武器にした鉄腕。" },
  { name: "山本昌", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "technician", "stoic"], note: "50歳まで投げ続けた技巧派左腕のレジェンド。" },
  { name: "上原浩治", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "technician", "clutch", "star"], note: "精密な制球で日米で活躍。メジャーでも胴上げ投手に。" },
  { name: "佐々木主浩", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "power", "clutch", "star"], note: "大魔神と呼ばれた守護神。落差の大きいフォークが武器。" },
  { name: "高津臣吾", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "technician", "clutch", "leader"], note: "シンカーを操る名クローザー。のちにヤクルト監督。" },
  { name: "藤川球児", pos: "投手", glove: "ローリングス", spikes: "アシックス", traits: ["pitcher", "power", "clutch", "star"], note: "火の玉ストレートで阪神を支えた守護神。" },
  { name: "岩瀬仁紀", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "technician", "clutch", "stoic"], note: "通算セーブ記録を持つ鉄腕左腕。" },
  { name: "野茂英雄", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "power", "flashy", "star"], note: "トルネード投法でメジャーの扉を開いたパイオニア。" },
  { name: "石井一久", pos: "投手", glove: "ミズノ", spikes: "ミズノ", traits: ["pitcher", "power"], note: "キレのある速球とカーブが武器の左腕。" },
  { name: "三浦大輔", pos: "投手", glove: "ゼット", spikes: "ゼット", traits: ["pitcher", "technician", "leader"], note: "ハマの番長。横浜一筋のベテラン右腕。" },
  { name: "和田一浩", pos: "外野手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "contact", "technician"], note: "遅咲きの強打者。理論派として知られた巧打者。" },
  { name: "谷繁元信", pos: "捕手", glove: "ゼット", bat: "ゼット", spikes: "ゼット", traits: ["catcher", "defense", "leader", "technician"], note: "史上最多出場の名捕手。緻密なリードが持ち味。" },
  { name: "里崎智也", pos: "捕手", glove: "SSK", bat: "SSK", spikes: "SSK", traits: ["catcher", "power", "leader"], note: "打てる捕手として活躍。WBC世界一の女房役。" },
  { name: "宮本慎也", pos: "内野手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["defense", "leader", "technician"], note: "守備の名手にして名リーダー。堅実な内野守備の教科書。" },
  { name: "荒木雅博", pos: "二塁手", glove: "ゼット", bat: "ゼット", spikes: "ゼット", traits: ["defense", "speed"], note: "アライバコンビの一角。俊足堅守の名二塁手。" },
  { name: "井端弘和", pos: "遊撃手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["defense", "contact", "technician"], note: "堅守と巧打を兼ね備えた名遊撃手。" },
  { name: "福留孝介", pos: "外野手", glove: "ローリングス", bat: "ローリングス", spikes: "ナイキ", traits: ["power", "contact", "star"], note: "日米で活躍した強打の外野手。" },
  { name: "中村紀洋", pos: "三塁手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "defense", "clutch"], note: "強肩強打の三塁手。ゴールデングラブ常連。" },
  { name: "小久保裕紀", pos: "内野手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "leader", "clutch"], note: "ダイエー・巨人で活躍した長距離砲。" },
  { name: "松中信彦", pos: "一塁手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "contact", "clutch"], note: "平成唯一の三冠王。パワーと確実性を両立。" },
  { name: "井口資仁", pos: "二塁手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "speed", "leader"], note: "日米で活躍した攻守走そろった二塁手。" },
  { name: "川崎宗則", pos: "遊撃手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["speed", "defense", "flashy"], note: "ムードメーカーの俊足遊撃手。" },
  { name: "鳥谷敬", pos: "遊撃手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["defense", "contact", "stoic"], note: "阪神の連続試合出場を支えた鉄人遊撃手。" },
  { name: "アレックス・ラミレス", pos: "外野手", glove: "ミズノ", bat: "ミズノ", spikes: "ミズノ", traits: ["power", "contact", "flashy", "star"], note: "陽気なパフォーマンスと強打で人気を博した助っ人。" },
];

const MLB_CURATED: Player[] = [...MLB_RAW, ...MLB_RAW2].map((m) => ({
  name: m.name,
  league: "MLB" as const,
  position: m.pos,
  glove: m.glove,
  bat: m.bat,
  spikes: m.spikes,
  gloveModel: m.gloveModel,
  batModel: m.batModel,
  spikeModel: m.spikeModel,
  traits: m.traits,
  note: m.note,
  productKeyword: kwFor(m.glove),
  productHeading: headFor(m.glove),
}));

// ── NPB レジェンド・名選手（ロースター外を手動補完） ─────────────
const NPB_LEGENDS: Player[] = NPB_LEGENDS_RAW.map((m) => ({
  name: m.name,
  league: "NPB" as const,
  position: m.pos,
  glove: m.glove,
  bat: m.bat,
  spikes: m.spikes,
  gloveModel: m.gloveModel,
  batModel: m.batModel,
  spikeModel: m.spikeModel,
  traits: m.traits,
  note: m.note,
  productKeyword: kwFor(m.glove),
  productHeading: headFor(m.glove),
}));

export const PLAYERS: Player[] = [...SCRAPED, ...NPB_LEGENDS, ...MLB_CURATED];

export const PLAYER_COUNT = PLAYERS.length;
export const NPB_COUNT = PLAYERS.filter((p) => p.league === "NPB").length;
export const MLB_COUNT = PLAYERS.filter((p) => p.league === "MLB").length;
