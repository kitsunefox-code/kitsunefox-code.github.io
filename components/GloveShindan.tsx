"use client";

// グローブ診断（/glove-shindan/）。
// 旧URL /glove-shindan/ は Search Console 上 5.4位・CTR47% で流入があるのに 404 だったため、
// リダイレクトではなく実体のある診断として復活させる。
// 判定はドックと同じ recommendGloveByStyle を使い、ロジックを二重化させない。
import { useEffect, useState } from "react";
import ProductCards from "@/components/ProductCards";
import { recommendGloveByStyle, type GloveByStyle } from "@/data/gloveData";
import { SITE_URL } from "@/data/site";

type Scores = { light: number; solid: number; hide: number; range: number };
type Q = { id: keyof Scores; text: string };

const QUESTIONS: Q[] = [
  { id: "light", text: "道具は軽さと操作性が命。もたつくのは何より嫌だ" },
  { id: "solid", text: "多少重くても、がっちり受け止める“安心感”がほしい" },
  { id: "hide", text: "自分の狙いや手の内は、相手に悟られたくない" },
  { id: "range", text: "広い範囲をカバーして、ここぞの場面で魅せたい" },
];

const SCALE = [
  { v: 3, label: "強くそう思う" },
  { v: 2, label: "そう思う" },
  { v: 1, label: "ややそう思う" },
  { v: 0, label: "どちらでもない" },
  { v: -1, label: "ややそう思わない" },
  { v: -2, label: "そう思わない" },
  { v: -3, label: "強くそう思わない" },
];

export default function GloveShindan() {
  const [ans, setAns] = useState<Record<string, number>>({});
  const [result, setResult] = useState<GloveByStyle | null>(null);

  const answered = Object.keys(ans).length;
  const done = QUESTIONS.every((q) => q.id in ans);

  // 回答は関数形で更新し、連続クリックでも取りこぼさない。
  const pick = (id: string, v: number) => setAns((prev) => ({ ...prev, [id]: v }));

  // 全問そろったら判定する。setState は同期反映されないので、pick 内ではなく
  // ans の変化を見て実行する（ここが正しいタイミング）。
  useEffect(() => {
    if (result) return;
    if (!QUESTIONS.every((q) => q.id in ans)) return;
    const pos = (k: string) => Math.max(0, ans[k] ?? 0);
    setResult(
      recommendGloveByStyle({
        light: pos("light"),
        solid: pos("solid"),
        hide: pos("hide"),
        range: pos("range"),
      })
    );
    setTimeout(
      () => document.getElementById("gs-result")?.scrollIntoView({ behavior: "smooth" }),
      80
    );
  }, [ans, result]);

  const shareText = result
    ? `⚾グローブ診断⚾\n私に合うのは【${result.charLabel}】（${result.web.name}）でした！`
    : "";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(SITE_URL + "/glove-shindan/")}&hashtags=${encodeURIComponent(
    "グローブ診断,草野球ナビ"
  )}`;

  return (
    <div className="pq">
      {!result && (
        <>
          <div className="lk-progress">
            <span className="lk-progress-label">
              全{QUESTIONS.length}問中 {answered}問 完了
            </span>
            <span className="lk-progress-bar">
              <span
                className="lk-progress-fill"
                style={{ width: `${(answered / QUESTIONS.length) * 100}%` }}
              />
            </span>
          </div>

          {QUESTIONS.map((q, i) => (
            <div className="pq-item" key={q.id}>
              <p className="pq-num">Q{i + 1}</p>
              <p className="pq-q">{q.text}</p>
              <div className="pq-choices">
                {SCALE.map((s) => (
                  <button
                    key={s.v}
                    className={`pq-choice ${ans[q.id] === s.v ? "on" : ""}`}
                    onClick={() => pick(q.id, s.v)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {!done && (
            <p className="yn-hint" style={{ textAlign: "center" }}>
              4問すべて答えると、その場で結果が出ます。
            </p>
          )}
        </>
      )}

      {result && (
        <div className="pq-result" id="gs-result">
          <p className="pq-result-label">あなたに合うグローブは…</p>
          <p className="pq-name" style={{ fontSize: "clamp(22px, 5vw, 34px)" }}>
            {result.charLabel}
          </p>
          <p className="pq-pos">
            ウェブ：{result.web.name}（{result.web.positions}）
          </p>
          <p className="pq-note">{result.reason}</p>

          <div className="pq-gear">
            <p className="pq-gear-head">{result.web.name}の特徴</p>
            <p className="pq-gear-body">{result.web.feature}</p>
            <p className="pq-gear-body" style={{ marginTop: 6, color: "var(--muted)" }}>
              ※ {result.web.note}
            </p>
          </div>

          <p className="player-disc" style={{ textAlign: "center" }}>
            ※ 4問の簡易診断です。ポジションが決まっている場合は、そちらを優先してください。
          </p>

          <div className="share-box">
            <span className="share-label">結果をシェア</span>
            <div className="share-btns">
              <a className="share-btn share-x" href={xUrl} target="_blank" rel="noopener noreferrer">
                Xでシェア
              </a>
            </div>
          </div>

          <ProductCards
            keyword={`軟式 グローブ ${result.posHint} 一般`}
            heading={`🧤 ${result.web.name}のグローブを探す`}
          />

          <button
            className="stats-clear"
            onClick={() => {
              setAns({});
              setResult(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            もう一度診断する
          </button>

          <div className="bat-links">
            <a className="cta-inline" href="/glove/">
              → ウェブの型・メーカーをじっくり比較する
            </a>
            <a className="cta-inline" href="/baseball-dock/">
              → 全45問の「野球MBTI診断」で道具一式を処方してもらう
            </a>
            <a className="cta-inline" href="/guide/glove-guide/">
              → 読む「軟式グローブの選び方」
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
