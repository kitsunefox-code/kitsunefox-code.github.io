// 軟式バットの素材・代表モデル系統データ。診断・比較で共用。
// ※ 具体的な最新モデルは毎年更新されるため、ここでは「モデル系統（シリーズ）」
//    として整理し、キーワードで楽天の現行商品につなぐ。
export type BatMaterial = "metal" | "carbon" | "beyond";

export const BAT_MATERIAL_INFO: Record<
  BatMaterial,
  { label: string; feature: string; price: string; keyword: string }
> = {
  metal: {
    label: "金属（超々ジュラルミン等）",
    feature: "丈夫で扱いやすく低価格。反発は標準。最初の一本や練習用に最適。",
    price: "5,000〜10,000円",
    keyword: "軟式 バット 金属 一般",
  },
  carbon: {
    label: "カーボン・複合",
    feature: "軽くて反発も良好。振り抜きやすく、飛びとのバランスに優れる。",
    price: "10,000〜25,000円",
    keyword: "軟式 バット カーボン 一般",
  },
  beyond: {
    label: "ウレタン複合（ビヨンド系）",
    feature: "先端の柔らかいウレタンが軟球をつかんで飛ばす。反発・飛距離は最上位クラス。",
    price: "20,000〜40,000円",
    keyword: "軟式 バット ビヨンドマックス 一般",
  },
};

export type BatModel = {
  name: string;
  maker: string;
  material: BatMaterial;
  note: string;
  keyword: string;
};

// 代表的なモデル系統（“最新も含む”現行シリーズ）
export const BAT_MODELS: BatModel[] = [
  {
    name: "ビヨンドマックス レガシー",
    maker: "ミズノ",
    material: "beyond",
    note: "ウレタン複合の最上位クラス。飛距離を最優先するなら筆頭候補。",
    keyword: "軟式 バット ビヨンドマックス レガシー 一般",
  },
  {
    name: "ビヨンドマックス ギガキング",
    maker: "ミズノ",
    material: "beyond",
    note: "高反発で長く人気の定番シリーズ。飛距離とバランスの良さ。",
    keyword: "軟式 バット ビヨンドマックス ギガキング 一般",
  },
  {
    name: "MM／ハンターマックス",
    maker: "SSK",
    material: "beyond",
    note: "反発の高いウレタン複合。モデルが豊富で選びやすい。",
    keyword: "軟式 バット SSK MM 一般",
  },
  {
    name: "カタリスト",
    maker: "ルイスビルスラッガー",
    material: "carbon",
    note: "カーボンの人気シリーズ。軽量で振り抜きやすく、飛びも良い。",
    keyword: "軟式 バット カタリスト 一般",
  },
  {
    name: "ハイパーマッハ",
    maker: "ローリングス",
    material: "carbon",
    note: "軽量・高反発のカーボン系。スイングスピードを活かしたい人に。",
    keyword: "軟式 バット ローリングス ハイパーマッハ 一般",
  },
  {
    name: "ブラックキャノン",
    maker: "ゼット",
    material: "carbon",
    note: "カーボン系の人気シリーズ。コスパにも優れる。",
    keyword: "軟式 バット ゼット ブラックキャノン 一般",
  },
  {
    name: "金属バット（各社）",
    maker: "ミズノ／ゼット等",
    material: "metal",
    note: "扱いやすく丈夫。最初の一本・練習用・規定で複合が使えない時に。",
    keyword: "軟式 バット 金属 一般",
  },
];

// 素材＋好み（最新志向・パワー）から代表モデルを1つ選ぶ
export function pickBatModel(
  material: BatMaterial,
  opts: { latest: boolean; power: boolean }
): BatModel {
  const of = (name: string) => BAT_MODELS.find((m) => m.name === name)!;
  if (material === "beyond") {
    // 最新志向×パワー → レガシー、そうでなければ定番ギガキング、SSK好みも定番
    return opts.latest && opts.power
      ? of("ビヨンドマックス レガシー")
      : of("ビヨンドマックス ギガキング");
  }
  if (material === "carbon") {
    // パワーで振り切る → カタリスト、軽さ/スピード → ハイパーマッハ
    return opts.power ? of("カタリスト") : of("ハイパーマッハ");
  }
  return of("金属バット（各社）");
}
