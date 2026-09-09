// 診断・ツールの一覧（トップページと /tools/ で共用）
export type Tool = {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  badge: string;
  cta: string;
};

export const TOOLS: Tool[] = [
  {
    href: "/bat-shindan/",
    emoji: "🏏",
    title: "軟式バット診断",
    desc: "6問・約1分。素材（金属・カーボン・ビヨンド系）に加えて、身長と打撃スタイルから長さ・重さ・バランスまで提案します。価格の目安つき。",
    badge: "6問・1分",
    cta: "診断する（無料）",
  },
  {
    href: "/glove-shindan/",
    emoji: "🧤",
    title: "グローブ診断",
    desc: "4問・約30秒。あなたのプレースタイルに合う軟式グローブのウェブ（網）の型がわかります。特徴とトレードオフつき。",
    badge: "4問・30秒",
    cta: "診断する（無料）",
  },
  {
    href: "/similar-player/",
    emoji: "⚾",
    title: "野球選手タイプ診断",
    desc: "10問・約1分。あなたのプレースタイルの傾向に近いプロ野球選手を、NPB・MLB657名の中から候補つきで紹介。その選手の使用グローブ・バットもわかります（傾向を見る簡易診断です）。",
    badge: "10問・1分",
    cta: "診断する（無料）",
  },
  {
    href: "/baseball-dock/",
    emoji: "🏥",
    title: "野球人間ドック",
    desc: "サイト唯一の総合診断。全33問すべてMBTI式の7段階で、あなたのMBTIタイプ×最も近いプロ選手（620名超から1人・AIイラスト付き）、バット・グローブの処方まで「検査結果報告書」一枚に。画像で保存してSNSにそのまま貼れます。",
    badge: "看板・フル診断",
    cta: "受診する（約4分・無料）",
  },
  {
    href: "/shindan/",
    emoji: "📷",
    title: "ユニフォーム診断",
    desc: "作りたいイメージ写真をアップすると、配色を解析して相性のいいオーダーメーカーを提案。予算・人数・納期でも絞り込めます。",
    badge: "写真で診断",
    cta: "似合うメーカーを診断する",
  },
];
