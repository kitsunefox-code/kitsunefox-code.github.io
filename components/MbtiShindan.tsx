"use client";

import { useRef, useState } from "react";
import {
  MBTI_STATEMENTS,
  AXIS_META,
  computeResult,
  mbtiByCode,
  resolvePlayers,
  getCompat,
  MBTI_TYPES,
  type MbtiResult,
  type MbtiType,
} from "@/data/baseballMbti";
import { SITE_URL, rktSearch } from "@/data/site";
import { saveMbtiCode, getSavedTypeSlug } from "@/data/comboLink";

const BATCH = 6;
const TOTAL = MBTI_STATEMENTS.length;
const BATCHES = Math.ceil(TOTAL / BATCH);
// 7段階：左（そう思う）+3 〜 右（そう思わない）-3
const SCALE: { v: number; size: string; tone: "agree" | "neutral" | "disagree" }[] = [
  { v: 3, size: "s3", tone: "agree" },
  { v: 2, size: "s2", tone: "agree" },
  { v: 1, size: "s1", tone: "agree" },
  { v: 0, size: "s0", tone: "neutral" },
  { v: -1, size: "s1", tone: "disagree" },
  { v: -2, size: "s2", tone: "disagree" },
  { v: -3, size: "s3", tone: "disagree" },
];

const FALLBACK = MBTI_TYPES[0];

