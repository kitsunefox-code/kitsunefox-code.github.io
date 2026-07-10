import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球のマナー・グラウンドの使い方【また呼ばれるチームになる基本】",
  description:
    "草野球で長く続けるために欠かせないマナーとグラウンドの使い方を解説。グラウンド整備（トンボ・ライン）、時間厳守、相手・審判へのリスペクト、近隣への配慮、ゴミの持ち帰り、相互審判での振る舞いまで。当たり前を丁寧にやるチームは、また声がかかります。初心者・新チームの必読マナー集。",
  alternates: { canonical: `${SITE_URL}/guide/manners/` },
  openGraph: {
    title: "草野球のマナー・グラウンドの使い方",
    description:
      "グラウンド整備・時間厳守・リスペクト・近隣配慮。また呼ばれるチームになる基本マナー集。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球のマナー・グラウンドの使い方【また呼ばれるチームになる基本】",
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
        name: "試合後のグラウンド整備は何をすればいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "使った場所をトンボでならし、ベースやプレートの穴を埋め、ラインを消す（必要な場合）、ゴミを拾って持ち帰る、が基本です。次に使う人が気持ちよく使えるよう、来た時よりきれいにして帰るのがマナーです。",
        },
      },
      {
        "@type": "Question",
        name: "対戦相手との揉め事を防ぐには？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "特別ルール（リード・盗塁の可否、コールドの条件など）を試合前に両チームで確認し、相互審判では公平にジャッジすること。判定への抗議は主将同士が冷静に、が基本です。勝ち負け以上に気持ちよくやることを優先すると、また対戦が組めます。",
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

export default function MannersPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球のマナー・グラウンドの使い方【また呼ばれるチームになる基本】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          強いチームより、<strong>また一緒にやりたいチーム</strong>。
          草野球を長く楽しむコツは、じつは技術より<strong>マナー</strong>にあります。
          グラウンドの使い方、時間、相手や近隣への配慮——当たり前を丁寧にやるチームには、
          自然と声がかかります。新チーム・初心者がまず押さえたい基本をまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>グラウンドの使い方（来た時よりきれいに）</h2>
        <ul>
          <li><strong>整備して返す</strong>：使った内野をトンボでならす。ベース・プレートの穴を埋める</li>
          <li><strong>ゴミは持ち帰る</strong>：飲み物・テープ・絆創膏まで。芝や土に残さない</li>
          <li><strong>用具を大切に</strong>：共用のベースやトンボは丁寧に扱い、元の場所へ</li>
          <li><strong>次の人へ</strong>：「来た時よりきれいに」が合言葉。次に使う人が気持ちよく使えるように</li>
        </ul>
        <div className="point-box">
          <strong>これが効く：</strong>
          整備がきれいなチームは、球場の管理者やリーグからの信頼が厚くなります。
          <strong>また使わせてもらえる・また試合を組んでもらえる</strong>——巡り巡って自分たちのためになります。
        </div>

        <h2>時間を守る</h2>
        <ul>
          <li><strong>集合は余裕をもって</strong>：アップ・準備の時間を見込む。遅刻は全体の進行に響く</li>
          <li><strong>試合はテンポよく</strong>：だらだらしない。攻守交代は走って。持ち時間・次の利用者を意識</li>
          <li><strong>撤収も速やかに</strong>：終わったら整備して即撤収。長居しない</li>
        </ul>

        <AdSlot id="article-mid" />

        <h2>対戦相手・審判へのリスペクト</h2>
        <ul>
          <li><strong>試合前後の挨拶</strong>：整列・挨拶は気持ちよく。「お願いします」「ありがとうございました」</li>
          <li><strong>特別ルールの確認</strong>：リード・盗塁・コールドの条件などを事前にすり合わせる（
            <a href="/guide/game-flow/">試合の進め方</a>参照）</li>
          <li><strong>相互審判は公平に</strong>：自チーム有利の判定はしない。フェアが信頼を生む（
            <a href="/guide/umpire/">相互審判のやり方</a>）</li>
          <li><strong>抗議は冷静に</strong>：揉めそうな時は主将同士で。全員で詰め寄らない</li>
          <li><strong>ヤジ・過度な声かけはNG</strong>：盛り上げと相手を不快にさせる言動は別物</li>
        </ul>

        <h2>近隣・環境への配慮</h2>
        <ul>
          <li><strong>騒音</strong>：住宅街の近くは声量・音出しに注意。早朝・夜間はとくに配慮</li>
          <li><strong>駐車</strong>：指定場所に。路上駐車・近隣店舗への無断駐車はトラブルのもと</li>
          <li><strong>ファウルボール</strong>：場外に出たら責任をもって対応。危険がないか確認</li>
          <li><strong>喫煙・飲食</strong>：球場のルールに従う。吸い殻・ゴミは絶対に残さない</li>
        </ul>

        <h2>チーム内のマナーも大事</h2>
        <ul>
          <li><strong>助っ人・新メンバーを歓迎</strong>：初参加が居心地よく感じられる声かけを（
            <a href="/guide/helper-recruit/">助っ人の集め方</a>）</li>
          <li><strong>準備・片付けはみんなで</strong>：一部の人に負担が偏らないように</li>
          <li><strong>ケガに配慮</strong>：無理をさせない。体調や年齢に合わせて</li>
        </ul>

        <h2>まとめ：マナーは最強の営業</h2>
        <p>
          整備がきれい、時間を守る、相手を尊重する。この<strong>当たり前</strong>を続けるチームは、
          球場もリーグも対戦相手も「また一緒に」と思ってくれます。
          マナーは、長く楽しく草野球を続けるための<strong>いちばんの土台</strong>です。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/umpire/">→ 「相互審判のやり方」を読む</a>
          <a className="cta-inline" href="/guide/game-flow/">→ 「試合の進め方・基本ルール」を読む</a>
          <a className="cta-inline" href="/guide/">→ ガイドをすべて見る</a>
        </div>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
