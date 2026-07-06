import type { Metadata } from "next";
import BatShindan from "@/components/BatShindan";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "軟式バット相性診断｜6つの質問であなたにぴったりの一本がわかる（草野球向け）",
  description:
    "経験・力・打撃タイプ・身長・予算などに答えるだけで、あなたに合う軟式バットの素材・長さ・重さ・バランスをその場で診断。硬式出身で非力な人にも対応。金属・カーボン・ビヨンド系まで、失敗しない一本選びをサポートします。",
  alternates: { canonical: `${SITE_URL}/bat-shindan/` },
  openGraph: {
    title: "軟式バット相性診断｜6つの質問でぴったりの一本がわかる",
    description:
      "経験・力・打撃タイプ・身長・予算に答えるだけ。素材・長さ・重さ・バランスをその場で提案。",
    type: "website",
  },
};

export default function BatShindanPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "34px 0 28px" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            軟式<span className="hl">バット相性診断</span>
          </h1>
          <p>
            <strong>6つの質問に答えるだけ</strong>で、あなたにぴったりの軟式バットの
            素材・長さ・重さ・バランスをその場で提案します。
            「硬式出身だけど力はない」——そんな人にもちゃんと合わせて診断します。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 12 }}>
        <AdSlot id="article-top" />
        <BatShindan />
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <div className="score-howto">
          <h2 className="section-title">診断のしくみ</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            「野球経験」と「力の有無」を別々に質問するのがこの診断のポイント。
            硬式経験者でも非力な人はいますし、初心者でもパワーがある人はいます。
            両方を組み合わせて、素材（金属／カーボン／ビヨンド系）・長さ・重さ・バランスを提案します。
            気になる一本が見つかったら、そのまま探せるリンクも用意しています。
          </p>
        </div>
      </div>
    </main>
  );
}
