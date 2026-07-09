import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import PlayersGear from "@/components/PlayersGear";
import { PLAYER_COUNT, NPB_COUNT, MLB_COUNT } from "@/data/players";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: `プロ野球選手の使用グローブ・バット一覧【NPB・MLB${PLAYER_COUNT}名】メーカー早わかり`,
  description: `プロ野球選手（NPB${NPB_COUNT}名・MLB${MLB_COUNT}名）の使用グローブ・バットのメーカーを一覧化。選手名・リーグ・ポジションで絞り込み、気になる選手のギアからメーカーの軟式モデルをすぐ探せます。「あの選手と同じメーカーで揃えたい」草野球プレーヤーのための早見表。`,
  alternates: { canonical: `${SITE_URL}/players/` },
  openGraph: {
    title: `プロ野球選手の使用グローブ・バット一覧【${PLAYER_COUNT}名】`,
    description:
      "NPB・MLB選手の使用ギアのメーカーを一覧で。選手名・リーグ・ポジションで絞り込み。",
    type: "website",
    url: `${SITE_URL}/players/`,
  },
  twitter: {
    card: "summary_large_image",
    title: `プロ野球選手の使用グローブ・バット一覧【${PLAYER_COUNT}名】`,
    description: "NPB・MLB選手の使用ギアのメーカー早見表。草野球の道具えらびに。",
  },
};

export default function PlayersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "プロ野球選手の使用グローブ・バット一覧",
    description: `NPB・MLB ${PLAYER_COUNT}名の使用ギア（グローブ・バット）のメーカー一覧`,
    url: `${SITE_URL}/players/`,
    isPartOf: { "@type": "WebSite", name: "草野球ナビ", url: SITE_URL },
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hero" style={{ padding: "34px 0 26px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Players&apos; Gear
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4.4vw, 34px)", margin: "0 0 10px" }}>
            プロ野球選手の<span className="hl">使用グローブ・バット</span>一覧
          </h1>
          <p>
            NPB・MLBの<strong>{PLAYER_COUNT}名</strong>（NPB {NPB_COUNT}名／MLB {MLB_COUNT}名）の
            使用ギアのメーカーをまとめました。選手名・リーグ・ポジションで絞り込んで、
            「あの選手と同じメーカーで揃えたい」を叶える早見表です。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="players-top" />

        <PlayersGear />

        <section className="score-howto" style={{ marginTop: 28 }}>
          <h2 className="section-title">この一覧の使い方</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            上の検索窓に選手名を入れるか、リーグ（NPB／MLB）とポジションのタブで絞り込むと、
            その選手が使っているグローブ・バットのメーカーが分かります。メーカー名をタップすると、
            楽天市場でそのメーカーの軟式モデル（草野球で使える一般向け）を探せます。市販の
            「本人モデル」がある選手は、モデル名も表示しています。
          </p>
          <p className="section-sub" style={{ marginTop: 10 }}>
            自分に近いプレースタイルの選手から選びたい人は
            <a href="/baseball-dock/">野球人間ドック</a>で「最も近いプロ選手」を診断できます。
            道具そのものの選び方は<a href="/glove/">グローブ比較</a>・
            <a href="/bat/">バット比較</a>もどうぞ。
          </p>
        </section>
      </div>
      <GoodsLinks />
      <div style={{ height: 24 }} />
    </main>
  );
}
