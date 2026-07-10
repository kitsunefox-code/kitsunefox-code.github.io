import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { PLAYERS } from "@/data/players";
import { SITE_URL, rktSearch } from "@/data/site";

// メーカー別・使用プロ選手一覧。収録DB（glove）から自動生成。
// 「ミズノ 使用選手」「ローリングス プロ グローブ」等のロングテールを狙う。
type MakerDef = { slug: string; name: string; blurb: string };

const MAKERS: MakerDef[] = [
  { slug: "mizuno", name: "ミズノ", blurb: "国内最大手の王道メーカー。プロ・アマ問わず愛用者が多く、最高峰ライン「ミズノプロ」も人気。" },
  { slug: "zett", name: "ゼット", blurb: "「プロステイタス」で知られる本格派。硬式グラブに定評があり、プロの本人モデルも多数。" },
  { slug: "ssk", name: "SSK", blurb: "「プロエッジ」が人気。手なじみ・捕球性能に優れ、とくにキャッチャーミットの名門。" },
  { slug: "rawlings", name: "ローリングス", blurb: "MLB公式球の名門。「HOH」など華やかなデザインで、メジャー志向の選手にも人気。" },
  { slug: "kubota", name: "久保田スラッガー", blurb: "内野手から絶大な支持を集める職人ブランド。独特の型と操作性で「守備がうまくなる」と評判。" },
  { slug: "asics", name: "アシックス", blurb: "「ゴールドステージ」が本格派に人気。日本製ならではの質実剛健な作りで信頼が厚い。" },
  { slug: "wilson", name: "ウィルソン", blurb: "「A2000／A2K」がメジャー内野手の定番。堅牢で型崩れしにくく、守備で魅せたい選手の憧れ。" },
];

export function generateStaticParams() {
  return MAKERS.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

function makerBySlug(slug: string) {
  return MAKERS.find((m) => m.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = makerBySlug(slug);
  if (!m) return {};
  const count = PLAYERS.filter((p) => p.glove === m.name).length;
  return {
    title: `${m.name}を使うプロ野球選手一覧【NPB・MLB ${count}名｜グローブ】`,
    description: `${m.name}のグローブを使うプロ野球選手（NPB・MLB）を一覧でまとめました。全${count}名の選手名・ポジション・バットのメーカーも掲載。「あの選手と同じ${m.name}で揃えたい」草野球プレーヤーのための早見表です。`,
    alternates: { canonical: `${SITE_URL}/players/maker/${m.slug}/` },
    openGraph: {
      title: `${m.name}を使うプロ野球選手一覧【${count}名】`,
      description: `${m.name}のグローブを使うNPB・MLB選手を一覧で。ポジション・バットも掲載。`,
      type: "website",
      url: `${SITE_URL}/players/maker/${m.slug}/`,
    },
  };
}

export default async function MakerPlayersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = makerBySlug(slug);
  if (!m) notFound();

  const players = PLAYERS.filter((p) => p.glove === m.name);
  const npb = players.filter((p) => p.league === "NPB");
  const mlb = players.filter((p) => p.league === "MLB");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${m.name}を使うプロ野球選手一覧`,
    description: `${m.name}のグローブを使うNPB・MLB選手 ${players.length}名の一覧`,
    url: `${SITE_URL}/players/maker/${m.slug}/`,
    isPartOf: { "@type": "WebSite", name: "草野球ナビ", url: SITE_URL },
  };

  const renderGroup = (label: string, list: typeof players) =>
    list.length === 0 ? null : (
      <div className="pl-group">
        <h2 className="section-title">
          {label}（{list.length}名）
        </h2>
        <div className="pl-list">
          {list.map((p) => (
            <div className="pl-row" key={`${p.league}-${p.name}`}>
              <div className="pl-head">
                <span className="pl-name">{p.name}</span>
                <span className={`pl-league ${p.league === "MLB" ? "mlb" : "npb"}`}>{p.league}</span>
                <span className="pl-pos">{p.position}</span>
              </div>
              {p.bat && (
                <div className="pl-gears">
                  <span className="pl-gear-item">
                    <span className="pl-gear-label">バット</span>
                    <a
                      className="pl-gear-link"
                      href={rktSearch(p.bat === "各社" ? "" : p.bat, "バット")}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                    >
                      {p.batModel || p.bat}
                    </a>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="hero" style={{ padding: "34px 0 24px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Players by Maker
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4.4vw, 32px)", margin: "0 0 10px" }}>
            <span className="hl">{m.name}</span>を使うプロ野球選手一覧
          </h1>
          <p>
            {m.blurb} 収録データから、{m.name}のグローブを使うプロ選手
            <strong>{players.length}名</strong>（NPB {npb.length}名／MLB {mlb.length}名）をまとめました。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
        <AdSlot id="maker-top" />

        <div className="aff-box" style={{ marginBottom: 20 }}>
          <p className="aff-heading">🛒 {m.name}のグローブ・ギアを探す</p>
          <div className="aff-grid">
            <a
              className="aff-card"
              href={rktSearch(m.name, "グローブ")}
              target="_blank"
              rel="noopener sponsored nofollow"
            >
              <span className="aff-emoji">🧤</span>
              <span className="aff-text">
                <span className="aff-label">{m.name}の軟式グローブ</span>
                <span className="aff-desc">草野球で使える一般向けモデルを楽天で見る</span>
              </span>
              <span className="aff-arrow">見る →</span>
            </a>
          </div>
          <p className="aff-note">※ 上記は広告リンクです。価格・在庫は各ストアでご確認ください。</p>
        </div>

        {renderGroup("NPB（日本）の選手", npb)}
        {renderGroup("MLB（メジャー）の選手", mlb)}

        <p className="player-disc" style={{ marginTop: 18 }}>
          ※ 使用ギア・メーカーは公開情報にもとづく参考です（時期・場面により変わることがあります）。
          メーカー名のリンクは楽天市場のおすすめ一覧（広告）が開きます。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/players/maker/">→ 他のメーカーの使用選手一覧を見る</a>
          <a className="cta-inline" href="/players/">→ 全{PLAYERS.length}名の使用ギア一覧（検索・絞り込み）へ</a>
          <a className="cta-inline" href="/glove/">→ グローブの選び方は「グローブ比較」へ</a>
          <a className="cta-inline" href="/baseball-dock/">→ あなたに近いプロ選手を「野球人間ドック」で診断</a>
        </div>
      </div>
      <GoodsLinks />
      <div style={{ height: 24 }} />
    </main>
  );
}
