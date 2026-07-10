import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球で使える変化球の握り方【スライダー・カーブ・フォーク・チェンジアップ】",
  description:
    "草野球のピッチャー向けに、実戦で使える変化球の握り方と投げ方のコツを図解イメージで解説。まず覚えたいスライダー・カーブ・チェンジアップ・フォーク（SFF）・シュートの握りと注意点、軟式ボールでの曲がり方の違い、肩ひじを守る投げ方まで。1球種ずつ確実に増やすのが上達の近道です。",
  alternates: { canonical: `${SITE_URL}/guide/breaking-balls/` },
  openGraph: {
    title: "草野球で使える変化球の握り方",
    description:
      "スライダー・カーブ・チェンジアップ・フォークの握りと投げ方のコツ。軟式での違いと肩ひじの守り方も。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球で使える変化球の握り方【スライダー・カーブ・フォーク・チェンジアップ】",
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
        name: "草野球で最初に覚える変化球は何がいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "腕への負担が比較的少なく、ストレートと同じ腕の振りで投げられるチェンジアップか、握りを浅くして抜くだけのスライダーがおすすめです。まずは1球種を確実にコントロールできるようにしてから増やしましょう。",
        },
      },
      {
        "@type": "Question",
        name: "軟式ボールでも変化球は曲がりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "曲がります。ただし軟球は硬式より軽く縫い目が浅いため、硬式ほど鋭くは曲がりにくい傾向があります。大きく曲げるより、ストレートとの緩急・見た目の違いでタイミングを外す使い方が有効です。",
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

export default function BreakingBallsPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球で使える変化球の握り方【スライダー・カーブ・フォーク・チェンジアップ】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約8分</p>

        <p>
          ストレートだけでは、そのうち打たれる。
          でも変化球は「たくさん覚える」より、<strong>1球種を確実にコントロールできる</strong>方が武器になります。
          この記事では、草野球で実戦的な変化球の<strong>握り方と投げ方のコツ</strong>を、負担の少ないものから順に紹介します。
        </p>

        <div className="point-box">
          <strong>大前提：肩ひじを守る。</strong>
          変化球は無理に手首をひねると故障のもとです。基本は
          <strong>「握りで変化を作り、腕の振りはストレートと同じ」</strong>。
          痛みが出たらすぐ中止してください。試合後のケアは
          <a href="/guide/body-care/">体のケア</a>もどうぞ。
        </div>

        <AdSlot id="article-top" />

        <h2>①チェンジアップ（まず最初におすすめ）</h2>
        <p>
          ストレートと同じ腕の振りで、<strong>遅い球</strong>を投げてタイミングを外す球種。
          腕への負担が少なく、最初の変化球に最適です。
        </p>
        <ul>
          <li><strong>握り</strong>：ボールを深く握る（手のひらに近づける）。人差し指と中指を少し広げる「パーム系」や、OKサインのような「サークルチェンジ」が代表的</li>
          <li><strong>投げ方</strong>：ストレートと同じ強さ・同じ腕の振りで。握りが深いぶん自然に球速が落ちる</li>
          <li><strong>コツ</strong>：「腕を緩めない」。緩めると打者にバレる。あくまで握りで遅くする</li>
        </ul>

        <h2>②スライダー（横の変化）</h2>
        <p>
          利き手側と逆方向へ滑るように曲がる、実戦で最も使われる変化球のひとつ。
        </p>
        <ul>
          <li><strong>握り</strong>：中指を縫い目にかけ、ボールの少し外側を持つ。人差し指は添える程度</li>
          <li><strong>投げ方</strong>：手首はひねらず、中指で切る（弾く）イメージ。ドアノブを回すような強いひねりはNG（ひじを痛める）</li>
          <li><strong>コツ</strong>：最初は「浅く握って抜く」だけでもスライド回転がかかる。曲げようとしすぎない</li>
        </ul>

        <AffiliateBox
          heading="⚾ 投手用グローブ・練習ボールを探す"
          rakuten={["glove"]}
          retailers
        />

        <AdSlot id="article-mid" />

        <h2>③カーブ（縦〜斜めの大きな変化・緩急）</h2>
        <p>
          山なりに大きく落ちる球。速いスライダーと組み合わせると緩急でタイミングを大きく外せます。
        </p>
        <ul>
          <li><strong>握り</strong>：人差し指と中指を縫い目にかけ、親指は下から支える。中指主導で回転をかける</li>
          <li><strong>投げ方</strong>：リリースで手の甲が自分側を向くように、上から下へ。手首の“返し”ではなく回転で落とす</li>
          <li><strong>コツ</strong>：抜け球（すっぽ抜け）に注意。低めを狙い、高めに浮くと痛打されやすい</li>
        </ul>

        <h2>④フォーク／SFF（縦に落とす）</h2>
        <p>
          人差し指と中指でボールを挟んで投げ、打者の手前で落とす球。決め球になりますが、指の力と柔軟性が要ります。
        </p>
        <ul>
          <li><strong>握り</strong>：人差し指と中指でボールを挟む。深く挟むほど落ちるが制球は難しくなる</li>
          <li><strong>投げ方</strong>：ストレートと同じ腕の振りで、抜くように放す。回転を抑えるほど落ちる</li>
          <li><strong>注意</strong>：指を広げるため負担が大きめ。投げ過ぎ注意。SFF（スプリット）は挟みを浅くした扱いやすい派生</li>
        </ul>

        <h2>⑤シュート／ツーシーム（利き手側へ動かす）</h2>
        <p>
          利き手方向へわずかに動く球。ストレートに見せて芯を外し、詰まらせる・ゴロを打たせるのに有効です。
        </p>
        <ul>
          <li><strong>握り</strong>：ツーシームは縫い目の狭い方に人差し指・中指をかける。指圧を少し内側に</li>
          <li><strong>コツ</strong>：大きく曲げるより「動く速球」。ストレートとの見分けにくさが武器</li>
        </ul>

        <h2>軟式ならではの使い方</h2>
        <p>
          軟球は硬式より軽く縫い目が浅いため、<strong>鋭さより緩急</strong>で勝負するのが有効です。
        </p>
        <ul>
          <li>大きく曲げにこだわらず、<strong>ストレートとの球速差</strong>でタイミングを外す</li>
          <li>同じ腕の振りで球種を分ける＝打者は見分けづらい</li>
          <li>低めに集める。浮いた変化球は軟球でも痛打される</li>
        </ul>

        <h2>上達の順番</h2>
        <ol>
          <li>まず<strong>ストレートのコントロール</strong>（内外角に投げ分け）を固める</li>
          <li><strong>チェンジアップ or スライダー</strong>を1つ、確実に</li>
          <li>緩急のために<strong>カーブ</strong>、決め球に<strong>フォーク系</strong>を追加</li>
        </ol>
        <p>欲張って一気に増やすより、1球種ずつ「試合で使える」精度にするのが結局は近道です。</p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/body-care/">→ 肩ひじを守る「体のケア」を読む</a>
          <a className="cta-inline" href="/glove/">→ 握りを隠せる投手用グローブは「グローブ比較」へ</a>
          <a className="cta-inline" href="/baseball-dock/">→ あなたに近いプロ投手を「野球人間ドック」で診断</a>
        </div>

        <RelatedGuides currentHref="/guide/breaking-balls/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
