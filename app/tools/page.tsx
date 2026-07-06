import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/data/site";
import { TOOLS } from "@/data/tools";

export const metadata: Metadata = {
  title: "草野球の無料ツール一覧｜ユニフォーム診断・バット診断・グローブ診断・占い",
  description:
    "草野球ナビの無料ツールをまとめて紹介。写真からメーカーを提案するユニフォーム診断、あなたに合う一本がわかるバット相性診断、ポジション別のグローブ相性診断、おまけのグローブメーカー占いまで。すべて登録不要・無料で使えます。",
  alternates: { canonical: `${SITE_URL}/tools/` },
  openGraph: {
    title: "草野球の無料ツール一覧｜診断・占い",
    description:
      "ユニフォーム診断・バット診断・グローブ診断・グローブ占い。すべて無料・登録不要。",
    type: "website",
  },
};

export default function ToolsPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "34px 0 26px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            FREE TOOLS
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            草野球の<span className="hl">無料ツール</span>一覧
          </h1>
          <p>
            道具えらびを助ける診断ツールと、ちょっとした遊びの占いをまとめました。
            すべて<strong>登録不要・無料</strong>。気になるものから試してみてください。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 40 }}>
        <AdSlot id="top-under-hero" />

        <div className="tools-grid">
          {TOOLS.map((t) => (
            <a key={t.href} className="tool-card" href={t.href}>
              <span className="tool-emoji">{t.emoji}</span>
              <span className="tool-badge">{t.badge}</span>
              <span className="tool-title">{t.title}</span>
              <span className="tool-desc">{t.desc}</span>
              <span className="tool-cta">{t.cta} →</span>
            </a>
          ))}
        </div>

        <section style={{ paddingTop: 10 }}>
          <h2 className="section-title">読みもので深掘りする</h2>
          <p className="section-sub">
            ツールで方向性が見えたら、選び方やお手入れの記事でさらに詳しく。
          </p>
          <div className="bat-links">
            <a className="cta-inline" href="/guide/glove-guide/">
              → 初めてのグローブの選び方
            </a>
            <a className="cta-inline" href="/guide/bat-guide/">
              → 軟式バットの選び方
            </a>
            <a className="cta-inline" href="/guide/">
              → お役立ちガイド一覧を見る
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
