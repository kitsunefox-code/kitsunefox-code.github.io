import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import {
  MBTI_TYPES,
  mbtiByCode,
  resolvePlayers,
  getCompat,
  popularGear,
} from "@/data/baseballMbti";
import { SITE_URL, rktSearch } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return MBTI_TYPES.map((t) => ({ code: t.code.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const t = mbtiByCode(code.toUpperCase());
  if (!t) return {};
  const title = `【${t.code}｜${t.nickname}】ってどんな野球選手MBTI？特徴・相性・似ている選手`;
  const desc = `${t.catch} ${t.code}（${t.nickname}）型の特徴・相性の良いタイプ／苦手なタイプ・似ているNPB/MLB選手を紹介。あなたのタイプは無料の野球選手MBTI診断でチェックできます。`;
  const url = `${SITE_URL}/baseball-mbti/type/${t.code.toLowerCase()}/`;
  const og = `/og-mbti-type/${t.code.toLowerCase()}.png`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `【${t.code}｜${t.nickname}】${t.emoji}｜野球選手MBTI診断`,
      description: t.catch,
      type: "article",
      url,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `【${t.code}｜${t.nickname}】${t.emoji}｜野球選手MBTI診断`,
      description: t.catch,
      images: [og],
    },
  };
}

export default async function MbtiTypePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const t = mbtiByCode(code.toUpperCase());
  if (!t) notFound();

  const players = resolvePlayers(t.players);
  const compat = getCompat(t.code);
  const gear = popularGear(t);
  const others = MBTI_TYPES.filter((x) => x.code !== t.code);
  const makerLink = (maker: string, kind: string) =>
    rktSearch(maker === "各社" ? "" : maker, kind);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${t.code}（${t.nickname}）ってどんな野球選手MBTI？`,
    description: t.catch,
    mainEntityOfPage: `${SITE_URL}/baseball-mbti/type/${t.code.toLowerCase()}/`,
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
            <a href="/baseball-mbti/">野球選手MBTI診断</a> ›{" "}
            <a href="/baseball-mbti/type/">タイプ一覧</a> › {t.code}
          </p>
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Baseball MBTI
          </p>
          <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", margin: "6px 0 10px" }}>
            <span style={{ fontSize: "1.1em", marginRight: 8 }}>{t.emoji}</span>
            <span className="hl">{t.code}</span>「{t.nickname}」ってどんなタイプ？
          </h1>
          <p style={{ fontSize: 15 }}>{t.catch}</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 20 }}>
        <AdSlot id="mbtitype-top" />

        <section>
          <h2 className="section-title">特徴</h2>
          <p className="type-long">{t.long}</p>
        </section>

        {/* 相性 */}
        <section>
          <h2 className="section-title">相性の良いタイプ・苦手なタイプ</h2>
          <div className="compat-grid">
            {compat.best && (
              <a
                className="compat-card good"
                href={`/baseball-mbti/type/${compat.best.type.code.toLowerCase()}/`}
              >
                <span className="compat-label">◎ 相性の良いタイプ</span>
                <span className="compat-code">
                  {compat.best.type.emoji} {compat.best.type.code}
                  <span className="compat-nick">{compat.best.type.nickname}</span>
                </span>
                <span className="compat-note">{compat.best.note}</span>
              </a>
            )}
            {compat.tough && (
              <a
                className="compat-card tough"
                href={`/baseball-mbti/type/${compat.tough.type.code.toLowerCase()}/`}
              >
                <span className="compat-label">△ 衝突しやすいタイプ</span>
                <span className="compat-code">
                  {compat.tough.type.emoji} {compat.tough.type.code}
                  <span className="compat-nick">{compat.tough.type.nickname}</span>
                </span>
                <span className="compat-note">{compat.tough.note}</span>
              </a>
            )}
          </div>
          <p className="player-disc">
            ※ 相性はエンタメとしての組み合わせ診断です。実際の相性を保証するものではありません。
          </p>
        </section>

        <section>
          <h2 className="section-title">道具えらびの傾向</h2>
          <p className="type-long">{t.advice}</p>
          <a className="cta-inline" href={t.adviceHref}>
            → {t.adviceCta}
          </a>
        </section>

        {(gear.gloves.length > 0 || gear.bats.length > 0) && (
          <section>
            <h2 className="section-title">{t.code}型に多い使用メーカー</h2>
            <p className="section-sub" style={{ marginTop: 6 }}>
              草野球ナビ収録選手{gear.sampleSize}名のうち、{t.code}型の資質に近い選手データを集計した傾向です
              （実際の市場人気調査ではありません）。
            </p>
            <div className="gear-rank-grid">
              {gear.gloves.length > 0 && (
                <div className="gear-rank-col">
                  <span className="gear-rank-head">🧤 グローブ</span>
                  <ol className="gear-rank-list">
                    {gear.gloves.map((g, i) => (
                      <li key={g.maker}>
                        <span className="gear-rank-no">{i + 1}</span>
                        <a
                          className="maker-link"
                          href={makerLink(g.maker, "グローブ")}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                        >
                          {g.maker}
                        </a>
                        <span className="gear-rank-count">{g.count}名</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {gear.bats.length > 0 && (
                <div className="gear-rank-col">
                  <span className="gear-rank-head">🏏 バット</span>
                  <ol className="gear-rank-list">
                    {gear.bats.map((g, i) => (
                      <li key={g.maker}>
                        <span className="gear-rank-no">{i + 1}</span>
                        <a
                          className="maker-link"
                          href={makerLink(g.maker, "バット")}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                        >
                          {g.maker}
                        </a>
                        <span className="gear-rank-count">{g.count}名</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </section>
        )}

        {players.length > 0 && (
          <section>
            <h2 className="section-title">このタイプに近い選手</h2>
            <p className="section-sub" style={{ marginTop: 6 }}>
              {t.code}（{t.nickname}）の資質に近いとされる実在選手です。
            </p>
            <div className="type-players">
              {players.map((p) => (
                <div className="type-player" key={p.name}>
                  <span
                    className={`player-league sm ${p.league === "MLB" ? "mlb" : "npb"}`}
                  >
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
                    {p.bat && (
                      <>
                        ／バット：
                        <a
                          className="maker-link"
                          href={makerLink(p.bat, "バット")}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                        >
                          {p.bat}
                        </a>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="player-disc" style={{ marginTop: 10 }}>
              ※ メーカー名をクリックすると、楽天市場のおすすめ一覧（広告）が開きます。
            </p>
          </section>
        )}

        <a className="start-band" href="/baseball-mbti/">
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/gloves-grass.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">Baseball MBTI</span>
            <span className="start-band-title">あなたのタイプを診断する</span>
            <span className="start-band-desc">
              全36問・7段階で答えるだけ。あなたが{t.code}型か、
              似ているNPB・MLB選手は誰か、その場でわかります。
            </span>
            <span className="start-band-btn">無料で診断する →</span>
          </div>
        </a>

        <AdSlot id="mbtitype-mid" />

        <section>
          <h2 className="section-title">ほかの野球選手MBTI</h2>
          <div className="type-hub-grid">
            {others.map((x) => (
              <a
                key={x.code}
                className="type-hub-card"
                href={`/baseball-mbti/type/${x.code.toLowerCase()}/`}
              >
                <span className="type-hub-emoji">{x.emoji}</span>
                <span className="type-hub-name">
                  {x.code}
                  <br />
                  {x.nickname}
                </span>
                <span className="type-hub-desc">{x.catch}</span>
              </a>
            ))}
          </div>
        </section>

        <div className="bat-links" style={{ paddingBottom: 40 }}>
          <a className="cta-inline" href="/player-shindan/">
            → 「似ている選手」も診断する（選手タイプ診断）
          </a>
          <a className="cta-inline" href="/tools/">
            → 診断ツール一覧を見る
          </a>
        </div>
      </div>
    </main>
  );
}
