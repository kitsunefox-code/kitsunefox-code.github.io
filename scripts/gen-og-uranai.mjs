import sharp from "sharp";
import fs from "fs";

// 野球ギアメーカー占いのOGP画像（1200x630）。INK & PAPER 意匠。
// 再生成: node scripts/gen-og-uranai.mjs
const W = 1200;
const H = 630;
const INK = "#1c1b18";
const PAPER = "#faf9f6";
const ACCENT = "#b3472e";
const SUB = "#6b665d";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="56" y="70" width="${W - 112}" height="4" fill="${INK}"/>
  <rect x="56" y="${H - 74}" width="${W - 112}" height="2" fill="${INK}"/>

  <!-- kicker -->
  <text x="60" y="146" font-family="'Yu Gothic','Hiragino Sans','Noto Sans JP',sans-serif" font-size="30" font-weight="700" letter-spacing="4" fill="${ACCENT}">GEAR FORTUNE ・ 毎日更新・無料</text>

  <!-- タイトル -->
  <text x="58" y="250" font-family="'Yu Mincho','Hiragino Mincho ProN','Noto Serif JP',serif" font-size="86" font-weight="700" fill="${INK}">野球ギアメーカー占い</text>

  <!-- サブヘッド -->
  <text x="60" y="338" font-family="'Yu Gothic','Hiragino Sans','Noto Sans JP',sans-serif" font-size="38" font-weight="700" fill="${INK}">使っている“推しメーカー”を選ぶだけ。</text>

  <!-- 本文 -->
  <text x="60" y="404" font-family="'Yu Gothic','Hiragino Sans','Noto Sans JP',sans-serif" font-size="29" font-weight="500" fill="${SUB}">総合運・打撃運・守備運・ラッキー背番号まで、</text>
  <text x="60" y="446" font-family="'Yu Gothic','Hiragino Sans','Noto Sans JP',sans-serif" font-size="29" font-weight="500" fill="${SUB}">あなたの“今日の運勢”を詳しく診断。試合前の運試しに。</text>

  <!-- サイト名 -->
  <text x="60" y="${H - 96}" font-family="'Yu Gothic','Hiragino Sans','Noto Sans JP',sans-serif" font-size="26" font-weight="700" letter-spacing="2" fill="${INK}">草野球ナビ ｜ kusayakyu-navi.com/uranai/</text>

  <!-- 星＋朱印スタンプ（右上） -->
  <text x="1128" y="150" text-anchor="end" font-family="'Yu Gothic',sans-serif" font-size="34" letter-spacing="4" fill="${ACCENT}">★★★★☆</text>
  <g transform="translate(1058 268) rotate(-10)">
    <circle cx="0" cy="0" r="76" fill="none" stroke="${ACCENT}" stroke-width="5"/>
    <circle cx="0" cy="0" r="64" fill="none" stroke="${ACCENT}" stroke-width="2"/>
    <text x="0" y="-10" text-anchor="middle" font-family="'Yu Mincho','Noto Serif JP',serif" font-size="24" font-weight="700" fill="${ACCENT}">今日の</text>
    <text x="0" y="30" text-anchor="middle" font-family="'Yu Mincho','Noto Serif JP',serif" font-size="34" font-weight="700" fill="${ACCENT}">運勢</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("./public/og-uranai.png");
const size = fs.statSync("./public/og-uranai.png").size;
console.log("og-uranai.png 生成完了:", Math.round(size / 1024) + "KB");
