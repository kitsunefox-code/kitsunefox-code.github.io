// 楽天の商品をどう選ぶか。ProductCards と EditorsPicks の両方がここを使う。
//
// ⚠️ ここを分けた理由
//   並べ替えを ProductCards だけ直したとき、ページ最上部にある EditorsPicks が
//   sort:"standard" × hits:1 のまま取り残された。いちばん見られる枠が
//   いちばん安い商品を出していた。同じ取りこぼしを繰り返さないよう1か所にまとめる。

/** APIから受け取った商品のうち、選定に使う項目 */
export type ScoredItem = {
  name: string;
  price: number;
  /** 報酬率(%)。楽天は実測で一律4%だが、変わりうるので商品ごとに持つ */
  rate: number;
  reviews: number;
  /** レビュー平均(0〜5)。レビュー0件なら0 */
  rating: number;
};

/** 1件売れたときの報酬。並べ替えの基準はこれだけ。 */
export function expectedFee(i: Pick<ScoredItem, "price" | "rate">): number {
  return (i.price * i.rate) / 100;
}

/**
 * 「クリックしても買えない商品」を弾く。
 *
 * ⚠️ 2026-11-05に本番APIで全枠を点検して入れた。入れる前は次を出していた：
 *   - バットの一押し … 【予約商品】2027年2月中旬以降発送予定（4か月先）
 *   - グローブ一押し … 久保田スラッガーの「スワロー限定オーダー」（受注生産）
 *   クリックされても買えないカードは、質がゼロどころかマイナス。
 *
 * 「型付け無料」「刺繍加工無料」は無料オプションで今すぐ買えるので弾かない。
 */
const NG_NAME =
  /予約|受注|取り寄せ|入荷待ち|オーダー|刻印|名入れ|特注|中古|USED|訳あり|福袋|詰め合わせ/;

export function isBuyable(name: string): boolean {
  return !NG_NAME.test(name);
}

/**
 * 商品名の先頭に付く広告文を削る。
 * 楽天の商品名は「【交換往復送料無料】【本日限定!P2倍&最大1500円OFF】野球 バット…」の
 * ように始まることが多く、カードの1〜2行では商品が何なのか分からなくなる。
 */
const PROMO =
  /ポイント\s*\d+\s*倍|P\s*\d+\s*倍|エントリー|送料無料|クーポン|タイムセール|SALE|OFF|還元|最大\d|買いまわり|スーパーDEAL|期間限定|即日発送|あす楽|翌日/i;

export function cleanName(name: string): string {
  let s = name;
  for (let i = 0; i < 8; i++) {
    // ① 【…】[…]（…）で囲まれた前置き
    let next = s.replace(/^\s*[【[(（][^】\])）]{0,40}[】\])）]\s*/, "");
    // ② 囲みが無い宣伝文（「全品ポイント10倍は11/11まで ★商品名…」のような
    //    ★や◆で区切るだけのもの）。宣伝語を含むときだけ削る。
    if (next === s) {
      // 「…まで ★商品名」と「◆エントリーで…◆商品名」の両方に対応する
      const m =
        s.match(/^[★◆]([^★◆]{1,60})[★◆]\s*/) ||
        s.match(/^([^★◆]{1,60})[★◆]\s*/);
      if (m && PROMO.test(m[1]) && s.slice(m[0].length).trim().length >= 10) {
        next = s.slice(m[0].length);
      }
    }
    if (next === s) break;
    s = next;
  }
  // 商品名の末尾に残る飾りの★も落とす
  s = s.replace(/[★◆]+\s*$/, "");
  return s.replace(/\s+/g, " ").trim() || name;
}

/**
 * レビューの足切り。厳しい順に試して、枠を埋められる一番厳しい条件を採る。
 *
 * ⚠️ 以前は fee × (1 + log10(1+レビュー数)) の一本の式で選んでいた。
 *    レビュー0件なら倍率1.0、85件でも2.93倍しかならないので価格が支配し、
 *    「レビュー0件の¥47,300のミズノプロ」が外野の一押しに出ていた。
 *    質（買ってよい商品か）と収益（単価）は別の軸なので、
 *    足切りで質を担保してから単価で並べる二段構えにした。
 */
const TIERS: readonly (readonly [number, number])[] = [
  [10, 4.2],
  [5, 4.0],
  [3, 4.0],
  [1, 3.5],
  [0, 0],
];

export function qualified<T extends ScoredItem>(
  items: T[],
  want: number
): { items: T[]; tier: string; strict: boolean } {
  const buyable = items.filter((i) => isBuyable(i.name));
  for (let t = 0; t < TIERS.length; t++) {
    const [minReviews, minRating] = TIERS[t];
    const hit = buyable.filter(
      (i) => i.reviews >= minReviews && i.rating >= minRating
    );
    if (hit.length >= want) {
      return {
        items: hit,
        tier: `rev>=${minReviews},avg>=${minRating}`,
        strict: t === 0,
      };
    }
  }
  // 買える商品が枠数に足りないときだけ、買えるもの全部→それも無ければ元の一覧
  return buyable.length
    ? { items: buyable, tier: "買えるものだけ", strict: false }
    : { items, tier: "無条件", strict: false };
}

