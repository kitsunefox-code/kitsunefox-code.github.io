import ComparisonTable from "@/components/ComparisonTable";
import CompareAllTable from "@/components/CompareAllTable";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { makers, LAST_UPDATED } from "@/data/makers";
import { GUIDES } from "@/data/guides";

// 構造化データ（ItemList）— Google に「比較リスト」であることを伝えSEOに寄与
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}

export default function Home() {
  return (
    <main>
      <StructuredData />

      {/* ヒーロー（写真背景） */}
      <div className="hero hero-photo">
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <p className="hero-kicker">⚾ 草野球ナビ</p>
          <h1>
            草野球を、<span className="hl">もっと楽しく</span>。
          </h1>
          <p>
            チームの立ち上げから、ユニフォーム選び、道具えらびまで。
            草野球の「困った」を、まるごと解決するナビサイトです。
          </p>
          <div className="badges">
            <span className="badge">⚾ メーカー{makers.length}社を比較</span>
            <span className="badge">📷 写真でぴったり診断</span>
            <span className="badge">📚 お役立ちガイド</span>
            <span className="badge">🔄 {LAST_UPDATED}更新</span>
          </div>
          <div className="hero-cta">
            <a className="primary" href="#compare">
              ⚾ ユニフォーム比較ランキングを見る
            </a>
            <a className="ghost" href="/guide/how-to-start/">
              草野球の始め方ガイド
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        {/* 目次（mybest風） */}
        <nav className="toc-box" aria-label="目次">
          <p className="toc-title">📋 この記事でわかること</p>
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

        {/* 広告枠（AdSense等をここに設置） */}
        <AdSlot id="top-under-hero" />

        {/* ランキングセクション */}
        <section id="compare">
          <h2 className="section-title">
            草野球ユニフォームのオーダーメーカーおすすめランキング{makers.length}選
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

        {/* 一覧比較表 */}
        <section id="all-table">
          <h2 className="section-title">全{makers.length}社を一覧表で比較</h2>
          <p className="section-sub">
            横にスクロールできます。じっくり見比べたい方はこちら。
          </p>
          <CompareAllTable />
        </section>

        {/* 関連グッズ（GOODS_LINKS設定時のみ表示） */}
        <GoodsLinks />

        {/* 広告枠 */}
        <AdSlot id="under-compare" />

        {/* 選び方 */}
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

        {/* 始め方CTAバンド（写真アクセント） */}
        <a className="start-band" href="/guide/how-to-start/">
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/gloves-grass.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">はじめての方へ</span>
            <span className="start-band-title">
              これから草野球を始める人へ
            </span>
            <span className="start-band-desc">
              チームの探し方・作り方から、初日の立ち回りまで。
              未経験・ブランクありでも大丈夫な「始め方 完全ガイド」を用意しました。
            </span>
            <span className="start-band-btn">始め方ガイドを読む →</span>
          </div>
        </a>

        {/* バット診断ツールCTAバンド */}
        <a className="start-band" href="/bat-shindan/">
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/gloves-grass.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">無料診断ツール</span>
            <span className="start-band-title">
              軟式バット相性診断
            </span>
            <span className="start-band-desc">
              6つの質問に答えるだけで、あなたにぴったりの軟式バットの
              素材・長さ・重さ・バランスをその場で提案。「硬式出身だけど力はない」人にも対応。
            </span>
            <span className="start-band-btn">バットを診断する →</span>
          </div>
        </a>

        {/* グローブ診断ツールCTAバンド */}
        <a className="start-band" href="/glove-shindan/">
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/gloves-grass.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">無料診断ツール</span>
            <span className="start-band-title">グローブ相性診断</span>
            <span className="start-band-desc">
              ポジション・手の大きさ・予算に答えるだけで、あなたに合うグローブの
              型・サイズ・素材・仕上げをその場で提案。内野・外野・投手・捕手・一塁まで対応。
            </span>
            <span className="start-band-btn">グローブを診断する →</span>
          </div>
        </a>

        {/* グローブメーカー占いCTAバンド（おまけ） */}
        <a className="start-band" href="/glove-fortune/">
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/hero-home-plate.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">🔮 おまけ占い</span>
            <span className="start-band-title">グローブメーカー占い</span>
            <span className="start-band-desc">
              試合でメインに使うグローブメーカーを選ぶだけで、今日の野球運を占います。
              王道からアイピーセレクト等のこだわり系まで対応。毎日変わります。
            </span>
            <span className="start-band-btn">今日の運勢を占う →</span>
          </div>
        </a>

        {/* お役立ちガイド（トップは抜粋。全記事はガイド一覧へ） */}
        <section id="guides">
          <h2 className="section-title">草野球お役立ちガイド</h2>
          <p className="section-sub">
            チーム立ち上げ・運営から、道具えらび・お手入れ・技術まで。
          </p>
          <div className="goods-grid">
            {GUIDES.slice(0, 8).map((g) => (
              <a key={g.href} className="goods-card" href={g.href}>
                <span className="goods-emoji">{g.emoji}</span>
                <span>
                  <span className="goods-label">{g.title}</span>
                  <span className="goods-desc">{g.description}</span>
                </span>
                <span className="goods-arrow">→</span>
              </a>
            ))}
          </div>
          <a className="cta-inline" href="/guide/" style={{ marginTop: 20 }}>
            → お役立ちガイドをすべて見る（全{GUIDES.length}記事）
          </a>
        </section>

        {/* FAQ */}
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
      </div>
    </main>
  );
}
