// 比較コンテンツの一覧（比較ハブ /hikaku/ とトップ・ナビで使用）
export type CompareItem = {
  href: string;
  kicker: string;
  title: string;
  desc: string;
};

export const COMPARES: CompareItem[] = [
  {
    href: "/uniform/",
    kicker: "Uniform",
    title: "ユニフォームメーカー比較",
    desc: "オーダーメーカーを価格・納期・少人数対応・実績で採点。1着〜対応や昇華/刺繍の違いも。",
  },
  {
    href: "/bat/",
    kicker: "Bat",
    title: "軟式バット比較",
    desc: "金属・カーボン・ビヨンド系を飛距離・価格で比較。主要ブランドの傾向と選び方も。",
  },
  {
    href: "/glove/",
    kicker: "Glove",
    title: "グローブ比較",
    desc: "ミズノ・SSK・久保田スラッガー・ハタケヤマ等をブランド・ポジション・価格帯で比較。",
  },
  {
    href: "/spikes/",
    kicker: "Spikes",
    title: "スパイク／シューズ比較",
    desc: "ポイント（樹脂）と金具の違い、主要ブランドの特徴、価格帯で比較。",
  },
  {
    href: "/batting-gloves/",
    kicker: "Batting Gloves",
    title: "バッティンググローブ比較",
    desc: "国内・輸入ブランドをグリップ・耐久・価格で比較。木製バット派・アメフトG流用の裏技も。",
  },
];
