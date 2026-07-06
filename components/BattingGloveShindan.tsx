"use client";

import { useState } from "react";
import ProductCards from "@/components/ProductCards";

// ===== 回答の型 =====
type Bat = "wood" | "metal" | "both"; // 使うバット
type Priority = "grip" | "fit" | "durability" | "price"; // 重視点
type Hand = "s" | "m" | "l"; // 手の大きさ
type Material = "leather" | "synthetic" | "any"; // 素材の好み
type Usage = "game" | "casual"; // 使い方
type Budget = "low" | "mid" | "high"; // 予算
type Hack = "yes" | "no"; // アメフトG流用に興味

type Answers = {
  bat: Bat | null;
  priority: Priority | null;
  hand: Hand | null;
  material: Material | null;
  usage: Usage | null;
  budget: Budget | null;
  hack: Hack | null;
};
type Filled = {
  bat: Bat;
  priority: Priority;
  hand: Hand;
  material: Material;
  usage: Usage;
  budget: Budget;
  hack: Hack;
};

type BrandTrend = "import" | "domestic" | "value";

type Result = {
  typeName: string;
  typeEmoji: string;
  materialLabel: string;
  brandLabel: string;
  brandTrend: BrandTrend;
  size: string;
  gripLevel: string;
  price: string;
  advice: string;
  hackText: string | null;
  productKeyword: string;
  productHeading: string;
};

const BAT_OPTS: { v: Bat; label: string }[] = [
  { v: "wood", label: "木製バットがメイン" },
  { v: "metal", label: "金属・複合（ビヨンド系など）" },
  { v: "both", label: "どちらも使う／こだわらない" },
];
const PRIORITY_OPTS: { v: Priority; label: string }[] = [
  { v: "grip", label: "グリップ力（滑らない）を最優先" },
  { v: "fit", label: "フィット感・つけ心地" },
  { v: "durability", label: "耐久性・長く使える" },
  { v: "price", label: "価格・コスパ" },
];
const HAND_OPTS: { v: Hand; label: string }[] = [
  { v: "s", label: "小さめ（手が小さい・女性）" },
  { v: "m", label: "普通" },
  { v: "l", label: "大きめ（がっしり）" },
];
const MATERIAL_OPTS: { v: Material; label: string }[] = [
  { v: "leather", label: "天然皮革（手になじむ）" },
  { v: "synthetic", label: "合皮（手入れがラク・軽い）" },
  { v: "any", label: "こだわらない" },
];
const USAGE_OPTS: { v: Usage; label: string }[] = [
  { v: "game", label: "試合でしっかり使う" },
  { v: "casual", label: "練習・カジュアルに" },
];
const BUDGET_OPTS: { v: Budget; label: string }[] = [
  { v: "low", label: "〜2,000円" },
  { v: "mid", label: "2,000〜4,000円" },
  { v: "high", label: "4,000円〜（こだわりたい）" },
];
const HACK_OPTS: { v: Hack; label: string }[] = [
  { v: "yes", label: "グリップ最強なら“裏技”も試したい" },
  { v: "no", label: "野球用のちゃんとしたものがいい" },
];

const BRAND: Record<BrandTrend, { label: string; keyword: string }> = {
  import: {
    label: "輸入ブランド（フランクリン／EvoShield など）",
    keyword: "バッティンググローブ フランクリン",
  },
  domestic: {
    label: "国内定番（ミズノ／SSK など）",
    keyword: "バッティンググローブ ミズノ",
  },
  value: {
    label: "コスパ重視（ゼット など）",
    keyword: "バッティンググローブ ゼット",
  },
};

