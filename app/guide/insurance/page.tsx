import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の保険はどうする？【スポーツ保険・チームでの入り方・費用の目安】",
  description:
    "草野球の練習や試合中のケガ・打球事故に備える保険を解説。年間数百円から入れるスポーツ安全保険（スポーツ安全協会）を軸に、個人で入る方法・チームでまとめて加入する方法、賠償責任（打球で人や物を傷つけた時）への備え、費用の目安と加入の流れまで。万が一に備えて、安心して野球を楽しみましょう。",
  alternates: { canonical: `${SITE_URL}/guide/insurance/` },
  openGraph: {
    title: "草野球の保険はどうする？",
    description:
      "スポーツ安全保険を軸に、個人/チーム加入・賠償責任・費用の目安・加入の流れを解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球の保険はどうする？【スポーツ保険・チームでの入り方・費用の目安】",
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
        name: "草野球で保険は必要ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "デッドボールや打球、送球、走塁での接触など、野球はケガのリスクがあるスポーツです。さらに打球で他人や物を傷つけてしまう賠償リスクもあるため、年間数百円から入れるスポーツ保険への加入をおすすめします。安心してプレーするための備えです。",
        },
      },
      {
        "@type": "Question",
        name: "スポーツ安全保険はいくらくらいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "スポーツ安全協会のスポーツ安全保険は、区分により年額おおよそ1,850円前後〜（大人の一般的な区分の目安）で加入でき、ケガの補償に加えて賠償責任もカバーされます。金額・補償内容は年度・区分により変わるため、必ず公式で最新情報を確認してください。",
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

export default function InsurancePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球の保険はどうする？【スポーツ保険・チームでの入り方・費用の目安】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          楽しい草野球も、一歩間違えばケガや事故のリスクと隣り合わせ。
          デッドボール、打球、送球、走塁での接触……そして<strong>打球が人や車に当たってしまう</strong>賠償リスクも。
          「もしも」に備える保険は、<strong>年間数百円〜</strong>から入れます。安心してプレーするために、備え方を整理しました。
        </p>

        <div className="point-box">
          <strong>本記事は一般的な情報です。</strong>
          保険の金額・補償内容・加入条件は年度や区分で変わります。
          加入前に必ず<strong>各保険の公式サイトで最新情報を確認</strong>してください。
        </div>

        <AdSlot id="article-top" />

        <h2>草野球で備えたい2つのリスク</h2>
        <table>
          <thead>
            <tr>
              <th>リスク</th>
              <th>具体例</th>
              <th>備える保険</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>自分のケガ</td><td>デッドボール・打球・接触・肉離れ・骨折など</td><td>傷害保険（ケガの補償）</td></tr>
            <tr><td>他人・物への損害</td><td>打球で人にケガ・車や窓を破損させた等</td><td>賠償責任保険</td></tr>
          </tbody>
        </table>
        <p>草野球では、この<strong>両方をカバーできる保険</strong>を選ぶのが安心です。</p>

        <h2>定番：スポーツ安全保険（スポーツ安全協会）</h2>
        <p>
          アマチュアスポーツ団体の定番が「<strong>スポーツ安全保険</strong>」。
          <strong>ケガの補償＋賠償責任</strong>をまとめてカバーでき、掛金が安いのが魅力です。
        </p>
        <ul>
          <li><strong>掛金の目安</strong>：区分により年額おおよそ1,850円前後〜（大人の一般的な区分の目安。年度・区分で変動）</li>
          <li><strong>加入単位</strong>：原則<strong>4名以上の団体</strong>で加入（チーム単位に向く）</li>
          <li><strong>補償</strong>：練習・試合中のケガ（入院・通院・後遺障害など）＋賠償責任</li>
          <li><strong>期間</strong>：年度単位（毎年更新）。加入は年度初めが多い</li>
        </ul>
        <div className="point-box">
          <strong>チーム運営者へ：</strong>
          メンバー全員で一括加入すれば、1人あたりの負担は小さく、いざという時の安心が段違いです。
          年度初めに<strong>チームの恒例行事</strong>として案内すると加入漏れを防げます（
          <a href="/guide/annual-cost/">年間費用</a>にも組み込んでおくと管理がラク）。
        </div>

        <AdSlot id="article-mid" />

        <h2>個人で備える選択肢</h2>
        <p>チームで入らない・入れない場合や、上乗せしたい場合は個人の保険も。</p>
        <ul>
          <li><strong>個人賠償責任保険</strong>：自動車保険・火災保険・クレカの特約で付いていることが多い。打球事故などの賠償に。まずは既契約を確認</li>
          <li><strong>傷害保険（レジャー・スポーツ向け）</strong>：ケガの補償を手厚くしたい人に。日帰り〜年間まで様々</li>
          <li><strong>共済</strong>：手頃な掛金でケガ・賠償をカバーできるものもある</li>
        </ul>
        <p>
          まずは<strong>今入っている保険に個人賠償責任がついていないか</strong>を確認するのが第一歩。
          ついていれば、打球事故などの「他人・物への損害」はカバーされることがあります。
        </p>

        <h2>加入の流れ（チームの場合）</h2>
        <ol>
          <li>加入する保険を決める（迷ったらスポーツ安全保険が定番）</li>
          <li>メンバーの氏名・生年月日など必要情報を集める</li>
          <li>掛金を集金し、公式の手順（Web・窓口）で申込・支払い</li>
          <li>補償開始日を全員に共有。毎年の更新も忘れずに</li>
        </ol>

        <h2>よくある質問</h2>
        <h3>Q. 助っ人（ゲスト）も補償される？</h3>
        <p>
          団体加入では<strong>加入者本人</strong>が対象です。助っ人が多いチームは、
          都度加入できる1日単位のレジャー保険を各自で用意してもらうなどの工夫を。事前にルールを決めておきましょう。
        </p>
        <h3>Q. 会場（球場）の賠償はどうなる？</h3>
        <p>
          球場の設備破損なども賠償責任の対象になり得ます。施設利用時の規約も確認し、
          不安なら賠償を含む保険でカバーしておくと安心です。
        </p>

        <p className="player-disc">
          ※ 本記事は一般的な情報提供であり、特定の保険商品の推奨や保険募集・勧誘を目的とするものではありません。
          金額・補償・条件は必ず各保険の公式情報でご確認ください。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/build-a-team/">→ チーム運営の全体像は「チームの作り方」へ</a>
          <a className="cta-inline" href="/guide/annual-cost/">→ 「草野球の年間費用」に保険も組み込む</a>
          <a className="cta-inline" href="/guide/">→ ガイドをすべて見る</a>
        </div>

        <RelatedGuides currentHref="/guide/insurance/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
