"use client";

import YesNoShindan, {
  type YNQuestion,
  type YNResult,
} from "@/components/YesNoShindan";

const QUESTIONS: YNQuestion[] = [
  { id: "wood", text: "木製バットがメインだ" },
  { id: "gripMax", text: "グリップ力（滑らない）を最優先したい" },
  { id: "leather", text: "天然皮革（手になじむ）がいい" },
  { id: "durable", text: "耐久性・長く使えることを重視したい" },
  { id: "budgetHigh", text: "予算はしっかりかけたい（4,000円以上）" },
  { id: "handSmall", text: "手は小さめだ" },
  {
    id: "hack",
    text: "グリップ最強なら“裏技”も試したい",
    sub: "アメフト用グローブを打撃に流用する裏技（自己責任・規定確認）を提案します。",
  },
];

function diagnose(a: Record<string, boolean>): YNResult {
  // --- 素材 ---
  const material =
    a.leather || a.durable || a.budgetHigh ? "leather" : "synthetic";
  const materialLabel =
    material === "leather"
      ? "天然皮革（シープスキン等・手になじむ）"
      : "合皮（軽くて手入れがラク）";

  // --- ブランド傾向 ---
  let brandLabel: string, keyword: string;
  if (a.gripMax && (a.wood || a.budgetHigh)) {
    brandLabel = "輸入ブランド（フランクリン／EvoShield など）";
    keyword = "バッティンググローブ フランクリン";
  } else if (a.budgetHigh) {
    brandLabel = "国内定番（ミズノ／SSK など）";
    keyword = "バッティンググローブ ミズノ";
  } else {
    brandLabel = "コスパ重視（ゼット など）";
    keyword = "バッティンググローブ ゼット";
  }

  // --- サイズ・グリップ・予算 ---
  const size = a.handSmall
    ? "ジャストサイズ〜やや小さめ。指先が余らないものを"
    : "ジャストサイズが基本。指先に余りが出ないものを";
  const gripStrong = a.gripMax || a.wood || keyword.includes("フランクリン");
  const gripLevel = gripStrong ? "★★★（グリップ強め推奨）" : "★★☆（標準でOK）";
  const price = a.budgetHigh
    ? "4,000〜6,500円（輸入・上位モデルも）"
    : "1,500〜4,000円";

  // --- タイプ名 ---
  let typeName: string, typeEmoji: string;
  if (a.wood && a.gripMax) {
    typeName = "木製×グリップ重視型";
    typeEmoji = "🪵";
  } else if (a.gripMax) {
    typeName = "グリップ最優先型";
    typeEmoji = "✊";
  } else if (a.durable) {
    typeName = "長く使う本格派";
    typeEmoji = "🛡️";
  } else {
    typeName = "フィット・オールラウンド型";
    typeEmoji = "🧤";
  }

  const advice = a.wood
    ? "木製バットは金属より衝撃が大きく、グリップも細め。手のひらに補強があり、グリップ力の高いモデルを選ぶと打感を活かしつつ手を守れます。天然皮革はなじむほど一体感が増します。"
    : a.gripMax
      ? "とにかく滑りたくないなら、手のひらのグリップ加工が強いモデルを。汗ばむ夏や寒い日でも食いつくタイプだとバットが抜けにくく安定します。"
      : "まずはジャストサイズを最優先に。指先が余ると力が伝わりません。素材はなじむ天然皮革か軽い合皮か、好みで選べばOKです。";

  const cautions: string[] = [];
  if (a.hack && (a.gripMax || a.wood)) {
    cautions.push(
      "裏技：アメフト用グローブの流用も選択肢。グリップは非常に強いが野球専用設計ではないため、耐久・サイズ感の確認と、公式戦では用具規定のチェックを（自己責任で）。"
    );
  }

  return {
    typeName,
    typeEmoji,
    specs: [
      { k: "おすすめ素材", v: materialLabel },
      { k: "ブランド傾向", v: brandLabel },
      { k: "サイズ", v: size },
      { k: "グリップの目安", v: gripLevel },
      { k: "予算の目安", v: price },
    ],
    advice,
    cautions: cautions.length ? cautions : undefined,
    productKeyword: keyword,
    productHeading: `🧤 診断結果に合う「${brandLabel}」`,
    links: [
      { href: "/batting-gloves/", label: "「バッティンググローブ比較」で見比べる（裏技も）" },
      { href: "/bat-shindan/", label: "バット本体は「軟式バット相性診断」で" },
    ],
  };
}

export default function BattingGloveShindan() {
  return (
    <YesNoShindan
      questions={QUESTIONS}
      diagnose={diagnose}
      resultTitle="あなたに合うバッティンググローブ"
      scrollId="bg-result"
    />
  );
}
