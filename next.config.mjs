/** @type {import('next').NextConfig} */
const nextConfig = {
  // dev サーバーと本番 build の出力先を分離（launch.json が NEXT_DIST_DIR=.next-dev を渡す）
  // これがないと、dev サーバー起動中に npm run build すると .next を取り合って 404 になる
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // 静的HTMLとして書き出す（Vercel/Netlify/GitHub Pages 等どこでも配信可）
  output: "export",
  images: {
    // static export ではNext.jsの画像最適化を使えないため無効化
    unoptimized: true,
  },
  // 末尾スラッシュを付与（静的ホスティングでのパス解決を安定させる）
  trailingSlash: true,
};

export default nextConfig;
