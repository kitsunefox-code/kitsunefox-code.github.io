import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import TypeIcon from "@/components/TypeIcon";
import { MBTI_TYPES } from "@/data/baseballMbti";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球選手MBTI全16タイプ一覧｜あなたはどのタイプ？特徴・相性・似ている選手",
  description:
    "INTJ「知将エース」・ENFP「チームの太陽」…など、野球選手MBTI全16タイプを一覧で解説。それぞれの特徴・相性の良いタイプ／苦手なタイプ・似ているNPB/MLB選手がわかります。あなたのタイプは無料診断でチェック。",
  alternates: { canonical: `${SITE_URL}/baseball-mbti/type/` },
  openGraph: {
    title: "野球選手MBTI全16タイプ一覧｜あなたはどのタイプ？",
    description: "16タイプの特徴・相性・似ている選手を解説。",
    type: "website",
    url: `${SITE_URL}/baseball-mbti/type/`,
    images: [{ url: "/og-mbti.png", width: 1200, height: 630 }],
  },
};

export default function MbtiTypeHubPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "32px 0 26px" }}>
        <div className="container">
          <p className="crumbs">
            <a href="/baseball-mbti/">野球選手MBTI診断</a> › タイプ一覧
          </p>
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Baseball MBTI Types
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 34px)", margin: "6px 0 10px" }}>
            野球選手MBTI<span className="hl">全16タイプ</span>
          </h1>
          <p style={{ fontSize: 15 }}>
            あなたはどのタイプ？それぞれの特徴・相性の良いタイプ／苦手なタイプ・
            似ているNPB・MLB選手を解説しています。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 20 }}>
        <AdSlot id="mbtihub-top" />

        <div className="type-hub-grid">
          {MBTI_TYPES.map((t) => (
            <a
              key={t.code}
              className="type-hub-card"
              href={`/baseball-mbti/type/${t.code.toLowerCase()}/`}
            >
              <TypeIcon icon={t.icon} className="type-hub-emoji" title={t.nickname} />
              <span className="type-hub-name">
                {t.code}
                <br />
                {t.nickname}
              </span>
              <span className="type-hub-desc">{t.catch}</span>
              <span className="type-hub-cta">解説を見る →</span>
            </a>
          ))}
        </div>

        <a className="start-band" href="/baseball-mbti/" style={{ marginTop: 26 }}>
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/gloves-grass.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">Baseball MBTI</span>
            <span className="start-band-title">あなたのタイプを診断する</span>
            <span className="start-band-desc">
              全36問・7段階で答えるだけ。あなたのタイプと、
              似ているNPB・MLB選手＆使用メーカーがその場でわかります。
            </span>
            <span className="start-band-btn">無料で診断する →</span>
          </div>
        </a>
      </div>
    </main>
  );
}
