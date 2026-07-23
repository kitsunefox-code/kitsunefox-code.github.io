import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import RelatedGuides from "@/components/RelatedGuides";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球バッグの選び方【エナメル・バックパック・遠征用】容量とタイプ別のおすすめ",
  description:
    "草野球の道具運びに使う野球バッグの選び方を、タイプ別（エナメルショルダー・バックパック・大容量遠征バッグ・キャスター付き）に解説。バット・グローブ・スパイク・防具が入る容量の目安、電車移動やチャリ通いでの使い分け、防水・自立・仕切りといった選ぶポイントまで。用途に合う一つを見つけましょう。",
  alternates: { canonical: `${SITE_URL}/guide/bag/` },
  openGraph: {
    title: "野球バッグの選び方",
    description: "エナメル・バックパック・遠征用。容量とタイプ別に、用途で選ぶポイントを解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "野球バッグの選び方【エナメル・バックパック・遠征用】",
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
        name: "野球バッグはどんなタイプがありますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "肩掛けのエナメルショルダー、両手が空くバックパック（リュック）、道具一式が入る大容量の遠征バッグ、重い荷物を運べるキャスター付きが主なタイプです。移動手段（電車・自転車・車）と持ち物の量で選ぶのがおすすめです。",
        },
      },
      {
        "@type": "Question",
        name: "電車や自転車で通うならどのバッグ？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "両手が空いて動きやすいバックパック（リュック）タイプが便利です。バットを外付けできるモデルや、防水・自立するものだと通いやすくなります。荷物が多い遠征日は大容量バッグやキャスター付きを使い分けると楽です。",
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

export default function BagPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>野球バッグの選び方【エナメル・バックパック・遠征用】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約5分</p>

        <p>
          意外と悩む野球バッグ。<strong>移動手段</strong>と<strong>持ち物の量</strong>で最適解は変わります。
          エナメル・バックパック・遠征用・キャスター付き——タイプ別の特徴と、選ぶポイントをまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>タイプ別・向いている人</h2>
        <table>
          <thead>
            <tr><th>タイプ</th><th>特徴</th><th>向いている人</th></tr>
          </thead>
          <tbody>
            <tr><td>エナメルショルダー</td><td>定番の肩掛け。開口部が広く出し入れしやすい</td><td>車移動・王道が好きな人</td></tr>
            <tr><td>バックパック（リュック）</td><td>両手が空く。バット外付け対応も</td><td>電車・自転車で通う人</td></tr>
            <tr><td>大容量遠征バッグ</td><td>防具・スパイク・着替えまで一式</td><td>荷物が多い・遠征が多い人</td></tr>
            <tr><td>キャスター付き</td><td>転がして運べる。重い荷物も楽</td><td>荷物が特に多い・長距離移動</td></tr>
          </tbody>
        </table>

        <h2>容量の目安</h2>
        <p>草野球で持ち歩く基本セット（グローブ・スパイク・帽子・飲み物・バットは外付け or 別持ち）なら中容量で足りることが多いです。</p>
        <ul>
          <li><strong>普段の練習・試合</strong>：グローブ＋スパイク＋小物が入れば十分</li>
          <li><strong>捕手・防具持ち</strong>：かさばるので大容量・自立タイプが安心</li>
          <li><strong>遠征・泊まり</strong>：着替え・雨具も入る大容量 or キャスター付き</li>
        </ul>

        <ProductCards keyword="野球 バッグ バックパック" heading="🎒 楽天で人気の野球バックパック" />

        <AdSlot id="article-mid" />

        <h2>選ぶときのチェックポイント</h2>
        <ul>
          <li><strong>バットの収納</strong>：外付けホルダー・内部スリーブがあるか（本数も）</li>
          <li><strong>自立するか</strong>：地面が濡れた球場で置きやすい</li>
          <li><strong>防水・撥水</strong>：雨天・濡れた芝でも中身を守る</li>
          <li><strong>仕切り・シューズ収納</strong>：泥のついたスパイクを分けて入れられると清潔</li>
          <li><strong>背負い心地</strong>：リュックは肩ベルト・背面のクッションを確認</li>
        </ul>

        <ProductCards keyword="野球 エナメルバッグ" heading="👜 定番のエナメルバッグを見る" />

        <RelatedGuides currentHref="/guide/bag/" />

        <div className="bat-links">
          <a className="cta-inline" href="/guide/gear-checklist/">→ 何を持っていく？「道具・装備チェックリスト」</a>
          <a className="cta-inline" href="/guide/how-to-start/">→ 「草野球の始め方」で必要なものを確認</a>
          <a className="cta-inline" href="/baseball-dock/">→ 道具の適性は「野球人間ドック」で診断</a>
        </div>
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
