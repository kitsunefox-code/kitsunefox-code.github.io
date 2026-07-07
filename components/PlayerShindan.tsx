"use client";

import { useEffect, useRef, useState } from "react";
import ProductCards from "@/components/ProductCards";
import {
  PLAYERS,
  ORDER_MAKERS,
  searchKw,
  type Player,
  type Trait,
} from "@/data/players";
import {
  pickTypeSlug,
  typeBySlug,
  PLAYER_TYPES,
  type PlayerType,
} from "@/data/playerTypes";
import { SITE_URL } from "@/data/site";

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

const FALLBACK_TYPE = PLAYER_TYPES[PLAYER_TYPES.length - 1];

type MatchResult = { ranked: Player[]; type: PlayerType };

function match(a: Record<string, boolean>): MatchResult {
  const score: Partial<Record<Trait, number>> = {};
  for (const q of QUESTIONS) {
    if (a[q.id]) {
      for (const [t, v] of Object.entries(q.w)) {
        score[t as Trait] = (score[t as Trait] || 0) + (v as number);
      }
    }
  }
  // 同スコアはランダムに並べ替え、同じ資質を持つ多彩な選手が出るようにする
  // （「なんでこいつ！」の意外性・リピート性のため）
  const ranked = PLAYERS.map((p) => ({
    p,
    s: p.traits.reduce((sum, t) => sum + (score[t] || 0), 0),
    r: Math.random(),
  }))
    .sort((x, y) => y.s - x.s || y.r - x.r)
    .map((x) => x.p);
  const type = typeBySlug(pickTypeSlug(score)) || FALLBACK_TYPE;
  return { ranked, type };
}

const rakutenSearch = (kw: string) =>
  `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(kw)}/`;

function GearRow({
  label,
  maker,
  model,
  kind,
}: {
  label: string;
  maker?: string;
  model?: string;
  kind: "グローブ" | "バット" | "スパイク";
}) {
  if (!maker) return null;
  const orderable = ORDER_MAKERS.has(maker);
  return (
    <div className="pg-item">
      <span className="pg-k">{label}</span>
      <span className="pg-v">{maker}</span>
      {model && <span className="pg-model">{model}</span>}
      <span className="pg-links">
        <a
          href={rakutenSearch(model || searchKw(maker, kind))}
          target="_blank"
          rel="nofollow sponsored noopener"
        >
          実物を探す
        </a>
        {orderable && (
          <a
            href={rakutenSearch(searchKw(maker, kind, true))}
            target="_blank"
            rel="nofollow sponsored noopener"
          >
            オーダーする
          </a>
        )}
      </span>
    </div>
  );
}

export default function PlayerShindan() {
  const [a, setA] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<MatchResult | null>(null);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const answeredCount = QUESTIONS.filter((q) => q.id in a).length;
  const allAnswered = answeredCount === QUESTIONS.length;
  const visible = QUESTIONS.slice(0, Math.min(answeredCount + 1, QUESTIONS.length));

  useEffect(() => {
    if (allAnswered) {
      setResult(match(a));
      setCopied(false);
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

  const top = result?.ranked?.[0];
  const type = result?.type;
  const alts = result?.ranked?.slice(1, 4) || [];

  const shareUrl = type
    ? `${SITE_URL}/player-shindan/type/${type.slug}/`
    : `${SITE_URL}/player-shindan/`;
  const shareText =
    top && type
      ? `私の野球タイプは【${type.name}】${type.emoji}\n似ているのは${top.name}（${top.league}）！\nあなたは何タイプ？⚾`
      : "";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(
    "草野球ナビ,野球タイプ診断"
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
      /* clipboard 未対応環境は無視 */
    }
  };

  // 実モデルがあればそれを、無ければメーカーのグローブを商品表示
  const primaryKw = top?.gloveModel || top?.productKeyword || "";
  const primaryHeading = top?.gloveModel
    ? `🛒 ${top.name}モデルを探す`
    : `🛒 ${top?.productHeading ?? ""}`;

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

      {top && type && (
        <section id="player-result" ref={ref} style={{ paddingTop: 20 }}>
          <div className="type-hero">
            <span className="type-emoji">{type.emoji}</span>
            <span className="type-kicker">あなたの野球タイプは</span>
            <span className="type-name">{type.name}型</span>
            <span className="type-desc">{type.desc}</span>
            <a className="type-more" href={`/player-shindan/type/${type.slug}/`}>
              「{type.name}型」ってどんなタイプ？→ 解説を見る
            </a>
          </div>

          <h2 className="section-title" style={{ marginTop: 26 }}>
            似ているのはこの選手！
          </h2>
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
              <GearRow label="グローブ" maker={top.glove} model={top.gloveModel} kind="グローブ" />
              <GearRow label="バット" maker={top.bat} model={top.batModel} kind="バット" />
              <GearRow label="スパイク" maker={top.spikes} model={top.spikeModel} kind="スパイク" />
            </div>
            <p className="player-disc">
              ※ 使用ギアは公開情報に基づく参考です（時期・場面により変わることがあります）。
              モデルが手に入らなくても、同じメーカーで<strong>オーダーメイド</strong>という手も。
            </p>

            {/* SNSシェア */}
            <div className="share-box">
              <span className="share-label">結果をシェア</span>
              <div className="share-btns">
                <a
                  className="share-btn share-x"
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  𝕏 でシェア
                </a>
                <a
                  className="share-btn share-line"
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

          <ProductCards keyword={primaryKw} heading={primaryHeading} />

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
