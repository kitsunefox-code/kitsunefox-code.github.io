import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import WarikanCalc from "@/components/WarikanCalc";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の参加費 割り勘計算機【無料】球場代・審判料をひとりいくらに",
  description:
    "グラウンド代・審判料・ボール代を入れて参加人数で割るだけ。100円単位の切り上げ、助っ人を無料にする設定、余りの表示まで自動で計算します。LINEにそのまま貼れる集金リストもコピーできます。費目は端末に残るので、次の試合は金額と人数を直すだけ。登録不要・無料。",
  alternates: { canonical: `${SITE_URL}/warikan/` },
  openGraph: {
    title: "草野球の参加費 割り勘計算機【無料】",
    description: "球場代・審判料を人数で割って、100円単位に切り上げ。LINE用の集金リストも出せます。",
    type: "website",
    url: `${SITE_URL}/warikan/`,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "草野球の参加費 割り勘計算機【無料】",
    description: "球場代・審判料を人数で割って、100円単位に切り上げ。集金リストもコピーできる。",
    images: ["/og.png"],
  },
};

export default function WarikanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "草野球の参加費 割り勘計算機",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/warikan/`,
    description:
      "草野球の1試合分の費用（グラウンド代・審判料・ボール代など）を参加人数で割り、集金額を計算する無料ツール。",
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "草野球の参加費はひとりいくらが相場ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "グラウンド使用料・審判料・ボール代を合わせた1試合の運営コストは、おおむね8,000〜15,000円です。これを出席人数（10〜15人）で割るため、1回あたり1,000円前後になるチームが多くなります。ただし公営グラウンドが安く借りられる地域や、相互審判で審判料がかからないチームでは、これより安くなります。",
        },
      },
      {
        "@type": "Question",
        name: "端数はどう処理するのがいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "100円単位で切り上げるのが現実的です。小銭のやりとりが減り、切り上げで出た余りはチーム会計に積んでおけば、ボールの補充や連盟登録費に回せます。1円単位で正確に割ると、その場で崩せず結局あとから精算することになりがちです。",
        },
      },
      {
        "@type": "Question",
        name: "助っ人からも参加費をもらうべきですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "チームによって方針が分かれます。人数が足りずに来てもらった場合は無料、自分から参加したいと言って来た場合は同額、という線引きをしているチームが多いようです。大事なのは、呼ぶ前に「参加費がかかるかどうか」を伝えておくことです。当日に金額の話が出ると気まずくなります。",
        },
      },
      {
        "@type": "Question",
        name: "入力した金額はどこかに送信されますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "送信されません。計算はすべてお使いのブラウザの中で行われ、金額や人数が当サイトのサーバーに保存されることはありません。入力内容は次回のために端末内にだけ残ります。",
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
            Cost Split
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4.4vw, 34px)", margin: "0 0 10px" }}>
            草野球の参加費<span className="hl">割り勘計算機</span>
          </h1>
          <p>
            グラウンド代・審判料・ボール代を入れて、参加人数で割るだけ。
            <strong>100円単位の切り上げ</strong>、助っ人を無料にする設定、
            <strong>余りがいくら出るか</strong>まで自動で出します。
            LINEにそのまま貼れる<strong>集金リスト</strong>もコピーできます。登録不要・無料。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="warikan-top" />

        <WarikanCalc />

        <section className="score-howto" style={{ marginTop: 34 }}>
          <h2 className="section-title">1試合にかかるお金の内訳</h2>
          <p className="section-sub">
            下は当サイトで調べた目安です。地域や球場によって幅があるので、
            自分のチームの実額で置き換えてお使いください。
          </p>
          <table>
            <thead>
              <tr>
                <th>費目</th>
                <th>1試合あたりの目安</th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>グラウンド使用料</td>
                <td>2,000〜6,000円</td>
                <td>公営は安く、民間や照明つきは高くなる</td>
              </tr>
              <tr>
                <td>審判料</td>
                <td>0〜5,000円</td>
                <td>リーグ戦で有料審判を頼む場合。相互審判なら無料</td>
              </tr>
              <tr>
                <td>ボール代</td>
                <td>1,000〜2,000円</td>
                <td>軟式M号球は1球600〜900円。試合ごとに数球は消耗</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: 14 }}>
            合計すると<strong>1試合8,000〜15,000円</strong>。
            出席10〜15人で割って<strong>ひとり1,000円前後</strong>に落ち着くチームが多くなります。
            年間の費用まで含めた話は
            <a href="/guide/annual-cost/">草野球の年間費用</a>
            にまとめています。
          </p>
        </section>

        <section className="score-howto" style={{ marginTop: 26 }}>
          <h2 className="section-title">集金でもめないための3つ</h2>
          <div className="mp-list">
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>内訳を一緒に送る</p>
              <p className="mp-catch">「1,000円」だけだと高く感じる</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>なぜ</strong>
                  <span className="mp-why">
                    金額だけ告げられると割高に見えますが、
                    「球場6,000＋審判3,000＋ボール1,500＝10,500円を11人で」と見えれば納得されます。
                    このツールのコピー機能は、内訳ごと貼れる形で出します。
                  </span>
                </span>
              </div>
            </div>
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>余りの行き先を言っておく</p>
              <p className="mp-catch">切り上げた分は誰のものでもない</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>なぜ</strong>
                  <span className="mp-why">
                    100円単位に切り上げると数百円の余りが出ます。
                    「余りはチーム会計に入れてボール代に回す」と先に言っておけば、
                    幹事が得をしているように見えることはありません。
                  </span>
                </span>
              </div>
            </div>
            <div className="mp-row">
              <p className="mp-code" style={{ fontSize: 17 }}>助っ人の扱いを先に決める</p>
              <p className="mp-catch">当日に金額の話をしない</p>
              <div className="mp-pos">
                <span className="mp-pos-item">
                  <strong>なぜ</strong>
                  <span className="mp-why">
                    人数が足りなくて来てもらったのか、本人が入りたくて来たのかで、
                    もらう・もらわないが変わります。どちらにせよ
                    <strong>呼ぶ前に伝える</strong>のが唯一の正解です。
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="bat-links">
          <a className="cta-inline" href="/lineup/">→ 打順表メーカーで「今日のオーダー」を画像にする</a>
          <a className="cta-inline" href="/stats/">→ 成績表で打率・出塁率を自動計算する</a>
          <a className="cta-inline" href="/guide/annual-cost/">→ 読む「草野球の年間費用のリアル」</a>
          <a className="cta-inline" href="/guide/helper-recruit/">→ 読む「助っ人の集め方・頼み方」</a>
          <a className="cta-inline" href="/guide/ground-reservation/">→ 読む「グラウンドの取り方」</a>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
