import { GOODS_LINKS } from "@/data/site";

/**
 * 関連グッズのアフィリエイトリンク集。
 * data/site.ts の GOODS_LINKS が空の間は何も表示しません。
 */
export default function GoodsLinks() {
  if (GOODS_LINKS.length === 0) return null;
  return (
    <section id="goods">
      <h2 className="section-title">あわせて揃えたい野球グッズ</h2>
      <p className="section-sub">
        ユニフォームと一緒に準備しておくと便利なアイテムです。
      </p>
      <div className="goods-grid">
        {GOODS_LINKS.map((g) => (
          <a
            key={g.label}
            className="goods-card"
            href={g.url}
            target="_blank"
            rel="noopener sponsored"
          >
            <span className="goods-emoji">{g.emoji}</span>
            <span>
              <span className="goods-label">{g.label}</span>
              <span className="goods-desc">{g.description}</span>
            </span>
            <span className="goods-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
