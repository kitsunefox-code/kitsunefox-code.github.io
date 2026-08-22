import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "真夏の草野球・試合前後の食事と水分補給【バテない・熱中症を防ぐ】",
  description:
    "真夏の草野球でバテないための、試合前・中・後の食事と水分補給を解説。前日からの水分の蓄え方、当日朝と直前に食べたいもの、試合中の給水と塩分・エネルギー補給、終わった後のリカバリー食まで。水だけでなく塩分（ナトリウム）も摂るコツ、経口補水液・スポーツドリンクの使い分けも。暑い夏を元気に乗り切るための実践ガイドです。",
  alternates: { canonical: `${SITE_URL}/guide/summer-food/` },
  openGraph: {
    title: "真夏の草野球・試合前後の食事と水分補給",
    description: "前日〜試合後までの水分・塩分・エネルギー補給。バテない・熱中症を防ぐ食べ方。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "真夏の草野球・試合前後の食事と水分補給【バテない・熱中症を防ぐ】",
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
        name: "夏の試合前は何を食べればいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "消化がよく、エネルギーになる炭水化物を中心に、試合の1〜2時間前までに済ませるのがおすすめです。おにぎり・バナナ・ゼリー飲料などが手軽です。脂っこいものや食べ過ぎは胃に負担がかかるので避け、直前は軽めにしましょう。",
        },
      },
      {
        "@type": "Question",
        name: "水分は水だけで十分ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "大量に汗をかく夏は、水だけでなく塩分（ナトリウム）も一緒に補給しましょう。水だけを大量に飲むと血液中の塩分濃度が下がり、かえって不調につながることがあります。経口補水液やスポーツドリンク、塩分タブレットなどを併用するのがおすすめです。",
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

export default function SummerFoodPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>真夏の草野球・試合前後の食事と水分補給【バテない・熱中症を防ぐ】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          真夏の試合、後半になると足が止まる…。それ、<strong>補給不足</strong>かもしれません。
          暑い日は、<strong>食事と水分の摂り方</strong>でパフォーマンスも安全性も大きく変わります。
          前日から試合後まで、時系列で「何を・いつ」摂ればいいかをまとめました。
          （<a href="/guide/heat/">熱中症対策とプレクーリング</a>と合わせて読むと万全です）
        </p>

        <AdSlot id="article-top" />

        <h2>前日：水分と炭水化物を蓄える</h2>
        <ul>
          <li><strong>水分</strong>：前日からこまめに。当日の朝に慌てて飲むより、前もって整えておく</li>
          <li><strong>炭水化物</strong>：ごはん・麺類などでエネルギーを蓄える（グリコーゲン）</li>
          <li><strong>アルコールは控えめ</strong>：利尿作用で脱水を招く。飲み過ぎた翌朝の試合は要注意</li>
        </ul>

        <h2>当日朝〜直前：消化のよいものを</h2>
        <table>
          <thead>
            <tr><th>タイミング</th><th>おすすめ</th></tr>
          </thead>
          <tbody>
            <tr><td>試合の1〜2時間前</td><td>おにぎり・パン・うどんなど消化のよい炭水化物</td></tr>
            <tr><td>直前（30分前など）</td><td>バナナ・ゼリー飲料など軽く。食べ過ぎない</td></tr>
            <tr><td>避けたい</td><td>脂っこいもの・食べ過ぎ（胃に負担、動きが重くなる）</td></tr>
          </tbody>
        </table>

        <ProductCards keyword="ゼリー飲料 エネルギー 塩分タブレット" heading="🍙 ゼリー飲料・塩分タブレットを見る" />

        <AdSlot id="article-mid" />

        <h2>試合中：水分＋塩分＋エネルギー</h2>
        <ul>
          <li><strong>こまめに給水</strong>：喉が渇く前に、攻守交代のたびに一口を習慣に</li>
          <li><strong>塩分も一緒に</strong>：水だけの大量摂取は逆効果。経口補水液・スポーツドリンク・塩分タブレットを</li>
          <li><strong>エネルギー補給</strong>：長時間ならゼリー飲料・バナナなどで途中補給</li>
          <li><strong>冷たい飲料</strong>：体を内から冷やすプレクーリングにも（<a href="/guide/cooling-goods/">冷却グッズまとめ</a>）</li>
        </ul>
        <div className="point-box">
          <strong>水だけはNG：</strong>
          大量発汗時に水だけを飲むと、血液中の塩分濃度が下がって<strong>かえって不調</strong>になることがあります。
          夏は必ず<strong>塩分（ナトリウム）とセット</strong>で補給しましょう。
        </div>

        <h2>試合後：リカバリー</h2>
        <ul>
          <li><strong>失った水分・塩分を戻す</strong>：終わってからも意識して補給を続ける</li>
          <li><strong>炭水化物＋たんぱく質</strong>：消耗した体の回復に。おにぎり＋鶏肉や卵など</li>
          <li><strong>体を冷やす・休む</strong>：ほてりを冷まし、翌日に残さない（<a href="/guide/body-care/">体のケア</a>）</li>
        </ul>

        <h2>持ち物チェック（夏の補給編）</h2>
        <ul>
          <li>多めの飲料（水＋スポーツドリンク／経口補水液）</li>
          <li>塩分タブレット・塩あめ</li>
          <li>ゼリー飲料・バナナなどの軽食</li>
          <li>クーラーボックス＋氷（冷たさをキープ）</li>
        </ul>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/heat/">→ 「熱中症対策とプレクーリング」を読む</a>
          <a className="cta-inline" href="/guide/cooling-goods/">→ 「夏の冷却グッズまとめ」を見る</a>
          <a className="cta-inline" href="/guide/body-care/">→ 試合後は「疲労回復・体のケア」も</a>
        </div>

        <RelatedGuides currentHref="/guide/summer-food/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
