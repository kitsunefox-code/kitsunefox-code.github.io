import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import LineupMaker from "@/components/LineupMaker";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "打順表メーカー【無料・登録不要】草野球のオーダー表を画像で作る",
  description:
    "9人の名前を入れるだけで、草野球の打順表（オーダー表）が1枚の画像になります。守備位置つき、打率も載せられて、LINEに貼れる文字コピーも同時に出せます。入力した選手名は端末に残るので、次の試合は相手と日付を変えるだけ。登録不要・無料・印刷も可。",
  alternates: { canonical: `${SITE_URL}/lineup/` },
  openGraph: {
    title: "打順表メーカー【無料・登録不要】",
    description:
      "9人の名前を入れるだけで、草野球のオーダー表が画像になる。LINE用の文字コピーも同時に。",
    type: "website",
    url: `${SITE_URL}/lineup/`,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "打順表メーカー【無料・登録不要】",
    description: "9人の名前を入れるだけで、草野球のオーダー表が画像になる。",
    images: ["/og.png"],
  },
};

export default function LineupPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "打順表メーカー",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/lineup/`,
    description:
      "草野球の打順表（オーダー表）を、9人の名前を入力するだけで画像として作れる無料ツール。登録不要。",
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "作った打順表は印刷できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "できます。「打順表の画像を作る」を押すとPNG画像が保存されるので、その画像を印刷してください。審判に渡すメンバー表として使う場合は、所属リーグ指定の用紙がある大会もあるため、事前に確認してください。",
        },
      },
      {
        "@type": "Question",
        name: "入力した選手名は次回も残りますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "残ります。チーム名・選手名・控え・メモは、お使いの端末のブラウザ内に保存されます。対戦相手と試合日だけは毎試合変わるため保存していません。次の試合は相手と日付を入れ替えるだけで作れます。なお、ブラウザの履歴やサイトデータを消すと一緒に消えます。",
        },
      },
      {
        "@type": "Question",
        name: "打率は自動で入りますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "成績表ページで選手を登録して試合結果を入力していれば、「成績表から選手を読み込む」を押すことで名前と打率が自動で入ります。成績表を使っていない場合は、打率の表示をオフにしてお使いください。",
        },
      },
      {
        "@type": "Question",
        name: "データはサーバーに送られますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "送られません。入力・画像の生成はすべてお使いのブラウザの中で行われ、選手名などが当サイトのサーバーに保存されることはありません。",
        },
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <div className="hero" style={{ padding: "34px 0 26px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Lineup Maker
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 36px)", margin: "0 0 10px" }}>
            打順表<span className="hl">メーカー</span>
          </h1>
          <p>
            名前を入れるだけで、<strong>オーダー表が1枚の画像</strong>になります。
            守備位置つき、打率も載せられて、<strong>LINEに貼れる文字コピー</strong>も同時に出せます。
            選手名は端末に残るので、次の試合は<strong>相手と日付を変えるだけ</strong>。
            登録不要・無料です。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="lineup-top" />

        <LineupMaker />

        <section className="score-howto" style={{ marginTop: 34 }}>
          <h2 className="section-title">打順の組み方の基本</h2>
          <p className="section-sub">
            草野球は人数も実力差もバラバラなので、プロと同じ理屈は当てはまりません。
            それでも、下の考え方を押さえておくと組みやすくなります。
          </p>
          <div className="mp-list">
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>1番・2番</p>
              <p className="mp-catch">とにかく出塁する人</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>選ぶ基準</strong>
                  <span className="mp-why">
                    打率より<strong>出塁</strong>。四球を選べる人、三振が少ない人。
                    足があればなお良いが、草野球では「空振りで終わらない人」が最優先。
                  </span>
                </span>
              </div>
            </div>
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>3番・4番</p>
              <p className="mp-catch">一番打てる人を置く</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>選ぶ基準</strong>
                  <span className="mp-why">
                    チームで一番確実に打つ人を3番に、長打がある人を4番に置くのが一般的。
                    4番にこだわって当たっていない人を置き続けるのは、勝ちたい日なら避けたいところ。
                  </span>
                </span>
              </div>
            </div>
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>5番〜7番</p>
              <p className="mp-catch">二巡目の起点を作る</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>選ぶ基準</strong>
                  <span className="mp-why">
                    ここで切れると二巡目が下位から始まってしまいます。
                    打てる人を1人は混ぜておくと、試合中盤の攻撃がつながります。
                  </span>
                </span>
              </div>
            </div>
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>8番・9番</p>
              <p className="mp-catch">初心者・助っ人の置き場所</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>選ぶ基準</strong>
                  <span className="mp-why">
                    慣れていない人をここに置くのは定石ですが、
                    <strong>打席が回らないほど下げると面白くありません</strong>。
                    草野球では「勝ち」と「全員が楽しむ」の両立が本題なので、
                    相手の強さを見て下位の並びを変えるのが現実的です。
                  </span>
                </span>
              </div>
            </div>
          </div>
          <p className="section-sub" style={{ marginTop: 14 }}>
            もっと詳しい考え方は
            <a href="/guide/batting-order/">草野球の打順の決め方</a>
            にまとめています。
          </p>
        </section>

        <section className="score-howto" style={{ marginTop: 26 }}>
          <h2 className="section-title">使い方（30秒）</h2>
          <ol className="lm-steps">
            <li>
              <strong>チーム名と対戦相手を入れる</strong>
              ——相手と日付は空欄でも作れます。
            </li>
            <li>
              <strong>1番から順に名前を入れる</strong>
              ——守備位置はプルダウンから。並べ替えは「↑」「↓」で。
            </li>
            <li>
              <strong>「打順表の画像を作る」を押す</strong>
              ——スマホなら共有メニューが開き、PCなら画像が保存されます。
            </li>
            <li>
              <strong>LINEに貼るなら「文字でコピー」</strong>
              ——画像が見づらい人にも伝わるテキスト形式でコピーできます。
            </li>
          </ol>
          <p className="section-sub" style={{ marginTop: 12 }}>
            打席数や打率を記録していくなら、<a href="/stats/">成績表</a>
            で先に選手を登録しておくと、名前と打率がここに自動で入ります。
          </p>
        </section>

        <div className="bat-links">
          <a className="cta-inline" href="/stats/">→ 成績表で打率・出塁率を自動計算する</a>
          <a className="cta-inline" href="/guide/batting-order/">→ 読む「草野球の打順の決め方」</a>
          <a className="cta-inline" href="/guide/scorebook/">→ 読む「スコアブックの書き方」</a>
          <a className="cta-inline" href="/guide/position/">→ 読む「ポジションの決め方・向き不向き」</a>
          <a className="cta-inline" href="/tools/">→ ほかの診断・ツールを見る</a>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
