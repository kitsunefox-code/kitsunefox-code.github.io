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
  traits: Trait[];
  note: string;
  productKeyword: string;
  productHeading: string;
};

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

const SCRAPED: Player[] = (NPB_JSON as Rec[])
  .filter((r) => !JUNK.has(r.n) && r.n.length >= 2)
  .map((r) => {
    const traits = (MARQUEE[r.n] || r.t) as Trait[];
    const bat = r.b && r.b !== "調査中" ? r.b : undefined;
    const spikes = r.s && r.s !== "調査中" ? r.s : undefined;
    return {
      name: r.n,
      league: r.l as "NPB" | "MLB",
      position: POS_JP[r.p] || r.p,
      glove: r.g,
      bat,
      spikes,
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

const MLB_CURATED: Player[] = MLB_RAW.map((m) => ({
  name: m.name,
  league: "MLB" as const,
  position: m.pos,
  glove: m.glove,
  bat: m.bat,
  spikes: m.spikes,
  traits: m.traits,
  note: m.note,
  productKeyword: kwFor(m.glove),
  productHeading: headFor(m.glove),
}));

export const PLAYERS: Player[] = [...SCRAPED, ...MLB_CURATED];

export const PLAYER_COUNT = PLAYERS.length;
export const NPB_COUNT = PLAYERS.filter((p) => p.league === "NPB").length;
export const MLB_COUNT = PLAYERS.filter((p) => p.league === "MLB").length;
