"use client";

import YesNoShindan, {
  type YNQuestion,
  type YNResult,
} from "@/components/YesNoShindan";

const QUESTIONS: YNQuestion[] = [
  {
    id: "metalOK",
    text: "使うグラウンドで“金具スパイク”が使える",
    sub: "公共グラウンドは金具禁止が多め。わからなければ「いいえ」でOK。",
  },
  { id: "gripMax", text: "グリップ力（踏ん張り）を最優先したい" },
  { id: "light", text: "軽さ・動きやすさを重視したい" },
  { id: "ankle", text: "足首をしっかり守りたい（捻挫が不安）" },
  { id: "width", text: "足の幅が広めだ" },
  { id: "budgetHigh", text: "予算はしっかりかけたい（8,000円以上）" },
  { id: "beginner", text: "まず一足目・練習が中心だ" },
];

function diagnose(a: Record<string, boolean>): YNResult {
  // --- 種別（ポイント/金具） ---
  const metal = a.metalOK && a.gripMax;
  const kind = metal
    ? "金具（メタル）スパイク"
    : "樹脂ポイント（スタッド）スパイク";
  const kindNote = metal
    ? "グリップ最強。ただし使える球場が限られるので要確認。"
    : "多くの公共グラウンドでOK。草野球の基本はこちら。";

  // --- カット ---
  const cut = a.ankle
    ? "ハイカット（足首をしっかり保護）"
    : a.light
      ? "ローカット（軽快・動きやすい）"
      : "ミドルカット（安定と軽さのバランス）";

  // --- 素材 ---
  const material = a.budgetHigh
    ? "天然皮革（足になじみ、フィット感が高い）"
    : "人工皮革（軽く手入れがラク・手ごろ）";

  // --- ブランド傾向 ---
  let brand: string;
  if (a.width) brand = "ニューバランス／アシックス（幅・クッション重視）";
  else if (a.light) brand = "ミズノ／アシックス（軽量・履き心地）";
  else if (a.beginner) brand = "ゼット／ミズノ（コスパ・定番）";
  else brand = "ミズノ（定番・種類豊富）";

  // --- 予算 ---
  const price = a.budgetHigh
    ? "8,000〜13,000円（上位・天然皮革も）"
    : a.beginner
      ? "3,500〜5,500円（まず一足に十分）"
      : "5,500〜8,000円";

  // --- タイプ名 ---
  let typeName: string, typeEmoji: string;
  if (metal) {
    typeName = "本格グリップ派";
    typeEmoji = "🔩";
  } else if (a.light) {
    typeName = "軽快スピード派";
    typeEmoji = "💨";
  } else if (a.ankle) {
    typeName = "安定・ケガ予防派";
    typeEmoji = "🛡️";
  } else {
    typeName = "まずは定番派";
    typeEmoji = "👟";
  }

  const advice = metal
    ? "金具はグリップ最強ですが、多くの公共グラウンドで禁止。使える球場か必ず確認し、樹脂ポイントも1足あると安心です。"
    : a.beginner
      ? "最初の一足は軽くて扱いやすい人工皮革の樹脂ポイントで十分。サイズはつま先5mmの余裕とかかとの浮かなさを最優先に。"
      : "草野球は樹脂ポイントが基本。あとはカット（足首の高さ）と幅で、自分の足に合うものを選べば失敗しません。";

  const keyword = metal
    ? "野球 スパイク 金具"
    : a.light
      ? "野球 スパイク ローカット ポイント"
      : "野球 スパイク ポイント";

  return {
    typeName,
    typeEmoji,
    specs: [
      { k: "おすすめ種別", v: <><b>{kind}</b>｜{kindNote}</> },
      { k: "カット（足首）", v: cut },
      { k: "おすすめ素材", v: material },
      { k: "ブランド傾向", v: brand },
      { k: "予算の目安", v: price },
    ],
    advice,
    cautions: metal
      ? ["金具スパイクは使用できる球場・リーグが限られます。必ず事前に確認を。"]
      : undefined,
    productKeyword: keyword,
    productHeading: `👟 診断結果に合う「${kind}」`,
    productFallback: ["spike"],
    links: [
      { href: "/spikes/", label: "「スパイク／シューズ比較」で見比べる" },
      { href: "/guide/spikes-guide/", label: "じっくり読む「野球スパイクの選び方」" },
      { href: "/guide/gear-checklist/", label: "他に必要なものは「道具チェックリスト」" },
    ],
  };
}

export default function SpikesShindan() {
  return (
    <YesNoShindan
      questions={QUESTIONS}
      diagnose={diagnose}
      resultTitle="あなたにおすすめのスパイク"
      scrollId="spikes-result"
    />
  );
}
