import AdSlot from "@/components/AdSlot";
import { makers, LAST_UPDATED } from "@/data/makers";
import { GUIDES } from "@/data/guides";
import { TOOLS } from "@/data/tools";

const PILLARS = [
  {
    href: "/hikaku/",
    kicker: "Compare",
    title: "道具・ユニフォーム比較",
    desc: `ユニフォームメーカー${makers.length}社に加え、バット・グローブ・スパイク・打撃手袋まで。ブランド・価格・特徴で見比べ。`,
  },
  {
    href: "/tools/",
    kicker: "Tools",
    title: "無料の診断ツール",
    desc: "写真でメーカー診断、バット・グローブの相性診断、おまけの占いまで。登録不要で今すぐ試せます。",
  },
  {
    href: "/guide/",
    kicker: "Guide",
    title: "お役立ちガイド",
    desc: `始め方・チーム運営・道具えらび・お手入れ・技術まで、草野球の「知りたい」を${GUIDES.length}記事で解説。`,
  },
];

export default function Home() {
  return (
    <main>
      {/* ヒーロー（写真背景・中央寄せの編集レイアウト） */}
      <div className="hero hero-photo hero-editorial">
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <p className="hero-kicker">Kusayakyu Navi</p>
          <h1>
            草野球を、
            <br />
            <span className="hl">もっと楽しく</span>。
          </h1>
          <p>
            チームづくりから、道具えらび、上達のコツまで。
            <br className="pc-br" />
            草野球の「知りたい」に、ていねいに答えるメディアです。
          </p>
          <div className="hero-cta">
            <a className="primary" href="/tools/">
              無料ツールを試す
            </a>
            <a className="ghost" href="/uniform/">
              ユニフォーム比較を見る
            </a>
          </div>
          <p className="hero-meta">
            メーカー{makers.length}社を比較 ・ 診断ツール5種 ・ ガイド
            {GUIDES.length}記事 ・ {LAST_UPDATED}更新
          </p>
        </div>
      </div>

      <div className="container">
        <AdSlot id="top-under-hero" />

        {/* 3本柱 */}
        <section>
          <h2 className="section-title">草野球ナビでできること</h2>
          <p className="section-sub">
            知りたいテーマから、どうぞ。草野球にまつわることを、まるごと。
          </p>
          <div className="pillar-grid">
            {PILLARS.map((p) => (
              <a key={p.href} className="pillar-card" href={p.href}>
                <span className="pillar-kicker">{p.kicker}</span>
                <span className="pillar-title">{p.title}</span>
                <span className="pillar-desc">{p.desc}</span>
                <span className="pillar-arrow">詳しく見る →</span>
              </a>
            ))}
          </div>
        </section>

        {/* 診断・ツール showcase */}
        <section id="tools">
          <h2 className="section-title">無料の診断・ツール</h2>
          <p className="section-sub">
            数問答えるだけ。あなたにぴったりの道具やメーカーがその場でわかります。
          </p>
          <div className="tools-grid">
            {TOOLS.map((t) => (
              <a key={t.href} className="tool-card" href={t.href}>
                <span className="tool-emoji">{t.emoji}</span>
                <span className="tool-badge">{t.badge}</span>
                <span className="tool-title">{t.title}</span>
                <span className="tool-desc">{t.desc}</span>
                <span className="tool-cta">{t.cta} →</span>
              </a>
            ))}
          </div>
        </section>

        {/* はじめての方へ */}
        <a className="start-band" href="/guide/how-to-start/">
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/gloves-grass.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">For Beginners</span>
            <span className="start-band-title">これから草野球を始める人へ</span>
            <span className="start-band-desc">
              チームの探し方・作り方から、初日の立ち回りまで。
              未経験・ブランクありでも大丈夫な「始め方 完全ガイド」を用意しました。
            </span>
            <span className="start-band-btn">始め方ガイドを読む →</span>
          </div>
        </a>

        {/* お役立ちガイド（抜粋） */}
        <section id="guides">
          <h2 className="section-title">お役立ちガイド</h2>
          <p className="section-sub">
            チーム運営から道具えらび・お手入れ・技術まで。人気の記事から。
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
      </div>
    </main>
  );
}
