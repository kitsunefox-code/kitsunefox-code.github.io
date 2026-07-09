import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/data/site";
import { COMPARES } from "@/data/compare";

export const metadata: Metadata = {
  title: "草野球の道具・ユニフォーム比較まとめ｜バット・グローブ・スパイク・バッティンググローブ",
  description:
    "草野球の道具とユニフォームの比較をまとめました。オーダーユニフォームのメーカー比較、軟式バット・グローブ・スパイク・バッティンググローブの比較まで。ブランド・価格・特徴で見比べて、あなたに合う一品が見つかります。",
  alternates: { canonical: `${SITE_URL}/hikaku/` },
  openGraph: {
    title: "草野球の道具・ユニフォーム比較まとめ",
    description:
      "ユニフォーム・バット・グローブ・スパイク・バッティンググローブを比較。ブランド・価格・特徴で。",
    type: "website",
  },
};

export default function HikakuHubPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "56px 0 46px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Compare
          </p>
          <h1>
            道具・ユニフォーム<span className="hl">比較</span>まとめ
          </h1>
          <p>
            ユニフォームから、バット・グローブ・スパイク・バッティンググローブまで。
            ブランド・価格・特徴で見比べて、あなたに合う一品を。
          </p>
        </div>
      </div>

      <div className="container">
        <AdSlot id="top-under-hero" />
        <section>
          <h2 className="section-title">比較コンテンツ一覧</h2>
          <p className="section-sub">
            知りたいカテゴリを選んでください。各ページで楽天の実売れ筋も表示します。
          </p>
          <div className="pillar-grid">
            {COMPARES.map((c) => (
              <a key={c.href} className="pillar-card" href={c.href}>
                <span className="pillar-kicker">{c.kicker}</span>
                <span className="pillar-title">{c.title}</span>
                <span className="pillar-desc">{c.desc}</span>
                <span className="pillar-arrow">比較を見る →</span>
              </a>
            ))}
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <h2 className="section-title">診断で選ぶのもおすすめ</h2>
          <p className="section-sub">
            数問答えるだけで、あなたに合う道具がその場でわかります。
          </p>
          <div className="bat-links">
            <a className="cta-inline" href="/baseball-dock/">→ 性格から道具まで「野球人間ドック」でフル診断する</a>
            <a className="cta-inline" href="/shindan/">
              → 写真でわかるユニフォーム診断
            </a>
          </div>
        </section>
        <div style={{ height: 20 }} />
      </div>
    </main>
  );
}
