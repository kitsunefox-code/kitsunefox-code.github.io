// バッティンググローブ（打撃用手袋）の選び方データ。診断・比較・ガイドで共用。
// 木製バット派・グリップ重視には輸入ブランド（フランクリン/EvoShield）が根強い人気。
// グリップ最優先層には「アメフト用レシーバーグローブ流用」という裏技も提示する。
export type BgloveStyle = "grip" | "fit" | "value" | "allround";

export type BgloveRec = {
  name: string; // 例: 「輸入・天然皮革（グリップ重視）」
  makerHint: string; // 代表ブランド
  foreign: boolean; // 海外ブランド軸か
  feature: string;
  reason: string;
  keyword: string; // 楽天検索キーワード
  hack?: string; // グリップ最優先層向けの裏技メモ（アメフトG流用）
  hackKeyword?: string; // 裏技の楽天検索キーワード
};

const REC = {
  grip: {
    name: "輸入・天然皮革（グリップ／木製派）",
    makerHint: "フランクリン・EvoShield など",
    foreign: true,
    feature: "MLB定番の輸入系。手のひらの食いつき・手なじみに優れ、木製バットの繊細な打感を活かせる。",
    reason: "グリップと打感を最優先するあなたには、輸入・天然皮革のモデルが好相性。",
    keyword: "バッティンググローブ フランクリン",
    hack: "とにかく滑りたくないなら“アメフト用レシーバーグローブ流用”という裏技も（自己責任・公式戦は用具規定を確認）。",
    hackKeyword: "アメフト グローブ Cutters グリップ",
  },
  fit: {
    name: "国内・天然皮革（フィット重視）",
    makerHint: "ミズノ・SSK など",
    foreign: false,
    feature: "手にぴったり吸いつくフィット感。品質のバランスが良く、日本人の手型に合わせやすい。",
    reason: "質感とジャストフィットにこだわるあなたには、国内の天然皮革モデルが安心。",
    keyword: "バッティンググローブ ミズノ 天然皮革",
  },
  value: {
    name: "国内・合皮（コスパ・消耗品）",
    makerHint: "ゼット・SSK など",
    foreign: false,
    feature: "手頃な価格で扱いやすく、消耗品として気軽に買い替えできる。実用十分。",
    reason: "コスパよく気軽に使い続けたいあなたには、合皮の実用モデルがぴったり。",
    keyword: "バッティンググローブ ゼット",
  },
  allround: {
    name: "国内・定番（オールラウンド）",
    makerHint: "ミズノ・ゼット・SSK など",
    foreign: false,
    feature: "フィット・グリップ・価格のバランスが良い定番。まず一双なら間違いのない選択。",
    reason: "こだわりが強すぎないあなたには、バランスの良い国内定番が扱いやすい。",
    keyword: "バッティンググローブ 野球",
  },
} satisfies Record<string, BgloveRec>;

export function recommendBglove(opts: {
  wood: boolean; // 木製バットを使う／使ってみたい
  grip: boolean; // とにかく滑らないグリップが欲しい
  value: boolean; // コスパ・消耗品として気軽に
  fit: boolean; // ぴったりフィットの質感にこだわる
}): BgloveRec {
  // 木製 or グリップ最優先 → 輸入・天然皮革（＋アメフトG裏技）
  if (opts.wood || opts.grip) return REC.grip;
  // フィット重視で、コスパ最優先ではない → 国内・天然皮革
  if (opts.fit && !opts.value) return REC.fit;
  // コスパ重視 → 合皮
  if (opts.value) return REC.value;
  return REC.allround;
}
