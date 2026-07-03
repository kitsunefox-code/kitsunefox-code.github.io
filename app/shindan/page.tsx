import type { Metadata } from "next";
import Shindan from "@/components/Shindan";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "ユニフォームぴったり診断｜写真と条件からおすすめメーカーを提案",
  description:
    "作りたいユニフォームのイメージ写真をアップすると配色を自動解析。チーム人数・予算・納期の質問に答えるだけで、あなたのチームに一番近いユニフォームを作れるオーダーメーカーを無料で診断します。",
  alternates: { canonical: `${SITE_URL}/shindan/` },
  openGraph: {
    title: "ユニフォームぴったり診断（無料・30秒）",
    description:
      "イメージ写真と3つの質問から、ぴったりのユニフォームオーダーメーカーを診断します。",
    type: "website",
  },
};

export default function ShindanPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "36px 0 30px" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            ユニフォーム<span className="hl">ぴったり診断</span>
          </h1>
          <p>
            作りたいイメージの写真と3つの質問だけで、あなたのチームに合ったオーダーメーカーを提案します。
            無料・登録不要・約30秒。
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 26, paddingBottom: 40 }}>
        <Shindan />
      </div>
    </main>
  );
}
