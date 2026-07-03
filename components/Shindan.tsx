"use client";

import { useRef, useState } from "react";
import { makers, ctaUrl, type Maker } from "@/data/makers";
import { BRANDS } from "@/data/brands";
import AdSlot from "@/components/AdSlot";
import UniformIcon from "@/components/UniformIcon";

// ===== 画像から配色を解析（すべてブラウザ内で完結・アップロードなし） =====

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  return { h, s, l };
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** 2色の距離（0=同じ 〜 1=真逆）。redmean近似 */
function colorDist(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number }
) {
  const rm = (a.r + b.r) / 2;
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  const d = Math.sqrt(
    (2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db
  );
  return d / 765; // おおよそ0〜1に正規化
}

/** HSLから色の呼び名 */
function colorName(h: number, s: number, l: number): string {
  if (s < 0.12) {
    if (l < 0.22) return "ブラック";
    if (l > 0.82) return "ホワイト";
    return "グレー";
  }
  if (h < 15 || h >= 345) return "レッド";
  if (h < 40) return l < 0.45 ? "ブラウン" : "オレンジ";
  if (h < 65) return "イエロー";
  if (h < 160) return "グリーン";
  if (h < 200) return "ティール";
  if (h < 250) return l < 0.42 ? "ネイビー" : "ブルー";
  if (h < 295) return "パープル";
  return "ピンク";
}

type Swatch = { r: number; g: number; b: number; hex: string; weight: number };

type Analysis = {
  swatches: Swatch[];
  baseColorName: string;
  complexity: number;
  complexityLabel: string;
  toneLabel: string;
  designType: "flashy" | "classic" | "balanced";
  vividColors: { r: number; g: number; b: number }[];
};

function analyzeImage(img: HTMLImageElement): Analysis {
  const S = 72;
  const canvas = document.createElement("canvas");
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d");
  if (!ctx)
    return {
      swatches: [],
      baseColorName: "不明",
      complexity: 1,
      complexityLabel: "単色系",
      toneLabel: "標準",
      designType: "balanced",
      vividColors: [],
    };
  ctx.drawImage(img, 0, 0, S, S);
  const data = ctx.getImageData(0, 0, S, S).data;

  const counts = new Map<string, number>();
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;
    const key = `${data[i] >> 4}_${data[i + 1] >> 4}_${data[i + 2] >> 4}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
    total++;
  }

  const top = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([k, c]) => {
      const [r, g, b] = k.split("_").map((n) => (Number(n) << 4) + 8);
      const hex =
        "#" +
        [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
      return { r, g, b, hex, weight: c / Math.max(1, total) };
    });

  // 彩度のある色（デザインの主役）
  const vivid = top.filter((c) => {
    const { s, l } = rgbToHsl(c.r, c.g, c.b);
    return s > 0.25 && l > 0.12 && l < 0.92 && c.weight > 0.02;
  });

  // ベースカラー：最も面積の大きい「はっきりした色」、なければ最大面積色
  const baseSrc = vivid[0] ?? top[0];
  const baseHsl = baseSrc
    ? rgbToHsl(baseSrc.r, baseSrc.g, baseSrc.b)
    : { h: 0, s: 0, l: 0.5 };
  const baseColorName = colorName(baseHsl.h, baseHsl.s, baseHsl.l);

  // 配色の複雑さ＝彩度のある色相が何系統か
  const hueGroups = new Set<number>();
  for (const c of vivid) {
    const { h } = rgbToHsl(c.r, c.g, c.b);
    hueGroups.add(Math.round(h / 40));
  }
  const complexity = Math.max(1, hueGroups.size);
  const complexityLabel =
    complexity >= 3 ? "多色系" : complexity === 2 ? "2色系" : "単色系";

  // トーン（明るさ）
  let lSum = 0;
  let wSum = 0;
  for (const c of top) {
    const { l } = rgbToHsl(c.r, c.g, c.b);
    lSum += l * c.weight;
    wSum += c.weight;
  }
  const avgL = wSum > 0 ? lSum / wSum : 0.5;
  const toneLabel = avgL > 0.62 ? "明るめ" : avgL < 0.4 ? "落ち着いた" : "標準";

  // 3色以上＝派手系、2色＝バランス、単色＝クラシック（伝統系）
  const designType: Analysis["designType"] =
    complexity >= 3 ? "flashy" : complexity <= 1 ? "classic" : "balanced";

  return {
    swatches: top.slice(0, 6),
    baseColorName,
    complexity,
    complexityLabel,
    toneLabel,
    designType,
    vividColors: vivid.slice(0, 4).map((c) => ({ r: c.r, g: c.g, b: c.b })),
  };
}

/** 写真の主役色と、各メーカーのイメージカラーの近さ（0〜1） */
function colorAffinity(a: Analysis | null, makerId: string): number {
  if (!a || a.vividColors.length === 0) return 0;
  const brand = BRANDS[makerId];
  if (!brand) return 0;
  const brandColors = [hexToRgb(brand.primary), hexToRgb(brand.secondary)];
  let best = 1;
  for (const pc of a.vividColors) {
    for (const bc of brandColors) {
      best = Math.min(best, colorDist(pc, bc));
    }
  }
  return 1 - best; // 近いほど1に近い
}

// ===== 診断ロジック =====

type TeamSize = "small" | "mid" | "large";
type Budget = "low" | "mid" | "high";
type Deadline = "rush" | "month" | "none";
type Style = "flashy" | "classic" | "any";

type Answers = {
  teamSize: TeamSize | null;
  budget: Budget | null;
  deadline: Deadline | null;
  style: Style;
};

type Result = { maker: Maker; pct: number; raw: number; reasons: string[] };

function minLotOf(m: Maker): number | null {
  if (m.minLot.startsWith("1着")) return 1;
  if (m.minLot.includes("5枚")) return 5;
  return null;
}

function diagnose(a: Answers, analysis: Analysis | null): Result[] {
  const results = makers.map((m) => {
    let score = 0;
    const reasons: string[] = [];
    const lot = minLotOf(m);

    // チーム人数 × 最低ロット
    if (a.teamSize === "small") {
      if (lot === 1) {
        score += 30;
        reasons.push("1着からオーダーできるので少人数でも安心");
      } else if (lot === 5) score -= 20;
      if (m.tags.includes("少人数OK")) score += 10;
    } else if (a.teamSize === "large") {
      if (m.priceMin !== null && m.priceMin <= 9000) {
        score += 10;
        reasons.push("枚数が多いほど割引が効きやすい価格帯");
      }
    }

    // 予算
    if (a.budget === "low") {
      if (m.priceMin !== null && m.priceMin <= 8000) {
        score += 25;
        reasons.push(`最安${m.priceMin.toLocaleString()}円〜と予算内に収まりやすい`);
      } else if (m.priceMin !== null && m.priceMin <= 10000) score += 10;
      else if (m.priceMin !== null && m.priceMin > 12000) score -= 15;
    } else if (a.budget === "mid") {
      if (m.priceMin !== null && m.priceMin <= 12000) score += 15;
    } else if (a.budget === "high") {
      if (m.tags.includes("品質重視") || m.tags.includes("ブランド重視")) {
        score += 20;
        reasons.push("品質・ブランド力に定評があり予算をかける価値あり");
      }
    }

    // 納期
    if (a.deadline === "rush") {
      if (m.tags.includes("短納期")) {
        score += 30;
        reasons.push(`短納期対応（${m.leadTime}）`);
      } else {
        score -= 10;
      }
    } else if (a.deadline === "month" && m.tags.includes("短納期")) {
      score += 10;
    }

    // デザインの方向性（写真解析 or 手動選択）
    const baseColor = analysis ? analysis.baseColorName : "";
    const complexityLabel = analysis ? analysis.complexityLabel : "";
    if (a.style === "flashy") {
      if (m.methods.includes("昇華")) {
        score += 22;
        reasons.push(
          analysis
            ? `写真の${baseColor}系×${complexityLabel}デザインは昇華プリントでの再現度が高い`
            : "昇華プリント対応でグラデ・多色デザインの再現度が高い"
        );
      } else {
        score -= 25;
      }
      if (m.designSimulator) score += 5;
    } else if (a.style === "classic") {
      if (m.methods.includes("刺繍")) {
        score += 22;
        reasons.push(
          analysis
            ? `${baseColor}系の落ち着いた配色は刺繍・伝統系がよく映える`
            : "刺繍対応で伝統的・高級感のある仕上がり"
        );
      }
      if (m.methods.includes("フルオーダー")) score += 5;
    }

    // 写真のイメージカラーとの近さ（写真がある時だけ効く・段階的に加点）
    const affinity = colorAffinity(analysis, m.id);
    if (affinity > 0.6) {
      score += (affinity - 0.5) * 26; // 0.98→約12.5点, 0.80→約7.8点
      if (affinity > 0.75) {
        reasons.push(
          `写真の配色がこのメーカーのイメージカラーに近い雰囲気（配色マッチ${Math.round(
            affinity * 100
          )}%）`
        );
      }
    }

    if (reasons.length === 0) reasons.push("条件に大きなマイナスがないバランス型");

    const raw = score;
    const pct = Math.max(40, Math.min(98, Math.round(45 + score * 0.72)));
    return { maker: m, pct, raw, reasons: reasons.slice(0, 3) };
  });

  return results.sort((x, y) => y.raw - x.raw).slice(0, 3);
}

// ===== UI =====

const TEAM_OPTS: { v: TeamSize; label: string }[] = [
  { v: "small", label: "1〜4人（まずは少数で）" },
  { v: "mid", label: "5〜9人" },
  { v: "large", label: "10人以上" },
];
const BUDGET_OPTS: { v: Budget; label: string }[] = [
  { v: "low", label: "〜8,000円／人" },
  { v: "mid", label: "8,000〜12,000円／人" },
  { v: "high", label: "こだわらない（品質優先）" },
];
const DEADLINE_OPTS: { v: Deadline; label: string }[] = [
  { v: "rush", label: "2週間以内に欲しい" },
  { v: "month", label: "1ヶ月くらい" },
  { v: "none", label: "急がない" },
];
const STYLE_OPTS: { v: Style; label: string }[] = [
  { v: "flashy", label: "派手・オリジナル系" },
  { v: "classic", label: "伝統的・プロ球団風" },
  { v: "any", label: "おまかせ" },
];

const DESIGN_TYPE_TEXT: Record<Analysis["designType"], string> = {
  flashy: "多色・鮮やかで、昇華プリントで映えるオリジナル系デザインです",
  classic: "落ち着いた配色で、刺繍・伝統系（プロ球団風）がよく似合います",
  balanced: "昇華でも刺繍でもきれいにまとまるバランス型の配色です",
};

export default function Shindan() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [answers, setAnswers] = useState<Answers>({
    teamSize: null,
    budget: null,
    deadline: null,
    style: "any",
  });
  const [results, setResults] = useState<Result[] | null>(null);

  const onFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const a = analyzeImage(img);
      setAnalysis(a);
      setPreview(url);
      // 解析結果からデザイン傾向を自動セット（ユーザーが後から変更可能）
      setAnswers((prev) => ({
        ...prev,
        style: a.designType === "balanced" ? "any" : a.designType,
      }));
      setResults(null);
    };
    img.src = url;
  };

  const ready =
    answers.teamSize !== null &&
    answers.budget !== null &&
    answers.deadline !== null;

  const run = () => {
    setResults(diagnose(answers, analysis));
    setTimeout(() => {
      document
        .getElementById("shindan-result")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const opt = <T extends string>(
    key: keyof Answers,
    opts: { v: T; label: string }[],
    current: T | null
  ) => (
    <div className="option-grid">
      {opts.map((o) => (
        <button
          key={o.v}
          className={`option-btn ${current === o.v ? "active" : ""}`}
          onClick={() => {
            setAnswers((a) => ({ ...a, [key]: o.v }));
            setResults(null);
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="shindan-step">
        <h2>
          <span className="step-num">1</span>イメージ写真をアップロード（任意）
        </h2>
        <p className="step-sub">
          作りたいユニフォームに近い写真（プロ球団・他チーム・イラスト等）から配色を解析します。
          画像はブラウザ内だけで処理され、どこにも送信されません。
        </p>
        <div
          className="dropzone"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onFile(e.dataTransfer.files?.[0]);
          }}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="アップロードしたイメージ写真" />
          ) : (
            <>
              📷 クリックして写真を選択（またはドラッグ＆ドロップ）
              <br />
              <small>JPG / PNG / WebP 対応</small>
            </>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        {analysis && analysis.swatches.length > 0 && (
          <div className="analysis-panel">
            <div className="palette">
              {analysis.swatches.map((c, i) => (
                <span
                  key={i}
                  className="swatch"
                  style={{
                    background: c.hex,
                    width: 34 + Math.round(c.weight * 40),
                    height: 34 + Math.round(c.weight * 40),
                  }}
                  title={`${c.hex}（約${Math.round(c.weight * 100)}%）`}
                />
              ))}
            </div>
            <div className="analysis-tags">
              <span className="a-tag">
                ベースカラー：<b>{analysis.baseColorName}系</b>
              </span>
              <span className="a-tag">
                配色：<b>{analysis.complexityLabel}</b>（{analysis.complexity}系統）
              </span>
              <span className="a-tag">
                トーン：<b>{analysis.toneLabel}</b>
              </span>
            </div>
            <p className="analysis-summary">
              📊 {DESIGN_TYPE_TEXT[analysis.designType]}
            </p>
          </div>
        )}
      </div>

      <div className="shindan-step">
        <h2>
          <span className="step-num">2</span>チームの人数は？
        </h2>
        {opt("teamSize", TEAM_OPTS, answers.teamSize)}
      </div>

      <div className="shindan-step">
        <h2>
          <span className="step-num">3</span>1人あたりの予算は？（上下セット）
        </h2>
        {opt("budget", BUDGET_OPTS, answers.budget)}
      </div>

      <div className="shindan-step">
        <h2>
          <span className="step-num">4</span>いつまでに欲しい？
        </h2>
        {opt("deadline", DEADLINE_OPTS, answers.deadline)}
      </div>

      <div className="shindan-step">
        <h2>
          <span className="step-num">5</span>デザインの方向性は？
          {preview && (
            <small style={{ fontWeight: 400 }}>（写真から自動判定済み・変更OK）</small>
          )}
        </h2>
        {opt("style", STYLE_OPTS, answers.style)}
      </div>

      <button className="shindan-submit" disabled={!ready} onClick={run}>
        {ready ? "⚾ 診断結果を見る" : "上の質問（2〜4）に答えると診断できます"}
      </button>

      {results && (
        <section id="shindan-result" style={{ paddingTop: 30 }}>
          <h2 className="section-title">あなたのチームにおすすめの3社</h2>
          <p className="section-sub">
            {analysis
              ? `写真の配色（${analysis.baseColorName}系・${analysis.complexityLabel}）と条件の両方から相性をスコア化しました。`
              : "回答した条件との相性をスコア化しました。"}
            まずは上位2社に見積もりを取るのがおすすめです。
          </p>
          {results.map((r, i) => (
            <article
              key={r.maker.id}
              className={`result-card ${i === 0 ? "first" : ""}`}
            >
              <span className="result-rank-badge">
                {i === 0
                  ? "🥇 いちばんおすすめ"
                  : i === 1
                    ? "🥈 第2候補"
                    : "🥉 第3候補"}
              </span>
              <div className="result-head">
                <UniformIcon id={r.maker.id} size={56} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: "2px 0 0", fontSize: 18 }}>
                    {r.maker.name}
                  </h3>
                  <div className="match-bar">
                    <span style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="match-label">マッチ度 {r.pct}%</span>
                </div>
              </div>
              <ul className="result-reasons">
                {r.reasons.map((reason, j) => (
                  <li key={j}>{reason}</li>
                ))}
              </ul>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 14,
                  flexWrap: "wrap",
                }}
              >
                <a
                  className="btn"
                  style={{
                    flex: 1,
                    minWidth: 180,
                    marginTop: 0,
                    textAlign: "center",
                  }}
                  href={ctaUrl(r.maker)}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  公式サイトで見積もる
                </a>
                <a
                  className="btn secondary"
                  style={{
                    flex: 1,
                    minWidth: 180,
                    marginTop: 0,
                    textAlign: "center",
                  }}
                  href={`/#compare`}
                >
                  比較表で確認
                </a>
              </div>
            </article>
          ))}
          <AdSlot id="shindan-result" />
        </section>
      )}
    </>
  );
}
