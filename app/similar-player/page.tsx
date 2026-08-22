import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import PlayerQuickShindan from "@/components/PlayerQuickShindan";
import { PLAYER_COUNT, NPB_COUNT, MLB_COUNT } from "@/data/players";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: `似ているプロ野球選手診断【5問・無料】あなたに一番近い選手は？NPB・MLB${PLAYER_COUNT}名から判定`,
  description: `たった5問で「あなたに似ているプロ野球選手」を1人ズバリ判定。大谷翔平・坂本勇人・山本由伸などNPB・MLB${PLAYER_COUNT}名（NPB${NPB_COUNT}名／MLB${MLB_COUNT}名）から、プレースタイルの資質が最も近い選手を選びます。登録不要・無料・30秒。結果はSNSでシェアでき、その選手の使用グローブ・バットも一緒にわかります。`,
  alternates: { canonical: `${SITE_URL}/similar-player/` },
  openGraph: {
    title: `似ているプロ野球選手診断【5問・無料】NPB・MLB${PLAYER_COUNT}名から判定`,
    description:
      "たった5問で、あなたに一番近いプロ野球選手を1人ズバリ。使用ギアもわかる無料診断。",
    type: "website",
    url: `${SITE_URL}/similar-player/`,
    images: [{ url: "/og-dock.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "似ているプロ野球選手診断【5問・無料】",
    description: "5問で、あなたに一番近いプロ野球選手が1人わかる。使用ギアつき。",
    images: ["/og-dock.png"],
  },
};

export default function SimilarPlayerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "似ているプロ野球選手診断",
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
        name: "似ているプロ野球選手はどうやって判定していますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: `5つの質問の回答から「長打力・守備・走力・勝負強さ・技巧・リーダー気質」などの資質を点数化し、収録している${PLAYER_COUNT}名の選手が持つ資質と照らし合わせて、最も近い1人を選んでいます。同点の場合はランダムに選ばれるため、同じ回答でも違う選手が出ることがあります。`,
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
            似ている<span className="hl">プロ野球選手</span>診断
          </h1>
          <p>
            質問は<strong>たった5問</strong>。あなたのプレースタイルに最も近いプロ野球選手を、
            NPB・MLBの<strong>{PLAYER_COUNT}名</strong>から1人ズバリ判定します。
            その選手が使っているグローブ・バットも一緒にわかります。登録不要・無料・約30秒。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="similar-top" />

        <PlayerQuickShindan />

        <section className="score-howto" style={{ marginTop: 30 }}>
          <h2 className="section-title">この診断について</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            5つの質問から「長打力・守備・走力・勝負強さ・技巧・リーダー気質」などの資質を点数化し、
            収録している{PLAYER_COUNT}名（NPB {NPB_COUNT}名／MLB {MLB_COUNT}名）の選手が持つ資質と
            照らし合わせて、いちばん近い1人を選んでいます。
            同点の場合はランダムに選ばれるので、同じ回答でも違う選手が出ることがあります。
            使用ギアは公開情報にもとづく参考です。
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
