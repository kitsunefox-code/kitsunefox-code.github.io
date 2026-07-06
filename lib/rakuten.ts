import { RAKUTEN_APP_ID, RAKUTEN_AFFILIATE_ID } from "@/data/site";

export type RakutenItem = {
  name: string;
  price: number;
  url: string;
  image: string;
  shop: string;
};

/**
 * 楽天市場 商品検索API（IchibaItem/Search）をビルド時に呼び出す。
 * アプリIDが未設定なら空配列を返し、呼び出し側は検索リンクにフォールバックする。
 * 静的書き出し(output: export)のビルド中に実行され、結果はHTMLに焼き込まれる。
 */
export async function fetchRakutenItems(
  keyword: string,
  hits = 4
): Promise<RakutenItem[]> {
  if (!RAKUTEN_APP_ID) return [];
  const params = new URLSearchParams({
    applicationId: RAKUTEN_APP_ID,
    keyword,
    hits: String(hits),
    imageFlag: "1",
    sort: "standard",
    // レビュー件数の多い定番を優先しやすくする
    minReviewNum: "5",
  });
  if (RAKUTEN_AFFILIATE_ID) params.set("affiliateId", RAKUTEN_AFFILIATE_ID);
  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${params.toString()}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    const items: RakutenItem[] = (data.Items || [])
      .map((wrap: { Item?: Record<string, unknown> }) => {
        const it = (wrap.Item || wrap) as Record<string, unknown>;
        const imgs = (it.mediumImageUrls || []) as { imageUrl: string }[];
        const raw = imgs[0]?.imageUrl || "";
        return {
          name: String(it.itemName || ""),
          price: Number(it.itemPrice || 0),
          url: String(it.affiliateUrl || it.itemUrl || ""),
          // サムネイルの縮小パラメータを外して少し大きめの画像に
          image: raw.replace(/\?_ex=\d+x\d+$/, "?_ex=300x300"),
          shop: String(it.shopName || ""),
        };
      })
      .filter((i: RakutenItem) => i.name && i.url && i.image);
    return items.slice(0, hits);
  } catch {
    return [];
  }
}
