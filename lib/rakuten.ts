import https from "node:https";
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

// 新しい楽天市場 商品検索API（applicationId + accessKey 方式）
const ENDPOINT =
  "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260701";

/**
 * Node組み込みhttpsでGET-JSON。
 * fetch(undici)はForbidden header nameのため Referer を落とすので、
 * リファラ制限アプリに合わせて自前で Referer を送るためhttpsを使う。
 */
function getJson(url: string, referer: string): Promise<unknown> {
  return new Promise((resolve) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: "GET",
        headers: {
          Referer: referer,
          "User-Agent": "kusayakyu-navi/1.0 (+https://kusayakyu-navi.com)",
          Accept: "application/json",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          const ok = (res.statusCode || 0) >= 200 && (res.statusCode || 0) < 300;
          if (!ok) {
            console.warn(`[rakuten] HTTP ${res.statusCode} ${data.slice(0, 200)}`);
            return resolve(null);
          }
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(null);
          }
        });
      }
    );
    req.on("error", (e) => {
      console.warn("[rakuten] request failed", (e as Error).message);
      resolve(null);
    });
    req.end();
  });
}

/**
 * 楽天市場 商品検索APIをビルド時に呼び出す。
 * 認証情報が未設定・エラー時は空配列を返し、呼び出し側は検索リンクにフォールバック。
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

  const data = (await getJson(url, `${SITE_URL}/`)) as {
    Items?: { Item?: Record<string, unknown> }[];
  } | null;
  if (!data || !Array.isArray(data.Items)) return [];

  const items: RakutenItem[] = data.Items.map((wrap) => {
    const it = (wrap.Item || wrap) as Record<string, unknown>;
    const imgs = (it.mediumImageUrls || []) as
      | { imageUrl: string }[]
      | string[];
    const first = imgs[0] as { imageUrl?: string } | string | undefined;
    const raw = typeof first === "string" ? first : first?.imageUrl || "";
    return {
      name: String(it.itemName || ""),
      price: Number(it.itemPrice || 0),
      url: String(it.affiliateUrl || it.itemUrl || ""),
      image: raw.replace(/\?_ex=\d+x\d+$/, "?_ex=300x300"),
      shop: String(it.shopName || ""),
    };
  }).filter((i) => i.name && i.url && i.image);

  return items.slice(0, hits);
}
