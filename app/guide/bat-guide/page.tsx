import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import ProductCards from "@/components/ProductCards";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "【軟式バットの選び方】長さ・重さ・素材（金属/カーボン/ビヨンド系）の決め方ガイド",
  description:
    "自分の一本を持つと、打席が変わる。軟式バットの選び方を、長さ・重さ（バランス）・素材の3軸で解説。金属・カーボン・ウレタン（ビヨンド系）の違い、飛ぶバットの仕組み、初心者の選び方の目安、規格の注意点まで。草野球プレイヤー向け完全ガイド。",
  alternates: { canonical: `${SITE_URL}/guide/bat-guide/` },
  openGraph: {
    title: "【軟式バットの選び方】長さ・重さ・素材の決め方ガイド",
    description:
      "金属/カーボン/ビヨンド系の違い、長さ・重さ・バランスの選び方、初心者の目安まで解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【軟式バットの選び方】長さ・重さ・素材（金属/カーボン/ビヨンド系）の決め方ガイド",
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
        name: "軟式バットで一番飛ぶ素材はどれですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "一般に、ウレタン素材を先端に使ったいわゆる『ビヨンド系（複合バット）』が最も反発が大きく飛びやすいとされます。次いでカーボン・ジュラルミン等の金属系。ただし規格やチーム・リーグのルールで使用可否が異なる場合があるため、購入前に確認しましょう。",
        },
      },
      {
        "@type": "Question",
        name: "初心者は何グラム・何センチのバットを選べばいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "一般成人男性なら長さ83〜85cm、重さ720〜760g前後が扱いやすい目安です。まずは軽めのトップバランスかミドルバランスから始め、慣れてきたら好みに合わせて調整するとよいでしょう。",
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

export default function BatGuidePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>【軟式バットの選び方】長さ・重さ・素材（金属/カーボン/ビヨンド系）の決め方ガイド</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約8分</p>

        <p>
          チームの共用バットでも打てますが、
          <strong>自分の一本</strong>を持つと打席の景色が変わります。
          スイングが安定し、「この重さ、この長さ」という基準ができるからです。
          とはいえ軟式バットは種類が多く、素材やバランスで打感がまるで違う。
          この記事では、<strong>長さ・重さ・素材の3軸</strong>で、後悔しない選び方を整理します。
        </p>

        <div className="point-box">
          <strong>🏏 先に「自分のタイプ」を知りたい人へ：</strong>
          6つの質問に答えるだけで、あなたに合う素材・長さ・重さをその場で提案する
          <a href="/baseball-dock/">野球人間ドック（バット処方つき）</a>を用意しました。
          読む前にサクッと方向性をつかめます。
        </div>

        <AdSlot id="article-top" />

        <h2>選び方は「長さ × 重さ × 素材」の3軸で決まる</h2>
        <p>
          バット選びが難しく感じるのは、要素が絡み合うから。
          でも、分解すればシンプルです。この3つを順番に決めていきましょう。
        </p>
        <table>
          <thead>
            <tr>
              <th>軸</th>
              <th>選ぶポイント</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>① 長さ</td><td>身長・リーチ。長いほど遠くを打てるが操作は難しい</td></tr>
            <tr><td>② 重さ・バランス</td><td>振り切れる範囲で。重心の位置で打感が変わる</td></tr>
            <tr><td>③ 素材</td><td>金属・カーボン・ウレタン（ビヨンド系）で反発が違う</td></tr>
          </tbody>
        </table>

        <h2>① 長さ：身長に合わせて83〜85cmが目安</h2>
        <p>
          長いバットはヘッドが遠くまで届き、外角にも強くなりますが、
          その分だけ扱いが難しくなります。一般的な目安は次のとおり。
        </p>
        <table>
          <thead>
            <tr>
              <th>身長</th>
              <th>長さの目安</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>〜165cm</td><td>82〜83cm</td></tr>
            <tr><td>165〜175cm</td><td>83〜84cm</td></tr>
            <tr><td>175cm〜</td><td>84〜85cm</td></tr>
          </tbody>
        </table>

        <h2>② 重さとバランス：振り切れることが最優先</h2>
        <p>
          重いバットのほうが打球は飛びそうに思えますが、
          <strong>振り切れなければ意味がありません</strong>。
          スイングスピードが落ちるくらいなら、軽めを選んで鋭く振るほうが結果が出ます。
          重心の位置（バランス）でも打感が変わります。
        </p>
        <table>
          <thead>
            <tr>
              <th>バランス</th>
              <th>重心</th>
              <th>向いているタイプ</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>トップバランス</td><td>先端寄り</td><td>遠くへ飛ばしたいパワーヒッター</td></tr>
            <tr><td>ミドルバランス</td><td>中間</td><td>オールラウンド。迷ったらこれ</td></tr>
            <tr><td>カウンター（ニアー）バランス</td><td>手元寄り</td><td>操作性重視・ミート優先の巧打者</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>初心者の目安：</strong>
          一般成人男性なら<strong>720〜760g前後・ミドル〜トップバランス</strong>から。
          まずは軽めで「振り切る感覚」を覚え、慣れてきたら重さやバランスを調整していくと、
          自分に合う一本が見えてきます。
        </div>

        <ProductCards
          keyword="軟式 バット 一般"
          heading="🏏 楽天で人気の軟式バット"
          fallbackRakuten={["bat"]}
        />

        <AdSlot id="article-mid" />

        <h2>③ 素材：飛びと打感を決める最重要ポイント</h2>
        <p>
          「飛ぶバット」の正体は、ほぼこの素材の違いです。
          軟式バットは大きく3タイプに分かれます。
        </p>
        <table>
          <thead>
            <tr>
              <th>素材</th>
              <th>反発（飛び）</th>
              <th>特徴・価格帯</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>金属（ジュラルミン等）</td>
              <td>標準</td>
              <td>丈夫で扱いやすく、価格も手ごろ。最初の一本に◎</td>
            </tr>
            <tr>
              <td>カーボン・複合</td>
              <td>やや高い</td>
              <td>軽量で反発も良好。中価格帯</td>
            </tr>
            <tr>
              <td>ウレタン（ビヨンド系）</td>
              <td>高い</td>
              <td>先端の柔らかい素材が軟球をつかんで飛ばす。高価格帯</td>
            </tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>⚠️ 規格・ルールの確認を：</strong>
          よく飛ぶ複合バット（ビヨンド系）は人気ですが、
          <strong>所属リーグや大会で使用できる規格が決まっている</strong>ことがあります。
          また軟式球には M号・J号などの区分があり、対応バットも異なります。
          購入前に「自分のチーム・リーグで使えるか」を必ず確認してください。
        </div>

        <h2>初めての一本、どう選ぶ？（まとめ）</h2>
        <ol>
          <li><strong>長さ</strong>：身長から83〜85cmの範囲で選ぶ</li>
          <li><strong>重さ</strong>：振り切れる軽め（720〜760g）から始める</li>
          <li><strong>バランス</strong>：迷ったらミドルバランス</li>
          <li><strong>素材</strong>：最初は金属で十分。飛びを求めるなら複合を検討（要ルール確認）</li>
          <li><strong>予算</strong>：入門なら5,000〜10,000円、複合の人気モデルは20,000〜40,000円</li>
        </ol>

        <h2>よくある質問</h2>
        <h3>Q. ビヨンド系（複合バット）は最初から買ってもいい？</h3>
        <p>
          予算が許せばアリですが、高価（2〜4万円）なうえリーグで規制される場合も。
          まずは<strong>金属バットでスイングを固め</strong>、
          自分の打撃スタイルが分かってから複合に進むのが失敗のない順番です。
        </p>
        <h3>Q. M号とJ号、どっちのバットを買えばいい？</h3>
        <p>
          大人の草野球は基本<strong>M号球</strong>です（J号は主に少年野球）。
          M号対応のバットを選べば問題ありません。念のためチームの使用球を確認しておきましょう。
        </p>

        <a className="cta-inline" href="/guide/soft-batting/">
          → バットを活かす「軟式の打ち方のコツ【動画つき】」も読む
        </a>

        <RelatedGuides currentHref="/guide/bat-guide/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
