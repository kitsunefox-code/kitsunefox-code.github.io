"use client";

// バッティンググローブ診断（/batting-gloves-shindan/）。
// 既存の recommendBglove を再利用。木製バット派・グリップ最優先の人には
// 「アメフト用グローブ流用」という裏技も結果に出す（元々ドックにある知見）。
// ⚠️ 判定は useEffect で回答の変化を見る（setState は同期反映されないため）。
import { useEffect, useState } from "react";
import ProductCards from "@/components/ProductCards";
import { recommendBglove, type BgloveRec } from "@/data/bgloveData";
import { SITE_URL } from "@/data/site";

type Key = "wood" | "grip" | "value" | "fit";
type Q = { id: Key; text: string };

const QUESTIONS: Q[] = [
  { id: "wood", text: "打感や“本物”の質感にこだわる。木のバットにも惹かれる" },
  { id: "grip", text: "とにかく滑らないことが最優先。握りがズレるのが嫌だ" },
  { id: "value", text: "消耗品にお金はかけない。コスパ最優先の現実派だ" },
  { id: "fit", text: "手に吸いつくフィット感・肌ざわりにこだわる方だ" },
];

export default function BgloveShindan() {
  const [ans, setAns] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<BgloveRec | null>(null);

  const done = QUESTIONS.every((q) => q.id in ans);

  useEffect(() => {
    if (result || !done) return;
    setResult(
      recommendBglove({
        wood: ans.wood === true,
        grip: ans.grip === true,
        value: ans.value === true,
        fit: ans.fit === true,
      })
    );
    setTimeout(
      () => document.getElementById("bg-result")?.scrollIntoView({ behavior: "smooth" }),
      80
    );
  }, [ans, done, result]);

  const answered = Object.keys(ans).length;
  const shareText = result
    ? `⚾バッティンググローブ診断⚾\n私に合うのは【${result.name}】でした！`
    : "";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(SITE_URL + "/batting-gloves-shindan/")}&hashtags=${encodeURIComponent(
    "バッティンググローブ診断,草野球ナビ"
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
        <div className="pq-result" id="bg-result">
          <p className="pq-result-label">あなたに合うバッティンググローブは…</p>
          <p className="pq-name" style={{ fontSize: "clamp(21px, 4.6vw, 32px)" }}>
            {result.name}
          </p>
          <p className="pq-pos">代表ブランド：{result.makerHint}</p>
          <p className="pq-note">{result.reason}</p>

          <div className="pq-gear">
            <p className="pq-gear-head">このタイプの特徴</p>
            <p className="pq-gear-body">{result.feature}</p>
          </div>

          {result.hack && (
            <div className="pq-gear">
              <p className="pq-gear-head">🏈 裏技</p>
              <p className="pq-gear-body">{result.hack}</p>
            </div>
          )}

          <p className="player-disc" style={{ textAlign: "center" }}>
            ※ 4問の簡易診断です。サイズは必ず実寸を確認してください（きつすぎると手が痛くなります）。
          </p>

          <div className="share-box">
            <span className="share-label">結果をシェア</span>
            <div className="share-btns">
              <a className="share-btn share-x" href={xUrl} target="_blank" rel="noopener noreferrer">
                Xでシェア
              </a>
            </div>
          </div>

          <ProductCards keyword={result.keyword} heading={`🧤 ${result.name}を探す`} />

          {result.hackKeyword && (
            <ProductCards
              keyword={result.hackKeyword}
              heading="🏈 【裏技】グリップ最強のアメフト用グローブを流用する"
            />
          )}

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
            <a className="cta-inline" href="/batting-gloves/">
              → ブランド・価格帯をじっくり比較する
            </a>
            <a className="cta-inline" href="/guide/grip-tape/">
              → あわせて読む「バットのグリップテープ」
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
