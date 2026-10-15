import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import BgloveShindan from "@/components/BgloveShindan";
import ProductCards from "@/components/ProductCards";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "バッティンググローブ診断【4問・無料】グリップ重視・フィット重視・コスパ重視どれ？",
  description:
    "バッティンググローブ（バッテ）は、グリップ重視・フィット重視・コスパ重視で選ぶ基準がまるで違います。4つの質問に答えるだけで、あなたに合うタイプと代表ブランドを提案。木製バット派やグリップ最優先の人に向けた「アメフト用グローブ流用」という裏技も紹介します。登録不要・無料・約30秒。",
  alternates: { canonical: `${SITE_URL}/batting-gloves-shindan/` },
  openGraph: {
    title: "バッティンググローブ診断【4問・無料】",
    description: "4問で、あなたに合うバッティンググローブのタイプと代表ブランドがわかる無料診断。",
    type: "website",
    url: `${SITE_URL}/batting-gloves-shindan/`,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "バッティンググローブ診断【4問・無料】",
    description: "4問で、あなたに合うバッティンググローブのタイプがわかる。",
    images: ["/og.png"],
  },
};

export default function BgloveShindanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "バッティンググローブ診断",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/batting-gloves-shindan/`,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "バッティンググローブはどのくらいで買い替えますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "消耗品です。使う頻度にもよりますが、手のひらや指の付け根が擦り切れてきたら替えどきです。破れたまま使うとグリップが不安定になり、スイング中に握りがずれる原因になります。頻繁に買い替える前提なら、最初からコスパ重視のモデルを選ぶ方が結果的に負担が軽くなります。",
        },
      },
      {
        "@type": "Question",
        name: "サイズはどう選べばいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "各メーカーが手のひら周りや手長の実寸でサイズ表を出しているので、必ず実寸を測って合わせてください。きつすぎると手が痛くなり、緩すぎるとグリップがずれます。天然皮革は使ううちに少し伸びるため、最初はぴったりめを選ぶのが一般的です。",
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
            Batting Glove Finder
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4.4vw, 34px)" , margin: "0 0 10px" }}>
            バッティンググローブ<span className="hl">診断</span>
          </h1>
          <p>
            いわゆる<strong>バッテ</strong>は、
            <strong>グリップ重視・フィット重視・コスパ重視</strong>で選ぶ基準がまるで違います。
            4つの質問に答えるだけで、あなたに合うタイプと代表ブランドを提案します。
            登録不要・無料・約30秒。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="bgloveshindan-top" />

        <BgloveShindan />

        <ProductCards
          keyword="野球 バッティンググローブ 一般"
          heading="🧤 いま楽天で人気のバッティンググローブ"
          hits={4}
        />

        <section className="score-howto" style={{ marginTop: 30 }}>
          <h2 className="section-title">選び方の3つの軸</h2>
          <div className="mp-list">
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>グリップ重視</p>
              <p className="mp-catch">滑らないことが最優先</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>向いている人</strong>
                  <span className="mp-why">
                    握りがずれるのが嫌な人、木製バットを使う人。天然皮革の輸入ブランドが候補。
                  </span>
                </span>
              </div>
            </div>
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>フィット重視</p>
              <p className="mp-catch">手に吸いつく質感</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>向いている人</strong>
                  <span className="mp-why">
                    道具の感触にこだわる人。国内メーカーの天然皮革モデルが合いやすい。
                  </span>
                </span>
              </div>
            </div>
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>コスパ重視</p>
              <p className="mp-catch">消耗品と割り切る</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>向いている人</strong>
                  <span className="mp-why">
                    月に何度も試合がある人。擦り切れたら気軽に替える前提なら合成皮革で十分。
                  </span>
                </span>
              </div>
            </div>
          </div>
          <p className="section-sub" style={{ marginTop: 14 }}>
            サイズは<strong>必ず実寸を確認</strong>してください。きつすぎると手が痛くなり、
            緩すぎると握りがずれます。天然皮革は使ううちに少し伸びます。
          </p>
        </section>

        <div className="bat-links">
          <a className="cta-inline" href="/batting-gloves/">→ バッティンググローブをブランド・価格帯で比較する</a>
          <a className="cta-inline" href="/guide/grip-tape/">→ あわせて読む「バットのグリップテープの種類と巻き方」</a>
          <a className="cta-inline" href="/bat-shindan/">→ バットも選ぶなら「軟式バット診断」</a>
          <a className="cta-inline" href="/spikes-shindan/">→ スパイクも選ぶなら「スパイク診断」</a>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
