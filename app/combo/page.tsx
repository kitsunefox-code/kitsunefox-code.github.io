import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { MBTI_TYPES } from "@/data/baseballMbti";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "MBTI×選手タイプ 複合診断｜あなたの野球人格をダブルでチェック",
  description:
    "野球選手MBTI診断と野球選手タイプ診断、2つの結果を掛け合わせた複合診断。「ENTJ×豪快アーチスト型」のように、あなたの性格タイプとプレースタイルを同時に読み解きます。",
  alternates: { canonical: `${SITE_URL}/combo/` },
  openGraph: {
    title: "MBTI×選手タイプ 複合診断",
    description: "2つの診断結果を掛け合わせて、あなたの野球人格をダブルでチェック。",
    type: "website",
    url: `${SITE_URL}/combo/`,
    images: [{ url: "/og-combo.png", width: 1200, height: 630 }],
  },
};

export default function ComboHubPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "32px 0 26px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Combo Diagnosis
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 34px)", margin: "6px 0 10px" }}>
            MBTI×選手タイプ<span className="hl">複合診断</span>
          </h1>
          <p style={{ fontSize: 15 }}>
            「野球選手MBTI診断」と「野球選手タイプ診断」、2つの結果を掛け合わせると、
            あなたの野球人格がもっと立体的にわかります。まずはMBTIタイプを選んでください。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 20 }}>
        <AdSlot id="combohub-top" />

        <div className="type-hub-grid">
          {MBTI_TYPES.map((t) => (
            <a key={t.code} className="type-hub-card" href={`/combo/${t.code.toLowerCase()}/`}>
              <span className="type-hub-emoji">{t.emoji}</span>
              <span className="type-hub-name">
                {t.code}
                <br />
                {t.nickname}
              </span>
              <span className="type-hub-desc">この型×選手タイプの組み合わせを見る</span>
              <span className="type-hub-cta">16通りを見る →</span>
            </a>
          ))}
        </div>

        <div className="bat-links" style={{ paddingTop: 26, paddingBottom: 40 }}>
          <a className="cta-inline" href="/baseball-mbti/">
            → まだの人は野球選手MBTI診断から
          </a>
          <a className="cta-inline" href="/player-shindan/">
            → 野球選手タイプ診断はこちら
          </a>
        </div>
      </div>
    </main>
  );
}
