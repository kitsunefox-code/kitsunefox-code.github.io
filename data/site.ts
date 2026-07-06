// サイト全体の設定。収益化まわりはこのファイルだけ編集すればOKです。

/** 独自ドメイン（末尾スラッシュなし） */
export const SITE_URL = "https://kusayakyu-navi.com";

export const SITE_NAME = "草野球ナビ";

/**
 * Google AdSense のクライアントID（例: "ca-pub-1234567890123456"）
 * AdSense 審査通過後にここへ設定すると、サイト全体の広告枠が
 * プレースホルダーから実際の広告に自動で切り替わります。
 */
export const ADSENSE_CLIENT_ID = "ca-pub-6423402285554400";

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
  /** A8のインプレッション計測用1x1ピクセル画像URL */
  pixel?: string;
  emoji: string;
};

// 楽天アフィリエイトの品目別リンク（A8.netで生成）。
// 共通部分は固定で、末尾の検索キーワード（野球+◯◯）だけが品目ごとに変わる仕組み。
const RKT_PRE =
  "https://px.a8.net/svt/ejp?a8mat=4B7SGX+2YKM2A+2HOM+BW8O1&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26070331511_4B7SGX_2YKM2A_2HOM_BW8O1%3Fpc%3Dhttps%253A%252F%252Fsearch.rakuten.co.jp%252Fsearch%252Fmall%252F%2525E9%252587%25258E%2525E7%252590%252583%252B";
const RKT_MID =
  "%252F%26m%3Dhttps%253A%252F%252Fsearch.rakuten.co.jp%252Fsearch%252Fmall%252F%2525E9%252587%25258E%2525E7%252590%252583%252B";
// 品目名（野球+◯◯の◯◯部分）の三重エンコード文字列
const RKT_KW: Record<string, string> = {
  uniform:
    "%2525E3%252583%2525A6%2525E3%252583%25258B%2525E3%252583%252595%2525E3%252582%2525A9%2525E3%252583%2525BC%2525E3%252583%2525A0",
  spike:
    "%2525E3%252582%2525B9%2525E3%252583%252591%2525E3%252582%2525A4%2525E3%252582%2525AF",
  glove:
    "%2525E3%252582%2525B0%2525E3%252583%2525AD%2525E3%252583%2525BC%2525E3%252583%252596",
  cap: "%2525E3%252582%2525AD%2525E3%252583%2525A3%2525E3%252583%252583%2525E3%252583%252597",
  under:
    "%2525E3%252582%2525A2%2525E3%252583%2525B3%2525E3%252583%252580%2525E3%252583%2525BC%2525E3%252582%2525B7%2525E3%252583%2525A3%2525E3%252583%252584",
  socks:
    "%2525E3%252582%2525BD%2525E3%252583%252583%2525E3%252582%2525AF%2525E3%252582%2525B9",
  bat: "%2525E3%252583%252590%2525E3%252583%252583%2525E3%252583%252588",
};
export function rkt(key: string): string {
  const kw = RKT_KW[key];
  return RKT_PRE + kw + RKT_MID + kw + "%252F";
}

/**
 * 記事内に差し込むアフィリエイトCTA用の品目マスタ。
 * AffiliateBox コンポーネントから参照する。href は楽天のキーワード検索
 * （アフィリエイトタグ付き）なので、特定商品の在庫切れに影響されない。
 */
