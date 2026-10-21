import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import SpikeShindan from "@/components/SpikeShindan";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球スパイク診断【4問・無料】樹脂ポイントか金具か、ローカットかミドルカットか",
  description:
    "野球スパイク選びで迷うのは「樹脂ポイントか金具か」「ローカットかミドルカットか」の2点です。4つの質問に答えるだけで、あなたのプレースタイルに合うソールとカットを提案します。金具は使用できないリーグもあるため、規定の確認ポイントも明記。登録不要・無料・約30秒。",
  alternates: { canonical: `${SITE_URL}/spikes-shindan/` },
  openGraph: {
    title: "野球スパイク診断【4問・無料】樹脂ポイントか金具か",
    description: "4問で、あなたに合うスパイクのソールとカットがわかる無料診断。",
    type: "website",
    url: `${SITE_URL}/spikes-shindan/`,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球スパイク診断【4問・無料】",
    description: "4問で、あなたに合うスパイクのソールとカットがわかる。",
    images: ["/og.png"],
  },
};

export default function SpikesShindanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "野球スパイク診断",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/spikes-shindan/`,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "草野球で金具スパイクは使えますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "リーグや球場によって異なります。人工芝のグラウンドや、所属する連盟・大会で金具スパイクを禁止している場合があるため、購入前に必ず所属先の規定とよく使う球場のルールを確認してください。迷う場合や、複数の球場を使う場合は、使用できる範囲が広い樹脂（ポイント）ソールが無難です。",
        },
      },
      {
        "@type": "Question",
        name: "ローカットとミドルカットはどちらがいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "一歩目の軽さと動きやすさを取るならローカット、足首まわりの安定とケガの不安を減らしたいならミドルカットが向きます。過去に足首を痛めたことがある人や、不整地のグラウンドを使うことが多い人はミドルカットを検討する価値があります。",
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
            Spike Finder
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 36px)", margin: "0 0 10px" }}>
            野球スパイク<span className="hl">診断</span>
          </h1>
          <p>
            スパイク選びで迷うのは、結局<strong>「樹脂ポイントか金具か」</strong>と
            <strong>「ローカットかミドルカットか」</strong>の2点です。
            4つの質問に答えるだけで、あなたに向く組み合わせを提案します。登録不要・無料・約30秒。
          </p>
          <p style={{ fontSize: 13, marginTop: 8 }}>
            ※ 金具スパイクは<strong>使用できないリーグ・球場があります</strong>。
            購入前に所属先の規定をご確認ください。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="spikeshindan-top" />

        <SpikeShindan />

        <ProductCards
          keyword="野球 スパイク 一般"
          minPrice={5000}
          heading="👟 いま楽天で人気の野球スパイク"
          hits={4}
        />

        <section className="score-howto" style={{ marginTop: 30 }}>
          <h2 className="section-title">ソールとカットの違い</h2>
          <div className="mp-list">
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>樹脂ポイント（ポイントソール）</p>
              <p className="mp-catch">草野球の主流</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>向いている人</strong>
                  <span className="mp-why">
                    どの球場でも使いたい人。人工芝でも土でも使え、使用禁止になりにくい。
                  </span>
                </span>
                <span className="mp-pos-item">
                  <strong>トレードオフ</strong>
                  <span className="mp-why">土のグラウンドでの食いつきは金具に劣る。</span>
                </span>
              </div>
            </div>
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>金具（メタルソール）</p>
              <p className="mp-catch">土での食いつき重視</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>向いている人</strong>
                  <span className="mp-why">土のグラウンドが主戦場で、踏ん張りを重視する人。</span>
                </span>
                <span className="mp-pos-item">
                  <strong>トレードオフ</strong>
                  <span className="mp-why">
                    人工芝や一部のリーグ・大会で使用不可。買う前に規定の確認が必須。
                  </span>
                </span>
              </div>
            </div>
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>ローカット / ミドルカット</p>
              <p className="mp-catch">軽さを取るか、足首の安定を取るか</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>ローカット</strong>
                  <span className="mp-why">軽く、一歩目が速い。走塁・守備範囲を重視する人に。</span>
                </span>
                <span className="mp-pos-item">
                  <strong>ミドルカット</strong>
                  <span className="mp-why">
                    足首まわりが安定する。捻挫の不安がある人、不整地が多い人に。
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="bat-links">
          <a className="cta-inline" href="/spikes/">→ 野球スパイクをメーカー・価格帯で比較する</a>
          <a className="cta-inline" href="/guide/spikes-guide/">→ じっくり読む「野球スパイクの選び方」</a>
          <a className="cta-inline" href="/bat-shindan/">→ バットも選ぶなら「軟式バット診断」</a>
          <a className="cta-inline" href="/glove-shindan/">→ グローブも選ぶなら「グローブ診断」</a>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
