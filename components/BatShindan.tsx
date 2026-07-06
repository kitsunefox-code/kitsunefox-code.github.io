"use client";

import { useEffect, useRef, useState } from "react";
import ProductCards from "@/components/ProductCards";
import {
  BAT_MATERIAL_INFO,
  pickBatModel,
  type BatMaterial,
} from "@/data/batData";

// ===== YES/NO 質問 =====
type QId =
  | "distance"
  | "composite"
  | "power"
  | "launch"
  | "swingOut"
  | "budgetHigh"
  | "latest"
  | "exp"
  | "tall";

const QUESTIONS: { id: QId; text: string; sub?: string }[] = [
  { id: "distance", text: "とにかく“飛距離”を最優先にしたい" },
  {
    id: "composite",
    text: "所属リーグで複合バット（ビヨンド系）が使える",
    sub: "わからない・規定を気にしないなら「はい」でOK。",
  },
  { id: "power", text: "スイングスピードや力に自信がある" },
  { id: "launch", text: "ミート（当てる）より“振り切って飛ばす”タイプだ" },
  { id: "swingOut", text: "軽さ・振り抜きの良さを重視したい" },
  { id: "budgetHigh", text: "予算は2万円以上かけてもいい" },
  { id: "latest", text: "最新・人気モデルにこだわりたい" },
  { id: "exp", text: "硬式や本格野球の経験がある" },
  { id: "tall", text: "身長は175cm以上だ" },
];

type A = Partial<Record<QId, boolean>>;

type Result = {
  typeName: string;
  typeEmoji: string;
  material: BatMaterial;
  materialLabel: string;
  materialFeature: string;
  modelLine: string;
  modelNote: string;
  length: string;
  weightBalance: string;
  price: string;
  advice: string;
  caution: string | null;
  productKeyword: string;
  productHeading: string;
};

function diagnose(a: Required<Record<QId, boolean>>): Result {
  // --- 素材の決定 ---
  let material: BatMaterial;
  if (!a.composite) {
    material = a.swingOut && a.budgetHigh ? "carbon" : "metal";
  } else if (a.distance && (a.budgetHigh || a.power || a.launch)) {
    material = "beyond";
  } else if (a.distance) {
    material = "carbon";
  } else if (a.budgetHigh && (a.swingOut || a.power || a.launch)) {
    material = "carbon";
  } else {
    material = "metal";
  }

  const info = BAT_MATERIAL_INFO[material];
  const model = pickBatModel(material, {
    latest: a.latest,
    power: a.power || a.launch,
  });

  // --- 長さ ---
  const length = a.tall ? "84〜85cm" : "82〜84cm（身長で微調整）";

  // --- 重さ・バランス ---
  let weightBalance: string;
  if ((a.power || a.launch) && !a.swingOut) {
    weightBalance = "やや重め（740〜760g）・トップバランス";
  } else if (a.swingOut) {
    weightBalance = "軽め（700〜720g）・カウンター〜ミドルバランス";
  } else {
    weightBalance = "標準（720〜740g）・ミドルバランス";
  }

  // --- 予算 ---
  const price = a.budgetHigh
    ? material === "beyond"
      ? "20,000〜40,000円"
      : "15,000〜25,000円"
    : info.price;

  // --- タイプ名 ---
  let typeName: string, typeEmoji: string;
  if (a.distance && (a.power || a.launch)) {
    typeName = "パワーヒッター型";
    typeEmoji = "💥";
  } else if (a.distance) {
    typeName = "飛距離チャレンジ型";
    typeEmoji = "🚀";
  } else if (a.swingOut) {
    typeName = "スピード・巧打型";
    typeEmoji = "🎯";
  } else if (!a.exp) {
    typeName = "これからグングン型";
    typeEmoji = "🌱";
  } else {
    typeName = "アベレージ・オールラウンド型";
    typeEmoji = "⚾";
  }

  // --- アドバイス ---
  let advice: string;
  if (a.exp && !a.power) {
    advice =
      "硬式の感覚があるぶんミートは安定しているはず。軟式は球が軽くしなるので、重さで振り負けるより、軽量＋反発の高い素材で“振り切って弾く”ほうが飛びます。長さは確保しつつ、重さは欲張らないのが正解です。";
  } else if (material === "beyond") {
    advice =
      "飛距離最優先ならウレタン複合（ビヨンド系）が筆頭。振り切れる重さを選ぶのがコツで、重すぎると振り遅れます。まずは今の力で“鋭く振れる”重量帯から選びましょう。";
  } else if (material === "carbon") {
    advice =
      "カーボン系は軽くて反発も良好。スイングスピードを活かしたい人に好相性です。振り抜きの軽さを活かして、当てる精度を上げると打球が伸びます。";
  } else {
    advice =
      "まずは扱いやすい金属で“振り切る感覚”を固めるのが上達の近道。軽めを鋭く振れるようになってから、複合など次の一本に進むと失敗しません。";
  }

  // --- 注意 ---
  const caution =
    material === "beyond" && !a.composite
      ? "複合（ビヨンド系）は所属リーグ・大会で使用が制限される場合があります。購入前に必ず使用可否を確認してください（M号対応かも要チェック）。"
      : material === "beyond"
        ? "複合バットは規格の指定がある場合があります。M号対応か、リーグで使えるかを確認しておくと安心です。"
        : null;

  return {
    typeName,
    typeEmoji,
    material,
    materialLabel: info.label,
    materialFeature: info.feature,
    modelLine: `${model.maker}「${model.name}」`,
    modelNote: model.note,
    length,
    weightBalance,
    price,
    advice,
    caution,
    productKeyword: model.keyword,
    productHeading: `🏏 診断結果に近い「${model.maker} ${model.name}」系を探す`,
  };
}

