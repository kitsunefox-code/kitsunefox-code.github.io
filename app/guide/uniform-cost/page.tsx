import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球ユニフォームの費用相場【2026年版】1人あたり・チーム総額・安く抑えるコツ",
  description:
    "草野球ユニフォームの費用相場を徹底解説。上下セット・帽子・ソックスまで含めた1人あたりの総額、10人チームの初期費用、昇華と刺繍の価格差、費用を安く抑える7つのコツを紹介します。",
  alternates: { canonical: `${SITE_URL}/guide/uniform-cost/` },
  openGraph: {
    title: "草野球ユニフォームの費用相場【2026年版】",
    description:
      "1人あたりいくら？チーム総額は？昇華と刺繍の価格差から安く抑えるコツまで。",
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
    dateModified: "2026-07-03",
    author: { "@type": "Organization", name: "草野球ユニフォーム比較ナビ" },
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
          チーム立ち上げで一番気になるお金の話。結論から言うと、ユニフォームの相場は
          <strong>上下セットで1人8,000円〜13,000円</strong>、フル装備なら
          <strong>12,000円〜18,000円</strong>です。この記事では内訳と、総額を安く抑える具体的なコツを解説します。
        </p>

        <AdSlot id="article-top" />

        <h2>1人あたりの費用内訳</h2>
        <table>
          <thead>
            <tr>
              <th>アイテム</th>
              <th>相場</th>
              <th>備考</th>
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
              <td>市販品でOK。色だけチームで統一</td>
            </tr>
            <tr>
              <td>アンダーシャツ</td>
              <td>1,500〜3,000円</td>
              <td>各自購入が一般的。色指定のみ</td>
            </tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>ポイント：</strong>
          「上下セット価格」に<strong>胸マーク・背番号・背ネームが含まれるか</strong>で実質価格が大きく変わります。
          マーク別料金のメーカーだと、1ヶ所500〜1,500円×4〜5ヶ所で
          <strong>+3,000〜6,000円</strong>になることも。比較時は「込み価格」で見るのが鉄則です。
        </div>

        <h2>チーム人数別の総額シミュレーション</h2>
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
          支払い方法は「各自が自分の分を負担」が最多。チーム会費から出す場合は、
          退部時のユニフォーム扱い（買い取りか返却か）を先に決めておくとトラブルを防げます。
        </p>

        <h2>昇華とマーキング（刺繍）の価格差</h2>
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
              <td>デザインごと生地に印刷するため、色数・柄が増えても追加料金なし</td>
              <td>マーク1ヶ所ごとに加工費がかかる</td>
            </tr>
            <tr>
              <td><strong>コスパが良いケース</strong></td>
              <td>多色・グラデ・総柄デザイン</td>
              <td>シンプルな1〜2色デザイン</td>
            </tr>
          </tbody>
        </table>

        <h2>費用を安く抑える7つのコツ</h2>
        <ol>
          <li>
            <strong>マーク込み価格のメーカーを選ぶ</strong>：
            表示価格が安くてもマーク別料金なら逆転します（
            <a href="/#compare">比較表</a>で「オールインワン価格」のメーカーをチェック）
          </li>
          <li>
            <strong>パンツは既製品にする</strong>：
            白・グレーの既製パンツ（2,000円前後）で十分。オーダーはシャツだけにすると2〜3割安くなります
          </li>
          <li>
            <strong>背ネームを省く</strong>：
            1人500〜1,000円の節約。番号だけでも試合は問題ありません
          </li>
          <li>
            <strong>枚数割引ラインに乗せる</strong>：
            10枚・20枚で単価が下がるメーカーが多い。ギリギリなら予備を足して割引ラインへ
          </li>
          <li>
            <strong>セール・キャンペーンを狙う</strong>：
            秋〜冬はオフシーズンでセールが出やすい時期。開幕直前の春は割高＆納期も長い
          </li>
          <li>
            <strong>小物は通販でまとめ買い</strong>：
            ベルト・ソックス・アンダーは楽天やスポーツ用品店のセールで揃えるのが最安
          </li>
          <li>
            <strong>相見積もりを取る</strong>：
            同じデザインでも2〜3社で見積もると総額で1〜2万円変わることがザラにあります
          </li>
        </ol>

        <h2>よくある質問</h2>
        <h3>Q. 途中加入メンバーの追加費用は？</h3>
        <p>
          1着からの追加注文に対応するメーカーなら、初回とほぼ同単価で作れます。
          ただし<strong>追加時の同色保証</strong>（生地ロット差で色味が変わらないか）は先に確認を。
        </p>
        <h3>Q. 一番安く作るといくら？</h3>
        <p>
          昇華の激安メーカー＋パンツ既製品＋背ネームなしなら、
          <strong>シャツ5,000円台+パンツ2,000円で計7,000円台</strong>も可能です。
          当サイトの<a href="/shindan/">ぴったり診断</a>で「予算重視」を選ぶと候補が絞れます。
        </p>

        <a className="cta-inline" href="/#compare">
          → 13社の価格を比較表でチェックする
        </a>

        <AdSlot id="article-bottom" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
