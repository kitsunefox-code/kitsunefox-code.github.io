import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import ProductCards from "@/components/ProductCards";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "バットのグリップテープの種類と巻き方【厚さ・素材の選び方＆巻き替えのコツ】",
  description:
    "バットのグリップテープの種類（厚さ・素材）の違いと、失敗しない巻き方をイラスト感覚で解説。ウェット/ドライ、厚め/薄めの選び方、下（エンド）から上へ均等に巻くコツ、重ねしろ、替えどきの見極めまで。木製・金属どちらのバットにも効く、打感とケガ予防に直結する基本ガイド。",
  alternates: { canonical: `${SITE_URL}/guide/grip-tape/` },
  openGraph: {
    title: "バットのグリップテープの種類と巻き方",
    description:
      "厚さ・素材の違いと、下から上へ均等に巻くコツ・替えどきまで。打感とケガ予防に直結する基本ガイド。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "バットのグリップテープの種類と巻き方",
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
        name: "グリップテープの厚さはどう選べばいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "厚め（クッション性）は手のひらへの衝撃を和らげ、しっかり握りたい人やパワーヒッター向き。薄めはバットの操作性・打球感がダイレクトに伝わり、細かくバットコントロールしたい人向きです。迷ったら中間の標準厚から試すのがおすすめです。",
        },
      },
      {
        "@type": "Question",
        name: "グリップテープはどちらの端から巻きますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "グリップエンド（下）から上に向かって巻くのが基本です。下から巻くとテープの重なりが手の動きと逆向きになり、スイング中にめくれにくくなります。少しずつ（テープ幅の3分の1程度）重ねながら、均等な間隔で巻き上げましょう。",
        },
      },
      {
        "@type": "Question",
        name: "グリップテープの替えどきはいつですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "滑りやすくなった、ほつれ・破れが出た、粘着が弱ってめくれる、汗や汚れで硬くなった、と感じたら替えどきです。滑るグリップは打撃精度の低下とバットのすっぽ抜け（ケガ・事故）に直結するため、消耗したら早めの巻き替えが安全です。",
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

export default function GripTapePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>バットのグリップテープの種類と巻き方</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <p>
          地味だけど、打撃の土台。それがグリップテープです。
          <strong>滑るグリップは、打撃精度の低下とバットのすっぽ抜け（＝ケガ・事故）</strong>に直結します。
          逆に、自分に合ったテープを正しく巻けるだけで、握りの安心感と打感が見違えます。
          種類の違いと、失敗しない巻き方をまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>グリップテープの2つの軸：厚さ×素材</h2>
        <p>選ぶときに見るのは、大きく「厚さ」と「素材（表面の質感）」の2点だけです。</p>

        <h3>① 厚さ（クッション性）</h3>
        <table>
          <thead>
            <tr>
              <th>厚さ</th>
              <th>特徴</th>
              <th>向いている人</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>厚め</td><td>手のひらへの衝撃を吸収。握りが太くなり、しっかり握れる</td><td>手のしびれが気になる人・パワーヒッター・木製派</td></tr>
            <tr><td>標準</td><td>クッションと操作性のバランス型。迷ったらここから</td><td>はじめの一本・オールラウンド</td></tr>
            <tr><td>薄め</td><td>打球感がダイレクト。バットが細く感じ、操作しやすい</td><td>バットコントロール重視・巧打タイプ</td></tr>
          </tbody>
        </table>

        <h3>② 素材・表面の質感</h3>
        <table>
          <thead>
            <tr>
              <th>タイプ</th>
              <th>特徴</th>
              <th>相性</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>ウェット（しっとり系）</td><td>手に吸いつくグリップ感。汗をかいても密着しやすい</td><td>汗ばむ夏・素手に近い一体感が欲しい人</td></tr>
            <tr><td>ドライ（さらさら系）</td><td>ベタつかず、乾いた握り心地。手袋との相性が良い</td><td>バッティンググローブ着用派・手汗が少ない人</td></tr>
            <tr><td>凹凸（パンチング等）</td><td>穴あき・型押しで滑り止め＆汗抜け。ズレにくい</td><td>とにかく滑りたくない人</td></tr>
            <tr><td>レザー調</td><td>本革風の高級感と耐久。硬めでしっかり</td><td>見た目・質感にこだわる人</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>木製バット派へ：</strong>
          木製は金属より衝撃が手に来やすいので、<strong>厚め×ウェット</strong>の組み合わせが握りの安心感を高めます。
          手袋と合わせるなら<strong>ドライ系</strong>もズレにくくおすすめ。
          （<a href="/guide/wood-bat/">木製バットの選び方</a>もあわせてどうぞ）
        </div>

        <ProductCards
          keyword="野球 バット グリップテープ"
          heading="🎗️ 楽天で人気のグリップテープを見る"
        />

        <AdSlot id="article-mid" />

        <h2>グリップテープの巻き方【7ステップ】</h2>
        <p>
          コツは「<strong>下（エンド）から上へ</strong>」「<strong>均等に重ねる</strong>」の2つだけ。
          利き手でテープを引きながら、反対の手でバットを回すとキレイに巻けます。
        </p>
        <ol>
          <li><strong>古いテープを剥がす</strong>：粘着の残りは、あれば拭き取っておく</li>
          <li><strong>巻き始めを決める</strong>：グリップエンド側の端から。テープの先端が斜めにカットされている面を先に貼る</li>
          <li><strong>テープを軽く引っぱりながら</strong>：たるませず、少しテンションをかけて密着させる</li>
          <li><strong>3分の1ずつ重ねる</strong>：テープ幅の約1/3を重ねながら、らせん状に上へ</li>
          <li><strong>間隔を均等に</strong>：重ねしろが一定だと仕上がりが美しく、握りムラも出ない</li>
          <li><strong>巻き終わりを留める</strong>：付属の仕上げテープ（フィニッシングテープ）でぐるっと固定</li>
          <li><strong>握って確認</strong>：シワ・段差・ゆるみがないかチェック。気になれば巻き直す</li>
        </ol>
        <div className="point-box">
          <strong>なぜ下から上なのか：</strong>
          下から巻くと、テープの重なりの「段差」がスイング中の手の動きと逆向きになり、
          <strong>めくれ上がりにくくなります</strong>。上から巻くと段差に指が引っかかり、めくれやすくなります。
        </div>

        <h2>替えどきのサイン</h2>
        <p>消耗品なので、下のサインが出たら早めに巻き替えましょう。安全と打撃精度のためです。</p>
        <ul>
          <li>握ると<strong>滑る</strong>・手汗でツルツルする</li>
          <li>端が<strong>ほつれ・めくれ</strong>てきた</li>
          <li>粘着が弱って<strong>ズレる</strong></li>
          <li>汗・汚れで<strong>硬くゴワついた</strong></li>
        </ul>
        <p>
          テープ自体は数百円。<strong>すっぽ抜けの事故を防ぐ保険</strong>と考えれば、こまめな交換は安いものです。
        </p>

        <AffiliateBox
          heading="🏏 グリップテープ・バット・お手入れ用品を探す"
          rakuten={["bat"]}
          retailers
        />

        <h2>よくある質問</h2>
        <h3>Q. テープの上からさらに滑り止めスプレーは必要？</h3>
        <p>
          必須ではありません。ウェット系や凹凸タイプを選べば、多くの人はテープだけで十分です。
          真夏の手汗が特に多い人は、松ヤニ系のグリップ剤を併用する手もあります（用具規定の範囲で）。
        </p>
        <h3>Q. 素手派だけどテープは巻いた方がいい？</h3>
        <p>
          はい。素手でもテープはグリップと衝撃吸収の役割があります。
          素手なら<strong>ウェット系の薄め〜標準</strong>が、手との一体感が出ておすすめです。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/bat-care/">
            → バット本体の手入れは「軟式バットのお手入れ」へ
          </a>
          <a className="cta-inline" href="/guide/wood-bat/">
            → 「木製バットの選び方と相棒ガイド」も読む
          </a>
          <a className="cta-inline" href="/baseball-dock/">
            → 相棒バット・道具をまとめて「野球人間ドック」で診断
          </a>
        </div>

        <RelatedGuides currentHref="/guide/grip-tape/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
