// 野球人間ドックの「検査結果報告書」を、そのままシェアできる1枚のカード画像に描画する。
// 静的サイトでは結果別OGPを事前生成できないため、この“クライアント生成画像”が
// 実質の結果別シェア画像（＝結果別OGPの代わり）になる。INK & PAPERの意匠を踏襲。
import { ICON_PATHS } from "@/data/icons";

export type DockCardData = {
  code: string; // MBTIコード
  verdict?: string; // 総合判定の表示文字列（省略時は code×playName）
  mbtiNickname: string;
  mbtiIcon: string;
  mbtiCatch: string;
  axes: { leftJp: string; rightJp: string; leftPct: number; letterLeft: boolean }[];
  playName: string; // 選手タイプ名（型は付けない）
  playIcon: string;
  playDesc: string;
  similarPlayer: string; // 似ているプロ選手
  similarMeta: string; // League・position
  batModel: string;
  batMeta: string; // maker/material
  gloveWeb: string;
  glovePos: string; // 「内野向け」等
};

const W = 1080;
const H = 1350;
const INK = "#1c1b18";
const PAPER = "#faf9f6";
const ACCENT = "#b3472e";
const ACCENT2 = "#d67a52";
const MUTED = "#55524b";
const LINE = "#ddd9d1";

const MINCHO =
  '"Shippori Mincho B1", "Hiragino Mincho ProN", "Yu Mincho", YuMincho, serif';
const GOTHIC =
  '"Yu Gothic Medium", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", Meiryo, sans-serif';
const SERIF = '"Crimson Pro", Georgia, serif';

function setLS(ctx: CanvasRenderingContext2D, px: number) {
  // letterSpacing対応ブラウザのみ。未対応は無視される。
  try {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = `${px}px`;
  } catch {
    /* noop */
  }
}

// SVGアイコン(viewBox基準)を (x,y) 左上・sizeで描画
function drawIcon(
  ctx: CanvasRenderingContext2D,
  key: string,
  x: number,
  y: number,
  size: number,
  color: string
) {
  const def = ICON_PATHS[key];
  if (!def) return;
  const vb = def.viewBox.split(/\s+/).map(Number); // [0,0,w,h]
  const vw = vb[2] || 512;
  const vh = vb[3] || 512;
  const scale = size / Math.max(vw, vh);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  try {
    const p = new Path2D(def.d);
    ctx.fill(p);
  } catch {
    /* Path2D未対応環境は無視 */
  }
  ctx.restore();
}

