import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球ユニフォームの作り方【7ステップ】費用相場と失敗しないコツ",
  description:
    "草野球チームのユニフォーム作成を7ステップで解説。1着あたりの費用相場、昇華と刺繍の違い、最低ロット・納期の考え方、よくある失敗例まで。初めてでも迷わず注文できます。",
  alternates: { canonical: `${SITE_URL}/guide/uniform-how-to/` },
  openGraph: {
    title: "草野球ユニフォームの作り方【7ステップ】費用相場と失敗しないコツ",
    description:
      "草野球チームのユニフォーム作成を7ステップで解説。費用相場・昇華と刺繍の違い・納期の逆算・失敗例まで。",
    type: "article",
  },
};

// 記事の構造化データ（Article + HowTo）
function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球ユニフォームの作り方【7ステップ】費用相場と失敗しないコツ",
    inLanguage: "ja",
    dateModified: "2026-07-03",
    author: { "@type": "Organization", name: "草野球ユニフォーム比較ナビ" },
  };
  const howto = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "草野球ユニフォームの作り方",
    step: [
      { "@type": "HowToStep", name: "チームの要望をまとめる" },
      { "@type": "HowToStep", name: "予算と枚数を決める" },
      { "@type": "HowToStep", name: "昇華か刺繍かを選ぶ" },
      { "@type": "HowToStep", name: "メーカーを2〜3社に絞って見積もり" },
      { "@type": "HowToStep", name: "デザインを作成・確認する" },
      { "@type": "HowToStep", name: "サイズを集めて発注する" },
      { "@type": "HowToStep", name: "検品して受け取る" },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howto) }}
      />
    </>
  );
}

