import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import TypeIcon from "@/components/TypeIcon";
import { MBTI_TYPES } from "@/data/baseballMbti";
import type { Trait } from "@/data/players";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球MBTIタイプ別・向いているポジション【16タイプ診断】守備位置の適性がわかる",
  description:
    "野球MBTIの16タイプごとに、向いている守備位置とプレースタイルをまとめました。エース向きの知将タイプ、扇の要が似合う女房役タイプ、遊撃で魅せる技巧派タイプなど、性格から自分に合うポジションを探せます。自分のタイプは無料の野球MBTI診断（全45問）で判定。ポジション選びに迷っている人へ。",
  alternates: { canonical: `${SITE_URL}/baseball-dock/position/` },
  openGraph: {
    title: "野球MBTIタイプ別・向いているポジション【16タイプ】",
    description: "性格タイプから、向いている守備位置とプレースタイルがわかる16タイプ一覧。",
    type: "article",
    url: `${SITE_URL}/baseball-dock/position/`,
    images: [{ url: "/og-dock.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球MBTIタイプ別・向いているポジション【16タイプ】",
    description: "性格タイプから向いている守備位置がわかる16タイプ一覧。",
    images: ["/og-dock.png"],
  },
};

// 資質(trait) → 向いているポジションと理由。タイプが持つtraitsから導出する。
const BY_TRAIT: Record<string, { pos: string; why: string }> = {
  pitcher: { pos: "投手", why: "自分のリズムで試合を作れる。組み立てを考えるのが好きな人に" },
  catcher: { pos: "捕手", why: "全体を見渡して指示を出す司令塔。気配りが武器になる" },
  leader: { pos: "投手・捕手・センターライン", why: "チームの中心で引っ張る役割が合う" },
  technician: { pos: "遊撃手・二塁手", why: "細かい技術と反応が活きる。守備で魅せられる" },
  defense: { pos: "内野（遊撃・三塁）", why: "堅実な守備でチームを支えられる" },
  contact: { pos: "二塁手・外野手", why: "確実性が武器。つなぐ打撃と安定した守備を両立" },
  power: { pos: "一塁手・外野（両翼）", why: "長打力を活かす。守備負担を抑えて打撃に集中できる" },
  clutch: { pos: "三塁手・抑え投手", why: "痺れる場面で力を出せる。勝負どころを任せられる" },
  flashy: { pos: "遊撃手・中堅手", why: "華のあるプレーで沸かせる。目立つ位置が似合う" },
  star: { pos: "中堅手・エース", why: "チームの看板。注目される場所で輝ける" },
  stoic: { pos: "投手・内野", why: "地道な反復が実る。淡々と役割を果たせる" },
  twoway: { pos: "投手兼野手（二刀流）", why: "投打どちらもこなしたい欲張りタイプに" },
  speed: { pos: "中堅手・二塁手", why: "足と守備範囲で貢献できる" },
};

function positionsFor(traits: Trait[]) {
  const seen = new Set<string>();
  const out: { pos: string; why: string }[] = [];
  for (const tr of traits) {
    const hit = BY_TRAIT[tr];
    if (hit && !seen.has(hit.pos)) {
      seen.add(hit.pos);
      out.push(hit);
    }
  }
  return out;
}

export default function MbtiPositionPage() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "MBTIで向いているポジションは本当に決まりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "決まるわけではありません。このページは、性格タイプごとの気質（引っ張る・支える・こだわる・勝負強いなど）と、各ポジションに求められる役割の相性を整理したエンタメ診断です。実際は肩の強さや足の速さといった身体的な適性、チーム事情も大きく影響します。ポジション選びのきっかけとしてお使いください。",
        },
      },
      {
        "@type": "Question",
        name: "初心者はどのポジションから始めるといいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "打球の頻度が比較的少なく余裕のある外野（ライトなど）から始める人が多いです。慣れてきたら、肩の強さ・足の速さ・守備の好みに応じて内野や他のポジションに挑戦していくとよいでしょう。",
        },
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <div className="hero" style={{ padding: "34px 0 24px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            MBTI × Position
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4.4vw, 34px)", margin: "0 0 10px" }}>
            野球MBTIタイプ別・<span className="hl">向いているポジション</span>
          </h1>
          <p>
            「自分はどこを守るのが合っているんだろう？」——
            16タイプそれぞれの気質から、<strong>向いている守備位置とプレースタイル</strong>をまとめました。
            自分のタイプは<a href="/baseball-dock/">無料の野球MBTI診断（全45問）</a>で判定できます。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="mbtitype-top" />

        <div className="mp-list">
          {MBTI_TYPES.map((t) => {
            const list = positionsFor(t.traits);
            return (
              <div className="mp-row" key={t.code}>
                <a className="mp-head" href={`/baseball-dock/type/${t.code.toLowerCase()}/`}>
                  <TypeIcon icon={t.icon} className="compat-icon" />
                  <span className="mp-code">{t.code}</span>
                  <span className="mp-nick">{t.nickname}</span>
                </a>
                <p className="mp-catch">{t.catch}</p>
                <div className="mp-pos">
                  {list.length > 0 ? (
                    list.map((p) => (
                      <span className="mp-pos-item" key={p.pos}>
                        <strong>{p.pos}</strong>
                        <span className="mp-why">{p.why}</span>
                      </span>
                    ))
                  ) : (
                    <span className="mp-pos-item">
                      <strong>オールラウンド</strong>
                      <span className="mp-why">複数ポジションをこなせる万能型</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <section className="score-howto" style={{ marginTop: 28 }}>
          <h2 className="section-title">ポジションは「性格」だけで決まらない</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            当然ですが、実際の適性は<strong>肩の強さ・足の速さ・反応</strong>といった身体的な要素や、
            チームの人数事情にも左右されます。このページはあくまで
            <strong>「気質から見た向き・不向き」</strong>のエンタメ診断です。
            肩・足・反応から選びたい人は<a href="/guide/position/">草野球のポジション適性ガイド</a>もどうぞ。
          </p>
        </section>

        <div className="bat-links">
          <a className="cta-inline" href="/baseball-dock/">→ 自分のタイプを「野球MBTI診断」で調べる（無料・全45問）</a>
          <a className="cta-inline" href="/baseball-dock/compatibility/">→ 「16タイプの相性一覧」を見る</a>
          <a className="cta-inline" href="/guide/glove-guide/">→ ポジションが決まったら「グローブの選び方」へ</a>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
