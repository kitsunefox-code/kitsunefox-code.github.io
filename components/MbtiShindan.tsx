"use client";

import { useEffect, useRef, useState } from "react";
import {
  MBTI_QUESTIONS,
  MBTI_TYPES,
  AXIS_LABELS,
  mbtiByCode,
  resolvePlayers,
  computeCode,
  type Pole,
  type MbtiType,
  type Axis,
} from "@/data/baseballMbti";
import { SITE_URL } from "@/data/site";

const FALLBACK = MBTI_TYPES[0];

export default function MbtiShindan() {
  const [ans, setAns] = useState<Record<string, Pole>>({});
  const [result, setResult] = useState<MbtiType | null>(null);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const answeredCount = MBTI_QUESTIONS.filter((q) => q.id in ans).length;
  const total = MBTI_QUESTIONS.length;
  const allAnswered = answeredCount === total;
  const visible = MBTI_QUESTIONS.slice(0, Math.min(answeredCount + 1, total));

  useEffect(() => {
    if (allAnswered) {
      const code = computeCode(ans);
      setResult(mbtiByCode(code) || FALLBACK);
      setCopied(false);
      setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth" }), 60);
    } else {
      setResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ans]);

  const pick = (id: string, pole: Pole) =>
    setAns((prev) => ({ ...prev, [id]: pole }));
  const reset = () => {
    setAns({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const players = result ? resolvePlayers(result.players) : [];

  const shareUrl = `${SITE_URL}/baseball-mbti/`;
  const shareText = result
    ? `私の野球選手MBTIは【${result.code}｜${result.nickname}】${result.emoji}\n${result.catch}\nあなたのタイプは？⚾`
    : "";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(
    "草野球ナビ,野球選手MBTI"
  )}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(shareText)}`;

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  // 軸ごとの内訳（結果表示用）
  const axisBreakdown = (): { ax: Axis; leftJp: string; rightJp: string; letter: string; leftN: number; rightN: number }[] => {
    return (Object.keys(AXIS_LABELS) as Axis[]).map((ax) => {
      const qs = MBTI_QUESTIONS.filter((q) => q.axis === ax);
      const l = AXIS_LABELS[ax];
      const leftN = qs.filter((q) => ans[q.id] === l.left).length;
      const rightN = qs.filter((q) => ans[q.id] === l.right).length;
      return { ax, leftJp: l.leftJp, rightJp: l.rightJp, letter: leftN >= rightN ? l.left : l.right, leftN, rightN };
    });
  };

  return (
    <>
      <p className="yn-progress">
        {answeredCount} / {total} 問
      </p>

      {visible.map((q, i) => (
        <div className="shindan-step" key={q.id}>
          <h2>
            <span className="step-num">{i + 1}</span>
            {q.q}
          </h2>
          <div className="ab-grid">
            <button
              className={`ab-btn ${ans[q.id] === q.a.pole ? "active" : ""}`}
              onClick={() => pick(q.id, q.a.pole)}
            >
              {q.a.label}
            </button>
            <button
              className={`ab-btn ${ans[q.id] === q.b.pole ? "active" : ""}`}
              onClick={() => pick(q.id, q.b.pole)}
            >
              {q.b.label}
            </button>
          </div>
        </div>
      ))}

      {!allAnswered && (
        <p className="yn-hint">
          近いと思う方を選ぶと、次の質問が出ます（全{total}問）。
        </p>
      )}

      {result && (
        <section id="mbti-result" ref={ref} style={{ paddingTop: 20 }}>
          <div className="type-hero">
            <span className="type-emoji">{result.emoji}</span>
            <span className="type-kicker">あなたの野球選手MBTIは</span>
            <span className="mbti-code">{result.code}</span>
            <span className="type-name">{result.nickname}</span>
            <span className="type-desc">{result.catch}</span>
          </div>

          {/* 4軸の内訳 */}
          <div className="mbti-axes">
            {axisBreakdown().map((b) => (
              <div className="mbti-axis" key={b.ax}>
                <span className={`mbti-axis-side ${b.letter === AXIS_LABELS[b.ax].left ? "on" : ""}`}>
                  {b.leftJp}
                </span>
                <span className="mbti-axis-bar">
                  <span
                    className="mbti-axis-fill"
                    style={{ width: `${(b.leftN / (b.leftN + b.rightN || 1)) * 100}%` }}
                  />
                </span>
                <span className={`mbti-axis-side ${b.letter === AXIS_LABELS[b.ax].right ? "on" : ""}`}>
                  {b.rightJp}
                </span>
              </div>
            ))}
          </div>

          <article className="player-card" style={{ marginTop: 18 }}>
            <p className="type-long" style={{ margin: 0 }}>{result.long}</p>

            {players.length > 0 && (
              <>
                <p className="mbti-players-title">このタイプに近い選手</p>
                <div className="type-players">
                  {players.map((p) => (
                    <div className="type-player" key={p.name}>
                      <span className={`player-league sm ${p.league === "MLB" ? "mlb" : "npb"}`}>
                        {p.league}
                      </span>
                      <span className="type-player-name">{p.name}</span>
                      <span className="type-player-pos">{p.position}</span>
                      <span className="type-player-gear">
                        グローブ：{p.glove}
                        {p.bat ? `／バット：${p.bat}` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <p className="player-disc" style={{ marginTop: 14 }}>
              ※ これはMBTIの考え方を野球に当てはめた<strong>エンタメ診断</strong>です。選手の分類は公式のものではありません。
            </p>

            <div className="type-advice-box">
              <span className="type-advice-head">🧰 道具えらびのヒント</span>
              <p>{result.advice}</p>
              <a className="cta-inline" href={result.adviceHref}>
                → {result.adviceCta}
              </a>
            </div>

            <div className="share-box">
              <span className="share-label">結果をシェア</span>
              <div className="share-btns">
                <a className="share-btn share-x" href={xUrl} target="_blank" rel="noopener noreferrer">
                  𝕏 でシェア
                </a>
                <a className="share-btn share-line" href={lineUrl} target="_blank" rel="noopener noreferrer">
                  LINEで送る
                </a>
                <button className="share-btn share-copy" onClick={copyShare}>
                  {copied ? "コピーしました！" : "結果をコピー"}
                </button>
              </div>
            </div>

            <button className="stats-clear" onClick={reset}>
              もう一度診断する
            </button>
          </article>

          <div className="bat-links">
            <a className="cta-inline" href="/player-shindan/">
              → 「似ている選手」も診断する（選手タイプ診断）
            </a>
            <a className="cta-inline" href="/tools/">
              → 診断ツール一覧を見る
            </a>
          </div>
        </section>
      )}
    </>
  );
}
