import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "軟式バットのお手入れ・長持ちのコツ｜金属・複合（ビヨンド系）の手入れと保管を解説",
  description:
    "軟式バットは手入れ次第で寿命が変わります。金属バットの汚れ落とし・凹み対策、複合（ビヨンド系）バットの寒さ・保管の注意、グリップテープの巻き替え時期、やってはいけないNGまで。大切な一本を長く使うためのメンテナンス完全ガイド。",
  alternates: { canonical: `${SITE_URL}/guide/bat-care/` },
  openGraph: {
    title: "軟式バットのお手入れ・長持ちのコツ",
    description:
      "金属・複合バットの手入れと保管、グリップ巻き替え、寒さの注意、NG集まで解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "軟式バットのお手入れ・長持ちのコツ｜金属・複合（ビヨンド系）の手入れと保管を解説",
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
        name: "複合（ビヨンド系）バットは寒い日に使わない方がいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "低温時は樹脂・ウレタン部分が硬くなり、割れやひびのリスクが上がるとされます。寒い日は使用前に室温で温めておく、氷点下での屋外放置を避けるなど、メーカーの注意書きに従うのが安心です。",
        },
      },
      {
        "@type": "Question",
        name: "バットのグリップテープはいつ替えればいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "滑りやすくなった、ほつれてきた、粘着が弱くなったと感じたら替えどきです。プレー中の滑りは打撃の精度とケガに直結するため、消耗したら早めの巻き替えをおすすめします。",
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

export default function BatCarePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>軟式バットのお手入れ・長持ちのコツ｜金属・複合（ビヨンド系）の手入れと保管を解説</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          お気に入りの一本、長く使いたいですよね。
          バットは手入れがいらないように見えて、実は<strong>ちょっとした扱いで寿命が変わります</strong>。
          とくに人気の複合（ビヨンド系）バットは、扱い方に少しコツがいります。
          金属・複合それぞれの手入れと保管を、まとめておさえておきましょう。
        </p>

        <AdSlot id="article-top" />

        <h2>基本のお手入れ（金属・複合 共通）</h2>
        <p>
          まずはどのバットにも共通する基本から。難しいことはありません。
        </p>
        <ol>
          <li><strong>使用後は汚れを拭く</strong>：土やボール跡を、乾いた布や固く絞った布で拭き取る</li>
          <li><strong>水気は残さない</strong>：雨天使用後は水分を拭き、自然乾燥させる</li>
          <li><strong>グリップの状態を確認</strong>：滑り・ほつれがないかチェック</li>
          <li><strong>立てて保管</strong>：バットスタンドや袋で、直射日光・高温を避けて保管</li>
        </ol>
        <div className="point-box">
          <strong>やってはいけないNG：</strong>
          <br />
          ・車内やロッカーに放置（夏の高温・冬の低温はどちらもダメージ）
          <br />
          ・地面や壁に強く打ちつける（凹み・ひびの原因）
          <br />
          ・砂・小石の上を引きずる（傷・塗装剥がれ）
        </div>

        <h2>金属バットの手入れと注意点</h2>
        <p>
          金属（ジュラルミン等）バットは丈夫ですが、<strong>凹み</strong>には注意。
          硬いものへの打ちつけや、無理な使い方で凹むと反発が落ちます。
        </p>
        <ul>
          <li>汚れは中性洗剤を薄めた布で拭き、しっかり乾かす</li>
          <li>凹み・へこみができたら、性能・安全のため買い替えを検討</li>
          <li>塗装の剥がれは見た目の問題が中心。使用には大きく影響しないことが多い</li>
        </ul>

        <AffiliateBox
          heading="🏏 バット・グリップテープ・お手入れ用品を探す"
          rakuten={["bat"]}
          retailers
        />

        <AdSlot id="article-mid" />

        <h2>複合（ビヨンド系）バットは「温度」に注意</h2>
        <p>
          飛距離で人気の複合バットは、先端にウレタンなどの樹脂を使っています。
          この素材は<strong>低温で硬くなり、割れやすくなる</strong>とされるため、寒い季節はとくに配慮を。
        </p>
        <table>
          <thead>
            <tr>
              <th>場面</th>
              <th>対処</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>寒い日の使用</td>
              <td>使う前に室温で温めておく。氷点下での屋外放置を避ける</td>
            </tr>
            <tr>
              <td>保管</td>
              <td>高温・低温・直射日光を避け、室内で立てて保管</td>
            </tr>
            <tr>
              <td>使い始め</td>
              <td>いきなり全力ではなく、素振りなどで馴染ませてから</td>
            </tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>メーカーの注意書きが最優先：</strong>
          複合バットは製品ごとに使用温度や取り扱いの指定があります。
          付属の説明書・公式サイトの注意事項を必ず確認しましょう。
          高価な一本だからこそ、正しく扱えば長く飛距離を保てます。
        </div>

        <h2>グリップテープの巻き替え</h2>
        <p>
          意外と見落としがちなのがグリップ。
          滑るグリップは<strong>打撃精度の低下とケガの両方</strong>につながります。
        </p>
        <ul>
          <li><strong>替えどき</strong>：滑る・ほつれる・粘着が弱った・汗で硬くなった</li>
          <li><strong>選び方</strong>：厚めは衝撃吸収、薄めは操作性。好みで</li>
          <li><strong>巻き方</strong>：下（グリップエンド）から上へ、少し重ねながら均等に</li>
        </ul>

        <h2>よくある質問</h2>
        <h3>Q. 共用のチームバットも手入れした方がいい？</h3>
        <p>
          はい。使用後にサッと拭く、濡れたら乾かす、立てて保管するだけで持ちが変わります。
          チームの備品こそ、みんなで少し気を配ると長持ちします（
          <a href="/guide/annual-cost/">道具代の節約</a>にも直結します）。
        </p>
        <h3>Q. バットが飛ばなくなった気がする。寿命？</h3>
        <p>
          金属なら凹み、複合なら内部素材の劣化（へたり）が原因のことがあります。
          明らかに反発が落ちた・異音がする場合は、安全のためにも買い替えのサインです。
        </p>

        <a className="cta-inline" href="/guide/bat-guide/">
          → 買い替えを考えるなら「軟式バットの選び方」へ
        </a>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
