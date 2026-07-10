import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球の熱中症対策とプレクーリング完全ガイド【夏の草野球を安全に】",
  description:
    "真夏の草野球を安全に楽しむための熱中症対策を、最新の「プレクーリング（体を先に冷やす）」まで含めて解説。試合前・中・後の水分と塩分の摂り方、冷感ギア・冷却グッズの使い方、日陰と休憩、危険なサインと応急対応まで。暑い日でも無理なくプレーするための実践ガイドです。",
  alternates: { canonical: `${SITE_URL}/guide/heat/` },
  openGraph: {
    title: "野球の熱中症対策とプレクーリング完全ガイド",
    description:
      "プレクーリング・水分/塩分・冷感ギア・危険サインと応急対応。夏の草野球を安全に。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "野球の熱中症対策とプレクーリング完全ガイド【夏の草野球を安全に】",
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
        name: "プレクーリングとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "運動の前や合間に、あらかじめ体を冷やして体温の上がりすぎを防ぐ暑熱対策です。冷たい飲料（アイススラリーなど）を摂る、首・脇・手のひらなどを冷やす、といった方法があり、暑い環境でのパフォーマンス維持と熱中症予防に役立つとされています。",
        },
      },
      {
        "@type": "Question",
        name: "野球の試合中はどのくらい水分を摂ればいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "喉が渇く前に、こまめに少しずつ摂るのが基本です。大量の汗をかく夏は水だけでなく塩分（ナトリウム）も一緒に補給し、経口補水液やスポーツドリンクを活用しましょう。攻守交代のたびに一口、を習慣にすると摂り忘れを防げます。",
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

export default function HeatPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>野球の熱中症対策とプレクーリング完全ガイド【夏の草野球を安全に】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <div className="point-box">
          <strong>最初に：</strong>
          熱中症は<strong>命に関わる</strong>ことがあります。めまい・吐き気・けいれん・意識がおかしいなどのサインが出たら、
          すぐにプレーを中止し、涼しい場所で体を冷やし、必要なら<strong>ためらわず救急要請（119）</strong>を。
          「気合いで乗り切る」は禁物です。
        </div>

        <p>
          真夏の草野球は、楽しい反面<strong>熱中症のリスク</strong>と隣り合わせ。
          でも正しく備えれば、暑い日でも安全に楽しめます。
          水分・塩分の摂り方から、今注目の<strong>「プレクーリング」</strong>、冷感ギアの使い方まで、
          実践的にまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>新常識「プレクーリング」＝先に冷やす</h2>
        <p>
          最近の暑さ対策で注目されているのが<strong>プレクーリング</strong>。
          運動の<strong>前や合間に、あらかじめ体を冷やしておく</strong>ことで、体温の上がりすぎを防ぐ考え方です。
          甲子園でも「クーリングタイム」が導入されるなど、広まりつつあります。
        </p>
        <ul>
          <li><strong>体の内から冷やす</strong>：冷たい飲料・アイススラリー（シャーベット状の飲料）を試合前や合間に</li>
          <li><strong>体の外から冷やす</strong>：首・脇の下・手のひらなど、太い血管や熱を逃がしやすい部位を冷やす</li>
          <li><strong>タイミング</strong>：試合前のアップ後、イニングの合間、暑い日ほどこまめに</li>
        </ul>
        <div className="point-box">
          <strong>手のひら冷却がおすすめ：</strong>
          手のひらは熱を効率よく逃がせる部位。冷たいペットボトルを握る・保冷剤を当てるだけでも、
          体感がすっと楽になります。ベンチでの合間にどうぞ。
        </div>

        <h2>水分・塩分の摂り方</h2>
        <ul>
          <li><strong>喉が渇く前に</strong>：こまめに少量ずつ。攻守交代のたびに一口を習慣に</li>
          <li><strong>塩分も一緒に</strong>：大量発汗時は水だけでなくナトリウムを。経口補水液・スポーツドリンクを活用</li>
          <li><strong>試合前から</strong>：直前にがぶ飲みではなく、当日は朝から少しずつ蓄えておく</li>
          <li><strong>アルコールは前夜も注意</strong>：利尿作用で脱水を招く。飲み過ぎた翌日の試合は要警戒</li>
        </ul>

        <ProductCards keyword="経口補水液 スポーツドリンク 粉末" heading="🥤 経口補水液・スポーツドリンクを見る" />

        <AdSlot id="article-mid" />

        <h2>冷感ギア・冷却グッズを味方に</h2>
        <p>
          道具の力も借りましょう。<strong>冷感アンダーシャツ</strong>や<strong>冷却グッズ</strong>は、
          真夏の負担をぐっと軽くしてくれます。
        </p>
        <ul>
          <li><strong>冷感アンダーシャツ</strong>：吸汗速乾・接触冷感で汗を逃がす（
            <a href="/guide/undershirt/">アンダーシャツの選び方</a>）</li>
          <li><strong>ネッククーラー・冷却タオル</strong>：首元を冷やして体感温度を下げる</li>
          <li><strong>保冷剤・クーラーボックス</strong>：ベンチに氷や冷たい飲料をキープ</li>
          <li><strong>日よけ</strong>：帽子・サングラス・日焼け止め（
            <a href="/guide/sunglasses/">サングラスの選び方</a>）</li>
        </ul>
        <p>
          冷却グッズのまとめは<a href="/guide/cooling-goods/">夏の草野球を乗り切る冷却グッズ</a>で詳しく紹介しています。
        </p>

        <h2>環境づくり・休憩</h2>
        <ul>
          <li><strong>日陰を作る</strong>：ワンタッチテント・タープでベンチに日陰を</li>
          <li><strong>こまめに休む</strong>：無理に連続で守らない。交代・給水タイムを設ける</li>
          <li><strong>時間帯を選ぶ</strong>：可能なら真昼を避け、朝・夕やナイターに（
            <a href="/guide/night-game/">ナイター完全ガイド</a>）</li>
        </ul>

        <h2>危険なサインと応急対応</h2>
        <table>
          <thead>
            <tr><th>サイン</th><th>対応</th></tr>
          </thead>
          <tbody>
            <tr><td>めまい・立ちくらみ・大量の汗</td><td>すぐ日陰へ。体を冷やし水分・塩分補給</td></tr>
            <tr><td>頭痛・吐き気・体のだるさ</td><td>プレー中止。首・脇・手のひらを冷やす。回復しなければ受診</td></tr>
            <tr><td>けいれん・意識がおかしい・汗が出ない</td><td><strong>すぐ119</strong>。全身を冷やしながら救急を待つ</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>迷ったら中止・受診。</strong>
          「これくらい大丈夫」が危険です。仲間の様子がおかしい時も、遠慮なく試合を止めましょう。
          安全があってこその草野球です。
        </div>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/cooling-goods/">→ 「夏の冷却グッズまとめ」を見る</a>
          <a className="cta-inline" href="/guide/summer-undershirt/">→ 「夏用冷感アンダーシャツ比較」を見る</a>
          <a className="cta-inline" href="/guide/body-care/">→ 「疲労回復・体のケア」も読む</a>
        </div>

        <RelatedGuides currentHref="/guide/heat/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
