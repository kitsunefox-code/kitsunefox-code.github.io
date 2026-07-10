"use client";

// 野球人間ドック：サイト唯一の総合診断。
// 全45問すべてMBTI式の7段階（そう思う〜そう思わない・性格/価値観の設問）で、
// こころ(MBTI)・プレースタイル・バット・グローブ・スパイク・打撃手袋・まわりの装備を
// まとめて検査し、「MBTIタイプ × 最も近いプロ選手1人」をどんと判定する。
// 道具はポジション選びではなく気質から型を導く（recommendGloveByStyle 等）。
import { useRef, useState } from "react";
import ProductCards from "@/components/ProductCards";
import GoodsLinks from "@/components/GoodsLinks";
import TypeIcon from "@/components/TypeIcon";
import PlayerArt from "@/components/PlayerArt";
import { renderDockCard, canvasToBlob, type DockCardData } from "@/lib/dockCard";
import {
  MBTI_STATEMENTS,
  AXIS_META,
  mbtiByCode,
  getCompat,
  type Axis,
  type MbtiType,
} from "@/data/baseballMbti";
import { pickTypeSlug, typeBySlug, type PlayerType } from "@/data/playerTypes";
import { PLAYERS, type Player, type Trait } from "@/data/players";
import {
  pickBatModel,
  BAT_MATERIAL_INFO,
  type BatMaterial,
  type BatModel,
} from "@/data/batData";
import { recommendGloveByStyle, type GloveByStyle } from "@/data/gloveData";
import { recommendSpike, type SpikeRec } from "@/data/spikeData";
import { recommendBglove, type BgloveRec } from "@/data/bgloveData";
import { recommendAccessories, type AccessoryItem } from "@/data/accessoryData";
import { SITE_URL, rktSearch } from "@/data/site";
import { saveMbtiCode, saveTypeSlug } from "@/data/comboLink";

/* ── 7段階スケール（全章共通・MBTI式） ─────────────── */
const SCALE: { v: number; size: string; tone: "agree" | "neutral" | "disagree"; label: string }[] = [
  { v: 3, size: "s3", tone: "agree", label: "強くそう思う" },
  { v: 2, size: "s2", tone: "agree", label: "そう思う" },
  { v: 1, size: "s1", tone: "agree", label: "ややそう思う" },
  { v: 0, size: "s0", tone: "neutral", label: "どちらでもない" },
  { v: -1, size: "s1", tone: "disagree", label: "ややそう思わない" },
  { v: -2, size: "s2", tone: "disagree", label: "そう思わない" },
  { v: -3, size: "s3", tone: "disagree", label: "強くそう思わない" },
];

/* ── 検査1: こころ（MBTI 12問） ─────────────── */
const MBTI_Q = MBTI_STATEMENTS.slice(0, 12); // 各軸3問（逆転項目入り）

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

/* ── 検査2: プレースタイル（12問・7段階） ─────────────── */
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

function computePlay(a: Record<string, number>): { type: PlayerType; top: Player } {
  const score: Partial<Record<Trait, number>> = {};
  for (const q of PLAY_Q) {
    const v = a[q.id] ?? 0;
    if (v <= 0) continue; // 「そう思う」側だけ資質に加点（強さで傾斜）
    for (const [t, w] of Object.entries(q.w)) {
      score[t as Trait] = (score[t as Trait] || 0) + (v / 3) * (w as number);
    }
  }
  const ranked = PLAYERS.map((p) => ({
    p,
    s: p.traits.reduce((sum, t) => sum + (score[t] || 0), 0),
    r: Math.random(),
  })).sort((x, y) => y.s - x.s || y.r - x.r);
  const type = typeBySlug(pickTypeSlug(score))!;
  return { type, top: ranked[0].p };
}

/* ── 検査3: バット適性（4問・7段階・性格型） ─────────────── */
const BAT_Q: { id: string; text: string }[] = [
  { id: "b1", text: "一発の魅力には抗えない。どうせ振るなら遠くへ飛ばしたい" },
  { id: "b2", text: "良い道具にはしっかりお金をかける主義だ" },
  { id: "b3", text: "自分のパワー・力には自信がある方だ" },
  { id: "b4", text: "新しいもの・最新技術にはワクワクする方だ" },
];
function computeBat(a: Record<string, number>): { material: BatMaterial; model: BatModel } {
  const yes = (id: string) => (a[id] ?? 0) > 0;
  const material: BatMaterial =
    yes("b1") && yes("b2") ? "beyond" : yes("b2") || yes("b3") ? "carbon" : "metal";
  return { material, model: pickBatModel(material, { latest: yes("b4"), power: yes("b3") }) };
}

