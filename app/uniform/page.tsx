import type { Metadata } from "next";
import ComparisonTable from "@/components/ComparisonTable";
import CompareAllTable from "@/components/CompareAllTable";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { makers, LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: `草野球ユニフォームのオーダーメーカー比較【2026年版】おすすめランキング${makers.length}選`,
  description:
    "草野球のオーダーユニフォームメーカーを、価格・デザイン自由度・納期・少人数対応・実績の5項目で採点して比較。1着から作れるメーカーや昇華/刺繍の違い、失敗しない選び方まで、幹事目線でまとめました。",
  alternates: { canonical: `${SITE_URL}/uniform/` },
  openGraph: {
    title: `草野球ユニフォームのオーダーメーカー比較【おすすめランキング${makers.length}選】`,
    description:
      "価格・デザイン自由度・納期・少人数対応・実績で採点。1着〜対応や昇華/刺繍の違い、選び方まで。",
    type: "website",
  },
};

function StructuredData() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "草野球ユニフォームのオーダーメーカー比較",
    itemListElement: makers.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.name,
      url: m.officialUrl,
    })),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "草野球のユニフォームは何枚から作れますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "メーカーによります。1着から作れるところ（WAKKUON・Fungo・ユニフォームラボなど）もあれば、初回は5枚〜のところ（ZETT・UNIOなど）もあります。少人数チームなら『1着〜』対応のメーカーを選ぶと安心です。",
        },
      },
      {
        "@type": "Question",
        name: "昇華と刺繍はどちらが良いですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "昇華プリントはグラデーションや複雑なデザインが得意で低価格・軽量。刺繍は立体感と高級感があり耐久性に優れます。デザイン重視・低予算なら昇華、本格志向なら刺繍が目安です。",
        },
      },
      {
        "@type": "Question",
        name: "ユニフォーム一式の予算はどれくらいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "上下2点セットで安いメーカーは1万円以内、本格的なフルオーダーだと1.3万円以上が目安です。帽子やアンダーシャツを含めるとさらに加算されます。",
        },
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export default function UniformPage() {
  return (
    <main>
      <StructuredData />

      <div className="hero" style={{ padding: "56px 0 46px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Uniform Makers
          </p>
          <h1>
            草野球ユニフォームの<span className="hl">オーダーメーカー比較</span>
          </h1>
          <p>
            価格・デザイン自由度・納期・少人数対応・実績の5項目で採点。
            1着から作れるメーカーや昇華/刺繍の違いまで、幹事目線で比較しました。
          </p>
        </div>
      </div>

      <div className="container">
        <nav className="toc-box" aria-label="目次">
          <p className="toc-title">この記事でわかること</p>
          <ol>
            <li>
              <a href="#compare">オーダーメーカーおすすめランキング{makers.length}選</a>
            </li>
            <li>
              <a href="#all-table">全{makers.length}社を一覧表で比較</a>
            </li>
            <li>
              <a href="#howto">失敗しないメーカーの選び方</a>
            </li>
            <li>
              <a href="#faq">よくある質問</a>
            </li>
          </ol>
        </nav>

        <AdSlot id="top-under-hero" />

        <section id="compare">
          <h2 className="section-title">
            オーダーメーカーおすすめランキング{makers.length}選
          </h2>
          <p className="section-sub">
            価格・デザイン自由度・納期・少人数対応・実績の5項目で採点した編集部評価順に紹介します。
            条件での絞り込み・並べ替えも可能です。
          </p>
          <ComparisonTable />
          <div className="disclaimer">
            ※ 価格・納期・最低ロットは各社の公開情報をもとにした{LAST_UPDATED}時点の
            <strong>目安</strong>
            です。キャンペーンや仕様・枚数によって変動します。実際の金額・条件は必ず各メーカー公式サイトでご確認ください。
            評価スコアは公開情報に基づく当サイト編集部の見解です（詳しくは
            <a href="/about/">運営者情報・評価基準</a>）。
            当サイトは各社の広告・アフィリエイトプログラムによる収益を得る場合があります。
          </div>
        </section>

        <section id="all-table">
          <h2 className="section-title">全{makers.length}社を一覧表で比較</h2>
          <p className="section-sub">
            横にスクロールできます。じっくり見比べたい方はこちら。
          </p>
          <CompareAllTable />
        </section>

        <GoodsLinks />

        <AdSlot id="under-compare" />

        <section id="howto">
          <h2 className="section-title">失敗しないユニフォームメーカーの選び方</h2>
          <p className="section-sub">
            初めてチームのユニフォームを作るなら、この4つの軸で比べるとハズしません。
          </p>
          <div className="info-grid">
            <div className="info-card">
              <h3>① 価格（1着あたり）</h3>
              <p>
                「2点セットの表示価格」だけでなく、胸マーク・背番号・背ネームが
                <strong>込みかどうか</strong>
                で総額が大きく変わります。オールインワン価格のメーカーは比較がラクです。
              </p>
            </div>
            <div className="info-card">
              <h3>② 最低ロット（人数）</h3>
              <p>
                立ち上げたばかりの少人数チームは
                <strong>「1着〜」対応</strong>
                のメーカーが安心。まとまった人数なら枚数割引の効くメーカーがお得です。
              </p>
            </div>
            <div className="info-card">
              <h3>③ 納期</h3>
              <p>
                開幕やイベントに間に合わせたいなら
                <strong>納期の明記</strong>
                を要チェック。在庫を持つ激安系や特急便対応なら最短で仕上がります。
              </p>
            </div>
            <div className="info-card">
              <h3>④ オーダー方式（昇華 / 刺繍）</h3>
              <p>
                凝ったデザイン・低予算なら
                <strong>昇華</strong>
                、高級感と耐久性なら
                <strong>刺繍</strong>
                。両対応やハイブリッドを選べるメーカーもあります。
              </p>
            </div>
          </div>
        </section>

        <a className="cta-inline" href="/shindan/">
          → 写真からぴったりのメーカーがわかる「ユニフォーム診断」を試す
        </a>

        <section id="faq">
          <h2 className="section-title">よくある質問</h2>
          <details className="faq-item">
            <summary>草野球のユニフォームは何枚から作れますか？</summary>
            <p>
              メーカーによります。1着から作れるところ（WAKKUON・Fungo・ユニフォームラボなど）もあれば、
              初回は5枚〜のところ（ZETT・UNIOなど）もあります。少人数チームなら「1着〜」対応のメーカーを選ぶと安心です。
            </p>
          </details>
          <details className="faq-item">
            <summary>昇華と刺繍はどちらが良いですか？</summary>
            <p>
              昇華プリントはグラデーションや複雑なデザインが得意で低価格・軽量。刺繍は立体感と高級感があり耐久性に優れます。
              デザイン重視・低予算なら昇華、本格志向なら刺繍が目安です。
            </p>
          </details>
          <details className="faq-item">
            <summary>ユニフォーム一式の予算はどれくらいですか？</summary>
            <p>
              上下2点セットで安いメーカーは1万円以内、本格的なフルオーダーだと1.3万円以上が目安です。
              帽子やアンダーシャツを含めるとさらに加算されます。
            </p>
          </details>
          <details className="faq-item">
            <summary>この比較サイトの価格情報は正確ですか？</summary>
            <p>
              各社の公開情報をもとにした{LAST_UPDATED}時点の目安です。価格は仕様・枚数・時期で変わるため、
              最終的な金額は各メーカーの公式サイト・見積もりで必ずご確認ください。
            </p>
          </details>
        </section>
        <div style={{ height: 20 }} />
      </div>
    </main>
  );
}
