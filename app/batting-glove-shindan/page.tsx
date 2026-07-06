import type { Metadata } from "next";
import BattingGloveShindan from "@/components/BattingGloveShindan";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "バッティンググローブ相性診断｜7つの質問であなたに合う打撃手袋がわかる（木製バット派・裏技も）",
  description:
    "使うバット・重視点・手の大きさ・素材・予算に答えるだけで、あなたに合うバッティンググローブの素材・ブランド傾向・サイズ・グリップ度をその場で診断。木製バット派の選び方や、アメフトグローブ流用の裏技にも対応。実商品も表示します。",
  alternates: { canonical: `${SITE_URL}/batting-glove-shindan/` },
  openGraph: {
    title: "バッティンググローブ相性診断｜7問であなたに合う打撃手袋がわかる",
    description:
      "バット・重視点・手・素材・予算に答えるだけ。素材・ブランド・サイズ・グリップ度を提案。木製派・裏技も。",
    type: "website",
  },
};

export default function BattingGloveShindanPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "34px 0 28px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Batting Gloves
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            バッティンググローブ<span className="hl">相性診断</span>
          </h1>
          <p>
            <strong>7つの質問に答えるだけ</strong>で、あなたに合うバッティンググローブの
            素材・ブランド傾向・サイズ・グリップ度をその場で提案。
            「木製バット派」や「グリップ最強の裏技（アメフトG流用）」にも対応します。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 12 }}>
        <AdSlot id="article-top" />
        <BattingGloveShindan />
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <div className="score-howto">
          <h2 className="section-title">診断のしくみ</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            「使うバット」を最初に聞くのがこの診断のポイント。木製バットは金属より衝撃が大きく、
            グリップも細いため、手袋の選び方が変わります。重視点・手の大きさ・素材・予算まで
            組み合わせて、素材・ブランド傾向・サイズ・グリップ度を提案。グリップ最優先の人には、
            アメフトグローブ流用の裏技も（自己責任・規定確認のうえで）ご案内します。
          </p>
        </div>
      </div>
    </main>
  );
}
