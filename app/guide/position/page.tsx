import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球のポジション適性【向いている守備位置の見つけ方】タイプ別診断ガイド",
  description:
    "草野球で自分に向いているポジションの見つけ方を、肩の強さ・足の速さ・反応・性格から解説。投手・捕手・内野（一二三遊）・外野それぞれに求められる資質と、初心者が始めやすい位置、チーム事情での決め方まで。自分の強みを活かせる守備位置を見つけて、もっと野球を楽しみましょう。",
  alternates: { canonical: `${SITE_URL}/guide/position/` },
  openGraph: {
    title: "草野球のポジション適性・向いている守備位置の見つけ方",
    description: "肩・足・反応・性格から、あなたに合う守備位置を。各ポジションの適性を解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球のポジション適性【向いている守備位置の見つけ方】",
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
        name: "初心者はどのポジションから始めるといい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "打球が飛んでくる頻度が比較的少なく、動きに余裕のある外野（ライトなど）から始める人が多いです。慣れてきたら、肩や足、守備の好みに合わせて内野や他のポジションに挑戦していくとよいでしょう。",
        },
      },
      {
        "@type": "Question",
        name: "肩が弱くても内野はできますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "できます。二塁手は送球距離が短く、強肩でなくても素早い動きと正確な送球でこなせます。逆に遊撃・三塁・外野は送球距離が長く肩の強さが活きます。自分の強みに合う位置を選ぶのがコツです。",
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

export default function PositionPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球のポジション適性【向いている守備位置の見つけ方】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          「自分はどこを守ればいいんだろう？」——草野球では、
          <strong>自分の強みに合ったポジション</strong>を見つけると、守備がぐっと楽しくなります。
          肩・足・反応・性格の4つの視点から、向いている守備位置の見つけ方を解説します。
        </p>

        <AdSlot id="article-top" />

        <h2>4つの視点で自分を知る</h2>
        <table>
          <thead>
            <tr><th>視点</th><th>強いと活きるポジション</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>肩の強さ</strong></td><td>遊撃・三塁・外野（送球距離が長い）</td></tr>
            <tr><td><strong>足の速さ・守備範囲</strong></td><td>中堅（センター）・遊撃・二塁</td></tr>
            <tr><td><strong>反応・度胸</strong></td><td>三塁（強い打球）・投手・捕手</td></tr>
            <tr><td><strong>リーダー気質・声かけ</strong></td><td>捕手・センター・内野の中心</td></tr>
          </tbody>
        </table>

        <h2>ポジション別・求められる資質</h2>
        <h3>投手（ピッチャー）</h3>
        <p>制球力とメンタル。剛速球より、<strong>コントロールと組み立て</strong>が草野球では効きます。責任感の強い人に。</p>
        <h3>捕手（キャッチャー）</h3>
        <p>チームの司令塔。<strong>リード・声かけ・打球への反応</strong>。扇の要として全体を見られる人に向きます。</p>
        <h3>一塁手</h3>
        <p>送球を捕る技術（捕球のうまさ）が中心。<strong>肩が強くなくてもOK</strong>。背が高い・捕球が得意な人に。</p>
        <h3>二塁手</h3>
        <p>送球距離が短く<strong>肩が弱くてもこなせる</strong>。素早い動きと正確な送球、ゲッツーの器用さがある人に。</p>
        <h3>三塁手</h3>
        <p>強い打球への<strong>反応と度胸</strong>、そして長い送球の肩。「熱い守り」が好きな人に。</p>
        <h3>遊撃手（ショート）</h3>
        <p>守備の花形。<strong>肩・足・反応・技術のすべて</strong>が求められる、守備自慢のポジション。</p>
        <h3>外野手</h3>
        <p>広い守備範囲。中堅は<strong>足と守備範囲</strong>、両翼は<strong>肩</strong>が活きます。初心者はライトから始めやすい。</p>

        <div className="point-box">
          <strong>初心者へ：</strong>
          まずは打球頻度が比較的少なく余裕のある<strong>外野（ライトなど）</strong>から始める人が多いです。
          慣れてきたら、自分の強みに合わせて内野や他の位置に挑戦を。
        </div>

        <AdSlot id="article-mid" />

        <h2>チーム事情での決め方</h2>
        <ul>
          <li><strong>空いている所を埋める</strong>：草野球は人数が読めない日も。柔軟に守れると重宝される</li>
          <li><strong>複数守れると強い</strong>：内外野どちらもできると、どんな日でも出番がある</li>
          <li><strong>やりたい気持ちも大事</strong>：適性だけでなく「好き」も上達の原動力。希望も伝えよう</li>
        </ul>

        <h2>自分に近いプロ選手から考えるのも面白い</h2>
        <p>
          「あの選手みたいなプレーがしたい」も立派な動機。
          <a href="/baseball-dock/">野球人間ドック</a>では、性格やプレースタイルから
          <strong>あなたに最も近いプロ選手</strong>を診断できます。似ている選手のポジションから、
          自分に合う守り方のヒントが見つかるかもしれません。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/baseball-dock/">→ あなたに近いプロ選手を「野球人間ドック」で診断</a>
          <a className="cta-inline" href="/guide/glove-guide/">→ ポジション別のグローブは「グローブの選び方」へ</a>
          <a className="cta-inline" href="/players/">→ プロ選手の使用ギア一覧を見る</a>
        </div>

        <RelatedGuides currentHref="/guide/position/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
