import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import PlayerQuickShindan from "@/components/PlayerQuickShindan";
import { PLAYER_COUNT, NPB_COUNT, MLB_COUNT } from "@/data/players";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: `野球選手タイプ診断【10問・無料】あなたに近いタイプのプロ野球選手は？NPB・MLB${PLAYER_COUNT}名から`,
  description: `10問に答えるだけで、あなたのプレースタイルの傾向に近いプロ野球選手を紹介します。大谷翔平・坂本勇人・山本由伸などNPB・MLB${PLAYER_COUNT}名（NPB${NPB_COUNT}名／MLB${MLB_COUNT}名）から、資質の近い選手を候補まで表示。登録不要・無料・約1分。その選手の使用グローブ・バットもわかります。※性格や実力を判定するものではない簡易診断です。`,
  alternates: { canonical: `${SITE_URL}/similar-player/` },
  openGraph: {
    title: `野球選手タイプ診断【10問・無料】NPB・MLB${PLAYER_COUNT}名から`,
    description:
      "10問で、あなたに近いタイプのプロ野球選手がわかる簡易診断。使用ギアつき・無料。",
    type: "website",
    url: `${SITE_URL}/similar-player/`,
    images: [{ url: "/og-dock.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球選手タイプ診断【10問・無料】",
    description: "10問で、あなたに近いタイプのプロ野球選手がわかる。使用ギアつき。",
    images: ["/og-dock.png"],
  },
};

export default function SimilarPlayerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "野球選手タイプ診断",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/similar-player/`,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "近いタイプの選手はどうやって選んでいますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: `10の質問の回答から「長打力・守備・走力・勝負強さ・技巧・リーダー気質」など13種類の資質を点数化し、収録している${PLAYER_COUNT}名の選手が持つ資質と照らし合わせて、傾向の近い選手を上位から表示しています。あくまでプレースタイルの傾向を見る簡易診断で、性格や実力を判定するものではありません。同じくらい近い候補が複数いる場合もあるため、結果には別候補もあわせて表示しています。`,
        },
      },
      {
        "@type": "Question",
        name: "もっと詳しく診断できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい。全45問の「野球MBTI診断（野球人間ドック）」では、16タイプの性格診断に加えて、似ているプロ選手、さらにバット・グローブ・スパイクなど道具の処方まで検査結果報告書としてまとめて受け取れます。こちらも無料・登録不要です。",
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
            Similar Player
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 36px)", margin: "0 0 10px" }}>
            野球選手<span className="hl">タイプ診断</span>
          </h1>
          <p>
            <strong>10問</strong>に答えると、あなたのプレースタイルの傾向に近いプロ野球選手を、
            NPB・MLBの<strong>{PLAYER_COUNT}名</strong>の中から紹介します。
            その選手が使っているグローブ・バットも一緒にわかります。登録不要・無料・約1分。
          </p>
          <p style={{ fontSize: 13, marginTop: 8 }}>
            ※ プレースタイルの傾向を見る<strong>簡易診断</strong>です。性格や実力を判定するものではありません。
            じっくり診断したい方は<a href="/baseball-dock/">全45問の野球MBTI診断</a>をどうぞ。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="similar-top" />

        <PlayerQuickShindan />

        <section className="score-howto" style={{ marginTop: 30 }}>
          <h2 className="section-title">この診断について</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            10の質問から「長打力・守備・走力・勝負強さ・技巧・リーダー気質」など
            <strong>13種類の資質</strong>を点数化し、収録している{PLAYER_COUNT}名
            （NPB {NPB_COUNT}名／MLB {MLB_COUNT}名）の選手が持つ資質と照らし合わせて、
            傾向の近い選手を上位から表示しています。
          </p>
          <p className="section-sub" style={{ marginTop: 10 }}>
            <strong>正直にお伝えすると、</strong>これは
            <strong>「あなたに似た選手を言い当てる」ものではありません</strong>。
            10問で分かるのはプレースタイルの大まかな傾向までで、同じくらい近い選手が複数いることも
            よくあります。そのため結果では1人だけでなく<strong>別候補もあわせて表示</strong>しています。
            性格の4軸まで見て判定したい方は、<a href="/baseball-dock/">全45問の野球MBTI診断</a>の方が
            ずっと精度が高いのでそちらをどうぞ。使用ギアは公開情報にもとづく参考です。
          </p>
          <p className="section-sub" style={{ marginTop: 10 }}>
            もっと詳しく知りたい人は、全45問の
            <a href="/baseball-dock/">野球MBTI診断（野球人間ドック）</a>へ。
            16タイプの性格診断に加えて、似ているプロ選手、さらにバット・グローブ・スパイクの
            処方まで「検査結果報告書」一枚で受け取れます。
          </p>
        </section>

        <div className="bat-links">
          <a className="cta-inline" href="/baseball-dock/">→ 本格版「野球MBTI診断」（全45問・無料）を受ける</a>
          <a className="cta-inline" href="/players/">→ プロ選手{PLAYER_COUNT}名の使用ギア一覧を見る</a>
          <a className="cta-inline" href="/baseball-dock/position/">→ タイプ別・向いているポジションを見る</a>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
