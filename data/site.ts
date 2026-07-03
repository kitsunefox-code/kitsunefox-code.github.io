// サイト全体の設定。収益化まわりはこのファイルだけ編集すればOKです。

/** 独自ドメイン取得後に差し替え（末尾スラッシュなし） */
export const SITE_URL = "https://example.com";

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
export const GA4_MEASUREMENT_ID = "";

/** お問い合わせ先（Googleフォーム等のURLに差し替え推奨。メールなら "mailto:xxx@example.com"） */
export const CONTACT_URL = "mailto:konkon0621@gmail.com";

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
