"use client";

import { useState } from "react";
import ProductCards from "@/components/ProductCards";

// ===== 回答の型 =====
type Exp = "hard" | "soft" | "beginner"; // 野球経験
type Power = "high" | "mid" | "low"; // 力・スイングの自信
type Hit = "distance" | "average" | "contact"; // 打撃タイプ
type Height = "s" | "m" | "l"; // 身長
type Composite = "yes" | "unknown" | "no"; // 複合(ビヨンド系)が使えるか
type Budget = "low" | "mid" | "high";
type WeightPref = "light" | "std" | "heavy" | "auto"; // 重さの好み

type Answers = {
  exp: Exp | null;
  power: Power | null;
  hit: Hit | null;
  height: Height | null;
  composite: Composite | null;
  budget: Budget | null;
  weight: WeightPref | null;
};

type Material = "metal" | "carbon" | "beyond";

type Result = {
  typeName: string;
  typeEmoji: string;
  material: Material;
  materialLabel: string;
  length: string;
  weightBalance: string;
  price: string;
  advice: string;
  cautions: string[];
  productKeyword: string;
};

const MATERIAL_KEYWORD: Record<Material, string> = {
  metal: "軟式 バット 金属",
  carbon: "軟式 バット カーボン",
  beyond: "軟式 バット 複合 ビヨンド",
};

// ===== 選択肢 =====
const EXP_OPTS: { v: Exp; label: string }[] = [
  { v: "hard", label: "硬式（高校・大学など）の経験あり" },
  { v: "soft", label: "軟式・草野球の経験あり" },
  { v: "beginner", label: "初心者・ブランクが長い" },
];
const POWER_OPTS: { v: Power; label: string }[] = [
  { v: "high", label: "力・スイングスピードに自信あり" },
  { v: "mid", label: "人並み・ふつう" },
  { v: "low", label: "非力・当てるのを優先したい" },
];
const HIT_OPTS: { v: Hit; label: string }[] = [
  { v: "distance", label: "とにかく遠くへ飛ばしたい" },
  { v: "average", label: "ヒットを広く打ちたい（アベレージ）" },
  { v: "contact", label: "つなぎ・バント・当てて転がす" },
];
const HEIGHT_OPTS: { v: Height; label: string }[] = [
  { v: "s", label: "〜165cm" },
  { v: "m", label: "165〜175cm" },
  { v: "l", label: "175cm〜" },
];
const COMPOSITE_OPTS: { v: Composite; label: string }[] = [
  { v: "yes", label: "使える（複合バットOKのリーグ）" },
  { v: "unknown", label: "わからない" },
  { v: "no", label: "使えない（金属のみ等の規定）" },
];
const BUDGET_OPTS: { v: Budget; label: string }[] = [
  { v: "low", label: "なるべく安く（〜1万円）" },
  { v: "mid", label: "標準（1〜2万円）" },
  { v: "high", label: "こだわりたい（2万円〜）" },
];
const WEIGHT_OPTS: { v: WeightPref; label: string }[] = [
  { v: "light", label: "軽め（振り抜き重視）" },
  { v: "std", label: "標準" },
  { v: "heavy", label: "重め（当たり負けしにくい）" },
  { v: "auto", label: "おまかせ（診断で決めて）" },
];

const MATERIAL_LABEL: Record<Material, string> = {
  metal: "金属（ジュラルミン系）",
  carbon: "カーボン・複合",
  beyond: "ウレタン複合（ビヨンド系）",
};

