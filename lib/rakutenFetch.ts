// 楽天APIの取得。ProductCards と EditorsPicks の両方がここを使う。
//
// ⚠️ ここを作った理由
//   1ページに一押し3枠＋一覧カードがあり、全部が同時にAPIを叩いていた。
//   楽天は短時間の連続リクエストを429で弾くので、本番のグローブページでは
//   「外野の一押し」だけが毎回落ちて、枠が黙って消えていた（3枠→2枠）。
//   カードが出ないのは報酬ゼロなので、間隔を空けて、失敗したら待って再試行する。

export const sleep = (ms: number) =>
  new Promise<void>((r) => setTimeout(r, ms));

/**
 * 失敗したら少し待って再試行する取得。
 * 429（叩きすぎ）とサーバ側の5xxだけ再試行し、それ以外は諦める
 * （キーワード不正などを何度投げても結果は変わらない）。
 */
export async function getJson(
  url: string,
  tries = 3
): Promise<unknown | null> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return await r.json();
      if (r.status !== 429 && r.status < 500) return null;
    } catch {
      /* 通信エラーは再試行する */
    }
    if (i < tries - 1) await sleep(500 * (i + 1) + Math.random() * 250);
  }
  return null;
}
