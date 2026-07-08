import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import TypeIcon from "@/components/TypeIcon";
import {
  PLAYER_TYPES,
  typeBySlug,
  examplePlayers,
} from "@/data/playerTypes";
import { SITE_URL } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PLAYER_TYPES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = typeBySlug(slug);
  if (!t) return {};
  const title = `【${t.name}型】ってどんな野球選手タイプ？特徴・似ている選手`;
  const desc = `${t.desc} ${t.name}型の特徴・向いている道具えらび・似ているNPB/MLB選手を紹介。あなたのタイプは無料の野球選手タイプ診断でチェックできます。`;
  const url = `${SITE_URL}/player-shindan/type/${t.slug}/`;
  const og = `/og-type/${t.slug}.png`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `【${t.name}型】${t.emoji}｜野球選手タイプ診断`,
      description: t.desc,
      type: "article",
      url,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `【${t.name}型】${t.emoji}｜野球選手タイプ診断`,
      description: t.desc,
      images: [og],
    },
  };
}

export default async function TypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = typeBySlug(slug);
  if (!t) notFound();

  const examples = examplePlayers(t, 8);
  const others = PLAYER_TYPES.filter((x) => x.slug !== t.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${t.name}型ってどんな野球選手タイプ？`,
    description: t.desc,
    mainEntityOfPage: `${SITE_URL}/player-shindan/type/${t.slug}/`,
    publisher: { "@type": "Organization", name: "草野球ナビ" },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hero" style={{ padding: "30px 0 24px" }}>
        <div className="container">
          <p className="crumbs">
            <a href="/player-shindan/">野球選手タイプ診断</a> ›{" "}
            <a href="/player-shindan/type/">タイプ一覧</a> › {t.name}型
          </p>
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Player Type
          </p>
          <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", margin: "6px 0 10px" }}>
            <TypeIcon icon={t.icon} className="type-h1-icon" title={t.name} />
            「<span className="hl">{t.name}</span>型」ってどんなタイプ？
          </h1>
          <p style={{ fontSize: 15 }}>{t.desc}</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 20 }}>
        <AdSlot id="type-top" />

        <section>
          <h2 className="section-title">特徴</h2>
          <p className="type-long">{t.long}</p>
        </section>

        <section>
          <h2 className="section-title">道具えらびの傾向</h2>
          <p className="type-long">{t.advice}</p>
          <a className="cta-inline" href={t.adviceHref}>
            → {t.adviceCta}
          </a>
        </section>

        {examples.length > 0 && (
          <section>
            <h2 className="section-title">このタイプに近い選手</h2>
            <p className="section-sub" style={{ marginTop: 6 }}>
              {t.name}型の資質を持つ、収録選手の一部です。
            </p>
            <div className="type-players">
              {examples.map((p) => (
                <div className="type-player" key={p.name}>
                  <span
                    className={`player-league sm ${p.league === "MLB" ? "mlb" : "npb"}`}
                  >
                    {p.league}
                  </span>
                  <span className="type-player-name">{p.name}</span>
                  <span className="type-player-pos">{p.position}</span>
                  <span className="type-player-gear">
                    グローブ：{p.glove}
                    {p.bat ? `／バット：${p.bat}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 診断CTA */}
        <a className="start-band" href="/player-shindan/">
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/hero-home-plate.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">Player Match</span>
            <span className="start-band-title">あなたのタイプを診断する</span>
            <span className="start-band-desc">
              12の「はい／いいえ」に答えるだけ。あなたが{t.name}型か、
              似ているNPB・MLB選手は誰か、その場でわかります。
            </span>
            <span className="start-band-btn">無料で診断する →</span>
          </div>
        </a>

        <AdSlot id="type-mid" />

        {/* 他のタイプ */}
        <section>
          <h2 className="section-title">ほかの野球選手タイプ</h2>
          <div className="type-hub-grid">
            {others.map((x) => (
              <a
                key={x.slug}
                className="type-hub-card"
                href={`/player-shindan/type/${x.slug}/`}
              >
                <TypeIcon icon={x.icon} className="type-hub-emoji" title={x.name} />
                <span className="type-hub-name">{x.name}型</span>
                <span className="type-hub-desc">{x.desc}</span>
              </a>
            ))}
          </div>
        </section>

        <div className="bat-links" style={{ paddingBottom: 40 }}>
          <a className="cta-inline" href="/tools/">
            → 診断ツール一覧を見る
          </a>
          <a className="cta-inline" href="/hikaku/">
            → 道具・ユニフォーム比較を見る
          </a>
        </div>
      </div>
    </main>
  );
}