// ===== 診断ロジック =====
function diagnose(a: Required<Answers>): Result {
  // --- 素材の決定 ---
  let material: Material;
  if (a.composite === "no") {
    material = "metal";
  } else if (a.hit === "distance" && a.power === "high") {
    material = "beyond"; // 飛距離最優先＆パワーあり
  } else if (a.hit === "distance") {
    material = "carbon"; // 飛ばしたいが非力〜普通 → 軽くて弾く複合
  } else if (a.hit === "contact" || a.power === "low") {
    material = "metal"; // ミート優先・非力は扱いやすい金属
  } else {
    material = a.budget === "high" ? "carbon" : "metal";
  }
  // 予算が最安なら複合は現実的でないので金属へ寄せる
  if (a.budget === "low" && material === "beyond") material = "carbon";
  if (a.budget === "low" && material === "carbon" && a.power !== "high")
    material = "metal";

  // --- 長さ ---
  const length =
    a.height === "s" ? "82〜83cm" : a.height === "l" ? "84〜85cm" : "83〜84cm";

  // --- 重さ・バランス ---
  // 明示的な好みがあれば最優先。なければ経験・力・打撃タイプから推定（より正確に）。
  let weightBalance: string;
  if (a.weight === "heavy") {
    weightBalance = "やや重め（740〜760g）・トップバランス";
  } else if (a.weight === "light") {
    weightBalance = "軽め（700〜720g）・カウンター〜ミドルバランス";
  } else if (a.weight === "std") {
    weightBalance = "標準（720〜740g）・ミドルバランス";
  } else {
    const powerful =
      a.power === "high" || (a.exp === "hard" && a.hit === "distance");
    const light =
      a.power === "low" || a.exp === "beginner" || a.hit === "contact";
    if (powerful && !light) {
      weightBalance = "やや重め（740〜760g）・トップバランス";
    } else if (light) {
      weightBalance = "軽め（700〜720g）・カウンター〜ミドルバランス";
    } else {
      weightBalance = "標準（720〜740g）・ミドルバランス";
    }
  }

  // --- 予算目安 ---
  const price =
    a.budget === "low"
      ? "5,000〜10,000円（金属モデル中心）"
      : a.budget === "high"
        ? "20,000〜40,000円（複合の上位モデルも視野）"
        : "10,000〜20,000円";

  // --- タイプ名 ---
  let typeName: string, typeEmoji: string;
  if (a.hit === "distance" && a.power === "high") {
    typeName = "パワーヒッター型";
    typeEmoji = "💥";
  } else if (a.hit === "distance") {
    typeName = "飛距離チャレンジ型";
    typeEmoji = "🚀";
  } else if (a.hit === "contact") {
    typeName = "巧打・つなぎ型";
    typeEmoji = "🎯";
  } else if (a.exp === "beginner") {
    typeName = "これからグングン型";
    typeEmoji = "🌱";
  } else {
    typeName = "アベレージ・オールラウンド型";
    typeEmoji = "⚾";
  }

  // --- アドバイス ---
  let advice: string;
  if (a.exp === "hard" && a.power === "low") {
    advice =
      "硬式の感覚があるぶん、ミートは安定しているはず。ただ軟式は球が軽くしなるので、重いバットで振り負けるより、軽量＋反発の高い素材で“振り切って弾く”ほうが飛びます。長さは確保しつつ、重さは欲張らないのが正解です。";
  } else if (a.exp === "hard") {
    advice =
      "硬式経験者は、軟式の“球の軽さ・打点の高さ”に慣れるとすぐ結果が出ます。振り切れるならトップバランスで長打も狙えますが、最初はミドル寄りで軟式の打感を確かめるのがおすすめです。";
  } else if (a.exp === "beginner") {
    advice =
      "まずは「軽くて振り切れる一本」から。重さで飛ばそうとせず、鋭く振る感覚を優先しましょう。扱いやすい金属バットでスイングを固めれば、自然と打球が上がってきます。";
  } else if (a.power === "low") {
    advice =
      "非力を感じているなら、重さより“振り切れること”が最優先。軽量モデル＋反発の高い素材が、パワー不足を道具で補ってくれます。当てる技術を活かせば十分に長打も出ます。";
  } else if (a.hit === "distance") {
    advice =
      "飛距離を狙うなら、素材選びが最大のポイント。振り切れる範囲で先端にウェイトのあるバランスを選ぶと、打球が伸びます。ただし振り遅れない重さに抑えるのが失敗しないコツです。";
  } else {
    advice =
      "オールラウンドに打ちたいタイプ。迷ったらミドルバランスの標準的な重さが一番しっくりきます。まずは基準の一本を作り、物足りなければ次で調整していきましょう。";
  }

  // --- 注意点 ---
  const cautions: string[] = [];
  if (material === "beyond" && a.composite === "unknown") {
    cautions.push(
      "複合（ビヨンド系）は所属リーグ・大会で使用が制限されることがあります。購入前に必ず使用可否を確認してください。"
    );
  }
  if (material !== "metal" && a.composite === "unknown") {
    cautions.push(
      "念のため、チームの使用球（M号など）と、複合バットの規格ルールをチェックしておくと安心です。"
    );
  }
  cautions.push(
    "大人の草野球はM号球が基本。M号対応のバットを選びましょう（J号は主に少年野球）。"
  );

  return {
    typeName,
    typeEmoji,
    material,
    materialLabel: MATERIAL_LABEL[material],
    length,
    weightBalance,
    price,
    advice,
    cautions,
    productKeyword: MATERIAL_KEYWORD[material],
  };
}