export type ProductLink = {
  label: string;
  desc: string;
  href: string;
  emoji: string;
};
export const RAKUTEN: Record<string, ProductLink> = {
  glove: {
    label: "楽天でグローブを探す",
    emoji: "🧤",
    desc: "投手用・内野手用・外野手用。型付け済みモデルも",
    href: rkt("glove"),
  },
  bat: {
    label: "楽天で軟式バットを探す",
    emoji: "🏏",
    desc: "金属・ビヨンド系・カーボン。長さ・重さで絞り込み",
    href: rkt("bat"),
  },
  spike: {
    label: "楽天で野球スパイクを探す",
    emoji: "👟",
    desc: "ポイント（樹脂）底が主流。軽量ローカットも",
    href: rkt("spike"),
  },
  under: {
    label: "楽天でアンダーシャツを探す",
    emoji: "🎽",
    desc: "夏用（冷感）・冬用（保温）。色を揃えてチーム感UP",
    href: rkt("under"),
  },
  socks: {
    label: "楽天で野球ソックスを探す",
    emoji: "🧦",
    desc: "カラーソックス・ストッキングでユニフォーム統一",
    href: rkt("socks"),
  },
  cap: {
    label: "楽天で野球キャップを探す",
    emoji: "🧢",
    desc: "無地・カラー豊富。チーム帽子の下見にも",
    href: rkt("cap"),
  },
  uniform: {
    label: "楽天で野球ユニフォームを探す",
    emoji: "👕",
    desc: "既製ユニフォーム・練習着。楽天ポイントも貯まる",
    href: rkt("uniform"),
  },
};

/** 総合スポーツ通販（A8直リンク・インプレッション計測ピクセル付き） */
export const RETAILERS: { label: string; desc: string; href: string; pixel?: string; emoji: string }[] = [
  {
    label: "【公式】スーパースポーツゼビオ",
    desc: "野球用品・スパイク・小物の総合通販。セールも頻繁",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7SGX+8PRGKY+4ABU+5YJRM",
    pixel: "https://www16.a8.net/0.gif?a8mat=4B7SGX+8PRGKY+4ABU+5YJRM",
    emoji: "⚾",
  },
  {
    label: "【公式】スポーツデポ・アルペン",
    desc: "最短翌日配送。野球用品の品ぞろえが豊富な大型店",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7T8Y+87WGFM+3OSK+5YJRM",
    pixel: "https://www11.a8.net/0.gif?a8mat=4B7T8Y+87WGFM+3OSK+5YJRM",
    emoji: "🏬",
  },
];

export const GOODS_LINKS: GoodsLink[] = [
  {
    label: "楽天で野球ユニフォームを探す",
    description: "既製ユニフォーム・練習着が豊富。楽天ポイントも貯まる",
    url: rkt("uniform"),
    emoji: "👕",
  },
  {
    label: "【公式】スーパースポーツゼビオ",
    description: "野球用品・スパイク・小物の総合通販。セールも頻繁",
    url: "https://px.a8.net/svt/ejp?a8mat=4B7SGX+8PRGKY+4ABU+5YJRM",
    pixel: "https://www16.a8.net/0.gif?a8mat=4B7SGX+8PRGKY+4ABU+5YJRM",
    emoji: "⚾",
  },
  {
    label: "【公式】スポーツデポ・アルペン",
    description: "最短翌日配送。野球用品の品ぞろえが豊富な大型店",
    url: "https://px.a8.net/svt/ejp?a8mat=4B7T8Y+87WGFM+3OSK+5YJRM",
    pixel: "https://www11.a8.net/0.gif?a8mat=4B7T8Y+87WGFM+3OSK+5YJRM",
    emoji: "🏬",
  },
  {
    label: "楽天で野球スパイクを探す",
    description: "ポイント・ローカット・アップシューズまで幅広く",
    url: rkt("spike"),
    emoji: "👟",
  },
  {
    label: "楽天で野球グローブを探す",
    description: "投手用・内野手用・外野手用。型付け済みも",
    url: rkt("glove"),
    emoji: "🧤",
  },
  {
    label: "楽天で野球キャップを探す",
    description: "無地・カラー豊富。チーム帽子の下見にも",
    url: rkt("cap"),
    emoji: "🧢",
  },
  {
    label: "楽天で野球アンダーシャツを探す",
    description: "色を揃えるだけでチーム感アップ。夏用・冬用あり",
    url: rkt("under"),
    emoji: "🎽",
  },
  {
    label: "楽天で野球ソックスを探す",
    description: "カラーソックス・ストッキングでユニフォームを統一",
    url: rkt("socks"),
    emoji: "🧦",
  },
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
