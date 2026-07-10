import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "【硬式出身者必見】軟式と硬式の違いガイド｜ボール・打撃・守備はこう変わる",
  description:
    "学生時代は硬式、久しぶりの草野球は軟式。「同じように打ってるのに飛ばない」「内野ゴロが高く跳ねる」——その正体を、ボール・打撃・守備・体への負担の4つの視点で解説。硬式出身者が最初に戸惑うポイントと対処法まで。",
  alternates: { canonical: `${SITE_URL}/guide/soft-vs-hard/` },
  openGraph: {
    title: "【硬式出身者必見】軟式と硬式の違いガイド",
    description:
      "ボール・打撃・守備・体への負担。硬式経験者が軟式で戸惑うポイントと対処法を解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "【硬式出身者必見】軟式と硬式の違いガイド｜ボール・打撃・守備はこう変わる",
    inLanguage: "ja",
    dateModified: "2026-07-04",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "硬式経験者が軟式で戸惑うのはなぜ？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "軟式ボールは軽くて柔らかく、当たると変形します。硬式のようにバックスピンで飛ばす打ち方が通用しにくく、上から叩くとボールが潰れて詰まりやすい。守備でもバウンドが高く跳ねるため、同じ感覚だと戸惑います。",
        },
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}

export default function SoftVsHardPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>
          【硬式出身者必見】軟式と硬式の違いガイド｜ボール・打撃・守備はこう変わる
        </h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <p>
          学生時代は硬式でバリバリやっていた。数年ぶりに誘われた草野球で、久しぶりに打席に立った——
          そうしたら、<strong>「あれ？同じように振ってるのに、全然飛ばない」</strong>。
          内野ゴロは妙に高く跳ねるし、打球はどこか軽い。
        </p>
        <p>
          その違和感、気のせいではありません。
          <strong>軟式と硬式は、同じ野球でも“別competition”と言っていいほど別物です。</strong>
          ボールが違えば、打ち方も守り方も変わる。この記事では、硬式出身のあなたが
          軟式で戸惑うポイントを、<strong>ボール・打撃・守備・体への負担</strong>の4つに分けて解きほぐします。
          読めば「なるほど、だから飛ばなかったのか」と腑に落ちるはずです。
        </p>

        <AdSlot id="article-top" />

        <h2>すべての違いは「ボール」から始まる</h2>
        <p>
          軟式と硬式のいちばんの違いは、言うまでもなくボールです。そしてこの一点が、
          打撃も守備も、すべてを変えていきます。
        </p>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>軟式ボール（M号）</th>
              <th>硬式ボール</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>素材</strong></td>
              <td>ゴム製・中は空洞</td>
              <td>コルク芯＋皮革・中身が詰まっている</td>
            </tr>
            <tr>
              <td><strong>重さ</strong></td>
              <td>約138g（軽い）</td>
              <td>約145g（重い）</td>
            </tr>
            <tr>
              <td><strong>当たった時</strong></td>
              <td>大きく変形して潰れる</td>
              <td>ほとんど変形しない</td>
            </tr>
            <tr>
              <td><strong>バウンド</strong></td>
              <td>高く・大きく跳ねる</td>
              <td>低く・速い</td>
            </tr>
            <tr>
              <td><strong>飛距離</strong></td>
              <td>出にくい</td>
              <td>よく飛ぶ</td>
            </tr>
          </tbody>
        </table>
        <p>
          ポイントは<strong>「軽くて、当たると潰れる」</strong>という2点。
          この性質が、硬式で染みついた感覚を裏切ってきます。
        </p>

        <h2>打撃：硬式の「叩いて飛ばす」が通用しない</h2>
        <p>
          硬式では、ボールに<strong>バックスピン</strong>をかけて遠くへ運びます。
          芯を外すと飛ばないぶん、しっかりミートしてパワーで押す打ち方が正解でした。
        </p>
        <p>
          ところが軟式は勝手が違います。ボールが変形するため、
          <strong>硬式のように上から強く叩くと、ボールが潰れて“詰まった”当たりになりやすい。</strong>
          いわゆるボテボテの内野ゴロやファールチップが増えるのは、これが原因です。
          軟式では、<strong>芯でとらえて“押し込む”</strong>感覚と、
          ミートポイントを少し近くに取るのがコツになります。
        </p>
        <div className="point-box">
          軟式の打ち方は、それだけで一本の記事になるほど奥が深いテーマです。
          具体的なスイングのコツは、
          <a href="/guide/soft-batting/">軟式の打ち方のコツ【硬式出身者・初心者向け】</a>
          で、動画つきで詳しく解説しています。
        </div>

        <h2>守備：バウンドが「跳ねる」ことに慣れる</h2>
        <p>
          硬式の打球は低く速く飛んできます。一方、軟式の打球は
          <strong>高く、大きく跳ねる</strong>のが特徴。
          硬式のノリで前に出て捕ろうとすると、ボールが顔の高さまで跳ね上がって
          「うわっ」となる——これは硬式出身者あるあるです。
        </p>
        <ul>
          <li><strong>内野</strong>：高いバウンドを想定し、慌てて前に突っ込みすぎないこと</li>
          <li><strong>外野</strong>：軽い打球は伸びずに失速しやすい。落下点の見極めが変わる</li>
          <li><strong>全体</strong>：打球がイレギュラーに変化しやすいので、最後まで目を切らない</li>
        </ul>

        <h2>体への負担：軟式は「長く続けられる」</h2>
        <p>
          ここは硬式出身者にとって朗報です。軟式は軽くて柔らかいぶん、
          <strong>手や体への衝撃が小さく、ケガのリスクも低め。</strong>
          デッドボールを食らっても、硬式ほどの恐怖はありません。
          だからこそ、社会人になっても、40代・50代になっても続けられる。
          「無理なく、長く楽しむ」——それが軟式・草野球の一番の魅力です。
        </p>

        <AdSlot id="article-bottom" />

        <h2>道具：軟式用に切り替えを</h2>
        <p>
          意外と見落としがちなのが道具。硬式用と軟式用は設計が違います。
        </p>
        <ul>
          <li><strong>バット</strong>：軟式用は、軟らかいボールの反発をうまく活かす設計。硬式用をそのまま使うのは避けましょう</li>
          <li><strong>グローブ</strong>：硬式用は硬く重い。軟式なら軟式用のほうが扱いやすく、手にも優しい</li>
          <li>久しぶりの復帰なら、まずはグローブから。
            <a href="/guide/gear-checklist/">道具・装備の一式チェックリスト</a>も参考にどうぞ</li>
        </ul>

        <h2>まとめ：違いを知れば、軟式はもっと面白い</h2>
        <p>
          硬式で培った基礎は、決してムダになりません。
          むしろ「ボールが変わった」という一点さえ理解すれば、
          あなたの経験は軟式でも大きな武器になります。飛ばない・詰まる・跳ねる——
          その理由がわかった今、あとは軟式のボールに合わせて微調整するだけ。
        </p>
        <p>
          まずは実際に打席へ。そして、そろいのユニフォームでチームの一員になれば、
          草野球の楽しさは一段と増します。
        </p>
        <a className="cta-inline" href="/guide/soft-batting/">
          → 次に読む：軟式の打ち方のコツ【動画つき】
        </a>
        <a className="cta-inline" href="/uniform/">
          → チームのユニフォームを作るなら：メーカー比較ランキング
        </a>

        <RelatedGuides currentHref="/guide/soft-vs-hard/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
