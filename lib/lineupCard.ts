// 打順表（オーダー表）を1枚の画像に描画する。
//
// 狙い: 草野球チームは毎試合オーダーを作る。その成果物がそのままSNSに貼れる絵になれば、
// 「使う→貼る→見た人が来る」が毎週まわる。診断の結果カード(dockCard/fortuneCard)と
// 同じINK & PAPERの意匠で統一する。
//
// ⚠️ 縦長(1080x1350)だとXのタイムラインで切れるため、こちらは 1200x1200 の正方形にする。

export type LineupPlayer = {
  order: number; // 打順（1〜）
  name: string;
  position: string; // 守備位置（空でも可）
  avg?: string | null; // 打率（成績表から引ける場合のみ。".333" 形式）
};

export type LineupCardData = {
  teamName: string;
  opponent: string;
  date: string; // 表示用（例: 2026年10月15日）
  players: LineupPlayer[];
  bench: string[]; // 控え
  note: string; // 集合時間・球場などの一言
};

const W = 1200;
const H = 1200;
const INK = "#1c1b18";
const PAPER = "#faf9f6";
const ACCENT = "#b3472e";
const MUTED = "#55524b";
const LINE = "#ddd9d1";

const MINCHO =
  '"Shippori Mincho B1", "Hiragino Mincho ProN", "Yu Mincho", YuMincho, serif';
const GOTHIC =
  '"Yu Gothic Medium", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", Meiryo, sans-serif';

