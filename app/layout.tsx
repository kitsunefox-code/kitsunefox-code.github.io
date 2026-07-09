import type { Metadata } from "next";
import Script from "next/script";
import { Crimson_Pro, Shippori_Mincho_B1 } from "next/font/google";
import {
  SITE_URL,
  SITE_NAME,
  ADSENSE_CLIENT_ID,
  GA4_MEASUREMENT_ID,
} from "@/data/site";
import "./globals.css";

// 英字ラベル用のセリフ体（雑誌のスモールキャップス的な使い方）
const crimson = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

// 日本語見出し用の太い明朝（雑誌の大見出し。unicode-range分割で必要な文字だけ配信される）
const shippori = Shippori_Mincho_B1({
  weight: ["600", "700"],
  preload: false,
  variable: "--font-mincho",
  display: "swap",
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
    <html lang="ja" className={`${crimson.variable} ${shippori.variable}`}>
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
              <span className="logo-mark">草野球ナビ</span>
              <span className="logo-sub">KUSAYAKYU NAVI</span>
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
            <div className="ft-top">
              <div className="ft-brand">
                <p className="ft-wordmark">草野球ナビ</p>
                <p className="ft-en">KUSAYAKYU NAVI — 草野球の総合ナビ</p>
              </div>
              <div className="ft-cols">
                <div className="ft-col">
                  <p className="ft-head">くらべる</p>
                  <a href="/hikaku/">比較まとめ</a>
                  <a href="/uniform/">ユニフォーム</a>
                  <a href="/bat/">バット</a>
                  <a href="/glove/">グローブ</a>
                  <a href="/spikes/">スパイク</a>
                </div>
                <div className="ft-col">
                  <p className="ft-head">たしかめる</p>
                  <a href="/baseball-dock/">野球人間ドック</a>
                  <a href="/baseball-dock/type/">全16タイプ解説</a>
                  <a href="/shindan/">ユニフォーム診断</a>
                  <a href="/tools/">診断ツール一覧</a>
                </div>
                <div className="ft-col">
                  <p className="ft-head">よみもの</p>
                  <a href="/guide/how-to-start/">草野球の始め方</a>
                  <a href="/guide/build-a-team/">チームの作り方</a>
                  <a href="/guide/uniform-how-to/">ユニフォームの作り方</a>
                  <a href="/guide/">ガイド一覧</a>
                </div>
                <div className="ft-col">
                  <p className="ft-head">サイト情報</p>
                  <a href="/about/">運営者情報・評価基準</a>
                  <a href="/privacy/">プライバシーポリシー</a>
                </div>
              </div>
            </div>
            <div className="ft-note">
              <p>
                掲載している価格・納期・仕様は各社公開情報をもとにした目安です。
                最新・正確な内容は必ず各メーカー公式サイトでご確認ください。
              </p>
              <p>
                診断タイプのアイコンは
                <a href="https://game-icons.net/" target="_blank" rel="noopener noreferrer">
                  game-icons.net
                </a>
                （Lorc, Delapouite, Skoll, Lord Berandas, Caro Asercion 作）を
                <a
                  href="https://creativecommons.org/licenses/by/3.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CC BY 3.0
                </a>
                のもとで使用しています。
              </p>
            </div>
            <p className="ft-copy">© {new Date().getFullYear()} 草野球ナビ</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
