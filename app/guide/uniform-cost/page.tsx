import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球ユニフォームの費用相場【2026年版】1人あたり・チーム総額・安く抑えるコツ",
  description:
    "草野球ユニフォームは結局いくら？上下セット・帽子・小物まで含めた1人あたりの総額、10人チームの初期費用、昇華と刺繍の価格差、そして総額をぐっと下げる7つのコツを、幹事目線でまとめました。",
  alternates: { canonical: `${SITE_URL}/guide/uniform-cost/` },
  openGraph: {
    title: "草野球ユニフォームの費用相場【2026年版】",
    description:
      "1人あたりいくら？チーム総額は？昇華と刺繍の価格差から、安く抑えるコツまで幹事目線で解説。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "草野球ユニフォームの費用相場【2026年版】1人あたり・チーム総額・安く抑えるコツ",
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
        name: "草野球ユニフォームは1人あたりいくらかかりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "上下セットで8,000円〜13,000円が相場です。帽子・ベルト・ソックスまで含めたフル装備では12,000円〜18,000円程度を見込んでおくと安心です。",
        },
      },
      {
        "@type": "Question",
        name: "10人チームのユニフォーム総額はいくらですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "上下セットのみなら8万〜13万円、帽子等も含めると12万〜18万円が目安です。多くのチームは1人あたり負担(1万円前後)で割り勘にしています。",
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

export default function UniformCostPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>
          草野球ユニフォームの費用相場【2026年版】1人あたり・チーム総額・安く抑えるコツ
        </h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          チームで一着そろえよう——そう決めたとき、幹事の頭をよぎるのは
          「で、結局いくらかかるの？」という一点だと思います。
          メンバーから集金する立場なら、なおさら“正確な相場感”が欲しいところ。
        </p>
        <p>
          先に結論を言うと、目安は<strong>上下セットで1人8,000〜13,000円</strong>、
          帽子や小物まで含めたフル装備で<strong>12,000〜18,000円</strong>。
          この記事では、その内訳をひとつずつ分解しながら、
          <strong>総額をムリなく下げる具体的なコツ</strong>まで一気にお伝えします。
        </p>

        <AdSlot id="article-top" />

        <h2>1人あたりの費用を、分解してみる</h2>
        <p>
          「上下セットで1万円」と聞くと簡単そうですが、実際はいくつかのパーツの積み重ね。
          どこにお金がかかっているのかが見えると、削りどころも見えてきます。
        </p>
        <table>
          <thead>
            <tr>
              <th>アイテム</th>
              <th>相場</th>
              <th>ひとこと</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ユニフォームシャツ</td>
              <td>4,000〜8,000円</td>
              <td>昇華なら安め、刺繍マーク付きは高め</td>
            </tr>
            <tr>
              <td>ユニフォームパンツ</td>
              <td>3,000〜5,000円</td>
              <td>既製の白パンツで代用するチームも多い</td>
            </tr>
            <tr>
              <td>帽子（刺繍入り）</td>
              <td>2,000〜3,500円</td>
              <td>チームマーク刺繍込みの価格</td>
            </tr>
            <tr>
              <td>ベルト・ソックス</td>
              <td>1,500〜3,000円</td>
              <td>市販品でOK。色だけチームでそろえる</td>
            </tr>
            <tr>
              <td>アンダーシャツ</td>
              <td>1,500〜3,000円</td>
              <td>各自購入が一般的。色の指定だけ</td>
            </tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>ここに落とし穴：</strong>
          「上下セット価格」に<strong>胸マーク・背番号・背ネームが含まれるか</strong>で、
          実質価格は大きく変わります。マーク別料金のメーカーだと、
          1ヶ所500〜1,500円 × 4〜5ヶ所で<strong>＋3,000〜6,000円</strong>ということも。
          比較するときは、必ず「マーク込みの総額」で見てください。
        </div>

        <h2>人数別、チーム総額のシミュレーション</h2>
        <p>
          幹事がいちばん知りたいのは、たぶん「チームで合計いくら？」でしょう。
          人数ごとの目安を出しておきます。多くのチームは、これを頭数で割って一人負担にしています。
        </p>
        <table>
          <thead>
            <tr>
              <th>人数</th>
              <th>上下セットのみ</th>
              <th>フル装備（帽子・小物込み）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10人</td>
              <td>8万〜13万円</td>
              <td>12万〜18万円</td>
            </tr>
            <tr>
              <td>15人</td>
              <td>12万〜19.5万円</td>
              <td>18万〜27万円</td>
            </tr>
            <tr>
              <td>20人</td>
              <td>16万〜26万円</td>
              <td>24万〜36万円</td>
            </tr>
          </tbody>
        </table>
        <p>
          支払いは「各自が自分の分を負担」がいちばん多いパターン。
          チーム会費から出す場合は、<strong>退部したときのユニフォームの扱い（買い取りか返却か）</strong>を
          先に決めておくと、あとの気まずさを防げます。
        </p>

        <h2>昇華と刺繍、値段はどれだけ違う？</h2>
        <p>
          「刺繍のほうが高い」となんとなく知っていても、
          <strong>どれくらい違うのか・どっちが得なのか</strong>は意外と語られません。整理します。
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
              <td><strong>上下セット相場</strong></td>
              <td>8,000〜12,000円</td>
              <td>10,000〜15,000円</td>
            </tr>
            <tr>
              <td><strong>価格の理由</strong></td>
              <td>デザインごと生地に印刷。色数・柄が増えても追加料金なし</td>
              <td>マーク1ヶ所ごとに加工費がかかる</td>
            </tr>
            <tr>
              <td><strong>コスパが良いのは</strong></td>
              <td>多色・グラデ・総柄デザイン</td>
              <td>シンプルな1〜2色デザイン</td>
            </tr>
          </tbody>
        </table>
        <p>
          ポイントは「デザインの複雑さ」。
          派手で色数の多いデザインを刺繍でやると加工費がかさむので、そこは昇華が圧倒的に得。
          逆に、シンプルな2色デザインなら刺繍の質感が活きます。
        </p>

        <AdSlot id="article-bottom" />

        <h2>総額を下げる、7つの現実的なコツ</h2>
        <p>
          最後に、クオリティを落とさずに総額を削る方法を7つ。
          幹事の腕の見せどころです。
        </p>
        <ol>
          <li>
            <strong>マーク込み価格のメーカーを選ぶ</strong>：
            表示が安くてもマーク別料金なら逆転します（
            <a href="/uniform/">比較ランキング</a>で「オールインワン価格」の社をチェック）
          </li>
          <li>
            <strong>パンツは既製品にする</strong>：
            白・グレーの既製パンツ（2,000円前後）で十分。オーダーをシャツだけにすると2〜3割安くなります
          </li>
          <li>
            <strong>背ネームを省く</strong>：
            1人500〜1,000円の節約。番号だけでも試合はまったく問題ありません
          </li>
          <li>
            <strong>枚数割引のラインに乗せる</strong>：
            10枚・20枚で単価が下がるメーカーが多い。あと1〜2枚で割引なら、予備を足して届かせる手も
          </li>
          <li>
            <strong>セール時期を狙う</strong>：
            秋〜冬のオフシーズンはセールが出やすい。春の開幕直前は割高＆納期も長い、が定石
          </li>
          <li>
            <strong>小物は通販でまとめ買い</strong>：
            ベルト・ソックス・アンダーは、楽天やスポーツ量販店のセールで揃えるのが最安
          </li>
          <li>
            <strong>相見積もりを取る</strong>：
            同じデザインでも2〜3社で見積もれば、総額が1〜2万円変わることはザラです
          </li>
        </ol>

        <h2>よくある質問</h2>
        <h3>Q. 途中加入メンバーの追加費用は？</h3>
        <p>
          1着から追加できるメーカーなら、初回とほぼ同単価で作れます。
          ただし<strong>追加時の同色保証</strong>（生地ロットの差で色味がズレないか）だけは、先に確認を。
        </p>
        <h3>Q. とにかく最安で作ると、いくら？</h3>
        <p>
          昇華の激安メーカー＋パンツ既製品＋背ネームなしなら、
          <strong>シャツ5,000円台＋パンツ2,000円で計7,000円台</strong>も現実的です。
          当サイトの<a href="/shindan/">ぴったり診断</a>で「予算重視」を選ぶと、候補がすぐ絞れます。
        </p>

        <a className="cta-inline" href="/uniform/">
          → 13社の価格を比較ランキングでチェックする
        </a>

        <RelatedGuides currentHref="/guide/uniform-cost/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
