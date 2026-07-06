import type { Metadata } from "next";
import { SITE_URL } from "@/data/site";
import { GUIDES, GUIDE_CATEGORIES } from "@/data/guides";

export const metadata: Metadata = {
  title: "草野球お役立ちガイド一覧｜始め方・道具えらび・お手入れ・技術まで",
  description:
    "草野球チームの立ち上げ・運営、道具の選び方とお手入れ、体のケア、打ち方や打順といった技術まで。草野球ライフに役立つ記事をカテゴリ別にまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/` },
};

export default function GuideIndexPage() {
  return (
    <main className="container">
      <section>
        <h2 className="section-title">草野球お役立ちガイド</h2>
        <p className="section-sub">
          チームの立ち上げから、道具えらび・お手入れ・技術まで。
          知りたいテーマから探せるよう、カテゴリ別にまとめました。
        </p>

        {GUIDE_CATEGORIES.map((cat) => {
          const items = GUIDES.filter((g) => g.category === cat.key);
          if (items.length === 0) return null;
          return (
            <div key={cat.key} className="guide-cat">
              <h3 className="guide-cat-head">
                {cat.label}
                <span className="guide-cat-sub">{cat.sub}</span>
              </h3>
              <div className="goods-grid">
                {items.map((g) => (
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
            </div>
          );
        })}

        <a className="cta-inline" href="/uniform/" style={{ marginTop: 28 }}>
          → ユニフォームメーカー13社の比較ランキングを見る
        </a>
      </section>
      <div style={{ height: 30 }} />
    </main>
  );
}
