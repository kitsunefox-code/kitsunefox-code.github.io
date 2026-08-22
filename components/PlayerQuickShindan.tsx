"use client";

// 「近いタイプのプロ野球選手」10問診断（簡易版）。
//
// ⚠️ 設計方針（誇張しないこと）
//   5問版は各資質への加点が1〜2回しかなく同点が多発 → 実質ランダムだった。
//   10問にして各資質を3回前後カバーし、スコアで差がつくようにしている。
//   それでも「性格を当てる」ものではないので、文言は「近いタイプ」に統一し、
//   結果でも候補を3人出して“1人に断言しない”形にする。
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
  {
    id: "q6",
    q: "できるなら、どこを守りたい？",
    choices: [
      { label: "マウンド（投手）", w: { pitcher: 4, stoic: 1 } },
      { label: "扇の要（捕手）", w: { catcher: 4, leader: 1 } },
      { label: "内野（遊撃・二塁など）", w: { defense: 3, technician: 2 } },
      { label: "外野（広く走り回る）", w: { speed: 3, power: 1 } },
    ],
  },
  {
    id: "q7",
    q: "打席で狙っているのは？",
    choices: [
      { label: "とにかく長打・一発", w: { power: 4 } },
      { label: "確実にミートして出塁", w: { contact: 4 } },
      { label: "ランナーを還す一打", w: { clutch: 3, leader: 1 } },
      { label: "内野安打でも塁に出る", w: { speed: 3, contact: 1 } },
    ],
  },
  {
    id: "q8",
    q: "注目されるのは好き？",
    choices: [
      { label: "大好き。目立ってこそ", w: { star: 3, flashy: 2 } },
      { label: "派手なプレーで沸かせたい", w: { flashy: 3, speed: 1 } },
      { label: "陰で支える方が性に合う", w: { stoic: 3, defense: 2 } },
      { label: "結果さえ出れば気にしない", w: { technician: 2, contact: 2 } },
    ],
  },
  {
    id: "q9",
    q: "自分の強みに近いのは？",
    choices: [
      { label: "パワー・体格", w: { power: 3, star: 1 } },
      { label: "スピード・俊敏さ", w: { speed: 3, defense: 1 } },
      { label: "器用さ・技術", w: { technician: 3, contact: 1 } },
      { label: "粘り強さ・スタミナ", w: { stoic: 3, pitcher: 1 } },
    ],
  },
  {
    id: "q10",
    q: "野球のどこがいちばん楽しい？",
    choices: [
      { label: "仲間と勝ちを分かち合うこと", w: { leader: 3, catcher: 1 } },
      { label: "自分の成長を感じること", w: { stoic: 2, technician: 2 } },
      { label: "しびれる場面での駆け引き", w: { clutch: 3, pitcher: 1 } },
      { label: "できることが増えていくこと", w: { twoway: 3, contact: 1 } },
    ],
  },
];

// スコア上位の候補を返す（1位＋別候補2人）
function rankPlayers(answers: Record<string, number>): { top: Player; others: Player[] } {
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
    r: Math.random(), // 同点内での並びだけをランダムにする
  })).sort((a, b) => b.s - a.s || b.r - a.r);
  return { top: ranked[0].p, others: ranked.slice(1, 4).map((x) => x.p) };
}

export default function PlayerQuickShindan() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ top: Player; others: Player[] } | null>(null);
  const [copied, setCopied] = useState(false);

  const done = QUESTIONS.every((q) => q.id in answers);
  const answered = Object.keys(answers).length;

  const pick = (qid: string, idx: number) => {
    const next = { ...answers, [qid]: idx };
    setAnswers(next);
    if (QUESTIONS.every((q) => q.id in next)) {
      setResult(rankPlayers(next));
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
    ? `⚾野球選手タイプ診断⚾\n私に近いのは【${result.top.name}】タイプでした！（${result.top.league}・${result.top.position}）\n10問であなたに近いタイプの選手がわかります↓`
    : "";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent("野球選手タイプ診断,草野球ナビ")}`;
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
              10問すべて選ぶと、その場で結果が出ます。
            </p>
          )}
        </>
      )}

      {result && (
        <div className="pq-result" id="pq-result">
          <p className="pq-result-label">あなたに近いタイプの選手は…</p>
          <div className="pq-hero">
            <PlayerArt player={result.top} className="dv-art" />
            <span className={`mbig-league ${result.top.league === "MLB" ? "mlb" : "npb"}`}>
              {result.top.league}
            </span>
            <span className="pq-name">{result.top.name}</span>
            <span className="pq-pos">{result.top.position}</span>
          </div>
          <p className="pq-note">{result.top.note}</p>

          {result.others.length > 0 && (
            <div className="pq-others">
              <p className="pq-others-head">同じくらい近い候補</p>
              <p className="pq-others-body">
                {result.others.map((p) => `${p.name}（${p.position}）`).join("・")}
              </p>
            </div>
          )}

          <p className="player-disc" style={{ textAlign: "center" }}>
            ※ プレースタイルの傾向が近い選手を選ぶ簡易診断です（性格や実力を判定するものではありません）。
            イラストはイメージで、ご本人の肖像ではありません。
          </p>

          <div className="pq-gear">
            <p className="pq-gear-head">{result.top.name}の使用ギア</p>
            <p className="pq-gear-body">
              グローブ＝
              <a
                className="maker-link"
                href={rktSearch(result.top.glove === "各社" ? "" : result.top.glove, "グローブ")}
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                {result.top.gloveModel || result.top.glove}
              </a>
              {result.top.bat && (
                <>
                  ／バット＝
                  <a
                    className="maker-link"
                    href={rktSearch(result.top.bat === "各社" ? "" : result.top.bat, "バット")}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                  >
                    {result.top.batModel || result.top.bat}
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
            keyword={result.top.productKeyword}
            heading={`🛒 ${result.top.name}が使う「${result.top.glove}」のグローブを見る`}
          />

          <button className="stats-clear" onClick={reset}>
            もう一度診断する
          </button>

          <div className="bat-links">
            <a className="cta-inline" href="/baseball-dock/">
              → 本格的に診断するなら：全45問の「野球MBTI診断」（性格タイプ＋道具の処方まで）
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
