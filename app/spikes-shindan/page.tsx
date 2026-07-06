import type { Metadata } from "next";
import SpikesShindan from "@/components/SpikesShindan";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球スパイク相性診断｜はい/いいえで“あなたに合う一足”がわかる（草野球向け）",
  description:
    "「はい／いいえ」に答えるだけで、あなたに合う野球スパイクの種別（樹脂ポイント/金具）・カット・素材・ブランド傾向・予算をその場で診断。草野球のグラウンド事情（金具禁止）にも配慮。実商品も表示します。",
  alternates: { canonical: `${SITE_URL}/spikes-shindan/` },
  openGraph: {
    title: "野球スパイク相性診断｜はい/いいえで合う一足がわかる",
    description:
      "ポイント/金具・カット・素材・ブランド・予算を提案。草野球の球場事情にも配慮。実商品も。",
    type: "website",
  },
};

export default function SpikesShindanPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "34px 0 28px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Spikes
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            野球スパイク<span className="hl">相性診断</span>
          </h1>
          <p>
            <strong>「はい／いいえ」に答えるだけ</strong>で、あなたに合うスパイクの
            種別（樹脂ポイント／金具）・カット・素材・ブランド傾向・予算をその場で提案。
            草野球のグラウンド事情（金具禁止が多い）にも配慮して診断します。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 12 }}>
        <AdSlot id="article-top" />
        <SpikesShindan />
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <div className="score-howto">
          <h2 className="section-title">診断のしくみ</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            草野球でまず分かれるのが「樹脂ポイント」か「金具」か。多くの公共グラウンドが金具を禁止しているため、
            使える球場かどうかを最初に確認します。そのうえで、グリップ・軽さ・足首の保護・足の幅・予算から、
            あなたに合うカット・素材・ブランド傾向まで提案します。
          </p>
        </div>
      </div>
    </main>
  );
}
