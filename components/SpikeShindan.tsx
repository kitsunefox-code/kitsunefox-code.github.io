"use client";

// スパイク診断（/spikes-shindan/）。
// グローブ診断・バット診断と同じ型：既存の recommendSpike を再利用してロジックを二重化させない。
// ⚠️ 判定は useEffect で回答の変化を見る（setState は同期反映されないため）。
import { useEffect, useState } from "react";
import ProductCards from "@/components/ProductCards";
import { recommendSpike, type SpikeRec } from "@/data/spikeData";
import { SITE_URL } from "@/data/site";

type Key = "speed" | "ankle" | "grip" | "versatile";
type Q = { id: Key; text: string };

const QUESTIONS: Q[] = [
  { id: "speed", text: "スピードと軽さで勝負したい。1歩目で相手を出し抜くのが好きだ" },
  { id: "ankle", text: "ケガは絶対に避けたい。足首はしっかり守りたい" },
  { id: "grip", text: "地面をガッチリ噛む“食いつく”感覚がたまらない" },
  { id: "versatile", text: "あれこれ持ちたくない。1足でどの球場もこなしたい" },
];

export default function SpikeShindan() {
  const [ans, setAns] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<SpikeRec | null>(null);

  const done = QUESTIONS.every((q) => q.id in ans);

  useEffect(() => {
    if (result || !done) return;
    setResult(
      recommendSpike({
        speed: ans.speed === true,
        ankle: ans.ankle === true,
        grip: ans.grip === true,
        versatile: ans.versatile === true,
      })
    );
    setTimeout(
      () => document.getElementById("ss-result")?.scrollIntoView({ behavior: "smooth" }),
      80
    );
  }, [ans, done, result]);

  const answered = Object.keys(ans).length;
  const shareText = result
    ? `⚾スパイク診断⚾\n私に合うのは【${result.name}】でした！`
    : "";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(SITE_URL + "/spikes-shindan/")}&hashtags=${encodeURIComponent(
    "スパイク診断,草野球ナビ"
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
                <button
                  className={`pq-choice ${ans[q.id] === true ? "on" : ""}`}
                  onClick={() => setAns((p) => ({ ...p, [q.id]: true }))}
                >
                  はい
                </button>
                <button
                  className={`pq-choice ${ans[q.id] === false ? "on" : ""}`}
                  onClick={() => setAns((p) => ({ ...p, [q.id]: false }))}
                >
                  いいえ
                </button>
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
        <div className="pq-result" id="ss-result">
          <p className="pq-result-label">あなたに合うスパイクは…</p>
          <p className="pq-name" style={{ fontSize: "clamp(21px, 4.6vw, 32px)" }}>
            {result.name}
          </p>
          <p className="pq-note">{result.reason}</p>

          <div className="pq-gear">
            <p className="pq-gear-head">このスパイクの特徴</p>
            <p className="pq-gear-body">{result.feature}</p>
          </div>

          {result.caution && (
            <p className="player-disc" style={{ textAlign: "left" }}>
              ⚠️ {result.caution}
            </p>
          )}

          <p className="player-disc" style={{ textAlign: "center" }}>
            ※ 4問の簡易診断です。金具スパイクは使用可否がリーグ・球場ごとに違うので、
            購入前に所属先の規定を必ず確認してください。
          </p>

          <div className="share-box">
            <span className="share-label">結果をシェア</span>
            <div className="share-btns">
              <a className="share-btn share-x" href={xUrl} target="_blank" rel="noopener noreferrer">
                Xでシェア
              </a>
            </div>
          </div>

          <ProductCards keyword={result.keyword} heading={`👟 ${result.name}を探す`} />

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
            <a className="cta-inline" href="/spikes/">
              → ソール・カット・メーカーをじっくり比較する
            </a>
            <a className="cta-inline" href="/guide/spikes-guide/">
              → 読む「野球スパイクの選び方」
            </a>
            <a className="cta-inline" href="/baseball-dock/">
              → 全45問の「野球MBTI診断」で道具一式を処方してもらう
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
