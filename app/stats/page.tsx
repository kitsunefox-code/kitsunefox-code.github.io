import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import StatsManager from "@/components/StatsManager";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の成績表【無料・登録不要】打席・打数・打点・盗塁を入力すると打率が自動計算",
  description:
    "草野球チームの個人成績をそのまま管理できる無料の成績表。選手名と打順を登録し、試合ごとに打席・打数・安打・打点・盗塁を入力するだけで、打率・出塁率・打点・盗塁の累計が自動で計算されます。登録不要・無料で、CSVに書き出してExcelでも開けます。スマホでそのまま入力できるので、試合後のベンチでも記録できます。",
  alternates: { canonical: `${SITE_URL}/stats/` },
  openGraph: {
    title: "草野球の成績表【無料・登録不要】打率が自動計算される個人成績管理",
    description:
      "打席・打数・安打・打点・盗塁を入力するだけで打率・出塁率を自動計算。CSV書き出し対応・登録不要。",
    type: "website",
    url: `${SITE_URL}/stats/`,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "草野球の成績表【無料・登録不要】",
    description: "打席・打数・安打・打点・盗塁を入力すると打率・出塁率を自動計算。",
    images: ["/og.png"],
  },
};

export default function StatsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "草野球の成績表",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/stats/`,
    description:
      "草野球チームの個人成績（打席・打数・安打・打点・盗塁）を入力すると打率・出塁率を自動計算する無料ツール。",
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "入力したデータはどこに保存されますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "お使いの端末のブラウザの中だけに保存され、サーバーには送信されません。そのため会員登録もログインも不要です。反面、別の端末とは共有されず、ブラウザのサイトデータを消すと一緒に消えます。大事な記録はCSVで書き出して保管してください。書き出したCSVはExcelでそのまま開けます。",
        },
      },
      {
        "@type": "Question",
        name: "打率はどう計算されますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "打率は「安打 ÷ 打数」で計算します。四死球や犠打は打数に含めないのが野球のルールなので、打席と打数を分けて入力する形にしています。出塁率は「(安打＋四死球) ÷ (打数＋四死球)」で計算する簡易式です（犠飛を入力しないぶん、公式の出塁率とわずかに差が出ます）。",
        },
      },
      {
        "@type": "Question",
        name: "チーム全員分を管理できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい。選手を人数分追加でき、打順を入力すると打順どおりに並びます。全員の合計も「チーム合計」の行に出るので、チーム打率もわかります。",
        },
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <div className="hero" style={{ padding: "34px 0 24px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Team Stats
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 36px)", margin: "0 0 10px" }}>
            草野球の<span className="hl">成績表</span>
          </h1>
          <p>
            選手名と打順を登録して、試合ごとに<strong>打席・打数・安打・打点・盗塁</strong>を入力するだけ。
            <strong>打率と出塁率が自動で計算</strong>され、打順どおりに並んだ一覧になります。
            登録不要・無料。スマホでそのまま入力できるので、試合後のベンチでも記録できます。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 16, paddingBottom: 30 }}>
        <StatsManager />

        <AdSlot id="stats-mid" />

        <section className="score-howto" style={{ marginTop: 30 }}>
          <h2 className="section-title">使い方</h2>
          <ol className="sm-steps">
            <li>
              <strong>選手を追加する</strong>
              <span>名前を入れて「選手を追加」。人数分くり返します。</span>
            </li>
            <li>
              <strong>打順を入れる</strong>
              <span>一覧の「打順」に数字を入れると、その順に並び替わります。</span>
            </li>
            <li>
              <strong>試合ごとに入力する</strong>
              <span>
                「試合を追加」から、その日の打席・打数・安打・打点・盗塁を入力。
                打率・出塁率は自動で更新されます。
              </span>
            </li>
            <li>
              <strong>CSVで保管する</strong>
              <span>
                シーズン終わりや節目にCSVで書き出しておくと、Excelでそのまま開けて、
                端末を変えても読み込み直せます。
              </span>
            </li>
          </ol>
        </section>

        <section className="score-howto" style={{ marginTop: 24 }}>
          <h2 className="section-title">打席と打数の違い（ここだけ注意）</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            数字が合わなくなる原因はほぼここなので、先に整理しておきます。
          </p>
          <ul className="sm-def">
            <li>
              <strong>打席</strong>…バッターボックスに立った回数。
              <em>四球・死球・犠打・犠飛も含みます。</em>
            </li>
            <li>
              <strong>打数</strong>…打席から<em>四死球・犠打・犠飛を引いた</em>数。
              打率の分母はこちらです。
            </li>
          </ul>
          <p className="section-sub" style={{ marginTop: 10 }}>
            たとえば4打席のうち1つが四球なら、<strong>打席4・打数3</strong>。
            この3打数で1本打てば打率.333です。四球で打率が下がらないのはこのためです。
          </p>
          <p className="section-sub" style={{ marginTop: 10 }}>
            計算式は<strong>打率＝安打÷打数</strong>、
            <strong>出塁率＝(安打＋四死球)÷(打数＋四死球)</strong>としています。
            出塁率は犠飛を入力しないぶん、公式の計算とわずかに差が出る簡易式です。
          </p>
        </section>

        <div className="bat-links">
          <a className="cta-inline" href="/lineup/">→ 打順表メーカーで「今日のオーダー」を画像にする</a>
          <a className="cta-inline" href="/warikan/">→ 参加費の割り勘を計算して集金リストを作る</a>
          <a className="cta-inline" href="/guide/scorebook/">→ 読む「スコアブックの書き方」</a>
          <a className="cta-inline" href="/guide/batting-order/">→ 打順の組み方を知る</a>
          <a className="cta-inline" href="/baseball-dock/">→ 全45問の「野球MBTI診断」で自分のタイプを知る</a>
          <a className="cta-inline" href="/guide/team-apps/">→ チーム運営に使えるアプリ・道具</a>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
