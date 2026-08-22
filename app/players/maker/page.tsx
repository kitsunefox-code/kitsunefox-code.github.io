import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { PLAYERS } from "@/data/players";
import { SITE_URL } from "@/data/site";

const MAKERS = [
  { slug: "mizuno", name: "ミズノ" },
  { slug: "zett", name: "ゼット" },
  { slug: "ssk", name: "SSK" },
  { slug: "rawlings", name: "ローリングス" },
  { slug: "kubota", name: "久保田スラッガー" },
  { slug: "asics", name: "アシックス" },
  { slug: "wilson", name: "ウィルソン" },
];

export const metadata: Metadata = {
  title: "メーカー別・使用プロ野球選手一覧【ミズノ・ゼット・SSK・ローリングス…】",
  description:
    "プロ野球選手（NPB・MLB）が使っているグローブのメーカー別に、使用選手を一覧でまとめました。ミズノ・ゼット・SSK・ローリングス・久保田スラッガー・アシックス・ウィルソン。「あの選手と同じメーカーで揃えたい」草野球プレーヤーのための早見表です。",
  alternates: { canonical: `${SITE_URL}/players/maker/` },
  openGraph: {
    title: "メーカー別・使用プロ野球選手一覧",
    description: "ミズノ・ゼット・SSK・ローリングス…メーカーごとに使用プロ選手を一覧で。",
    type: "website",
    url: `${SITE_URL}/players/maker/`,
  },
};

export default function MakerIndexPage() {
  const counts = Object.fromEntries(
    MAKERS.map((m) => [m.slug, PLAYERS.filter((p) => p.glove === m.name).length])
  );
  return (
    <main>
      <div className="hero" style={{ padding: "34px 0 24px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Players by Maker
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4.4vw, 32px)", margin: "0 0 10px" }}>
            メーカー別・<span className="hl">使用プロ選手</span>一覧
          </h1>
          <p>
            プロ野球選手（NPB・MLB）が使うグローブを、<strong>メーカー別</strong>にまとめました。
            気になるメーカーから、そのブランドを愛用する選手をチェックできます。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="maker-top" />
        <div className="index-list">
          {MAKERS.map((m, i) => (
            <a key={m.slug} className="index-row" href={`/players/maker/${m.slug}/`}>
              <span className="ix-no">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="ix-ttl">
                  {m.name}
                  <span className="ix-badge">{counts[m.slug]}名</span>
                </span>
                <span className="ix-desc">{m.name}のグローブを使うプロ選手一覧</span>
              </span>
              <span className="ix-arrow">→</span>
            </a>
          ))}
        </div>

        <div className="bat-links" style={{ marginTop: 20 }}>
          <a className="cta-inline" href="/players/">→ 全{PLAYERS.length}名の使用ギア一覧（検索・絞り込み）へ</a>
          <a className="cta-inline" href="/uranai/">→ 「ギアメーカー占い」で今日の運勢もチェック</a>
          <a className="cta-inline" href="/baseball-dock/">→ あなたに近いプロ選手を「野球人間ドック」で診断</a>
        </div>
      </div>
      <GoodsLinks />
      <div style={{ height: 24 }} />
    </main>
  );
}
