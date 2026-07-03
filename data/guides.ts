// ガイド記事の一覧(ガイド一覧ページとトップページの導線で使用)
export type Guide = {
  href: string;
  emoji: string;
  title: string;
  description: string;
};

export const GUIDES: Guide[] = [
  {
    href: "/guide/uniform-how-to/",
    emoji: "📖",
    title: "草野球ユニフォームの作り方【7ステップ】",
    description: "費用相場と失敗しないコツ。初めての方はまずこれ",
  },
  {
    href: "/guide/uniform-cost/",
    emoji: "💰",
    title: "ユニフォームの費用相場【2026年版】",
    description: "1人あたり・チーム総額・安く抑える7つのコツ",
  },
  {
    href: "/guide/team-apps/",
    emoji: "📱",
    title: "チーム管理・スコアアプリおすすめ7選",
    description: "出欠・スコア・戦績管理をアプリで解決【無料あり】",
  },
  {
    href: "/guide/team-name-ideas/",
    emoji: "✏️",
    title: "チーム名の決め方＆アイデア100連発",
    description: "かっこいい系・面白い系・和風。NG例も紹介",
  },
  {
    href: "/guide/uniform-number/",
    emoji: "🔢",
    title: "背番号の決め方【人気番号・意味・ルール】",
    description: "エースナンバーの由来から揉めない決め方まで",
  },
];
