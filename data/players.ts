// 野球選手の使用メーカー＆プレースタイル・データ。
// NPB選手は公開データベース（各賞・ベストナイン等）から取材し、機械的に構造化。
// 使用ギアは公開情報に基づく参考（時期・場面により変わることがあります）。
// 性格診断で「あなたに近い選手」をマッチし、その選手の使用メーカー／実商品を表示する。

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
  ナイキ: "野球 スパイク ナイキ",
  ニューバランス: "野球 スパイク ニューバランス",
  アディダス: "野球 スパイク アディダス",
  各社: "軟式 グローブ 一般",
};

function noteFor(pos: string, traits: Trait[], glove: string): string {
  let head = "";
  if (traits.includes("twoway")) head = "二刀流の";
  else if (traits.includes("pitcher")) head = "マウンドで魅せる";
  else if (traits.includes("power")) head = "長打が魅力の";
  else if (traits.includes("catcher")) head = "扇の要となる";
  else if (traits.includes("speed")) head = "足で沸かせる";
  else if (traits.includes("defense")) head = "守備が光る";
  else if (traits.includes("contact")) head = "当てて弾き返す";
  else head = "勝負強い";
  const g = glove !== "各社" ? `使用グローブは「${glove}」。` : "";
  return `${head}${pos}。${g}`;
}

