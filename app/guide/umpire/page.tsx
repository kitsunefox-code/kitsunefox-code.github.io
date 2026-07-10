import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の相互審判のやり方【球審・塁審の基本とジャッジのコツ】初めてでも大丈夫",
  description:
    "草野球でよくある「相互審判（両チームで審判を出し合う）」のやり方を、球審・塁審の立ち位置、ストライク/ボールやアウト/セーフのコール、ジェスチャー、もめないためのコツまで解説。審判が初めての人でも、これだけ押さえれば当日困りません。",
  alternates: { canonical: `${SITE_URL}/guide/umpire/` },
  openGraph: {
    title: "草野球の相互審判のやり方",
    description:
      "球審・塁審の立ち位置とコール、ジェスチャー、もめないコツ。審判が初めてでも当日困らない基本。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球の相互審判のやり方【球審・塁審の基本とジャッジのコツ】",
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
        name: "相互審判では誰が審判をやりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "多くの草野球では、攻撃側のチームが審判を出す「攻撃側審判」方式が一般的です。球審は攻撃側の次打者側から、塁審は出塁したランナーがいる塁の担当を出す、などチームで事前にルールを決めておくとスムーズです。",
        },
      },
      {
        "@type": "Question",
        name: "自信がなくてもジャッジしていいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい。大事なのは、迷っても「はっきり・すぐに」コールすることです。曖昧な態度はもめる原因になります。見えなかった時は正直に伝え、両チームで確認して決めれば問題ありません。",
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

export default function UmpirePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球の相互審判のやり方【球審・塁審の基本とジャッジのコツ】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <p>
          「審判、誰かやって」——草野球あるあるの一言。専門の審判がいないチーム同士では、
          <strong>両チームで審判を出し合う「相互審判」</strong>が一般的です。
          でも、いくつかの<strong>立ち位置とコール</strong>さえ覚えれば、初めてでも大丈夫。
          もめないためのコツもあわせて紹介します。
        </p>

        <div className="point-box">
          <strong>いちばん大事なこと：</strong>
          迷っても<strong>「はっきり・すぐに」コールする</strong>。曖昧な態度がいちばんもめます。
          見えなかった時は正直に言って、両チームで確認すればOKです。
        </div>

        <AdSlot id="article-top" />

        <h2>まず決めておくこと</h2>
        <p>試合前に両チームで確認しておくと当日スムーズです。</p>
        <ul>
          <li><strong>誰が出すか</strong>：多くは「攻撃側が審判を出す」方式（攻撃側審判）。球審・塁審の担当を決めておく</li>
          <li><strong>特別ルール</strong>：リード禁止・盗塁の可否・コールドの条件など、ローカルルールを共有</li>
          <li><strong>ボール</strong>：使用球と、ファウルボールの扱い（拾いに行くか）</li>
        </ul>

        <h2>球審（キャッチャーの後ろ）の基本</h2>
        <p>球審はストライク/ボールの判定が主な仕事。捕手の後ろに立ちます。</p>
        <ul>
          <li><strong>立ち位置</strong>：捕手の斜め後ろ、頭を打者の内側の肩あたりの高さに。ボールの出入りを見やすい位置で固定</li>
          <li><strong>ストライクゾーン</strong>：ひざ〜胸のあたり×ホームベースの幅。自分の基準を1試合通してブレさせないのがコツ</li>
          <li><strong>コール</strong>：ストライクは right手を上げて「ストライク！」、ボールは声のみ「ボール」。アウト・セーフも球審が兼ねる場面が多い</li>
          <li><strong>安全</strong>：ファウルチップに注意。<strong>マスク着用</strong>を強くおすすめ</li>
        </ul>

        <AffiliateBox
          heading="⚾ 審判用マスク・用品を探す"
          rakuten={["glove"]}
          retailers
        />

        <AdSlot id="article-mid" />

        <h2>塁審の基本</h2>
        <p>塁審はアウト/セーフの判定が中心。打球や送球が見やすい角度に動きます。</p>
        <ul>
          <li><strong>立ち位置</strong>：塁の少し外側、送球とベースの両方が同一視野に入る角度に。打球方向で動く</li>
          <li><strong>タイミングを見る</strong>：「ボールがミットに入る音」と「足がベースに着く」のどちらが早いか。目と耳の両方で</li>
          <li><strong>コール</strong>：アウトは right手を握って上げ「アウト！」、セーフは両手を横に開いて「セーフ！」。はっきり大きく</li>
          <li><strong>間を作る</strong>：一瞬「見てから」コール。早すぎる判定は誤審のもと</li>
        </ul>

        <h2>コール＆ジェスチャー早見表</h2>
        <table>
          <thead>
            <tr>
              <th>判定</th>
              <th>ジェスチャー</th>
              <th>声</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>ストライク</td><td>右手を上げる（横に出す流儀も）</td><td>「ストライク！」</td></tr>
            <tr><td>ボール</td><td>ジェスチャーなし</td><td>「ボール」</td></tr>
            <tr><td>アウト</td><td>右手を握って上げる</td><td>「アウト！」</td></tr>
            <tr><td>セーフ</td><td>両手を水平に大きく開く</td><td>「セーフ！」</td></tr>
            <tr><td>ファウル</td><td>両手を上げて「ファウルボール」</td><td>「ファウル！」</td></tr>
            <tr><td>タイム</td><td>両手を上げる</td><td>「タイム！」</td></tr>
          </tbody>
        </table>

        <h2>もめないための5つのコツ</h2>
        <ol>
          <li><strong>はっきり・すぐに</strong>：自信がなくても迷いを見せない。声とジェスチャーは大きく</li>
          <li><strong>見えたことだけ言う</strong>：見えなかったら正直に。無理に決めない</li>
          <li><strong>基準を通す</strong>：ストライクゾーンは1試合ブレさせない。両チーム平等に</li>
          <li><strong>感情を持ち込まない</strong>：自分のチームに有利な判定はしない。フェアが信頼を生む</li>
          <li><strong>抗議は代表者が冷静に</strong>：もめそうな時は主将同士で。全員で詰め寄らない</li>
        </ol>

        <h2>よくある質問</h2>
        <h3>Q. ハーフスイングはどう見る？</h3>
        <p>
          バットがボールを追いかけて振り出したか、で判断します。迷ったら「振っていない＝ボール」寄りに見る審判が多いですが、
          チームで基準をそろえておくと揉めません。
        </p>
        <h3>Q. 走塁妨害・守備妨害は？</h3>
        <p>
          草野球では細かく取りすぎず、明らかなものだけ拾うのが円満です。判断に迷う場面は、
          両チームで話し合って決めればOK。ルールの基本は
          <a href="/guide/game-flow/">試合の進め方・基本ルール</a>もどうぞ。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/game-flow/">→ 当日の流れは「試合の進め方・基本ルール」へ</a>
          <a className="cta-inline" href="/guide/scorebook/">→ 記録係なら「スコアブックの書き方」</a>
          <a className="cta-inline" href="/guide/">→ ガイドをすべて見る</a>
        </div>

        <RelatedGuides currentHref="/guide/umpire/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
