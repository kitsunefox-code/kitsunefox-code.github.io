import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import BatShindan from "@/components/BatShindan";
import { BAT_MATERIAL_INFO } from "@/data/batData";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "軟式バット診断【6問・無料】素材・長さ・重さまで提案｜自分に合う一本がわかる",
  description:
    "軟式バット選びで一番の失敗は「素材」ではなく「長さと重さ」です。6つの質問に答えるだけで、金属・カーボン・ビヨンド系のどれが合うかに加えて、身長と打撃スタイルから長さ・重さ・バランス（トップ／ミドル／カウンター）まで提案します。登録不要・無料・約1分。価格の目安つき。",
  alternates: { canonical: `${SITE_URL}/bat-shindan/` },
  openGraph: {
    title: "軟式バット診断【6問・無料】素材・長さ・重さまで提案",
    description:
      "6問で、あなたに合う軟式バットの素材・長さ・重さ・バランスがわかる無料診断。価格の目安つき。",
    type: "website",
    url: `${SITE_URL}/bat-shindan/`,
    images: [{ url: "/og-dock.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "軟式バット診断【6問・無料】",
    description: "6問で、あなたに合う軟式バットの素材・長さ・重さがわかる。",
    images: ["/og-dock.png"],
  },
};

export default function BatShindanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "軟式バット診断",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/bat-shindan/`,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "軟式バットは何を基準に選べばいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "素材（金属・カーボン・ビヨンド系などの高反発）に目が行きがちですが、実際に打球が変わるのは長さと重さ、そしてバランス（重心位置）です。どれだけ良いバットでも、振り遅れる重さでは当たりません。まず振り切れる範囲で選び、その中で素材を決めるのが失敗しない順番です。",
        },
      },
      {
        "@type": "Question",
        name: "高い高反発バットを最初に買うべきですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "おすすめしません。反発素材は使ううちに反発が落ちていく消耗品でもあります。まずは1万円前後の金属やカーボンで自分に合う長さ・重さを見つけ、次の一本で飛距離を取りにいく順番が無駄になりにくいです。また、リーグや大会によっては高反発バットを制限している場合があるため、購入前に所属先の規定を確認してください。",
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
            Bat Finder
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 36px)", margin: "0 0 10px" }}>
            軟式バット<span className="hl">診断</span>
          </h1>
          <p>
            バット選びで一番多い失敗は、素材ではなく
            <strong>「振り切れない長さ・重さを選ぶこと」</strong>です。
            6つの質問に答えるだけで、<strong>素材・長さ・重さ・バランス</strong>まで提案します。
            登録不要・無料・約1分。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="batshindan-top" />

        <BatShindan />

        <section className="score-howto" style={{ marginTop: 30 }}>
          <h2 className="section-title">素材ごとの違い</h2>
          <p className="section-sub" style={{ marginTop: 8, marginBottom: 14 }}>
            診断で出る3種類を、あらかじめ見ておきたい人はこちらをどうぞ。
            高いほど良いという話ではなく、<strong>予算と目的の折り合い</strong>です。
          </p>
          <div className="mp-list">
            {(["metal", "carbon", "beyond"] as const).map((k) => (
              <div className="mp-row" key={k}>
                <p className="mp-code" style={{ fontSize: 17 }}>
                  {BAT_MATERIAL_INFO[k].label}
                </p>
                <p className="mp-catch">{BAT_MATERIAL_INFO[k].price}</p>
                <div className="mp-pos">
                  <span className="mp-pos-item">
                    <strong>特徴</strong>
                    <span className="mp-why">{BAT_MATERIAL_INFO[k].feature}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="score-howto" style={{ marginTop: 24 }}>
          <h2 className="section-title">買う前に確認したいこと</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            公式戦で使うなら、<strong>JSBB（全日本軟式野球連盟）の検定マーク</strong>があるかを
            商品説明で確認してください。加えて、<strong>所属リーグや大会が高反発バットを
            認めているか</strong>も先に調べておくと安心です。規定は改定されることがあるので、
            最終的には所属先の公式情報でご確認ください。
          </p>
        </section>

        <div className="bat-links">
          <a className="cta-inline" href="/bat/">→ 軟式バットを素材・価格帯・メーカーで比較する</a>
          <a className="cta-inline" href="/guide/bat-guide/">→ じっくり読む「軟式バットの選び方」</a>
          <a className="cta-inline" href="/guide/bat-care/">→ 長く使う「バットのお手入れ」</a>
          <a className="cta-inline" href="/baseball-dock/">→ 全45問の「野球MBTI診断」で道具一式を処方してもらう</a>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
