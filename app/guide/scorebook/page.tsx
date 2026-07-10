import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "スコアブックの書き方【記号一覧・つけ方の基本】草野球で今日から書ける完全ガイド",
  description:
    "野球のスコアブックの書き方を、記号一覧つきでゼロから解説。守備位置の番号（1〜9）、ヒット・四球・三振・エラーの記号、進塁の書き方、ダイヤモンドの塗り方まで。草野球のマネージャー・初心者が今日からつけられるように、基本のルールと具体例をまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/scorebook/` },
  openGraph: {
    title: "スコアブックの書き方【記号一覧・つけ方の基本】",
    description:
      "守備番号・打撃記号・進塁の書き方を、記号一覧つきでゼロから。草野球で今日から書ける完全ガイド。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "スコアブックの書き方【記号一覧・つけ方の基本】",
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
        name: "スコアの守備位置の番号はどう決まっていますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "投手=1、捕手=2、一塁手=3、二塁手=4、三塁手=5、遊撃手=6、左翼手=7、中堅手=8、右翼手=9です。二塁手が5ではなく4、三塁手が5、遊撃手が6という並びが最初の関門ですが、内野を一塁→二塁→三塁→遊撃の順に3・4・5・6と覚えると忘れません。",
        },
      },
      {
        "@type": "Question",
        name: "ショートゴロはスコアでどう書きますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "遊撃手(6)が捕って一塁手(3)に送球してアウトなら「6-4-3」ではなく「6-3」と書きます。数字は「ボールが渡った守備者の順番」を表します。ダブルプレー（併殺）で遊撃→二塁→一塁なら「6-4-3」です。",
        },
      },
      {
        "@type": "Question",
        name: "アプリと紙のスコアブック、どちらがいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "記録を自動で集計・共有したいならアプリ、senseや味わい・ネット環境に左右されない安心感なら紙が向いています。まず紙で記号を覚えると、アプリの表示も理解しやすくなります。両方を併用するチームも多いです。",
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

export default function ScorebookPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>スコアブックの書き方【記号一覧・つけ方の基本】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約8分</p>

        <p>
          「スコア、つけられる人いる？」——草野球あるあるの一言。
          じつはスコアブックは、<strong>守備位置の番号</strong>と
          <strong>いくつかの記号</strong>さえ覚えれば、初めてでもその日から書けます。
          ここでは、紙のスコアブックを想定して、
          <strong>ゼロから今日つけられるようになる</strong>ことをゴールに解説します。
        </p>

        <AdSlot id="article-top" />

        <h2>まず覚える：守備位置の番号（1〜9）</h2>
        <p>
          スコアの土台は、9つの守備位置につけられた番号です。これが打球の処理を書くときの共通言語になります。
        </p>
        <table>
          <thead>
            <tr>
              <th>番号</th>
              <th>守備位置</th>
              <th>英語表記</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>投手（ピッチャー）</td><td>P</td></tr>
            <tr><td>2</td><td>捕手（キャッチャー）</td><td>C</td></tr>
            <tr><td>3</td><td>一塁手（ファースト）</td><td>1B</td></tr>
            <tr><td>4</td><td>二塁手（セカンド）</td><td>2B</td></tr>
            <tr><td>5</td><td>三塁手（サード）</td><td>3B</td></tr>
            <tr><td>6</td><td>遊撃手（ショート）</td><td>SS</td></tr>
            <tr><td>7</td><td>左翼手（レフト）</td><td>LF</td></tr>
            <tr><td>8</td><td>中堅手（センター）</td><td>CF</td></tr>
            <tr><td>9</td><td>右翼手（ライト）</td><td>RF</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>つまずきポイント：</strong>
          二塁手が「4」、三塁手が「5」、遊撃手が「6」。ここが最初の関門です。
          <br />
          内野を<strong>一塁→二塁→三塁→遊撃</strong>の順に「3・4・5・6」と覚えると混乱しません。
          外野は左から<strong>7・8・9</strong>（レフト・センター・ライト）です。
        </div>

        <h2>打った結果の記号（打撃記入）</h2>
        <p>
          打者がどうなったかは、決まった記号で書きます。よく使うものだけ覚えれば十分です。
        </p>
        <table>
          <thead>
            <tr>
              <th>記号</th>
              <th>意味</th>
              <th>補足</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>ー（一本線）</td><td>単打（ヒット）</td><td>塁の数だけ線を足す：二塁打＝＝、三塁打＝三本、本塁打＝四本 or HR</td></tr>
            <tr><td>K</td><td>三振（見逃し）</td><td>見逃し三振は「逆向きのK」で書く流儀もある</td></tr>
            <tr><td>空振り三振</td><td>三振（空振り）</td><td>「K」。見逃しと区別したい時だけ向きを変える</td></tr>
            <tr><td>四球</td><td>フォアボール</td><td>「BB」または「四」</td></tr>
            <tr><td>死球</td><td>デッドボール</td><td>「HP」または「死」</td></tr>
            <tr><td>犠打</td><td>送りバント</td><td>「SH」＋処理した守備番号</td></tr>
            <tr><td>犠飛</td><td>犠牲フライ</td><td>「SF」＋守備番号</td></tr>
            <tr><td>E＋番号</td><td>エラー（失策）</td><td>例：E6＝遊撃手の失策で出塁</td></tr>
            <tr><td>FC</td><td>フィルダースチョイス（野選）</td><td>守備側が他の走者を刺しに行き打者が生きた</td></tr>
          </tbody>
        </table>

        <h2>アウトの取り方は「守備番号の順」で書く</h2>
        <p>
          守備でアウトになった打球は、<strong>ボールが渡った守備者を番号でつなげて</strong>書きます。
        </p>
        <ul>
          <li><strong>ショートゴロ</strong>：遊撃手(6)が捕って一塁手(3)へ送球 → <strong>6-3</strong></li>
          <li><strong>セカンドゴロ</strong>：二塁手(4)→一塁手(3) → <strong>4-3</strong></li>
          <li><strong>ピッチャーゴロ</strong>：投手(1)→一塁手(3) → <strong>1-3</strong></li>
          <li><strong>センターフライ</strong>：中堅手(8)が捕球 → <strong>8</strong>（フライは番号だけ、丸で囲む流儀も）</li>
          <li><strong>併殺（ダブルプレー）</strong>：遊撃→二塁→一塁 → <strong>6-4-3</strong></li>
        </ul>
        <div className="point-box">
          <strong>コツ：</strong>数字は「打球を触った順番」。
          最後の番号が<strong>アウトを完成させた塁の守備者</strong>になります。
          ゴロは「捕った人-投げた先」、フライは「捕った人だけ」と覚えればOK。
        </div>

        <AffiliateBox
          heading="📝 スコアブック・記録用品を探す"
          rakuten={["glove", "bat"]}
          retailers
        />

        <AdSlot id="article-mid" />

        <h2>ダイヤモンドと進塁の書き方</h2>
        <p>
          各打者のマスには、小さなダイヤモンド（ホームベース型）が描かれています。
          走者の進塁は、このダイヤの<strong>辺をなぞって</strong>記録します。
        </p>
        <ol>
          <li>打者が出塁したら、<strong>一塁側の辺</strong>に線を引く</li>
          <li>次打者の打撃などで二塁・三塁へ進んだら、その辺を順に塗る</li>
          <li>ホームに還ったら<strong>ダイヤの中心を塗りつぶす</strong>（＝得点）</li>
          <li>どうやって還ったか（打った人の打順や打撃内容）を小さく添えると後で見返しやすい</li>
        </ol>
        <p>
          アウトになった走者は、進んだところまで線を引いて止め、
          <strong>アウトの内容（記号）</strong>を書き添えます。
        </p>

        <h2>1イニングの流れを例で</h2>
        <p>実際の並びで見ると一気に分かります。1番から始まる表の攻撃を例にします。</p>
        <table>
          <thead>
            <tr>
              <th>打順</th>
              <th>結果の記入例</th>
              <th>読み方</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1番</td><td>ー（単打）</td><td>ライト前ヒットで一塁へ</td></tr>
            <tr><td>2番</td><td>SH 1-3</td><td>送りバント、投手が捕って一塁アウト。走者は二塁へ</td></tr>
            <tr><td>3番</td><td>6-3</td><td>ショートゴロでアウト。走者は三塁へ進む</td></tr>
            <tr><td>4番</td><td>ー（単打）→ 得点</td><td>センター前ヒットで三塁走者が生還（中心を塗る）</td></tr>
            <tr><td>5番</td><td>K</td><td>空振り三振でスリーアウト、チェンジ</td></tr>
          </tbody>
        </table>

        <h2>紙？アプリ？ どっちで始める</h2>
        <p>
          今はスマホのスコアアプリも便利ですが、
          <strong>まず紙で記号を覚える</strong>と、アプリの画面も理解が早くなります。
        </p>
        <ul>
          <li><strong>紙</strong>：電池・電波いらず。書く楽しさ・見返す味わい。1冊あると安心</li>
          <li><strong>アプリ</strong>：自動集計・打率計算・チームで共有がラク（
            <a href="/guide/team-apps/">チーム管理・スコアアプリおすすめ</a>で紹介）</li>
        </ul>

        <h2>よくある質問</h2>
        <h3>Q. 途中から代打・守備交代したら？</h3>
        <p>
          選手が変わったら、その欄に<strong>交代のタイミングと新しい選手名</strong>を記入します。
          守備位置が変わった場合も、番号の対応がズレるので忘れず更新しましょう。
        </p>
        <h3>Q. エラーとヒットの区別が難しい</h3>
        <p>
          「守備が普通にできればアウトだった」ならエラー（E＋番号）、
          「うまく打って抜けた」ならヒット。迷ったら記録者の判断でOKですが、
          チーム内で基準をそろえておくと後で揉めません。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/team-apps/">
            → 自動集計したいなら「スコアアプリおすすめ」へ
          </a>
          <a className="cta-inline" href="/guide/game-flow/">
            → 「試合の進め方・基本ルール」も読む
          </a>
          <a className="cta-inline" href="/baseball-dock/">
            → あなたのタイプと似た選手を「野球人間ドック」で診断
          </a>
        </div>

        <RelatedGuides currentHref="/guide/scorebook/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