/* ── 検査4: グローブ適性（5問・7段階・性格型） ───────────────
   「どのポジションか」ではなく、道具への気質からグラブの“性格”を導く。 */
const GLOVE_Q: { id: string; text: string }[] = [
  { id: "g1", text: "道具は軽さと操作性が命。もたつくのは何より嫌だ" },
  { id: "g2", text: "多少重くても、がっちり受け止める“安心感”がほしい" },
  { id: "g3", text: "自分の狙いや手の内は、相手に悟られたくない" },
  { id: "g4", text: "広い範囲をカバーして、ここぞの場面で魅せたい" },
  { id: "g5", text: "細かい技術やこだわりで、まわりと差をつけたいタイプだ" },
];
function computeGlove(a: Record<string, number>): GloveByStyle {
  const pos = (id: string) => Math.max(0, a[id] ?? 0); // 0〜3（そう思う側のみ）
  const spec = pos("g5"); // こだわり・技巧派 → 隠す/軽快を後押し
  return recommendGloveByStyle({
    light: pos("g1") + spec * 0.5,
    solid: pos("g2"),
    hide: pos("g3") + spec * 0.5,
    range: pos("g4"),
  });
}

/* ── 検査5: スパイク適性（4問・7段階・性格型） ─────────────── */
const SPIKE_Q: { id: string; text: string }[] = [
  { id: "s1", text: "スピードと軽さで勝負したい。1歩目で相手を出し抜くのが好きだ" },
  { id: "s2", text: "ケガは絶対に避けたい。守り重視の慎重派だ" },
  { id: "s3", text: "地面をガッチリ噛む“食いつく”感覚がたまらない" },
  { id: "s4", text: "あれこれ持ちたくない。1足で何でもこなす合理派だ" },
];
function computeSpike(a: Record<string, number>): SpikeRec {
  const yes = (id: string) => (a[id] ?? 0) > 0;
  return recommendSpike({
    speed: yes("s1"),
    ankle: yes("s2"),
    grip: yes("s3"),
    versatile: yes("s4"),
  });
}

/* ── 検査6: バッティンググローブ適性（4問・7段階・性格型） ─────────────── */
const BGLOVE_Q: { id: string; text: string }[] = [
  { id: "bg1", text: "打感や“本物”の質感にこだわる。木のバットにも惹かれる" },
  { id: "bg2", text: "とにかく実利。滑らなければそれでいい、が信条だ" },
  { id: "bg3", text: "消耗品にお金はかけない。コスパ最優先の現実派だ" },
  { id: "bg4", text: "手に吸いつくフィット感・肌ざわりにこだわる方だ" },
];
function computeBglove(a: Record<string, number>): BgloveRec {
  const yes = (id: string) => (a[id] ?? 0) > 0;
  return recommendBglove({
    wood: yes("bg1"),
    grip: yes("bg2"),
    value: yes("bg3"),
    fit: yes("bg4"),
  });
}

/* ── 検査7: まわりの装備（4問・7段階・性格型） ─────────────── */
const ACC_Q: { id: string; text: string }[] = [
  { id: "a1", text: "ケガ・故障だけは絶対に避けたい。関節はしっかり守る主義だ" },
  { id: "a2", text: "暑さ・寒さのコンディション管理は抜かりなくやる方だ" },
  { id: "a3", text: "試合後の疲れを翌日に残したくない。ケアにこだわる" },
  { id: "a4", text: "見た目・気分も大事。小物でテンションを上げたい" },
];
function computeAcc(a: Record<string, number>): { top: AccessoryItem; list: AccessoryItem[] } {
  const pos = (id: string) => Math.max(0, a[id] ?? 0);
  return recommendAccessories({
    support: pos("a1"),
    under: pos("a2"),
    care: pos("a3"),
    style: pos("a4"),
  });
}

