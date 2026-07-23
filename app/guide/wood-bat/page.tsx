import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import ProductCards from "@/components/ProductCards";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "木製バットの選び方と“相棒”ガイド【樹種・重心＆折れにくい使い方／手袋・グリップの相棒選び】",
  description:
    "草野球で木製バットを使いたい人へ。メイプル・アオダモ・バーチなど樹種の違い、重心（トップ/ミドルバランス）の選び方、折れにくい芯で打つ使い方を解説。さらに木製の“相棒”＝バッティンググローブ（木製派に効く輸入系・グリップ最強のアメフトグローブ流用の裏技）とグリップテープの選び方まで、まるごとまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/wood-bat/` },
  openGraph: {
    title: "木製バットの選び方と“相棒”ガイド",
    description:
      "樹種・重心の選び方、折れにくい使い方、そして手袋・グリップの相棒選びまで。木製で打ちたい人へ。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "木製バットの選び方と“相棒”ガイド",
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
        name: "木製バットの樹種は何を選べばいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "反発と硬さのメイプル、しなりと粘りのアオダモ、軽さと硬さのバランスが良いバーチ（カバ）が代表的です。今の主流は硬く反発のあるメイプル。しなりの打感が好きならアオダモ、中間が欲しいならバーチ、と好みで選ぶのが基本です。",
        },
      },
      {
        "@type": "Question",
        name: "木製バットが折れないようにするには？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "芯（スイートスポット）で捉えることが最大の折れ対策です。詰まった内角や先端での打撃、木目に逆らう当て方が折れの原因になります。ラベル面を上（または下）にして木目の強い面で打つ、寒い日は事前に常温に戻す、湿気を避けて保管する、といった扱いも寿命を延ばします。",
        },
      },
      {
        "@type": "Question",
        name: "木製バットにおすすめのバッティンググローブは？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "木製は金属より衝撃が手に伝わりやすく、グリップも細めなので、グリップ力と衝撃吸収に優れたモデルが向きます。フランクリンなどの輸入・天然皮革が根強い人気で、グリップ最優先ならアメフト用レシーバーグローブを流用する裏技もあります（自己責任・公式戦は用具規定の確認を）。",
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

export default function WoodBatPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>木製バットの選び方と“相棒”ガイド</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約8分</p>

        <p>
          芯で捉えたときの、あの「カーン」。木製バットには金属にない気持ちよさがあります。
          草野球でも「たまには木で打ちたい」「練習は木でやりたい」という人は多いはず。
          ここでは<strong>樹種・重心の選び方</strong>と<strong>折れにくい使い方</strong>、
          そして意外と大事な<strong>木製の“相棒”＝手袋・グリップ選び</strong>まで、まとめて解説します。
        </p>

        <AdSlot id="article-top" />

        <h2>樹種で選ぶ：メイプル・アオダモ・バーチ</h2>
        <p>木製バットは、使われる木の種類で打感と性格が変わります。</p>
        <table>
          <thead>
            <tr>
              <th>樹種</th>
              <th>特徴</th>
              <th>こんな人に</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>メイプル（楓）</td><td>硬く反発が高い。今の主流。しなりは少なく“弾く”打感</td><td>反発・強度重視。多くのプロも使用</td></tr>
            <tr><td>アオダモ</td><td>しなりと粘りがあり、当たりが柔らかい。希少で高価な傾向</td><td>しなりの打感が好き・伝統派</td></tr>
            <tr><td>バーチ（カバ）</td><td>メイプルとアオダモの中間。硬さと粘りのバランス型</td><td>どちらか迷う人・オールラウンド</td></tr>
            <tr><td>竹・合竹（練習用）</td><td>丈夫で折れにくく安価。芯を外すと手に響く＝練習向き</td><td>芯で捉える練習・室内打撃</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>迷ったら：</strong>
          反発と入手しやすさで<strong>メイプル</strong>が無難。まず折れにくさ重視で練習に使うなら
          <strong>合竹（練習用木製）</strong>から始めて、芯で捉える感覚を養うのも賢い選択です。
        </div>

        <h2>重心（バランス）で選ぶ</h2>
        <table>
          <thead>
            <tr>
              <th>バランス</th>
              <th>特徴</th>
              <th>向いている人</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>トップバランス</td><td>先端寄りに重心。ヘッドが効いて長打が出やすいが振り遅れやすい</td><td>パワーヒッター・長打狙い</td></tr>
            <tr><td>ミドルバランス</td><td>中間で扱いやすい。オールラウンドで初めての木製にも</td><td>迷ったらこれ・巧打も長打も</td></tr>
            <tr><td>カウンター／ニアバランス</td><td>手元寄りで軽快。バットコントロールしやすい</td><td>ミート重視・振り抜き重視</td></tr>
          </tbody>
        </table>

        <ProductCards
          keyword="野球 木製バット 一般"
          heading="🪵 楽天で木製バットを見る（メイプル・アオダモ等）"
        />

        <AdSlot id="article-mid" />

        <h2>折れにくくする使い方・扱い方</h2>
        <p>
          木製は消耗品ですが、扱い方で寿命が大きく変わります。折れの多くは
          <strong>芯を外した打撃</strong>が原因です。
        </p>
        <ul>
          <li><strong>芯（スイートスポット）で捉える</strong>：詰まった内角・先端での打撃は折れの最大要因</li>
          <li><strong>木目の強い面で打つ</strong>：一般にラベル面を上か下にして、木目に逆らわない向きで</li>
          <li><strong>寒い日は常温に戻す</strong>：冷えた木は硬く割れやすい。使う前にケースから出しておく</li>
          <li><strong>湿気を避けて保管</strong>：立てて、直射日光・高温多湿を避ける</li>
          <li><strong>置き方に注意</strong>：地面に叩きつけない、車内放置しない</li>
        </ul>

        <h2>木製の“相棒”①：バッティンググローブ</h2>
        <p>
          木製バットは金属よりグリップが細く、<strong>手に伝わる衝撃も大きい</strong>。
          だからこそ、手袋（バッティンググローブ）が打感を大きく左右します。
          木製派には、<strong>グリップ力と衝撃吸収に優れたモデル</strong>が好相性です。
        </p>
        <table>
          <thead>
            <tr>
              <th>選択肢</th>
              <th>特徴</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>輸入・天然皮革</strong>（フランクリン等）</td><td>MLB定番。手なじみとグリップで根強い人気。木製の繊細な打感を活かす</td></tr>
            <tr><td>国内・天然皮革（ミズノ・SSK等）</td><td>日本人の手型に合わせやすいフィット。品質バランス良好</td></tr>
            <tr><td><strong>【裏技】アメフト用レシーバーグローブ</strong></td><td>手のひらのグリップが最強クラス。滑りたくない人が流用（自己責任・規定確認）</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>グリップ最優先の裏技：</strong>
          アメフト（レシーバー）用グローブは、ボールを掴むための強力なグリップ素材が手のひらに使われており、
          <strong>木製バットが抜けにくい</strong>と好む人がいます。野球専用設計ではないため、
          練習や草野球のカジュアルな場面にとどめ、公式戦は用具規定を確認してください。
          詳しくは<a href="/batting-gloves/">バッティンググローブ比較</a>で解説しています。
        </div>

        <ProductCards
          keyword="バッティンググローブ フランクリン"
          heading="🧤 木製派に人気：グリップ重視のバッティンググローブ"
        />

        <h2>木製の“相棒”②：グリップテープ</h2>
        <p>
          衝撃が手に来やすい木製こそ、グリップテープの選び方が効きます。
          <strong>厚め×ウェット系</strong>なら握りの安心感と衝撃吸収が両立。
          手袋派なら<strong>ドライ系</strong>がズレにくくおすすめです。
        </p>
        <AffiliateBox
          heading="🎗️ グリップテープ・お手入れ用品を探す"
          rakuten={["bat"]}
          retailers
        />
        <p>
          巻き方のコツは<a href="/guide/grip-tape/">グリップテープの種類と巻き方</a>で詳しく解説しています。
        </p>

        <h2>草野球で木製を使うときの注意</h2>
        <ul>
          <li><strong>軟式球で使えるか</strong>：軟式対応の木製・練習用を選ぶ。硬式用は軟球だと打感・耐久が変わる</li>
          <li><strong>公式戦の規定</strong>：リーグによって使用可否・表示ルールがある。事前に確認を</li>
          <li><strong>飛距離を求めるなら</strong>：試合で飛距離最優先なら複合（ビヨンド系）が上。木製は打感・練習価値で選ぶもの</li>
        </ul>

        <div className="bat-links">
          <a className="cta-inline" href="/batting-gloves/">
            → 相棒の手袋は「バッティンググローブ比較（アメフトG流用の裏技も）」へ
          </a>
          <a className="cta-inline" href="/guide/grip-tape/">
            → 「グリップテープの種類と巻き方」を読む
          </a>
          <a className="cta-inline" href="/bat/">
            → 金属・複合も含めた「軟式バット比較」を見る
          </a>
          <a className="cta-inline" href="/baseball-dock/">
            → 相棒バット・道具をまとめて「野球人間ドック」で診断
          </a>
        </div>

        <RelatedGuides currentHref="/guide/wood-bat/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
