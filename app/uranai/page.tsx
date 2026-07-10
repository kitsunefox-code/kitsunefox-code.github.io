import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import MakerFortune from "@/components/MakerFortune";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球ギアメーカー占い｜好きなメーカーを選ぶだけ・今日の運勢を毎日診断【無料】",
  description:
    "あなたが使っている（または好きな）野球メーカーを選ぶだけ。そのメーカーの人物像と、総合運・打撃運・守備運・ラッキーポジション・ラッキー背番号まで、今日の運勢を詳しく占います。毎日変わるので試合前の運試しにも。ミズノ・ゼット・SSK・久保田スラッガー・ローリングス・ウィルソンなど主要メーカーに対応。登録不要・無料。",
  alternates: { canonical: `${SITE_URL}/uranai/` },
  openGraph: {
    title: "野球ギアメーカー占い｜今日の運勢を毎日診断",
    description:
      "好きな野球メーカーを選ぶだけ。総合運・打撃運・守備運・ラッキー背番号まで、今日の運勢を詳しく。",
    type: "website",
    url: `${SITE_URL}/uranai/`,
    images: [{ url: "/og-uranai.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球ギアメーカー占い｜今日の運勢",
    description: "好きな野球メーカーを選ぶだけ。今日の運勢を詳しく占います。無料・毎日更新。",
    images: ["/og-uranai.png"],
  },
};

export default function UranaiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "野球ギアメーカー占い",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/uranai/`,
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hero" style={{ padding: "34px 0 24px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Gear Fortune
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4.4vw, 34px)", margin: "0 0 10px" }}>
            野球<span className="hl">ギアメーカー占い</span>
          </h1>
          <p>
            使っている（または好きな）野球メーカーを選ぶだけ。そのメーカーの人物像と、
            <strong>今日の運勢</strong>（総合・打撃・守備・ラッキーポジション・背番号）を詳しく占います。
            毎日変わるので、<strong>試合前の運試し</strong>にもどうぞ。登録不要・無料。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 8, paddingBottom: 30 }}>
        <AdSlot id="uranai-top" />

        <MakerFortune />

        <section className="score-howto" style={{ marginTop: 28 }}>
          <h2 className="section-title">この占いについて</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            主要な野球ギアメーカー（ミズノ・ミズノプロ・ゼット・SSK・久保田スラッガー・ローリングス・
            ウィルソン・ハタケヤマ・ドナイヤ・アシックスなど）から、あなたの一つを選ぶと、その場で
            今日の運勢が表示されます。運勢はメーカーと日付から算出しており<strong>毎日変わります</strong>。
            結果はSNSでシェアできるので、チームのみんなで運試しをしても盛り上がります。あくまで
            エンタメ占いとしてお楽しみください。
          </p>
          <p className="section-sub" style={{ marginTop: 10 }}>
            もっと本格的に「自分に近いプロ選手」まで知りたい人は、全45問の
            <a href="/baseball-dock/">野球人間ドック</a>へ。選んだメーカーの実際の道具は
            <a href="/players/">プロ選手の使用ギア一覧</a>や
            <a href="/glove/">グローブ比較</a>・<a href="/bat/">バット比較</a>からも探せます。
          </p>
        </section>
      </div>
      <GoodsLinks />
      <div style={{ height: 24 }} />
    </main>
  );
}
