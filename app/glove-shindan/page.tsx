import type { Metadata } from "next";
import GloveShindan from "@/components/GloveShindan";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "グローブ相性診断｜ポジション・手の大きさ・予算からぴったりのグラブがわかる（草野球向け）",
  description:
    "ポジション・手の大きさ・重視点・予算・型付けの希望に答えるだけで、あなたに合うグローブの型・サイズ・素材・仕上げをその場で提案。内野・外野・投手・捕手・一塁まで対応。初めての一枚選びをサポートします。",
  alternates: { canonical: `${SITE_URL}/glove-shindan/` },
  openGraph: {
    title: "グローブ相性診断｜ぴったりのグラブがわかる",
    description:
      "ポジション・手の大きさ・予算に答えるだけ。型・サイズ・素材・仕上げをその場で提案。",
    type: "website",
  },
};

export default function GloveShindanPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "34px 0 28px" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            グローブ<span className="hl">相性診断</span>
          </h1>
          <p>
            <strong>6つの質問に答えるだけ</strong>で、あなたに合うグローブの
            型・サイズ・素材・仕上げをその場で提案します。
            内野・外野・投手・捕手・一塁まで対応。初めての一枚も、買い替えも。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 12 }}>
        <AdSlot id="article-top" />
        <GloveShindan />
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <div className="score-howto">
          <h2 className="section-title">診断のしくみ</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            グローブはポジションごとに最適な型が違い、手の大きさや重視点（操作性・守備範囲・革質・価格）でも
            選ぶべき一枚が変わります。この診断はそれらを組み合わせて、型・サイズ・素材・仕上げ・型付けの方針まで提案。
            気になったら、そのまま探せるリンクも用意しています。
          </p>
        </div>
      </div>
    </main>
  );
}
