import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/data/site";
import { TOOLS } from "@/data/tools";

export const metadata: Metadata = {
  title: "草野球の無料ツール一覧｜ユニフォーム診断・バット診断・グローブ診断・占い",
  description:
    "草野球ナビの無料ツールをまとめて紹介。写真からメーカーを提案するユニフォーム診断、あなたに合う一本がわかるバット相性診断、ポジション別のグローブ相性診断、おまけのグローブメーカー占いまで。すべて登録不要・無料で使えます。",
  alternates: { canonical: `${SITE_URL}/tools/` },
  openGraph: {
    title: "草野球の無料ツール一覧｜診断・占い",
    description:
      "ユニフォーム診断・バット診断・グローブ診断・グローブ占い。すべて無料・登録不要。",
    type: "website",
  },
};

export default function ToolsPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "34px 0 26px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            FREE TOOLS
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            草野球の<span className="hl">無料ツール</span>一覧
          </h1>
          <p>
            道具えらびを助ける診断ツールと、ちょっとした遊びの占いをまとめました。
            すべて<strong>登録不要・無料</strong>。気になるものから試してみてください。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, paddingBottom: 40 }}>
        <AdSlot id="top-under-hero" />

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

        <section style={{ paddingTop: 10 }}>
          <h2 className="section-title">読みもので深掘りする</h2>
          <p className="section-sub">
            ツールで方向性が見えたら、選び方やお手入れの記事でさらに詳しく。
          </p>
          <div className="bat-links">
            <a className="cta-inline" href="/guide/glove-guide/">
              → 初めてのグローブの選び方
            </a>
            <a className="cta-inline" href="/guide/bat-guide/">
              → 軟式バットの選び方
            </a>
            <a className="cta-inline" href="/guide/">
              → お役立ちガイド一覧を見る
            </a>
          </div>
        </section>

        <article className="article" style={{ marginTop: 26 }}>
          <h2>どのツールから使えばいいか</h2>
          <p>
            用途がはっきりしている場合は、次の順で選んでください。
          </p>
          <h3>これから道具を一式そろえる人</h3>
          <p>
            <a href="/baseball-dock/">野球人間ドック</a>から始めてください。
            全45問と少し長いですが、性格・プレースタイル・バット・グローブ・スパイク・
            バッティンググローブ・周辺装備の7項目をまとめて判定するので、
            これ一つで「何をどういう基準で選べばいいか」が一通り出ます。所要時間は約5分です。
          </p>
          <h3>チームでユニフォームを作る人</h3>
          <p>
            <a href="/shindan/">ユニフォームぴったり診断</a>です。
            作りたいイメージの写真をアップすると配色を解析し、
            チーム人数・予算・納期と突き合わせて、条件に合うオーダーメーカーを絞り込みます。
            約30秒で終わります。人数が少ないチームほど、
            最低ロットで候補が変わるのでやっておく価値があります。
          </p>
          <h3>自分に似ているプロ野球選手だけ知りたい人</h3>
          <p>
            <a href="/similar-player/">似ているプロ野球選手診断</a>が最短です。
            性格とプレースタイルの傾向から、NPB・MLBの選手データベースで
            最も近い1名を割り出します。
          </p>
          <h3>チームで盛り上がりたいとき</h3>
          <p>
            <a href="/uranai/">野球メーカー占い</a>は、
            好きなギアメーカーを選ぶとその日の運勢が出る遊びのツールです。
            結果は日付で変わるので、試合前にみんなで引くと場が温まります。
          </p>

          <h2>ツールについてのお約束</h2>
          <p>
            掲載しているツールはすべて無料で、会員登録もメールアドレスの入力も必要ありません。
            回答や写真はブラウザの中だけで処理しており、サーバーに送信・保存していません。
            そのため途中でページを閉じると結果は消えます。
          </p>
          <p>
            診断結果は、公開情報と一般的な選び方の考え方をもとにした提案です。
            競技能力や適性を保証するものではなく、
            道具えらびの出発点として使っていただくことを想定しています。
            最終的な仕様・価格・納期は、各メーカーの公式サイトや販売店でご確認ください。
          </p>
          <p>
            表示されるイラストはAIで生成したイメージで、実在の人物の肖像ではありません。
            ツールについてのご質問やご指摘は<a href="/contact/">お問い合わせ</a>から承ります。
          </p>
        </article>
      </div>
    </main>
  );
}
