import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, CONTACT_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${SITE_NAME}のプライバシーポリシー・免責事項です。`,
  alternates: { canonical: `${SITE_URL}/privacy/` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="container">
      <article className="article">
        <h1>プライバシーポリシー・免責事項</h1>
        <p className="meta">制定日：2026年7月3日</p>

        <h2>広告の配信について</h2>
        <p>
          当サイトは、第三者配信の広告サービス（Google AdSense）を利用しています。
          広告配信事業者は、ユーザーの興味に応じた広告を表示するために Cookie
          を使用することがあります。Cookie を無効にする方法や Google AdSense
          に関する詳細は「
          <a
            href="https://policies.google.com/technologies/ads?hl=ja"
            target="_blank"
            rel="noopener"
          >
            広告 – ポリシーと規約 – Google
          </a>
          」をご覧ください。
        </p>

        <h2>アフィリエイトプログラムについて</h2>
        <p>
          当サイトは、アフィリエイトプログラムを利用して商品・サービスを紹介しており、
          リンク先での申込・購入等により当サイトが報酬を受け取る場合があります。
          掲載順位や評価は報酬の有無のみで決定するものではなく、
          公開情報に基づく編集部の評価基準（<a href="/about/">運営者情報・評価基準</a>
          参照）に沿って作成しています。
        </p>

        <h2>アクセス解析ツールについて</h2>
        <p>
          当サイトは、Google によるアクセス解析ツール「Google Analytics」を利用する場合があります。
          Google Analytics はトラフィックデータの収集のために Cookie を使用します。
          このデータは匿名で収集されており、個人を特定するものではありません。
        </p>

        <h2>アップロード画像の取り扱いについて</h2>
        <p>
          「ぴったり診断」でアップロードされた画像は、
          <strong>お使いのブラウザ内でのみ処理され、当サイトのサーバーを含む外部に送信・保存されることは一切ありません</strong>。
        </p>

        <h2>免責事項</h2>
        <ul>
          <li>
            掲載している価格・納期・仕様等は各社の公開情報をもとにした目安であり、
            正確性・最新性を保証するものではありません。最終的な条件は必ず各メーカーの公式サイトでご確認ください。
          </li>
          <li>
            当サイトの情報を利用したことによるいかなる損害についても、当サイトは責任を負いかねます。
          </li>
          <li>
            リンク先サイトで提供される情報・サービスについて、当サイトは責任を負いません。
          </li>
        </ul>

        <h2>お問い合わせ</h2>
        <p>
          掲載内容の誤り・修正依頼・提携のご相談は
          <a href={CONTACT_URL}>お問い合わせ窓口</a>までご連絡ください。
        </p>
      </article>
    </main>
  );
}
