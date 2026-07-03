// 掲載メーカーのデータ。
// price は 2026年7月時点で各社サイト・比較記事から拾った「最安の目安」です。
// 価格・納期は変動するため、UI 上でも「公式サイトで要確認」を明記しています。
//
// ▼収益化のポイント▼
// affiliateUrl にアフィリエイトリンク（A8.net / もしも / 楽天 等）を入れると、
// 「公式サイトへ」ボタンがそのリンクに切り替わります。空なら officialUrl を使います。
//
// ▼ratings（編集部評価）▼
// 各5点満点。公開情報（価格・ロット・納期・実績・対応方式）をもとにした当サイトの評価。
// 配列の並び順 = 総合評価順（おすすめランキングの順位）です。

export type OrderMethod =
  | "昇華"
  | "刺繍"
  | "マーキング"
  | "セミオーダー"
  | "フルオーダー";

export type Tag =
  | "価格重視"
  | "実績重視"
  | "ブランド重視"
  | "品質重視"
  | "短納期"
  | "少人数OK"
  | "デザイン相談"
  | "実店舗あり";

export type Ratings = {
  /** 価格の安さ */
  price: number;
  /** デザイン自由度 */
  design: number;
  /** 納期の早さ */
  speed: number;
  /** 少人数対応 */
  smallLot: number;
  /** ブランド力・実績 */
  trust: number;
};

export type Maker = {
  id: string;
  name: string;
  officialUrl: string;
  affiliateUrl?: string; // ← アフィリエイトリンクに差し替える枠
  /** ソート用の最安値（円）。不明な場合は null（一覧の末尾に並べる） */
  priceMin: number | null;
  /** 表示用の価格ラベル */
  priceLabel: string;
  /** 価格の単位（例: 上下2点セット / シャツ1着） */
  priceUnit: string;
  /** 最低ロット（初回注文の目安） */
  minLot: string;
  /** 納期の目安 */
  leadTime: string;
  methods: OrderMethod[];
  designSimulator: boolean;
  features: string[];
  tags: Tag[];
  ratings: Ratings;
};

export const LAST_UPDATED = "2026年7月";

/** CTA用リンク：アフィリエイトリンクがあればそれを、なければ公式URLを返す */
export function ctaUrl(m: Maker): string {
  return m.affiliateUrl && m.affiliateUrl.length > 0
    ? m.affiliateUrl
    : m.officialUrl;
}

/** 総合評価（5軸の平均、小数1桁） */
export function overallScore(m: Maker): number {
  const r = m.ratings;
  return Math.round(((r.price + r.design + r.speed + r.smallLot + r.trust) / 5) * 10) / 10;
}

export const RATING_AXES: { key: keyof Ratings; label: string }[] = [
  { key: "price", label: "価格" },
  { key: "design", label: "デザイン自由度" },
  { key: "speed", label: "納期" },
  { key: "smallLot", label: "少人数対応" },
  { key: "trust", label: "実績・ブランド" },
];