// [name, league, position, glove, traits] （公開データベースより機械取材）
const RAW: [string, "NPB" | "MLB", string, string, Trait[]][] = [
  ["坂本勇人", "NPB", "遊撃手", "ミズノ", ["defense", "star"]],
  ["田中広輔", "NPB", "遊撃手", "アシックス", ["defense"]],
  ["中野拓夢", "NPB", "遊撃手", "久保田スラッガー", ["defense"]],
  ["木浪聖也", "NPB", "遊撃手", "久保田スラッガー", ["defense"]],
  ["松井稼頭央", "NPB", "外野手", "ナイキ", ["speed", "contact"]],
  ["中島宏之", "NPB", "遊撃手", "ミズノ", ["defense"]],
  ["鈴木大地", "NPB", "遊撃手", "ミズノ", ["defense"]],
  ["今宮健太", "NPB", "遊撃手", "ゼット", ["defense"]],
  ["中島卓也", "NPB", "遊撃手", "久保田スラッガー", ["defense"]],
  ["源田壮亮", "NPB", "遊撃手", "ゼット", ["defense", "speed"]],
  ["紅林弘太郎", "NPB", "遊撃手", "ミズノ", ["defense"]],
  ["工藤公康", "NPB", "投手", "ミズノ", ["pitcher"]],
  ["井川慶", "NPB", "投手", "ゼット", ["pitcher"]],
  ["黒田博樹", "NPB", "投手", "SSK", ["pitcher", "stoic"]],
  ["前田健太", "NPB", "投手", "ミズノ", ["pitcher"]],
  ["菅野智之", "NPB", "投手", "ミズノ", ["pitcher"]],
  ["野村祐輔", "NPB", "投手", "ゼット", ["pitcher"]],
  ["柳裕也", "NPB", "投手", "ミズノ", ["pitcher"]],
  ["青柳晃洋", "NPB", "投手", "ゼット", ["pitcher"]],
  ["東克樹", "NPB", "投手", "ウィルソン", ["pitcher"]],
  ["松坂大輔", "NPB", "投手", "ナイキ", ["pitcher", "star"]],
  ["ダルビッシュ有", "MLB", "投手", "アシックス", ["pitcher", "technician", "star"]],
  ["和田毅", "NPB", "投手", "アディダス", ["pitcher", "technician"]],
  ["田中将大", "NPB", "投手", "ミズノ", ["pitcher", "clutch"]],
  ["金子千尋", "NPB", "投手", "久保田スラッガー", ["pitcher", "technician"]],
  ["大谷翔平", "MLB", "投手・DH", "ニューバランス", ["twoway", "pitcher", "power", "star"]],
  ["菊池雄星", "MLB", "投手", "各社", ["pitcher"]],
  ["千賀滉大", "MLB", "投手", "ゼット", ["pitcher"]],
  ["山本由伸", "MLB", "投手", "ミズノ", ["pitcher", "stoic", "star"]],
  ["古田敦也", "NPB", "捕手", "ゼット", ["catcher", "leader"]],
  ["阿部慎之助", "NPB", "捕手", "ミズノ", ["catcher", "power", "clutch", "leader"]],
  ["中村悠平", "NPB", "捕手", "ゼット", ["catcher"]],
  ["會澤翼", "NPB", "捕手", "ミズノ", ["catcher"]],
  ["大城卓三", "NPB", "捕手", "ミズノ", ["catcher"]],
  ["城島健司", "MLB", "捕手", "ナイキ", ["catcher", "power", "leader"]],
  ["伊藤光", "NPB", "捕手", "ハタケヤマ", ["catcher"]],
  ["炭谷銀仁朗", "NPB", "捕手", "ミズノ", ["catcher"]],
  ["田村龍弘", "NPB", "捕手", "ミズノ", ["catcher"]],
  ["甲斐拓也", "NPB", "捕手", "SSK", ["catcher", "defense"]],
  ["森友哉", "NPB", "捕手", "ゼット", ["catcher", "contact", "clutch"]],
  ["落合博満", "NPB", "三塁手", "ミズノ", ["power", "contact", "clutch", "technician"]],
  ["小笠原道大", "NPB", "一塁手", "ミズノ", ["power", "contact", "clutch", "stoic"]],
  ["中田翔", "NPB", "一塁手", "ミズノ", ["power"]],
  ["山川穂高", "NPB", "一塁手", "ミズノ", ["power", "flashy", "clutch"]],
  ["頓宮裕真", "NPB", "一塁手", "ゼット", ["contact"]],
  ["山田哲人", "NPB", "二塁手", "ドナイヤ", ["power", "speed", "contact"]],
  ["菊池涼介", "NPB", "二塁手", "ミズノ", ["defense", "flashy"]],
  ["牧秀悟", "NPB", "二塁手", "シュアプレイ", ["contact", "power"]],
  ["浅村栄斗", "NPB", "二塁手", "久保田スラッガー", ["power"]],
  ["中村奨吾", "NPB", "二塁手", "ゼット", ["defense"]],
  ["川端慎吾", "NPB", "三塁手", "SSK", ["contact"]],
  ["宮﨑敏郎", "NPB", "三塁手", "ミズノ", ["contact"]],
  ["高橋周平", "NPB", "三塁手", "久保田スラッガー", ["defense"]],
  ["岡本和真", "NPB", "三塁手", "ローリングス", ["power", "clutch"]],
  ["村上宗隆", "NPB", "三塁手", "ミズノ", ["power", "clutch", "star"]],
  ["中村剛也", "NPB", "三塁手", "SSK", ["power"]],
  ["松田宣浩", "NPB", "三塁手", "ミズノ", ["defense", "flashy"]],
  ["宗佑磨", "NPB", "三塁手", "ローリングス", ["defense"]],
  ["赤星憲広", "NPB", "外野手", "ゼット", ["speed", "contact"]],
  ["大島洋平", "NPB", "外野手", "SSK", ["contact"]],
  ["佐野恵太", "NPB", "外野手", "ゼット", ["contact"]],
  ["近本光司", "NPB", "外野手", "久保田スラッガー", ["speed", "contact"]],
  ["イチロー", "MLB", "外野手", "ミズノ", ["contact", "speed", "star", "technician"]],
  ["秋山翔吾", "NPB", "外野手", "SSK", ["contact"]],
  ["近藤健介", "NPB", "外野手", "ミズノ", ["contact"]],
  ["杉本裕太郎", "NPB", "外野手", "ミズノ", ["power"]],
  ["松本剛", "NPB", "外野手", "SSK", ["contact"]],
  ["栗山巧", "NPB", "外野手", "ミズノ", ["contact"]],
  ["吉田正尚", "MLB", "外野手", "ウィルソン", ["contact", "power"]],
  ["長嶋茂雄", "NPB", "三塁手", "ローリングス", ["flashy", "clutch", "leader", "star"]],
  ["王貞治", "NPB", "一塁手", "ミズノ", ["power", "clutch", "leader", "star"]],
  ["松井秀喜", "MLB", "外野手", "ミズノ", ["power", "clutch", "stoic", "star"]],
  ["内川聖一", "NPB", "外野手", "ミズノ", ["contact", "technician"]],
  ["柳田悠岐", "NPB", "外野手", "アンダーアーマー", ["power", "speed", "flashy"]],
];

