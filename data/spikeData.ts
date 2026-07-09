// 野球スパイク（シューズ）の選び方データ。診断・比較・ガイドで共用。
// 草野球は「金具禁止」の球場も多いため、基本は樹脂ポイントを軸に整理する。
export type SpikeSole = "molded" | "metal";
export type SpikeCut = "low" | "mid";

export type SpikeRec = {
  name: string; // 例: 「樹脂ポイント・ローカット」
  sole: SpikeSole;
  cut: SpikeCut;
  feature: string; // 特徴
  reason: string; // なぜこの人に向くか
  caution?: string; // 注意（金具の可否など）
  keyword: string; // 楽天検索キーワード
};

const REC = {
  moldedLow: {
    name: "樹脂ポイント・ローカット",
    sole: "molded" as const,
    cut: "low" as const,
    feature: "軽量で一歩目が軽く、振り抜き・走塁・守備範囲を活かせる。多くの球場で使える万能ソール。",
    reason: "スピードと軽快さを最優先にするあなたには、軽いローカットの樹脂ポイントが好相性。",
    keyword: "野球 スパイク 樹脂 ポイント ローカット 一般",
  },
  moldedMid: {
    name: "樹脂ポイント・ミドルカット",
    sole: "molded" as const,
    cut: "mid" as const,
    feature: "足首まわりをやや高くホールドし、踏ん張り・切り返しで安定。捻挫が不安な人に安心。",
    reason: "足首の安定・ケガ予防を重視するあなたには、ホールド感のあるミドルカットが安心。",
    keyword: "野球 スパイク 樹脂 ポイント ミドルカット 一般",
  },
  moldedAllround: {
    name: "樹脂ポイント・オールラウンド",
    sole: "molded" as const,
    cut: "low" as const,
    feature: "土でも人工芝でも使いやすい定番の樹脂ポイント。1足で幅広い球場をこなせる。",
    reason: "いろいろな球場を1足で済ませたいあなたには、汎用性の高い樹脂ポイントが無難。",
    keyword: "野球 スパイク 樹脂 ポイント 一般",
  },
  metal: {
    name: "金具スパイク（食いつき重視）",
    sole: "metal" as const,
    cut: "low" as const,
    feature: "土のグラウンドへの食いつき・グリップが最も強く、踏ん張りとダッシュのキレが出る。",
    reason: "土での止まり・蹴り出しの食いつきを最優先にするあなたには金具が最適。",
    caution: "※ 草野球場は金具禁止のことが多いので、必ず所属リーグ・球場の規定を確認してください。",
    keyword: "野球 スパイク 金具 一般",
  },
} satisfies Record<string, SpikeRec>;

// 診断の傾向（各True/強さ）から1足を選ぶ
export function recommendSpike(opts: {
  speed: boolean; // 軽さ・一歩目・スピード重視
  ankle: boolean; // 足首の安定・ケガ予防重視
  grip: boolean; // 土での食いつき最優先（金具寄り）
  versatile: boolean; // いろんな球場を1足で
}): SpikeRec {
  // 食いつき最優先で、かつ1足万能を求めていない → 金具（規定確認つき）
  if (opts.grip && !opts.versatile) return REC.metal;
  // 足首の安定を強く求める → ミドルカット
  if (opts.ankle && !opts.speed) return REC.moldedMid;
  // スピード重視 → ローカット
  if (opts.speed) return REC.moldedLow;
  // それ以外・万能志向 → オールラウンド
  return REC.moldedAllround;
}
