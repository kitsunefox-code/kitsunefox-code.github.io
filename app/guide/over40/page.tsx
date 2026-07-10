import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "40代・未経験から始める草野球【大人の初心者がケガなく楽しむ入門ガイド】",
  description:
    "40代・50代や、野球未経験・ブランクありの大人が草野球を始めるためのガイド。ケガをしないための準備運動と体づくり、最低限そろえる道具、初心者を歓迎するチーム・リーグの見つけ方、はじめの守備位置、楽しく続けるコツまで。「今さら…」と迷っている大人の一歩を後押しします。",
  alternates: { canonical: `${SITE_URL}/guide/over40/` },
  openGraph: {
    title: "40代・未経験から始める草野球",
    description: "大人の初心者がケガなく楽しむための準備・道具・チームの見つけ方・続けるコツ。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "40代・未経験から始める草野球【大人の初心者がケガなく楽しむ入門ガイド】",
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
        name: "40代・未経験でも草野球チームに入れますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "入れます。草野球には初心者やブランクのある大人を歓迎するエンジョイ系のチーム・リーグが多くあります。募集で『初心者歓迎』『和気あいあい』などと書かれたチームを選ぶと、経験や年齢を気にせず始めやすいです。",
        },
      },
      {
        "@type": "Question",
        name: "久しぶりの運動でケガが心配です。",
        acceptedAnswer: {
          "@type": "Answer",
          text: "大人の初心者・ブランク組が痛めやすいのは、肉離れ（ふくらはぎ・もも裏）や肩・肘です。いきなり全力ダッシュ・全力投球をせず、入念なウォームアップと、日頃の軽い体づくり（ストレッチ・下半身）で予防しましょう。痛みが出たら無理をせず休むことが長く続けるコツです。",
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

export default function Over40Page() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>40代・未経験から始める草野球【大人の初心者がケガなく楽しむ入門ガイド】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          「今さら野球なんて…」と思っていませんか？大丈夫です。
          草野球は<strong>40代・50代の初心者やブランク組が、たくさん楽しんでいます</strong>。
          大事なのは、無理せず・ケガせず・楽しく始めること。
          大人の一歩を後押しする、始め方のポイントをまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>まず大切：ケガをしない</h2>
        <p>
          大人の初心者・ブランク組が痛めやすいのは<strong>肉離れ（ふくらはぎ・もも裏）</strong>と<strong>肩・肘</strong>。
          「気持ちは動くけど体がついてこない」で無理をすると一発で離脱です。
        </p>
        <ul>
          <li><strong>いきなり全力はNG</strong>：ダッシュも投球も、段階的に上げる</li>
          <li><strong>入念なウォームアップ</strong>：ストレッチ・軽いジョグで体を起こしてから</li>
          <li><strong>日頃の体づくり</strong>：週数回のストレッチ・スクワット等で土台を（<a href="/guide/offseason/">オフの自主トレ</a>も参考に）</li>
          <li><strong>肩肘は作る</strong>：久しぶりの投球は軽めから。痛みが出たら休む（<a href="/guide/elbow-care/">野球肘のケア</a>）</li>
        </ul>

        <h2>最低限そろえる道具</h2>
        <ul>
          <li><strong>グローブ</strong>：まずはこれ。オールラウンドな一つを（<a href="/guide/glove-guide/">グローブの選び方</a>）</li>
          <li><strong>スパイク</strong>：多くの球場で使える樹脂ポイントを（<a href="/guide/spikes-guide/">スパイクの選び方</a>）</li>
          <li><strong>帽子・アンダーシャツ</strong>：夏は冷感タイプで快適に（<a href="/guide/undershirt/">アンダーシャツの選び方</a>）</li>
          <li>バットはチーム共用でもOK。揃える順番は<a href="/guide/gear-checklist/">道具チェックリスト</a>で</li>
        </ul>

        <AdSlot id="article-mid" />

        <h2>初心者歓迎のチーム・リーグを選ぶ</h2>
        <ul>
          <li><strong>「初心者歓迎」「エンジョイ」表記</strong>のチームを探す（<a href="/guide/how-to-start/">草野球の始め方</a>）</li>
          <li><strong>助っ人・体験から</strong>：まず助っ人・体験参加で雰囲気を見るのも手（<a href="/guide/helper-recruit/">助っ人の集め方</a>）</li>
          <li><strong>年代の近いチーム</strong>：同世代中心のチームだと無理なく楽しめる</li>
          <li><strong>レベル別リーグ</strong>：初級リーグなら実力差で気後れしにくい（<a href="/guide/kanto-league/">リーグの探し方</a>）</li>
        </ul>

        <h2>はじめの守備位置</h2>
        <p>
          最初は<strong>打球頻度が比較的少なく余裕のあるポジション（ライトなど外野）</strong>から始める人が多いです。
          慣れてきたら、肩・足・好みに合わせて挑戦を。自分の強みが活きる位置は
          <a href="/guide/position/">ポジション適性</a>で見つけられます。
        </p>

        <h2>楽しく続けるコツ</h2>
        <ul>
          <li><strong>うまさより楽しさ</strong>：最初は当たらない・捕れなくて当たり前。楽しむ気持ちが上達の近道</li>
          <li><strong>無理をしない</strong>：体調・年齢に合わせて。休む勇気も大事</li>
          <li><strong>仲間ができる</strong>：草野球の一番の魅力は仲間。週末が楽しみになる</li>
        </ul>
        <div className="point-box">
          <strong>大人が始めるのに、遅すぎることはありません。</strong>
          運動不足の解消、ストレス発散、新しい仲間——草野球には大人こその楽しみがあります。
          まずは体験・見学から、気軽に一歩を踏み出してみてください。
        </div>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/how-to-start/">→ 「草野球の始め方 完全ガイド」を読む</a>
          <a className="cta-inline" href="/guide/gear-checklist/">→ 「道具・装備チェックリスト」で準備</a>
          <a className="cta-inline" href="/baseball-dock/">→ あなたに近いプロ選手を「野球人間ドック」で診断</a>
        </div>

        <RelatedGuides currentHref="/guide/over40/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