function diagnose(a: Filled): Result {
  // --- 素材 ---
  let material: "leather" | "synthetic";
  if (a.material === "leather") material = "leather";
  else if (a.material === "synthetic") material = "synthetic";
  else {
    // こだわらない → 用途・予算・重視点から推定
    material =
      a.priority === "durability" || a.usage === "game" || a.budget === "high"
        ? "leather"
        : "synthetic";
  }
  if (a.budget === "low") material = "synthetic"; // 最安帯は合皮が現実的
  const materialLabel =
    material === "leather"
      ? "天然皮革（シープスキン等・手になじむ）"
      : "合皮（軽くて手入れがラク）";

  // --- ブランド傾向 ---
  let brandTrend: BrandTrend;
  if (a.priority === "price" || a.budget === "low") brandTrend = "value";
  else if (
    a.priority === "grip" &&
    (a.bat === "wood" || a.budget === "high")
  )
    brandTrend = "import"; // グリップ最優先＆木製/予算高め → 輸入系
  else if (a.budget === "high" && a.priority !== "fit") brandTrend = "import";
  else brandTrend = "domestic";

  // --- サイズ ---
  const size =
    a.hand === "s"
      ? "ジャストサイズ〜やや小さめ。指先が余らないものを"
      : a.hand === "l"
        ? "ジャストサイズ〜やや大きめ。締め付けすぎないものを"
        : "ジャストサイズが基本。指先に余りが出ないものを";

  // --- グリップ度 ---
  const gripStrong =
    a.priority === "grip" || a.bat === "wood" || brandTrend === "import";
  const gripLevel = gripStrong
    ? "★★★（グリップ強め推奨）"
    : "★★☆（標準でOK）";

  // --- 予算目安 ---
  const price =
    a.budget === "low"
      ? "1,500〜2,500円（合皮の実用モデル）"
      : a.budget === "high"
        ? "4,000〜6,500円（輸入・上位モデルも）"
        : "2,500〜4,500円";

  // --- タイプ名 ---
  let typeName: string, typeEmoji: string;
  if (a.bat === "wood" && a.priority === "grip") {
    typeName = "木製×グリップ重視型";
    typeEmoji = "🪵";
  } else if (a.priority === "grip") {
    typeName = "グリップ最優先型";
    typeEmoji = "✊";
  } else if (a.priority === "price") {
    typeName = "コスパ重視型";
    typeEmoji = "💰";
  } else if (a.priority === "durability") {
    typeName = "長く使う本格派";
    typeEmoji = "🛡️";
  } else {
    typeName = "フィット重視・オールラウンド型";
    typeEmoji = "🧤";
  }

  // --- アドバイス ---
  let advice: string;
  if (a.bat === "wood") {
    advice =
      "木製バットは金属より衝撃が大きく、グリップも細め。手のひらに補強やパッドがあり、グリップ力の高いモデルを選ぶと、打感を活かしつつ手を守れます。天然皮革はなじむほど一体感が増すのでおすすめです。";
  } else if (a.priority === "grip") {
    advice =
      "とにかく滑りたくないなら、手のひらのグリップ加工が強いモデルを。汗ばむ夏や寒い日でも食いつくタイプを選ぶと、バットが抜けにくくスイングが安定します。";
  } else if (a.priority === "price") {
    advice =
      "消耗品と割り切るなら合皮の実用モデルで十分。まずは安価なもので“ある/なし”の差を体感し、必要に応じて上位モデルへ。サイズだけは妥協しないのがコツです。";
  } else if (a.priority === "durability") {
    advice =
      "長く使うなら、手のひらが補強された天然皮革の上位モデルが安心。使うほど手になじみ、フィットと耐久を両立できます。使用後は乾かして保管すると長持ちします。";
  } else {
    advice =
      "つけ心地重視なら、まずジャストサイズを最優先に。指先が余ると力が伝わりません。素材はなじむ天然皮革か、軽い合皮か、好みで選べばOKです。";
  }

  // --- 裏技（アメフトG流用）提案 ---
  let hackText: string | null = null;
  if (a.hack === "yes" && (a.priority === "grip" || a.bat === "wood")) {
    hackText =
      "グリップ最優先なら“裏技”として、アメフト（レシーバー）用グローブの流用も選択肢。手のひらのグリップが非常に強く、食いつき抜群です。ただし野球専用設計ではないため、耐久・サイズ感の確認と、公式戦では用具規定のチェックを（自己責任で）。";
  }

  return {
    typeName,
    typeEmoji,
    materialLabel,
    brandLabel: BRAND[brandTrend].label,
    brandTrend,
    size,
    gripLevel,
    price,
    advice,
    hackText,
    productKeyword: BRAND[brandTrend].keyword,
    productHeading: `🧤 診断結果に合う「${BRAND[brandTrend].label}」`,
  };
}

