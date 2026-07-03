import type { Metadata } from "next";
import { SITE_URL } from "@/data/site";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "草野球お役立ちガイド一覧",
  description:
    "草野球チームの立ち上げ・運営に役立つ記事一覧。ユニフォームの作り方・費用相場、チーム名アイデア、背番号の決め方、チーム管理アプリの比較など。",
  alternates: { canonical: `${SITE_URL}/guide/` },
};

export default function GuideIndexPage() {
  return (
    <main className="container">
      <section>
        <h2 className="section-title">草野球お役立ちガイド</h2>
        <p className="section-sub">
          チームの立ち上げから運営まで、草野球ライフに役立つ記事を集めました。
        </p>
        <div className="goods-grid">
          {GUIDES.map((g) => (
            <a key={g.href} className="goods-card" href={g.href}>
              <span className="goods-emoji">{g.emoji}</span>
              <span>
                <span className="goods-label">{g.title}</span>
                <span className="goods-desc">{g.description}</span>
              </span>
              <span className="goods-arrow">→</span>
            </a>
          ))}
        </div>
        <a className="cta-inline" href="/#compare" style={{ marginTop: 28 }}>
          → ユニフォームメーカー13社の比較ランキングを見る
        </a>
      </section>
      <div style={{ height: 30 }} />
    </main>
  );
}
