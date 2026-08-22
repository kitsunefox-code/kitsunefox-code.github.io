import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import TypeIcon from "@/components/TypeIcon";
import { MBTI_TYPES, getCompat } from "@/data/baseballMbti";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球MBTI相性診断【全16タイプ一覧】チームで噛み合う組み合わせ・衝突しやすい相手",
  description:
    "野球MBTI（16タイプ）の相性を一覧でまとめました。あなたのタイプと噛み合う相棒はどのタイプか、逆に衝突しやすいのはどのタイプか。バッテリー・キーストーンコンビ・主将と参謀など、チーム内の人間関係を読み解くヒントに。自分のタイプは無料の野球MBTI診断（全45問）で判定できます。",
  alternates: { canonical: `${SITE_URL}/baseball-dock/compatibility/` },
  openGraph: {
    title: "野球MBTI相性診断【全16タイプ一覧】",
    description:
      "噛み合う相棒・衝突しやすい相手が一目でわかる16タイプの相性表。チーム内の人間関係のヒントに。",
    type: "article",
    url: `${SITE_URL}/baseball-dock/compatibility/`,
    images: [{ url: "/og-dock.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球MBTI相性診断【全16タイプ一覧】",
    description: "噛み合う相棒・衝突しやすい相手が一目でわかる16タイプの相性表。",
    images: ["/og-dock.png"],
  },
};

export default function CompatibilityPage() {
  const rows = MBTI_TYPES.map((t) => ({ t, ...getCompat(t.code) }));

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "野球MBTIの相性はどう決まっていますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "4つの指標（外向/内向・堅実/ひらめき・論理/情熱・計画/自由）のうち、すべてが逆になる相手を「噛み合う相棒」、判断の仕方（論理/情熱）と進め方（計画/自由）だけが逆になる相手を「衝突しやすい相手」として整理しています。正反対は役割を補い合え、判断基準だけが違うと意見がぶつかりやすい、という考え方です。",
        },
      },
      {
        "@type": "Question",
        name: "相性が悪いタイプとは一緒にプレーしない方がいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "そんなことはありません。衝突しやすい＝噛み合えば強い、でもあります。判断の基準が違うだけなので、役割分担を明確にしたり、決め方を先に共有しておくと摩擦は大きく減ります。あくまでエンタメとして、チーム内のコミュニケーションのヒントにお使いください。",
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
            Baseball MBTI Compatibility
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4.4vw, 34px)", margin: "0 0 10px" }}>
            野球MBTI<span className="hl">相性診断</span>【全16タイプ一覧】
          </h1>
          <p>
            チームには、なぜか<strong>やたら噛み合う相手</strong>と、
            <strong>なぜか意見がぶつかる相手</strong>がいます。
            16タイプそれぞれの「相棒になれるタイプ」と「衝突しやすいタイプ」を一覧にしました。
            自分のタイプは<a href="/baseball-dock/">無料の野球MBTI診断（全45問）</a>で判定できます。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="mbtitype-top" />

        <section className="score-howto" style={{ marginBottom: 22 }}>
          <h2 className="section-title">相性の考え方</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            <strong>◎ 噛み合う相棒</strong>＝4つの指標すべてが逆のタイプ。見ているものが違うぶん、
            お互いの穴を自然に埋め合えます（例：勢いで引っ張る人と、冷静に整える人）。<br />
            <strong>△ 衝突しやすい相手</strong>＝「判断の仕方」と「進め方」だけが逆のタイプ。
            目的は同じなのに、決め方とペースが違うので摩擦が起きやすい組み合わせです。
            ただし<strong>噛み合えば一番強い</strong>ペアでもあります。
          </p>
        </section>

        <div className="compat-table">
          {rows.map(({ t, best, tough }) => (
            <div className="compat-row" key={t.code}>
              <a className="compat-me" href={`/baseball-dock/type/${t.code.toLowerCase()}/`}>
                <TypeIcon icon={t.icon} className="compat-icon" />
                <span className="compat-me-code">{t.code}</span>
                <span className="compat-me-nick">{t.nickname}</span>
              </a>
              <div className="compat-pair">
                {best && (
                  <a
                    className="compat-chip good"
                    href={`/baseball-dock/type/${best.type.code.toLowerCase()}/`}
                  >
                    <span className="compat-chip-label">◎ 噛み合う相棒</span>
                    <span className="compat-chip-code">
                      {best.type.code}
                      <span className="compat-chip-nick">{best.type.nickname}</span>
                    </span>
                    <span className="compat-chip-note">{best.note}</span>
                  </a>
                )}
                {tough && (
                  <a
                    className="compat-chip tough"
                    href={`/baseball-dock/type/${tough.type.code.toLowerCase()}/`}
                  >
                    <span className="compat-chip-label">△ 衝突しやすい</span>
                    <span className="compat-chip-code">
                      {tough.type.code}
                      <span className="compat-chip-nick">{tough.type.nickname}</span>
                    </span>
                    <span className="compat-chip-note">{tough.note}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <section className="score-howto" style={{ marginTop: 28 }}>
          <h2 className="section-title">チームで活かすコツ</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            <strong>バッテリー</strong>は「決め方」を先に握っておくと安定します。配球を任せるのか、
            相談して決めるのか。<strong>キーストーンコンビ（二遊間）</strong>は、
            とっさの判断が多いぶん、片方が慎重・片方が思い切り型だと守備範囲が広がります。
            <strong>主将と参謀</strong>は、引っ張る人と整える人で分かれていると回りやすい。
            衝突しやすい相手とは、<strong>やり方ではなく目的だけ合わせる</strong>と摩擦が減ります。
          </p>
          <p className="section-sub" style={{ marginTop: 10 }}>
            ※ エンタメ診断です。相性が悪い＝合わない、ではありません。
            むしろ噛み合った時にいちばん強いのが「衝突しやすい」ペアです。
          </p>
        </section>

        <div className="bat-links">
          <a className="cta-inline" href="/baseball-dock/">→ 自分のタイプを「野球MBTI診断」で調べる（無料・全45問）</a>
          <a className="cta-inline" href="/baseball-dock/type/">→ 全16タイプの詳しい解説を読む</a>
          <a className="cta-inline" href="/baseball-dock/position/">→ 「タイプ別・向いているポジション」を見る</a>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
