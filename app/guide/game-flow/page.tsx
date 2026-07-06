import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の試合の進め方・基本ルール完全ガイド｜当日の流れ・軟式の注意点・審判の基礎",
  description:
    "初めての草野球でも大丈夫。試合当日の集合からプレイボール、攻守交替、試合終了までの流れを時系列で解説。イニング数・時間制限・コールドなどの基本ルール、軟式ならではの注意点、相互審判のやり方、そして揉めないためのローカルルール確認まで、幹事も選手も押さえておきたい基礎をまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/game-flow/` },
  openGraph: {
    title: "草野球の試合の進め方・基本ルール完全ガイド",
    description:
      "当日の流れ・基本ルール・軟式の注意点・相互審判の基礎まで。初めてでも安心の一本。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "草野球の試合の進め方・基本ルール完全ガイド｜当日の流れ・軟式の注意点・審判の基礎",
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
        name: "草野球の試合は何イニングですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "7イニング制が一般的ですが、リーグや大会によって9イニングや、時間制限（例：90分・1時間半で新しいイニングに入らない）を採用することも多くあります。事前に相手チームやリーグの規定を確認しておきましょう。",
        },
      },
      {
        "@type": "Question",
        name: "草野球では審判をどうしますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "リーグ戦では有料の派遣審判を頼むこともありますが、練習試合では対戦する両チームで審判をやり合う『相互審判』が一般的です。攻撃側が塁審を出す、守備側が球審を出すなど、事前に取り決めておくとスムーズです。",
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

export default function GameFlowPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球の試合の進め方・基本ルール完全ガイド｜当日の流れ・軟式の注意点・審判の基礎</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約8分</p>

        <p>
          「試合が決まったけど、当日って何をどう進めるの？」——
          初めて草野球に参加する人も、初めてチームを仕切る幹事も、
          ここが意外とあいまいなまま本番を迎えがちです。
          この記事では、<strong>当日の流れ</strong>を時系列で追いながら、
          <strong>基本ルール・軟式の注意点・審判の基礎</strong>まで、まとめて押さえます。
        </p>

        <nav className="toc-box" aria-label="目次">
          <p className="toc-title">📋 この記事の内容</p>
          <ol>
            <li><a href="#flow">試合当日の流れ（時系列）</a></li>
            <li><a href="#rules">知っておきたい基本ルール</a></li>
            <li><a href="#soft">軟式・草野球ならではの注意点</a></li>
            <li><a href="#umpire">相互審判の基礎</a></li>
            <li><a href="#manner">揉めないためのマナー</a></li>
          </ol>
        </nav>

        <AdSlot id="article-top" />

        <h2 id="flow">試合当日の流れ（時系列）</h2>
        <p>
          まずは大きな流れをつかみましょう。だいたいどのチームも、この順番で進みます。
        </p>
        <table>
          <thead>
            <tr>
              <th>タイミング</th>
              <th>やること</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>集合（試合の30〜45分前）</td><td>グラウンドに集合、着替え、あいさつ</td></tr>
            <tr><td>ウォームアップ</td><td>ランニング・体操・キャッチボール・ノック</td></tr>
            <tr><td>メンバー表の交換</td><td>両チームで打順・守備位置を記入して交換</td></tr>
            <tr><td>先攻・後攻を決める</td><td>じゃんけんやコイントスで決定</td></tr>
            <tr><td>試合前のあいさつ</td><td>本塁に整列して「お願いします」</td></tr>
            <tr><td>プレイボール</td><td>試合開始。攻守交替を繰り返す</td></tr>
            <tr><td>試合終了</td><td>整列して「ありがとうございました」</td></tr>
            <tr><td>片付け・グラウンド整備</td><td>ベースやゴミの片付け、トンボがけ</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>幹事のひと工夫：</strong>
          集合時間は「試合開始の◯分前」ではなく<strong>具体的な時刻</strong>で伝えるのがコツ。
          アップの時間を確保できないと、ケガのリスクが上がります。
          メンバー表は<strong>事前にスマホのメモやアプリで作っておく</strong>と当日がスムーズです（
          <a href="/guide/team-apps/">チーム管理アプリ</a>が便利）。
        </div>

        <h2 id="rules">知っておきたい基本ルール</h2>
        <p>
          野球の細かいルールは膨大ですが、草野球で最初に押さえるべきはこのあたり。
          <strong>リーグや相手との取り決めで変わる</strong>ものが多いので、事前確認が肝心です。
        </p>
        <table>
          <thead>
            <tr>
              <th>項目</th>
              <th>草野球での一般的な目安</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>イニング数</td><td>7イニング制が多い（9回や時間制の場合も）</td></tr>
            <tr><td>時間制限</td><td>「90分・新しいイニングに入らない」等が一般的</td></tr>
            <tr><td>コールドゲーム</td><td>点差コールド（例：5回10点差）を設けることが多い</td></tr>
            <tr><td>人数</td><td>9人で成立。助っ人や臨時ルールで補うことも</td></tr>
            <tr><td>再出場（リエントリー）</td><td>草野球では認めるローカルルールも多い</td></tr>
          </tbody>
        </table>

        <AdSlot id="article-mid" />

        <h2 id="soft">軟式・草野球ならではの注意点</h2>
        <p>
          硬式や学生野球の感覚のままだと、戸惑うポイントがいくつかあります。
        </p>
        <ul>
          <li>
            <strong>使用球はM号が基本</strong>：
            大人の軟式はM号球。バットやボールを用意する際は要確認です
          </li>
          <li>
            <strong>金具スパイク禁止の球場が多い</strong>：
            公共グラウンドは金具NGが一般的。樹脂ポイントを用意しておくと安心（
            <a href="/guide/spikes-guide/">スパイクの選び方</a>）
          </li>
          <li>
            <strong>ローカルルールが多い</strong>：
            リエントリー可否、コールド規定、ワンバウンド投球の四球扱いなど、
            チーム・リーグごとに独自ルールがあります
          </li>
          <li>
            <strong>グラウンドルールの確認</strong>：
            フェンスのない河川敷など、「どこからが本塁打・エンタイトルか」を試合前に取り決めます
          </li>
        </ul>
        <div className="point-box">
          <strong>試合前の3分ミーティングを習慣に：</strong>
          両チームのキャプテンで「イニング数・時間・コールド・特別ルール・グラウンドルール」を
          先に確認しておくと、試合中のトラブルがほぼ防げます。ここを省くと、後で必ず揉めます。
        </div>

        <h2 id="umpire">相互審判の基礎</h2>
        <p>
          練習試合では、対戦する両チームで審判をやり合う
          <strong>「相互審判」</strong>が一般的。プロのようにうまくやる必要はありません。
          大事なのは<strong>迷わず・はっきり・一貫して</strong>ジャッジすることです。
        </p>
        <table>
          <thead>
            <tr>
              <th>審判</th>
              <th>役割</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>球審（キャッチャーの後ろ）</td><td>ストライク／ボール、本塁でのアウト・セーフ</td></tr>
            <tr><td>塁審（各塁の近く）</td><td>各塁でのアウト・セーフ、フェア／ファウルの補助</td></tr>
          </tbody>
        </table>
        <ul>
          <li><strong>コールは大きく</strong>：ジェスチャーと声をセットで、はっきりと</li>
          <li><strong>基準を一定に</strong>：ストライクゾーンは両チームに同じ基準で</li>
          <li><strong>見えなかったら正直に</strong>：曖昧なときは近くの審判と相談してOK</li>
          <li><strong>役割分担を決めておく</strong>：攻撃側が塁審を出す等、事前の取り決めでスムーズに</li>
        </ul>

        <h2 id="manner">揉めないためのマナー</h2>
        <p>
          草野球は「みんなで楽しむ」のが大前提。技術より、この意識が大事です。
        </p>
        <ul>
          <li><strong>時間厳守</strong>：グラウンドは次の団体が待っています。延長・巻きは素早く</li>
          <li><strong>危険プレーをしない</strong>：本気のタックルやスパイク高い足はNG。ケガは全員の損</li>
          <li><strong>判定に食い下がりすぎない</strong>：相互審判は「お互いさま」。熱くなりすぎないのが大人</li>
          <li><strong>グラウンドをきれいに</strong>：整備・ゴミ拾いまでが試合。次も気持ちよく借りられます</li>
        </ul>

        <h2>よくある質問</h2>
        <h3>Q. 初参加で、ルールをあまり知りません。大丈夫？</h3>
        <p>
          大丈夫です。細かいルールは、やりながら覚えれば十分。
          最初は<strong>「打ったら一塁へ走る」「打球を捕る・投げる」</strong>という基本だけでOK。
          わからないときはチームメイトに聞けば、みんな教えてくれます。
        </p>
        <h3>Q. メンバー表って必ず必要？</h3>
        <p>
          リーグ戦では必須のことが多いですが、ゆるい練習試合なら口頭でも進みます。
          ただ、打順を書いたものが一枚あると<strong>「次だれ？」の混乱がなくなる</strong>ので、
          用意しておくのがおすすめです。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/how-to-start/">
            → はじめての方は「草野球の始め方 完全ガイド」
          </a>
          <a className="cta-inline" href="/guide/build-a-team/">
            → チームを作る人は「立ち上げ完全マニュアル」
          </a>
        </div>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
