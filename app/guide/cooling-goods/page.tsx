import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "夏の草野球を乗り切る冷却グッズまとめ【ネッククーラー・冷却タオル・保冷剤】",
  description:
    "真夏の野球で使える冷却グッズを用途別にまとめました。首を冷やすネッククーラー、濡らして使う冷却タオル、ベンチに置く保冷剤・クーラーボックス、手のひら冷却、ハンディファン、日陰を作るテントまで。プレクーリングと組み合わせて、暑い日の草野球を安全・快適に乗り切るための買い物ガイドです。",
  alternates: { canonical: `${SITE_URL}/guide/cooling-goods/` },
  openGraph: {
    title: "夏の草野球を乗り切る冷却グッズまとめ",
    description:
      "ネッククーラー・冷却タオル・保冷剤・手のひら冷却・テント。用途別の暑さ対策グッズ。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "夏の草野球を乗り切る冷却グッズまとめ【ネッククーラー・冷却タオル・保冷剤】",
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
        name: "野球のベンチで手軽にできる暑さ対策は？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "冷たいペットボトルや保冷剤で首・脇・手のひらを冷やすのが手軽で効果的です。冷却タオルを濡らして首にかける、ハンディファンで風を送る、クーラーボックスに氷と飲料をキープしておく、なども有効です。日陰を作るテントがあるとさらに快適になります。",
        },
      },
      {
        "@type": "Question",
        name: "ネッククーラーと冷却タオルはどちらがいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ネッククーラー（保冷剤や結露を利用するタイプ）は装着したまま長く冷やせるのが利点、冷却タオルは濡らして振るだけで手軽・繰り返し使えるのが利点です。両方をベンチと守備位置で使い分けると、暑い日の負担を大きく減らせます。",
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

export default function CoolingGoodsPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>夏の草野球を乗り切る冷却グッズまとめ【ネッククーラー・冷却タオル・保冷剤】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          真夏の草野球、気合いだけでは乗り切れません。
          <strong>冷却グッズ</strong>を上手に使えば、暑い日でも体の負担を大きく減らせます。
          用途別におすすめを整理したので、自分の球場・ポジションに合うものを揃えましょう。
          （<a href="/guide/heat/">熱中症対策とプレクーリング</a>と合わせて読むと効果的です）
        </p>

        <AdSlot id="article-top" />

        <h2>用途別・冷却グッズ早見表</h2>
        <table>
          <thead>
            <tr><th>グッズ</th><th>特徴</th><th>こんな場面に</th></tr>
          </thead>
          <tbody>
            <tr><td>ネッククーラー</td><td>首を冷やし続けられる。保冷剤・結露式など</td><td>守備中も装着したい</td></tr>
            <tr><td>冷却タオル</td><td>濡らして振ると冷える。繰り返し使える</td><td>手軽・ベンチで首にかける</td></tr>
            <tr><td>保冷剤・アイスパック</td><td>首・脇・手のひらをピンポイントで冷却</td><td>プレクーリングに</td></tr>
            <tr><td>クーラーボックス</td><td>氷・冷たい飲料をキープ</td><td>チームで1つ。給水の要</td></tr>
            <tr><td>ハンディファン</td><td>風で体感温度を下げる</td><td>ベンチ・待ち時間</td></tr>
            <tr><td>ワンタッチテント</td><td>ベンチに日陰を作る</td><td>日陰のない球場</td></tr>
          </tbody>
        </table>

        <h2>まず揃えたい「手のひら冷却」</h2>
        <p>
          手のひらは<strong>熱を効率よく逃がせる部位</strong>。冷たいペットボトルや保冷剤を握るだけで、
          体感がすっと楽になります。安くて効果的なので、まずここから。
          イニングの合間の<strong>プレクーリング</strong>にも最適です。
        </p>

        <ProductCards keyword="ネッククーラー 冷感 保冷剤" heading="❄️ ネッククーラー・保冷グッズを見る" />

        <AdSlot id="article-mid" />

        <h2>ベンチを涼しく：日陰と風</h2>
        <ul>
          <li><strong>ワンタッチテント・タープ</strong>：日陰のない球場では効果絶大。チームで1つあると全員が助かる</li>
          <li><strong>ハンディファン・ネックファン</strong>：待ち時間の体感温度を下げる</li>
          <li><strong>クーラーボックス＋氷</strong>：冷たい飲料・アイススラリー・保冷剤をキープ</li>
        </ul>

        <ProductCards keyword="冷却タオル 接触冷感 スポーツ" heading="🧊 冷却タオル・ひんやりグッズを見る" />

        <h2>身につける冷感アイテム</h2>
        <ul>
          <li><strong>冷感アンダーシャツ</strong>：汗を逃がして涼しく（<a href="/guide/summer-undershirt/">夏用冷感アンダーシャツ比較</a>）</li>
          <li><strong>冷感インナー・アームカバー</strong>：日焼け対策と冷感を両立</li>
          <li><strong>帽子・サングラス</strong>：直射日光を防ぐ（<a href="/guide/sunglasses/">サングラスの選び方</a>）</li>
        </ul>

        <div className="point-box">
          <strong>グッズは「予防」。無理は禁物。</strong>
          冷却グッズはあくまで暑さ対策の補助です。体調がおかしいと感じたら、
          グッズに頼らず<strong>すぐ休む・冷やす・受診</strong>を。安全第一で夏を楽しみましょう。
        </div>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/heat/">→ 「熱中症対策とプレクーリング完全ガイド」を読む</a>
          <a className="cta-inline" href="/guide/summer-undershirt/">→ 「夏用冷感アンダーシャツ比較」を見る</a>
          <a className="cta-inline" href="/guide/night-game/">→ 涼しい時間帯の「ナイター完全ガイド」も</a>
        </div>

        <RelatedGuides currentHref="/guide/cooling-goods/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
