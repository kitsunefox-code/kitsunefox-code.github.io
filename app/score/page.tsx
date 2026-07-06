import type { Metadata } from "next";
import StatsSheet from "@/components/StatsSheet";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "かんたん成績管理｜自分の打席だけ入力するスコアシート（打率・打点・OPS自動計算）",
  description:
    "スコアブックは付けられなくても大丈夫。自分の打席の結果をタップするだけで、打率・打点・本塁打・OPSまで自動計算。試合ごとの記録もOK。アプリ不要・登録不要で、この端末に自動保存されます。",
  alternates: { canonical: `${SITE_URL}/score/` },
  openGraph: {
    title: "かんたん成績管理｜自分の打席だけ入力するスコアシート",
    description:
      "打席の結果をタップするだけで、打率・打点・OPSを自動計算。アプリ不要・登録不要。",
    type: "website",
  },
};

export default function ScorePage() {
  return (
    <main>
      <div className="hero" style={{ padding: "34px 0 28px" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", margin: "0 0 10px" }}>
            かんたん<span className="hl">成績管理</span>
          </h1>
          <p>
            スコア係がいなくても大丈夫。<strong>自分の打席だけ</strong>タップで入力すれば、
            打率・打点・本塁打・OPSまで自動で計算します。アプリ不要・登録不要、この端末に自動保存。
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 22, paddingBottom: 12 }}>
        <StatsSheet />
      </div>

      <div className="container" style={{ paddingBottom: 40 }}>
        <div className="score-howto">
          <h2 className="section-title">使い方（3ステップ）</h2>
          <ol>
            <li>
              打席が終わったら、<strong>結果ボタン（ヒット・凡退・四球…）をタップ</strong>。
              打点があれば、先に上の「打点」で数字を選んでから
            </li>
            <li>
              打率・OPSは<strong>自動で更新</strong>。試合を分けたいときは「＋ 試合を追加」
            </li>
            <li>
              シーズンの成績は「<strong>通算</strong>」に切り替え。
              「コピー」でLINEにも貼れます
            </li>
          </ol>
          <p className="section-sub" style={{ marginTop: 14 }}>
            みんな自分の打席は覚えているもの。試合後の電車の中でポチポチ入力しておけば、
            気づけば自分のシーズン成績が出来上がっています。
          </p>
          <a className="cta-inline" href="/guide/team-apps/">
            → チーム全体で管理したい人は「スコアアプリ7選」もどうぞ
          </a>
        </div>
      </div>
    </main>
  );
}
