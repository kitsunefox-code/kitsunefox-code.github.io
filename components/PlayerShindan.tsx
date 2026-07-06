"use client";

import { useEffect, useRef, useState } from "react";
import ProductCards from "@/components/ProductCards";
import { PLAYERS, type Player, type Trait } from "@/data/players";

type QId = string;
const QUESTIONS: { id: QId; text: string; w: Partial<Record<Trait, number>> }[] = [
  { id: "q1", text: "一発の長打で試合を決めるのが快感だ", w: { power: 2, clutch: 1 } },
  { id: "q2", text: "守備でチームを救うのが好きだ", w: { defense: 3 } },
  { id: "q3", text: "足（盗塁・走塁）で流れを変えたい", w: { speed: 3 } },
  { id: "q4", text: "コツコツ当てて出塁するのが得意だ", w: { contact: 3 } },
  { id: "q5", text: "みんなを引っ張るリーダータイプだ", w: { leader: 3 } },
  { id: "q6", text: "派手なプレーで目立つのが好きだ", w: { flashy: 2, star: 2 } },
  { id: "q7", text: "データ・研究で上達するのが好きだ", w: { technician: 2, stoic: 1 } },
  { id: "q8", text: "打つよりマウンドで投げる方が好きだ", w: { pitcher: 4 } },
  { id: "q9", text: "地道な努力をコツコツ続けられる", w: { stoic: 3 } },
  { id: "q10", text: "プレッシャーのかかる場面ほど燃える", w: { clutch: 3 } },
  { id: "q11", text: "キャッチャーとして試合を組み立てたい", w: { catcher: 4 } },
  { id: "q12", text: "投打の“二刀流”に憧れる", w: { twoway: 4, power: 1, pitcher: 1 } },
];

function match(a: Record<string, boolean>): Player[] {
  const score: Partial<Record<Trait, number>> = {};
  for (const q of QUESTIONS) {
    if (a[q.id]) {
      for (const [t, v] of Object.entries(q.w)) {
        score[t as Trait] = (score[t as Trait] || 0) + (v as number);
      }
    }
  }
  const ranked = PLAYERS.map((p) => ({
    p,
    s: p.traits.reduce((sum, t) => sum + (score[t] || 0), 0),
  }))
    .sort((x, y) => y.s - x.s)
    .map((x) => x.p);
  return ranked;
}

export default function PlayerShindan() {
  const [a, setA] = useState<Record<string, boolean>>({});
  const [ranked, setRanked] = useState<Player[] | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const answeredCount = QUESTIONS.filter((q) => q.id in a).length;
  const allAnswered = answeredCount === QUESTIONS.length;
  const visible = QUESTIONS.slice(0, Math.min(answeredCount + 1, QUESTIONS.length));

  useEffect(() => {
    if (allAnswered) {
      setRanked(match(a));
      setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth" }), 60);
    } else {
      setRanked(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a]);

  const answer = (id: string, v: boolean) =>
    setA((prev) => ({ ...prev, [id]: v }));
  const reset = () => {
    setA({});
    setRanked(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const top = ranked?.[0];
  const alts = ranked?.slice(1, 4) || [];

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
          「はい／いいえ」で答えると次の質問が出ます（全{QUESTIONS.length}問）。
        </p>
      )}

      {top && (
        <section id="player-result" ref={ref} style={{ paddingTop: 20 }}>
          <h2 className="section-title">あなたに近いのはこの選手！</h2>
          <article className="player-card">
            <div className="player-head">
              <span className={`player-league ${top.league === "MLB" ? "mlb" : "npb"}`}>
                {top.league}
              </span>
              <span className="player-name">{top.name}</span>
              <span className="player-pos">{top.position}</span>
            </div>
            <p className="player-note">{top.note}</p>
            <div className="player-gear">
              <div className="pg-item">
                <span className="pg-k">グローブ</span>
                <span className="pg-v">{top.glove}</span>
              </div>
              {top.bat && (
                <div className="pg-item">
                  <span className="pg-k">バット</span>
                  <span className="pg-v">{top.bat}</span>
                </div>
              )}
              {top.spikes && (
                <div className="pg-item">
                  <span className="pg-k">スパイク</span>
                  <span className="pg-v">{top.spikes}</span>
                </div>
              )}
            </div>
            <p className="player-disc">
              ※ 使用ギアは公開情報に基づく参考です（時期・場面により変わることがあります）。
            </p>
            <button className="stats-clear" onClick={reset}>
              もう一度診断する
            </button>
          </article>

          <ProductCards
            keyword={top.productKeyword}
            heading={`🛒 ${top.productHeading}`}
          />

          {alts.length > 0 && (
            <div className="player-alts">
              <p className="player-alts-title">似ているタイプの選手</p>
              {alts.map((p) => (
                <div className="player-alt" key={p.name}>
                  <span className={`player-league sm ${p.league === "MLB" ? "mlb" : "npb"}`}>
                    {p.league}
                  </span>
                  <span className="player-alt-name">{p.name}</span>
                  <span className="player-alt-note">{p.note}</span>
                </div>
              ))}
            </div>
          )}

          <div className="bat-links">
            <a className="cta-inline" href="/tools/">
              → 道具を選ぶ「診断ツール一覧」へ
            </a>
            <a className="cta-inline" href="/hikaku/">
              → 「道具・ユニフォーム比較」を見る
            </a>
          </div>
        </section>
      )}
    </>
  );
}
