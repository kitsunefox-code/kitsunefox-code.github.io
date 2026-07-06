"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import ProductCards from "@/components/ProductCards";

export type YNQuestion = { id: string; text: string; sub?: string };

export type YNResult = {
  typeName: string;
  typeEmoji: string;
  specs: { k: string; v: ReactNode }[];
  advice: string;
  extraNote?: string; // 2行目の補足（🧩）
  cautions?: string[];
  productKeyword: string;
  productHeading: string;
  productFallback?: string[];
  links: { href: string; label: string }[];
};

/**
 * 「はい／いいえ」の進行式診断エンジン。
 * questions と diagnose(回答)→YNResult を渡すだけで、進行UI・結果カード・実商品カードまで描画。
 */
export default function YesNoShindan({
  questions,
  diagnose,
  resultTitle = "診断結果",
  scrollId = "yn-result",
}: {
  questions: YNQuestion[];
  diagnose: (a: Record<string, boolean>) => YNResult;
  resultTitle?: string;
  scrollId?: string;
}) {
  const [a, setA] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<YNResult | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const answeredCount = questions.filter((q) => q.id in a).length;
  const allAnswered = answeredCount === questions.length;
  const visible = questions.slice(0, Math.min(answeredCount + 1, questions.length));

  useEffect(() => {
    if (allAnswered) {
      setResult(diagnose(a));
      setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth" }), 60);
    } else {
      setResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a]);

  const answer = (id: string, v: boolean) =>
    setA((prev) => ({ ...prev, [id]: v }));
  const reset = () => {
    setA({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <p className="yn-progress">
        {answeredCount} / {questions.length} 問
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
          「はい／いいえ」を選ぶと次の質問が出ます（全{questions.length}問）。
        </p>
      )}

      {result && (
        <section id={scrollId} ref={ref} style={{ paddingTop: 20 }}>
          <h2 className="section-title">{resultTitle}</h2>
          <article className="result-card first">
            <span className="result-rank-badge">
              {result.typeEmoji} あなたは「{result.typeName}」
            </span>
            <div className="bat-spec">
              {result.specs.map((s, i) => (
                <div className="bat-spec-row" key={i}>
                  <span className="bat-spec-k">{s.k}</span>
                  <span className="bat-spec-v">{s.v}</span>
                </div>
              ))}
            </div>
            <p className="bat-advice">💡 {result.advice}</p>
            {result.extraNote && (
              <p className="bat-advice" style={{ marginTop: 8 }}>
                🧩 {result.extraNote}
              </p>
            )}
            {result.cautions && result.cautions.length > 0 && (
              <ul className="bat-cautions">
                {result.cautions.map((c, i) => (
                  <li key={i}>⚠️ {c}</li>
                ))}
              </ul>
            )}
            <button
              className="stats-clear"
              onClick={reset}
              style={{ marginTop: 12 }}
            >
              もう一度診断する
            </button>
          </article>

          <ProductCards
            keyword={result.productKeyword}
            heading={result.productHeading}
            fallbackRakuten={result.productFallback}
          />

          <div className="bat-links">
            {result.links.map((l, i) => (
              <a className="cta-inline" key={i} href={l.href}>
                → {l.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
