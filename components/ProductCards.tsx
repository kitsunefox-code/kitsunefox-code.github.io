import { fetchRakutenItems } from "@/lib/rakuten";
import AffiliateBox from "@/components/AffiliateBox";

/**
 * 楽天商品検索APIから取得した「実商品カード」を表示する。
 * アプリID未設定・取得0件のときは、従来の検索リンク（AffiliateBox）に自動フォールバック。
 * 非同期のサーバーコンポーネント（ビルド時にAPIを叩いてHTMLに焼き込む）。
 */
export default async function ProductCards({
  keyword,
  heading = "🛒 楽天で人気の商品",
  hits = 4,
  fallbackRakuten = [],
}: {
  keyword: string;
  heading?: string;
  hits?: number;
  /** フォールバック時に AffiliateBox へ渡す RAKUTEN キー（例: ["glove"]） */
  fallbackRakuten?: string[];
}) {
  const items = await fetchRakutenItems(keyword, hits);

  if (items.length === 0) {
    return (
      <AffiliateBox heading={heading} rakuten={fallbackRakuten} retailers />
    );
  }

  const yen = (n: number) => "¥" + n.toLocaleString("ja-JP");

  return (
    <div className="prod-box">
      <p className="aff-heading">{heading}</p>
      <div className="prod-grid">
        {items.map((it) => (
          <a
            key={it.url}
            className="prod-card"
            href={it.url}
            target="_blank"
            rel="noopener sponsored nofollow"
          >
            <span className="prod-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.image} alt={it.name} loading="lazy" />
            </span>
            <span className="prod-name">{it.name}</span>
            <span className="prod-meta">
              <span className="prod-price">{yen(it.price)}</span>
              <span className="prod-shop">{it.shop}</span>
            </span>
            <span className="prod-btn">楽天で見る →</span>
          </a>
        ))}
      </div>
      <p className="aff-note">
        ※ 楽天市場の商品を自動表示（広告）。価格・在庫は変動します。
      </p>
    </div>
  );
}
