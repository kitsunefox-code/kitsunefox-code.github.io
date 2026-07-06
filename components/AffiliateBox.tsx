import { RAKUTEN, RETAILERS, PHITEN, type ProductLink } from "@/data/site";

type RetailerItem = { label: string; desc: string; href: string; pixel?: string; emoji: string };
type Item = ProductLink | RetailerItem;

/**
 * 記事内に差し込むアフィリエイトCTA。
 * - rakuten: RAKUTEN のキー配列（例: ["glove","bat"]）を渡すと楽天検索リンクを表示
 * - retailers: true なら総合スポーツ通販（ゼビオ・アルペン）も表示
 * - phiten: true ならファイテン公式（体のケア・疲労回復）を表示
 * すべて rel="sponsored nofollow" 付き。
 */
export default function AffiliateBox({
  heading = "🛒 このアイテムを探す",
  rakuten = [],
  retailers = false,
  phiten = false,
}: {
  heading?: string;
  rakuten?: string[];
  retailers?: boolean;
  phiten?: boolean;
}) {
  const items: Item[] = [
    ...rakuten.map((k) => RAKUTEN[k]).filter(Boolean),
    ...(phiten ? PHITEN : []),
    ...(retailers ? RETAILERS : []),
  ];
  if (items.length === 0) return null;
  return (
    <div className="aff-box">
      <p className="aff-heading">{heading}</p>
      <div className="aff-grid">
        {items.map((it) => {
          const pixel = "pixel" in it ? it.pixel : undefined;
          return (
            <span key={it.label}>
              <a
                className="aff-card"
                href={it.href}
                target="_blank"
                rel="noopener sponsored nofollow"
              >
                <span className="aff-emoji">{it.emoji}</span>
                <span className="aff-text">
                  <span className="aff-label">{it.label}</span>
                  <span className="aff-desc">{it.desc}</span>
                </span>
                <span className="aff-arrow">見る →</span>
              </a>
              {pixel && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pixel} width={1} height={1} alt="" style={{ border: 0 }} />
              )}
            </span>
          );
        })}
      </div>
      <p className="aff-note">
        ※ 上記は広告リンクです。価格・在庫は各ストアでご確認ください。
      </p>
    </div>
  );
}
