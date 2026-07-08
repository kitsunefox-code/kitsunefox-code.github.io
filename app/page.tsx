import AdSlot from "@/components/AdSlot";
import { makers, LAST_UPDATED } from "@/data/makers";
import { GUIDES } from "@/data/guides";
import { TOOLS } from "@/data/tools";
import { PLAYER_COUNT } from "@/data/players";

// 目次「くらべる」の項目
const COMPARES = [
  {
    href: "/uniform/",
    title: "オーダーユニフォーム",
    badge: "看板企画",
    desc: `${makers.length}社を価格・納期・昇華/刺繍で横断比較。チームの一着はここから。`,
  },
  {
    href: "/bat/",
    title: "バット",
    desc: "ビヨンド系からカーボン・金属まで。価格帯早見表と編集部の一押し付き。",
  },
  {
    href: "/glove/",
    title: "グローブ",
    desc: "ポジション別の型・ウェブの選び方から、こだわりの国産メーカーまで。",
  },
  {
    href: "/spikes/",
    title: "スパイク",
    desc: "樹脂ポイントか金具か。草野球の球場事情に合わせた選び方。",
  },
  {
    href: "/batting-gloves/",
    title: "バッティンググローブ",
    desc: "素材とグリップ感で選ぶ。消耗品だからこそ、賢く。",
  },
];

export default function Home() {
  return (
    <main>
      {/* ── 表紙（編集ヒーロー） ── */}
      <div className="ed-hero">
        <div className="container">
          <div className="ed-hero-inner">
            <div>
              <p className="ed-hero-label">草野球の総合ナビ</p>
              <h1 className="ed-hero-title">
                草野球を、
                <br />
                もっと<span className="hl">楽しく</span>。
              </h1>
              <p className="ed-hero-lead">
                チームづくりから、道具えらび、上達のコツまで。
                週末のグラウンドに立つすべての人へ、「知りたい」にていねいに答える編集ナビです。
              </p>
              <div className="ed-hero-actions">
                <a className="btn-ink" href="/tools/">
                  無料の診断をためす
                </a>
                <a className="link-arrow" href="/uniform/">
                  ユニフォーム比較を見る
                </a>
              </div>
              <div className="ed-hero-meta">
                <div>
                  <span className="ed-meta-num">{makers.length}</span>
                  <span className="ed-meta-label">メーカー比較</span>
                </div>
                <div>
                  <span className="ed-meta-num">{TOOLS.length}</span>
                  <span className="ed-meta-label">無料診断ツール</span>
                </div>
                <div>
                  <span className="ed-meta-num">{PLAYER_COUNT}</span>
                  <span className="ed-meta-label">収録プロ選手</span>
                </div>
                <div>
                  <span className="ed-meta-num">{GUIDES.length}</span>
                  <span className="ed-meta-label">お役立ちガイド</span>
                </div>
              </div>
            </div>
            <p className="ed-hero-vertical">くらべて、たしかめて、うまくなる。</p>
          </div>
        </div>
        <div
          className="photo-strip"
          style={{ backgroundImage: "url('/img/hero-home-plate.jpg')" }}
          role="img"
          aria-label="ホームプレートのある土のグラウンド"
        >
          <span className="photo-strip-cap">KUSAYAKYU NAVI — {LAST_UPDATED}</span>
        </div>
      </div>

      <div className="container">
        <AdSlot id="top-under-hero" />

        {/* ── 01 たしかめる（診断ツールの目次） ── */}
        <section className="ed-sec" id="tools">
          <div className="ed-sec-head">
            <span className="ed-no">01</span>
            <h2 className="ed-ttl">たしかめる</h2>
            <span className="ed-en">Diagnose</span>
          </div>
          <p className="ed-sec-lead">
            数問答えるだけ。あなたに合う道具も、あなたに似たプロ選手も、その場でわかります。すべて無料・登録不要。
          </p>
          <div className="index-list">
            {TOOLS.map((t, i) => (
              <a key={t.href} className="index-row" href={t.href}>
                <span className="ix-no">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="ix-ttl">
                    {t.title}
                    <span className="ix-badge">{t.badge}</span>
                  </span>
                  <span className="ix-desc">{t.desc}</span>
                </span>
                <span className="ix-arrow">→</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* ── 特集：2大診断（墨バンド） ── */}
      <section className="ink-band">
        <div className="container">
          <p className="ink-band-head">Featured</p>
          <div className="ink-band-grid">
            <a className="ink-item" href="/player-shindan/">
              <span className="ink-en">Player Match</span>
              <span className="ink-ttl">
                あなたに似た選手が、
                <br />
                きっといる。
              </span>
              <span className="ink-desc">
                はい／いいえに答えるだけで、NPB・MLB {PLAYER_COUNT}
                名からあなたに似た選手をズバリ。その選手が使うグローブ・バットのメーカーと実物まで。
              </span>
              <span className="ink-link">選手タイプ診断へ</span>
            </a>
            <a className="ink-item" href="/baseball-mbti/">
              <span className="ink-en">Baseball MBTI</span>
              <span className="ink-ttl">
                野球には、
                <br />
                性格が出る。
              </span>
              <span className="ink-desc">
                全36問・7段階の本格派。あなたの“野球選手MBTI”を軸ごとの％つきで判定し、相性の良いタイプまでわかります。
              </span>
              <span className="ink-link">野球選手MBTI診断へ</span>
            </a>
          </div>
        </div>
      </section>

      <div className="container">
        {/* ── 02 くらべる ── */}
        <section className="ed-sec">
          <div className="ed-sec-head">
            <span className="ed-no">02</span>
            <h2 className="ed-ttl">くらべる</h2>
            <span className="ed-en">Compare</span>
          </div>
          <p className="ed-sec-lead">
            価格・特徴・向き不向きを一覧で。広告に流されず、自分の基準で選ぶための比較です。
          </p>
          <div className="index-list">
            {COMPARES.map((c, i) => (
              <a key={c.href} className="index-row" href={c.href}>
                <span className="ix-no">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="ix-ttl">
                    {c.title}
                    {c.badge && <span className="ix-badge">{c.badge}</span>}
                  </span>
                  <span className="ix-desc">{c.desc}</span>
                </span>
                <span className="ix-arrow">→</span>
              </a>
            ))}
          </div>
          <a className="link-arrow ed-more" href="/hikaku/">
            比較まとめをすべて見る
          </a>
        </section>

        <AdSlot id="top-mid" />

        {/* ── 03 よみもの ── */}
        <section className="ed-sec" id="guides">
          <div className="ed-sec-head">
            <span className="ed-no">03</span>
            <h2 className="ed-ttl">よみもの</h2>
            <span className="ed-en">Guide</span>
          </div>
          <p className="ed-sec-lead">
            始め方、チーム運営、道具の手入れ、技術のコツ。現場目線の{GUIDES.length}
            記事から、人気のものを。
          </p>
          <div className="guide-cols">
            {GUIDES.slice(0, 8).map((g, i) => (
              <a key={g.href} className="index-row" href={g.href}>
                <span className="ix-no">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="ix-ttl">{g.title}</span>
                  <span className="ix-desc">{g.description}</span>
                </span>
                <span className="ix-arrow">→</span>
              </a>
            ))}
          </div>
          <a className="link-arrow ed-more" href="/guide/">
            ガイドをすべて見る（全{GUIDES.length}記事）
          </a>
        </section>
      </div>
    </main>
  );
}
