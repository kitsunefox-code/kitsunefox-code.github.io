import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import TypeIcon from "@/components/TypeIcon";
import { MBTI_TYPES, mbtiByCode } from "@/data/baseballMbti";
import { PLAYER_TYPES } from "@/data/playerTypes";
import { SITE_URL } from "@/data/site";

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
  const title = `${t.code}（${t.nickname}）× 選手タイプ16通り｜複合診断`;
  const desc = `${t.code}「${t.nickname}」と、野球選手タイプ診断の16タイプを掛け合わせた組み合わせ一覧。あなたに近いのはどの組み合わせ？`;
  const url = `${SITE_URL}/combo/${t.code.toLowerCase()}/`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      type: "website",
      url,
      images: [{ url: "/og-combo.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ComboMbtiHubPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const t = mbtiByCode(code.toUpperCase());
  if (!t) notFound();

  return (
    <main>
      <div className="hero" style={{ padding: "30px 0 24px" }}>
        <div className="container">
          <p className="crumbs">
            <a href="/combo/">MBTI×選手タイプ複合診断</a> › {t.code}
          </p>
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Combo Diagnosis
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 34px)", margin: "6px 0 10px" }}>
            <TypeIcon icon={t.icon} className="type-h1-icon" title={t.nickname} />
            <span className="hl">{t.code}</span>×選手タイプ16通り
          </h1>
          <p style={{ fontSize: 15 }}>
            {t.code}「{t.nickname}」のあなたが、プレースタイル診断でどのタイプだったかで
            見え方が変わります。近い組み合わせを選んでください。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 20 }}>
        <AdSlot id="combomid-top" />

        <div className="type-hub-grid">
          {PLAYER_TYPES.map((p) => (
            <a
              key={p.slug}
              className="type-hub-card"
              href={`/combo/${t.code.toLowerCase()}/${p.slug}/`}
            >
              <span className="type-hub-emoji dual">
                <TypeIcon icon={t.icon} title={t.nickname} />
                <TypeIcon icon={p.icon} title={p.name} />
              </span>
              <span className="type-hub-name">
                {t.code}×{p.name}
              </span>
              <span className="type-hub-desc">{p.desc}</span>
              <span className="type-hub-cta">この組み合わせを見る →</span>
            </a>
          ))}
        </div>

        <div className="bat-links" style={{ paddingTop: 26, paddingBottom: 40 }}>
          <a className="cta-inline" href={`/baseball-mbti/type/${t.code.toLowerCase()}/`}>
            → {t.code}単独の解説を見る
          </a>
          <a className="cta-inline" href="/combo/">
            → 他のMBTIタイプから探す
          </a>
        </div>
      </div>
    </main>
  );
}
