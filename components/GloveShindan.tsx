"use client";

import YesNoShindan, {
  type YNQuestion,
  type YNResult,
} from "@/components/YesNoShindan";
import { recommendWeb } from "@/data/gloveData";

const QUESTIONS: YNQuestion[] = [
  { id: "pitcher", text: "投手（ピッチャー）で使うグローブがほしい" },
  { id: "catcher", text: "キャッチャー用（ミット）がほしい" },
  { id: "first", text: "ファースト（一塁手）用（ミット）がほしい" },
  { id: "outfield", text: "主に外野を守る（守りたい）" },
  {
    id: "quick",
    text: "内野で“握り替えの速さ・操作性”を重視したい",
    sub: "二塁・遊撃で軽快にさばきたいなら「はい」。",
  },
  { id: "solid", text: "打球は軽快さより“しっかり受け止めたい”" },
  { id: "handSmall", text: "手は小さめだ（女性・細身など）" },
  { id: "budgetHigh", text: "予算はしっかりかけたい（1.5万円以上）" },
  { id: "beginner", text: "初心者・ブランクがある" },
];

type Pos = "pitcher" | "infield" | "outfield" | "catcher" | "first" | "allround";

const POS_TYPE: Record<Pos, { name: string; emoji: string; keyword: string }> = {
  pitcher: { name: "投手用グローブ", emoji: "⚾", keyword: "軟式 グローブ 投手用" },
  infield: { name: "内野手用グローブ", emoji: "🧤", keyword: "軟式 グローブ 内野手用" },
  outfield: { name: "外野手用グローブ", emoji: "🌾", keyword: "軟式 グローブ 外野手用" },
  catcher: { name: "キャッチャーミット", emoji: "🎯", keyword: "軟式 キャッチャーミット" },
  first: { name: "ファーストミット", emoji: "🥇", keyword: "軟式 ファーストミット" },
  allround: { name: "オールラウンド用グローブ", emoji: "🔄", keyword: "軟式 グローブ オールラウンド" },
};

function diagnose(a: Record<string, boolean>): YNResult {
  // --- ポジション（優先順で確定） ---
  let pos: Pos;
  if (a.pitcher) pos = "pitcher";
  else if (a.catcher) pos = "catcher";
  else if (a.first) pos = "first";
  else if (a.outfield) pos = "outfield";
  else if (a.quick) pos = "infield";
  else pos = "allround";
  const base = POS_TYPE[pos];

  // --- 捕球スタイル → ウェブ ---
  const style = a.solid ? "solid" : a.quick ? "quick" : "auto";
  const { web, reason } = recommendWeb(pos, style);

  // --- サイズ ---
  const size =
    pos === "catcher" || pos === "first"
      ? "専用ミット。すくいやすさ・捕球音の決まりやすさを重視"
      : a.handSmall
        ? "ジャストサイズ〜やや小さめ（手が小さいなら1サイズ下げると扱いやすい）"
        : "ジャストサイズが基本。指先に余りが出ないものを";

  // --- 素材・予算 ---
  const material = a.budgetHigh
    ? "ステアハイド／キップ等の上質な天然皮革"
    : a.beginner
      ? "扱いやすい合皮〜エントリー革（手入れがラク・軽い）"
      : "標準的な天然皮革（バランス型）";
  const price = a.budgetHigh
    ? "20,000〜40,000円（革質・ブランドにこだわるクラス）"
    : a.beginner
      ? "6,000〜12,000円（最初の一枚に十分）"
      : "13,000〜20,000円";

  // --- タイプ名 ---
  const typeName = base.name;
  const typeEmoji = base.emoji;

  // --- アドバイス ---
  let advice: string;
  if (pos === "pitcher")
    advice = "投手は握りを隠せる閉じたウェブが基本。軽くて構えやすいモデルが投球に集中させてくれます。";
  else if (pos === "catcher")
    advice = "捕手は消耗が激しいポジション。丈夫さと、捕球音が鳴る“ポケットの決まりやすさ”を重視すると長く戦えます。";
  else if (pos === "first")
    advice = "一塁は捕球回数が多い。すくいやすさ重視で、少し大きめのミットが安心です。";
  else if (pos === "infield")
    advice = "内野は“持ち替えの速さ”が命。大きすぎない、浅めポケットのモデルが守備を安定させます。";
  else if (pos === "outfield")
    advice = "外野はリーチと捕球面積が武器。大きめ・深めで、フライを安心して掴める一枚を。";
  else
    advice = "ポジション未定なら、内野〜外野を無難にこなすオールラウンド用が安心。まず1つ持ち、専門化はあとからでOK。";
  if (a.beginner)
    advice += " 初心者は高級品より“扱いやすく手入れがラクな一枚”がおすすめです。";

  return {
    typeName,
    typeEmoji,
    specs: [
      { k: "サイズ・型", v: size },
      { k: "おすすめ素材", v: material },
      {
        k: "おすすめウェブ",
        v: (
          <>
            <b>{web.name}</b>（{web.positions}）｜{web.feature}
          </>
        ),
      },
      { k: "予算の目安", v: price },
    ],
    advice,
    extraNote: (
      `ウェブは「${web.name}」がおすすめ：${reason}`
    ),
    productKeyword: base.keyword,
    productHeading: `🧤 診断結果に合う「${base.name}」`,
    productFallback: ["glove"],
    links: [
      { href: "/glove/", label: "「グローブ比較」でブランド・ウェブを見比べる" },
      { href: "/guide/glove-guide/", label: "じっくり読む「初めてのグローブの選び方」" },
      { href: "/guide/glove-care/", label: "買ったあとに「お手入れ・型付け」" },
    ],
  };
}

export default function GloveShindan() {
  return (
    <YesNoShindan
      questions={QUESTIONS}
      diagnose={diagnose}
      resultTitle="あなたにおすすめのグローブ"
      scrollId="glove-result"
    />
  );
}