const SCRAPED: Player[] = RAW.map(([name, league, position, glove, traits]) => ({
  name,
  league,
  position,
  glove,
  traits,
  note: noteFor(position, traits, glove),
  productKeyword: GLOVE_KW[glove] || "軟式 グローブ 一般",
  productHeading: `${name}が使う「${glove}」`,
}));

// MLBのアメリカ人スター（広く知られた使用ギア）
const CURATED: Player[] = [
  {
    name: "マイク・トラウト",
    league: "MLB",
    position: "外野手",
    glove: "ローリングス",
    bat: "オールドヒッコリー",
    spikes: "ナイキ",
    traits: ["power", "speed", "contact", "star"],
    note: "MLB屈指の“5ツ道具”。走攻守すべてを高次元でこなす大スター。",
    productKeyword: "軟式 グローブ ローリングス 外野",
    productHeading: "トラウトが使う「ローリングス」の外野手用グローブ",
  },
  {
    name: "ムーキー・ベッツ",
    league: "MLB",
    position: "外野手・内野手",
    glove: "ウィルソン",
    bat: "ヴィクタス",
    spikes: "ナイキ",
    traits: ["defense", "speed", "contact", "flashy"],
    note: "身体能力の塊。守備範囲と俊足で複数ポジションをこなす多才な万能選手。",
    productKeyword: "軟式 グローブ ウィルソン 外野",
    productHeading: "ベッツが使う「ウィルソン」のグローブ",
  },
  {
    name: "アーロン・ジャッジ",
    league: "MLB",
    position: "外野手",
    glove: "ローリングス",
    bat: "チャンドラー",
    spikes: "アディダス",
    traits: ["power", "clutch", "star"],
    note: "規格外の巨体から放つ特大アーチ。球界屈指のスラッガー。",
    productKeyword: "軟式 グローブ ローリングス 外野",
    productHeading: "ジャッジが使う「ローリングス」のグローブ",
  },
  {
    name: "ブライス・ハーパー",
    league: "MLB",
    position: "外野手・一塁手",
    glove: "ローリングス",
    bat: "マルーチ",
    spikes: "アンダーアーマー",
    traits: ["power", "flashy", "star", "clutch"],
    note: "スター性抜群の左の大砲。豪快さと勝負強さを兼ね備える。",
    productKeyword: "軟式 グローブ ローリングス 一般",
    productHeading: "ハーパーが使う「ローリングス」のグローブ",
  },
  {
    name: "フェルナンド・タティスJr",
    league: "MLB",
    position: "外野手",
    glove: "ローリングス",
    bat: "マルーチ",
    spikes: "アディダス",
    traits: ["power", "speed", "flashy", "star"],
    note: "身体能力とスター性の塊。魅せるプレーでスタンドを沸かせる。",
    productKeyword: "軟式 グローブ ローリングス 一般",
    productHeading: "タティスが使う「ローリングス」のグローブ",
  },
  {
    name: "ロナルド・アクーニャJr",
    league: "MLB",
    position: "外野手",
    glove: "ローリングス",
    bat: "チャンドラー",
    spikes: "アディダス",
    traits: ["power", "speed", "flashy", "star"],
    note: "パワーと俊足を兼備した爆発力。MLB屈指のダイナモ。",
    productKeyword: "軟式 グローブ ローリングス 外野",
    productHeading: "アクーニャが使う「ローリングス」のグローブ",
  },
];

export const PLAYERS: Player[] = [...SCRAPED, ...CURATED];
