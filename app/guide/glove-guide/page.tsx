import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import ProductCards from "@/components/ProductCards";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "【初めてのグローブの選び方】軟式・ポジション別・サイズの決め方まで完全ガイド",
  description:
    "草野球デビューの最初の一つ、グローブ選び。軟式用と硬式用の違い、ポジション別の型、サイズ（インチ）の合わせ方、価格帯の目安、型付けのコツまで。初心者が失敗しないグローブの選び方を、やさしく順番に解説します。",
  alternates: { canonical: `${SITE_URL}/guide/glove-guide/` },
  openGraph: {
    title: "【初めてのグローブの選び方】軟式・ポジション別・サイズの決め方",
    description:
      "軟式/硬式の違い・ポジション別の型・サイズ・価格帯・型付けまで。初心者向けに完全ガイド。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【初めてのグローブの選び方】軟式・ポジション別・サイズの決め方まで完全ガイド",
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
        name: "草野球のグローブは軟式用と硬式用どちらを選べばいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "草野球（軟式ボール）なら軟式用グローブを選びます。軟式用は軽くて柔らかく、軟式球を捕りやすい作りです。硬式用は重く硬いため、軟式では扱いにくくおすすめしません。",
        },
      },
      {
        "@type": "Question",
        name: "初めてのグローブの予算はどれくらいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "初心者の最初の一つなら、6,000〜12,000円のモデルで十分です。長く使いたい・本格的に始めたいなら15,000〜25,000円のクラスも選択肢になります。",
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

export default function GloveGuidePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>【初めてのグローブの選び方】軟式・ポジション別・サイズの決め方まで完全ガイド</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <p>
          草野球を始めるとき、最初に「自分のもの」としてそろえるのがグローブです。
          スパイクは後回しでも、グローブだけは自分の手に合った一つが欲しい。
          とはいえ、店頭やネットに並ぶ数の多さに圧倒されますよね。
          軟式・硬式、内野・外野、インチ表記……この記事で、ぜんぶ順番にほどいていきます。
        </p>

        <AdSlot id="article-top" />

        <h2>まず大前提：草野球は「軟式用」を選ぶ</h2>
        <p>
          いちばん最初に間違えたくないのがここ。
          草野球で使うのは軟式ボールなので、<strong>グローブも軟式用</strong>を選びます。
        </p>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>軟式用</th>
              <th>硬式用</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>重さ・硬さ</td>
              <td>軽くて柔らかい</td>
              <td>重くて硬い</td>
            </tr>
            <tr>
              <td>捕りやすさ（軟球）</td>
              <td>◎ すぐなじむ</td>
              <td>△ 硬くて弾きやすい</td>
            </tr>
            <tr>
              <td>草野球での適性</td>
              <td>◎ これ一択</td>
              <td>× おすすめしない</td>
            </tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>迷ったら「軟式用・オールラウンド」：</strong>
          ポジションが決まっていない初心者なら、内野も外野もこなせる
          <strong>オールラウンド用（オールポジション用）</strong>の軟式グローブが安心。
          まずは1つ持っておいて、ポジションが固まってから買い足すのが賢い順番です。
        </div>

        <h2>ポジション別・グローブの型の違い</h2>
        <p>
          グローブはポジションごとに形（型）が違います。役割に合わせて最適化されているためです。
          代表的な違いを押さえておきましょう。
        </p>
        <table>
          <thead>
            <tr>
              <th>ポジション</th>
              <th>特徴</th>
              <th>ポケットの深さ</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>投手用</td><td>ボールの握りが見えにくい閉じたウェブ</td><td>普通</td></tr>
            <tr><td>内野手用</td><td>小ぶりで浅め。持ち替えが速い</td><td>浅い</td></tr>
            <tr><td>外野手用</td><td>大きく深い。フライを掴みやすい</td><td>深い</td></tr>
            <tr><td>捕手用（ミット）</td><td>丸く厚い専用ミット</td><td>専用</td></tr>
            <tr><td>一塁手用（ミット）</td><td>縦に長い専用ミット</td><td>専用</td></tr>
            <tr><td>オールラウンド用</td><td>内野〜外野を無難にカバー</td><td>中間</td></tr>
          </tbody>
        </table>

        <ProductCards
          keyword="軟式 グローブ 一般"
          heading="🧤 楽天で人気の軟式グローブ"
          fallbackRakuten={["glove"]}
        />

        <h2>サイズ（インチ）の合わせ方</h2>
        <p>
          グローブの大きさは「インチ」で表されます。手の大きさとポジションで選びますが、
          <strong>大きすぎると扱いづらい</strong>ので注意。目安は次のとおりです。
        </p>
        <table>
          <thead>
            <tr>
              <th>用途</th>
              <th>サイズ目安</th>
              <th>ひとこと</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>内野手</td><td>小さめ〜中</td><td>操作性重視。持ち替えの速さが命</td></tr>
            <tr><td>外野手</td><td>大きめ</td><td>リーチと捕球面積を優先</td></tr>
            <tr><td>オールラウンド</td><td>中サイズ</td><td>迷ったらこのあたり</td></tr>
          </tbody>
        </table>
        <p>
          可能なら<strong>実際にはめてみる</strong>のがベスト。
          手を入れて軽く握ったとき、指先までしっかり力が伝わるサイズが自分に合っています。
          ネットで買う場合は、メーカーのサイズ表記（ジュニア/一般、Sサイズ等）を確認しましょう。
        </p>

        <AdSlot id="article-mid" />

        <h2>価格帯の目安：最初はいくらのを買う？</h2>
        <table>
          <thead>
            <tr>
              <th>価格帯</th>
              <th>こんな人に</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>6,000〜12,000円</strong></td>
              <td>まず始めてみたい初心者。最初の一つに十分な品質</td>
            </tr>
            <tr>
              <td><strong>13,000〜20,000円</strong></td>
              <td>長く使いたい・そこそこ本格的にやりたい人</td>
            </tr>
            <tr>
              <td><strong>20,000円〜</strong></td>
              <td>ブランド・革質にこだわる中〜上級者</td>
            </tr>
          </tbody>
        </table>
        <p>
          最初の一つなら、無理に高いものを選ぶ必要はありません。
          1万円前後のモデルでも、手入れをすれば数年しっかり使えます。
        </p>

        <h2>買ったあとの「型付け」を忘れずに</h2>
        <p>
          新品のグローブは硬くて閉じにくいので、
          自分の手になじませる<strong>「型付け」</strong>が必要です。方法は主に3つ。
        </p>
        <ul>
          <li><strong>手でひたすら揉む＋キャッチボール</strong>：時間はかかるが確実で愛着もわく</li>
          <li><strong>専用オイル・グラブローションを塗る</strong>：革を柔らかくし、乾燥・ひび割れも防ぐ</li>
          <li><strong>店舗の型付けサービスを使う</strong>：買った店で頼めば、最初から使いやすい状態に</li>
        </ul>
        <div className="point-box">
          <strong>お手入れの基本：</strong>
          使ったあとは土やホコリを落とし、時々グラブオイルを薄く塗る。
          これだけでグローブの寿命はぐっと伸びます。オイルの塗りすぎは重くなるので少量で。
        </div>

        <AffiliateBox
          heading="⚾ お手入れ用品・関連アイテムもまとめて"
          rakuten={["glove", "spike"]}
          retailers
        />

        <h2>よくある質問</h2>
        <h3>Q. 左利きですが、グローブは選べますか？</h3>
        <p>
          選べます。右手にはめて左手で投げる「左投げ用（ライト用）」があります。
          店頭在庫は右投げ用より少なめなので、ネットで探すと種類が豊富です。
        </p>
        <h3>Q. とりあえずチームの共用グローブでも始められますか？</h3>
        <p>
          もちろん可能です。ただ、グローブは手になじむほど捕りやすくなる道具。
          続けそうなら、早めに<strong>自分の一つ</strong>を持つとプレーが安定します。
        </p>

        <a className="cta-inline" href="/guide/gear-checklist/">
          → 他に何が必要？「道具・装備 一式チェックリスト」で確認
        </a>

        <RelatedGuides currentHref="/guide/glove-guide/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
