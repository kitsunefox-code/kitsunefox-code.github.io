import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, CONTACT_URL } from "@/data/site";
import { RATING_AXES } from "@/data/makers";

export const metadata: Metadata = {
  title: "運営者情報・評価基準",
  description: `${SITE_NAME}の運営者情報と、メーカーランキングの評価基準を公開しています。`,
  alternates: { canonical: `${SITE_URL}/about/` },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <main className="container">
      <article className="article">
        <h1>運営者情報・評価基準</h1>

        <h2>当サイトについて</h2>
        <p>
          「{SITE_NAME}」は、草野球チームを立ち上げた人が最初にぶつかる
          「ユニフォームってどこで作ればいいの？」という悩みを解決するための比較サイトです。
          運営者自身がチームのユニフォーム作りで「どのメーカーが良いのか分からず苦労した」経験から、
          主要オーダーメーカーの情報を1か所に集めました。
        </p>

        <h2>ランキング・評価スコアの基準</h2>
        <p>
          各メーカーの評価は、以下の5項目（各5点満点）を公開情報（公式サイトの価格・
          最低ロット・納期・対応方式・実績など）に基づいて編集部が採点し、その平均を総合評価としています。
        </p>
        <table>
          <thead>
            <tr>
              <th>評価項目</th>
              <th>主な採点材料</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{RATING_AXES[0].label}</td>
              <td>最安価格帯、マーキング込み価格かどうか、枚数割引</td>
            </tr>
            <tr>
              <td>{RATING_AXES[1].label}</td>
              <td>昇華/刺繍の対応範囲、テンプレート数、シミュレーターやデザイナー対応</td>
            </tr>
            <tr>
              <td>{RATING_AXES[2].label}</td>
              <td>公表されている納期、特急便の有無</td>
            </tr>
            <tr>
              <td>{RATING_AXES[3].label}</td>
              <td>最低ロット、1着からの追加注文可否</td>
            </tr>
            <tr>
              <td>{RATING_AXES[4].label}</td>
              <td>製作実績数、ブランドの歴史、プロ・代表チームでの採用</td>
            </tr>
          </tbody>
        </table>
        <p>
          評価は広告・アフィリエイト報酬の有無によって変動させていません。
          情報は定期的に見直していますが、最新の条件は必ず各メーカー公式サイトでご確認ください。
        </p>

        <h2>収益について</h2>
        <p>
          当サイトは広告（Google AdSense）およびアフィリエイトプログラムによる収益で運営されています。
          詳細は<a href="/privacy/">プライバシーポリシー</a>をご覧ください。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          掲載内容の修正依頼、メーカー様からの掲載・提携のご相談は
          <a href={CONTACT_URL}>お問い合わせ窓口</a>までお気軽にどうぞ。
        </p>
      </article>
    </main>
  );
}
