import { RAKUTEN_AFFILIATE_ID, RAKUTEN_APP_ID, SITE_URL } from "@/data/site";

export type RakutenItem = {
  name: string;
  price: number;
  url: string;
  image: string;
  shop: string;
};

// アクセスキーはシークレット。公開リポジトリに置かず、ビルド時の環境変数から読む。
const ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY || "";

// 新しい楽天市場 商品検索API（アクセスキー方式）
const ENDPOINT =
  "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260701";

/**
 * 楽天市場 商品検索APIをビルド時に呼び出す。
 * アクセスキー未設定・エラー時は空配列を返し、呼び出し側は検索リンクにフォールバック。
 * formatVersion=1 のため、レスポンスは従来どおり Items[].Item の配列形式。
 */
export async function fetchRakutenItems(
  keyword: string,
  hits = 4
): Promise<RakutenItem[]> {
  if (!ACCESS_KEY || !RAKUTEN_APP_ID) return [];
  const params = new URLSearchParams({
    applicationId: RAKUTEN_APP_ID,
    accessKey: ACCESS_KEY,
    keyword,
    hits: String(hits),
    imageFlag: "1",
    sort: "standard",
    formatVersion: "1",
  });
  if (RAKUTEN_AFFILIATE_ID) params.set("affiliateId", RAKUTEN_AFFILIATE_ID);
  const url = `${ENDPOINT}?${params.toString()}`;
  try {
    // アプリをリファラ制限で登録しているため、サーバー取得でも Referer を明示。
    const res = await fetch(url, {
      headers: { Referer: `${SITE_URL}/` },
    });
    if (!res.ok) {
      // 原因調査用（アクセスキー本体は出力しない）
      const body = await res.text().catch(() => "");
      console.warn(
        `[rakuten] ${keyword}: HTTP ${res.status} ${body.slice(0, 200)}`
      );
      return [];
    }
    const data = await res.json();
    const items: RakutenItem[] = (data.Items || [])
      .map((wrap: { Item?: Record<string, unknown> }) => {
        const it = (wrap.Item || wrap) as Record<string, unknown>;
        const imgs = (it.mediumImageUrls || []) as
          | { imageUrl: string }[]
          | string[];
        const first = imgs[0] as { imageUrl?: string } | string | undefined;
        const raw =
          typeof first === "string" ? first : first?.imageUrl || "";
        return {
          name: String(it.itemName || ""),
          price: Number(it.itemPrice || 0),
          url: String(it.affiliateUrl || it.itemUrl || ""),
          image: raw.replace(/\?_ex=\d+x\d+$/, "?_ex=300x300"),
          shop: String(it.shopName || ""),
        };
      })
      .filter((i: RakutenItem) => i.name && i.url && i.image);
    return items.slice(0, hits);
  } catch (e) {
    console.warn(`[rakuten] ${keyword}: fetch failed`, (e as Error).message);
    return [];
  }
}
