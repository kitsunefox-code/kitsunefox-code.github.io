import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import GoodsLinks from "@/components/GoodsLinks";
import RelatedGuides from "@/components/RelatedGuides";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球サポーターの選び方【肘・膝・手首・ふくらはぎ】ケガ予防と部位別のおすすめ",
  description:
    "草野球のケガ予防に役立つサポーターの選び方を部位別に解説。肘（投球・スライディング）、膝、手首、ふくらはぎ・ふともも、足首まで。固定重視か動きやすさ重視か、マクダビッド（McDavid）など定番ブランドの特徴、サイズの合わせ方まで。無理なく長く野球を続けるための備えをまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/supporter/` },
  openGraph: {
    title: "野球サポーターの選び方",
    description: "肘・膝・手首・ふくらはぎ。部位別のケガ予防と、マクダビッド等の定番ブランド。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "野球サポーターの選び方【肘・膝・手首・ふくらはぎ】",
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
        name: "野球で肘のサポーターは必要ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "投球やスライディングで肘に負担・擦り傷のリスクがある人には有効です。投球の負担軽減を狙うなら適度な圧迫・保温タイプ、スライディングの擦過傷対策ならパッド付きが向いています。痛みがある場合は無理をせず医療機関の受診を優先してください。",
        },
      },
      {
        "@type": "Question",
        name: "マクダビッド（McDavid）はどんなブランド？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "マクダビッド（McDavid）はスポーツ用サポーター・プロテクターの海外定番ブランドで、肘・膝・手首など部位別のラインナップが豊富です。固定力の高いモデルから動きやすい軽量モデルまで幅広く、野球以外のスポーツでも広く使われています。",
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

export default function SupporterPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>野球サポーターの選び方【肘・膝・手首・ふくらはぎ】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          「最近ちょっと肘が…」「膝をつくと痛い」——無理なく長く野球を続けるには、
          <strong>サポーターでの備え</strong>が効きます。部位ごとに目的が違うので、
          <strong>どこを・何のために守るか</strong>で選ぶのがコツです。
        </p>
        <div className="point-box">
          <strong>まず大前提：</strong>
          痛みが続く場合は、サポーターで対処せず<strong>医療機関の受診を優先</strong>してください。
          サポーターはあくまで予防・軽度な負担軽減のための備えです。
        </div>

        <AdSlot id="article-top" />

        <h2>部位別・こんな時に</h2>
        <table>
          <thead>
            <tr><th>部位</th><th>目的</th><th>タイプ</th></tr>
          </thead>
          <tbody>
            <tr><td>肘</td><td>投球の負担軽減・スライディングの擦過傷対策</td><td>圧迫/保温、パッド付き</td></tr>
            <tr><td>膝</td><td>キャッチャー・スライディング・着地の保護</td><td>パッド入り、固定タイプ</td></tr>
            <tr><td>手首</td><td>打撃・送球のブレ抑制、捻り対策</td><td>リストサポーター</td></tr>
            <tr><td>ふくらはぎ・もも</td><td>肉離れ予防・疲労軽減（走塁が多い人）</td><td>コンプレッション</td></tr>
            <tr><td>足首</td><td>捻挫予防・ぐらつき対策</td><td>固定・テーピング一体型</td></tr>
          </tbody>
        </table>

        <h2>選び方の軸：固定重視か、動きやすさか</h2>
        <ul>
          <li><strong>固定重視</strong>：関節をしっかり支えたい・不安がある部位に。ややかさばる</li>
          <li><strong>動きやすさ重視</strong>：軽い圧迫で疲労軽減・予防。プレーを妨げにくい</li>
          <li><strong>パッド付き</strong>：スライディングや接触の擦り傷・打撲対策に</li>
          <li><strong>サイズ</strong>：きつすぎは血流を妨げ、ゆるすぎはずれる。実寸を測って選ぶ</li>
        </ul>

        <h2>定番ブランド：マクダビッド（McDavid）など</h2>
        <p>
          サポーターの定番といえば<strong>マクダビッド（McDavid）</strong>。海外ブランドで、
          肘・膝・手首など<strong>部位別のラインナップが豊富</strong>。固定力の高いモデルから軽量モデルまで揃います。
          国内では<strong>ザムスト（ZAMST）</strong>なども人気で、迷ったらこのあたりから選ぶと外しにくいです。
        </p>

        <ProductCards keyword="サポーター マクダビッド 肘 膝" heading="🛡 マクダビッド等のサポーターを見る" />

        <AdSlot id="article-mid" />

        <h2>疲労回復・体のケアもあわせて</h2>
        <p>
          サポーターは「その日を守る」もの。<strong>翌日に疲れ・痛みを残さない</strong>ケアと組み合わせると効果的です。
          試合後のアイシング・ストレッチ・コンディショニングは
          <a href="/guide/body-care/">体のケア完全ガイド</a>にまとめています。
        </p>

        <RelatedGuides currentHref="/guide/supporter/" />

        <div className="bat-links">
          <a className="cta-inline" href="/guide/body-care/">→ 「疲労回復・体のケア」で故障を防ぐ</a>
          <a className="cta-inline" href="/guide/gear-checklist/">→ 「道具・装備チェックリスト」で全体を確認</a>
          <a className="cta-inline" href="/baseball-dock/">→ まわりの装備まで「野球人間ドック」で処方</a>
        </div>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
