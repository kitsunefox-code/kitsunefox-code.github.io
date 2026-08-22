"use client";

// 「あなたに似ているプロ野球選手」5問診断（軽量版）。
// 45問の野球人間ドックは重いので、その入口として最短で結果に到達できるようにする。
// 判定は既存の資質(Trait)ベース：各選択肢が資質に加点し、収録657名との内積で最も近い1人を選ぶ。
import { useState } from "react";
import PlayerArt from "@/components/PlayerArt";
import ProductCards from "@/components/ProductCards";
import { PLAYERS, type Player, type Trait } from "@/data/players";
import { SITE_URL, rktSearch } from "@/data/site";

type Choice = { label: string; w: Partial<Record<Trait, number>> };
type Question = { id: string; q: string; choices: Choice[] };

const QUESTIONS: Question[] = [
  {
    id: "q1",
    q: "試合で「これぞ自分」と思える瞬間は？",
    choices: [
      { label: "打球を遠くへ飛ばした時", w: { power: 3, star: 1 } },
      { label: "際どい打球を捕った時", w: { defense: 3, technician: 1 } },
      { label: "三振を奪った時", w: { pitcher: 3, technician: 1 } },
      { label: "足で塁を陥れた時", w: { speed: 3, contact: 1 } },
    ],
  },
  {
    id: "q2",
    q: "チームの中でのあなたは？",
    choices: [
      { label: "声を出して引っ張る", w: { leader: 3, catcher: 1 } },
      { label: "黙々と自分の役割を果たす", w: { stoic: 3, defense: 1 } },
      { label: "ムードを明るくする", w: { flashy: 2, star: 2 } },
      { label: "考えて作戦を立てる", w: { technician: 3, catcher: 1 } },
    ],
  },
  {
    id: "q3",
    q: "9回裏、同点で2アウト満塁。あなたは？",
    choices: [
      { label: "打席に立ちたい", w: { clutch: 3, power: 1 } },
      { label: "マウンドに立ちたい", w: { pitcher: 3, clutch: 1 } },
      { label: "守備で締めたい", w: { defense: 3, catcher: 1 } },
      { label: "代走で引っかき回したい", w: { speed: 3, flashy: 1 } },
    ],
  },
  {
    id: "q4",
    q: "練習に対するスタンスは？",
    choices: [
      { label: "とにかく量をこなす", w: { stoic: 3, power: 1 } },
      { label: "動画や理論で研究する", w: { technician: 3 } },
      { label: "実戦で試して覚える", w: { clutch: 2, flashy: 1 } },
      { label: "楽しみながら続ける", w: { contact: 2, star: 1 } },
    ],
  },
  {
    id: "q5",
    q: "憧れるのはどんな選手？",
    choices: [
      { label: "誰もが知るスター", w: { star: 3, power: 1 } },
      { label: "投打で二刀流", w: { twoway: 4, pitcher: 1 } },
      { label: "守備の名手", w: { defense: 3, technician: 1 } },
      { label: "職人肌の巧打者", w: { contact: 3, technician: 1 } },
    ],
  },
];

function matchPlayer(answers: Record<string, number>): Player {
  const w: Partial<Record<Trait, number>> = {};
  for (const q of QUESTIONS) {
    const idx = answers[q.id];
    if (idx === undefined) continue;
    for (const [t, n] of Object.entries(q.choices[idx].w)) {
      w[t as Trait] = (w[t as Trait] || 0) + (n as number);
    }
  }
  const ranked = PLAYERS.map((p) => ({
    p,
    s: p.traits.reduce((sum, t) => sum + (w[t] || 0), 0),
    r: Math.random(), // 同点は毎回変えて意外性を出す
  })).sort((a, b) => b.s - a.s || b.r - a.r);
  return ranked[0].p;
}

export default function PlayerQuickShindan() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Player | null>(null);
  const [copied, setCopied] = useState(false);

  const done = QUESTIONS.every((q) => q.id in answers);
  const answered = Object.keys(answers).length;

  const pick = (qid: string, idx: number) => {
    const next = { ...answers, [qid]: idx };
    setAnswers(next);
    if (QUESTIONS.every((q) => q.id in next)) {
      setResult(matchPlayer(next));
      setTimeout(() => document.getElementById("pq-result")?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  };

  const reset = () => {
    setAnswers({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareUrl = `${SITE_URL}/similar-player/`;
  const shareText = result
    ? `⚾似ているプロ野球選手診断⚾\n私は【${result.name}】タイプでした！（${result.league}・${result.position}）\nたった5問であなたに一番近い選手がわかります↓`
    : "";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent("似ているプロ野球選手診断,草野球ナビ")}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

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
              <p className="pq-q">{q.q}</p>
              <div className="pq-choices">
                {q.choices.map((c, ci) => (
                  <button
                    key={c.label}
                    className={`pq-choice ${answers[q.id] === ci ? "on" : ""}`}
                    onClick={() => pick(q.id, ci)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {!done && (
            <p className="yn-hint" style={{ textAlign: "center" }}>
              5問すべて選ぶと、その場で結果が出ます。
            </p>
          )}
        </>
      )}

      {result && (
        <div className="pq-result" id="pq-result">
          <p className="pq-result-label">あなたに似ているプロ野球選手は…</p>
          <div className="pq-hero">
            <PlayerArt player={result} className="dv-art" />
            <span className={`mbig-league ${result.league === "MLB" ? "mlb" : "npb"}`}>
              {result.league}
            </span>
            <span className="pq-name">{result.name}</span>
            <span className="pq-pos">{result.position}</span>
          </div>
          <p className="pq-note">{result.note}</p>
          <p className="player-disc" style={{ textAlign: "center" }}>
            ※ イラストはイメージです（ご本人の肖像ではありません）。
          </p>

          <div className="pq-gear">
            <p className="pq-gear-head">{result.name}の使用ギア</p>
            <p className="pq-gear-body">
              グローブ＝
              <a
                className="maker-link"
                href={rktSearch(result.glove === "各社" ? "" : result.glove, "グローブ")}
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                {result.gloveModel || result.glove}
              </a>
              {result.bat && (
                <>
                  ／バット＝
                  <a
                    className="maker-link"
                    href={rktSearch(result.bat === "各社" ? "" : result.bat, "バット")}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                  >
                    {result.batModel || result.bat}
                  </a>
                </>
              )}
            </p>
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
              <button
                className="share-btn share-copy"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch {
                    /* noop */
                  }
                }}
              >
                {copied ? "コピーしました！" : "結果をコピー"}
              </button>
            </div>
          </div>

          <ProductCards
            keyword={result.productKeyword}
            heading={`🛒 ${result.name}が使う「${result.glove}」のグローブを見る`}
          />

          <button className="stats-clear" onClick={reset}>
            もう一度診断する
          </button>

          <div className="bat-links">
            <a className="cta-inline" href="/baseball-dock/">
              → もっと本格的に：全45問の「野球MBTI診断」で性格タイプ＋道具の処方まで
            </a>
            <a className="cta-inline" href="/players/">
              → 収録{PLAYERS.length}名の使用ギア一覧を見る
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
