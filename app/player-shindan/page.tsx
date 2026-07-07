import type { Metadata } from "next";
import PlayerShindan from "@/components/PlayerShindan";
import AdSlot from "@/components/AdSlot";
import { PLAYERS } from "@/data/players";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球選手タイプ診断｜あなたに似たNPB・MLB選手＆その使用メーカーがわかる",
  description:
    "12の「はい／いいえ」に答えるだけで、あなたのプレースタイル・性格に近いNPB・MLBの選手をズバリ診断。その選手が使っているグローブ・バット・スパイクのメーカーまでわかり、買える実商品も表示します。道具選びの参考にも、ただの性格診断としても楽しめます。",
  alternates: { canonical: `${SITE_URL}/player-shindan/` },
  openGraph: {
    title: "野球選手タイプ診断｜あなたに似たNPB・MLB選手＆使用メーカー",
    description:
      "はい／いいえで、あなたに似た選手を診断。使用グローブ・バット・スパイクのメーカーと実商品も。",
    type: "website",
    url: `${SITE_URL}/player-shindan/`,
    images: [{ url: "/og-player.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球選手タイプ診断｜あなたに似たNPB・MLB選手＆使用メーカー",
    description:
      "はい／いいえで、あなたに似た選手を診断。使用ギアのメーカー＆実モデルも。",
    images: ["/og-player.png"],
  },
};

export default function PlayerShindanPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "34px 0 28px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Player Match
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            野球選手<span className="hl">タイプ診断</span>
          </h1>
          <p>
            <strong>「はい／いいえ」に答えるだけ</strong>で、あなたのプレースタイル・性格に近い
            <strong>NPB・MLBの選手</strong>をズバリ診断。その選手が使っている
            グローブ・バット・スパイクの<strong>メーカー</strong>と、買える実商品まで表示します。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 12 }}>
        <AdSlot id="article-top" />
        <PlayerShindan />
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <div className="score-howto">
          <h2 className="section-title">診断について</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            長打・守備・走塁・巧打・リーダー性・二刀流志向など、あなたの“野球の性格”から、
            現在収録の<strong>{PLAYERS.length}名</strong>のNPB・MLB選手の中で最も近いタイプをマッチング。
            使用メーカーは公開情報にもとづく参考で、時期や場面により変わることがあります。
            道具選びのヒントにも、ただのお楽しみ診断としてもどうぞ。
          </p>
          <a className="cta-inline" href="/player-shindan/type/" style={{ marginTop: 14 }}>
            → 野球選手タイプ全16種の解説を見る（あなたはどのタイプ？）
          </a>
        </div>
      </div>
    </main>
  );
}
