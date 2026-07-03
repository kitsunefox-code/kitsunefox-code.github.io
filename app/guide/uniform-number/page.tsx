import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の背番号の決め方【人気番号・意味・ルール】番号かぶり対策も",
  description:
    "草野球の背番号はどう決める？プロ野球で有名な番号の意味、ポジション別の伝統、人気番号ランキング、チーム内で揉めない決め方、リーグの番号ルールまで徹底解説します。",
  alternates: { canonical: `${SITE_URL}/guide/uniform-number/` },
  openGraph: {
    title: "草野球の背番号の決め方【人気番号・意味・ルール】",
    description:
      "エースナンバー18の由来から、揉めない決め方まで。背番号の全知識。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球の背番号の決め方【人気番号・意味・ルール】番号かぶり対策も",
    inLanguage: "ja",
    dateModified: "2026-07-03",
    author: { "@type": "Organization", name: "草野球ユニフォーム比較ナビ" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  );
}

export default function UniformNumberPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球の背番号の決め方【人気番号・意味・ルール】番号かぶり対策も</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          ユニフォームを作るとき、意外と盛り上がる（そして揉める）のが背番号決め。
          この記事では<strong>番号の意味と伝統</strong>、<strong>人気番号</strong>、
          <strong>チームで揉めない決め方</strong>を解説します。
        </p>

        <AdSlot id="article-top" />

        <h2>まず知っておきたい：背番号の伝統的な意味</h2>
        <p>
          日本の野球では、番号ごとに「らしさ」の伝統があります。守るもよし、あえて外すもよし。
        </p>
        <table>
          <thead>
            <tr>
              <th>番号</th>
              <th>伝統的な意味</th>
              <th>代表的な選手</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>1</strong></td><td>エース級の野手・チームの顔</td><td>王貞治、山田哲人</td></tr>
            <tr><td><strong>2</strong></td><td>捕手・堅実な野手の番号</td><td>小林誠司、デレク・ジーター(MLB)</td></tr>
            <tr><td><strong>3</strong></td><td>強打者の番号</td><td>長嶋茂雄、松井秀喜</td></tr>
            <tr><td><strong>6</strong></td><td>ショートの名手</td><td>坂本勇人、井端弘和</td></tr>
            <tr><td><strong>7</strong></td><td>俊足巧打の外野手</td><td>糸井嘉男、西川遥輝</td></tr>
            <tr><td><strong>10</strong></td><td>（アマでは）主将・正捕手の番号</td><td>高校野球の捕手</td></tr>
            <tr><td><strong>18</strong></td><td>エースナンバー（投手の最高峰）</td><td>田中将大、前田健太、山本由伸</td></tr>
            <tr><td><strong>51</strong></td><td>特別なスターの番号</td><td>イチロー</td></tr>
            <tr><td><strong>55</strong></td><td>ホームランバッター</td><td>松井秀喜、大谷翔平(日ハム時代は11)</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>豆知識：</strong>
          エースナンバー「18」の由来は諸説ありますが、歌舞伎の「十八番（おはこ）＝最も得意な芸」
          から来ているという説が有名です。
        </div>

        <h2>草野球の人気番号と傾向</h2>
        <ul>
          <li><strong>1・7・18・51</strong>：どのチームでも争奪戦になりがちな4強</li>
          <li><strong>誕生日番号</strong>（例：6月24日生まれ→24）：理由が明快で被っても譲り合いやすい</li>
          <li><strong>ゾロ目（11・22・33…）</strong>：見た目が良く、昇華プリントでも映える</li>
          <li><strong>0・00</strong>：使えるリーグなら個性派に人気（連盟によっては不可）</li>
          <li><strong>好きなプロ選手と同じ番号</strong>：草野球の王道。飲み会での話のネタにもなる</li>
        </ul>

        <h2>リーグ・連盟のルールに注意</h2>
        <ul>
          <li>多くの軟式連盟では<strong>0〜99の整数</strong>が基本。「00」や3桁は不可の場合あり</li>
          <li>大会によっては<strong>監督30・主将10</strong>など役職番号の指定がある（高野連系の慣習）</li>
          <li>同一チーム内の<strong>番号重複は不可</strong>。ユニフォーム発注前にリーグ規定を必ず確認</li>
        </ul>

        <h2>チームで揉めない決め方 3パターン</h2>
        <ol>
          <li>
            <strong>先着順（募集フォーム方式）</strong>：
            LINEやスプレッドシートで「第3希望まで」書いてもらい、早い者勝ち。一番シンプル
          </li>
          <li>
            <strong>抽選＋トレード可</strong>：
            全員くじ引きで仮決定→当人同士の交換は自由。運任せなので恨みっこなし
          </li>
          <li>
            <strong>ポジション・役職優先</strong>：
            エース投手に18、捕手に2、主将に10を先に確保→残りは自由。野球らしさ重視のチーム向け
          </li>
        </ol>
        <div className="point-box">
          <strong>実務アドバイス：</strong>
          発注後の番号変更は作り直し（=追加費用）になります。決定後に
          <strong>全員の番号一覧を書面（LINEノート等）で確認</strong>してから発注しましょう。
          「28と29を取り違えた」は定番の事故です。
        </div>

        <h2>番号が決まったら：ユニフォームの背番号仕様</h2>
        <ul>
          <li><strong>サイズ</strong>：背番号は25cm前後が標準。連盟によって最低サイズ規定あり</li>
          <li><strong>書体</strong>：角ゴシック（力強い）・丸ゴシック（親しみ）・筆記体風（オシャレ）から選択</li>
          <li><strong>昇華なら</strong>：番号のグラデーションや縁取りも追加料金なしのメーカーが多い</li>
          <li><strong>胸番号・袖番号</strong>：追加すると1ヶ所500〜1,000円が相場（込み価格のメーカーもあり）</li>
        </ul>
        <a className="cta-inline" href="/#compare">
          → 背番号込み価格のメーカーを比較表でチェック
        </a>

        <AdSlot id="article-bottom" />
      </article>
    </main>
  );
}