export const makers: Maker[] = [
  {
    id: "fungo",
    name: "Fungo（ファンゴ）",
    officialUrl: "https://fungobaseball.com/",
    priceMin: 7980,
    priceLabel: "7,980円〜（枚数・仕様で変動）",
    priceUnit: "上下2点セット",
    minLot: "1着〜",
    leadTime: "公式サイトで要確認",
    methods: ["昇華", "刺繍", "マーキング"],
    designSimulator: true,
    features: [
      "累計70万着以上の製作実績",
      "胸マーク・背番号・背ネーム込みのオールインワン価格",
      "昇華・刺繍・覇王（ハイブリッド）から選べる",
    ],
    tags: ["実績重視", "価格重視"],
    ratings: { price: 4.5, design: 4.5, speed: 3.5, smallLot: 5, trust: 4.5 },
  },
  {
    id: "ilb-max",
    name: "ILB-MAX（アイエルビーマックス）",
    officialUrl: "https://ilb-max.com/",
    priceMin: 5600,
    priceLabel: "5,600円〜",
    priceUnit: "シャツ1着",
    minLot: "1着〜（要確認）",
    leadTime: "公式サイトで要確認",
    methods: ["昇華", "刺繍", "マーキング"],
    designSimulator: true,
    features: [
      "最安値保証をうたう価格重視ブランド",
      "デザインテンプレートが5,000種類以上",
      "年間約3,000チームの実績",
    ],
    tags: ["価格重視", "デザイン相談"],
    ratings: { price: 5, design: 4.5, speed: 3.5, smallLot: 4.5, trust: 3.5 },
  },
  {
    id: "wakkuon",
    name: "WAKKUON（ワックオン）",
    officialUrl: "https://wakkuon.jp/",
    priceMin: 7980,
    priceLabel: "7,980円〜（枚数で変動）",
    priceUnit: "上下2点セット",
    minLot: "1着〜",
    leadTime: "公式サイトで要確認",
    methods: ["昇華"],
    designSimulator: false,
    features: [
      "工場直結で国内最安クラスの価格",
      "プロのデザイナーが提案してくれる",
      "1着からオーダー可能",
    ],
    tags: ["価格重視", "デザイン相談"],
    ratings: { price: 4.5, design: 4.5, speed: 3.5, smallLot: 5, trust: 3.5 },
  },
  {
    id: "uniformlab",
    name: "ユニフォームラボ",
    officialUrl: "https://www.uniformlab.jp/baseball/",
    priceMin: null,
    priceLabel: "要確認",
    priceUnit: "セミオーダー",
    minLot: "1着〜",
    leadTime: "最短5日発送",
    methods: ["セミオーダー", "マーキング"],
    designSimulator: false,
    features: [
      "1着からオーダーOK",
      "最短5日発送のスピード対応",
      "セカンドユニフォームや追加にも便利",
    ],
    tags: ["少人数OK", "短納期"],
    ratings: { price: 3.5, design: 3, speed: 5, smallLot: 5, trust: 3.5 },
  },
  {
    id: "sork",
    name: "SORK（ソーク）",
    officialUrl: "https://bb.sork.jp/",
    priceMin: 4400,
    priceLabel: "4,400円〜（セール時）",
    priceUnit: "シャツ1着",
    minLot: "公式サイトで要確認",
    leadTime: "公式サイトで要確認",
    methods: ["昇華", "刺繍", "セミオーダー", "フルオーダー"],
    designSimulator: true,
    features: [
      "東京・大阪にショールームあり",
      "イージーオーダー〜フルオーダーまで対応",
      "実物を見て相談できる",
    ],
    tags: ["デザイン相談", "実店舗あり"],
    ratings: { price: 4, design: 4.5, speed: 3.5, smallLot: 3.5, trust: 4 },
  },
  {
    id: "zett",
    name: "ZETT（ゼット）",
    officialUrl: "https://zett-baseball.jp/",
    priceMin: 9900,
    priceLabel: "9,900円〜（5ヶ所マーク）",
    priceUnit: "シャツ1着",
    minLot: "5枚〜（初回）",
    leadTime: "公式サイトで要確認",
    methods: ["昇華", "刺繍"],
    designSimulator: true,
    features: [
      "野球用品大手ブランドの安心感",
      "Web上でオーダーシミュレーションができる",
    ],
    tags: ["ブランド重視"],
    ratings: { price: 3.5, design: 4, speed: 3.5, smallLot: 3.5, trust: 5 },
  },
  {
    id: "ssk",
    name: "SSK（エスエスケイ）",
    officialUrl: "https://uniform.ssksports.com/",
    priceMin: 7020,
    priceLabel: "7,020円〜（税抜）",
    priceUnit: "シャツ1着",
    minLot: "公式サイトで要確認（追加は1着〜）",
    leadTime: "約6〜7週間",
    methods: ["昇華", "刺繍"],
    designSimulator: true,
    features: [
      "プロ選手も多数使用する老舗野球ブランド",
      "スマホで完結する昇華3Dシミュレーター（ベース18種×124色）",
      "追加注文は1着から対応",
    ],
    tags: ["ブランド重視"],
    ratings: { price: 4, design: 4, speed: 2.5, smallLot: 3.5, trust: 5 },
  },
  {
    id: "unio",
    name: "UNIO（ユニオ）",
    officialUrl: "https://unio-baseball.jp/",
    priceMin: null,
    priceLabel: "要確認",
    priceUnit: "上下セット",
    minLot: "5枚〜（初回）",
    leadTime: "通常約3週間／特急便 約2週間",
    methods: ["昇華", "刺繍"],
    designSimulator: false,
    features: [
      "追加注文は1着から対応",
      "特急便で最短2週間の短納期",
    ],
    tags: ["短納期"],
    ratings: { price: 3.5, design: 4, speed: 4.5, smallLot: 3.5, trust: 3.5 },
  },
  {
    id: "reward",
    name: "REWARD（レワード）",
    officialUrl: "https://www.reward.co.jp/",
    priceMin: 6500,
    priceLabel: "6,500円〜",
    priceUnit: "上下セット",
    minLot: "公式サイトで要確認",
    leadTime: "公式サイトで要確認",
    methods: ["昇華", "刺繍", "フルオーダー"],
    designSimulator: false,
    features: [
      "野球ユニフォームの老舗ブランド",
      "昇華から本格フルオーダーまで幅広く対応",
    ],
    tags: ["ブランド重視", "品質重視"],
    ratings: { price: 4, design: 4, speed: 3, smallLot: 3.5, trust: 4.5 },
  },
  {
    id: "mizuno",
    name: "ミズノ（Mizuno）",
    officialUrl: "https://mcsty.mizuno.com/ja_JP/baseball",
    priceMin: 6800,
    priceLabel: "6,800円〜（目安）",
    priceUnit: "シャツ1着",
    minLot: "公式サイトで要確認",
    leadTime: "公式サイトで要確認",
    methods: ["昇華", "刺繍", "マーキング"],
    designSimulator: true,
    features: [
      "プロ野球でも採用される国内最大手ブランド",
      "公式「ミズノカスタムスタジオ」でシミュレーションできる",
      "全国の取扱店で実物・サイズを確認できる",
    ],
    tags: ["ブランド重視", "品質重視"],
    ratings: { price: 3.5, design: 3.5, speed: 3, smallLot: 3.5, trust: 5 },
  },
  {
    id: "eugene",
    name: "イウジン（EUGENE）",
    officialUrl: "https://www.jsd-web.com/",
    priceMin: 13000,
    priceLabel: "13,000円〜",
    priceUnit: "上下セット",
    minLot: "公式サイトで要確認",
    leadTime: "公式サイトで要確認",
    methods: ["刺繍", "昇華", "フルオーダー"],
    designSimulator: true,
    features: [
      "創業25年・6,700チーム以上の実績",
      "デザインシミュレーター搭載",
      "デザインから製造まで一貫の完全オーダーメイド",
    ],
    tags: ["品質重視", "実績重視"],
    ratings: { price: 3, design: 4.5, speed: 3, smallLot: 3.5, trust: 4.5 },
  },
  {
    id: "bwos",
    name: "BWOS（ベースボールウェアオーダーショップ）",
    officialUrl: "https://bwos.tyscp.com/",
    priceMin: 7150,
    priceLabel: "7,150円〜",
    priceUnit: "シャツ＋帽子2点",
    minLot: "公式サイトで要確認",
    leadTime: "公式サイトで要確認",
    methods: ["昇華"],
    designSimulator: false,
    features: [
      "昇華プリント専門で低価格",
      "シャツ＋帽子の2点セットが手頃",
    ],
    tags: ["価格重視"],
    ratings: { price: 4.5, design: 4, speed: 3, smallLot: 3.5, trust: 3 },
  },
  {
    id: "asics",
    name: "アシックス（ASICS）",
    officialUrl: "https://www.asics.com/jp/ja-jp/mk/custom/category",
    priceMin: 15800,
    priceLabel: "15,800円〜（目安）",
    priceUnit: "上下セット",
    minLot: "公式サイトで要確認",
    leadTime: "公式サイトで要確認",
    methods: ["昇華", "刺繍"],
    designSimulator: true,
    features: [
      "侍ジャパンも採用する国内トップブランド",
      "公式チームカスタムオーダーで本格仕様",
      "高品質素材で耐久性に定評",
    ],
    tags: ["ブランド重視", "品質重視"],
    ratings: { price: 2.5, design: 3.5, speed: 3, smallLot: 3, trust: 5 },
  },
];

export const ALL_METHODS: OrderMethod[] = [
  "昇華",
  "刺繍",
  "マーキング",
  "セミオーダー",
  "フルオーダー",
];

export const ALL_TAGS: Tag[] = [
  "価格重視",
  "短納期",
  "少人数OK",
  "実績重視",
  "ブランド重視",
  "品質重視",
  "デザイン相談",
  "実店舗あり",
];
