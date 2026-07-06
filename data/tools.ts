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
    href: "/shindan/",
    emoji: "📷",
    title: "ユニフォーム診断",
    desc: "作りたいイメージ写真をアップすると、配色を解析して相性のいいオーダーメーカーを提案。予算・人数・納期でも絞り込めます。",
    badge: "写真で診断",
    cta: "似合うメーカーを診断する",
  },
  {
    href: "/bat-shindan/",
    emoji: "🏏",
    title: "バット相性診断",
    desc: "経験・力・打撃タイプ・身長・予算に答えるだけで、あなたに合う軟式バットの素材・長さ・重さ・バランスを提案。実商品も表示。",
    badge: "6問で診断",
    cta: "ぴったりのバットを診断する",
  },
  {
    href: "/glove-shindan/",
    emoji: "🧤",
    title: "グローブ相性診断",
    desc: "ポジション・手の大きさ・重視点・予算から、最適なグローブの型・サイズ・素材・仕上げを提案。内野〜捕手まで対応。実商品も表示。",
    badge: "6問で診断",
    cta: "ぴったりのグローブを診断する",
  },
  {
    href: "/glove-fortune/",
    emoji: "🔮",
    title: "グローブメーカー占い",
    desc: "試合でメインに使うグローブメーカーを選ぶと、今日の野球運を占うおまけツール。IP Selectなどこだわり系まで22ブランド対応。",
    badge: "おまけ・毎日更新",
    cta: "今日の運勢を占う",
  },
];
