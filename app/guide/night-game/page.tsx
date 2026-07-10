import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球ナイター完全ガイド【持ち物・見えにくさ対策・注意点】夜の試合を楽しむコツ",
  description:
    "仕事帰りに楽しめる草野球のナイター。照明でボールが見えにくい・気温差・虫など、昼とは違う注意点と対策を解説。準備しておきたい持ち物、打球や送球が見えづらい時のコツ、寒暖差への服装、安全面まで。夜の試合を気持ちよくプレーするための完全ガイドです。",
  alternates: { canonical: `${SITE_URL}/guide/night-game/` },
  openGraph: {
    title: "草野球ナイター完全ガイド",
    description:
      "見えにくさ対策・持ち物・服装・注意点。仕事帰りの夜の試合を気持ちよく楽しむコツ。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球ナイター完全ガイド【持ち物・見えにくさ対策・注意点】",
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
        name: "ナイターでボールが見えにくい時の対策は？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "照明の切れ目や逆光で打球を見失いやすいので、守備では一歩目を慎重に、打球から目を切らないことが大切です。打者はリリースを早めに見る意識を。まぶしさが強い場所ではサングラス（薄めのレンズ）が有効なこともあります。",
        },
      },
      {
        "@type": "Question",
        name: "ナイターで準備しておくと良い持ち物は？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "気温が下がるので羽織り（ウインドブレーカー）、虫よけ、ライト（手元・忘れ物防止）、ぶつけ対策のケア用品などがあると安心です。夏でも夜は冷えることがあるため、体を冷やさない準備をしておきましょう。",
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

export default function NightGamePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球ナイター完全ガイド【持ち物・見えにくさ対策・注意点】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          仕事帰りにサクッと。照明の下でやるナイターは、草野球ならではの楽しみです。
          でも昼の試合とは<strong>見え方・気温・虫</strong>など勝手が違うのも事実。
          知っておくと快適さと安全がぐっと上がる<strong>ナイターのコツ</strong>をまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>昼と違う「ナイターならでは」の注意点</h2>
        <table>
          <thead>
            <tr>
              <th>違い</th>
              <th>起きること</th>
              <th>対策</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>照明</td><td>照明の切れ目・逆光で打球を見失う</td><td>守備は一歩目を慎重に、打球から目を切らない</td></tr>
            <tr><td>気温</td><td>夜は冷える（夏でも）。体が硬くなる</td><td>羽織り・入念なウォームアップで故障予防</td></tr>
            <tr><td>虫</td><td>照明に虫が集まる</td><td>虫よけスプレー・肌の露出を控える</td></tr>
            <tr><td>路面</td><td>暗くて足元が見えにくい</td><td>スパイクの安全確認・ダッシュは無理しない</td></tr>
          </tbody>
        </table>

        <h2>見えにくさへの対策（打撃・守備）</h2>
        <ul>
          <li><strong>打者</strong>：投手のリリースを<strong>早めに</strong>見る。ボールが照明に入る瞬間を意識して目で追う</li>
          <li><strong>守備（外野）</strong>：フライは照明に消えることがある。<strong>一歩目を慎重に</strong>、消えたら落下点を予測して回り込む</li>
          <li><strong>守備（内野）</strong>：ゴロの見え方が変わる。正面で丁寧に。無理な逆シングルは控えめに</li>
          <li><strong>まぶしさ対策</strong>：光源が視界に入る球場では、薄めレンズのサングラスが有効なことも</li>
        </ul>

        <AffiliateBox
          heading="🌙 ナイターの持ち物（サングラス・ウインドブレーカー等）を探す"
          rakuten={["under", "cap"]}
          retailers
        />

        <AdSlot id="article-mid" />

        <h2>ナイターの持ち物チェックリスト</h2>
        <ul>
          <li><strong>羽織り（ウインドブレーカー等）</strong>：夜の冷え・試合の待ち時間対策</li>
          <li><strong>アンダーシャツ</strong>：汗冷え防止に。夏は冷感、春秋は保温</li>
          <li><strong>虫よけスプレー</strong>：照明に集まる虫対策</li>
          <li><strong>ライト（小型）</strong>：手元・忘れ物チェック・暗い駐車場で便利</li>
          <li><strong>ケア用品</strong>：ぶつけた時の冷却シート等。翌日に残さないために</li>
          <li><strong>飲み物・補給</strong>：夜でも水分・エネルギー補給は忘れずに</li>
        </ul>

        <h2>安全とマナー</h2>
        <ul>
          <li><strong>ウォームアップ入念に</strong>：冷えた体でいきなり全力は故障のもと。肩・脚をよく温める</li>
          <li><strong>声かけを多めに</strong>：見えにくい分、「任せた」「OK」の声で衝突を防ぐ</li>
          <li><strong>時間・騒音に配慮</strong>：住宅街の近くは照明消灯時間・声量に注意。近隣への配慮がチームの信頼に</li>
          <li><strong>帰りの安全</strong>：暗い駐車場・道は明るいルートで。忘れ物確認も</li>
        </ul>

        <h2>よくある質問</h2>
        <h3>Q. ナイターは何を着ればいい？</h3>
        <p>
          プレー中は動くので暑くても、<strong>待ち時間や試合後は一気に冷えます</strong>。
          羽織りを1枚持っておくと安心。アンダーシャツで汗冷えを防ぐのも効果的です。詳しくは
          <a href="/guide/gear-checklist/">道具・装備チェックリスト</a>もどうぞ。
        </p>
        <h3>Q. 夜は体が動きにくい気がする</h3>
        <p>
          気温が下がると筋肉が硬くなります。<strong>いつもより長めのウォームアップ</strong>と、
          試合後のケアで翌日に残さないのがコツ。
          <a href="/guide/body-care/">体のケア</a>も参考に。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/gear-checklist/">→ 「道具・装備チェックリスト」で持ち物を確認</a>
          <a className="cta-inline" href="/guide/manners/">→ 「草野球のマナー・グラウンドの使い方」も読む</a>
          <a className="cta-inline" href="/guide/">→ ガイドをすべて見る</a>
        </div>

        <RelatedGuides currentHref="/guide/night-game/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
