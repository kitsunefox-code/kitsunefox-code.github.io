// ガイド記事の一覧(ガイド一覧ページとトップページの導線で使用)
export type Guide = {
  href: string;
  emoji: string;
  title: string;
  description: string;
};

export const GUIDES: Guide[] = [
  {
    href: "/guide/how-to-start/",
    emoji: "⚾",
    title: "草野球の始め方 完全ガイド",
    description: "チームの探し方・作り方・初心者が最初にやること",
  },
  {
    href: "/guide/build-a-team/",
    emoji: "🏗️",
    title: "草野球チームの作り方【立ち上げ完全マニュアル】",
    description: "メンバー集め・球場・連盟・保険まで7ステップ",
  },
  {
    href: "/guide/helper-recruit/",
    emoji: "🙋",
    title: "助っ人・メンバーの集め方 完全ガイド",
    description: "募集サイト・アプリ・SNS活用と募集文テンプレ",
  },
  {
    href: "/guide/uniform-how-to/",
    emoji: "📖",
    title: "草野球ユニフォームの作り方【7ステップ】",
    description: "費用相場と失敗しないコツ。初めての方はまずこれ",
  },
  {
    href: "/guide/annual-cost/",
    emoji: "🧮",
    title: "草野球の年間費用のリアル【2026年版】",
    description: "チーム運営費・道具代・一試合いくら？お金の全体像",
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
  {
    href: "/guide/gear-checklist/",
    emoji: "🎒",
    title: "道具・装備 一式チェックリスト【初心者向け】",
    description: "最低限そろえるもの・予算・揃える順番",
  },
  {
    href: "/guide/glove-guide/",
    emoji: "🧤",
    title: "初めてのグローブの選び方",
    description: "軟式・ポジション別の型・サイズ・型付けまで",
  },
  {
    href: "/guide/bat-guide/",
    emoji: "🏏",
    title: "軟式バットの選び方",
    description: "長さ・重さ・素材（金属/カーボン/ビヨンド系）の決め方",
  },
  {
    href: "/guide/spikes-guide/",
    emoji: "👟",
    title: "野球スパイクの選び方",
    description: "ポイント/金具・カットの高さ・サイズの合わせ方",
  },
  {
    href: "/guide/soft-vs-hard/",
    emoji: "🥎",
    title: "【硬式出身者必見】軟式と硬式の違い",
    description: "ボール・打撃・守備はこう変わる。戸惑いポイントと対処法",
  },
  {
    href: "/guide/soft-batting/",
    emoji: "🏏",
    title: "軟式の打ち方のコツ【動画つき】",
    description: "ボテボテのゴロを減らして飛ばす。硬式出身者・初心者向け",
  },
];
