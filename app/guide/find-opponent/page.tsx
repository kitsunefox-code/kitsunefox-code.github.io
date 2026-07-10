import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の対戦相手の探し方【マッチングアプリ・掲示板・SNSの使い方と募集文】",
  description:
    "草野球で対戦相手（練習試合の相手）を探す方法を、マッチングアプリ・掲示板・SNS・リーグ加入の4ルートで解説。それぞれの特徴と使い分け、そのまま使える募集文テンプレート、初めての練習試合で揉めないための事前確認（球場・ルール・人数・雨天対応）まで。試合数を増やしたいチームのための実践ガイドです。",
  alternates: { canonical: `${SITE_URL}/guide/find-opponent/` },
  openGraph: {
    title: "草野球の対戦相手の探し方",
    description: "アプリ・掲示板・SNS・リーグの使い分け、募集文テンプレ、事前確認のコツ。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球の対戦相手の探し方【マッチングアプリ・掲示板・SNSの使い方と募集文】",
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
        name: "草野球の対戦相手はどこで探せますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "野球専用のマッチングアプリ・掲示板サービス、X（旧Twitter）などのSNS、私設リーグへの加入、知り合いの紹介、が主なルートです。手軽さならアプリやSNS、安定して試合を組みたいならリーグ加入が向いています。複数を併用すると相手が見つかりやすくなります。",
        },
      },
      {
        "@type": "Question",
        name: "対戦相手が決まったら何を確認すればいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "日時・球場（場所と使用可否）・使用球・特別ルール（リードや盗塁の可否など）・人数と助っ人の可否・審判の方式（相互審判か）・雨天中止の判断と連絡方法を、試合前に両チームで確認しておくと当日揉めません。連絡先の交換も忘れずに。",
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

export default function FindOpponentPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球の対戦相手の探し方【マッチングアプリ・掲示板・SNSの使い方と募集文】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          チームはできた、でも<strong>試合の相手が見つからない</strong>——草野球あるあるです。
          いまは対戦相手を探す手段がいろいろあります。この記事では
          <strong>4つの探し方の使い分け</strong>と、<strong>そのまま使える募集文</strong>、
          初めての練習試合で揉めないコツをまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>対戦相手を探す4つのルート</h2>
        <table>
          <thead>
            <tr><th>ルート</th><th>特徴</th><th>向いている人</th></tr>
          </thead>
          <tbody>
            <tr><td>マッチングアプリ・掲示板</td><td>野球専用サービスで相手・助っ人・リーグ情報が集まる</td><td>手軽に相手を探したい</td></tr>
            <tr><td>SNS（X など）</td><td>「#対戦相手募集」で発信・検索。拡散力がある</td><td>フットワーク軽く探したい</td></tr>
            <tr><td>私設リーグに加入</td><td>加入すれば定期的に試合が組まれる</td><td>安定して試合数を確保したい</td></tr>
            <tr><td>知り合いの紹介</td><td>いちばん確実で安心。トラブルが少ない</td><td>まず1試合を安心して組みたい</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>使い分けのコツ：</strong>
          手軽さならアプリ・SNS、安定して試合を組みたいなら
          <a href="/guide/kanto-league/">私設リーグ加入</a>。複数を併用すると相手が見つかりやすくなります。
          野球向けのマッチングアプリ・掲示板は複数あるので、「草野球 対戦相手 アプリ」で探して使いやすいものを。
        </div>

        <h2>そのまま使える募集文テンプレート</h2>
        <div className="point-box">
          【対戦相手募集】<br />
          ◯◯（チーム名／活動地域）です。練習試合の相手を募集しています。<br />
          ・レベル：エンジョイ〜（初心者歓迎）<br />
          ・希望日：◯月◯日（日）午前／会場：◯◯グラウンド（確保済 or 相談）<br />
          ・使用球：M号／人数：9〜12名／助っ人：あり<br />
          ・審判：相互審判／雨天：前日夜に連絡し判断<br />
          気軽にご連絡ください！ #草野球 #対戦相手募集
        </div>
        <p>
          ポイントは<strong>レベル・日時・会場・使用球・審判方式</strong>を最初に書くこと。
          条件が明確だと、合う相手からの返信が増え、当日のミスマッチも防げます。
        </p>

        <AdSlot id="article-mid" />

        <h2>相手が決まったら：試合前の確認リスト</h2>
        <p>当日揉めないために、両チームで事前にすり合わせておきましょう。</p>
        <table>
          <thead>
            <tr><th>項目</th><th>確認内容</th></tr>
          </thead>
          <tbody>
            <tr><td>日時・会場</td><td>集合時間、球場の場所・使用可否・駐車場</td></tr>
            <tr><td>使用球</td><td>M号など。どちらが用意するか</td></tr>
            <tr><td>特別ルール</td><td>リード・盗塁の可否、コールドの条件（<a href="/guide/game-flow/">試合の進め方</a>）</td></tr>
            <tr><td>人数・助っ人</td><td>最低人数、助っ人の可否・人数</td></tr>
            <tr><td>審判</td><td>相互審判か（<a href="/guide/umpire/">相互審判のやり方</a>）</td></tr>
            <tr><td>雨天対応</td><td>中止判断のタイミングと連絡方法・連絡先交換</td></tr>
          </tbody>
        </table>

        <h2>気持ちよく続けるために</h2>
        <p>
          対戦は一度きりではありません。<strong>マナーよく、気持ちよく</strong>やれば、
          「また一緒に」と次の試合につながります。整備・挨拶・フェアな審判——基本を大切に（
          <a href="/guide/manners/">草野球のマナー</a>）。それが結局、相手探しをラクにします。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/kanto-league/">→ 「関東の草野球リーグまとめ」を読む</a>
          <a className="cta-inline" href="/guide/helper-recruit/">→ 人数が足りないなら「助っ人の集め方」へ</a>
          <a className="cta-inline" href="/guide/manners/">→ 「草野球のマナー」も読む</a>
        </div>

        <RelatedGuides currentHref="/guide/find-opponent/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
