// 楽天の商品をどう選ぶか。ProductCards と EditorsPicks の両方がここを使う。
//
// ⚠️ ここを分けた理由
//   並べ替えを ProductCards だけ直したとき、ページ最上部にある EditorsPicks が
//   sort:"standard" × hits:1 のまま取り残された。いちばん見られる枠が
//   いちばん安い商品を出していた。同じ取りこぼしを繰り返さないよう1か所にまとめる。

/** APIから受け取った商品のうち、選定に使う項目 */
export type ScoredItem = {
  price: number;
  /** 報酬率(%)。楽天は実測で一律4%だが、変わりうるので商品ごとに持つ */
  rate: number;
  reviews: number;
};

/**
 * どの商品を出すかの採点。
 *
 * ⚠️ 本番APIで実測して決めた。軟式グローブで比べた結果：
 *   - 既定の "standard"  … 無名ブランドの安物が上。1件あたりの報酬 約¥785
 *   - レビュー件数順だけ … Falcon・PROMARKが3枠を占めて同じく約¥785
 *   - 下の式           … 久保田スラッガー・ローリングスが並び 約¥1,445（1.84倍）
 *
 * 高額一辺倒にすると評価0件の商品が出て売れない。レビュー件数の対数を掛けて
 * 「そこそこ信頼されていて、かつ単価が高いもの」を選ぶ。
 */
export function revenueScore(i: ScoredItem): number {
  const fee = (i.price * i.rate) / 100;
  return fee * (1 + Math.log10(1 + i.reviews));
}

/**
 * キーワードから下限価格を推測する。
 *
 * ⚠️ 診断結果のカードは keyword を動的に組み立てているので、呼び出し側に
 *    minPrice を書く方式だと一番大事な場所（結果の直後）に効かない。
 *    カテゴリは keyword から分かるので、ここで既定値を持たせる。
 */
export function defaultMinPrice(keyword: string): number {
  const k = keyword;
  // 消耗品・小物は安くて当たり前なので下限を設けない
  if (/グリップテープ|補水|ドリンク|ゼリー|タブレット|タオル|ソックス|靴下|ボール|M号/.test(k)) return 0;
  if (/バッティンググローブ|バッテ|手袋/.test(k)) return 2500;
  if (/グローブ|グラブ|ミット/.test(k)) return 8000;
  if (/ビヨンド/.test(k)) return 20000;
  if (/カーボン/.test(k)) return 15000;
  if (/バット/.test(k)) return 8000;
  if (/スパイク|シューズ/.test(k)) return 5000;
  if (/サングラス/.test(k)) return 4000;
  if (/バッグ|バックパック|エナメル/.test(k)) return 3000;
  if (/アンダーシャツ/.test(k)) return 2000;
  if (/サポーター/.test(k)) return 1500;
  return 0;
}

/**
 * 除外キーワード。大人向けサイトなので少年用を外し、
 * 「軟式」を探しているページでは硬式・ソフトボール用も弾く
 * （期待報酬順にすると硬式グラブが混ざることを実測で確認した）。
 */
export function ngKeywordFor(keyword: string): string {
  return (
    "少年 ジュニア キッズ 小学生" +
    (keyword.includes("軟式") ? " 硬式 ソフトボール" : "")
  );
}
