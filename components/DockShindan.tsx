"use client";

// 野球人間ドック：こころ(MBTI)・プレースタイル・バット・グローブを
// 一度に受診するフル診断。結果は「検査結果報告書（カルテ）」形式で出す。
import { useRef, useState } from "react";
import ProductCards from "@/components/ProductCards";
import { renderDockCard, canvasToBlob, type DockCardData } from "@/lib/dockCard";
import TypeIcon from "@/components/TypeIcon";
import {
  MBTI_STATEMENTS,
  AXIS_META,
  mbtiByCode,
  getCompat,
  type Axis,
  type MbtiType,
} from "@/data/baseballMbti";
import {
  pickTypeSlug,
  typeBySlug,
  type PlayerType,
} from "@/data/playerTypes";
import { PLAYERS, type Player, type Trait } from "@/data/players";
import { pickBatModel, BAT_MATERIAL_INFO, type BatMaterial, type BatModel } from "@/data/batData";
import { recommendWeb, type WebType } from "@/data/gloveData";
import { SITE_URL, rktSearch } from "@/data/site";
import { saveMbtiCode, saveTypeSlug } from "@/data/comboLink";

/* ── 検査1: こころ（MBTI・12問7段階） ─────────────── */
const MBTI_Q = MBTI_STATEMENTS.slice(0, 12); // 各軸3問（逆転項目入り）
const SCALE: { v: number; size: string; tone: "agree" | "neutral" | "disagree" }[] = [
  { v: 3, size: "s3", tone: "agree" },
  { v: 2, size: "s2", tone: "agree" },
  { v: 1, size: "s1", tone: "agree" },
  { v: 0, size: "s0", tone: "neutral" },
  { v: -1, size: "s1", tone: "disagree" },
  { v: -2, size: "s2", tone: "disagree" },
  { v: -3, size: "s3", tone: "disagree" },
];

type DockAxis = { axis: Axis; letter: string; leftPct: number; rightPct: number };
function computeDockMbti(ans: Record<string, number>): { code: string; axes: DockAxis[] } {
  const axes = (Object.keys(AXIS_META) as Axis[]).map((axis) => {
    const qs = MBTI_Q.filter((s) => s.axis === axis);
    let sum = 0;
    for (const s of qs) {
      const v = ans[s.id] ?? 0;
      sum += s.dir === "L" ? v : -v;
    }
    const max = qs.length * 3;
    const leftPct = Math.round(((sum + max) / (2 * max)) * 100);
    const m = AXIS_META[axis];
    return { axis, letter: sum >= 0 ? m.left : m.right, leftPct, rightPct: 100 - leftPct };
  });
  return { code: axes.map((a) => a.letter).join(""), axes };
}

/* ── 検査2: プレースタイル（12問YES/NO） ─────────────── */
const PLAY_Q: { id: string; text: string; w: Partial<Record<Trait, number>> }[] = [
  { id: "p1", text: "一発の長打で試合を決めるのが快感だ", w: { power: 2, clutch: 1 } },
  { id: "p2", text: "守備でチームを救うのが好きだ", w: { defense: 3 } },
  { id: "p3", text: "足（盗塁・走塁）で流れを変えたい", w: { speed: 3 } },
  { id: "p4", text: "コツコツ当てて出塁するのが得意だ", w: { contact: 3 } },
  { id: "p5", text: "みんなを引っ張るリーダータイプだ", w: { leader: 3 } },
  { id: "p6", text: "派手なプレーで目立つのが好きだ", w: { flashy: 2, star: 2 } },
  { id: "p7", text: "データ・研究で上達するのが好きだ", w: { technician: 2, stoic: 1 } },
  { id: "p8", text: "打つよりマウンドで投げる方が好きだ", w: { pitcher: 4 } },
  { id: "p9", text: "地道な努力をコツコツ続けられる", w: { stoic: 3 } },
  { id: "p10", text: "プレッシャーのかかる場面ほど燃える", w: { clutch: 3 } },
  { id: "p11", text: "キャッチャーとして試合を組み立てたい", w: { catcher: 4 } },
  { id: "p12", text: "投打の“二刀流”に憧れる", w: { twoway: 4, power: 1, pitcher: 1 } },
];

