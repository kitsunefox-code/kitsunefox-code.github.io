import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import EditorsPicks from "@/components/EditorsPicks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球スパイク／シューズ比較【2026年版】ポイントと金具の違い・主要ブランド・価格で比較",
  description:
    "野球スパイクを、樹脂ポイントと金具の違い、主要ブランド（ミズノ・アシックス・ニューバランス・ゼット）の特徴、カットの高さ、価格帯で比較。草野球で失敗しない一足の選び方まで解説します。",
  alternates: { canonical: `${SITE_URL}/spikes/` },
  openGraph: {
    title: "野球スパイク／シューズ比較【2026年版】",
    description:
      "ポイントと金具の違い、主要ブランドの特徴、価格帯で比較。草野球向けの選び方も。",
    type: "website",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "野球スパイク／シューズ比較【2026年版】ポイントと金具・主要ブランド・価格",
    inLanguage: "ja",
    dateModified: "2026-07-06",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
  );
}

export default function SpikesComparePage() {
  return (
    <main>
      <div className="hero" style={{ padding: "56px 0 46px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Spikes
          </p>
          <h1>
            スパイク／シューズ<span className="hl">比較</span>
          </h1>
          <p>
            樹脂ポイントと金具の違い、主要ブランドの特徴、カット・価格で比較。
            草野球で失敗しない一足の選び方まで。
          </p>
        </div>
      </div>

      <div className="container">
        <AdSlot id="top-under-hero" />
        <article className="article">
          <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約5分</p>

          <p>
            草野球のスパイク選びは、まず<strong>ポイント（樹脂）か金具か</strong>から。
            そのうえで、ブランド・カット・価格で絞ります。
          </p>

          <EditorsPicks
            heading="編集部の一押し 野球スパイク"
            picks={[
              {
                keyword: "野球 スパイク ミズノ ポイント",
                label: "定番ポイント",
                comment: "フィットと種類の豊富さ。迷ったらまずここから選べば安心。",
              },
              {
                keyword: "野球 スパイク アシックス",
                label: "履き心地重視",
                comment: "機能性とクッションに定評。足あたりのよさで選ぶなら。",
              },
              {
                keyword: "野球 スパイク ニューバランス",
                label: "幅・快適さ",
                comment: "幅の選択肢とクッション。人気上昇中で快適さ重視の人に。",
              },
            ]}
          />

          <h2>ポイント（樹脂）と金具で比較</h2>
          <table>
            <thead>
              <tr>
                <th>種類</th>
                <th>グリップ</th>
                <th>草野球での適性</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>樹脂ポイント（スタッド）</td>
                <td>十分</td>
                <td>◎ 多くの公共グラウンドでOK。まずはこれ</td>
              </tr>
              <tr>
                <td>金具（メタル）</td>
                <td>強い</td>
                <td>△ 禁止の球場が多い。要確認</td>
              </tr>
              <tr>
                <td>トレーニングシューズ</td>
                <td>弱め</td>
                <td>○ 練習・アップ用。試合はスパイク推奨</td>
              </tr>
            </tbody>
          </table>
          <div className="point-box">
            <strong>草野球はまず樹脂ポイント：</strong>
            多くの公共グラウンドが金具スパイクを禁止しています。迷ったら樹脂ポイントを選べば、
            まず困りません。金具は使える球場を確認してから。
          </div>

          <h2>主要ブランドの傾向</h2>
          <table>
            <thead>
              <tr>
                <th>ブランド</th>
                <th>特徴</th>
                <th>価格帯目安</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ミズノ</td><td>定番。フィットと種類の豊富さ</td><td>4,000〜9,000円</td></tr>
              <tr><td>アシックス</td><td>機能性と履き心地に定評</td><td>4,500〜10,000円</td></tr>
              <tr><td>ニューバランス</td><td>クッションと幅の選択肢。人気上昇中</td><td>6,000〜13,000円</td></tr>
              <tr><td>ゼット（ZETT）</td><td>コスパ良好。手ごろに揃えたい人に</td><td>3,500〜7,000円</td></tr>
            </tbody>
          </table>

          <h2>価格帯で選ぶ早見表</h2>
          <table>
            <thead>
              <tr>
                <th>価格帯</th>
                <th>目安</th>
                <th>こんな人・代表タイプ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>エントリー</td><td>3,500〜5,500円</td><td>まず一足。人工皮革の樹脂ポイント</td></tr>
              <tr><td>ミドル</td><td>5,500〜9,000円</td><td>フィット重視。定番ブランドの中位</td></tr>
              <tr><td>ハイエンド</td><td>9,000〜13,000円</td><td>履き心地・軽さ。上位・天然皮革モデル</td></tr>
            </tbody>
          </table>

          <ProductCards
            keyword="野球 スパイク ポイント"
            heading="👟 楽天で人気の野球スパイク"
          />

          <AdSlot id="article-mid" />

          <h2>くわしい選び方</h2>
          <div className="bat-links">
            <a className="cta-inline" href="/guide/spikes-guide/">
              → じっくり読む「野球スパイクの選び方」
            </a>
            <a className="cta-inline" href="/guide/gear-checklist/">
              → 他に必要なものは「道具・装備 一式チェックリスト」
            </a>
          </div>
        </article>
        <div style={{ height: 24 }} />
      </div>
    </main>
  );
}
