// 「野球ギアメーカー占い」の結果を、そのままシェアできる1枚のカード画像に描画する。
// 静的サイトでは日替わり結果のOGPを事前生成できないため、この“クライアント生成画像”が
// 実質の結果シェア画像になる。INK & PAPER の意匠を踏襲。
export type FortuneCardData = {
  maker: string;
  tagline: string;
  dateLabel: string; // 例: 7月9日
  catch: string; // 今日の運勢キャッチ
  rank: number; // 1-5
  sougou: string;
  batting: string;
  fielding: string;
  luckyPos: string;
  luckyNo: number;
};

const W = 1080;
const H = 1350;
const INK = "#1c1b18";
const PAPER = "#faf9f6";
const ACCENT = "#b3472e";
const ACCENT2 = "#d67a52";
const MUTED = "#55524b";

const MINCHO =
  '"Shippori Mincho B1", "Hiragino Mincho ProN", "Yu Mincho", YuMincho, serif';
const GOTHIC =
  '"Yu Gothic Medium", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", Meiryo, sans-serif';
const SERIF = '"Crimson Pro", Georgia, serif';

function setLS(ctx: CanvasRenderingContext2D, px: number) {
  try {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = `${px}px`;
  } catch {
    /* noop */
  }
}

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

export async function renderFortuneCard(data: FortuneCardData): Promise<HTMLCanvasElement> {
  const probe = `${data.maker}${data.tagline}${data.catch}今日のギア占い野球ギアメーカー占い総合運打撃運守備運`;
  try {
    await Promise.all([
      (document as Document).fonts.load(`700 60px "Shippori Mincho B1"`, probe),
      (document as Document).fonts.load(`600 30px "Crimson Pro"`),
    ]);
    await (document as Document).fonts.ready;
  } catch {
    /* システム明朝で描画 */
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
  const headH = 270;
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, headH);

  ctx.fillStyle = "rgba(250,249,246,0.55)";
  ctx.font = `500 22px ${SERIF}`;
  setLS(ctx, 6);
  ctx.fillText("GEAR FORTUNE — DAILY", 64, 90);
  setLS(ctx, 0);

  ctx.fillStyle = ACCENT;
  ctx.fillRect(64, 112, 60, 5);

  ctx.fillStyle = "#fff";
  ctx.font = `700 74px ${MINCHO}`;
  setLS(ctx, 6);
  ctx.fillText("今日のギア占い", 60, 202);
  setLS(ctx, 0);

  ctx.fillStyle = "rgba(250,249,246,0.72)";
  ctx.font = `500 26px ${GOTHIC}`;
  ctx.fillText("野球ギアメーカー占い ｜ 草野球ナビ", 64, 246);

  // 今日の運勢スタンプ（右上・回転）
  ctx.save();
  ctx.translate(950, 140);
  ctx.rotate((-11 * Math.PI) / 180);
  ctx.strokeStyle = ACCENT2;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, 70, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = ACCENT2;
  ctx.textAlign = "center";
  ctx.font = `700 24px ${MINCHO}`;
  ctx.fillText("今日の", 0, -8);
  ctx.font = `700 32px ${MINCHO}`;
  ctx.fillText("運勢", 0, 30);
  ctx.textAlign = "left";
  ctx.restore();

  // ── メーカー ──
  let y = headH + 66;
  ctx.fillStyle = ACCENT;
  ctx.font = `700 24px ${MINCHO}`;
  setLS(ctx, 8);
  ctx.fillText("あなたのメーカー", 64, y);
  setLS(ctx, 0);

  y += 76;
  ctx.fillStyle = ACCENT;
  ctx.font = `700 68px ${MINCHO}`;
  let mfs = 68;
  while (ctx.measureText(data.maker).width > W - 128 && mfs > 40) {
    mfs -= 2;
    ctx.font = `700 ${mfs}px ${MINCHO}`;
  }
  ctx.fillText(data.maker, 64, y);

  y += 44;
  ctx.fillStyle = INK;
  ctx.font = `700 30px ${MINCHO}`;
  ctx.fillText(`「${data.tagline}」`, 64, y);

  y += 26;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, y);
  ctx.lineTo(W - 64, y);
  ctx.stroke();

  // ── 今日の運勢 ──
  y += 58;
  ctx.fillStyle = "#fff";
  ctx.fillStyle = INK;
  ctx.fillRect(64, y - 30, 200, 42);
  ctx.fillStyle = "#fff";
  ctx.font = `700 24px ${GOTHIC}`;
  ctx.fillText(`${data.dateLabel}の運勢`, 78, y);

  // 星
  const rank = Math.max(1, Math.min(5, data.rank));
  const starStr = "★★★★★".slice(0, rank) + "☆☆☆☆☆".slice(0, 5 - rank);
  ctx.fillStyle = ACCENT;
  ctx.font = `400 34px ${GOTHIC}`;
  ctx.textAlign = "right";
  setLS(ctx, 3);
  ctx.fillText(starStr, W - 64, y);
  setLS(ctx, 0);
  ctx.textAlign = "left";

  y += 56;
  ctx.fillStyle = INK;
  ctx.font = `700 40px ${MINCHO}`;
  y = wrapText(ctx, data.catch, 64, y, W - 128, 52, 2) + 6;

  // 3項目
  const rows: { label: string; text: string }[] = [
    { label: "総合運", text: data.sougou },
    { label: "打撃運", text: data.batting },
    { label: "守備運", text: data.fielding },
  ];
  for (const r of rows) {
    y += 22;
    ctx.fillStyle = ACCENT;
    ctx.fillRect(64, y - 20, 4, 26);
    ctx.font = `700 24px ${MINCHO}`;
    ctx.fillStyle = ACCENT;
    ctx.fillText(r.label, 82, y);
    y += 34;
    ctx.fillStyle = MUTED;
    ctx.font = `400 26px ${GOTHIC}`;
    y = wrapText(ctx, r.text, 64, y, W - 128, 38, 2) + 6;
  }

  // ラッキー
  y += 18;
  const half = (W - 128 - 24) / 2;
  const drawLucky = (label: string, value: string, cx: number) => {
    ctx.strokeStyle = "#ddd9d1";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx, y, half, 86);
    ctx.fillStyle = MUTED;
    ctx.font = `700 20px ${MINCHO}`;
    ctx.fillText(label, cx + 20, y + 34);
    ctx.fillStyle = INK;
    ctx.font = `700 40px ${MINCHO}`;
    ctx.fillText(value, cx + 20, y + 72);
  };
  drawLucky("ラッキーポジション", data.luckyPos, 64);
  drawLucky("ラッキー背番号", String(data.luckyNo), 64 + half + 24);

  // ── フッター ──
  const fy = H - 58;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, fy - 32);
  ctx.lineTo(W - 64, fy - 32);
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.font = `700 26px ${MINCHO}`;
  setLS(ctx, 4);
  ctx.fillText("野球ギアメーカー占い", 64, fy);
  setLS(ctx, 0);
  ctx.fillStyle = MUTED;
  ctx.font = `500 24px ${SERIF}`;
  ctx.textAlign = "right";
  setLS(ctx, 2);
  ctx.fillText("kusayakyu-navi.com/uranai/", W - 64, fy);
  setLS(ctx, 0);
  ctx.textAlign = "left";

  return canvas;
}