function computePlay(a: Record<string, boolean>): { type: PlayerType; top: Player } {
  const score: Partial<Record<Trait, number>> = {};
  for (const q of PLAY_Q) {
    if (a[q.id]) {
      for (const [t, v] of Object.entries(q.w)) {
        score[t as Trait] = (score[t as Trait] || 0) + (v as number);
      }
    }
  }
  const ranked = PLAYERS.map((p) => ({
    p,
    s: p.traits.reduce((sum, t) => sum + (score[t] || 0), 0),
    r: Math.random(),
  }))
    .sort((x, y) => y.s - x.s || y.r - x.r)
    .map((x) => x.p);
  const type = typeBySlug(pickTypeSlug(score))!;
  return { type, top: ranked[0] };
}

/* ── 検査3: バット適性（4問YES/NO） ─────────────── */
const BAT_Q: { id: string; text: string }[] = [
  { id: "b1", text: "何より「飛距離」を最優先したい" },
  { id: "b2", text: "バットに2万円以上かけてもいい" },
  { id: "b3", text: "パワー・力には自信がある方だ" },
  { id: "b4", text: "どうせなら最新モデルを使いたい" },
];
function computeBat(a: Record<string, boolean>): { material: BatMaterial; model: BatModel } {
  const material: BatMaterial =
    a.b1 && a.b2 ? "beyond" : a.b2 || a.b3 ? "carbon" : "metal";
  return { material, model: pickBatModel(material, { latest: !!a.b4, power: !!a.b3 }) };
}

/* ── 検査4: グローブ適性（2問choice） ─────────────── */
const POS_OPTS = [
  { v: "pitcher", label: "投手" },
  { v: "infield", label: "内野" },
  { v: "outfield", label: "外野" },
  { v: "catcher", label: "捕手" },
  { v: "allround", label: "未定・どこでも" },
] as const;
const STYLE_OPTS = [
  { v: "quick", label: "軽快に速くさばきたい" },
  { v: "solid", label: "しっかり受け止めたい" },
] as const;
const POS_JP: Record<string, string> = {
  pitcher: "投手",
  infield: "内野",
  outfield: "外野",
  catcher: "捕手",
  allround: "オールラウンド",
};

type Stage = "intro" | "mbti" | "play" | "bat" | "glove" | "result";
type DockResult = {
  mbti: { code: string; axes: DockAxis[]; type: MbtiType };
  play: { type: PlayerType; top: Player };
  bat: { material: BatMaterial; model: BatModel };
  glove: { pos: string; web: WebType; reason: string };
};

const CHAPTERS: { key: Stage; no: string; title: string; desc: string; count: number }[] = [
  { key: "mbti", no: "第一検査", title: "こころ", desc: "7段階で答える性格検査（12問）", count: 12 },
  { key: "play", no: "第二検査", title: "プレースタイル", desc: "はい／いいえの適性検査（12問）", count: 12 },
  { key: "bat", no: "第三検査", title: "バット適性", desc: "相棒バットの処方（4問）", count: 4 },
  { key: "glove", no: "第四検査", title: "グローブ適性", desc: "相棒グローブの処方（2問）", count: 2 },
];
const TOTAL_Q = 30;

