import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の全国大会に出るには【天皇賜杯・高松宮賜杯｜軟式野球の大会体系】",
  description:
    "草野球チームが目標にできる軟式野球の全国大会（天皇賜杯全日本軟式野球大会・高松宮賜杯など）の仕組みと、出場までの道筋を解説。連盟へのチーム登録から、支部予選→都道府県→ブロック→全国という階層構造、クラス（A・B）による大会の違いまで。「本気で上を目指したい」チームのための入門ガイドです。",
  alternates: { canonical: `${SITE_URL}/guide/tournament/` },
  openGraph: {
    title: "草野球の全国大会に出るには（天皇賜杯・高松宮賜杯）",
    description: "軟式野球の大会体系と、連盟登録→予選→全国までの道筋を解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球の全国大会に出るには【天皇賜杯・高松宮賜杯｜軟式野球の大会体系】",
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
        name: "草野球チームが全国大会に出るにはどうすればいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "まず全日本軟式野球連盟（JSBB）の支部にチーム登録することが前提です。そのうえで支部予選から都道府県・ブロックの予選を勝ち上がると、天皇賜杯や高松宮賜杯などの全国大会につながります。登録方法や予選日程は都道府県支部によって異なるため、所属地域の支部に確認するのが確実です。",
        },
      },
      {
        "@type": "Question",
        name: "天皇賜杯と高松宮賜杯の違いは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "いずれも全日本軟式野球連盟が関わる一般（成年）の全国大会ですが、対象となるクラスなどが異なります。たとえば高松宮賜杯には1部・2部があり、クラスによって出場対象が分かれます。最新の要項・対象・日程は連盟公式サイトで確認してください。",
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

export default function TournamentPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球の全国大会に出るには【天皇賜杯・高松宮賜杯｜軟式野球の大会体系】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          エンジョイもいいけれど、「<strong>本気で上を目指したい</strong>」チームへ。
          軟式野球には、草野球チームが目標にできる<strong>全国大会</strong>があります。
          天皇賜杯や高松宮賜杯といった大会の仕組みと、出場までの道筋をやさしく解説します。
        </p>

        <div className="point-box">
          <strong>ご注意：</strong>
          大会の対象クラス・日程・会場・要項は年度で変わります。出場を目指す際は、必ず
          <strong>全日本軟式野球連盟（JSBB）および所属の都道府県支部の公式情報</strong>で最新を確認してください。
          本記事は仕組みの入門ガイドです。
        </div>

        <AdSlot id="article-top" />

        <h2>大前提：まず連盟にチーム登録</h2>
        <p>
          全国大会は<strong>誰でも自由に出られるわけではありません</strong>。
          まず<strong>全日本軟式野球連盟（JSBB）の支部にチーム登録</strong>することが出発点です。
          登録は<strong>47都道府県の支部を通じて</strong>行い、受付期間や方法は支部ごとに異なります。
        </p>
        <p>
          登録の具体的な手順は<a href="/guide/team-registration/">軟式野球連盟のチーム登録の手順</a>で解説しています。
        </p>

        <h2>全国大会までの階層構造</h2>
        <p>全国大会は、勝ち上がっていく<strong>ピラミッド型</strong>になっています。</p>
        <ol>
          <li><strong>支部登録</strong>：所属地域の支部にチーム登録</li>
          <li><strong>支部予選・地区予選</strong>：地域の大会を勝ち上がる</li>
          <li><strong>都道府県大会</strong>：県の代表を決める</li>
          <li><strong>ブロック大会</strong>：地方ブロックの代表を決める</li>
          <li><strong>全国大会</strong>：天皇賜杯・高松宮賜杯などの舞台へ</li>
        </ol>

        <AdSlot id="article-mid" />

        <h2>主な一般（成年）の全国大会</h2>
        <table>
          <thead>
            <tr><th>大会</th><th>概要</th></tr>
          </thead>
          <tbody>
            <tr><td>天皇賜杯 全日本軟式野球大会</td><td>一般（成年）の頂点を決める全国大会。各地の予選を勝ち上がったチームが出場</td></tr>
            <tr><td>高松宮賜杯 全日本軟式野球大会</td><td>1部・2部があり、対象クラスが分かれる。クラス別に上位を決める</td></tr>
            <tr><td>東日本・西日本 軟式野球大会</td><td>地区ブロック規模の大会。全国につながる位置づけ</td></tr>
          </tbody>
        </table>
        <p>
          ※ 大会名・対象・日程は年度で変わります。高松宮賜杯のようにクラス（A・B）で出場対象が分かれる大会もあり、
          上位進出でクラス昇格につながる場合もあります。<strong>詳細は必ず連盟公式で確認</strong>してください。
        </p>

        <h2>目指す前に：まずは足元から</h2>
        <ul>
          <li><strong>連盟登録が第一歩</strong>：<a href="/guide/team-registration/">チーム登録の手順</a>を確認</li>
          <li><strong>実戦経験を積む</strong>：まず<a href="/guide/kanto-league/">私設リーグ</a>や練習試合で試合勘を養う</li>
          <li><strong>チーム力を上げる</strong>：<a href="/guide/team-practice/">チーム練習メニュー</a>で守備・連係を磨く</li>
        </ul>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/team-registration/">→ 「軟式野球連盟のチーム登録の手順」を読む</a>
          <a className="cta-inline" href="/guide/kanto-league/">→ まずは「私設リーグ」から始める</a>
          <a className="cta-inline" href="/guide/team-practice/">→ 「チーム練習メニュー」で強くなる</a>
        </div>

        <RelatedGuides currentHref="/guide/tournament/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