/* ── ステージ管理 ─────────────── */
type Stage = "intro" | "mbti" | "play" | "bat" | "glove" | "spike" | "bglove" | "acc" | "result";
type DockResult = {
  mbti: { code: string; axes: DockAxis[]; type: MbtiType };
  play: { type: PlayerType; top: Player };
  bat: { material: BatMaterial; model: BatModel };
  glove: GloveByStyle;
  spike: SpikeRec;
  bglove: BgloveRec;
  acc: { top: AccessoryItem; list: AccessoryItem[] };
};

const CHAPTERS: { key: Stage; no: string; title: string; desc: string; count: number }[] = [
  { key: "mbti", no: "第一検査", title: "こころ", desc: "性格のMBTI検査（12問）", count: 12 },
  { key: "play", no: "第二検査", title: "プレースタイル", desc: "プレーの気質検査（12問）", count: 12 },
  { key: "bat", no: "第三検査", title: "バット適性", desc: "相棒バットの処方（4問）", count: 4 },
  { key: "glove", no: "第四検査", title: "グローブ適性", desc: "相棒グローブの処方（5問）", count: 5 },
  { key: "spike", no: "第五検査", title: "スパイク適性", desc: "相棒スパイクの処方（4問）", count: 4 },
  { key: "bglove", no: "第六検査", title: "打撃手袋適性", desc: "バッティンググローブの処方（4問）", count: 4 },
  { key: "acc", no: "第七検査", title: "まわりの装備", desc: "サポーター・小物の処方（4問）", count: 4 },
];
const TOTAL_Q = 45;

/* 7段階の設問行（全章共通） */
function LikertItem({
  no,
  text,
  value,
  onPick,
}: {
  no: number;
  text: string;
  value: number | undefined;
  onPick: (v: number) => void;
}) {
  const picked = SCALE.find((o) => o.v === value);
  return (
    <div className="lk-item">
      <p className="lk-num">Q{no}</p>
      <p className="lk-q">{text}</p>
      <div className="lk-row">
        <span className="lk-side agree">そう思う</span>
        <div className="lk-scale">
          {SCALE.map((o) => (
            <button
              key={o.v}
              aria-label={o.label}
              title={o.label}
              className={`lk-dot ${o.size} ${o.tone} ${value === o.v ? "active" : ""}`}
              onClick={() => onPick(o.v)}
            >
              <span className="lk-check" aria-hidden="true">
                {value === o.v ? "✓" : ""}
              </span>
            </button>
          ))}
        </div>
        <span className="lk-side disagree">そう思わない</span>
      </div>
      {/* 目盛りの意味（常時表示・3アンカー） */}
      <div className="lk-legend" aria-hidden="true">
        <span>そう思う</span>
        <span>どちらでもない</span>
        <span>そう思わない</span>
      </div>
      {/* 選んだ答えを言葉で明示（押したことが一目で分かる） */}
      <p className={`lk-answer ${picked ? `on ${picked.tone}` : ""}`}>
        {picked ? `あなたの回答：${picked.label}` : "上のボタンから選んでください"}
      </p>
    </div>
  );
}

