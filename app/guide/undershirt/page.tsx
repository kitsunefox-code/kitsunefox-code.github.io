import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import GoodsLinks from "@/components/GoodsLinks";
import RelatedGuides from "@/components/RelatedGuides";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球アンダーシャツの選び方【夏の冷感・冬の保温・ローネック/ハイネック】",
  description:
    "草野球のアンダーシャツの選び方を、夏用（冷感・吸汗速乾）と冬用（保温・裏起毛）、袖丈（半袖/七分/長袖）、ネック形状（ローネック/ハイネック/クルー）、フィット（コンプレッション/ゆったり）で解説。色を揃えてチーム感を出すコツや、季節ごとの使い分け、価格帯の目安まで。快適さとチームの統一感を両立しましょう。",
  alternates: { canonical: `${SITE_URL}/guide/undershirt/` },
  openGraph: {
    title: "野球アンダーシャツの選び方",
    description: "夏の冷感・冬の保温、袖丈・ネック・フィット。色を揃えてチーム感も。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "野球アンダーシャツの選び方【夏の冷感・冬の保温】",
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
        name: "夏の野球アンダーシャツはどう選ぶ？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "吸汗速乾で汗をすばやく逃がす冷感（クール）タイプがおすすめです。ローネックで首元を涼しく、色は日差しを吸いにくい白系も人気。UVカットや接触冷感の生地だと真夏の負担が軽くなります。",
        },
      },
      {
        "@type": "Question",
        name: "アンダーシャツの色に決まりはありますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "リーグや大会によっては色の規定がある場合があります。とくに投手のアンダーシャツ袖の色は制限されることがあるため、公式戦では所属リーグのルールを確認しましょう。チームで色を揃えると統一感が出ておすすめです。",
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

export default function UndershirtPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>野球アンダーシャツの選び方【夏の冷感・冬の保温】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約5分</p>

        <p>
          直接肌に着るアンダーシャツは、<strong>快適さを左右する地味な主役</strong>。
          夏の冷感・冬の保温、袖丈やネック形状、そして<strong>色を揃えるだけで出るチーム感</strong>——
          選び方のポイントをまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>季節で選ぶ（いちばん大事）</h2>
        <table>
          <thead>
            <tr><th>季節</th><th>選ぶ生地</th><th>ねらい</th></tr>
          </thead>
          <tbody>
            <tr><td>夏</td><td>冷感・吸汗速乾・UVカット</td><td>汗を逃がし、涼しく。熱中症対策にも</td></tr>
            <tr><td>春・秋</td><td>標準（吸汗速乾）</td><td>汗冷えを防ぎ、一日快適に</td></tr>
            <tr><td>冬</td><td>保温・裏起毛</td><td>体を冷やさず、動きを保つ</td></tr>
          </tbody>
        </table>

        <h2>袖丈・ネック・フィットで選ぶ</h2>
        <ul>
          <li><strong>袖丈</strong>：半袖（涼しい）／七分（日焼け・すり傷対策）／長袖（保温・保護）</li>
          <li><strong>ネック</strong>：ローネック（首元すっきり・夏）／ハイネック（防寒・首の保護）／クルー（標準）</li>
          <li><strong>フィット</strong>：コンプレッション（体にフィットして疲労軽減）／ゆったり（締め付けが苦手な人）</li>
        </ul>
        <div className="point-box">
          <strong>チーム感を出すコツ：</strong>
          アンダーシャツの<strong>色をチームで揃える</strong>だけで、一気にまとまって見えます。
          ユニフォームに合う色を選ぶと統一感アップ（
          <a href="/uniform/">ユニフォーム比較</a>とあわせて検討を）。
        </div>

        <ProductCards keyword="野球 アンダーシャツ 冷感" heading="🎽 夏用（冷感）アンダーシャツを見る" />

        <AdSlot id="article-mid" />

        <h2>公式戦は色の規定に注意</h2>
        <p>
          リーグ・大会によっては<strong>アンダーシャツの色に規定</strong>がある場合があります。
          とくに<strong>投手の袖の色</strong>は制限されることがあるので、公式戦では所属リーグのルールを確認しましょう。
        </p>

        <h2>価格帯の目安</h2>
        <table>
          <thead>
            <tr><th>価格帯</th><th>目安</th></tr>
          </thead>
          <tbody>
            <tr><td>エントリー</td><td>1,000〜2,000円：消耗品として気軽に。複数枚そろえやすい</td></tr>
            <tr><td>ミドル</td><td>2,500〜4,500円：定番ブランドの機能モデル</td></tr>
            <tr><td>ハイエンド</td><td>5,000円〜：高機能素材・コンプレッション上位</td></tr>
          </tbody>
        </table>

        <ProductCards keyword="野球 アンダーシャツ 保温" heading="🧥 冬用（保温）アンダーシャツを見る" />

        <RelatedGuides currentHref="/guide/undershirt/" />

        <div className="bat-links">
          <a className="cta-inline" href="/uniform/">→ 色を合わせるなら「ユニフォームメーカー比較」へ</a>
          <a className="cta-inline" href="/guide/night-game/">→ 夜の冷え対策は「ナイター完全ガイド」</a>
          <a className="cta-inline" href="/guide/gear-checklist/">→ 「道具・装備チェックリスト」で全体を確認</a>
        </div>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