function setLS(ctx: CanvasRenderingContext2D, px: number) {
  // letterSpacing未対応ブラウザでは単に無視される
  try {
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${px}px`;
  } catch {
    /* noop */
  }
}

/** 長い名前は詰めて描く（はみ出すと表が崩れるため） */
function fitText(ctx: CanvasRenderingContext2D, text: string, maxW: number, basePx: number, font: string) {
  let px = basePx;
  for (let i = 0; i < 12; i++) {
    ctx.font = `700 ${px}px ${font}`;
    if (ctx.measureText(text).width <= maxW) break;
    px -= 2;
    if (px <= basePx * 0.6) break;
  }
  return px;
}

export async function renderLineupCard(data: LineupCardData): Promise<HTMLCanvasElement> {
  const probe = `${data.teamName}${data.opponent}打順表オーダー表${data.players.map((p) => p.name).join("")}`;
  try {
    await Promise.all([
      (document as Document).fonts.load(`700 56px "Shippori Mincho B1"`, probe),
      (document as Document).fonts.load(`600 26px "Crimson Pro"`),
    ]);
    await (document as Document).fonts.ready;
  } catch {
    /* システムフォントで描画 */
  }

  const canvas = document.createElement("canvas");
  const dpr = 2;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  ctx.textBaseline = "alphabetic";

  // 背景（紙）
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  /* ── 墨のヘッダー ── */
  const headH = 150;
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, headH);

  ctx.fillStyle = PAPER;
  setLS(ctx, 6);
  ctx.font = `600 20px ${GOTHIC}`;
  ctx.fillText("STARTING LINEUP", 56, 52);
  setLS(ctx, 0);

  // チーム名（長ければ縮める）
  const teamPx = fitText(ctx, data.teamName || "わがチーム", W - 420, 54, MINCHO);
  ctx.font = `700 ${teamPx}px ${MINCHO}`;
  ctx.fillStyle = PAPER;
  ctx.fillText(data.teamName || "わがチーム", 56, 112);

  // 右上：日付と相手
  ctx.textAlign = "right";
  ctx.fillStyle = "#cfc9bf";
  ctx.font = `600 22px ${GOTHIC}`;
  if (data.date) ctx.fillText(data.date, W - 56, 58);
  if (data.opponent) {
    ctx.fillStyle = PAPER;
    ctx.font = `700 28px ${MINCHO}`;
    ctx.fillText(`vs ${data.opponent}`, W - 56, 104);
  }
  ctx.textAlign = "left";

  /* ── 打順の表 ── */
  // 行の高さは「残り全部を使い切る」よう逆算する。固定値にすると
  // 9人のときに下半分が空白になり、間の抜けた絵になるため。
  const top = headH + 44;
  const rows = data.players.length || 9;
  const footLineY = H - 86; // 足元の罫線
  const benchNoteH = (data.bench.length > 0 ? 42 : 0) + (data.note ? 38 : 0);
  const tableBottom = footLineY - 28 - benchNoteH;
  const rowH = Math.max(44, Math.min(104, Math.floor((tableBottom - top) / Math.max(rows, 1))));
  const xNum = 70;
  const xPos = 168; // 守備位置は中央ぞろえ
  const xName = 265;
  const xAvg = W - 70;

  // 見出し
  ctx.fillStyle = MUTED;
  ctx.font = `700 18px ${GOTHIC}`;
  setLS(ctx, 2);
  ctx.textAlign = "center";
  ctx.fillText("打順", xNum, top - 14);
  ctx.fillText("守備", xPos, top - 14);
  ctx.textAlign = "left";
  ctx.fillText("選手", xName, top - 14);
  const anyAvg = data.players.some((p) => p.avg);
  if (anyAvg) {
    ctx.textAlign = "right";
    ctx.fillText("打率", xAvg, top - 14);
    ctx.textAlign = "left";
  }
  setLS(ctx, 0);

  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(56, top - 4);
  ctx.lineTo(W - 56, top - 4);
  ctx.stroke();

  data.players.forEach((p, i) => {
    const y = top + rowH * i + rowH * 0.66;

    // 行の下罫
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(56, top + rowH * (i + 1) - 4);
    ctx.lineTo(W - 56, top + rowH * (i + 1) - 4);
    ctx.stroke();

    // 打順番号
    ctx.fillStyle = ACCENT;
    ctx.font = `700 34px ${MINCHO}`;
    ctx.textAlign = "center";
    ctx.fillText(String(p.order), xNum, y);
    ctx.textAlign = "left";

    // 守備位置
    if (p.position) {
      ctx.fillStyle = MUTED;
      ctx.font = `600 22px ${GOTHIC}`;
      ctx.textAlign = "center";
      ctx.fillText(p.position, xPos, y - 4);
      ctx.textAlign = "left";
    }

    // 選手名（長い名前は縮める）
    const maxNameW = (anyAvg ? xAvg - 130 : W - 80) - xName;
    const px = fitText(ctx, p.name, maxNameW, 34, MINCHO);
    ctx.fillStyle = INK;
    ctx.font = `700 ${px}px ${MINCHO}`;
    ctx.fillText(p.name, xName, y);

    // 打率（ある人だけ）
    if (p.avg) {
      ctx.fillStyle = INK;
      ctx.font = `600 28px "Crimson Pro", Georgia, serif`;
      ctx.textAlign = "right";
      ctx.fillText(p.avg, xAvg, y);
      ctx.textAlign = "left";
    }
  });

  /* ── 控え ── */
  let footY = top + rowH * rows + 42;
  if (data.bench.length > 0) {
    ctx.fillStyle = MUTED;
    ctx.font = `700 18px ${GOTHIC}`;
    setLS(ctx, 2);
    ctx.fillText("控え", 56, footY);
    setLS(ctx, 0);
    ctx.fillStyle = INK;
    ctx.font = `600 24px ${GOTHIC}`;
    const benchText = data.bench.join("・");
    // 長すぎる場合は縮める
    const bpx = fitText(ctx, benchText, W - 180, 24, GOTHIC);
    ctx.font = `600 ${bpx}px ${GOTHIC}`;
    ctx.fillText(benchText, 120, footY);
    footY += 42;
  }

  /* ── 一言メモ ── */
  if (data.note) {
    ctx.fillStyle = MUTED;
    ctx.font = `600 22px ${GOTHIC}`;
    const npx = fitText(ctx, data.note, W - 112, 22, GOTHIC);
    ctx.font = `600 ${npx}px ${GOTHIC}`;
    ctx.fillText(data.note, 56, footY);
  }

  /* ── 足元 ── */
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(56, H - 86);
  ctx.lineTo(W - 56, H - 86);
  ctx.stroke();

  ctx.fillStyle = MUTED;
  ctx.font = `600 22px ${GOTHIC}`;
  ctx.fillText("打順表メーカー", 56, H - 46);
  ctx.textAlign = "right";
  ctx.fillStyle = ACCENT;
  ctx.font = `600 22px "Crimson Pro", Georgia, serif`;
  ctx.fillText("kusayakyu-navi.com/lineup/", W - 56, H - 46);
  ctx.textAlign = "left";

  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png", 0.95));
}
