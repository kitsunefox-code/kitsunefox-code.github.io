// サイト全体の設定。収益化まわりはこのファイルだけ編集すればOKです。

/** 独自ドメイン取得後に差し替え（末尾スラッシュなし） */
export const SITE_URL = "https://kitsunefox-code.github.io";

export const SITE_NAME = "草野球ユニフォーム比較ナビ";

/**
 * Google AdSense のクライアントID（例: "ca-pub-1234567890123456"）
 * AdSense 審査通過後にここへ設定すると、サイト全体の広告枠が
 * プレースホルダーから実際の広告に自動で切り替わります。
 */
export const ADSENSE_CLIENT_ID = "";

/**
 * Google Analytics 4 の測定ID（例: "G-XXXXXXXXXX"）
 * 設定するとアクセス解析タグが全ページに入ります。
 * アクセス数の把握は ASP・メーカー直提携の交渉材料になるので早めの設置推奨。
 */
export const GA4_MEASUREMENT_ID = "G-SKWMPWFK49";

/** お問い合わせ先（Googleフォーム等のURLに差し替え推奨。メールなら "mailto:xxx@example.com"） */
export const CONTACT_URL = "mailto:konkon0621@gmail.com";

/**
 * 関連グッズ（アフィリエイトリンク集）
 * url に A8.net で発行したリンク（https://px.a8.net/svt/ejp?a8mat=... 形式）を入れると
 * トップページと記事下に「関連グッズ」セクションが表示されます。空配列なら非表示。
 */
export type GoodsLink = {
  label: string;
  description: string;
  url: string;
  emoji: string;
};

export const GOODS_LINKS: GoodsLink[] = [
  // 例: A8の楽天リンク発行後にここへ追加
  // {
  //   label: "楽天市場で野球ユニフォームを探す",
  //   description: "既製ユニフォーム・練習着が豊富。ポイントも貯まる",
  //   url: "https://px.a8.net/svt/ejp?a8mat=XXXXX",
  //   emoji: "🛒",
  // },
];

/**
 * 広告枠ごとのスロットID（AdSense の管理画面で広告ユニットを作ると発行される数字）
 * 未設定の枠はレスポンシブの自動広告として出ます。
 */
export const ADSENSE_SLOTS: Record<string, string> = {
  "top-under-hero": "",
  "under-compare": "",
  "article-top": "",
  "article-bottom": "",
  "shindan-result": "",
};
