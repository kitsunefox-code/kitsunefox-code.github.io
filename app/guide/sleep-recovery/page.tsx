import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import { SITE_URL } from "@/data/site";

// ⚠️ この記事は寝具・ケア用品の広告を含む。薬機法・景表法に触れないよう、
//    「治る」「効く」「改善する」といった効果の断定は書かない。
//    メーカーの説明は「〜とうたっている」と出典を示す形にとどめ、
//    痛みが続く場合は医療機関へ、と明記する。
export const metadata: Metadata = {
  title: "草野球の翌日がつらい人へ｜疲れを残さない睡眠と、腰を守る寝具の考え方",
  description:
    "30代40代の草野球は、試合そのものより翌日がきつい。回復の本体は実は睡眠で、寝ている間の姿勢は腰の負担に直結します。寝返りと寝具の関係、高反発と低反発の違い、買い替えの判断、磁気・チタン系ギアの位置づけまで、誇張せずに整理しました。痛みが続くときに受診すべき目安もまとめています。",
  alternates: { canonical: `${SITE_URL}/guide/sleep-recovery/` },
  openGraph: {
    title: "草野球の翌日がつらい人へ｜疲れを残さない睡眠と、腰を守る寝具の考え方",
    description:
      "回復の本体は睡眠。寝返りと寝具の関係、高反発と低反発の違い、買い替えの判断までを誇張せずに整理。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球の翌日がつらい人へ｜疲れを残さない睡眠と、腰を守る寝具の考え方",
    inLanguage: "ja",
    dateModified: "2026-10-15",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "試合の翌日に体が重いのはなぜですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "普段動かさない動き（全力疾走、投球、スイング）を短時間にまとめて行うためです。とくに週末だけプレーする人は、平日に使わない筋肉を急に使うので、張りや筋肉痛が出やすくなります。試合後のクールダウンと睡眠で回復の速さは変わりますが、年齢とともに回復に時間がかかるのは自然なことです。無理に追い込まず、翌日に軽く体を動かす方が楽になることもあります。",
        },
      },
      {
        "@type": "Question",
        name: "高反発と低反発、どちらを選べばいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "寝返りの打ちやすさを重視するなら高反発、包まれる寝心地を求めるなら低反発が一般的な整理です。ただし体重や体型、好みで合うものは変わります。どちらが優れているという話ではないので、返品・返金の条件がある製品を選び、実際に数週間寝てみて判断するのが確実です。",
        },
      },
      {
        "@type": "Question",
        name: "磁気ネックレスやチタンテープは効果がありますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "当サイトは医療機関ではないため、効果の有無を断定しません。各メーカーが公表している説明をご確認のうえ、ご自身で判断してください。痛みやしびれが続く場合は、グッズに頼らず整形外科など医療機関を受診してください。",
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

export default function SleepRecoveryPage() {
  return (
    <main>
      <StructuredData />

      <div className="hero" style={{ padding: "34px 0 22px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Guide
          </p>
          <h1 style={{ fontSize: "clamp(21px, 4.2vw, 33px)", margin: "0 0 10px" }}>
            草野球の<span className="hl">翌日がつらい</span>人へ
          </h1>
          <p>
            試合そのものより、翌日がきつい——30代40代の草野球あるあるです。
            ストレッチや入浴はよく語られますが、<strong>回復の本体は睡眠</strong>で、
            しかも寝ている間の姿勢は腰の負担に直結します。
            ここでは誇張せずに、何が効いて何が気休めなのかを整理します。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <article className="article">
          <AdSlot id="article-top" />

          <h2>翌日に残るのは「疲労」だけではない</h2>
          <p>
            週末だけプレーする人の体に起きているのは、ざっくり2種類です。
          </p>
          <ul>
            <li>
              <strong>筋肉の張り・筋肉痛</strong>——普段使わない動きを短時間にまとめてやった結果。
              これは時間とともに引きます。
            </li>
            <li>
              <strong>腰・肩の重さ</strong>——同じ姿勢の繰り返し（投球・スイング）や、
              準備不足のまま全力を出したことによる負担。こちらは<strong>放っておくと翌週に持ち越します</strong>。
            </li>
          </ul>
          <p>
            前者は休めば戻ります。やっかいなのは後者で、
            「週末ごとに腰が重いまま次の試合が来る」という状態が続くと、
            そのうち痛みに変わります。ここを切るのが、長く続けるための分かれ目です。
          </p>

          <h2>回復の本体は、ストレッチより睡眠</h2>
          <p>
            試合後のストレッチや入浴はもちろん有効ですが、時間で言えば数十分です。
            一方、睡眠は<strong>6〜8時間</strong>。体を立て直す時間として圧倒的に長い。
            つまり「寝ている間にどういう姿勢でいるか」は、
            ストレッチの出来より影響が大きい可能性があります。
          </p>
          <p>
            とくに見落とされがちなのが<strong>寝返り</strong>です。
            人は一晩に20〜30回ほど寝返りを打つと言われますが、これは
            同じ場所に体重がかかり続けるのを避けるための自然な動きです。
            寝返りが打ちにくい寝床だと、朝起きたときに腰や肩が固まった感じになります。
          </p>
          <p className="note">
            ※ 睡眠時間や寝返りの回数には個人差があります。ここでは
            「寝返りを打ちやすいかどうかが寝起きの体感に関わる」という一般的な整理として書いています。
          </p>

          <h2>高反発と低反発の違い（どちらが上という話ではない）</h2>
          <table>
            <thead>
              <tr>
                <th>タイプ</th>
                <th>寝返り</th>
                <th>寝心地</th>
                <th>向いている人</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>高反発</td>
                <td>打ちやすい</td>
                <td>押し返される感じ</td>
                <td>寝起きに腰や肩の重さを感じる人、体格のいい人</td>
              </tr>
              <tr>
                <td>低反発</td>
                <td>やや打ちにくい</td>
                <td>包み込まれる感じ</td>
                <td>やわらかい寝心地が好きな人、体重が軽めの人</td>
              </tr>
            </tbody>
          </table>
          <p>
            草野球世代（30〜50代）で「朝、腰が固まっている」という人は、
            <strong>寝返りの打ちやすさ</strong>を基準に見てみる価値があります。
            ただし体重・体型・好みで合うものは変わるので、
            <strong>返品・返金の条件がある製品を選び、数週間試してから判断する</strong>のが確実です。
            1泊で結論は出ません。
          </p>

          <h2>買い替えを考える目安</h2>
          <ul>
            <li>
              <strong>真ん中がへこんでいる</strong>——腰が沈む形になり、
              寝返りが打ちにくくなります。見た目で分かるくらいなら替えどきです。
            </li>
            <li>
              <strong>朝のほうが体が重い</strong>——寝て回復するどころか、
              寝ている間に負担がかかっているサインかもしれません。
            </li>
            <li>
              <strong>別の場所で寝ると調子がいい</strong>——出張先や実家のほうが楽なら、
              寝具が合っていない可能性があります。
            </li>
          </ul>
          <p>
            敷布団・マットレスは安い買い物ではないので、
            <strong>「何年使ったか」より「いま体がどうか」</strong>で判断するのが実際的です。
          </p>

          <AdSlot id="article-mid" />

          <AffiliateBox
            heading="🛏 寝返りの打ちやすさで選ぶ高反発マットレス"
            bedding
            note="広告を含みます。効果には個人差があり、当サイトは効果を保証するものではありません。返品・返金の条件は各社で異なるため、必ず公式サイトでご確認ください。"
          />

          <h2>磁気・チタン系ギアの位置づけ</h2>
          <p>
            プロ野球選手の着用例が多いことから、磁気ネックレスやチタンテープを
            使っている草野球プレーヤーも少なくありません。
          </p>
          <p>
            これらについて、<strong>当サイトは効果の有無を断定しません</strong>。
            医療機関ではないからです。各メーカーが公表している説明を読み、
            ご自身で判断してください。
            「つけていると気分が切り替わる」という使い方も、道具としては十分アリだと思います。
          </p>
          <p className="note">
            ⚠️ <strong>痛みやしびれが続く場合は、グッズに頼らず整形外科など医療機関を受診してください。</strong>
            とくに「投げると肩や肘の奥が痛む」「指先がしびれる」「夜間も痛む」は、
            様子見にせず相談すべきサインとされています。
          </p>

          <AffiliateBox
            heading="💠 プロ野球選手の着用例が多いコンディショニンググッズ"
            phiten
            note="広告を含みます。当サイトは効果の有無を判断するものではありません。各メーカーの説明をご確認のうえご判断ください。痛みが続く場合は 医療機関を受診してください。"
          />

          <h2>今夜からできること（お金のかからない順）</h2>
          <ol>
            <li>
              <strong>試合後に5分だけ歩く</strong>——いきなり座り込まず、軽く動いて終わる。
            </li>
            <li>
              <strong>湯船に浸かる</strong>——シャワーで済ませた日と翌朝の違いは、
              多くの人が体感しやすいところです。
            </li>
            <li>
              <strong>寝る前にスマホを置く</strong>——寝つきが変わると、
              同じ睡眠時間でも翌朝が違います。
            </li>
            <li>
              <strong>枕の高さを見直す</strong>——寝具の中では一番安く試せます。
              タオルを畳んで高さを変えるだけでも検証できます。
            </li>
            <li>
              <strong>マットレス・敷布団を見直す</strong>——ここまでやっても朝がつらいなら。
              金額が大きいので最後に。
            </li>
          </ol>
          <p>
            順番が大事です。寝具を買う前にできることがまだあるなら、そちらが先です。
          </p>

          <h2>よくある質問</h2>
          <h3>試合の翌日は休んだ方がいいですか？</h3>
          <p>
            完全に動かないより、<strong>軽く体を動かした方が楽になる</strong>ことが多いです。
            散歩やストレッチ程度で十分です。ただし痛みがある場合は別で、
            痛みを我慢して動かすのは避けてください。
          </p>
          <h3>プロテインやサプリは必要ですか？</h3>
          <p>
            週1回の草野球であれば、まずは普通の食事と睡眠で足ります。
            サプリは「足りないものを補うもの」で、順番としては食事・睡眠の後です。
          </p>
          <h3>何歳まで続けられますか？</h3>
          <p>
            <a href="/guide/over40/">40代・50代から始める人</a>も珍しくありません。
            長く続けている人ほど、追い込むより<strong>ケガをしない工夫</strong>に
            時間を使っている印象があります。
          </p>

          <div className="bat-links">
            <a className="cta-inline" href="/guide/body-care/">→ 試合前後のケア・部位別のポイントを読む</a>
            <a className="cta-inline" href="/guide/elbow-care/">→ 野球肘・野球肩が気になる人へ</a>
            <a className="cta-inline" href="/guide/over40/">→ 40代から草野球を始める・続ける</a>
            <a className="cta-inline" href="/stats/">→ 成績表で自分の記録をつける</a>
          </div>

          <RelatedGuides currentHref="/guide/sleep-recovery/" />
        </article>
      </div>
    </main>
  );
}
