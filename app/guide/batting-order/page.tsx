import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の打順の組み方【1〜9番の役割・定石】勝てる並べ方のコツ",
  description:
    "打順は監督・幹事の腕の見せどころ。1番から9番までの各打順に求められる役割と、草野球で勝つための現実的な並べ方のコツを解説。セオリー（1・3・4番）だけでなく、人数がそろわない・実力差が大きい草野球ならではの組み方の考え方までまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/batting-order/` },
  openGraph: {
    title: "草野球の打順の組み方【1〜9番の役割・定石】",
    description:
      "各打順の役割と、草野球で勝てる並べ方のコツ。セオリーと現実的な組み方の両方を解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球の打順の組み方【1〜9番の役割・定石】勝てる並べ方のコツ",
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
        name: "草野球で一番大事な打順はどこですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "得点に直結しやすいのは1番・3番・4番です。特に草野球は四球や出塁が得点につながりやすいため、出塁率の高い選手を1番に置くのが効果的。3・4番には長打やしぶとく打てる選手を置くのがセオリーです。",
        },
      },
      {
        "@type": "Question",
        name: "実力差が大きいチームの打順はどう組めばいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "上位に出塁できる人と長打が期待できる人を固め、下位は無理をさせず『つなぐ・当てる』意識でまとめると得点効率が上がります。初心者を下位に置きつつ、時々良い当たりが出る選手を7〜8番に置くと二巡目以降に効いてきます。",
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

export default function BattingOrderPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球の打順の組み方【1〜9番の役割・定石】勝てる並べ方のコツ</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <p>
          打順を決めるのは、監督や幹事の楽しくも悩ましい仕事。
          「誰を1番に？」「4番は誰が納得する？」——
          チームの雰囲気にも関わるだけに、いい加減には決められません。
          この記事では、<strong>各打順に求められる役割</strong>と、
          プロのセオリーだけでなく<strong>草野球ならではの現実的な組み方</strong>まで解説します。
        </p>

        <AdSlot id="article-top" />

        <h2>1〜9番、それぞれの役割</h2>
        <p>
          まずは基本形。各打順に「求められる仕事」があります。ここを押さえると、
          誰をどこに置くかの判断がぐっとラクになります。
        </p>
        <table>
          <thead>
            <tr>
              <th>打順</th>
              <th>役割</th>
              <th>向いている選手</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1番</td><td>とにかく出塁して流れを作る</td><td>出塁率が高い・足が速い</td></tr>
            <tr><td>2番</td><td>つなぐ・進める（近年は強打者も）</td><td>バット操作がうまい／好打者</td></tr>
            <tr><td>3番</td><td>チーム最強クラスの打者</td><td>打率・長打の両立</td></tr>
            <tr><td>4番</td><td>返す。長打で一気に得点</td><td>パワーがある・勝負強い</td></tr>
            <tr><td>5番</td><td>4番の後を打つ二の矢</td><td>長打力のある打者</td></tr>
            <tr><td>6〜7番</td><td>下位のつなぎ役</td><td>粘れる・当てられる</td></tr>
            <tr><td>8〜9番</td><td>一巡して1番につなぐ</td><td>足がある・出塁できると理想</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>得点に直結するのは「1・3・4番」：</strong>
          出塁する1番、返せる3・4番。この3枚をどう組むかで得点力が大きく変わります。
          迷ったら、まず<strong>「一番出塁できる人を1番、一番打てる人を3番か4番」</strong>から考えましょう。
        </div>

        <h2>草野球で意識したい「出塁率」</h2>
        <p>
          プロと違い、草野球は<strong>四球やエラーでの出塁が多い</strong>のが特徴。
          つまり、打率が高い人よりも<strong>「アウトになりにくい人＝出塁率が高い人」</strong>を
          上位に置くほうが、得点につながりやすいのです。
        </p>
        <ul>
          <li>ヒットは少なくても<strong>四球をよく選ぶ人</strong>は、立派な1番候補</li>
          <li>三振が少なく<strong>とにかく前に飛ばせる人</strong>は、上位でつなぎ役に</li>
          <li>逆に「豪快だけど三振も多い人」は、走者をためて返す<strong>4番</strong>向き</li>
        </ul>
        <p>
          自分やチームの出塁率を把握したいなら、簡単に成績を管理できるアプリを使うのも手です（
          <a href="/guide/team-apps/">チーム管理・スコアアプリおすすめ7選</a>）。
          数字が見えると、打順の説得力も増します。
        </p>

        <AdSlot id="article-mid" />

        <h2>実力差が大きいチームの現実的な組み方</h2>
        <p>
          草野球のリアルは「9人がそろわない」「経験者と初心者が混在」。
          セオリー通りにいかないのが普通です。そんなときの考え方はこれ。
        </p>
        <table>
          <thead>
            <tr>
              <th>状況</th>
              <th>組み方のコツ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>経験者と初心者が混在</td>
              <td>上位に打てる人を集めて確実に得点。下位は「当てる・つなぐ」意識で無理させない</td>
            </tr>
            <tr>
              <td>人数ギリギリ</td>
              <td>守備の負担が大きい人を上位に置くと消耗する。体力も考慮して配置</td>
            </tr>
            <tr>
              <td>初心者に活躍してほしい</td>
              <td>プレッシャーの少ない下位（7〜9番）に。時々良い当たりが二巡目に効く</td>
            </tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>草野球ならではの配慮：</strong>
          打順は勝敗だけでなく<strong>「みんなが楽しめるか」</strong>も大事な軸。
          いつも同じ人が下位…では気持ちが続きません。
          勝ちにこだわる日と、全員に見せ場を作る日と、
          チームの空気に合わせて柔軟に組み替えるのが、長続きの秘訣です。
        </div>

        <h2>並べ方の3つの定石（まとめ）</h2>
        <ol>
          <li>
            <strong>一番出塁できる人を1番に</strong>：
            打率より「アウトにならない力」。四球も立派な出塁
          </li>
          <li>
            <strong>一番打てる人を3番か4番に</strong>：
            走者をためて返す。長打があれば4番、確実性なら3番
          </li>
          <li>
            <strong>下位は“つなぐ”意識でまとめる</strong>：
            8・9番に出塁できる人がいると、上位に回って二巡目が強くなる
          </li>
        </ol>

        <h2>よくある質問</h2>
        <h3>Q. 2番に強打者を置く「強い2番」は草野球でもアリ？</h3>
        <p>
          アリです。近年のプロでも主流の考え方で、
          好打者を早い打順に置くほど打席が多く回ってきます。
          ただし草野球では、まず<strong>1・3・4番の3枚を固めてから</strong>考えるのが現実的です。
        </p>
        <h3>Q. 打順は毎試合変えてもいい？</h3>
        <p>
          もちろん。むしろ出席メンバーが毎回変わる草野球では、
          <strong>その日のベストを組み直す</strong>のが当たり前。
          固定にこだわらず、調子や出欠に合わせて柔軟に組みましょう。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/soft-batting/">
            → 打撃を上げたい人は「軟式の打ち方のコツ【動画つき】」
          </a>
          <a className="cta-inline" href="/guide/game-flow/">
            → 「試合の進め方・基本ルール完全ガイド」も読む
          </a>
        </div>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
