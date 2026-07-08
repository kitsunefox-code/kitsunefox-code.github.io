import sharp from "sharp";
import fs from "fs";

const icons = JSON.parse(fs.readFileSync("./data/iconPaths.json", "utf8"));

// data/baseballMbti.ts と data/playerTypes.ts から code/nickname/catch, slug/name/desc を正規表現抽出
// (TSをそのまま読めないplain nodeで実行するため、ソースをテキストとしてパースする)
const mbtiSrc = fs.readFileSync("./data/baseballMbti.ts", "utf8");
const playerSrc = fs.readFileSync("./data/playerTypes.ts", "utf8");

function extractMbtiTypes(src) {
  const block = src.split("const MBTI_TYPES_RAW: MbtiTypeRaw[] = [")[1].split("\n];")[0];
  const entries = block.split(/\},\s*\{/);
  const out = [];
  for (const raw of entries) {
    const code = raw.match(/code:\s*"([^"]+)"/)?.[1];
    const nickname = raw.match(/nickname:\s*"([^"]+)"/)?.[1];
    const catchText = raw.match(/catch:\s*"([^"]+)"/)?.[1];
    if (code && nickname && catchText) out.push({ code, nickname, catch: catchText });
  }
  return out;
}

function extractPlayerTypes(src) {
  const block = src.split("const PLAYER_TYPES_RAW: PlayerTypeRaw[] = [")[1].split("\n];")[0];
  const entries = block.split(/\n  \{/).slice(1);
  const out = [];
  for (const raw of entries) {
    const slug = raw.match(/slug:\s*"([^"]+)"/)?.[1];
    const name = raw.match(/name:\s*"([^"]+)"/)?.[1];
    const desc = raw.match(/desc:\s*"([^"]+)"/)?.[1];
    if (slug && name && desc) out.push({ slug, name, desc });
  }
  return out;
}

const mbtiTypes = extractMbtiTypes(mbtiSrc);
const playerTypes = extractPlayerTypes(playerSrc);
console.log("mbti types:", mbtiTypes.length, "player types:", playerTypes.length);
if (mbtiTypes.length !== 16 || playerTypes.length !== 16) {
  console.error("抽出数が16件ではありません。正規表現を確認してください。");
  process.exit(1);
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function titleFontSize(text) {
  // タイトル全角文字数に応じて自動縮小(はみ出し防止)
  const len = [...text].length;
  if (len <= 10) return 62;
  if (len <= 14) return 50;
  if (len <= 18) return 42;
  return 36;
}

function iconSvg(key, x, y, size, color) {
  const def = icons[key];
  if (!def) return "";
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${def.viewBox}"><path fill="${color}" d="${def.d}"/></svg>`;
}

function buildSvg(mbti, player) {
  const title = `${mbti.code}×${player.name}`;
  const fs1 = titleFontSize(title);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#2f2b25"/><stop offset="1" stop-color="#4a3d31"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="235" fill="#b3472e" opacity="0.15"/>
  <circle cx="160" cy="540" r="175" fill="#b3472e" opacity="0.10"/>
  <text x="90" y="88" font-family="'Yu Gothic','Hiragino Sans',sans-serif" font-size="24" fill="#e9b9ac" letter-spacing="5">MBTI×選手タイプ複合診断</text>
  <text x="90" y="114" font-family="'Yu Gothic',sans-serif" font-size="16" fill="#9c8f83" letter-spacing="3">KUSAYAKYU NAVI</text>
  ${iconSvg(mbti.code.toLowerCase(), 90, 148, 92, "#f4e9e3")}
  ${iconSvg(player.slug, 192, 148, 92, "#e9b9ac")}
  <text x="298" y="185" font-family="'Yu Gothic',sans-serif" font-size="20" fill="#c9bfb6">${esc(mbti.nickname)} × ${esc(player.name)}型</text>
  <text x="90" y="${148 + 92 + 62}" font-family="'Yu Mincho','Hiragino Mincho ProN',serif" font-size="${fs1}" font-weight="700" fill="#ffffff">${esc(title)}</text>
  <text x="90" y="${148 + 92 + 62 + 46}" font-family="'Yu Gothic',sans-serif" font-size="24" fill="#f4e9e3">${esc(mbti.catch)}</text>
  <text x="90" y="${148 + 92 + 62 + 46 + 34}" font-family="'Yu Gothic',sans-serif" font-size="24" fill="#f4e9e3">${esc(player.desc)}</text>
  <g transform="translate(90,516)">
    <rect x="0" y="0" width="300" height="56" rx="28" fill="#b3472e"/>
    <text x="150" y="37" text-anchor="middle" font-family="'Yu Gothic',sans-serif" font-size="24" font-weight="700" fill="#fff">▶ 無料で診断する</text>
  </g>
  <text x="410" y="551" font-family="'Yu Gothic',sans-serif" font-size="20" fill="#c9bfb6">似ている選手＆使用メーカーもわかる</text>
</svg>`;
}

async function main() {
  fs.mkdirSync("./public/og-combo", { recursive: true });
  let n = 0;
  const total = mbtiTypes.length * playerTypes.length;
  for (const mbti of mbtiTypes) {
    for (const player of playerTypes) {
      const svg = buildSvg(mbti, player);
      const outPath = `./public/og-combo/${mbti.code.toLowerCase()}-${player.slug}.png`;
      await sharp(Buffer.from(svg)).png().toFile(outPath);
      n++;
      if (n % 32 === 0) console.log(`${n}/${total}`);
    }
  }
  console.log("DONE:", n, "images generated in public/og-combo/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