export default function DockShindan() {
  const [stage, setStage] = useState<Stage>("intro");
  const [mbtiAns, setMbtiAns] = useState<Record<string, number>>({});
  const [playAns, setPlayAns] = useState<Record<string, boolean>>({});
  const [batAns, setBatAns] = useState<Record<string, boolean>>({});
  const [pos, setPos] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [result, setResult] = useState<DockResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [cardState, setCardState] = useState<"idle" | "busy" | "done">("idle");
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const answered =
    Object.keys(mbtiAns).length +
    Object.keys(playAns).length +
    Object.keys(batAns).length +
    (pos ? 1 : 0) +
    (style ? 1 : 0);
  const progress = Math.round((answered / TOTAL_Q) * 100);

  const mbtiDone = MBTI_Q.every((q) => q.id in mbtiAns);
  const playDone = PLAY_Q.every((q) => q.id in playAns);
  const batDone = BAT_Q.every((q) => q.id in batAns);
  const gloveDone = !!pos && !!style;

  const scrollTop = () =>
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 60);

  const go = (s: Stage) => {
    setStage(s);
    scrollTop();
  };

  const finish = () => {
    const m = computeDockMbti(mbtiAns);
    const mbtiType = mbtiByCode(m.code)!;
    const play = computePlay(playAns);
    const bat = computeBat(batAns);
    const g = recommendWeb(pos as never, style as never);
    saveMbtiCode(m.code);
    saveTypeSlug(play.type.slug);
    setResult({
      mbti: { ...m, type: mbtiType },
      play,
      bat,
      glove: { pos: pos!, web: g.web, reason: g.reason },
    });
    setStage("result");
    scrollTop();
  };

  const reset = () => {
    setMbtiAns({});
    setPlayAns({});
    setBatAns({});
    setPos(null);
    setStyle(null);
    setResult(null);
    setCardUrl(null);
    setCardState("idle");
    setStage("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const compat = result ? getCompat(result.mbti.code) : { best: null, tough: null };

  const shareUrl = `${SITE_URL}/baseball-dock/`;
  const shareText = result
    ? `野球人間ドック、受けてきた。\n判定は【${result.mbti.code}×${result.play.type.name}】タイプ。\n処方は バット＝${result.bat.model.name}／グローブ＝${result.glove.web.name}。\nあなたも受診してみる？⚾`
    : "";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent("草野球ナビ,野球人間ドック")}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const makerLink = (maker: string, kind: string) =>
    rktSearch(maker === "各社" ? "" : maker, kind);

  // 検査結果報告書を1枚のカード画像にして保存／シェア
  const saveCard = async () => {
    if (!result || cardState === "busy") return;
    setCardState("busy");
    try {
      const cardData: DockCardData = {
        code: result.mbti.code,
        mbtiNickname: result.mbti.type.nickname,
        mbtiIcon: result.mbti.type.icon,
        mbtiCatch: result.mbti.type.catch,
        axes: result.mbti.axes.map((a) => ({
          leftJp: AXIS_META[a.axis].leftJp,
          rightJp: AXIS_META[a.axis].rightJp,
          leftPct: a.leftPct,
          letterLeft: a.letter === AXIS_META[a.axis].left,
        })),
        playName: result.play.type.name,
        playIcon: result.play.type.icon,
        playDesc: result.play.type.desc,
        similarPlayer: result.play.top.name,
        similarMeta: `${result.play.top.league}・${result.play.top.position}`,
        batModel: result.bat.model.name,
        batMeta: `${result.bat.model.maker}／${BAT_MATERIAL_INFO[result.bat.material].label}`,
        gloveWeb: result.glove.web.name,
        glovePos: `${POS_JP[result.glove.pos]}向け`,
      };
      const canvas = await renderDockCard(cardData);
      setCardUrl(canvas.toDataURL("image/png")); // プレビュー表示
      const blob = await canvasToBlob(canvas);
      if (!blob) throw new Error("blob failed");
      const fileName = `野球人間ドック_${result.mbti.code}×${result.play.type.name}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      // Web Share API（対応端末＝スマホ中心）で画像ごとシェア
      const nav = navigator as Navigator & {
        canShare?: (d: { files: File[] }) => boolean;
      };
      if (nav.canShare && nav.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({
          files: [file],
          text: shareText,
        });
      } else {
        // 非対応＝PC等：ダウンロード
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      }
      setCardState("done");
      setTimeout(() => setCardState("idle"), 2500);
    } catch {
      setCardState("idle");
    }
  };

  const chapterHead = (key: Stage) => {
    const c = CHAPTERS.find((x) => x.key === key)!;
    const idx = CHAPTERS.findIndex((x) => x.key === key);
    return (
      <div className="dock-ch-head">
        <span className="dock-ch-no">{c.no}</span>
        <h2 className="dock-ch-ttl">{c.title}</h2>
        <span className="dock-ch-step">
          {idx + 1} / {CHAPTERS.length}
        </span>
      </div>
    );
  };

  return (
    <div ref={topRef}>
      {stage !== "intro" && stage !== "result" && (
        <div className="lk-progress">
          <span className="lk-progress-label">
            全{TOTAL_Q}問中 {answered}問 完了
          </span>
          <span className="lk-progress-bar">
            <span className="lk-progress-fill" style={{ width: `${progress}%` }} />
          </span>
        </div>
      )}

      {/* ── 受付 ── */}
      {stage === "intro" && (
        <div className="dock-intro">
          <p className="dock-intro-lead">
            性格・プレースタイル・道具の適性を、一度にまとめてフル検査。
            所要時間はおよそ4分。検査後に「検査結果報告書」をお渡しします。
          </p>
          <div className="dock-menu">
            {CHAPTERS.map((c) => (
              <div className="dock-menu-row" key={c.key}>
                <span className="dock-menu-no">{c.no}</span>
                <span className="dock-menu-ttl">{c.title}</span>
                <span className="dock-menu-desc">{c.desc}</span>
              </div>
            ))}
          </div>
          <button className="btn-ink dock-start" onClick={() => go("mbti")}>
            受付をすませて検査をはじめる
          </button>
          <p className="player-disc" style={{ textAlign: "center" }}>
            ※ 医療とは関係のない、野球のためのエンタメ診断です。登録不要・無料。
          </p>
        </div>
      )}

      {/* ── 第一検査: こころ（7段階×12） ── */}
      {stage === "mbti" && (
        <>
          {chapterHead("mbti")}
          {MBTI_Q.map((s, i) => (
            <div className="lk-item" key={s.id}>
              <p className="lk-num">Q{i + 1}</p>
              <p className="lk-q">{s.text}</p>
              <div className="lk-row">
                <span className="lk-side agree">そう思う</span>
                <div className="lk-scale">
                  {SCALE.map((o) => (
                    <button
                      key={o.v}
                      aria-label={`${o.v > 0 ? "そう思う" : o.v < 0 ? "そう思わない" : "どちらでもない"}(${o.v})`}
                      className={`lk-dot ${o.size} ${o.tone} ${mbtiAns[s.id] === o.v ? "active" : ""}`}
                      onClick={() => setMbtiAns((p) => ({ ...p, [s.id]: o.v }))}
                    >
                      {mbtiAns[s.id] === o.v ? "✓" : ""}
                    </button>
                  ))}
                </div>
                <span className="lk-side disagree">そう思わない</span>
              </div>
            </div>
          ))}
          <div className="lk-nav">
            <button className={`lk-next ${mbtiDone ? "" : "disabled"}`} disabled={!mbtiDone} onClick={() => go("play")}>
              第二検査へすすむ →
            </button>
            {!mbtiDone && <p className="yn-hint">12問すべてに答えると進めます。</p>}
          </div>
        </>
      )}

      {/* ── 第二検査: プレースタイル（YES/NO×12） ── */}
      {stage === "play" && (
        <>
          {chapterHead("play")}
          {PLAY_Q.map((q, i) => (
            <div className="shindan-step" key={q.id}>
              <h3 className="dock-q">
                <span className="step-num">{i + 1}</span>
                {q.text}
              </h3>
              <div className="yn-grid">
                <button
                  className={`yn-btn yn-yes ${playAns[q.id] === true ? "active" : ""}`}
                  onClick={() => setPlayAns((p) => ({ ...p, [q.id]: true }))}
                >
                  はい
                </button>
                <button
                  className={`yn-btn yn-no ${playAns[q.id] === false ? "active" : ""}`}
                  onClick={() => setPlayAns((p) => ({ ...p, [q.id]: false }))}
                >
                  いいえ
                </button>
              </div>
            </div>
          ))}
          <div className="lk-nav">
            <button className={`lk-next ${playDone ? "" : "disabled"}`} disabled={!playDone} onClick={() => go("bat")}>
              第三検査へすすむ →
            </button>
            {!playDone && <p className="yn-hint">12問すべてに答えると進めます。</p>}
          </div>
        </>
      )}

      {/* ── 第三検査: バット適性（YES/NO×4） ── */}
      {stage === "bat" && (
        <>
          {chapterHead("bat")}
          {BAT_Q.map((q, i) => (
            <div className="shindan-step" key={q.id}>
              <h3 className="dock-q">
                <span className="step-num">{i + 1}</span>
                {q.text}
              </h3>
              <div className="yn-grid">
                <button
                  className={`yn-btn yn-yes ${batAns[q.id] === true ? "active" : ""}`}
                  onClick={() => setBatAns((p) => ({ ...p, [q.id]: true }))}
                >
                  はい
                </button>
                <button
                  className={`yn-btn yn-no ${batAns[q.id] === false ? "active" : ""}`}
                  onClick={() => setBatAns((p) => ({ ...p, [q.id]: false }))}
                >
                  いいえ
                </button>
              </div>
            </div>
          ))}
          <div className="lk-nav">
            <button className={`lk-next ${batDone ? "" : "disabled"}`} disabled={!batDone} onClick={() => go("glove")}>
              最終検査へすすむ →
            </button>
            {!batDone && <p className="yn-hint">4問すべてに答えると進めます。</p>}
          </div>
        </>
      )}

      {/* ── 第四検査: グローブ適性（選択×2） ── */}
      {stage === "glove" && (
        <>
          {chapterHead("glove")}
          <div className="shindan-step">
            <h3 className="dock-q">
              <span className="step-num">1</span>
              守りたいポジションは？
            </h3>
            <div className="dock-choice">
              {POS_OPTS.map((o) => (
                <button
                  key={o.v}
                  className={`ab-btn ${pos === o.v ? "active" : ""}`}
                  onClick={() => setPos(o.v)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div className="shindan-step">
            <h3 className="dock-q">
              <span className="step-num">2</span>
              守備のスタイルは？
            </h3>
            <div className="dock-choice two">
              {STYLE_OPTS.map((o) => (
                <button
                  key={o.v}
                  className={`ab-btn ${style === o.v ? "active" : ""}`}
                  onClick={() => setStyle(o.v)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div className="lk-nav">
            <button className={`lk-next ${gloveDone ? "" : "disabled"}`} disabled={!gloveDone} onClick={finish}>
              検査を終えて結果を見る →
            </button>
            {!gloveDone && <p className="yn-hint">2問に答えると結果が出ます。</p>}
          </div>
        </>
      )}

      {/* ── 検査結果報告書 ── */}
      {stage === "result" && result && (
        <section className="dock-report">
          <div className="dock-report-head">
            <div>
              <p className="dock-report-en">MEDICAL-STYLE REPORT — BUT FOR BASEBALL</p>
              <h2 className="dock-report-ttl">検査結果報告書</h2>
              <p className="dock-report-sub">野球人間ドック｜草野球ナビ検定</p>
            </div>
            <div className="dock-stamp" aria-hidden="true">
              <span>草野球ナビ</span>
              <span>検定済</span>
            </div>
          </div>

          {/* 総合判定 */}
          <div className="dock-verdict">
            <span className="dock-verdict-label">総合判定</span>
            <span className="dock-verdict-value">
              {result.mbti.code}×{result.play.type.name}
            </span>
            <a className="cta-inline" href={`/combo/${result.mbti.code.toLowerCase()}/${result.play.type.slug}/`}>
              → この複合タイプの詳しい解説を読む
            </a>
          </div>

          {/* 1. こころ */}
          <div className="dock-row">
            <div className="dock-row-head">
              <span className="dock-row-no">01</span>
              <span className="dock-row-ttl">こころ（性格型）</span>
            </div>
            <div className="dock-row-body">
              <p className="dock-row-main">
                <TypeIcon icon={result.mbti.type.icon} className="dock-icon" />
                <strong>{result.mbti.code}</strong>「{result.mbti.type.nickname}」
              </p>
              <p className="dock-row-note">{result.mbti.type.catch}</p>
              <div className="mbti-axes" style={{ marginTop: 12 }}>
                {result.mbti.axes.map((a) => {
                  const m = AXIS_META[a.axis];
                  const leftWin = a.letter === m.left;
                  return (
                    <div className="mbti-axis2" key={a.axis}>
                      <div className="mbti-axis2-row">
                        <span className={`mbti-axis-side ${leftWin ? "on" : ""}`}>
                          {m.leftJp} {a.leftPct}%
                        </span>
                        <span className="mbti-axis-bar">
                          <span className="mbti-axis-fill" style={{ width: `${a.leftPct}%` }} />
                        </span>
                        <span className={`mbti-axis-side ${!leftWin ? "on" : ""}`}>
                          {m.rightJp} {a.rightPct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <a className="cta-inline" href={`/baseball-mbti/type/${result.mbti.code.toLowerCase()}/`}>
                → {result.mbti.code}型の解説（相性・あるある）を見る
              </a>
            </div>
          </div>

          {/* 2. プレースタイル */}
          <div className="dock-row">
            <div className="dock-row-head">
              <span className="dock-row-no">02</span>
              <span className="dock-row-ttl">プレースタイル</span>
            </div>
            <div className="dock-row-body">
              <p className="dock-row-main">
                <TypeIcon icon={result.play.type.icon} className="dock-icon" />
                <strong>{result.play.type.name}型</strong>
              </p>
              <p className="dock-row-note">{result.play.type.desc}</p>
              <p className="dock-row-note">
                似ているプロ選手：
                <strong>
                  {result.play.top.name}（{result.play.top.league}・{result.play.top.position}）
                </strong>
                ／グローブ：
                <a
                  className="maker-link"
                  href={makerLink(result.play.top.glove, "グローブ")}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                >
                  {result.play.top.glove}
                </a>
                {result.play.top.bat && (
                  <>
                    、バット：
                    <a
                      className="maker-link"
                      href={makerLink(result.play.top.bat, "バット")}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                    >
                      {result.play.top.bat}
                    </a>
                  </>
                )}
              </p>
              <a className="cta-inline" href={`/player-shindan/type/${result.play.type.slug}/`}>
                → {result.play.type.name}型の解説を見る
              </a>
            </div>
          </div>

          {/* 3. バット処方 */}
          <div className="dock-row">
            <div className="dock-row-head">
              <span className="dock-row-no">03</span>
              <span className="dock-row-ttl">処方：バット</span>
            </div>
            <div className="dock-row-body">
              <p className="dock-row-main">
                <strong>{result.bat.model.name}</strong>
                <span className="dock-row-sub">
                  （{result.bat.model.maker}／{BAT_MATERIAL_INFO[result.bat.material].label}）
                </span>
              </p>
              <p className="dock-row-note">{result.bat.model.note}</p>
              <p className="dock-row-note">
                価格の目安：{BAT_MATERIAL_INFO[result.bat.material].price}
              </p>
            </div>
          </div>

          {/* 4. グローブ処方 */}
          <div className="dock-row">
            <div className="dock-row-head">
              <span className="dock-row-no">04</span>
              <span className="dock-row-ttl">処方：グローブ</span>
            </div>
            <div className="dock-row-body">
              <p className="dock-row-main">
                <strong>{result.glove.web.name}</strong>
                <span className="dock-row-sub">（{POS_JP[result.glove.pos]}向け）</span>
              </p>
              <p className="dock-row-note">{result.glove.reason}</p>
              <p className="dock-row-note">{result.glove.web.feature}</p>
            </div>
          </div>

          {/* 5. 相性所見 */}
          {(compat.best || compat.tough) && (
            <div className="dock-row">
              <div className="dock-row-head">
                <span className="dock-row-no">05</span>
                <span className="dock-row-ttl">所見：チーム内の相性</span>
              </div>
              <div className="dock-row-body">
                <div className="compat-grid">
                  {compat.best && (
                    <a className="compat-card good" href={`/baseball-mbti/type/${compat.best.type.code.toLowerCase()}/`}>
                      <span className="compat-label">◎ 相性の良いタイプ</span>
                      <span className="compat-code">
                        <TypeIcon icon={compat.best.type.icon} className="compat-icon" />
                        {compat.best.type.code}
                        <span className="compat-nick">{compat.best.type.nickname}</span>
                      </span>
                      <span className="compat-note">{compat.best.note}</span>
                    </a>
                  )}
                  {compat.tough && (
                    <a className="compat-card tough" href={`/baseball-mbti/type/${compat.tough.type.code.toLowerCase()}/`}>
                      <span className="compat-label">△ 衝突しやすいタイプ</span>
                      <span className="compat-code">
                        <TypeIcon icon={compat.tough.type.icon} className="compat-icon" />
                        {compat.tough.type.code}
                        <span className="compat-nick">{compat.tough.type.nickname}</span>
                      </span>
                      <span className="compat-note">{compat.tough.note}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          <p className="player-disc">
            ※ 本報告書はエンタメ診断です。使用ギア・分類は公開情報にもとづく参考で、公式のものではありません。
            メーカー名のリンクは楽天市場のおすすめ一覧（広告）が開きます。
          </p>

          {/* 処方箋どおりの実物（楽天・広告） */}
          <ProductCards
            keyword={result.bat.model.keyword}
            heading={`🛒 処方どおりのバットを探す（${result.bat.model.name}）`}
          />
          <ProductCards
            keyword={`軟式 グローブ ${POS_JP[result.glove.pos]} 一般`}
            heading={`🛒 処方どおりのグローブを探す（${POS_JP[result.glove.pos]}向け）`}
          />

          <div className="share-box">
            <span className="share-label">検査結果をシェア</span>
            <button className="dock-save-btn" onClick={saveCard} disabled={cardState === "busy"}>
              {cardState === "busy"
                ? "画像を作成中…"
                : cardState === "done"
                  ? "画像を保存しました！"
                  : "🖼 報告書を画像で保存／シェアする"}
            </button>
            <p className="dock-save-note">
              1枚の「検査結果報告書」画像になります。SNSにそのまま貼れます。
            </p>
            {cardUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="dock-card-preview" src={cardUrl} alt="野球人間ドック 検査結果報告書" />
            )}
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
            もう一度受診する
          </button>

          <div className="bat-links">
            <a className="cta-inline" href="/baseball-mbti/">
              → じっくり派は本格36問のMBTI診断へ
            </a>
            <a className="cta-inline" href="/tools/">
              → ほかの診断ツールを見る
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