/**
 * 上限価格。付けないと単価順の並べ替えが category を踏み越える。
 *
 * ⚠️ グリップテープの枠が「中学硬式金属バット ¥22,880」を3枚出していた（実測）。
 *    keyword に「バット」が入っているので楽天がバット本体を拾い、
 *    単価が高いので上位を独占する。小物の枠には上限を置く。
 *    一方で軟式M号球は10ダース¥61,600が正しい（チームでまとめ買いする品目）ので、
 *    消耗品だからと一律に上限を置くのは誤り。誤マッチが実測で出た品目だけに絞る。
 */
export function defaultMaxPrice(keyword: string): number | undefined {
  if (/グリップテープ|エンドテープ|滑り止め/.test(keyword)) return 3000;
  return undefined;
}

/**
 * 同じ商品の容量違いがカードを埋めるのを防ぐ。
 *
 * ⚠️ ゼリー飲料の枠が、同一商品名の ¥17,950 / ¥12,450 / ¥12,250（容量違い）で
 *    3枠を占めていた。読者にとって選択肢になっていない。
 */
export function dedupeSimilar<T extends { name: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const i of items) {
    const key = cleanName(i.name).replace(/\s+/g, "").slice(0, 24);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(i);
  }
  return out;
}

/** 同じブランドがカードを占領しないよう上限を設ける（選択肢にならないため） */
const BRANDS = [
  "久保田スラッガー",
  "ミズノプロ",
  "ミズノ",
  "MIZUNO",
  "エスエスケイ",
  "SSK",
  "ゼット",
  "ZETT",
  "ローリングス",
  "Rawlings",
  "アシックス",
  "asics",
  "ハタケヤマ",
  "ドナイヤ",
  "アトムズ",
  "フランクリン",
  "Franklin",
  "アディダス",
  "adidas",
  "PROMARK",
  "プロマーク",
  "Falcon",
  "ディマリニ",
  "ウイルソン",
  "Wilson",
];

function brandOf(name: string): string {
  return BRANDS.find((b) => name.includes(b)) || "";
}

export function capBrand<T extends { name: string }>(
  items: T[],
  limit = 2
): T[] {
  const count = new Map<string, number>();
  const out: T[] = [];
  for (const i of items) {
    const b = brandOf(i.name);
    if (b) {
      const n = count.get(b) || 0;
      if (n >= limit) continue;
      count.set(b, n + 1);
    }
    out.push(i);
  }
  return out;
}

/**
 * 複数枠の選定。単価が高い順に埋めるが、最後の1枠は必ず安い層から選ぶ。
 *
 * ⚠️ 単価順だけで4枠を埋めると、グローブは4枚すべて¥32,000以上になっていた。
 *    楽天アフィリの実績は30日でクリック37・野球用品の購入0件。
 *    高額品だけ並べて売れていないので、価格帯に幅を持たせる。
 *    安い枠は「下位1/3のうち最もレビューが多いもの」＝実際に買われている定番を選ぶ
 *    （バッティンググローブではレビュー533件・¥2,992のミズノが入る）。
 */
export function pickSpread<T extends ScoredItem>(cands: T[], want: number): T[] {
  const sorted = dedupeSimilar(
    [...cands].sort((a, b) => expectedFee(b) - expectedFee(a))
  );
  // ⚠️ ブランド上限は「ビヨンドマックス」のような1ブランド専用のキーワードでは
  //    枠を削ってしまう（本番で4枠が3枚になっていた）。
  //    上限をかけて枠が埋まらないなら、上限なしに戻す。
  const capped = capBrand(sorted);
  const byFee = capped.length >= want ? capped : sorted;
  if (want <= 1) return byFee.slice(0, want);

  const top = byFee.slice(0, want - 1);
  // 安い枠も重複排除後から選ぶ（上位と同じ商品の小容量版を出さないため）
  const rest = sorted.filter((c) => !top.includes(c));
  if (!rest.length) return byFee.slice(0, want);

  const cheap = [...rest].sort((a, b) => a.price - b.price);
  const third = cheap.slice(0, Math.max(1, Math.floor(cheap.length / 3)));
  const entry = third.reduce((best, i) =>
    i.reviews > best.reviews ||
    (i.reviews === best.reviews && i.rating > best.rating)
      ? i
      : best
  );
  return [...top, entry];
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
  // ⚠️ アメフト用グローブ（グリップ目的の流用）は¥5,000前後。
  //    下の「グローブ」で野球グラブ扱いして下限¥8,000をかけると候補が消え、
  //    本番で一押しの「裏技：グリップ最強」枠が丸ごと出ていなかった。
  if (/アメフト|フットボール|レシーバー|Cutters/i.test(k)) return 2000;
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
