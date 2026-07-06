import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "軟式バット比較【2026年版】金属・カーボン・ビヨンド系を飛距離・価格で比較｜主要ブランドの傾向も",
  description:
    "草野球の軟式バットを、素材（金属・カーボン・ウレタン複合＝ビヨンド系）ごとに飛距離・価格・扱いやすさで比較。ミズノ・SSK・ゼット・ローリングスなど主要ブランドの傾向、規格の注意点、あなたに合う一本の選び方まで解説します。",
  alternates: { canonical: `${SITE_URL}/bat/` },
  openGraph: {
    title: "軟式バット比較【2026年版】素材・価格・主要ブランドの傾向",
    description:
      "金属・カーボン・ビヨンド系を飛距離・価格で比較。主要ブランドの傾向と選び方も。",
    type: "website",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "軟式バット比較【2026年版】金属・カーボン・ビヨンド系を飛距離・価格で比較",
    inLanguage: "ja",
    dateModified: "2026-07-06",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
  );
}

export default function BatComparePage() {
  return (
    <main>
      <div className="hero" style={{ padding: "56px 0 46px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Bat
          </p>
          <h1>
            軟式バット<span className="hl">比較</span>
          </h1>
          <p>
            素材（金属・カーボン・ビヨンド系）ごとに飛距離・価格・扱いやすさを比較。
            主要ブランドの傾向と、あなたに合う一本の選び方まで。
          </p>
        </div>
      </div>

      <div className="container">
        <AdSlot id="top-under-hero" />
        <article className="article">
          <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

          <p>
            軟式バット選びは、まず<strong>素材</strong>で大きく方向性が決まります。
            「飛ぶバット」の正体はほぼ素材の違い。3タイプを比較して、
            そのうえで主要ブランドの傾向を押さえましょう。
          </p>

          <h2>素材で比較：金属 / カーボン / ビヨンド系</h2>
          <table>
            <thead>
              <tr>
                <th>素材</th>
                <th>飛距離</th>
                <th>価格帯</th>
                <th>向いている人</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>金属（ジュラルミン等）</td>
                <td>標準</td>
                <td>5,000〜12,000円</td>
                <td>初心者・コスパ重視。最初の一本に</td>
              </tr>
              <tr>
                <td>カーボン・複合</td>
                <td>やや高い</td>
                <td>10,000〜20,000円</td>
                <td>軽さと反発の両立を求める中級者</td>
              </tr>
              <tr>
                <td>ウレタン複合（ビヨンド系）</td>
                <td>高い</td>
                <td>20,000〜40,000円</td>
                <td>飛距離最優先・パワーヒッター（要規定確認）</td>
              </tr>
            </tbody>
          </table>
          <div className="point-box">
            <strong>⚠️ 規格の確認を：</strong>
            よく飛ぶ複合バット（ビヨンド系）は、所属リーグ・大会で使用が制限されることがあります。
            また軟式球はM号が基本。購入前に「自分のチーム・リーグで使えるか」を必ず確認してください。
          </div>

          <h2>主要ブランドの傾向</h2>
          <table>
            <thead>
              <tr>
                <th>ブランド</th>
                <th>特徴</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ミズノ（ビヨンドマックス）</td><td>複合バットの代表格。飛距離モデルが充実</td></tr>
              <tr><td>エスエスケイ（MM/ハンターマックス）</td><td>反発の高い複合が人気。ラインナップ豊富</td></tr>
              <tr><td>ゼット（ZETT）</td><td>金属〜複合まで幅広く、コスパも良好</td></tr>
              <tr><td>ローリングス</td><td>デザイン性と振り抜き。個性を出したい人に</td></tr>
              <tr><td>ルイスビル／ディマリニ</td><td>パワフルで大胆な打感。海外ブランドの魅力</td></tr>
            </tbody>
          </table>

          <ProductCards
            keyword="軟式 バット 一般"
            heading="🏏 楽天で人気の軟式バット"
          />

          <AdSlot id="article-mid" />

          <h2>迷ったら：診断とガイド</h2>
          <p>
            「結局どれ？」となったら、6問で素材・長さ・重さまで提案する診断が便利です。
          </p>
          <div className="bat-links">
            <a className="cta-inline" href="/bat-shindan/">
              → 6問でわかる「軟式バット相性診断」
            </a>
            <a className="cta-inline" href="/guide/bat-guide/">
              → じっくり読む「軟式バットの選び方」
            </a>
            <a className="cta-inline" href="/guide/bat-care/">
              → 長く使う「バットのお手入れ」
            </a>
          </div>
        </article>
        <div style={{ height: 24 }} />
      </div>
    </main>
  );
}
