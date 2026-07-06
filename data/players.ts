// 野球選手の使用メーカー＆プレースタイル・データ。
// 使用ギアは公開データベース等の公開情報に基づく（時期により変わることがあります）。
// 性格診断で「あなたに近い選手」をマッチングし、その選手の使用メーカー／実商品を表示する。

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
  bat: string;
  spikes: string;
  traits: Trait[];
  note: string;
  // その選手の“買える”代表カテゴリ（楽天検索キーワード）
  productKeyword: string;
  productHeading: string;
};

export const PLAYERS: Player[] = [
  {
    name: "王 貞治",
    league: "NPB",
    position: "一塁手",
    glove: "ミズノ",
    bat: "ミズノ",
    spikes: "アディダス",
    traits: ["power", "leader", "clutch", "star"],
    note: "世界のホームラン王。一本足打法で美しい放物線を描いた不世出の長距離砲。",
    productKeyword: "軟式 バット ミズノ 一般",
    productHeading: "王貞治が愛用「ミズノ」の軟式バット",
  },
  {
    name: "長嶋 茂雄",
    league: "NPB",
    position: "三塁手",
    glove: "ローリングス",
    bat: "ルイスビルスラッガー",
    spikes: "アディダス",
    traits: ["flashy", "clutch", "leader", "star"],
    note: "ミスタープロ野球。ここぞの場面で魅せる、華のあるスター中のスター。",
    productKeyword: "軟式 グローブ ローリングス 一般",
    productHeading: "長嶋茂雄が愛用「ローリングス」のグローブ",
  },
  {
    name: "松井 秀喜",
    league: "MLB",
    position: "外野手",
    glove: "ミズノ",
    bat: "ミズノ",
    spikes: "ミズノ",
    traits: ["power", "clutch", "stoic"],
    note: "ゴジラ。寡黙に振り抜く和製大砲。日米で長打とここ一番の勝負強さ。",
    productKeyword: "軟式 グローブ ミズノ 外野",
    productHeading: "松井秀喜が愛用「ミズノ」のグローブ",
  },
  {
    name: "阿部 慎之助",
    league: "NPB",
    position: "捕手",
    glove: "ミズノ",
    bat: "ミズノ",
    spikes: "ニューバランス",
    traits: ["catcher", "leader", "power", "clutch"],
    note: "扇の要にして主砲。勝負強い打撃でチームを牽引した司令塔。",
    productKeyword: "軟式 キャッチャーミット ミズノ",
    productHeading: "阿部慎之助が愛用「ミズノ」のミット",
  },
  {
    name: "城島 健司",
    league: "MLB",
    position: "捕手",
    glove: "ナイキ",
    bat: "ミズノ",
    spikes: "ナイキ",
    traits: ["catcher", "power", "leader"],
    note: "強打の捕手として日米で存在感。リードと打撃を高いレベルで両立。",
    productKeyword: "軟式 キャッチャーミット ミズノ",
    productHeading: "強打の捕手タイプに「ミズノ」のミット",
  },
  {
    name: "ダルビッシュ 有",
    league: "MLB",
    position: "投手",
    glove: "アシックス",
    bat: "アシックス",
    spikes: "アシックス",
    traits: ["pitcher", "technician", "stoic"],
    note: "研究者気質のパワーピッチャー。無数の球種を操る頭脳派エース。",
    productKeyword: "軟式 グローブ アシックス 投手",
    productHeading: "ダルビッシュが愛用「アシックス」の投手用グローブ",
  },
  {
    name: "田中 将大",
    league: "NPB",
    position: "投手",
    glove: "ミズノ",
    bat: "ミズノ",
    spikes: "アシックス",
    traits: ["pitcher", "clutch", "leader"],
    note: "マー君。負けない勝負師。24勝0敗の伝説を残した精神力の投手。",
    productKeyword: "軟式 グローブ ミズノ 投手",
    productHeading: "田中将大が愛用「ミズノ」の投手用グローブ",
  },
  {
    name: "内川 聖一",
    league: "NPB",
    position: "内野手・外野手",
    glove: "ミズノ",
    bat: "ミズノ",
    spikes: "ミズノ",
    traits: ["contact", "technician"],
    note: "打撃技術の匠。両リーグ首位打者の、当てて弾き返す巧打者。",
    productKeyword: "軟式 グローブ ミズノ 内野",
    productHeading: "巧打者タイプに「ミズノ」のグローブ",
  },
  {
    name: "柳田 悠岐",
    league: "NPB",
    position: "外野手",
    glove: "アンダーアーマー",
    bat: "アンダーアーマー",
    spikes: "アンダーアーマー",
    traits: ["power", "speed", "flashy"],
    note: "ギータ。豪快なフルスイングと走力を兼ね備えたトリプルスリー男。",
    productKeyword: "野球 グローブ アンダーアーマー",
    productHeading: "柳田悠岐が愛用「アンダーアーマー」",
  },
  {
    name: "大谷 翔平",
    league: "MLB",
    position: "投手・DH",
    glove: "ニューバランス",
    bat: "チャンドラー",
    spikes: "ニューバランス",
    traits: ["twoway", "power", "star", "pitcher"],
    note: "二刀流のスーパースター。野球の常識を塗り替えた世界のトップ。",
    productKeyword: "野球 スパイク ニューバランス",
    productHeading: "大谷翔平が愛用「ニューバランス」のスパイク",
  },
  {
    name: "山川 穂高",
    league: "NPB",
    position: "一塁手",
    glove: "ミズノ",
    bat: "ミズノ",
    spikes: "ミズノ",
    traits: ["power", "flashy"],
    note: "“どすこい”の陽気な本塁打王。豪快な一発でスタンドを沸かせる。",
    productKeyword: "軟式 バット ミズノ 一般",
    productHeading: "本塁打王タイプに「ミズノ」の軟式バット",
  },
  {
    name: "源田 壮亮",
    league: "NPB",
    position: "遊撃手",
    glove: "ゼット（プロステイタス）",
    bat: "ゼット",
    spikes: "ゼット",
    traits: ["defense", "technician", "leader"],
    note: "華麗な守備の名手。鉄壁のショートで“魅せる守備”の代名詞。",
    productKeyword: "軟式 グローブ ゼット プロステイタス 内野",
    productHeading: "源田壮亮モデルで有名「ゼット プロステイタス」",
  },
  {
    name: "坂本 勇人",
    league: "NPB",
    position: "遊撃手",
    glove: "久保田スラッガー",
    bat: "ミズノ",
    spikes: "アシックス",
    traits: ["defense", "leader", "contact", "star"],
    note: "巨人の主将。攻守にスター性を放つ、球界を代表する遊撃手。",
    productKeyword: "軟式 グローブ 久保田スラッガー 内野",
    productHeading: "坂本勇人が愛用「久保田スラッガー」の内野手用",
  },
  {
    name: "山本 由伸",
    league: "MLB",
    position: "投手",
    glove: "ミズノ",
    bat: "ミズノ",
    spikes: "ミズノ",
    traits: ["pitcher", "stoic", "technician"],
    note: "独自のトレーニング哲学で頂点へ。日本を代表する精密なエース。",
    productKeyword: "軟式 グローブ ミズノ 投手",
    productHeading: "山本由伸が愛用「ミズノ」の投手用グローブ",
  },
  {
    name: "和田 毅",
    league: "NPB",
    position: "投手",
    glove: "アディダス",
    bat: "アディダス",
    spikes: "アディダス",
    traits: ["pitcher", "technician", "stoic"],
    note: "制球と頭脳のサウスポー。息の長い活躍を続ける技巧派の見本。",
    productKeyword: "野球 グローブ 軟式 投手用",
    productHeading: "技巧派投手タイプにおすすめの投手用グローブ",
  },
  {
    name: "山田 哲人",
    league: "NPB",
    position: "二塁手",
    glove: "ミズノ",
    bat: "ミズノ",
    spikes: "ミズノ",
    traits: ["power", "speed", "contact"],
    note: "トリプルスリーの申し子。攻・走・守そろった万能型の二塁手。",
    productKeyword: "軟式 グローブ ミズノ 内野",
    productHeading: "万能型タイプに「ミズノ」の内野手用グローブ",
  },
  {
    name: "鈴木 誠也",
    league: "MLB",
    position: "外野手",
    glove: "ゼット",
    bat: "ゼット",
    spikes: "ニューバランス",
    traits: ["power", "contact", "clutch"],
    note: "広角に強い打球を飛ばす右の強打者。日本からMLBへ渡った主砲。",
    productKeyword: "軟式 グローブ ゼット 外野",
    productHeading: "鈴木誠也が愛用「ゼット」のグローブ",
  },
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
    productHeading: "トラウトが愛用「ローリングス」の外野手用グローブ",
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
    productHeading: "ベッツが愛用「ウィルソン」のグローブ",
  },
];
