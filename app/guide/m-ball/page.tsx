import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "軟式M号球とは？【M号・J号の違い・硬式との違い・試合球の選び方】",
  description:
    "軟式野球のボール「M号球」とは何かを、初心者にもわかりやすく解説。一般・中学向けのM号と少年向けのJ号の違い、硬式球との違い（重さ・素材・打感）、試合球と練習球の使い分け、ナガセケンコーなどの主要メーカー、選び方の目安まで。草野球で使うボールの基礎知識をまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/m-ball/` },
  openGraph: {
    title: "軟式M号球とは？",
    description: "M号・J号の違い、硬式との違い、試合球の選び方まで。草野球のボールの基礎知識。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "軟式M号球とは？【M号・J号の違い・硬式との違い・試合球の選び方】",
    inLanguage: "ja",
    dateModified: "2026-07-09",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "軟式のM号とJ号の違いは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "M号は一般・中学生向け（大人サイズ）、J号は小学生（少年）向けの小さめのボールです。2018年に軟式球の規格が新しくなり、それまでのA号・B号などがM号・J号に統一されました。大人の草野球で使うのは基本的にM号です。",
        },
      },
      {
        "@type": "Question",
        name: "軟式M号球と硬式球は何が違いますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "軟式のM号球はゴム製で中が空洞、硬式球はコルト芯を糸と革で巻いた作りです。軟式は軽くてつぶれて反発するため打感や打球の飛び方が異なり、バットの選び方や打ち方も変わります。安全性が高く、草野球や一般の軟式野球で広く使われています。",
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

export default function MBallPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>軟式M号球とは？【M号・J号の違い・硬式との違い・試合球の選び方】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約5分</p>

        <p>
          「M号球って何？」——草野球を始めると出てくる言葉です。
          じつは軟式ボールは<strong>2018年に規格が新しくなり</strong>、名前も変わりました。
          M号・J号の違い、硬式との違い、試合球の選び方まで、<strong>ボールの基礎知識</strong>をやさしくまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>M号・J号とは（2018年に規格が一新）</h2>
        <p>
          かつては「A号・B号・C号」などと呼ばれていた軟式球は、<strong>2018年からM号・J号に統一</strong>されました。
        </p>
        <table>
          <thead>
            <tr><th>種類</th><th>対象</th><th>特徴</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>M号</strong>（エム号）</td><td>一般・中学生（大人サイズ）</td><td>大人の草野球で使う標準球。以前のA・B号より硬式に近い打感に</td></tr>
            <tr><td><strong>J号</strong>（ジェイ号）</td><td>小学生（少年）</td><td>少し小さく軽い。少年野球向け</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>大人の草野球＝M号</strong>が基本です。チームで球を用意する時も、大会の規定でもM号が標準。
          J号は少年野球用なので、大人のチームでは通常使いません。
        </div>

        <h2>軟式（M号）と硬式の違い</h2>
        <table>
          <thead>
            <tr><th>項目</th><th>軟式（M号）</th><th>硬式</th></tr>
          </thead>
          <tbody>
            <tr><td>素材</td><td>ゴム製・中は空洞</td><td>コルト芯＋糸巻き＋革</td></tr>
            <tr><td>重さ・硬さ</td><td>軽くて柔らかい（つぶれて反発）</td><td>重く硬い</td></tr>
            <tr><td>打感・飛び</td><td>つぶれてから飛ぶ。ゴロになりやすい</td><td>芯で弾く。ライナーが出やすい</td></tr>
            <tr><td>安全性</td><td>高い（当たっても比較的安全）</td><td>硬く危険度が高い</td></tr>
          </tbody>
        </table>
        <p>
          この違いから、軟式は<strong>バットの選び方や打ち方も変わります</strong>。詳しくは
          <a href="/guide/soft-vs-hard/">軟式と硬式の違い</a>と
          <a href="/guide/soft-batting/">軟式の打ち方のコツ</a>をどうぞ。
        </p>

        <AdSlot id="article-mid" />

        <h2>試合球と練習球の使い分け</h2>
        <ul>
          <li><strong>試合球（検定球）</strong>：公式規格に合格した球。大会・公式戦で使用。ナガセケンコーの試合球などが定番</li>
          <li><strong>練習球</strong>：安価で練習用。試合球より手頃なので普段の練習に</li>
          <li><strong>選び方</strong>：チームの試合はM号の試合球、日常練習は練習球、と使い分けるとコスパが良い</li>
        </ul>

        <ProductCards keyword="軟式 M号球 試合球" heading="⚾ 楽天でM号球（試合球・練習球）を見る" />

        <h2>よくある質問</h2>
        <h3>Q. M号球はどこのメーカーを選べばいい？</h3>
        <p>
          軟式の試合球は<strong>ナガセケンコー</strong>が広く使われています。公式戦は検定球（試合球）を、
          練習は練習球を選べばOK。大会で使う球はリーグの規定を確認しましょう。
        </p>
        <h3>Q. 新しいM号は飛ぶって本当？</h3>
        <p>
          規格変更でM号は以前のボールより<strong>硬式に近い打感・飛び</strong>になったと言われます。
          そのぶんバットの反発（ビヨンド系など）との相性も出やすく、道具選びの重要度が上がっています（
          <a href="/guide/bat-latest/">軟式バット最新おすすめ</a>）。
        </p>

        <RelatedGuides currentHref="/guide/m-ball/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
