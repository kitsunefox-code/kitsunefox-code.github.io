import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import EditorsPicks from "@/components/EditorsPicks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球グローブ比較【2026年版】ミズノ・SSK・久保田スラッガー等をブランド・ポジション・価格で比較",
  description:
    "軟式グローブを、主要ブランド（ミズノ・SSK・ゼット・ローリングス・久保田スラッガー・ハタケヤマ・ドナイヤ・IP Select）の特徴、ポジション別の型、価格帯で比較。あなたに合う一枚の選び方まで、草野球目線でまとめました。",
  alternates: { canonical: `${SITE_URL}/glove/` },
  openGraph: {
    title: "野球グローブ比較【2026年版】ブランド・ポジション・価格で",
    description:
      "主要ブランドの特徴、ポジション別の型、価格帯で比較。あなたに合う一枚の選び方も。",
    type: "website",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "野球グローブ比較【2026年版】ブランド・ポジション・価格で比較",
    inLanguage: "ja",
    dateModified: "2026-07-06",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
  );
}

export default function GloveComparePage() {
  return (
    <main>
      <div className="hero" style={{ padding: "56px 0 46px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Glove
          </p>
          <h1>
            野球グローブ<span className="hl">比較</span>
          </h1>
          <p>
            主要ブランドの特徴、ポジション別の型、価格帯で比較。
            王道からこだわり系まで、あなたに合う一枚の選び方まで。
          </p>
        </div>
      </div>

      <div className="container">
        <AdSlot id="top-under-hero" />
        <article className="article">
          <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

          <p>
            グローブ選びは、<strong>ブランド</strong>と<strong>ポジション（型）</strong>、
            そして<strong>価格帯</strong>の3つで絞ると迷いません。まずは主要ブランドの個性から。
          </p>

          <EditorsPicks
            heading="編集部の一押し 軟式グローブ"
            picks={[
              {
                keyword: "軟式 グローブ ミズノ 内野",
                label: "王道・内野に",
                comment: "安定の作りで、初めての内野用にも安心。迷ったらまずこの系統。",
              },
              {
                keyword: "軟式 グローブ 久保田スラッガー",
                label: "内野のこだわり派に",
                comment: "捕球の一体感で内野手に絶大な人気。長く付き合える一枚。",
              },
              {
                keyword: "軟式 グローブ ミズノ 外野",
                label: "外野に",
                comment: "大きめ・深めでフライを安心して掴める。守備範囲を稼ぎたい人へ。",
              },
            ]}
          />

          <h2>主要ブランド比較</h2>
          <table>
            <thead>
              <tr>
                <th>ブランド</th>
                <th>特徴</th>
                <th>価格帯目安</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ミズノ</td><td>王道・安定。ラインナップが広く選びやすい</td><td>8,000〜30,000円</td></tr>
              <tr><td>エスエスケイ（SSK）</td><td>バランス型。プロエッジ等の人気シリーズ</td><td>10,000〜30,000円</td></tr>
              <tr><td>ゼット（ZETT）</td><td>質実剛健でコスパも良い</td><td>7,000〜25,000円</td></tr>
              <tr><td>ローリングス</td><td>華やかなデザインと捕球性能</td><td>12,000〜35,000円</td></tr>
              <tr><td>久保田スラッガー</td><td>内野手に絶大な人気。捕球の一体感</td><td>20,000〜40,000円</td></tr>
              <tr><td>ハタケヤマ</td><td>捕手用ミットの名門。丈夫さに定評</td><td>18,000〜40,000円</td></tr>
              <tr><td>ドナイヤ / IP Select</td><td>こだわり派の玄人好み。革質と作り込み</td><td>25,000〜45,000円</td></tr>
            </tbody>
          </table>

          <h2>ポジション別の型で比較</h2>
          <table>
            <thead>
              <tr>
                <th>ポジション</th>
                <th>型の特徴</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>投手用</td><td>握りが見えないクローズドウェブ</td></tr>
              <tr><td>内野手用</td><td>小さめ・浅めで持ち替えが速い</td></tr>
              <tr><td>外野手用</td><td>大きめ・深めでフライを掴みやすい</td></tr>
              <tr><td>捕手用ミット</td><td>丸く厚い専用ミット</td></tr>
              <tr><td>一塁手用ミット</td><td>縦に長い専用ミット</td></tr>
              <tr><td>オールラウンド用</td><td>内野〜外野を無難にカバー</td></tr>
            </tbody>
          </table>

          <ProductCards
            keyword="軟式 グローブ 一般"
            heading="🧤 楽天で人気の軟式グローブ"
          />

          <AdSlot id="article-mid" />

          <h2>迷ったら：診断とガイド</h2>
          <div className="bat-links">
            <a className="cta-inline" href="/glove-shindan/">
              → 6問でわかる「グローブ相性診断」
            </a>
            <a className="cta-inline" href="/guide/glove-guide/">
              → じっくり読む「初めてのグローブの選び方」
            </a>
            <a className="cta-inline" href="/guide/glove-care/">
              → 長く使う「グローブのお手入れ・型付け」
            </a>
          </div>
        </article>
        <div style={{ height: 24 }} />
      </div>
    </main>
  );
}