export default function MbtiShindan() {
  const [ans, setAns] = useState<Record<string, number>>({});
  const [batchIdx, setBatchIdx] = useState(0);
  const [result, setResult] = useState<MbtiResult | null>(null);
  const [copied, setCopied] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const answeredCount = MBTI_STATEMENTS.filter((s) => s.id in ans).length;
  const batch = MBTI_STATEMENTS.slice(batchIdx * BATCH, (batchIdx + 1) * BATCH);
  const batchDone = batch.every((s) => s.id in ans);
  const isLast = batchIdx === BATCHES - 1;
  const progress = Math.round((answeredCount / TOTAL) * 100);

  const pick = (id: string, v: number) => {
    setAns((prev) => {
      const next = { ...prev, [id]: v };
      // 次の未回答へオートスクロール（本家と同じ挙動）
      setTimeout(() => {
        const nextQ = batch.find((s) => s.id !== id && !(s.id in next));
        if (nextQ) {
          itemRefs.current[nextQ.id]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 120);
      return next;
    });
  };

  const goNext = () => {
    if (!batchDone) return;
    if (isLast) {
      const r = computeResult(ans);
      setResult(r);
      saveMbtiCode(r.code);
      setCopied(false);
      setTimeout(
        () => resultRef.current?.scrollIntoView({ behavior: "smooth" }),
        80
      );
    } else {
      setBatchIdx((b) => b + 1);
      setTimeout(
        () => topRef.current?.scrollIntoView({ behavior: "smooth" }),
        60
      );
    }
  };

  const reset = () => {
    setAns({});
    setBatchIdx(0);
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const type: MbtiType | null = result
    ? mbtiByCode(result.code) || FALLBACK
    : null;
  const players = type ? resolvePlayers(type.players) : [];
  const compat = type ? getCompat(type.code) : { best: null, tough: null };
  const savedTypeSlug = type ? getSavedTypeSlug() : null;

  const shareUrl = type
    ? `${SITE_URL}/baseball-mbti/type/${type.code.toLowerCase()}/`
    : `${SITE_URL}/baseball-mbti/`;
  const shareText =
    result && type
      ? `私の野球選手MBTIは【${result.code}｜${type.nickname}】${type.emoji}\n${type.catch}\nあなたのタイプは？⚾`
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

  // メーカー名 → 楽天おすすめ一覧（アフィリエイト）
  const makerLink = (maker: string, kind: string) =>
    rktSearch(maker === "各社" ? "" : maker, kind);

  return (
    <>
      {!result && (
        <>
          <div className="lk-progress" ref={topRef}>
            <span className="lk-progress-label">
              {answeredCount} / {TOTAL} 問（あと{TOTAL - answeredCount}問）
            </span>
            <span className="lk-progress-bar">
              <span className="lk-progress-fill" style={{ width: `${progress}%` }} />
            </span>
          </div>

          {batch.map((s, i) => (
            <div
              className="lk-item"
              key={s.id}
              ref={(el) => {
                itemRefs.current[s.id] = el;
              }}
            >
              <p className="lk-num">Q{batchIdx * BATCH + i + 1}</p>
              <p className="lk-q">{s.text}</p>
              <div className="lk-row">
                <span className="lk-side agree">そう思う</span>
                <div className="lk-scale">
                  {SCALE.map((o) => (
                    <button
                      key={o.v}
                      aria-label={`${o.v > 0 ? "そう思う" : o.v < 0 ? "そう思わない" : "どちらでもない"}(${o.v})`}
                      className={`lk-dot ${o.size} ${o.tone} ${
                        ans[s.id] === o.v ? "active" : ""
                      }`}
                      onClick={() => pick(s.id, o.v)}
                    >
                      {ans[s.id] === o.v ? "✓" : ""}
                    </button>
                  ))}
                </div>
                <span className="lk-side disagree">そう思わない</span>
              </div>
            </div>
          ))}

          <div className="lk-nav">
            <button
              className={`lk-next ${batchDone ? "" : "disabled"}`}
              onClick={goNext}
              disabled={!batchDone}
            >
              {isLast ? "結果を見る" : "次へ →"}（{batchIdx + 1} / {BATCHES}）
            </button>
            {!batchDone && (
              <p className="yn-hint">このページの{batch.length}問すべてに答えると進めます。</p>
            )}
          </div>
        </>
      )}

      {result && type && (
        <section id="mbti-result" ref={resultRef} style={{ paddingTop: 8 }}>
          <div className="type-hero">
            <span className="type-emoji">{type.emoji}</span>
            <span className="type-kicker">あなたの野球選手MBTIは</span>
            <span className="mbti-code">{result.code}</span>
            <span className="type-name">{type.nickname}</span>
            <span className="type-desc">{type.catch}</span>
            <a
              className="type-more"
              href={`/baseball-mbti/type/${type.code.toLowerCase()}/`}
            >
              「{type.code}｜{type.nickname}」ってどんなタイプ？→ 解説を見る
            </a>
          </div>

          {/* 4軸の内訳（%） */}
          <div className="mbti-axes">
            {result.axes.map((a) => {
              const m = AXIS_META[a.axis];
              const leftWin = a.letter === m.left;
              return (
                <div className="mbti-axis2" key={a.axis}>
                  <span className="mbti-axis2-label">{m.label}</span>
                  <div className="mbti-axis2-row">
                    <span className={`mbti-axis-side ${leftWin ? "on" : ""}`}>
                      {m.leftJp} {a.leftPct}%
                    </span>
                    <span className="mbti-axis-bar">
                      <span
                        className="mbti-axis-fill"
                        style={{ width: `${a.leftPct}%` }}
                      />
                    </span>
                    <span className={`mbti-axis-side ${!leftWin ? "on" : ""}`}>
                      {m.rightJp} {a.rightPct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {(compat.best || compat.tough) && (
            <div className="compat-grid" style={{ marginTop: 16 }}>
              {compat.best && (
                <a
                  className="compat-card good"
                  href={`/baseball-mbti/type/${compat.best.type.code.toLowerCase()}/`}
                >
                  <span className="compat-label">◎ 相性の良いタイプ</span>
                  <span className="compat-code">
                    {compat.best.type.emoji} {compat.best.type.code}
                    <span className="compat-nick">{compat.best.type.nickname}</span>
                  </span>
                  <span className="compat-note">{compat.best.note}</span>
                </a>
              )}
              {compat.tough && (
                <a
                  className="compat-card tough"
                  href={`/baseball-mbti/type/${compat.tough.type.code.toLowerCase()}/`}
                >
                  <span className="compat-label">△ 衝突しやすいタイプ</span>
                  <span className="compat-code">
                    {compat.tough.type.emoji} {compat.tough.type.code}
                    <span className="compat-nick">{compat.tough.type.nickname}</span>
                  </span>
                  <span className="compat-note">{compat.tough.note}</span>
                </a>
              )}
            </div>
          )}
          {(compat.best || compat.tough) && (
            <p className="player-disc" style={{ marginTop: 8, textAlign: "center" }}>
              ※ 相性はエンタメとしての組み合わせ診断です。
            </p>
          )}

          {savedTypeSlug ? (
            <a
              className="combo-cta"
              href={`/combo/${type.code.toLowerCase()}/${savedTypeSlug}/`}
            >
              <span className="combo-cta-kicker">選手タイプ診断の結果とマージ</span>
              <span className="combo-cta-title">
                「{type.code}×選手タイプ」の複合診断結果を見る →
              </span>
            </a>
          ) : (
            <a className="combo-cta ghost" href="/player-shindan/">
              <span className="combo-cta-kicker">まだの人はこちらも</span>
              <span className="combo-cta-title">
                「野球選手タイプ診断」もやると、複合診断が見られます →
              </span>
            </a>
          )}

          <article className="player-card" style={{ marginTop: 18 }}>
            <p className="type-long" style={{ margin: 0 }}>
              {type.long}
            </p>

            {players.length > 0 && (
              <>
                <p className="mbti-players-title">このタイプに近い選手</p>
                <div className="type-players">
                  {players.map((p) => (
                    <div className="type-player" key={p.name}>
                      <span
                        className={`player-league sm ${
                          p.league === "MLB" ? "mlb" : "npb"
                        }`}
                      >
                        {p.league}
                      </span>
                      <span className="type-player-name">{p.name}</span>
                      <span className="type-player-pos">{p.position}</span>
                      <span className="type-player-gear">
                        グローブ：
                        <a
                          className="maker-link"
                          href={makerLink(p.glove, "グローブ")}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                        >
                          {p.glove}
                        </a>
                        {p.bat && (
                          <>
                            ／バット：
                            <a
                              className="maker-link"
                              href={makerLink(p.bat, "バット")}
                              target="_blank"
                              rel="nofollow sponsored noopener"
                            >
                              {p.bat}
                            </a>
                          </>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="player-disc" style={{ marginTop: 10 }}>
                  ※ メーカー名をクリックすると、楽天市場のおすすめ一覧（広告）が開きます。
                  使用ギアは公開情報に基づく参考です。
                </p>
              </>
            )}

            <p className="player-disc">
              ※ これはMBTIの考え方を野球に当てはめた<strong>エンタメ診断</strong>
              です。選手の分類は公式のものではありません。
            </p>

            <div className="type-advice-box">
              <span className="type-advice-head">🧰 道具えらびのヒント</span>
              <p>{type.advice}</p>
              <a className="cta-inline" href={type.adviceHref}>
                → {type.adviceCta}
              </a>
            </div>

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

          <div className="bat-links">
            <a className="cta-inline" href="/glove/">
              → グローブのおすすめ・比較一覧を見る
            </a>
            <a className="cta-inline" href="/bat/">
              → バットのおすすめ・比較一覧を見る
            </a>
            <a className="cta-inline" href="/player-shindan/">
              → 「似ている選手」も診断する（選手タイプ診断）
            </a>
          </div>
        </section>
      )}
    </>
  );
}
