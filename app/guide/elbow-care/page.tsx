import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球肘のケアと予防【原因・ストレッチ・サポーター・痛い時の対処】",
  description:
    "草野球でありがちな「野球肘（肘の痛み）」の原因と、予防・ケアの方法を解説。投げすぎ・フォームの負担といった原因、アップとチューブトレでの予防、投球前後のストレッチ、アイシング、サポーターの活用まで。痛みが続く時は自己判断せず受診を。長く投げ続けるための肘の守り方をまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/elbow-care/` },
  openGraph: {
    title: "野球肘のケアと予防",
    description: "原因・予防のチューブトレ・ストレッチ・アイシング・サポーター、痛い時の対処まで。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "野球肘のケアと予防【原因・ストレッチ・サポーター・痛い時の対処】",
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
        name: "野球肘の主な原因は何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "投げすぎ（オーバーユース）による肘への繰り返しの負担が主な原因です。加えて、体が開くフォームや手投げ、ウォームアップ不足なども負担を大きくします。大人の草野球では、久しぶりの登板や連投で痛めるケースも多いです。",
        },
      },
      {
        "@type": "Question",
        name: "肘が痛い時はどうすればいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "まず投球を中止し、安静とアイシングで炎症を抑えます。痛みが続く・強い・繰り返す場合は自己判断せず、整形外科など医療機関を受診してください。無理に投げ続けると悪化や長期離脱につながります。",
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

export default function ElbowCarePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>野球肘のケアと予防【原因・ストレッチ・サポーター・痛い時の対処】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <div className="point-box">
          <strong>はじめに（大切なこと）：</strong>
          この記事は一般的な予防・セルフケアの情報です。
          <strong>痛みが強い・続く・繰り返す場合は、自己判断せず整形外科などの医療機関を受診してください。</strong>
          無理に投げ続けると悪化します。
        </div>

        <p>
          「投げると肘が痛い」「翌日肘が重い」——大人の草野球でありがちな悩みです。
          久しぶりの登板や連投で痛める人も多い野球肘。
          <strong>原因を知り、予防とケアを習慣にする</strong>ことで、長く投げ続けられます。
        </p>

        <AdSlot id="article-top" />

        <h2>野球肘の主な原因</h2>
        <ul>
          <li><strong>投げすぎ（オーバーユース）</strong>：繰り返しの負担が最大の要因。連投・球数過多に注意</li>
          <li><strong>フォームの負担</strong>：体が開く・手投げ・肘が下がる、などで肘に負担が集中</li>
          <li><strong>ウォームアップ不足</strong>：温まっていない状態での全力投球</li>
          <li><strong>ブランク明け</strong>：久しぶりの登板でいきなり飛ばす</li>
        </ul>

        <h2>予防①：肩・肘を「作る」チューブトレ</h2>
        <p>
          肘を守るには、<strong>肩まわりのインナーマッスル</strong>を補強するのが効果的。
          軽いチューブトレを習慣にすると、投球の負担に耐えやすくなります。
        </p>
        <ul>
          <li>軽い負荷で回数を。重すぎる負荷は逆効果</li>
          <li>投球前のウォームアップにも取り入れる</li>
        </ul>

        <AffiliateBox
          heading="💪 チューブ・アイシング・ケア用品を探す"
          rakuten={["glove"]}
          retailers
          phiten
        />

        <AdSlot id="article-mid" />

        <h2>予防②：投球前後のストレッチ</h2>
        <ul>
          <li><strong>投球前</strong>：肩・肘・手首・前腕をよくほぐし、キャッチボールは<strong>軽めから段階的に</strong></li>
          <li><strong>投球後</strong>：前腕・肩のストレッチでクールダウン。使った筋肉を伸ばす</li>
          <li><strong>アイシング</strong>：投げ込んだ日は肘・肩を冷やして炎症を抑える</li>
        </ul>

        <h2>予防③：投げすぎない・フォームを見直す</h2>
        <ul>
          <li><strong>球数・連投を管理</strong>：草野球でも無理は禁物。痛みや張りを感じたら投げない勇気</li>
          <li><strong>フォーム</strong>：体を開かない・肘を下げない・下半身を使う。手投げは肘に来る</li>
          <li><strong>変化球の投げ方</strong>：無理な手首のひねりは負担大。握りで変化を作る（
            <a href="/guide/breaking-balls/">変化球の握り方</a>）</li>
        </ul>

        <h2>サポーターの活用</h2>
        <p>
          投球の負担軽減や保温には、肘のサポーターも選択肢。ただし<strong>痛みを隠して投げるのはNG</strong>。
          あくまで予防・軽度な負担軽減の補助として使いましょう。部位別の選び方は
          <a href="/guide/supporter/">サポーターの選び方</a>で解説しています。
        </p>

        <h2>痛い時の対処</h2>
        <ol>
          <li><strong>投球を中止</strong>：まず投げるのをやめる</li>
          <li><strong>安静・アイシング</strong>：炎症を抑える</li>
          <li><strong>受診</strong>：痛みが続く・強い・繰り返すなら整形外科へ。自己判断で投げ続けない</li>
        </ol>

        <p>
          翌日に疲れ・張りを残さない全身のケアは
          <a href="/guide/body-care/">疲労回復・体のケア完全ガイド</a>もあわせてどうぞ。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/body-care/">→ 「疲労回復・体のケア」を読む</a>
          <a className="cta-inline" href="/guide/supporter/">→ 「サポーターの選び方」を読む</a>
          <a className="cta-inline" href="/guide/breaking-balls/">→ 肘に優しい「変化球の握り方」へ</a>
        </div>

        <RelatedGuides currentHref="/guide/elbow-care/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
