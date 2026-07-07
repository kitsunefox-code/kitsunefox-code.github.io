import type { Metadata } from "next";
import MbtiShindan from "@/components/MbtiShindan";
import AdSlot from "@/components/AdSlot";
import { MBTI_TYPES } from "@/data/baseballMbti";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球選手MBTI診断｜本格36問・あなたは16タイプのどれ？似ているNPB・MLB選手もわかる",
  description:
    "MBTIの4指標（E/I・S/N・T/F・J/P）を野球にあてはめた本格16タイプ診断。全36問に7段階で答えると、あなたの“野球選手MBTI”を軸ごとのパーセンテージ付きで判定。近いプレースタイルのNPB・MLB選手と使用メーカーもわかります。登録不要・無料。",
  alternates: { canonical: `${SITE_URL}/baseball-mbti/` },
  openGraph: {
    title: "野球選手MBTI診断｜本格36問・あなたは16タイプのどれ？",
    description:
      "全36問・7段階回答で、あなたの“野球選手MBTI”を%付きで診断。似ているNPB・MLB選手も。",
    type: "website",
    url: `${SITE_URL}/baseball-mbti/`,
    images: [{ url: "/og-mbti.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球選手MBTI診断｜本格36問・あなたは16タイプのどれ？",
    description: "全36問・7段階で、あなたの“野球選手MBTI”を診断。似ている選手も。",
    images: ["/og-mbti.png"],
  },
};

export default function BaseballMbtiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "野球選手MBTI診断",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/baseball-mbti/`,
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
            Baseball MBTI
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            野球選手<span className="hl">MBTI診断</span>
          </h1>
          <p>
            MBTIの4指標（<strong>E/I・S/N・T/F・J/P</strong>）を野球の性格に置き換えた
            <strong>本格16タイプ診断</strong>。全<strong>36問</strong>に
            <strong>7段階</strong>（そう思う〜そう思わない）で答えると、あなたの“野球選手MBTI”を
            軸ごとの<strong>パーセンテージ付き</strong>で判定。似たプレースタイルの
            <strong>NPB・MLB選手</strong>と使用メーカーもわかります（約3分）。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 12 }}>
        <AdSlot id="mbti-top" />
        <MbtiShindan />
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <div className="score-howto">
          <h2 className="section-title">この診断について</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            外向／内向、堅実／ひらめき、論理／情熱、計画／自由——4つの軸それぞれに9問ずつ、
            計36問を7段階で回答すると、軸ごとの傾向をパーセンテージで算出し、あなたの野球での
            “性格タイプ”を全<strong>{MBTI_TYPES.length}種</strong>から判定します。近い選手の分類は
            プレースタイルをもとにした遊びのもので、公式のMBTIとは無関係です。
            気軽な話のタネに、道具選びのヒントにどうぞ。
          </p>
          <a className="cta-inline" href="/player-shindan/" style={{ marginTop: 14 }}>
            → 「あなたに似ている選手」をズバリ診断する（選手タイプ診断）
          </a>
        </div>
      </div>
    </main>
  );
}
