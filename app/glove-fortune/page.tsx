import type { Metadata } from "next";
import GloveFortune from "@/components/GloveFortune";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "グローブメーカー占い🔮｜あなたの相棒グラブで今日の運勢がわかる（草野球おまけ）",
  description:
    "試合でメインに使っているグローブメーカーを選ぶだけで、今日の野球運がわかるお遊び占い。ミズノ・ゼット・SSK・ローリングスから、久保田スラッガー・ハタケヤマ・ドナイヤ・アイピーセレクト（IP Select）などのこだわり系まで対応。打撃運・守備運・ラッキーポジションを毎日診断。",
  alternates: { canonical: `${SITE_URL}/glove-fortune/` },
  openGraph: {
    title: "グローブメーカー占い🔮｜相棒グラブで今日の運勢がわかる",
    description:
      "メインで使うグローブメーカーを選ぶだけ。打撃運・守備運・ラッキーポジションを毎日占う草野球のおまけ。",
    type: "website",
  },
};

export default function GloveFortunePage() {
  return (
    <main>
      <div className="hero" style={{ padding: "34px 0 28px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            FORTUNE / おまけ占い
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            グローブメーカー<span className="hl">占い</span>
          </h1>
          <p>
            試合でメインに使っている<strong>グローブメーカー</strong>を選ぶだけ。
            あなたの今日の野球運を占います。ミズノやSSKといった王道から、
            久保田スラッガー・ハタケヤマ・アイピーセレクト（IP Select）などの
            こだわり系まで対応。<strong>毎日結果が変わります</strong>。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 40 }}>
        <AdSlot id="article-top" />
        <GloveFortune />
      </div>
    </main>
  );
}
