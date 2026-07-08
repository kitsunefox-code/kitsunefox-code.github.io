import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import TypeIcon from "@/components/TypeIcon";
import ComboShare from "@/components/ComboShare";
import { ALL_COMBOS, getCombo, comboPlayers } from "@/data/combo";
import { SITE_URL, rktSearch } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_COMBOS.map((c) => ({ code: c.code.toLowerCase(), slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string; slug: string }>;
}): Promise<Metadata> {
  const { code, slug } = await params;
  const combo = getCombo(code, slug);
  if (!combo) return {};
  const { mbti, playerType, title } = combo;
  const pageTitle = `【${title}】はどんな野球人？｜MBTI×選手タイプ複合診断`;
  const desc = `${mbti.code}「${mbti.nickname}」×「${playerType.name}型」を掛け合わせた複合診断。${mbti.catch} ${playerType.desc} 似ている選手や道具えらびのヒントも紹介します。`;
  const url = `${SITE_URL}${combo.path}`;
  return {
    title: pageTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `【${title}】｜MBTI×選手タイプ複合診断`,
      description: `${mbti.catch} ${playerType.desc}`,
      type: "article",
      url,
      images: [{ url: comboOgPath(combo.mbti.code, combo.playerType.slug), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `【${title}】｜MBTI×選手タイプ複合診断`,
      description: `${mbti.catch} ${playerType.desc}`,
      images: [comboOgPath(combo.mbti.code, combo.playerType.slug)],
    },
  };
}

function comboOgPath(code: string, slug: string): string {
  return `/og-combo/${code.toLowerCase()}-${slug}.png`;
}

export default async function ComboPage({
  params,
}: {
  params: Promise<{ code: string; slug: string }>;
}) {
  const { code, slug } = await params;
  const combo = getCombo(code, slug);
  if (!combo) notFound();

  const { mbti, playerType, title } = combo;
  const { mbtiPlayers, playerTypePlayers } = comboPlayers(combo);
  const makerLink = (maker: string, kind: string) =>
    rktSearch(maker === "各社" ? "" : maker, kind);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${title}はどんな野球人？`,
    description: `${mbti.catch} ${playerType.desc}`,
    mainEntityOfPage: `${SITE_URL}${combo.path}`,
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
            <a href="/combo/">複合診断</a> ›{" "}
            <a href={`/combo/${mbti.code.toLowerCase()}/`}>{mbti.code}</a> › {playerType.name}
          </p>
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Combo Diagnosis
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4.6vw, 33px)", margin: "6px 0 10px" }}>
            <span className="type-h1-icon dual">
              <TypeIcon icon={mbti.icon} title={mbti.nickname} />
              <TypeIcon icon={playerType.icon} title={playerType.name} />
            </span>
            「<span className="hl">{title}</span>」型
          </h1>
          <blockquote className="combo-quote">
            <p>
              <TypeIcon icon={mbti.icon} className="combo-quote-icon" /> MBTI的には：{mbti.catch}
            </p>
            <p>
              <TypeIcon icon={playerType.icon} className="combo-quote-icon" /> プレースタイル的には：
              {playerType.desc}
            </p>
          </blockquote>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 20 }}>
        <AdSlot id="combo-top" />

        <section>
          <h2 className="section-title">
            性格タイプ（MBTI）から見ると——{mbti.code}「{mbti.nickname}」
          </h2>
          <p className="type-long">{mbti.long}</p>
          <a className="cta-inline" href={`/baseball-mbti/type/${mbti.code.toLowerCase()}/`}>
            → {mbti.code}単独の解説を見る
          </a>
        </section>

        <section>
          <h2 className="section-title">
            プレースタイルから見ると——「{playerType.name}型」
          </h2>
          <p className="type-long">{playerType.long}</p>
          <a className="cta-inline" href={`/player-shindan/type/${playerType.slug}/`}>
            → {playerType.name}型単独の解説を見る
          </a>
        </section>

        <section>
          <h2 className="section-title">道具えらびのヒント</h2>
          <div className="combo-advice-grid">
            <div className="type-advice-box">
              <span className="type-advice-head">
                <TypeIcon icon={mbti.icon} className="advice-head-icon" /> MBTI視点
              </span>
              <p>{mbti.advice}</p>
              <a className="cta-inline" href={mbti.adviceHref}>
                → {mbti.adviceCta}
              </a>
            </div>
            <div className="type-advice-box">
              <span className="type-advice-head">
                <TypeIcon icon={playerType.icon} className="advice-head-icon" /> プレースタイル視点
              </span>
              <p>{playerType.advice}</p>
              <a className="cta-inline" href={playerType.adviceHref}>
                → {playerType.adviceCta}
              </a>
            </div>
          </div>
        </section>

        {(mbtiPlayers.length > 0 || playerTypePlayers.length > 0) && (
          <section>
            <h2 className="section-title">近い実在選手</h2>
            {mbtiPlayers.length > 0 && (
              <>
                <p className="mbti-players-title">性格面（{mbti.code}）で近い選手</p>
                <div className="type-players">
                  {mbtiPlayers.map((p) => (
                    <div className="type-player" key={p.name}>
                      <span className={`player-league sm ${p.league === "MLB" ? "mlb" : "npb"}`}>
                        {p.league}
                      </span>
                      <span className="type-player-name">{p.name}</span>
                      <span className="type-player-pos">{p.position}</span>
                      <span className="type-player-gear">
                        グローブ：
                        <a
                          className="maker-link"
                          href={makerLink(p.glove, "グローブ")}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                        >
                          {p.glove}
                        </a>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {playerTypePlayers.length > 0 && (
              <>
                <p className="mbti-players-title">プレースタイル面（{playerType.name}型）で近い選手</p>
                <div className="type-players">
                  {playerTypePlayers.map((p) => (
                    <div className="type-player" key={p.name}>
                      <span className={`player-league sm ${p.league === "MLB" ? "mlb" : "npb"}`}>
                        {p.league}
                      </span>
                      <span className="type-player-name">{p.name}</span>
                      <span className="type-player-pos">{p.position}</span>
                      <span className="type-player-gear">
                        グローブ：
                        <a
                          className="maker-link"
                          href={makerLink(p.glove, "グローブ")}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                        >
                          {p.glove}
                        </a>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
            <p className="player-disc" style={{ marginTop: 10 }}>
              ※ メーカー名をクリックすると、楽天市場のおすすめ一覧（広告）が開きます。
              分類はどちらもエンタメ診断であり、公式のものではありません。
            </p>
          </section>
        )}

        <ComboShare
          code={mbti.code}
          slug={playerType.slug}
          title={title}
          mbtiNickname={mbti.nickname}
          mbtiCatch={mbti.catch}
          playerTypeName={playerType.name}
          playerTypeDesc={playerType.desc}
        />

        <a className="start-band" href="/combo/">
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/hero-home-plate.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">Combo Diagnosis</span>
            <span className="start-band-title">ほかの組み合わせも見る</span>
            <span className="start-band-desc">
              MBTI16タイプ×選手タイプ16タイプ、全256通りの複合診断。
              自分の別の一面や、仲間のタイプもチェックしてみましょう。
            </span>
            <span className="start-band-btn">複合診断一覧へ →</span>
          </div>
        </a>

        <div className="bat-links" style={{ paddingBottom: 40 }}>
          <a className="cta-inline" href="/baseball-mbti/">
            → 野球選手MBTI診断をやってみる
          </a>
          <a className="cta-inline" href="/player-shindan/">
            → 野球選手タイプ診断をやってみる
          </a>
        </div>
      </div>
    </main>
  );
}
