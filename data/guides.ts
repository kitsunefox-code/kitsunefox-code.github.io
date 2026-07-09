// ガイド記事の一覧(ガイド一覧ページとトップページの導線で使用)
export type GuideCategory = "team" | "uniform" | "gear" | "care" | "skill";

export type Guide = {
  href: string;
  emoji: string;
  title: string;
  description: string;
  category: GuideCategory;
  /** 新着記事フラグ（トップ・一覧でNEWバッジ＆先頭表示に使う） */
  isNew?: boolean;
};

// カテゴリの表示順とラベル（ガイド一覧ページで使用）
export const GUIDE_CATEGORIES: { key: GuideCategory; label: string; sub: string }[] = [
  { key: "team", label: "はじめる・チーム運営", sub: "始め方・チーム作り・試合・運営のこと" },
  { key: "uniform", label: "ユニフォーム", sub: "作り方・費用相場・背番号" },
  { key: "gear", label: "道具えらび", sub: "グローブ・バット・スパイクの選び方" },
  { key: "care", label: "お手入れ・体のケア", sub: "道具のメンテと、体のコンディショニング" },
  { key: "skill", label: "技術・上達", sub: "打ち方・打順・軟式と硬式の違い" },
];

export const GUIDES: Guide[] = [
  // === はじめる・チーム運営 ===
  {
    href: "/guide/how-to-start/",
    emoji: "⚾",
    title: "草野球の始め方 完全ガイド",
    description: "チームの探し方・作り方・初心者が最初にやること",
    category: "team",
  },
  {
    href: "/guide/build-a-team/",
    emoji: "🏗️",
    title: "草野球チームの作り方【立ち上げ完全マニュアル】",
    description: "メンバー集め・球場・連盟・保険まで7ステップ",
    category: "team",
  },
  {
    href: "/guide/helper-recruit/",
    emoji: "🙋",
    title: "助っ人・メンバーの集め方 完全ガイド",
    description: "募集サイト・アプリ・SNS活用と募集文テンプレ",
    category: "team",
  },
  {
    href: "/guide/game-flow/",
    emoji: "📋",
    title: "試合の進め方・基本ルール完全ガイド",
    description: "当日の流れ・軟式の注意点・相互審判の基礎",
    category: "team",
  },
  {
    href: "/guide/annual-cost/",
    emoji: "🧮",
    title: "草野球の年間費用のリアル【2026年版】",
    description: "チーム運営費・道具代・一試合いくら？お金の全体像",
    category: "team",
  },
  {
    href: "/guide/team-apps/",
    emoji: "📱",
    title: "チーム管理・スコアアプリおすすめ7選",
    description: "出欠・スコア・戦績管理をアプリで解決【無料あり】",
    category: "team",
  },
  {
    href: "/guide/team-name-ideas/",
    emoji: "✏️",
    title: "チーム名の決め方＆アイデア100連発",
    description: "かっこいい系・面白い系・和風。NG例も紹介",
    category: "team",
  },

  // === ユニフォーム ===
  {
    href: "/guide/uniform-how-to/",
    emoji: "📖",
    title: "草野球ユニフォームの作り方【7ステップ】",
    description: "費用相場と失敗しないコツ。初めての方はまずこれ",
    category: "uniform",
  },
  {
    href: "/guide/uniform-cost/",
    emoji: "💰",
    title: "ユニフォームの費用相場【2026年版】",
    description: "1人あたり・チーム総額・安く抑える7つのコツ",
    category: "uniform",
  },
  {
    href: "/guide/uniform-number/",
    emoji: "🔢",
    title: "背番号の決め方【人気番号・意味・ルール】",
    description: "エースナンバーの由来から揉めない決め方まで",
    category: "uniform",
  },

  // === 道具えらび ===
  {
    href: "/guide/gear-checklist/",
    emoji: "🎒",
    title: "道具・装備 一式チェックリスト【初心者向け】",
    description: "最低限そろえるもの・予算・揃える順番",
    category: "gear",
  },
  {
    href: "/guide/glove-guide/",
    emoji: "🧤",
    title: "初めてのグローブの選び方",
    description: "軟式・ポジション別の型・サイズ・型付けまで",
    category: "gear",
  },
  {
    href: "/guide/bat-guide/",
    emoji: "🏏",
    title: "軟式バットの選び方",
    description: "長さ・重さ・素材（金属/カーボン/ビヨンド系）の決め方",
    category: "gear",
  },
  {
    href: "/guide/bat-latest/",
    emoji: "✨",
    title: "軟式バット 最新おすすめ【2026年版】",
    description: "飛距離のビヨンド系・軽いカーボン・扱いやすい金属をタイプ別に",
    category: "gear",
    isNew: true,
  },
  {
    href: "/guide/spikes-guide/",
    emoji: "👟",
    title: "野球スパイクの選び方",
    description: "ポイント/金具・カットの高さ・サイズの合わせ方",
    category: "gear",
  },
  {
    href: "/guide/wood-bat/",
    emoji: "🪵",
    title: "木製バットの選び方と“相棒”ガイド",
    description: "樹種・重心の選び方、折れにくい使い方、手袋・グリップの相棒選び",
    category: "gear",
    isNew: true,
  },
  {
    href: "/guide/grip-tape/",
    emoji: "🎗️",
    title: "バットのグリップテープの種類と巻き方",
    description: "厚さ・素材の違い、下から上へ均等に巻くコツと替えどき",
    category: "care",
    isNew: true,
  },
  {
    href: "/guide/scorebook/",
    emoji: "📝",
    title: "スコアブックの書き方【記号一覧・つけ方の基本】",
    description: "ポジション番号・打撃記号・進塁の書き方をゼロから",
    category: "skill",
    isNew: true,
  },
  {
    href: "/guide/breaking-balls/",
    emoji: "🌀",
    title: "草野球で使える変化球の握り方",
    description: "スライダー・カーブ・フォーク・チェンジアップの握りとコツ",
    category: "skill",
    isNew: true,
  },
  {
    href: "/guide/cant-hit/",
    emoji: "🎯",
    title: "草野球で打てない原因と直し方",
    description: "ボテボテ・空振り・当たらないを4つの原因から解消",
    category: "skill",
    isNew: true,
  },

  // === お手入れ・体のケア ===
  {
    href: "/guide/glove-care/",
    emoji: "🧴",
    title: "グローブのお手入れ・型付け完全ガイド",
    description: "オイルの塗り方・湯もみ・濡れた時・保管まで",
    category: "care",
  },
  {
    href: "/guide/bat-care/",
    emoji: "🧽",
    title: "軟式バットのお手入れ・長持ちのコツ",
    description: "金属・複合の手入れ、グリップ巻き替え、保管の注意",
    category: "care",
  },
  {
    href: "/guide/body-care/",
    emoji: "💠",
    title: "草野球の疲労回復・体のケア完全ガイド",
    description: "翌日に残さない・ケガを防ぐ。肩・肘・腰・脚のケア",
    category: "care",
  },

  // === 技術・上達 ===
  {
    href: "/guide/soft-vs-hard/",
    emoji: "🥎",
    title: "【硬式出身者必見】軟式と硬式の違い",
    description: "ボール・打撃・守備はこう変わる。戸惑いポイントと対処法",
    category: "skill",
  },
  {
    href: "/guide/soft-batting/",
    emoji: "🏏",
    title: "軟式の打ち方のコツ【動画つき】",
    description: "ボテボテのゴロを減らして飛ばす。硬式出身者・初心者向け",
    category: "skill",
  },
  {
    href: "/guide/batting-order/",
    emoji: "🔢",
    title: "打順の組み方【1〜9番の役割・定石】",
    description: "各打順の意味と、草野球で勝てる並べ方のコツ",
    category: "skill",
  },
];
