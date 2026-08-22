import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "夏用冷感アンダーシャツ比較【2026】野球の暑さ対策・接触冷感の選び方とおすすめ",
  description:
    "真夏の野球向けに、冷感アンダーシャツの選び方とおすすめを比較。接触冷感（ひんやり感の指標Q-MAX）、吸汗速乾、UVカット、消臭抗菌、ローネックなど、暑さ対策に効くポイントを整理。ミズノ・SSK・ゼット・デサント・アンダーアーマーなど主要ブランドの傾向と、価格帯別の選び方まで。夏を涼しく乗り切る一枚を。",
  alternates: { canonical: `${SITE_URL}/guide/summer-undershirt/` },
  openGraph: {
    title: "夏用冷感アンダーシャツ比較【2026】野球の暑さ対策",
    description:
      "接触冷感（Q-MAX）・吸汗速乾・UVカットで選ぶ。主要ブランドの傾向と価格帯別の選び方。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "夏用冷感アンダーシャツ比較【2026】野球の暑さ対策・接触冷感の選び方とおすすめ",
    inLanguage: "ja",
    dateModified: "2026-07-11",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "接触冷感の「Q-MAX」とは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "肌が生地に触れた瞬間の「ひんやり感」を数値化した指標です。一般に0.2以上で接触冷感があるとされ、数値が大きいほどひんやり感が強い傾向です。夏用アンダーシャツを選ぶ際の目安のひとつになりますが、実際の快適さは吸汗速乾や通気性とのバランスでも決まります。",
        },
      },
      {
        "@type": "Question",
        name: "夏のアンダーシャツは何を優先して選べばいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "汗をすばやく逃がす吸汗速乾を最優先に、接触冷感・通気性・UVカットを加味して選ぶのがおすすめです。首元が涼しいローネック、肌に張り付きにくい素材だと快適さが上がります。色は日差しを吸収しにくい白系も人気です。",
        },
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export default function SummerUndershirtPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>夏用冷感アンダーシャツ比較【2026】野球の暑さ対策・接触冷感の選び方とおすすめ</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          真夏の草野球、アンダーシャツ一枚で<strong>快適さがまるで違います</strong>。
          汗でベタつく普通の一枚から、<strong>接触冷感・吸汗速乾</strong>の夏用に替えるだけで、
          体感温度がぐっと下がることも。選び方のポイントと、主要ブランドの傾向をまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>夏用アンダーシャツの選び方（4つの軸）</h2>
        <table>
          <thead>
            <tr><th>軸</th><th>見るポイント</th></tr>
          </thead>
          <tbody>
            <tr><td>吸汗速乾</td><td>汗をすばやく吸って乾かす。夏の快適さの基本。最優先</td></tr>
            <tr><td>接触冷感（Q-MAX）</td><td>触れた瞬間のひんやり感。目安0.2以上、数値が大きいほど冷たい</td></tr>
            <tr><td>通気・UVカット</td><td>風の抜け・日焼け対策。屋外の負担を軽減</td></tr>
            <tr><td>ネック・フィット</td><td>ローネックは首元が涼しい。肌に張り付きにくい素材だと快適</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>「Q-MAX」って？</strong>
          肌が生地に触れた瞬間の<strong>ひんやり感を数値化した指標</strong>です。一般に0.2以上で接触冷感あり、
          数値が大きいほどひんやり。ただし実際の涼しさは、吸汗速乾や通気性とのバランスで決まります。
        </div>

        <ProductCards keyword="野球 アンダーシャツ 冷感 ローネック" heading="🎽 冷感アンダーシャツ（ローネック）を見る" />

        <AdSlot id="article-mid" />

        <h2>主要ブランドの傾向</h2>
        <p>各ブランドに冷感モデルがあります。傾向を押さえて選びましょう（モデル名は毎年更新されます）。</p>
        <table>
          <thead>
            <tr><th>ブランド</th><th>傾向</th></tr>
          </thead>
          <tbody>
            <tr><td>ミズノ</td><td>定番。吸汗速乾・冷感モデルが充実。フィットと品質のバランス</td></tr>
            <tr><td>SSK</td><td>接触冷感に強みのあるモデルを展開。ひんやり感重視の人に</td></tr>
            <tr><td>ゼット（ZETT）</td><td>コスパ良好。実用十分で消耗品として揃えやすい</td></tr>
            <tr><td>デサント</td><td>機能素材に定評。しっかりした作りの冷感モデル</td></tr>
            <tr><td>アンダーアーマー</td><td>コンプレッション＋機能素材。体にフィットして汗を逃がす</td></tr>
          </tbody>
        </table>

        <h2>価格帯で選ぶ</h2>
        <table>
          <thead>
            <tr><th>価格帯</th><th>目安</th></tr>
          </thead>
          <tbody>
            <tr><td>エントリー</td><td>1,000〜2,000円：消耗品として複数枚。まず試すなら</td></tr>
            <tr><td>ミドル</td><td>2,500〜4,000円：定番ブランドの冷感モデル。バランス良し</td></tr>
            <tr><td>ハイエンド</td><td>4,500円〜：高機能素材・コンプレッション上位。快適さ重視</td></tr>
          </tbody>
        </table>

        <ProductCards keyword="野球 冷感 アンダーシャツ ミズノ SSK" heading="🎽 主要ブランドの冷感アンダーシャツ" />

        <h2>色の規定に注意（公式戦）</h2>
        <p>
          リーグ・大会によっては<strong>アンダーシャツの色に規定</strong>がある場合があります。
          とくに投手の袖の色は制限されることがあるので、公式戦では所属リーグのルールを確認しましょう。
          色をチームで揃えると統一感も出ます（<a href="/uniform/">ユニフォーム比較</a>）。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/heat/">→ 「熱中症対策とプレクーリング」を読む</a>
          <a className="cta-inline" href="/guide/cooling-goods/">→ 「夏の冷却グッズまとめ」を見る</a>
          <a className="cta-inline" href="/guide/undershirt/">→ 通年の「アンダーシャツの選び方」も</a>
        </div>

        <RelatedGuides currentHref="/guide/summer-undershirt/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
