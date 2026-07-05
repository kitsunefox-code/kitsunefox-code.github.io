import type { Metadata } from "next";
import Script from "next/script";
import {
  SITE_URL,
  SITE_NAME,
  ADSENSE_CLIENT_ID,
  GA4_MEASUREMENT_ID,
} from "@/data/site";
import "./globals.css";

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
    <html lang="ja">
      <body>
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
                <span className="logo-sub">ユニフォーム比較・お役立ちガイド</span>
              </span>
            </a>
            <nav>
              <a href="/#compare">メーカー比較</a>
              <a href="/shindan/">ぴったり診断</a>
              <a href="/guide/">お役立ちガイド</a>
              <a href="/#faq">よくある質問</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container">
            <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#fff" }}>
              ⚾ 草野球ユニフォーム比較ナビ
            </p>
            <p style={{ margin: 0 }}>
              掲載している価格・納期・仕様は各社公開情報をもとにした目安です。
              最新・正確な内容は必ず各メーカー公式サイトでご確認ください。
            </p>
            <p style={{ margin: "10px 0 0" }}>
              <a href="/">メーカー比較</a>
              {" ｜ "}
              <a href="/shindan/">ぴったり診断</a>
              {" ｜ "}
              <a href="/guide/">お役立ちガイド</a>
              {" ｜ "}
              <a href="/about/">運営者情報・評価基準</a>
              {" ｜ "}
              <a href="/privacy/">プライバシーポリシー</a>
            </p>
            <p style={{ margin: "10px 0 0" }}>
              © {new Date().getFullYear()} 草野球ユニフォーム比較ナビ
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
