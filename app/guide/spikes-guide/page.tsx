import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "【野球スパイクの選び方】ポイント/金具・ローカット・サイズの決め方ガイド（草野球向け）",
  description:
    "グローブの次にそろえたいのがスパイク。ポイント（樹脂）と金具の違い、ローカット/ミドルカットの選び方、サイズ合わせ、草野球グラウンドでの注意点（金具禁止の球場）まで。初心者が失敗しない野球スパイクの選び方を解説します。",
  alternates: { canonical: `${SITE_URL}/guide/spikes-guide/` },
  openGraph: {
    title: "【野球スパイクの選び方】ポイント/金具・ローカット・サイズの決め方",
    description:
      "樹脂ポイントと金具の違い、カットの高さ、サイズ、球場ルールの注意点まで草野球向けに解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【野球スパイクの選び方】ポイント/金具・ローカット・サイズの決め方ガイド（草野球向け）",
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
        name: "草野球のスパイクはポイント（樹脂）と金具どちらがいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "草野球では樹脂ポイント（スタッド）が主流です。多くの公共グラウンドが金具スパイクを禁止しているため、まずはポイントを選べば失敗しません。金具はグリップ力に優れますが、使用可否を必ず球場・リーグに確認しましょう。",
        },
      },
      {
        "@type": "Question",
        name: "野球スパイクのサイズはどう選べばいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "普段の靴と同じか、厚めのソックスを履くことを考えて+0.5cm程度が目安です。つま先に5mmほど余裕があり、かかとが浮かないサイズが理想。可能なら試着してフィット感を確認しましょう。",
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

export default function SpikesGuidePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>【野球スパイクの選び方】ポイント/金具・ローカット・サイズの決め方ガイド（草野球向け）</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          グローブの次にそろえたいのがスパイク。
          走る・止まる・踏ん張るを支える足元は、
          プレーの安定にも、ケガの予防にも直結します。
          でも「ポイント？金具？」「ハイカット？ローカット？」と、選択肢の名前でつまずきがち。
          草野球向けに、迷わない選び方をまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>結論：草野球は「樹脂ポイント」が基本</h2>
        <p>
          最初に結論から。草野球で選ぶなら、まず
          <strong>樹脂ポイント（スタッド）タイプ</strong>です。理由はシンプルで、
          <strong>多くの公共グラウンドが金具スパイクを禁止している</strong>から。
        </p>
        <table>
          <thead>
            <tr>
              <th>種類</th>
              <th>グリップ</th>
              <th>草野球での適性</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>樹脂ポイント（スタッド）</td>
              <td>十分</td>
              <td>◎ 多くの球場でOK。初心者はまずこれ</td>
            </tr>
            <tr>
              <td>金具（メタル）</td>
              <td>強い</td>
              <td>△ 禁止の球場が多い。要確認</td>
            </tr>
            <tr>
              <td>トレーニングシューズ（アップシューズ）</td>
              <td>弱め</td>
              <td>○ 練習・アップ用。試合はスパイク推奨</td>
            </tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>金具を選ぶ前に確認を：</strong>
          金具スパイクはグリップ力に優れ、本格志向の人に好まれますが、
          <strong>使えるグラウンドが限られます</strong>。
          所属リーグや使用球場のルールを必ず確認してから。
          迷ったら樹脂ポイントを選んでおけば、まず困りません。
        </div>

        <h2>カットの高さ：足首をどれだけ守るか</h2>
        <p>
          スパイクは足首まわりの高さ（カット）でも選べます。
          安定性と動きやすさのバランスで決めましょう。
        </p>
        <table>
          <thead>
            <tr>
              <th>カット</th>
              <th>特徴</th>
              <th>向いている人</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>ローカット</td><td>軽快で動きやすい</td><td>俊敏に動きたい・軽さ重視</td></tr>
            <tr><td>ミドルカット</td><td>バランス型</td><td>迷ったらこれ。安定と軽さの中間</td></tr>
            <tr><td>ハイカット</td><td>足首をしっかり保護</td><td>捻挫が不安・安定感を最優先</td></tr>
          </tbody>
        </table>

        <AffiliateBox heading="👟 野球スパイクを探す" rakuten={["spike"]} retailers />

        <h2>サイズ合わせ：つま先5mmの余裕がちょうどいい</h2>
        <p>
          スパイクは足に合っていないと、マメ・靴ずれ・パフォーマンス低下の原因に。
          サイズ選びのポイントは次のとおりです。
        </p>
        <ul>
          <li><strong>普段の靴＋0〜0.5cm</strong>：厚めのソックスを履くことを考慮</li>
          <li><strong>つま先に5mmほどの余裕</strong>：指が詰まらず、かつ大きすぎない</li>
          <li><strong>かかとが浮かない</strong>：走ったときにパカパカしないこと</li>
          <li><strong>できれば試着</strong>：メーカーで木型（幅）が違うため、幅広の人は要確認</li>
        </ul>

        <AdSlot id="article-mid" />

        <h2>素材：天然皮革か、人工皮革か</h2>
        <table>
          <thead>
            <tr>
              <th>素材</th>
              <th>特徴</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>人工皮革（合皮）</td>
              <td>軽くて手入れがラク、価格も手ごろ。初心者におすすめ</td>
            </tr>
            <tr>
              <td>天然皮革（本革）</td>
              <td>足になじみ、フィット感が高い。手入れは必要、価格は高め</td>
            </tr>
          </tbody>
        </table>
        <p>
          最初の一足なら、<strong>軽くて扱いやすい人工皮革</strong>で十分。
          価格帯は4,000〜8,000円ほどが中心で、ここから選べば失敗しません。
        </p>

        <h2>よくある質問</h2>
        <h3>Q. 最初はアップシューズ（トレシュー）でも大丈夫？</h3>
        <p>
          練習やアップならOKですが、試合では踏ん張りが利くスパイクが安心です。
          特に土のグラウンドでは、ポイントの有無で走塁・守備の安定感が変わります。
        </p>
        <h3>Q. 金具スパイクはどんな人が使う？</h3>
        <p>
          グリップ力を最大化したい本格志向のプレイヤー向けです。
          ただし<strong>使用できる球場が限られる</strong>ため、
          草野球では樹脂ポイントを1足持っておくのが基本。金具は必要になってからで十分です。
        </p>

        <AffiliateBox
          heading="⚾ 足元まわりをまとめてそろえる"
          rakuten={["spike", "socks", "under"]}
          retailers
        />

        <a className="cta-inline" href="/guide/gear-checklist/">
          → 「道具・装備 一式チェックリスト」で必要なものを総確認
        </a>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
