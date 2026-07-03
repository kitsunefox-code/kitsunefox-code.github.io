"use client";

import { useRef, useState } from "react";
import { makers, ctaUrl, type Maker } from "@/data/makers";
import AdSlot from "@/components/AdSlot";

// ===== 画像から主要色を抽出（すべてブラウザ内で完結・アップロードなし） =====

type Palette = { colors: string[]; hueCount: number };

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

function extractPalette(img: HTMLImageElement): Palette {
  const S = 64;
  const canvas = document.createElement("canvas");
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { colors: [], hueCount: 0 };
  ctx.drawImage(img, 0, 0, S, S);
  const data = ctx.getImageData(0, 0, S, S).data;

  // 色を粗く量子化して頻度を数える
  const counts = new Map<string, number>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue; // 透過は無視
    const key = `${data[i] >> 5}_${data[i + 1] >> 5}_${data[i + 2] >> 5}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const top = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([k]) => {
      const [r, g, b] = k.split("_").map((n) => (Number(n) << 5) + 16);
      return { r, g, b };
    });

  // 彩度のある色相が何系統あるか（多い＝派手・グラデ系デザイン向き）
  const hueBuckets = new Set<number>();
  for (const { r, g, b } of top) {
    const { h, s, l } = rgbToHsl(r, g, b);
    if (s > 0.3 && l > 0.15 && l < 0.9) hueBuckets.add(Math.round(h / 40));
  }

  return {
    colors: top.map((c) => `rgb(${c.r},${c.g},${c.b})`),
    hueCount: hueBuckets.size,
  };
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

type Result = { maker: Maker; pct: number; reasons: string[] };

function minLotOf(m: Maker): number | null {
  if (m.minLot.startsWith("1着")) return 1;
  if (m.minLot.includes("5枚")) return 5;
  return null; // 不明
}

function diagnose(a: Answers, palette: Palette | null): Result[] {
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

    // デザインの方向性（写真の解析結果 or 手動選択）
    if (a.style === "flashy") {
      if (m.methods.includes("昇華")) {
        score += 20;
        reasons.push("昇華プリント対応でグラデ・多色デザインの再現度が高い");
      } else {
        score -= 25;
      }
      if (m.designSimulator) score += 5;
    } else if (a.style === "classic") {
      if (m.methods.includes("刺繍")) {
        score += 20;
        reasons.push("刺繍対応で伝統的・高級感のある仕上がり");
      }
      if (m.methods.includes("フルオーダー")) score += 5;
    }

    // 写真の配色数を理由として補足
    if (palette && palette.hueCount >= 3 && m.methods.includes("昇華")) {
      reasons.push(`写真の配色（${palette.hueCount}系統）は昇華プリント向き`);
    }

    if (reasons.length === 0) reasons.push("条件に大きなマイナスがないバランス型");

    const pct = Math.max(40, Math.min(97, 45 + Math.round(score * 0.75)));
    return { maker: m, pct, reasons: reasons.slice(0, 3) };
  });

  return results.sort((x, y) => y.pct - x.pct).slice(0, 3);
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

export default function Shindan() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [palette, setPalette] = useState<Palette | null>(null);
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
      const p = extractPalette(img);
      setPalette(p);
      setPreview(url);
      // 配色数からデザイン傾向を自動セット（ユーザーが後から変更可能）
      setAnswers((a) => ({ ...a, style: p.hueCount >= 3 ? "flashy" : "classic" }));
      setResults(null);
    };
    img.src = url;
  };

  const ready =
    answers.teamSize !== null &&
    answers.budget !== null &&
    answers.deadline !== null;

  const run = () => {
    setResults(diagnose(answers, palette));
    // 結果までスクロール
    setTimeout(() => {
      document.getElementById("shindan-result")?.scrollIntoView({ behavior: "smooth" });
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
        {palette && palette.colors.length > 0 && (
          <>
            <div className="palette">
              {palette.colors.map((c, i) => (
                <span key={i} className="swatch" style={{ background: c }} title={c} />
              ))}
            </div>
            <p className="step-sub" style={{ textAlign: "center", marginTop: 8 }}>
              解析結果：彩色{palette.hueCount}系統 →{" "}
              {palette.hueCount >= 3
                ? "多色づかいなので昇華プリント向きのデザインです"
                : "落ち着いた配色なので刺繍・伝統系も似合います"}
            </p>
          </>
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
          {preview && <small style={{ fontWeight: 400 }}>（写真から自動判定済み・変更OK）</small>}
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
            条件との相性をスコア化しました。まずは上位2社に見積もりを取るのがおすすめです。
          </p>
          {results.map((r, i) => (
            <article key={r.maker.id} className={`result-card ${i === 0 ? "first" : ""}`}>
              <span className="result-rank-badge">
                {i === 0 ? "🥇 いちばんおすすめ" : i === 1 ? "🥈 第2候補" : "🥉 第3候補"}
              </span>
              <h3 style={{ margin: "8px 0 0", fontSize: 18 }}>{r.maker.name}</h3>
              <div className="match-bar">
                <span style={{ width: `${r.pct}%` }} />
              </div>
              <span className="match-label">マッチ度 {r.pct}%</span>
              <ul className="result-reasons">
                {r.reasons.map((reason, j) => (
                  <li key={j}>{reason}</li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                <a
                  className="btn"
                  style={{ flex: 1, minWidth: 180, marginTop: 0, textAlign: "center" }}
                  href={ctaUrl(r.maker)}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  公式サイトで見積もる
                </a>
                <a
                  className="btn secondary"
                  style={{ flex: 1, minWidth: 180, marginTop: 0, textAlign: "center" }}
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
