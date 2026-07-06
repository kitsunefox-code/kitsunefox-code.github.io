import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の疲労回復・体のケア完全ガイド｜翌日に残さない・ケガを防ぐ（肩・肘・腰・脚）",
  description:
    "大人の草野球は、翌日の疲れとの戦い。試合前後のアップ／ダウン、肩・肘・腰・脚の部位別ケア、疲労回復に効くストレッチ・入浴・睡眠・栄養、そしてアスリートに愛用者の多いコンディショニンググッズまで。長く楽しく続けるための体のケアをまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/body-care/` },
  openGraph: {
    title: "草野球の疲労回復・体のケア完全ガイド",
    description:
      "翌日に疲れを残さない・ケガを防ぐ。アップ/ダウン、部位別ケア、回復の習慣、ケアグッズまで。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "草野球の疲労回復・体のケア完全ガイド｜翌日に残さない・ケガを防ぐ（肩・肘・腰・脚）",
    inLanguage: "ja",
    dateModified: "2026-07-06",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "草野球で翌日に疲れを残さないコツは？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "試合後の軽い運動（クールダウン）とストレッチ、入浴で体を温める、十分な睡眠と水分・栄養補給が基本です。とくに運動後のストレッチと睡眠は、翌日のだるさを大きく左右します。",
        },
      },
      {
        "@type": "Question",
        name: "久しぶりの運動で肩や肘を痛めないためには？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "いきなり全力で投げないこと。キャッチボールは近い距離から徐々に離し、肩が温まってから強く投げます。試合前のウォームアップと、投げすぎを避ける意識がケガ予防に直結します。",
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

export default function BodyCarePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球の疲労回復・体のケア完全ガイド｜翌日に残さない・ケガを防ぐ（肩・肘・腰・脚）</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <p>
          学生時代とは違って、大人の草野球は<strong>「翌日」との戦い</strong>。
          楽しかった試合の翌朝、肩は上がらない、腰は痛い、階段がつらい……。
          でも、ちょっとしたケアの習慣で、そのダメージは驚くほど減らせます。
          長く・楽しく続けるための、体のケアをまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>ケガ予防は「試合前」で9割決まる</h2>
        <p>
          いちばん大事なのは、痛める前に防ぐこと。
          とくに大人は、<strong>いきなり全力</strong>が最大の敵です。
        </p>
        <ul>
          <li><strong>ウォームアップ</strong>：軽いランニング・体操で体温を上げてから動く</li>
          <li><strong>キャッチボールは近くから</strong>：短い距離で肩を温め、徐々に距離を伸ばす</li>
          <li><strong>投げすぎない</strong>：肩・肘の違和感は我慢しない。翌週に響きます</li>
          <li><strong>ダッシュ前のもうひと伸ばし</strong>：全力疾走前に、もも裏・ふくらはぎを軽く伸ばす</li>
        </ul>
        <div className="point-box">
          <strong>大人の鉄則：</strong>
          「昔できたから」で全力を出すのが、肉離れ・肩肘トラブルの典型パターン。
          最初の1〜2球、最初の1本は<strong>7割の力</strong>から。体が温まってから上げていきましょう。
        </div>

        <h2>部位別・気をつけたいポイント</h2>
        <table>
          <thead>
            <tr>
              <th>部位</th>
              <th>リスク</th>
              <th>ケアの方向</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>肩・肘</td><td>投球での痛め・張り</td><td>入念なアップ、投げすぎ回避、投球後のアイシング・ストレッチ</td></tr>
            <tr><td>腰</td><td>スイング・守備でのぎっくり</td><td>体幹を温める、前後にひねりのストレッチ</td></tr>
            <tr><td>もも裏・ふくらはぎ</td><td>全力疾走での肉離れ</td><td>走る前の入念な伸ばし、こまめな水分補給</td></tr>
            <tr><td>手・指</td><td>打球・送球でのケガ</td><td>正しい捕球、無理な素手処理を避ける</td></tr>
          </tbody>
        </table>

        <h2>試合後の「疲労回復」ルーティン</h2>
        <p>
          翌日の自分を助けるのは、試合直後の過ごし方。特別なことは要りません。
        </p>
        <ol>
          <li><strong>クールダウン</strong>：試合後すぐ、軽く歩く・伸ばすで血流を戻す</li>
          <li><strong>ストレッチ</strong>：使った筋肉（肩・腰・脚）をゆっくり伸ばす</li>
          <li><strong>入浴</strong>：シャワーで済ませず湯船で温めると回復が早い</li>
          <li><strong>水分・栄養</strong>：水分とたんぱく質を補給。ビールの前に一杯の水を</li>
          <li><strong>睡眠</strong>：結局これが最強の回復薬。しっかり寝る</li>
        </ol>

        <AdSlot id="article-mid" />

        <h2>アスリート愛用のコンディショニンググッズを取り入れる</h2>
        <p>
          ストレッチや睡眠といった基本に加えて、
          <strong>体のケアグッズ</strong>を習慣に取り入れる人も増えています。
          なかでも<strong>ファイテン</strong>は、プロ野球選手をはじめ多くのトップアスリートに
          愛用者が多いブランド。RAKUWAネックレスやチタンテープ、ボディケア用品などがあり、
          「試合の日の“気持ちのスイッチ”に」「翌日のケア習慣に」と取り入れる草野球プレイヤーもたくさんいます。
        </p>
        <p className="section-sub">
          ※ 体の不調が続く・痛みが強い場合は、グッズに頼らず整形外科など専門家の受診を優先してください。
          ケアグッズはあくまで日々のコンディショニングの一助としてお考えください。
        </p>

        <AffiliateBox
          heading="💠 ファイテンで体のケア（アスリート愛用）"
          phiten
        />

        <h2>道具のケアも、体のケアの一部</h2>
        <p>
          手になじんだグローブ、滑らないグリップ——
          道具が整っていると、無理な動きが減り、結果としてケガの予防にもつながります。
          体と道具、両方を整えて、長くプレーを楽しみましょう。
        </p>
        <div className="bat-links">
          <a className="cta-inline" href="/guide/glove-care/">
            → グローブのお手入れ・型付け完全ガイド
          </a>
          <a className="cta-inline" href="/guide/bat-care/">
            → 軟式バットのお手入れ・長持ちのコツ
          </a>
        </div>

        <h2>よくある質問</h2>
        <h3>Q. 運動不足のまま久しぶりに試合。何に気をつける？</h3>
        <p>
          とにかく<strong>アップを念入りに、全力は温まってから</strong>。
          特に全力疾走とフルスイングは、冷えた体だと一発でケガします。
          前日の睡眠と当日の水分補給も忘れずに。
        </p>
        <h3>Q. 疲労回復に効く飲み物・食べ物は？</h3>
        <p>
          運動後は水分とともに、たんぱく質・炭水化物をバランスよく。
          汗をかいた日はミネラル補給も大切です。
          ビールが楽しみなのはわかりますが、<strong>その前に水をコップ一杯</strong>——これだけで翌日が違います。
        </p>

        <AffiliateBox
          heading="⚾ アンダーシャツ・ソックスなど消耗品もチェック"
          rakuten={["under", "socks"]}
          retailers
        />

        <a className="cta-inline" href="/guide/how-to-start/">
          → はじめての方は「草野球の始め方 完全ガイド」へ
        </a>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
