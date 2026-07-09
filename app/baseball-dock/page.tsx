import type { Metadata } from "next";
import DockShindan from "@/components/DockShindan";
import AdSlot from "@/components/AdSlot";
import { PLAYER_COUNT } from "@/data/players";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球人間ドック｜MBTI式・全45問であなたのタイプ＆最も近いプロ選手を1人ズバリ",
  description:
    "全45問すべてMBTI式の7段階で答えるだけ。あなたのMBTIタイプと、最も近いプロ選手（NPB・MLB650名超から1人・AIイラスト付き）、バット・グローブ・スパイク・バッティンググローブ・サポーターなど周辺装備の処方までを「検査結果報告書」一枚にまとめてお渡し。画像で保存してSNSにも。登録不要・無料・約5分。",
  alternates: { canonical: `${SITE_URL}/baseball-dock/` },
  openGraph: {
    title: "野球人間ドック｜MBTI式・全45問のフル診断",
    description:
      "MBTIタイプ×最も近いプロ選手を1人ズバリ。バット・グローブ・スパイク・打撃手袋・サポーターの処方まで報告書一枚に。",
    type: "website",
    url: `${SITE_URL}/baseball-dock/`,
    images: [{ url: "/og-dock.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球人間ドック｜MBTI式・全45問のフル診断",
    description: "MBTIタイプ×最も近いプロ選手を1人ズバリ。バット・グローブ・スパイク・打撃手袋・サポーターまで報告書一枚に。",
    images: ["/og-dock.png"],
  },
};

export default function BaseballDockPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "野球人間ドック",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/baseball-dock/`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hero" style={{ padding: "34px 0 28px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Full Checkup
          </p>
          <h1 style={{ fontSize: "clamp(24px, 4.6vw, 36px)", margin: "0 0 10px" }}>
            野球<span className="hl">人間ドック</span>
          </h1>
          <p>
            こころ・プレースタイル・バット・グローブ・スパイク・バッティンググローブ・まわりの装備。7つの検査を
            <strong>全45問・すべてMBTI式の7段階</strong>（そう思う〜そう思わない）で受診し、
            あなたの<strong>MBTIタイプ×最も近いプロ選手1人</strong>
            （NPB・MLB {PLAYER_COUNT}名から・AIイラスト付き）を
            <strong>「検査結果報告書」</strong>一枚にしてお渡しします。約5分・無料。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 12 }}>
        <AdSlot id="dock-top" />
        <DockShindan />
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <div className="score-howto">
          <h2 className="section-title">この検査について</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            性格（MBTI式12問）・プレースタイル（12問）・バット適性（4問）・グローブ適性（5問）・
            スパイク適性（4問）・バッティンググローブ適性（4問）・まわりの装備（4問）の計45問を、すべて
            「そう思う〜そう思わない」の7段階（性格・価値観を問う設問）で回答すると、軸ごとの傾向を％で算出し、
            あなたのMBTIタイプと収録{PLAYER_COUNT}名の中で最も近いプロ選手をマッチング。道具は
            <strong>ポジション選びではなく“あなたの気質”からグラブの型を導き</strong>、バット・グローブに加えて
            スパイク・打撃手袋（海外ブランドや、木製バット派に効く“アメフトグローブ流用”の裏技も）、
            さらに<strong>サポーター（マクダビッド等）・アンダーシャツ・ボディケアなど周辺装備</strong>まで処方します。
            イラストはAI生成のイメージで、ご本人の肖像ではありません。判定・処方はエンタメと
            道具えらびの参考としてお楽しみください。全16タイプの解説は
            <a href="/baseball-dock/type/">タイプ一覧</a>からどうぞ。
          </p>
        </div>
      </div>
    </main>
  );
}
