import type { Metadata } from "next";
import Script from "next/script";
import { Crimson_Pro } from "next/font/google";
import {
  SITE_URL,
  SITE_NAME,
  ADSENSE_CLIENT_ID,
  GA4_MEASUREMENT_ID,
} from "@/data/site";
import "./globals.css";

// 見出し・英字ラベル用のエレガントなセリフ体（Vermicular風の上質な印象）
const crimson = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

const DESCRIPTION =
  "草野球のはじめの一歩をまるごとサポート。オーダーユニフォームのメーカー比較（価格・納期・昇華/刺繍）を軸に、チームの始め方・道具えらび・運営のコツまで解説する草野球の総合ナビサイトです。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "草野球ナビ｜ユニフォームメーカー比較＆チーム運営お役立ちガイド",
    template: "%s｜草野球ナビ",
  },
  description: DESCRIPTION,
  keywords: [
    "草野球",
    "ユニフォーム",
    "オーダー",
    "比較",
    "作成",
    "昇華",
    "刺繍",
    "価格",
    "メーカー",
    "おすすめ",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "草野球ナビ｜ユニフォームメーカー比較＆チーム運営お役立ちガイド",
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={crimson.variable}>
      <body>
        {/* デプロイ直後の古いキャッシュ対策：失効したJS/CSSチャンクの読み込み失敗を
            検知したら、キャッシュを回避して1回だけ自動リロードする（無限ループ防止つき） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var K="__chunk_reload_ts";
  function ok(){try{var l=parseInt(sessionStorage.getItem(K)||"0",10);return (Date.now()-l)>15000;}catch(e){return true;}}
  function go(){if(!ok())return;try{sessionStorage.setItem(K,String(Date.now()));}catch(e){}var u=new URL(location.href);u.searchParams.set("_r",Date.now().toString(36));location.replace(u.toString());}
  addEventListener("error",function(e){var t=e&&e.target;if(t&&(t.tagName==="SCRIPT"||t.tagName==="LINK")){var s=t.src||t.href||"";if(s.indexOf("/_next/static/")>-1)go();}},true);
  addEventListener("unhandledrejection",function(e){var r=e&&e.reason,n=r&&(r.name||""),m=r&&(r.message||"");if(n==="ChunkLoadError"||/Loading (chunk|CSS chunk)/i.test(m))go();});
  addEventListener("DOMContentLoaded",function(){try{if(new URL(location.href).searchParams.has("_r")){var u=new URL(location.href);u.searchParams.delete("_r");history.replaceState(null,"",u.pathname+u.search+u.hash);}}catch(e){}});
})();`,
          }}
        />

        {/* AdSense（data/site.ts にクライアントIDを設定すると有効化） */}
        {ADSENSE_CLIENT_ID && (
          <Script
            id="adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* Google Analytics 4（data/site.ts に測定IDを設定すると有効化） */}
        {GA4_MEASUREMENT_ID && (
          <>
            <Script
              id="ga4-src"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}

        {/* ステマ規制（景表法）対応のPR表記 */}
        <div className="pr-note">
          ※当サイトは広告（アフィリエイト）を利用しています
        </div>

        <header className="site-header">
          <div className="container">
            <a className="logo" href="/" aria-label="草野球ナビ">
              <span className="ball">⚾</span>
              <span>
                草野球ナビ
                <span className="logo-sub">道具・ユニフォーム比較＆お役立ちガイド</span>
              </span>
            </a>
            <nav>
              <a href="/hikaku/">比較</a>
              <a href="/tools/">診断・ツール</a>
              <a href="/guide/">ガイド</a>
              <a href="/uniform/">ユニフォーム</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container">
            <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#fff" }}>
              ⚾ 草野球ナビ
            </p>
            <p style={{ margin: 0 }}>
              掲載している価格・納期・仕様は各社公開情報をもとにした目安です。
              最新・正確な内容は必ず各メーカー公式サイトでご確認ください。
            </p>
            <p style={{ margin: "10px 0 0" }}>
              <a href="/hikaku/">比較まとめ</a>
              {" ｜ "}
              <a href="/uniform/">ユニフォーム比較</a>
              {" ｜ "}
              <a href="/tools/">無料ツール</a>
              {" ｜ "}
              <a href="/shindan/">ユニフォーム診断</a>
              {" ｜ "}
              <a href="/bat-shindan/">バット診断</a>
              {" ｜ "}
              <a href="/glove-shindan/">グローブ診断</a>
              {" ｜ "}
              <a href="/glove-fortune/">グローブ占い</a>
              {" ｜ "}
              <a href="/guide/">お役立ちガイド</a>
              {" ｜ "}
              <a href="/about/">運営者情報・評価基準</a>
              {" ｜ "}
              <a href="/privacy/">プライバシーポリシー</a>
            </p>
            <p style={{ margin: "10px 0 0" }}>
              © {new Date().getFullYear()} 草野球ナビ
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
