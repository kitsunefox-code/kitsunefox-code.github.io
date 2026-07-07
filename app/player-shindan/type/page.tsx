import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { PLAYER_TYPES } from "@/data/playerTypes";
import { PLAYER_COUNT } from "@/data/players";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球選手タイプ全16種｜あなたはどのタイプ？特徴と似ている選手一覧",
  description:
    "豪快アーチスト型・鉄壁の守備職人型・頭脳派クラフト型…など、野球選手タイプ全16種を一覧で解説。それぞれの特徴・向いている道具・似ているNPB/MLB選手がわかります。あなたのタイプは無料診断でチェック。",
  alternates: { canonical: `${SITE_URL}/player-shindan/type/` },
  openGraph: {
    title: "野球選手タイプ全16種｜あなたはどのタイプ？",
    description: "16タイプの特徴・道具の傾向・似ている選手を解説。",
    type: "website",
    url: `${SITE_URL}/player-shindan/type/`,
    images: [{ url: "/og-player.png", width: 1200, height: 630 }],
  },
};

export default function TypeHubPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "32px 0 26px" }}>
        <div className="container">
          <p className="crumbs">
            <a href="/player-shindan/">野球選手タイプ診断</a> › タイプ一覧
          </p>
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Player Types
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 34px)", margin: "6px 0 10px" }}>
            野球選手<span className="hl">タイプ全16種</span>
          </h1>
          <p style={{ fontSize: 15 }}>
            あなたはどのタイプ？それぞれの特徴・向いている道具・似ているNPB・MLB選手
            （全{PLAYER_COUNT}名から）を解説しています。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 20 }}>
        <AdSlot id="typehub-top" />

        <div className="type-hub-grid">
          {PLAYER_TYPES.map((t) => (
            <a
              key={t.slug}
              className="type-hub-card"
              href={`/player-shindan/type/${t.slug}/`}
            >
              <span className="type-hub-emoji">{t.emoji}</span>
              <span className="type-hub-name">{t.name}型</span>
              <span className="type-hub-desc">{t.desc}</span>
              <span className="type-hub-cta">解説を見る →</span>
            </a>
          ))}
        </div>

        <a className="start-band" href="/player-shindan/" style={{ marginTop: 26 }}>
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/hero-home-plate.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">Player Match</span>
            <span className="start-band-title">あなたのタイプを診断する</span>
            <span className="start-band-desc">
              12の「はい／いいえ」に答えるだけ。あなたのタイプと、
              似ているNPB・MLB選手＆使用ギアがその場でわかります。
            </span>
            <span className="start-band-btn">無料で診断する →</span>
          </div>
        </a>
      </div>
    </main>
  );
}
