// まわりの装備（アクセサリー・サポーター類）の診断データ。
// 「ケガ予防・暑さ寒さ・疲労回復・見た目」など気質から、優先して揃えたい
// 周辺ギアを提案する。海外ブランド（マクダビッド＝McDavid 等）も含む。
export type AccessoryKind = "support" | "under" | "care" | "style";

export type AccessoryItem = {
  kind: AccessoryKind;
  name: string; // 表示名
  makerHint: string; // 代表ブランド
  foreign: boolean;
  feature: string;
  keyword: string; // 楽天検索キーワード（アフィリ）
};

// 各気質に対応する周辺ギア（1問=1アイテム）
export const ACCESSORY_ITEMS: Record<AccessoryKind, AccessoryItem> = {
  support: {
    kind: "support",
    name: "サポーター（肘・膝・手首）",
    makerHint: "マクダビッド（McDavid）・ザムスト など",
    foreign: true,
    feature:
      "関節をしっかり固定・保護してケガのリスクを下げる。マクダビッド（McDavid）は海外の定番ブランドで、肘・膝・手首用が豊富。",
    keyword: "サポーター マクダビッド 肘 膝",
  },
  under: {
    kind: "under",
    name: "アンダーシャツ（冷感／保温）",
    makerHint: "ミズノ・SSK など",
    foreign: false,
    feature:
      "夏は冷感・吸汗速乾、冬は保温。コンディションを保ち、色を揃えればチーム感もアップ。",
    keyword: "野球 アンダーシャツ",
  },
  care: {
    kind: "care",
    name: "ボディケア用品（ネックレス等）",
    makerHint: "ファイテン（Phiten）など",
    foreign: false,
    feature:
      "試合後の疲れを翌日に残さないためのコンディショニング。多くのトップアスリートが愛用。",
    keyword: "ファイテン ネックレス",
  },
  style: {
    kind: "style",
    name: "小物（リストバンド・サングラス等）",
    makerHint: "各社",
    foreign: false,
    feature:
      "汗止め・眩しさ対策に加えて、気分とテンションを上げる小物。カラーでチームの統一感も。",
    keyword: "野球 リストバンド サングラス",
  },
};

// 4つの気質スコア（同意の強さ0〜3）から、優先度順に周辺ギアを並べる。
// v>0 のものだけを強い順に。ひとつも無ければ定番のアンダーシャツを提案。
export function recommendAccessories(scores: {
  support: number;
  under: number;
  care: number;
  style: number;
}): { top: AccessoryItem; list: AccessoryItem[] } {
  const ranked = (Object.keys(scores) as AccessoryKind[])
    .map((k) => ({ item: ACCESSORY_ITEMS[k], v: scores[k], r: Math.random() }))
    .sort((a, b) => b.v - a.v || b.r - a.r);
  const picked = ranked.filter((x) => x.v > 0).map((x) => x.item);
  if (picked.length === 0) {
    return { top: ACCESSORY_ITEMS.under, list: [ACCESSORY_ITEMS.under] };
  }
  return { top: picked[0], list: picked };
}
