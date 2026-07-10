import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import GoodsLinks from "@/components/GoodsLinks";
import RelatedGuides from "@/components/RelatedGuides";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球サングラスの選び方【偏光・調光・度付き・フィット】草野球で使えるおすすめの基準",
  description:
    "草野球で使う野球用サングラスの選び方を解説。まぶしさ・フライの見やすさに効く偏光レンズ、明るさで濃さが変わる調光レンズ、ずれにくいフィット、度付き対応まで。守備でフライを見失わない・ナイターや曇天での使い分け・価格帯の目安と、失敗しない選び方の基準をまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/sunglasses/` },
  openGraph: {
    title: "野球サングラスの選び方",
    description: "偏光・調光・フィット・度付き。フライを見失わない、草野球で使える基準。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "野球サングラスの選び方【偏光・調光・度付き・フィット】",
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
        name: "野球のサングラスは偏光レンズがいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "地面や芝の照り返し・水面のギラつきを抑える偏光レンズは、まぶしさ軽減とボールの見やすさに効果的です。屋外の守備で有利になりやすいので、迷ったら偏光対応を選ぶのがおすすめです。",
        },
      },
      {
        "@type": "Question",
        name: "曇りやナイターでもサングラスは使える？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "明るさに応じてレンズの濃さが変わる調光レンズなら、曇天や薄暗い時間帯でも使いやすく便利です。濃い固定レンズは暗い場面では見えづらくなるため、1本で幅広く使いたいなら調光が向いています。",
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

export default function SunglassesPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>野球サングラスの選び方【偏光・調光・度付き・フィット】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約5分</p>

        <p>
          晴れた日の高いフライ、太陽に消える打球——サングラスひとつで<strong>見え方と守備の安心感</strong>が変わります。
          でもレンズの種類やフィットで迷いがち。草野球で失敗しない<strong>選び方の基準</strong>をまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>選ぶときの4つの基準</h2>
        <table>
          <thead>
            <tr><th>基準</th><th>見るポイント</th></tr>
          </thead>
          <tbody>
            <tr><td>レンズ機能</td><td>偏光（照り返しカット）・調光（明るさで濃さが変化）</td></tr>
            <tr><td>フィット</td><td>走っても・打っても<strong>ずれない</strong>こと。ラバー・軽さ</td></tr>
            <tr><td>視界の広さ</td><td>フレームが視界を邪魔しない。上方向（フライ）が見やすいか</td></tr>
            <tr><td>度付き対応</td><td>視力が必要な人はインナーフレームや度付きレンズ対応を</td></tr>
          </tbody>
        </table>

        <h2>レンズの種類で選ぶ</h2>
        <ul>
          <li><strong>偏光レンズ</strong>：地面・芝の照り返しを抑え、まぶしさを軽減。屋外守備で有利。迷ったらこれ</li>
          <li><strong>調光レンズ</strong>：明るさで濃さが変わる。曇天・ナイターでも使いやすく、1本で幅広く対応</li>
          <li><strong>ミラー／カラー</strong>：濃さ・色でコントラストが変わる。晴天特化なら濃いめ、薄暗い時は明るめ</li>
        </ul>
        <div className="point-box">
          <strong>迷ったら：</strong>
          屋外・晴れの守備がメインなら<strong>偏光</strong>、時間帯がバラバラ（曇り・ナイターもある）なら<strong>調光</strong>が使い分け不要で便利です。
        </div>

        <ProductCards keyword="野球 サングラス 偏光" heading="🕶 楽天で人気の野球サングラス（偏光）" />

        <AdSlot id="article-mid" />

        <h2>フィット（ずれない）が最重要</h2>
        <p>
          どんな高機能でも、<strong>プレー中にずれたら意味がありません</strong>。
          鼻・こめかみのラバー、軽さ、ホールド感を必ずチェック。可能なら試着を。
        </p>
        <ul>
          <li>ダッシュ・全力スイングでずれないか</li>
          <li>帽子との干渉がないか（つばに当たらない）</li>
          <li>長時間でも痛くならない軽さ</li>
        </ul>

        <h2>価格帯の目安</h2>
        <table>
          <thead>
            <tr><th>価格帯</th><th>目安</th></tr>
          </thead>
          <tbody>
            <tr><td>エントリー</td><td>2,000〜4,000円：まず試すなら。偏光の入門モデルも</td></tr>
            <tr><td>ミドル</td><td>5,000〜12,000円：フィット・レンズ性能のバランス</td></tr>
            <tr><td>ハイエンド</td><td>15,000円〜：有名ブランドの高機能・調光・度付き対応</td></tr>
          </tbody>
        </table>

        <ProductCards keyword="野球 サングラス 調光" heading="🕶 曇天・ナイターにも：調光サングラス" />

        <RelatedGuides currentHref="/guide/sunglasses/" />

        <div className="bat-links">
          <a className="cta-inline" href="/guide/night-game/">→ ナイターでの使い方は「ナイター完全ガイド」へ</a>
          <a className="cta-inline" href="/guide/gear-checklist/">→ 「道具・装備チェックリスト」で全体を確認</a>
          <a className="cta-inline" href="/baseball-dock/">→ まわりの装備まで「野球人間ドック」で処方</a>
        </div>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