export default function BatShindan() {
  const [a, setA] = useState<Answers>({
    exp: null,
    power: null,
    hit: null,
    height: null,
    composite: null,
    budget: null,
    weight: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const ready =
    a.exp !== null &&
    a.power !== null &&
    a.hit !== null &&
    a.height !== null &&
    a.composite !== null &&
    a.budget !== null &&
    a.weight !== null;

  const run = () => {
    if (!ready) return;
    setResult(diagnose(a as Required<Answers>));
    setTimeout(() => {
      document
        .getElementById("bat-result")
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
          <span className="step-num">1</span>野球の経験は？
        </h2>
        <p className="step-sub">
          経験と「力の有無」は別ものとして質問します。硬式出身でも非力な方はご安心を。
        </p>
        {opt("exp", EXP_OPTS, a.exp)}
      </div>

      <div className="shindan-step">
        <h2>
          <span className="step-num">2</span>力・スイングの自信は？
        </h2>
        {opt("power", POWER_OPTS, a.power)}
      </div>

      <div className="shindan-step">
        <h2>
          <span className="step-num">3</span>どんな打撃をしたい？
        </h2>
        {opt("hit", HIT_OPTS, a.hit)}
      </div>

      <div className="shindan-step">
        <h2>
          <span className="step-num">4</span>身長は？（長さの目安に使います）
        </h2>
        {opt("height", HEIGHT_OPTS, a.height)}
      </div>

      <div className="shindan-step">
        <h2>
          <span className="step-num">5</span>複合バット（ビヨンド系）は使える環境？
        </h2>
        <p className="step-sub">
          リーグや大会で使用が制限される場合があります。わからなければ「わからない」でOK。
        </p>
        {opt("composite", COMPOSITE_OPTS, a.composite)}
      </div>

      <div className="shindan-step">
        <h2>
          <span className="step-num">6</span>予算は？
        </h2>
        {opt("budget", BUDGET_OPTS, a.budget)}
      </div>

      <div className="shindan-step">
        <h2>
          <span className="step-num">7</span>重さの好みは？
        </h2>
        <p className="step-sub">
          好みがあれば優先します。「おまかせ」なら経験・力・打撃タイプから最適な重さを提案します。
        </p>
        {opt("weight", WEIGHT_OPTS, a.weight)}
      </div>

      <button className="shindan-submit" disabled={!ready} onClick={run}>
        {ready ? "🏏 診断結果を見る" : "7つの質問すべてに答えると診断できます"}
      </button>

      {result && (
        <section id="bat-result" style={{ paddingTop: 30 }}>
          <h2 className="section-title">あなたにおすすめの軟式バット</h2>
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
                <span className="bat-spec-k">長さの目安</span>
                <span className="bat-spec-v">{result.length}</span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">重さ・バランス</span>
                <span className="bat-spec-v">{result.weightBalance}</span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">予算の目安</span>
                <span className="bat-spec-v">{result.price}</span>
              </div>
            </div>
            <p className="bat-advice">💡 {result.advice}</p>
            {result.cautions.length > 0 && (
              <ul className="bat-cautions">
                {result.cautions.map((c, i) => (
                  <li key={i}>⚠️ {c}</li>
                ))}
              </ul>
            )}
          </article>

          <ProductCards
            keyword={result.productKeyword}
            heading={`🏏 診断結果に合う「${result.materialLabel}」系の軟式バット`}
            fallbackRakuten={["bat"]}
          />

          <div className="bat-links">
            <a className="cta-inline" href="/guide/bat-guide/">
              → もっと詳しく：軟式バットの選び方【完全ガイド】
            </a>
            <a className="cta-inline" href="/guide/soft-batting/">
              → 打ち方も知りたい：軟式の打ち方のコツ【動画つき】
            </a>
          </div>
        </section>
      )}
    </>
  );
}
