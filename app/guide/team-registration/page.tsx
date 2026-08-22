import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "軟式野球連盟のチーム登録の手順【草野球チームを公式大会に出す準備】",
  description:
    "草野球チームを軟式野球連盟（JSBB）に登録する手順を、初めての人向けにわかりやすく解説。なぜ登録が必要か、支部を通じた登録の流れ、必要な情報（チーム名・代表者・選手名簿など）、費用・受付時期の考え方、登録後にできること（公式大会への出場）まで。天皇賜杯などを目指す第一歩をまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/team-registration/` },
  openGraph: {
    title: "軟式野球連盟のチーム登録の手順",
    description: "支部を通じた登録の流れ・必要情報・費用や時期の考え方・登録後にできること。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "軟式野球連盟のチーム登録の手順【草野球チームを公式大会に出す準備】",
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
        name: "草野球チームの連盟登録はどこで行いますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "全日本軟式野球連盟（JSBB）は各都道府県に支部があり、チーム登録はその支部（または市区町村の連盟）を通じて行います。受付方法・時期・費用は地域によって異なるため、まずは「（お住まいの都道府県）軟式野球連盟」を検索し、支部の案内を確認するのが確実です。",
        },
      },
      {
        "@type": "Question",
        name: "連盟に登録しないと試合はできませんか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "練習試合や民間の私設リーグは、連盟登録なしでも参加できるものが多いです。連盟登録が必要になるのは、天皇賜杯などの連盟主催の公式大会に出場する場合です。まずは登録不要で始め、公式大会を目指す段階で登録する、という進め方もできます。",
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

export default function TeamRegistrationPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>軟式野球連盟のチーム登録の手順【草野球チームを公式大会に出す準備】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約5分</p>

        <p>
          「公式大会に出てみたい」——そう思ったら、まず必要なのが
          <strong>軟式野球連盟へのチーム登録</strong>です。手続きと聞くと身構えますが、
          流れを知れば難しくありません。初めての人向けに、登録の手順と考え方をまとめました。
        </p>

        <div className="point-box">
          <strong>ご注意：</strong>
          登録方法・受付時期・費用は<strong>都道府県支部（市区町村連盟）ごとに異なります</strong>。
          必ず<strong>所属地域の連盟公式情報で最新を確認</strong>してください。本記事は一般的な流れの解説です。
        </div>

        <AdSlot id="article-top" />

        <h2>そもそも、なぜ登録が必要？</h2>
        <ul>
          <li><strong>公式大会に出るため</strong>：天皇賜杯・高松宮賜杯などの連盟主催大会は登録チームが対象（
            <a href="/guide/tournament/">全国大会に出るには</a>）</li>
          <li><strong>練習試合・私設リーグは登録不要のことが多い</strong>：まず試合を楽しむだけなら登録なしでもOK</li>
          <li><strong>段階的でよい</strong>：エンジョイで始めて、上を目指す段階で登録、という流れも自然</li>
        </ul>

        <h2>登録の流れ（一般的な例）</h2>
        <ol>
          <li><strong>所属支部を調べる</strong>：「（都道府県名）軟式野球連盟」を検索。市区町村の連盟が窓口のことも</li>
          <li><strong>受付時期・方法を確認</strong>：多くは年度初め（春）に受付。近年は「野球ねっと」等のオンライン登録も</li>
          <li><strong>必要情報を準備</strong>：チーム名・代表者・連絡先・選手名簿（氏名等）など</li>
          <li><strong>登録料を納める</strong>：チーム登録料・選手登録料など（金額は支部で異なる）</li>
          <li><strong>登録完了</strong>：登録が受理されると、支部の公式大会に参加できるようになる</li>
        </ol>

        <AdSlot id="article-mid" />

        <h2>準備しておくと良いもの</h2>
        <table>
          <thead>
            <tr><th>項目</th><th>内容</th></tr>
          </thead>
          <tbody>
            <tr><td>チーム情報</td><td>チーム名・代表者・連絡先・活動地域</td></tr>
            <tr><td>選手名簿</td><td>登録選手の氏名など（様式は支部指定）</td></tr>
            <tr><td>登録料</td><td>チーム・選手の登録料（支部により異なる）</td></tr>
            <tr><td>スケジュール</td><td>受付期間・提出締切。逃すと次年度まで待つことも</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>ポイント：</strong>
          受付は<strong>期間が決まっている</strong>ことが多く、逃すとその年の公式大会に出られない場合があります。
          年度初めに支部サイトをチェックし、早めに動きましょう。
        </div>

        <h2>登録したら、次は</h2>
        <ul>
          <li><strong>公式大会にエントリー</strong>：支部の予選から挑戦（<a href="/guide/tournament/">全国大会に出るには</a>）</li>
          <li><strong>チーム力を上げる</strong>：<a href="/guide/team-practice/">チーム練習メニュー</a>で守備・連係を磨く</li>
          <li><strong>保険も忘れずに</strong>：ケガ・賠償に備える（<a href="/guide/insurance/">草野球の保険</a>）</li>
        </ul>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/tournament/">→ 「全国大会に出るには」を読む</a>
          <a className="cta-inline" href="/guide/build-a-team/">→ チーム作りの全体像は「チームの作り方」へ</a>
          <a className="cta-inline" href="/guide/insurance/">→ 「草野球の保険」も確認</a>
        </div>

        <RelatedGuides currentHref="/guide/team-registration/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
