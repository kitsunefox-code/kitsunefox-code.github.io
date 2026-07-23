import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "東京の草野球グラウンド予約ガイド【区の施設予約・団体登録の要件と流れ】",
  description:
    "東京23区などで草野球のグラウンド（野球場）を予約する方法を、初めての人向けに解説。多くの区が採用するインターネット施設予約システム（けやきネット等）の仕組み、団体登録の要件（構成員数・在住/在勤/在学の条件）、抽選申込の流れ、人気球場の取りにくさと対策まで。自分たちの活動拠点を確保するための実践ガイドです。",
  alternates: { canonical: `${SITE_URL}/guide/ground-reservation/` },
  openGraph: {
    title: "東京の草野球グラウンド予約ガイド",
    description: "区の施設予約システム・団体登録の要件・抽選の流れ・人気球場の対策まで。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "東京の草野球グラウンド予約ガイド【区の施設予約・団体登録の要件と流れ】",
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
        name: "区の野球場を予約するにはどうすればいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "多くの区ではインターネットの施設予約システム（けやきネット等）を通じて予約します。利用にはまず団体（利用者）登録が必要で、区によって『構成員が一定人数以上』『半数以上がその区に在住・在勤・在学』といった要件が設けられています。まずはお住まい・活動する区の施設予約システムと登録要件を確認しましょう。",
        },
      },
      {
        "@type": "Question",
        name: "人気の球場は予約が取りにくいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "取りにくいことが多いです。土日の人気時間帯は抽選になり、当選倍率が高い球場もあります。抽選に外れる前提で複数の候補日・球場に申し込む、平日ナイターや空きやすい時間帯を狙う、といった工夫が有効です。",
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

export default function GroundReservationPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>東京の草野球グラウンド予約ガイド【区の施設予約・団体登録の要件と流れ】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          チームができたら、次は<strong>活動する球場の確保</strong>。
          「グラウンドってどうやって借りるの？」と最初は戸惑いますよね。
          東京23区の多くは<strong>インターネットの施設予約システム</strong>を使います。
          仕組みと、団体登録の要件・流れをまとめました。
        </p>

        <div className="point-box">
          <strong>ご注意：</strong>
          予約システム・登録要件・料金・抽選ルールは<strong>区（自治体）ごとに異なり、変更もあります</strong>。
          必ず<strong>利用する区の公式サイト・施設予約システムで最新を確認</strong>してください。本記事は一般的な流れの解説です。
        </div>

        <AdSlot id="article-top" />

        <h2>基本の流れ</h2>
        <ol>
          <li><strong>予約システムを調べる</strong>：「（区名）施設予約」で検索。多くの区が「けやきネット」等の共通システムを採用</li>
          <li><strong>団体（利用者）登録をする</strong>：野球場の利用にはまず団体登録が必要な区が多い</li>
          <li><strong>抽選に申し込む</strong>：人気の土日は抽選。希望日・球場・時間帯を申し込む</li>
          <li><strong>当選したら支払い・利用</strong>：当選後に使用料を支払い、当日利用</li>
        </ol>

        <h2>団体登録の要件（区で異なる）</h2>
        <p>
          区によって団体登録の条件が決められています。たとえば<strong>「構成員が◯人以上」「半数以上がその区に在住・在勤・在学」</strong>
          といった要件が代表的です（例：世田谷区などで、こうした人数・居住要件が設けられています）。
          自分たちの活動する区の要件を、登録前に確認しておきましょう。
        </p>
        <table>
          <thead>
            <tr><th>よくある要件</th><th>内容の例</th></tr>
          </thead>
          <tbody>
            <tr><td>人数</td><td>構成員が一定人数以上（例：5人以上 など）</td></tr>
            <tr><td>居住等の条件</td><td>半数以上がその区に在住・在勤・在学 など</td></tr>
            <tr><td>代表者・名簿</td><td>代表者情報・構成員名簿の提出</td></tr>
          </tbody>
        </table>

        <AdSlot id="article-mid" />

        <h2>人気球場は取りにくい：対策</h2>
        <ul>
          <li><strong>複数の候補で申し込む</strong>：抽選に外れる前提で、複数日・複数球場に申込</li>
          <li><strong>時間帯・曜日をずらす</strong>：平日ナイターや早朝・空きやすい時間帯を狙う</li>
          <li><strong>近隣区もチェック</strong>：活動範囲を少し広げると選択肢が増える</li>
          <li><strong>民間・河川敷グラウンドも</strong>：区営以外の貸しグラウンド・河川敷も候補に</li>
        </ul>
        <div className="point-box">
          <strong>現実：</strong>
          区営球場は料金が手頃な反面、<strong>土日の人気時間帯は競争が激しい</strong>です。
          「取れたらラッキー」くらいの気持ちで、複数の手段を併用するのが現実的です。
        </div>

        <h2>球場が取れない時は</h2>
        <ul>
          <li><strong>対戦相手に会場を持ってもらう</strong>：ホーム＆アウェー的に融通し合う（<a href="/guide/find-opponent/">対戦相手の探し方</a>）</li>
          <li><strong>リーグに入る</strong>：私設リーグは会場を用意してくれることが多い（<a href="/guide/kanto-league/">関東の草野球リーグ</a>）</li>
          <li><strong>練習は別の場所で</strong>：河川敷・公園（球技可の場所）・バッティングセンター等を活用</li>
        </ul>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/find-opponent/">→ 「対戦相手の探し方」を読む</a>
          <a className="cta-inline" href="/guide/kanto-league/">→ 会場付きの「私設リーグ」を探す</a>
          <a className="cta-inline" href="/guide/build-a-team/">→ チーム運営の全体像は「チームの作り方」へ</a>
        </div>

        <RelatedGuides currentHref="/guide/ground-reservation/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