export default function BatShindan() {
  const [a, setA] = useState<A>({});
  const [result, setResult] = useState<Result | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const answeredCount = QUESTIONS.filter((q) => q.id in a).length;
  const allAnswered = answeredCount === QUESTIONS.length;
  // 進行式：回答済み＋次の1問だけ表示
  const visible = QUESTIONS.slice(0, Math.min(answeredCount + 1, QUESTIONS.length));

  useEffect(() => {
    if (allAnswered) {
      setResult(diagnose(a as Required<Record<QId, boolean>>));
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      setResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a]);

  const answer = (id: QId, val: boolean) =>
    setA((prev) => ({ ...prev, [id]: val }));

  const reset = () => {
    setA({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <p className="yn-progress">
        {answeredCount} / {QUESTIONS.length} 問
      </p>

      {visible.map((q, i) => (
        <div className="shindan-step" key={q.id}>
          <h2>
            <span className="step-num">{i + 1}</span>
            {q.text}
          </h2>
          {q.sub && <p className="step-sub">{q.sub}</p>}
          <div className="yn-grid">
            <button
              className={`yn-btn yn-yes ${a[q.id] === true ? "active" : ""}`}
              onClick={() => answer(q.id, true)}
            >
              はい
            </button>
            <button
              className={`yn-btn yn-no ${a[q.id] === false ? "active" : ""}`}
              onClick={() => answer(q.id, false)}
            >
              いいえ
            </button>
          </div>
        </div>
      ))}

      {!allAnswered && (
        <p className="yn-hint">
          直感で「はい／いいえ」を選ぶと、次の質問が出ます（全{QUESTIONS.length}問）。
        </p>
      )}

      {result && (
        <section id="bat-result" ref={resultRef} style={{ paddingTop: 20 }}>
          <h2 className="section-title">あなたにおすすめの軟式バット</h2>
          <article className="result-card first">
            <span className="result-rank-badge">
              {result.typeEmoji} あなたは「{result.typeName}」
            </span>
            <div className="bat-spec">
              <div className="bat-spec-row">
                <span className="bat-spec-k">おすすめ素材</span>
                <span className="bat-spec-v">
                  <b>{result.materialLabel}</b>｜{result.materialFeature}
                </span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">近いモデル系統</span>
                <span className="bat-spec-v">
                  <b>{result.modelLine}</b>｜{result.modelNote}
                </span>
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
            {result.caution && (
              <ul className="bat-cautions">
                <li>⚠️ {result.caution}</li>
              </ul>
            )}
            <button className="stats-clear" onClick={reset} style={{ marginTop: 12 }}>
              もう一度診断する
            </button>
          </article>

          <ProductCards
            keyword={result.productKeyword}
            heading={result.productHeading}
            fallbackRakuten={["bat"]}
          />

          <div className="bat-links">
            <a className="cta-inline" href="/bat/">
              → 「軟式バット比較」で素材・ブランドを見比べる
            </a>
            <a className="cta-inline" href="/guide/bat-guide/">
              → じっくり読む「軟式バットの選び方」
            </a>
          </div>
        </section>
      )}
    </>
  );
}
