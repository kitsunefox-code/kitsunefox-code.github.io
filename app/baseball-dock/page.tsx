import type { Metadata } from "next";
import DockShindan from "@/components/DockShindan";
import AdSlot from "@/components/AdSlot";
import { PLAYER_COUNT } from "@/data/players";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球人間ドック｜性格×プレースタイル×バット×グローブを一度にフル診断",
  description:
    "MBTI式の性格検査・プレースタイル適性・バット処方・グローブ処方を、全30問でまとめて受診できる草野球のフル診断。結果は「検査結果報告書」形式で、似ているプロ選手・相性の良いタイプ・あなたに合う道具まで一枚に。登録不要・無料・約4分。",
  alternates: { canonical: `${SITE_URL}/baseball-dock/` },
  openGraph: {
    title: "野球人間ドック｜全30問のフル診断",
    description:
      "性格×プレースタイル×バット×グローブをまとめて検査。結果は報告書形式で。",
    type: "website",
    url: `${SITE_URL}/baseball-dock/`,
    images: [{ url: "/og-dock.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球人間ドック｜全30問のフル診断",
    description: "性格×プレースタイル×バット×グローブをまとめて検査。",
    images: ["/og-dock.png"],
  },
};

export default function BaseballDockPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "野球人間ドック",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/baseball-dock/`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hero" style={{ padding: "34px 0 28px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Full Checkup
          </p>
          <h1 style={{ fontSize: "clamp(24px, 4.6vw, 36px)", margin: "0 0 10px" }}>
            野球<span className="hl">人間ドック</span>
          </h1>
          <p>
            こころ（MBTI式）・プレースタイル・バット・グローブ。4つの検査を
            <strong>全30問・約4分</strong>でまとめて受診し、
            <strong>「検査結果報告書」</strong>を一枚にしてお渡しします。
            似ているプロ選手（{PLAYER_COUNT}名から）や、チーム内の相性までわかる草野球のフル診断です。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 12 }}>
        <AdSlot id="dock-top" />
        <DockShindan />
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <div className="score-howto">
          <h2 className="section-title">この検査について</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            当サイトの4つの診断（野球選手MBTI・選手タイプ・バット相性・グローブ相性）の
            エッセンスを1本にまとめた総合版です。じっくり派には、それぞれの本格版
            （MBTIは36問・バットは9問など）も用意しています。判定・処方はエンタメと
            道具えらびの参考としてお楽しみください。
          </p>
        </div>
      </div>
    </main>
  );
}