export default function UniformHowToPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球ユニフォームの作り方【7ステップ】費用相場と失敗しないコツ</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約8分</p>

        <p>
          「チームを立ち上げたけど、ユニフォームってどこでどう作ればいいの？」——
          草野球あるあるの悩みです。実は注文の流れさえ分かれば、
          <strong>最短2〜3週間・1人1万円前後</strong>で本格的なユニフォームが作れます。
          この記事では、初めてでも失敗しない作り方を7ステップで解説します。
        </p>

        <AdSlot id="article-top" />

        <h2>まず結論：作成の全体像</h2>
        <ul>
          <li>費用相場：上下セットで<strong>1人 8,000円〜13,000円</strong>（帽子込みだと+2,000円前後）</li>
          <li>納期：注文確定から<strong>2週間〜1ヶ月半</strong>（方式・時期による）</li>
          <li>最低枚数：<strong>1着〜OK</strong>のメーカーと<strong>5〜10枚〜</strong>のメーカーがある</li>
          <li>方式は大きく<strong>昇華プリント</strong>と<strong>刺繍（マーキング）</strong>の2種類</li>
        </ul>
        <div className="point-box">
          <strong>ポイント：</strong>
          春の開幕（3〜4月）前はどのメーカーも混み合い、納期が通常より延びます。
          開幕に間に合わせたいなら<strong>1〜2月中の発注</strong>が安全圏です。
        </div>

        <h2>ステップ1：チームの要望をまとめる</h2>
        <p>まずはLINEグループなどで以下の3点だけ決めましょう。全会一致は不要、キャプテンが叩き台を作るのが早いです。</p>
        <ul>
          <li><strong>ベースカラー</strong>（白系／グレー系／カラー系）</li>
          <li><strong>イメージ</strong>（プロ球団風？メジャー風？オリジナル？）</li>
          <li><strong>入れる要素</strong>（チーム名・背番号・背ネーム・袖ロゴ・スポンサー枠）</li>
        </ul>
        <p>
          参考にしたいプロ球団やチームの<strong>写真を集めておく</strong>と、
          後のデザイン相談が圧倒的にスムーズです。
        </p>
        <div className="point-box">
          <strong>写真があるなら近道：</strong>
          当サイトの<a href="/shindan/">ぴったり診断</a>にイメージ写真をアップすると、
          色味と条件からおすすめメーカーを自動で提案します。
        </div>

        <h2>ステップ2：予算と枚数を決める</h2>
        <table>
          <thead>
            <tr>
              <th>予算感（上下セット）</th>
              <th>できること</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>〜8,000円</td>
              <td>昇華プリントのセット。デザイン自由度は高い。激安系メーカー中心</td>
            </tr>
            <tr>
              <td>8,000〜12,000円</td>
              <td>もっとも標準的。昇華フルデザイン or 刺繍マーク込みが狙える</td>
            </tr>
            <tr>
              <td>12,000円〜</td>
              <td>大手ブランドや本格刺繍、フルオーダー。プロ仕様の質感</td>
            </tr>
          </tbody>
        </table>
        <p>
          枚数は<strong>「今いる人数＋2〜3枚」</strong>が定石。
          後から入るメンバーの追加注文は1着から受けてくれるメーカーが多いですが、
          <strong>同じ生地・同じ色味で作れる保証があるか</strong>を先に確認しておくと安心です。
        </p>

        <h2>ステップ3：昇華か刺繍かを選ぶ</h2>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>昇華プリント</th>
              <th>刺繍・マーキング</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>デザイン自由度</strong></td>
              <td>◎ グラデ・迷彩・総柄も可能</td>
              <td>○ 定番の配置が中心</td>
            </tr>
            <tr>
              <td><strong>見た目</strong></td>
              <td>スポーティ・現代的</td>
              <td>立体感があり高級・伝統的</td>
            </tr>
            <tr>
              <td><strong>重さ・着心地</strong></td>
              <td>軽い（生地に染み込む）</td>
              <td>マーク部分にやや重み</td>
            </tr>
            <tr>
              <td><strong>価格</strong></td>
              <td>安い傾向</td>
              <td>やや高い傾向</td>
            </tr>
            <tr>
              <td><strong>向いてるチーム</strong></td>
              <td>デザイン重視・低予算・若いチーム</td>
              <td>本格志向・プロ球団風にしたいチーム</td>
            </tr>
          </tbody>
        </table>
        <p>
          迷ったら<strong>昇華</strong>が無難です。近年は昇華の品質が上がり、
          草野球では6〜7割が昇華と言われるほど主流になっています。
        </p>

        <h2>ステップ4：メーカーを2〜3社に絞って見積もり</h2>
        <p>
          メーカー選びの軸は「<strong>価格・最低ロット・納期・方式</strong>」の4つ。
          1社だけで決めず、<strong>2〜3社で相見積もり</strong>を取るのが鉄則です。
          同じデザインでも総額で1〜2万円変わることは珍しくありません。
        </p>
        <ul>
          <li>表示価格に<strong>胸マーク・背番号・背ネームが含まれるか</strong>を必ず確認</li>
          <li>デザイン修正が<strong>何回まで無料か</strong>も確認（無制限のメーカーもある）</li>
          <li>サンプル貸し出しがあるメーカーなら<strong>実物の生地</strong>を確認できる</li>
        </ul>
        <a className="cta-inline" href="/#compare">
          → 主要10社の価格・ロット・納期を比較表で見る
        </a>

        <h2>ステップ5：デザインを作成・確認する</h2>
        <p>デザインの作り方は3パターンあります。</p>
        <ol>
          <li>
            <strong>Webシミュレーターで自作</strong>：
            ZETTやILB-MAXなどはサイト上で色やマークを選ぶだけで完成イメージが見られます
          </li>
          <li>
            <strong>デザイナーに依頼</strong>：
            WAKKUONなどはプロが要望と参考写真からデザイン案を無料作成
          </li>
          <li>
            <strong>手描きラフを送る</strong>：
            多くのメーカーが手描きスケッチからデータ化に対応
          </li>
        </ol>
        <div className="point-box">
          <strong>失敗防止：</strong>
          確認用デザイン（校正データ）は<strong>スマホではなくPCの大画面で</strong>、
          複数人でチェック。「背ネームのローマ字ミス」「袖の左右逆」は定番の事故です。
        </div>

        <h2>ステップ6：サイズを集めて発注する</h2>
        <ul>
          <li>サイズ表は<strong>メーカーごとに寸法が違う</strong>ため、「普段Lだから L」は危険</li>
          <li>野球ユニフォームは<strong>やや大きめ（ワンサイズ上）</strong>を選ぶ人が多い（アンダーシャツを着るため）</li>
          <li>迷うメンバーには<strong>身長・体重の目安表</strong>を展開して各自申告してもらう</li>
          <li>集金は発注前に済ませる（立て替えトラブル防止）</li>
        </ul>

        <h2>ステップ7：検品して受け取る</h2>
        <p>
          届いたら全員分を配る前に<strong>枚数・背番号・ネームの綴り・サイズ</strong>を検品しましょう。
          万一の不備はほとんどのメーカーが無償対応してくれますが、
          受け取りから期間が空くと対応が難しくなります。
        </p>

        <h2>よくある失敗例と対策</h2>
        <table>
          <thead>
            <tr>
              <th>失敗例</th>
              <th>対策</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>開幕に間に合わなかった</td>
              <td>納期＋1〜2週間の余裕を持って発注。春前は特に前倒し</td>
            </tr>
            <tr>
              <td>マーク代で想定より高くなった</td>
              <td>「込み価格」のメーカーを選ぶか、見積もりで総額を確認</td>
            </tr>
            <tr>
              <td>追加メンバーの分だけ色味が違う</td>
              <td>追加注文の同色保証があるメーカーを最初から選ぶ</td>
            </tr>
            <tr>
              <td>サイズが小さくて着られない</td>
              <td>メーカーの寸法表で確認。迷ったら大きめ</td>
            </tr>
            <tr>
              <td>連盟の規定に合わなかった</td>
              <td>所属リーグのユニフォーム規定（色・ロゴ等）を発注前に確認</td>
            </tr>
          </tbody>
        </table>

        <h2>まとめ：迷ったらこの順番で</h2>
        <ol>
          <li>参考写真を集めて要望をまとめる</li>
          <li>予算（1人あたり）と枚数を決める</li>
          <li>昇華 or 刺繍を決める</li>
          <li>比較表で2〜3社に絞って相見積もり</li>
          <li>デザイン確認は複数人・PC画面で</li>
        </ol>
        <a className="cta-inline" href="/shindan/">
          → イメージ写真からぴったりのメーカーを診断する（無料・30秒）
        </a>

        <AdSlot id="article-bottom" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