export default function BattingGloveShindan() {
  const [a, setA] = useState<Answers>({
    bat: null,
    priority: null,
    hand: null,
    material: null,
    usage: null,
    budget: null,
    hack: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const ready =
    a.bat !== null &&
    a.priority !== null &&
    a.hand !== null &&
    a.material !== null &&
    a.usage !== null &&
    a.budget !== null &&
    a.hack !== null;

  const run = () => {
    if (!ready) return;
    setResult(diagnose(a as Filled));
    setTimeout(() => {
      document
        .getElementById("bg-result")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const opt = <T extends string>(
    key: keyof Answers,
    opts: { v: T; label: string }[],
    current: T | null
  ) => (
    <div className="option-grid">
      {opts.map((o) => (
        <button
          key={o.v}
          className={`option-btn ${current === o.v ? "active" : ""}`}
          onClick={() => {
            setA((prev) => ({ ...prev, [key]: o.v }));
            setResult(null);
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="shindan-step">
        <h2>
          <span className="step-num">1</span>メインで使うバットは？
        </h2>
        <p className="step-sub">
          木製バット派は、グリップと衝撃吸収を重視して提案します。
        </p>
        {opt("bat", BAT_OPTS, a.bat)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">2</span>いちばん重視したいのは？
        </h2>
        {opt("priority", PRIORITY_OPTS, a.priority)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">3</span>手の大きさは？
        </h2>
        {opt("hand", HAND_OPTS, a.hand)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">4</span>素材の好みは？
        </h2>
        {opt("material", MATERIAL_OPTS, a.material)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">5</span>主な使い方は？
        </h2>
        {opt("usage", USAGE_OPTS, a.usage)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">6</span>予算は？
        </h2>
        {opt("budget", BUDGET_OPTS, a.budget)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">7</span>グリップ最強の“裏技”に興味は？
        </h2>
        <p className="step-sub">
          アメフト用グローブを打撃に流用する裏技（自己責任・規定確認）を提案するか決めます。
        </p>
        {opt("hack", HACK_OPTS, a.hack)}
      </div>

      <button className="shindan-submit" disabled={!ready} onClick={run}>
        {ready ? "🧤 診断結果を見る" : "7つの質問すべてに答えると診断できます"}
      </button>

      {result && (
        <section id="bg-result" style={{ paddingTop: 30 }}>
          <h2 className="section-title">あなたに合うバッティンググローブ</h2>
          <article className="result-card first">
            <span className="result-rank-badge">
              {result.typeEmoji} あなたは「{result.typeName}」
            </span>
            <div className="bat-spec">
              <div className="bat-spec-row">
                <span className="bat-spec-k">おすすめ素材</span>
                <span className="bat-spec-v">{result.materialLabel}</span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">ブランド傾向</span>
                <span className="bat-spec-v">{result.brandLabel}</span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">サイズ</span>
                <span className="bat-spec-v">{result.size}</span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">グリップの目安</span>
                <span className="bat-spec-v">{result.gripLevel}</span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">予算の目安</span>
                <span className="bat-spec-v">{result.price}</span>
              </div>
            </div>
            <p className="bat-advice">💡 {result.advice}</p>
            {result.hackText && (
              <ul className="bat-cautions">
                <li>🏈 {result.hackText}</li>
              </ul>
            )}
          </article>

          <ProductCards
            keyword={result.productKeyword}
            heading={result.productHeading}
          />

          <div className="bat-links">
            <a className="cta-inline" href="/batting-gloves/">
              → もっと詳しく：バッティンググローブ比較（木製派・裏技も）
            </a>
            <a className="cta-inline" href="/bat-shindan/">
              → バット本体は「軟式バット相性診断」で
            </a>
          </div>
        </section>
      )}
    </>
  );
}
