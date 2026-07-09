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