export default function DockShindan() {
  const [stage, setStage] = useState<Stage>("intro");
  const [mbtiAns, setMbtiAns] = useState<Record<string, number>>({});
  const [playAns, setPlayAns] = useState<Record<string, number>>({});
  const [batAns, setBatAns] = useState<Record<string, number>>({});
  const [gloveAns, setGloveAns] = useState<Record<string, number>>({});
  const [spikeAns, setSpikeAns] = useState<Record<string, number>>({});
  const [bgloveAns, setBgloveAns] = useState<Record<string, number>>({});
  const [accAns, setAccAns] = useState<Record<string, number>>({});
  const [result, setResult] = useState<DockResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [cardState, setCardState] = useState<"idle" | "busy" | "done">("idle");
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const answered =
    Object.keys(mbtiAns).length +
    Object.keys(playAns).length +
    Object.keys(batAns).length +
    Object.keys(gloveAns).length +
    Object.keys(spikeAns).length +
    Object.keys(bgloveAns).length +
    Object.keys(accAns).length;
  const progress = Math.round((answered / TOTAL_Q) * 100);

  const mbtiDone = MBTI_Q.every((q) => q.id in mbtiAns);
  const playDone = PLAY_Q.every((q) => q.id in playAns);
  const batDone = BAT_Q.every((q) => q.id in batAns);
  const gloveDone = GLOVE_Q.every((q) => q.id in gloveAns);
  const spikeDone = SPIKE_Q.every((q) => q.id in spikeAns);
  const bgloveDone = BGLOVE_Q.every((q) => q.id in bgloveAns);
  const accDone = ACC_Q.every((q) => q.id in accAns);

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
    const glove = computeGlove(gloveAns);
    const spike = computeSpike(spikeAns);
    const bglove = computeBglove(bgloveAns);
    const acc = computeAcc(accAns);
    saveMbtiCode(m.code);
    saveTypeSlug(play.type.slug);
    setResult({ mbti: { ...m, type: mbtiType }, play, bat, glove, spike, bglove, acc });
    setStage("result");
    scrollTop();
  };

  const reset = () => {
    setMbtiAns({});
    setPlayAns({});
    setBatAns({});
    setGloveAns({});
    setSpikeAns({});
    setBgloveAns({});
    setAccAns({});
    setResult(null);
    setCardUrl(null);
    setCardState("idle");
    setStage("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const compat = result ? getCompat(result.mbti.code) : { best: null, tough: null };

  const shareUrl = `${SITE_URL}/baseball-dock/`;
  const shareText = result
    ? `野球人間ドック、受けてきた。\n判定は【${result.mbti.code}｜${result.mbti.type.nickname}】×【${result.play.top.name}】タイプ。\n処方は バット＝${result.bat.model.name}／グローブ＝${result.glove.web.name}／スパイク＝${result.spike.name}。\nあなたも受診してみる？⚾`
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
        verdict: `${result.mbti.code}×${result.play.top.name}`,
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
        glovePos: result.glove.charLabel,
      };
      const canvas = await renderDockCard(cardData);
      setCardUrl(canvas.toDataURL("image/png"));
      const blob = await canvasToBlob(canvas);
      if (!blob) throw new Error("blob failed");
      const fileName = `野球人間ドック_${result.mbti.code}×${result.play.top.name}.png`;
      const file = new File([blob], fileName, { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
      if (nav.canShare && nav.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({ files: [file], text: shareText });
      } else {
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

  const likertChapter = (
    qs: { id: string; text: string }[],
    ans: Record<string, number>,
    setAns: (fn: (p: Record<string, number>) => Record<string, number>) => void,
    done: boolean,
    nextLabel: string,
    onNext: () => void
  ) => (
    <>
      {qs.map((q, i) => (
        <LikertItem
          key={q.id}
          no={i + 1}
          text={q.text}
          value={ans[q.id]}
          onPick={(v) => setAns((p) => ({ ...p, [q.id]: v }))}
        />
      ))}
      <div className="lk-nav">
        <button className={`lk-next ${done ? "" : "disabled"}`} disabled={!done} onClick={onNext}>
          {nextLabel}
        </button>
        {!done && <p className="yn-hint">{qs.length}問すべてに答えると進めます。</p>}
      </div>
    </>
  );

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
            性格（MBTI）・プレースタイル・道具の適性を、一度にまとめてフル検査。
            すべて「そう思う〜そう思わない」の7段階で答えるだけ。所要時間はおよそ5分。
            検査後に、あなたの<strong>MBTIタイプ×最も近いプロ選手</strong>の
            「検査結果報告書」をお渡しします。
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

      {/* ── 各検査（全問7段階） ── */}
      {stage === "mbti" && (
        <>
          {chapterHead("mbti")}
          {likertChapter(MBTI_Q, mbtiAns, setMbtiAns, mbtiDone, "第二検査へすすむ →", () => go("play"))}
        </>
      )}
      {stage === "play" && (
        <>
          {chapterHead("play")}
          {likertChapter(PLAY_Q, playAns, setPlayAns, playDone, "第三検査へすすむ →", () => go("bat"))}
        </>
      )}
      {stage === "bat" && (
        <>
          {chapterHead("bat")}
          {likertChapter(BAT_Q, batAns, setBatAns, batDone, "最終検査へすすむ →", () => go("glove"))}
        </>
      )}
      {stage === "glove" && (
        <>
          {chapterHead("glove")}
          {likertChapter(GLOVE_Q, gloveAns, setGloveAns, gloveDone, "第五検査へすすむ →", () => go("spike"))}
        </>
      )}
      {stage === "spike" && (
        <>
          {chapterHead("spike")}
          {likertChapter(SPIKE_Q, spikeAns, setSpikeAns, spikeDone, "最終検査へすすむ →", () => go("bglove"))}
        </>
      )}
      {stage === "bglove" && (
        <>
          {chapterHead("bglove")}
          {likertChapter(BGLOVE_Q, bgloveAns, setBgloveAns, bgloveDone, "第七検査へすすむ →", () => go("acc"))}
        </>
      )}
      {stage === "acc" && (
        <>
          {chapterHead("acc")}
          {likertChapter(ACC_Q, accAns, setAccAns, accDone, "検査を終えて結果を見る →", finish)}
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

          {/* 総合判定：MBTI × 選手 を「どんと」＋イラスト */}
          <div className="dock-verdict dock-verdict-big">
            <span className="dock-verdict-label">総合判定</span>
            <div className="dv-grid">
              <div className="dv-mbti">
                <TypeIcon icon={result.mbti.type.icon} className="dv-icon" title={result.mbti.type.nickname} />
                <span className="dv-code">{result.mbti.code}</span>
                <span className="dv-nick">{result.mbti.type.nickname}</span>
              </div>
              <span className="dv-x">×</span>
              <div className="dv-player">
                <PlayerArt player={result.play.top} className="dv-art" />
                <span className={`mbig-league ${result.play.top.league === "MLB" ? "mlb" : "npb"}`}>
                  {result.play.top.league}
                </span>
                <span className="dv-pname">{result.play.top.name}</span>
                <span className="dv-ppos">{result.play.top.position}</span>
              </div>
            </div>
            <p className="dock-row-note" style={{ textAlign: "center" }}>
              {result.mbti.type.catch}／{result.play.top.note}
            </p>
            <p className="player-disc" style={{ textAlign: "center", marginTop: 4 }}>
              ※ イラストはAI生成のイメージです（ご本人の肖像ではありません）。
            </p>
            <a className="cta-inline" href={`/baseball-dock/type/${result.mbti.code.toLowerCase()}/`}>
              → 「{result.mbti.code}｜{result.mbti.type.nickname}」の詳しい解説を読む
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
            </div>
          </div>

          {/* 2. あなたに最も近い選手 */}
          <div className="dock-row">
            <div className="dock-row-head">
              <span className="dock-row-no">02</span>
              <span className="dock-row-ttl">最も近いプロ選手</span>
            </div>
            <div className="dock-row-body">
              <p className="dock-row-main">
                <strong>{result.play.top.name}</strong>
                <span className="dock-row-sub">
                  （{result.play.top.league}・{result.play.top.position}）
                </span>
              </p>
              <p className="dock-row-note">{result.play.top.note}</p>
              <p className="dock-row-note">
                プレースタイルは<strong>{result.play.type.name}型</strong>（{result.play.type.desc}）／
                使用ギア：グローブ＝
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
                    、バット＝
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
                <strong>{result.glove.charLabel}</strong>
                <span className="dock-row-sub">（{result.glove.web.name}）</span>
              </p>
              <p className="dock-row-note">{result.glove.reason}</p>
              <p className="dock-row-note">
                {result.glove.web.feature}（向いているポジション：{result.glove.web.positions}）
              </p>
            </div>
          </div>

          {/* 5. スパイク処方 */}
          <div className="dock-row">
            <div className="dock-row-head">
              <span className="dock-row-no">05</span>
              <span className="dock-row-ttl">処方：スパイク</span>
            </div>
            <div className="dock-row-body">
              <p className="dock-row-main">
                <strong>{result.spike.name}</strong>
              </p>
              <p className="dock-row-note">{result.spike.reason}</p>
              <p className="dock-row-note">{result.spike.feature}</p>
              {result.spike.caution && (
                <p className="dock-row-note" style={{ color: "var(--accent)" }}>
                  {result.spike.caution}
                </p>
              )}
            </div>
          </div>

          {/* 6. バッティンググローブ処方 */}
          <div className="dock-row">
            <div className="dock-row-head">
              <span className="dock-row-no">06</span>
              <span className="dock-row-ttl">処方：バッティンググローブ</span>
            </div>
            <div className="dock-row-body">
              <p className="dock-row-main">
                <strong>{result.bglove.name}</strong>
                <span className="dock-row-sub">
                  （{result.bglove.makerHint}
                  {result.bglove.foreign ? "・海外ブランド" : ""}）
                </span>
              </p>
              <p className="dock-row-note">{result.bglove.reason}</p>
              <p className="dock-row-note">{result.bglove.feature}</p>
              {result.bglove.hack && (
                <p className="dock-row-note" style={{ color: "var(--accent)" }}>
                  💡 {result.bglove.hack}
                </p>
              )}
            </div>
          </div>

          {/* 7. まわりの装備 */}
          <div className="dock-row">
            <div className="dock-row-head">
              <span className="dock-row-no">07</span>
              <span className="dock-row-ttl">処方：まわりの装備</span>
            </div>
            <div className="dock-row-body">
              <p className="dock-row-main">
                <strong>{result.acc.top.name}</strong>
                <span className="dock-row-sub">
                  （{result.acc.top.makerHint}
                  {result.acc.top.foreign ? "・海外ブランド" : ""}）
                </span>
              </p>
              <p className="dock-row-note">{result.acc.top.feature}</p>
              {result.acc.list.length > 1 && (
                <p className="dock-row-note">
                  あわせて揃えたい：
                  {result.acc.list.slice(1).map((it, i) => (
                    <span key={it.kind}>
                      {i > 0 ? "／" : ""}
                      {it.name}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>

          {/* 8. 相性所見 */}
          {(compat.best || compat.tough) && (
            <div className="dock-row">
              <div className="dock-row-head">
                <span className="dock-row-no">08</span>
                <span className="dock-row-ttl">所見：チーム内の相性</span>
              </div>
              <div className="dock-row-body">
                <div className="compat-grid">
                  {compat.best && (
                    <a className="compat-card good" href={`/baseball-dock/type/${compat.best.type.code.toLowerCase()}/`}>
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
                    <a className="compat-card tough" href={`/baseball-dock/type/${compat.tough.type.code.toLowerCase()}/`}>
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

          {/* 実物（楽天・広告）：選手のギア＋処方どおりの道具 */}
          <ProductCards
            keyword={result.play.top.productKeyword}
            heading={`🛒 ${result.play.top.name}が使う「${result.play.top.glove}」のグローブを見る`}
          />
          {result.play.top.bat && result.play.top.bat !== "各社" && (
            <ProductCards
              keyword={`軟式 バット ${result.play.top.bat}`}
              heading={`🛒 ${result.play.top.name}が使う「${result.play.top.bat}」のバットを見る`}
            />
          )}
          <ProductCards
            keyword={result.bat.model.keyword}
            heading={`🛒 処方どおりのバットを探す（${result.bat.model.name}）`}
          />
          <ProductCards
            keyword={`軟式 グローブ ${result.glove.posHint} 一般`}
            heading={`🛒 処方どおりのグローブを探す（${result.glove.web.name}）`}
          />
          <ProductCards
            keyword={result.spike.keyword}
            heading={`🛒 処方どおりのスパイクを探す（${result.spike.name}）`}
          />
          <ProductCards
            keyword={result.bglove.keyword}
            heading={`🛒 処方どおりのバッティンググローブを探す（${result.bglove.makerHint}）`}
          />
          {result.bglove.hackKeyword && (
            <ProductCards
              keyword={result.bglove.hackKeyword}
              heading="🏈 【裏技】グリップ最強のアメフト用グローブを流用する"
            />
          )}
          <ProductCards
            keyword={result.acc.top.keyword}
            heading={`🛒 処方どおりのまわりの装備を探す（${result.acc.top.name}）`}
          />
          {result.acc.list.length > 1 && (
            <ProductCards
              keyword={result.acc.list[1].keyword}
              heading={`🛒 あわせて：${result.acc.list[1].name}を探す`}
            />
          )}

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
            <a className="cta-inline" href="/baseball-dock/type/">
              → 全16タイプの解説を読む
            </a>
            <a className="cta-inline" href="/uranai/">
              → 「ギアメーカー占い」で今日の運勢もチェック
            </a>
            <a className="cta-inline" href="/players/">
              → プロ選手の使用ギア一覧（657名）を見る
            </a>
            <a className="cta-inline" href="/hikaku/">
              → 道具・ユニフォーム比較を見る
            </a>
          </div>

          <GoodsLinks />
        </section>
      )}
    </div>
  );
}
