import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球ユニフォームの作り方【7ステップ】費用相場と失敗しないコツ",
  description:
    "草野球チームのユニフォーム作成を、初めての人がつまずかない順番で解説。1着あたりの費用相場、昇華と刺繍の違い、最低ロット・納期の考え方、経験者が語るよくある失敗例まで。読み終えるころには、もう迷いません。",
  alternates: { canonical: `${SITE_URL}/guide/uniform-how-to/` },
  openGraph: {
    title: "草野球ユニフォームの作り方【7ステップ】費用相場と失敗しないコツ",
    description:
      "初めてでも迷わない7ステップ。費用相場・昇華と刺繍の違い・納期の逆算・失敗例まで、経験者がまるごと解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球ユニフォームの作り方【7ステップ】費用相場と失敗しないコツ",
    inLanguage: "ja",
    dateModified: "2026-07-04",
    author: { "@type": "Organization", name: "草野球ナビ" },
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
          チームが動き出して、ふと幹事に回ってきた「ユニフォーム、どうする？」の一言。
          胸が高鳴る反面、いざ調べ始めると<strong>昇華？刺繍？最低ロット？</strong>と
          聞き慣れない言葉が並んで、思わずタブを閉じたくなった人もいるはずです。
        </p>
        <p>
          でも安心してください。ユニフォーム作りは、
          <strong>やることの順番さえ分かれば、そんなに難しくありません。</strong>
          相場は上下セットで1人1万円前後。最短なら2〜3週間で、
          あの“寄せ集めの集団”が、そろいの一着で一気に「チーム」になります。
          この記事は、初めての幹事が迷わずゴールまで走り切れるよう、7つのステップに整理しました。
        </p>

        <AdSlot id="article-top" />

        <h2>先に全体像だけ（ここだけ読めばOK）</h2>
        <p>
          細かい話に入る前に、ゴールまでの地図を渡しておきます。
          これだけ頭に入れておけば、あとは各ステップを埋めていくだけです。
        </p>
        <ul>
          <li>費用相場：上下セットで<strong>1人 8,000〜13,000円</strong>（帽子込みで＋2,000円ほど）</li>
          <li>納期：注文確定から<strong>2週間〜1ヶ月半</strong>。春の開幕前は混むので前倒しが鉄則</li>
          <li>最低枚数：<strong>1着〜</strong>のメーカーもあれば<strong>5〜10枚〜</strong>のところも</li>
          <li>加工方式：大きく<strong>昇華プリント</strong>と<strong>刺繍（マーキング）</strong>の2種類</li>
        </ul>
        <div className="point-box">
          <strong>いちばん大事な一点：</strong>
          春（3〜4月）の開幕前は、どのメーカーも注文が殺到して納期が延びます。
          「開幕に間に合わなかった」は毎年どこかで起きる悲劇。
          間に合わせたいなら<strong>1〜2月中の発注</strong>が安全圏です。
        </div>

        <h2>ステップ1：チームの“ふわっとした理想”を言葉にする</h2>
        <p>
          最初にやることは、デザインを決めることではありません。
          <strong>「どんな感じにしたいか」を3つだけ決める</strong>ことです。
          全会一致を目指すと沼にハマるので、幹事が叩き台を作ってしまうのがコツ。
        </p>
        <ul>
          <li><strong>ベースカラー</strong>（白系／グレー系／カラー系のどれか）</li>
          <li><strong>ざっくりの方向性</strong>（プロ球団っぽく？メジャー風？完全オリジナル？）</li>
          <li><strong>入れる要素</strong>（チーム名・背番号・背ネーム・袖ロゴなど）</li>
        </ul>
        <p>
          このとき、<strong>「いいな」と思うユニフォームの写真を数枚集めておく</strong>と、
          後のデザイン相談が驚くほどスムーズになります。
          言葉で「かっこよく」と伝えるより、画像を1枚見せるほうが100倍早い。
        </p>
        <div className="point-box">
          写真が手元にあるなら、当サイトの<a href="/shindan/">ぴったり診断</a>が近道です。
          イメージ画像をアップすると配色を解析して、あなたのチームに合うメーカーを提案します。
        </div>

        <h2>ステップ2：予算と枚数を決める</h2>
        <p>
          方向性が見えたら、次はお金と人数。ここは現実的に握っておくほど後がラクです。
          予算帯ごとに「できること」の目安を並べておきます。
        </p>
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
              <td>昇華プリントのセット。デザインの自由度は高い。激安系メーカー中心</td>
            </tr>
            <tr>
              <td>8,000〜12,000円</td>
              <td>もっとも標準的な価格帯。昇華フルデザイン、または刺繍マーク込みが狙える</td>
            </tr>
            <tr>
              <td>12,000円〜</td>
              <td>大手ブランドや本格刺繍、フルオーダー。プロ仕様の質感に</td>
            </tr>
          </tbody>
        </table>
        <p>
          枚数は<strong>「今いる人数＋2〜3枚」</strong>が定石。
          あとから入るメンバーの分は1着から追加できるメーカーが多いですが、
          そのときに<strong>同じ生地・同じ色味で作れる保証があるか</strong>だけは
          先に確認しておくと安心です。数ヶ月後に「なんか色が違う…」を防げます。
        </p>

        <h2>ステップ3：昇華か刺繍か、を選ぶ</h2>
        <p>
          ユニフォーム選びで最初にぶつかる分かれ道が、この加工方式です。
          難しく考えず、<strong>「派手め・自由なデザインなら昇華」「シンプル・本格志向なら刺繍」</strong>
          とざっくり捉えて大丈夫。違いを表にまとめました。
        </p>
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
              <td>◎ グラデ・迷彩・総柄までOK</td>
              <td>○ 定番の配置が中心</td>
            </tr>
            <tr>
              <td><strong>見た目</strong></td>
              <td>スポーティ・現代的</td>
              <td>立体感があり高級・伝統的</td>
            </tr>
            <tr>
              <td><strong>着心地</strong></td>
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
          迷ったら<strong>昇華</strong>が無難です。近年は昇華の品質がぐっと上がり、
          いまや草野球の6〜7割が昇華とも言われるほど主流。
          色数が増えても追加料金がかからないのも、幹事にはありがたいポイントです。
        </p>

        <h2>ステップ4：2〜3社に絞って“相見積もり”を取る</h2>
        <p>
          ここが総額を左右する、いちばん大事な工程です。
          <strong>1社だけで決めないこと。</strong>
          同じデザインでも、メーカーによって総額が1〜2万円変わることは珍しくありません。
          比較の軸は「価格・最低ロット・納期・方式」の4つ。
        </p>
        <ul>
          <li>表示価格に<strong>胸マーク・背番号・背ネームが含まれるか</strong>を必ず確認（ここで実質価格が化けます）</li>
          <li>デザイン修正が<strong>何回まで無料か</strong>（無制限のメーカーもあります）</li>
          <li>サンプル貸し出しがあれば<strong>実物の生地感</strong>を触って確かめられる</li>
        </ul>
        <a className="cta-inline" href="/#compare">
          → 主要13社の価格・ロット・納期を比較ランキングで見る
        </a>

        <h2>ステップ5：デザインを作って、みんなで確認する</h2>
        <p>デザインの作り方は、大きく3パターン。あなたのチームに合う方法を選べば大丈夫です。</p>
        <ol>
          <li>
            <strong>Webシミュレーターで自作</strong>：
            ZETTやILB-MAXなどは、サイト上で色やマークを選ぶだけで完成イメージが見られます
          </li>
          <li>
            <strong>プロにおまかせ</strong>：
            WAKKUONなどは、要望と参考写真からデザイナーが無料で案を作ってくれます
          </li>
          <li>
            <strong>手描きラフを送る</strong>：
            紙に描いたスケッチからデータ化してくれるメーカーも多数
          </li>
        </ol>
        <div className="point-box">
          <strong>ここで気を抜かない：</strong>
          確認用のデザイン（校正データ）は、<strong>スマホの小さい画面ではなくPCの大画面で、複数人でチェック</strong>。
          「背ネームのローマ字が1文字違う」「袖の左右が逆」は、毎年どこかで起きる定番の事故です。
        </div>

        <AdSlot id="article-bottom" />

        <h2>ステップ6：サイズを集めて、発注する</h2>
        <p>
          デザインが固まったら、いよいよ発注。その前にサイズ集めがあります。
          ここでの油断が、届いてからの「着られない…」を生みます。
        </p>
        <ul>
          <li><strong>メーカーごとに寸法が違う</strong>ので、「普段Lだから L」は危険。必ずそのメーカーのサイズ表で確認を</li>
          <li>野球ユニフォームは<strong>ワンサイズ上</strong>を選ぶ人が多め（下にアンダーシャツを着るため）</li>
          <li>迷うメンバーには<strong>身長・体重の目安表</strong>を共有して、各自に申告してもらう</li>
          <li>集金は<strong>発注前に</strong>済ませる。立て替えは幹事の心をすり減らします</li>
        </ul>

        <h2>ステップ7：検品して、受け取る</h2>
        <p>
          届いたら、みんなに配る前にひと呼吸。
          <strong>枚数・背番号・ネームの綴り・サイズ</strong>をざっと検品しましょう。
          万一の不備は、たいていのメーカーが無償で対応してくれます。
          ただし受け取りから時間が空くほど対応が難しくなるので、確認は届いたその日のうちに。
        </p>

        <h2>経験者が語る、よくある失敗と対策</h2>
        <p>
          最後に、先輩幹事たちが実際にやらかしてきた“あるある”を、対策とセットで置いておきます。
          読んでおくだけで、同じ轍を踏まずに済みます。
        </p>
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
              <td>納期＋1〜2週間の余裕をもって発注。春前はとくに前倒し</td>
            </tr>
            <tr>
              <td>マーク代で想定より高くなった</td>
              <td>「込み価格」のメーカーを選ぶか、見積もりで必ず総額を確認</td>
            </tr>
            <tr>
              <td>追加メンバーの分だけ色味が違う</td>
              <td>追加注文の同色保証があるメーカーを最初から選ぶ</td>
            </tr>
            <tr>
              <td>サイズが小さくて着られない</td>
              <td>メーカーの寸法表で確認。迷ったら大きめを選ぶ</td>
            </tr>
            <tr>
              <td>連盟の規定に合わなかった</td>
              <td>所属リーグのユニフォーム規定（色・ロゴ等）を発注前に確認</td>
            </tr>
          </tbody>
        </table>

        <h2>まとめ：迷ったら、この順番で</h2>
        <p>
          長く感じたかもしれませんが、やることはシンプルです。
          この5つをなぞれば、初めてでもちゃんとゴールにたどり着けます。
        </p>
        <ol>
          <li>参考写真を集めて、理想を言葉にする</li>
          <li>1人あたりの予算と枚数を決める</li>
          <li>昇華か刺繍かを選ぶ</li>
          <li>比較ランキングで2〜3社に絞り、相見積もりを取る</li>
          <li>デザイン確認は、複数人・PC画面で</li>
        </ol>
        <a className="cta-inline" href="/shindan/">
          → イメージ写真からぴったりのメーカーを診断する（無料・30秒）
        </a>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
