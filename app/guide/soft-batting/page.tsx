import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "軟式の打ち方のコツ【硬式出身者・初心者向け】ゴロを減らして飛ばす打撃",
  description:
    "軟式でボテボテのゴロや詰まった当たりばかり——その原因は「軟式ボールが潰れる」こと。上から叩かず芯で押し込む、ミートポイントを近くにするなど、ゴロを減らして飛距離を出す打ち方のコツを、参考動画つきで解説します。",
  alternates: { canonical: `${SITE_URL}/guide/soft-batting/` },
  openGraph: {
    title: "軟式の打ち方のコツ【硬式出身者・初心者向け】",
    description:
      "ボテボテのゴロを減らして飛ばす。軟式ならではの打撃のコツを参考動画つきで解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "軟式の打ち方のコツ【硬式出身者・初心者向け】ゴロを減らして飛ばす打撃",
    inLanguage: "ja",
    dateModified: "2026-07-04",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  );
}

export default function SoftBattingPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>
          軟式の打ち方のコツ【硬式出身者・初心者向け】ゴロを減らして飛ばす打撃
        </h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <p>
          しっかり振っているのに、当たるのはボテボテの内野ゴロと、力ないファールチップばかり——。
          軟式を始めた人、あるいは硬式から移ってきた人が、まず最初にぶつかる壁がこれです。
        </p>
        <p>
          でも、下手になったわけでも、力が足りないわけでもありません。
          原因は、たった一つ。<strong>軟式ボールは、当たると潰れる。</strong>
          この性質を知って、ほんの少し打ち方を合わせるだけで、
          打球は驚くほど変わります。この記事では、
          <strong>ゴロを減らし、しっかり飛ばすための軟式打撃のコツ</strong>を、参考動画つきで解説します。
        </p>

        <AdSlot id="article-top" />

        <h2>なぜ軟式は「詰まる・ゴロになる」のか</h2>
        <p>
          硬式ボールは硬くて、当たってもほとんど形が変わりません。だから、上からしっかり叩いて
          バックスピンをかければ、キレイに飛んでいきます。
        </p>
        <p>
          ところが軟式ボールはゴム製で中が空洞。
          <strong>バットが当たった瞬間、大きく潰れます。</strong>
          この“潰れる時間”のあいだに、上から強く叩き込む力が加わると、
          ボールは押しつぶされて勢いを失い、地面に向かって転がっていく——
          これがボテボテゴロの正体です。硬式の「叩いて飛ばす」がそのまま通用しないのは、このためです。
        </p>

        <h2>コツ①：上から叩きすぎず、「レベル〜やや上」に振る</h2>
        <p>
          まず意識したいのがスイング軌道。硬式の「上から叩く」イメージを少しゆるめ、
          <strong>バットをレベル（水平）〜ややアッパー気味</strong>に、
          ボールの中心を横からとらえにいきます。
          こうすると、潰れたボールを地面に押し込まず、前へ運べるようになります。
        </p>

        <h2>コツ②：芯でとらえて「押し込む」</h2>
        <p>
          軟式で飛ばす感覚は、叩くというより<strong>「押し込む」「運ぶ」</strong>。
          インパクトの瞬間に、潰れたボールをバットにグッと乗せて、
          そのまま前へ押し出すイメージです。手首を早くこねず、
          <strong>ボールとバットが接している時間を長く</strong>取るのがポイント。
          この“ひと押し”が、軽い当たりを鋭い打球に変えます。
        </p>

        <h2>コツ③：ミートポイントを少し近くに取る</h2>
        <p>
          硬式より<strong>体の少し近く</strong>でとらえると、力が乗りやすくなります。
          遠くで当てにいくと、潰れたボールに力が伝わりきる前にバットが離れてしまい、
          詰まった当たりになりがち。「引きつけて、押す」を合言葉に。
        </p>

        <h2>参考動画：軟式ならではの技術</h2>
        <p>
          文章だけではつかみにくいスイングの感覚は、動画で見るのが一番です。
          軟式で人気のYouTuber・ミノルマンさんが、対決企画で実際に使っている軟式の技術を紹介しています。
        </p>
        <div className="video-embed">
          <iframe
            src="https://www.youtube-nocookie.com/embed/mZAodyaiJzY"
            title="軟式技術の解説動画（ミノルマン）"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="video-caption">
          出典：YouTube「ミノルマン」チャンネル（別ウィンドウで再生されます）
        </p>

        <AdSlot id="article-bottom" />

        <h2>飛距離を伸ばしたい人へ</h2>
        <p>
          軟式はそもそも飛びにくいボール。無理に力むより、
          <strong>ボールの中心をしっかり潰して、そのエネルギーを前に押し出す</strong>ほうが飛びます。
          強引にバックスピンをかけようと下から大きくすくうと、かえって力が逃げがち。
          「中心をとらえて、押す」——この基本を丁寧に。芯で押せた打球は、軽い音がして、
          スッと伸びていきます。
        </p>

        <h2>おすすめの練習法</h2>
        <ul>
          <li>
            <strong>ティーバッティング</strong>：
            止まったボールで「押し込む」感覚を体に覚えさせる。軟式打撃の基礎練習に最適
          </li>
          <li>
            <strong>トスバッティング</strong>：
            ミートポイントを近くに取り、当ててから押す動きを反復
          </li>
          <li>
            <strong>素振りは軌道を意識</strong>：
            「上から叩く」を少しゆるめ、レベル軌道を体に染み込ませる
          </li>
        </ul>

        <h2>硬式出身者へ：捨てるのは“軌道”だけ</h2>
        <p>
          硬式で身につけた土台——選球眼、体の使い方、スイングスピードは、そのまま大きな武器です。
          変えるのは<strong>「上から叩く軌道」と「押し込む意識」だけ</strong>。
          そこさえ軟式に合わせれば、あなたの打球はすぐに見違えます。
          ボールが変わっただけ、と気づけば、あとは楽しむだけです。
        </p>

        <p>
          打撃の勘が戻ってきたら、いよいよチームの一員として。
          そろいのユニフォームで打席に立つ気持ちよさは、格別ですよ。
        </p>
        <a className="cta-inline" href="/guide/soft-vs-hard/">
          → あわせて読む：硬式出身者のための「軟式と硬式の違い」ガイド
        </a>
        <a className="cta-inline" href="/uniform/">
          → ユニフォームを作るなら：メーカー比較ランキング
        </a>
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
