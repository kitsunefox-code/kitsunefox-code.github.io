import sharp from "sharp";
import fs from "fs";

// 野球人間ドックのOGP画像（1200x630）。INK & PAPER 意匠。
// 全45問・処方ラインを反映。再生成: node scripts/gen-og-dock.mjs
const W = 1200;
const H = 630;
const INK = "#1c1b18";
const PAPER = "#faf9f6";
const ACCENT = "#b3472e";
const SUB = "#6b665d";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <!-- 上下の墨罫 -->
  <rect x="56" y="70" width="${W - 112}" height="4" fill="${INK}"/>
  <rect x="56" y="${H - 74}" width="${W - 112}" height="2" fill="${INK}"/>

  <!-- kicker -->
  <text x="60" y="146" font-family="'Yu Gothic','Hiragino Sans','Noto Sans JP',sans-serif" font-size="30" font-weight="700" letter-spacing="4" fill="${ACCENT}">MBTI式・全45問のフル診断</text>

  <!-- タイトル -->
  <text x="58" y="248" font-family="'Yu Mincho','Hiragino Mincho ProN','Noto Serif JP',serif" font-size="104" font-weight="700" fill="${INK}">野球人間ドック</text>

  <!-- サブヘッド -->
  <text x="60" y="336" font-family="'Yu Gothic','Hiragino Sans','Noto Sans JP',sans-serif" font-size="40" font-weight="700" fill="${INK}">あなたのMBTIタイプ <tspan fill="${ACCENT}">×</tspan> 最も近いプロ選手を1人、ズバリ。</text>

  <!-- 本文 -->
  <text x="60" y="404" font-family="'Yu Gothic','Hiragino Sans','Noto Sans JP',sans-serif" font-size="30" font-weight="500" fill="${SUB}">バット・グローブ・スパイク・打撃手袋・サポーターまで“処方”。</text>
  <text x="60" y="450" font-family="'Yu Gothic','Hiragino Sans','Noto Sans JP',sans-serif" font-size="30" font-weight="500" fill="${SUB}">結果はAIイラスト付き「検査結果報告書」一枚でお渡し。</text>

  <!-- サイト名 -->
  <text x="60" y="${H - 96}" font-family="'Yu Gothic','Hiragino Sans','Noto Sans JP',sans-serif" font-size="26" font-weight="700" letter-spacing="2" fill="${INK}">草野球ナビ ｜ kusayakyu-navi.com</text>

  <!-- 朱印スタンプ（回転・右上の余白へ） -->
  <g transform="translate(1055 182) rotate(-10)">
    <circle cx="0" cy="0" r="78" fill="none" stroke="${ACCENT}" stroke-width="5"/>
    <circle cx="0" cy="0" r="66" fill="none" stroke="${ACCENT}" stroke-width="2"/>
    <text x="0" y="-12" text-anchor="middle" font-family="'Yu Mincho','Hiragino Mincho ProN','Noto Serif JP',serif" font-size="25" font-weight="700" fill="${ACCENT}">草野球ナビ</text>
    <text x="0" y="30" text-anchor="middle" font-family="'Yu Mincho','Hiragino Mincho ProN','Noto Serif JP',serif" font-size="34" font-weight="700" fill="${ACCENT}">検定済</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("./public/og-dock.png");
const size = fs.statSync("./public/og-dock.png").size;
console.log("og-dock.png 生成完了:", Math.round(size / 1024) + "KB");
