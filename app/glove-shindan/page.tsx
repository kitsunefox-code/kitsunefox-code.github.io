import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GloveShindan from "@/components/GloveShindan";
import { WEB_TYPES } from "@/data/gloveData";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "グローブ診断【4問・無料】あなたに合うウェブの型がわかる｜軟式グローブの選び方",
  description:
    "軟式グローブはウェブ（網）の型で使い勝手が大きく変わります。4つの質問に答えるだけで、あなたのプレースタイルに合うウェブの型（Hウェブ・クロス・バスケット・Tネットなど）と、その特徴・トレードオフがわかります。登録不要・無料。ポジションが決まっていない人でも選べます。",
  alternates: { canonical: `${SITE_URL}/glove-shindan/` },
  openGraph: {
    title: "グローブ診断【4問・無料】あなたに合うウェブの型がわかる",
    description:
      "4問で、あなたに合う軟式グローブのウェブの型がわかる無料診断。特徴とトレードオフつき。",
    type: "website",
    url: `${SITE_URL}/glove-shindan/`,
    images: [{ url: "/og-dock.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "グローブ診断【4問・無料】",
    description: "4問で、あなたに合う軟式グローブのウェブの型がわかる。",
    images: ["/og-dock.png"],
  },
};

export default function GloveShindanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "グローブ診断",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/glove-shindan/`,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ウェブの型は本当に選び分けた方がいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ポジションが決まっているなら、まずはその定番の型を選ぶのが無難です。ただ草野球では守る場所が固定でないことも多く、その場合は「握り替えの速さを取るか」「受け止める安心感を取るか」といった好みで選んだ方が長く使えます。この診断はその好みを整理するためのものです。",
        },
      },
      {
        "@type": "Question",
        name: "初めての1つは何を選べばいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ポジションが未定なら、剛性と操作性のバランスが取れたクロスウェブやオールラウンド向けが扱いやすいです。加えて、軟式は硬式より打球が軽いため、極端に大きく重いモデルより、手に馴染むサイズを選んだ方が扱いやすくなります。",
        },
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <div className="hero" style={{ padding: "34px 0 26px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Glove Finder
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 36px)", margin: "0 0 10px" }}>
            グローブ<span className="hl">診断</span>
          </h1>
          <p>
            軟式グローブは<strong>ウェブ（網）の型</strong>で使い勝手が大きく変わります。
            4つの質問に答えるだけで、あなたのプレースタイルに合う型と、その
            <strong>特徴・トレードオフ</strong>がわかります。登録不要・無料・約30秒。
          </p>
          <p style={{ fontSize: 13, marginTop: 8 }}>
            ※ ポジションが決まっている人は、まずその定番の型を優先してください。
            この診断は「守る場所が固定でない人」「好みから選びたい人」向けです。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="gloveshindan-top" />

        <GloveShindan />

        <section className="score-howto" style={{ marginTop: 30 }}>
          <h2 className="section-title">ウェブの型の一覧</h2>
          <p className="section-sub" style={{ marginTop: 8, marginBottom: 14 }}>
            診断で出る型を、あらかじめ一覧で見ておきたい人はこちらをどうぞ。
            どれが優れているという話ではなく、<strong>何を捨てて何を取るか</strong>の違いです。
          </p>
          <div className="mp-list">
            {WEB_TYPES.map((w) => (
              <div className="mp-row" key={w.id}>
                <p className="mp-code" style={{ fontSize: 17 }}>{w.name}</p>
                <p className="mp-catch">{w.positions}</p>
                <div className="mp-pos">
                  <span className="mp-pos-item">
                    <strong>特徴</strong>
                    <span className="mp-why">{w.feature}</span>
                  </span>
                  <span className="mp-pos-item">
                    <strong>トレードオフ</strong>
                    <span className="mp-why">{w.note}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bat-links">
          <a className="cta-inline" href="/glove/">→ 軟式グローブをメーカー・価格帯で比較する</a>
          <a className="cta-inline" href="/guide/glove-guide/">→ じっくり読む「軟式グローブの選び方」</a>
          <a className="cta-inline" href="/guide/glove-care/">→ 長く使う「グローブの型付け・お手入れ」</a>
          <a className="cta-inline" href="/baseball-dock/">→ 全45問の「野球MBTI診断」で道具一式を処方してもらう</a>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