// 折り返し描画（最大行数まで、超過は…）
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
): number {
  const chars = [...text];
  let line = "";
  let lines = 0;
  for (let i = 0; i < chars.length; i++) {
    const test = line + chars[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      if (lines === maxLines - 1) {
        // 最終行：入るところまで＋…
        let t = line;
        while (ctx.measureText(t + "…").width > maxWidth && t) t = t.slice(0, -1);
        ctx.fillText(t + "…", x, y + lines * lineHeight);
        return y + (lines + 1) * lineHeight;
      }
      ctx.fillText(line, x, y + lines * lineHeight);
      line = chars[i];
      lines++;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y + lines * lineHeight);
  return y + (lines + 1) * lineHeight;
}

export async function renderDockCard(data: DockCardData): Promise<HTMLCanvasElement> {
  // フォント確実ロード（描画文字を渡してサブセットも呼び込む）
  const probe = `${data.code}${data.mbtiNickname}${data.playName}検査結果報告書野球人間ドック`;
  try {
    await Promise.all([
      (document as Document).fonts.load(`700 60px "Shippori Mincho B1"`, probe),
      (document as Document).fonts.load(`600 30px "Crimson Pro"`),
    ]);
    await (document as Document).fonts.ready;
  } catch {
    /* フォント未対応環境はシステム明朝で描画 */
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

  // ── 墨ヘッダー ──
  const headH = 300;
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, headH);

  ctx.fillStyle = "rgba(250,249,246,0.55)";
  ctx.font = `500 22px ${SERIF}`;
  setLS(ctx, 6);
  ctx.fillText("MEDICAL-STYLE REPORT — FOR BASEBALL", 64, 92);
  setLS(ctx, 0);

  // 朱の短罫
  ctx.fillStyle = ACCENT;
  ctx.fillRect(64, 116, 60, 5);

  ctx.fillStyle = "#fff";
  ctx.font = `700 78px ${MINCHO}`;
  setLS(ctx, 8);
  ctx.fillText("検査結果報告書", 60, 210);
  setLS(ctx, 0);

  ctx.fillStyle = "rgba(250,249,246,0.72)";
  ctx.font = `500 26px ${GOTHIC}`;
  ctx.fillText("野球人間ドック ｜ 草野球ナビ検定", 64, 258);

  // 検定スタンプ（右上・回転）
  ctx.save();
  ctx.translate(940, 150);
  ctx.rotate((-11 * Math.PI) / 180);
  ctx.strokeStyle = ACCENT2;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, 74, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = ACCENT2;
  ctx.textAlign = "center";
  ctx.font = `700 27px ${MINCHO}`;
  ctx.fillText("草野球ナビ", 0, -6);
  ctx.font = `700 30px ${MINCHO}`;
  ctx.fillText("検定済", 0, 34);
  ctx.textAlign = "left";
  ctx.restore();

  // ── 総合判定 ──
  let y = headH + 70;
  ctx.fillStyle = ACCENT;
  ctx.font = `700 24px ${MINCHO}`;
  setLS(ctx, 8);
  ctx.fillText("総合判定", 64, y);
  setLS(ctx, 0);

  y += 62;
  ctx.fillStyle = INK;
  ctx.font = `700 62px ${MINCHO}`;
  const verdict = data.verdict || `${data.code}×${data.playName}`;
  // 幅に応じて自動縮小
  let vfs = 62;
  while (ctx.measureText(verdict).width > W - 128 && vfs > 34) {
    vfs -= 2;
    ctx.font = `700 ${vfs}px ${MINCHO}`;
  }
  ctx.fillText(verdict, 64, y);

  y += 34;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, y);
  ctx.lineTo(W - 64, y);
  ctx.stroke();

  // ── 各行 ──
  const rowX = 64;
  const iconSize = 44;
  const drawRowLabel = (no: string, title: string, yy: number) => {
    ctx.fillStyle = ACCENT;
    ctx.font = `400 30px ${SERIF}`;
    ctx.fillText(no, rowX, yy);
    const noW = ctx.measureText(no).width;
    ctx.fillStyle = MUTED;
    ctx.font = `700 22px ${MINCHO}`;
    setLS(ctx, 6);
    ctx.fillText(title, rowX + Math.max(58, noW + 22), yy - 2);
    setLS(ctx, 0);
  };

  // 01 こころ
  y += 66;
  drawRowLabel("01", "こころ（性格型）", y);
  y += 52;
  drawIcon(ctx, data.mbtiIcon, rowX, y - iconSize + 6, iconSize, ACCENT);
  ctx.fillStyle = INK;
  ctx.font = `700 40px ${MINCHO}`;
  ctx.fillText(`${data.code} 「${data.mbtiNickname}」`, rowX + iconSize + 16, y);
  y += 36;
  ctx.fillStyle = MUTED;
  ctx.font = `400 25px ${GOTHIC}`;
  y = wrapText(ctx, data.mbtiCatch, rowX, y, W - 128, 38, 2) + 4;

  // 4軸バー
  const barW = W - 128 - 260;
  for (const ax of data.axes) {
    const barY = y + 10;
    ctx.fillStyle = ax.letterLeft ? INK : MUTED;
    ctx.font = `700 22px ${GOTHIC}`;
    ctx.fillText(`${ax.leftJp} ${ax.leftPct}%`, rowX, barY + 8);
    // バー
    const bx = rowX + 130;
    ctx.fillStyle = "rgba(28,27,24,0.12)";
    ctx.fillRect(bx, barY - 6, barW, 12);
    ctx.fillStyle = ACCENT;
    ctx.fillRect(bx, barY - 6, (barW * ax.leftPct) / 100, 12);
    ctx.fillStyle = !ax.letterLeft ? INK : MUTED;
    ctx.font = `700 22px ${GOTHIC}`;
    ctx.textAlign = "right";
    ctx.fillText(`${ax.rightJp} ${100 - ax.leftPct}%`, W - 64, barY + 8);
    ctx.textAlign = "left";
    y += 40;
  }

  // 02 プレースタイル
  y += 40;
  drawRowLabel("02", "プレースタイル", y);
  y += 52;
  drawIcon(ctx, data.playIcon, rowX, y - iconSize + 6, iconSize, ACCENT);
  ctx.fillStyle = INK;
  ctx.font = `700 40px ${MINCHO}`;
  ctx.fillText(`${data.playName}型`, rowX + iconSize + 16, y);
  y += 36;
  ctx.fillStyle = MUTED;
  ctx.font = `400 25px ${GOTHIC}`;
  ctx.fillText(`似ているプロ：${data.similarPlayer}（${data.similarMeta}）`, rowX, y);
  y += 8;

  // 処方（バット・グローブ）2列
  y += 58;
  drawRowLabel("03 / 04", "処方：バット & グローブ", y);
  y += 50;
  const colW = (W - 128 - 30) / 2;
  const drawRx = (label: string, main: string, meta: string, cx: number) => {
    ctx.fillStyle = INK;
    ctx.fillRect(cx, y - 34, 4, 4 + 96); // 朱ではなく墨の細タブ
    ctx.fillStyle = ACCENT;
    ctx.fillRect(cx, y - 34, 4, 40);
    ctx.fillStyle = MUTED;
    ctx.font = `700 21px ${MINCHO}`;
    ctx.fillText(label, cx + 20, y - 12);
    ctx.fillStyle = INK;
    ctx.font = `700 30px ${MINCHO}`;
    let fs = 30;
    while (ctx.measureText(main).width > colW - 28 && fs > 20) {
      fs -= 1;
      ctx.font = `700 ${fs}px ${MINCHO}`;
    }
    ctx.fillText(main, cx + 20, y + 24);
    ctx.fillStyle = MUTED;
    ctx.font = `400 21px ${GOTHIC}`;
    ctx.fillText(meta, cx + 20, y + 58);
  };
  drawRx("処方：バット", data.batModel, data.batMeta, rowX);
  drawRx("処方：グローブ", data.gloveWeb, data.glovePos, rowX + colW + 30);

  // ── フッター ──
  const fy = H - 62;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, fy - 34);
  ctx.lineTo(W - 64, fy - 34);
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.font = `700 26px ${MINCHO}`;
  setLS(ctx, 4);
  ctx.fillText("野球人間ドック", 64, fy);
  setLS(ctx, 0);
  ctx.fillStyle = MUTED;
  ctx.font = `500 24px ${SERIF}`;
  ctx.textAlign = "right";
  setLS(ctx, 2);
  ctx.fillText("kusayakyu-navi.com", W - 64, fy);
  setLS(ctx, 0);
  ctx.textAlign = "left";

  return canvas;
}

// canvas → Blob
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png", 0.95));
}
