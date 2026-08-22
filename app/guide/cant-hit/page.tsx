import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球で打てない原因と直し方【ボテボテ・空振り・当たらないを解消】",
  description:
    "草野球で打てない…その原因は「タイミング」「ボールの見方」「スイング軌道」「力み」のどれかに集約されます。ボテボテのゴロ・空振り・そもそも当たらない、症状別に原因と直し方を解説。硬式出身者が軟式で打てない理由や、家でできる練習、道具の見直しまで。今日から一つずつ潰していきましょう。",
  alternates: { canonical: `${SITE_URL}/guide/cant-hit/` },
  openGraph: {
    title: "草野球で打てない原因と直し方",
    description:
      "ボテボテ・空振り・当たらないを症状別に。タイミング・見方・軌道・力みの4原因を一つずつ解消。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球で打てない原因と直し方【ボテボテ・空振り・当たらないを解消】",
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
        name: "ボテボテのゴロばかりになるのはなぜ？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ボールの上を叩いている（上から叩きつけている）か、差し込まれてタイミングが遅れているのが主な原因です。軟球はつぶれて上がりにくいので、ボールの中心〜やや下を、水平〜ややアッパー気味に振り抜く意識で改善しやすくなります。",
        },
      },
      {
        "@type": "Question",
        name: "硬式出身なのに軟式で打てないのはなぜ？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "軟球は軽くつぶれて反発するため、硬式と同じ強い上からのスイングだとゴロになりやすいからです。軟式は運ぶより「はじく・すくい上げる」意識が合います。詳しくは軟式の打ち方ガイドで解説しています。",
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

export default function CantHitPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球で打てない原因と直し方【ボテボテ・空振り・当たらないを解消】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約8分</p>

        <p>
          「練習では打てるのに試合で打てない」「ボテボテのゴロばかり」——草野球の打撃の悩みは、
          じつは<strong>4つの原因</strong>にほぼ集約されます：
          <strong>①タイミング ②ボールの見方 ③スイング軌道 ④力み</strong>。
          闇雲に振り込む前に、自分がどれに当てはまるかを見つけて、一つずつ潰していきましょう。
        </p>

        <AdSlot id="article-top" />

        <h2>症状で原因を切り分ける</h2>
        <table>
          <thead>
            <tr>
              <th>症状</th>
              <th>主な原因</th>
              <th>まず試すこと</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>ボテボテのゴロが多い</td><td>上から叩きすぎ／差し込まれ</td><td>中心〜やや下を水平に振り抜く・始動を早く</td></tr>
            <tr><td>空振りが多い</td><td>目線のブレ／振り出しが遅い</td><td>ボールを長く見る・トップを早く作る</td></tr>
            <tr><td>そもそも当たらない</td><td>タイミングが合っていない</td><td>投手の動きに合わせて「一・二・三」で始動</td></tr>
            <tr><td>力なく詰まる</td><td>力み・手打ち</td><td>下半身主導・グリップは緩めに握る</td></tr>
          </tbody>
        </table>

        <h2>原因①：タイミング（いちばん多い）</h2>
        <p>
          打てない最大の原因はスイングそのものより<strong>タイミング</strong>のことが多いです。
          速い球に差し込まれる、遅い球で泳ぐ、どちらもタイミングの問題。
        </p>
        <ul>
          <li><strong>始動を早く</strong>：投手の足が上がったら、こちらも準備動作（テイクバック）を始める</li>
          <li><strong>自分のリズムを持つ</strong>：「イチ・ニ・サン」で振り出す等、毎打席同じリズムで</li>
          <li><strong>タイミングを取る動き</strong>：かかとを上げる・膝を送るなど、止まって待たない</li>
        </ul>

        <h2>原因②：ボールの見方</h2>
        <ul>
          <li><strong>ボールを長く見る</strong>：当たる瞬間まで見る意識。顔（アゴ）が早く開くと目線がブレる</li>
          <li><strong>リリースを見る</strong>：投手の手からボールが出る点に目を置くと、球種・高さの判断が早くなる</li>
          <li><strong>見送る勇気</strong>：ボール球を振らないだけで打率は上がる。選球も技術</li>
        </ul>

        <AffiliateBox
          heading="🏏 素振り・ティー・練習用品を探す"
          rakuten={["bat"]}
          retailers
        />

        <AdSlot id="article-mid" />

        <h2>原因③：スイング軌道（軟式で特に重要）</h2>
        <p>
          軟球は軽くつぶれて反発するため、<strong>硬式と同じ強い上からのスイングだとゴロ</strong>になりがち。
          軟式は「運ぶ」より<strong>「はじく・すくい上げる」</strong>意識が合います。
        </p>
        <ul>
          <li>ボールの<strong>中心〜やや下</strong>を捉え、水平〜ややアッパー気味に振り抜く</li>
          <li>バットを最短距離で出す（遠回り＝ドアスイングは差し込まれる）</li>
          <li>フォロースルーを大きく。振り切ると打球が伸びる</li>
        </ul>
        <p>
          硬式出身の人がつまずきやすいポイントです。詳しくは
          <a href="/guide/soft-batting/">軟式の打ち方のコツ</a>と
          <a href="/guide/soft-vs-hard/">軟式と硬式の違い</a>もあわせてどうぞ。
        </p>

        <h2>原因④：力み・手打ち</h2>
        <ul>
          <li><strong>下半身主導</strong>：腕で振らず、踏み込み→腰の回転で振る。手はついてくるだけ</li>
          <li><strong>グリップは緩めに</strong>：ガチガチに握ると力が伝わらない。インパクトで締める</li>
          <li><strong>8割で振る</strong>：フルスイングのつもりで力むより、8割で鋭く振る方が飛ぶことが多い</li>
        </ul>

        <h2>家・ひとりでできる練習</h2>
        <ul>
          <li><strong>素振り</strong>：鏡やスマホ動画で軌道チェック。ゆっくり正しい動きを反復</li>
          <li><strong>ティー打撃</strong>：置きティーで「中心〜やや下を水平に」を体に覚えさせる</li>
          <li><strong>タイミング素振り</strong>：投球動画に合わせて始動〜スイングのリズムを練習</li>
        </ul>

        <h2>道具が合っていない可能性も</h2>
        <p>
          重すぎるバットは振り遅れ・差し込まれの原因に。<strong>振り切れる重さ</strong>が大前提です。
          軽く振れるカーボン系に替えるだけで当たりが変わる人もいます。
        </p>
        <div className="bat-links">
          <a className="cta-inline" href="/guide/bat-guide/">→ 振り切れる一本の選び方「軟式バットの選び方」</a>
          <a className="cta-inline" href="/guide/bat-latest/">→ タイプ別の「軟式バット最新おすすめ」を見る</a>
          <a className="cta-inline" href="/baseball-dock/">→ あなたに合う道具を「野球人間ドック」で処方</a>
        </div>

        <RelatedGuides currentHref="/guide/cant-hit/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
