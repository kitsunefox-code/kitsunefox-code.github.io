import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "グローブのお手入れ・型付け完全ガイド｜オイルの塗り方・湯もみ・保管まで（軟式・初心者向け）",
  description:
    "新品のグローブを自分の手になじませる型付けと、長く使うためのお手入れを完全解説。オイルの塗り方・頻度、手もみ/湯もみ型付けのやり方、捕球面の作り方、雨に濡れたときの対処、シーズンオフの保管まで。初心者がやりがちなNGもまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/glove-care/` },
  openGraph: {
    title: "グローブのお手入れ・型付け完全ガイド",
    description:
      "オイルの塗り方・頻度、型付けのやり方、濡れたときの対処、保管まで。初心者のNGも解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "グローブのお手入れ・型付け完全ガイド｜オイルの塗り方・湯もみ・保管まで（軟式・初心者向け）",
    inLanguage: "ja",
    dateModified: "2026-07-06",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  const howto = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "グローブの基本のお手入れ手順",
    step: [
      { "@type": "HowToStep", name: "ブラシや布で土・ホコリを落とす" },
      { "@type": "HowToStep", name: "汚れが気になる時はクリーナーで拭く" },
      { "@type": "HowToStep", name: "グラブオイルを薄く少量塗る" },
      { "@type": "HowToStep", name: "余分なオイルを乾いた布で拭き取る" },
      { "@type": "HowToStep", name: "形を整えてボールを挟み保管する" },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "グローブのオイルはどのくらいの頻度で塗ればいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "月1回程度、または革が乾いてきたと感じたときで十分です。塗りすぎは革が重くなりベタつく原因になるため、薄く少量を心がけましょう。使用後の土やホコリ落としは毎回行うのが理想です。",
        },
      },
      {
        "@type": "Question",
        name: "型付けは自分でできますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "できます。手もみとキャッチボールでじっくり育てる方法が基本です。早く仕上げたい場合は、専用の型付けスプレーやお店の型付けサービス、湯もみ型付けという選択肢もあります。",
        },
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howto) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export default function GloveCarePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>グローブのお手入れ・型付け完全ガイド｜オイルの塗り方・湯もみ・保管まで（軟式・初心者向け）</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約8分</p>

        <p>
          グローブは、手をかけるほど応えてくれる道具です。
          きちんと型を付けて手入れをすれば、10年選手も珍しくありません。
          逆に、買ったまま放っておくと硬いまま・カビだらけ……なんてことも。
          この記事では、<strong>新品を自分の手になじませる「型付け」</strong>と、
          <strong>長く使うための「お手入れ」</strong>を、初心者向けにやさしく解説します。
        </p>

        <AdSlot id="article-top" />

        <h2>まず「型付け」——新品を実戦で使える状態にする</h2>
        <p>
          買ったばかりのグローブは硬く、そのままでは捕球面が閉じにくいもの。
          自分の手の形になじませる作業が<strong>「型付け」</strong>です。方法は主に3つあります。
        </p>
        <table>
          <thead>
            <tr>
              <th>方法</th>
              <th>特徴</th>
              <th>向いている人</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>手もみ＋キャッチボール</td>
              <td>時間はかかるが確実。愛着も湧く</td>
              <td>じっくり育てたい人</td>
            </tr>
            <tr>
              <td>型付けスプレー・オイルで柔らかく</td>
              <td>革をゆるめて早めに仕上げる</td>
              <td>そこそこ早く使いたい人</td>
            </tr>
            <tr>
              <td>お店の型付け・湯もみ型付け</td>
              <td>プロが仕上げる。即戦力に</td>
              <td>すぐ試合で使いたい人</td>
            </tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>自分でやる型付けの基本手順：</strong>
          <br />
          ① 親指と小指の付け根を中心に、全体をよく揉んでほぐす
          <br />
          ② ポケット（ボールが収まる部分）にボールを入れ、手で押して“くぼみ”を作る
          <br />
          ③ グラブを二つ折りにして輪ゴムやベルトで留め、ボールを挟んで一晩おく
          <br />
          ④ あとはキャッチボールで実際に捕りながら、自分の手になじませていく
        </div>

        <AffiliateBox
          heading="🧤 型付け・お手入れ用品を探す（オイル・グラブ）"
          rakuten={["glove"]}
          retailers
        />

        <h2>日々のお手入れ——使ったあとのひと手間が寿命を延ばす</h2>
        <p>
          特別な道具がなくても、基本のケアは簡単。
          <strong>「使ったら土を落とす」</strong>だけでも、革の持ちは大きく変わります。
        </p>
        <ol>
          <li><strong>土・ホコリを落とす</strong>：使用後、ブラシや乾いた布でサッと。これが一番大事</li>
          <li><strong>汚れが気になれば拭く</strong>：レザークリーナーを布に取り、優しく拭き取る</li>
          <li><strong>オイルを薄く塗る</strong>：乾いてきたら、少量を布に取り全体へ薄く</li>
          <li><strong>拭き取る</strong>：余分なオイルは乾いた布で。塗りっぱなしはベタつきの元</li>
          <li><strong>形を整えて保管</strong>：ボールを挟み、風通しのよい日陰へ</li>
        </ol>

        <AdSlot id="article-mid" />

        <h2>オイルは「薄く・少なく・たまに」が鉄則</h2>
        <p>
          初心者がやりがちな失敗が、<strong>オイルの塗りすぎ</strong>。
          よかれと思ってたっぷり塗ると、革が重くなり、ベタついてホコリを呼び、
          かえって寿命を縮めます。
        </p>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>目安</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>頻度</td><td>月1回程度、または革が乾いたと感じたとき</td></tr>
            <tr><td>量</td><td>布にごく少量。全体に薄く伸ばす</td></tr>
            <tr><td>種類</td><td>グラブ専用のオイル or ローション（革用）</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>⚠️ やりがちなNG：</strong>
          <br />
          ・オイルを塗りすぎて革がブヨブヨ・重くなる
          <br />
          ・直射日光やドライヤーで乾かす → 革が硬化・ひび割れ
          <br />
          ・濡れたまま放置 → シミ・カビ・型崩れ
          <br />
          ・車内やロッカーに入れっぱなし → 高温多湿でカビの温床
        </div>

        <h2>雨で濡れた・汗をかいた日の対処</h2>
        <p>
          革は水に弱い……と思われがちですが、正しく対処すれば大丈夫。
          やってはいけないのは「急いで乾かすこと」です。
        </p>
        <ul>
          <li><strong>すぐに</strong>：乾いたタオルで水分をしっかり拭き取る</li>
          <li><strong>乾かす</strong>：風通しのよい日陰で自然乾燥（直射日光・ドライヤーはNG）</li>
          <li><strong>乾いたら</strong>：革が乾燥しているので、オイルを薄く塗って保湿</li>
          <li><strong>絶対NG</strong>：濡れたまま袋に入れて放置。カビと型崩れの最悪コース</li>
        </ul>

        <h2>シーズンオフの保管</h2>
        <p>
          長く使わない時期こそ、しまい方で差が出ます。
        </p>
        <ol>
          <li>土・汚れを落とし、オイルを薄く塗って保湿しておく</li>
          <li>ポケットにボールを挟み、型崩れを防ぐ</li>
          <li>通気性のある場所へ（ビニール袋の密閉はカビの原因）</li>
          <li>時々取り出して風を通すと、なお安心</li>
        </ol>

        <AffiliateBox
          heading="⚾ グローブ・お手入れ用品をまとめてチェック"
          rakuten={["glove", "spike"]}
          retailers
        />

        <h2>よくある質問</h2>
        <h3>Q. 型付けに失敗したらどうすればいい？</h3>
        <p>
          多少うまくいかなくても、使い込むうちに自分の手になじんでいきます。
          どうしても気になるなら、<strong>お店の型付け直しサービス</strong>に出す手も。
          焦らず、キャッチボールで育てるのが結局いちばんの近道です。
        </p>
        <h3>Q. 安いグローブでも手入れの効果はある？</h3>
        <p>
          あります。価格に関わらず、土を落とし・乾燥を防ぐだけで持ちは変わります。
          むしろ手をかけるほど愛着が湧いて、道具を大事にする習慣にもつながります。
        </p>

        <a className="cta-inline" href="/guide/glove-guide/">
          → まだ買っていない人は「初めてのグローブの選び方」から
        </a>

        <RelatedGuides currentHref="/guide/glove-care/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
