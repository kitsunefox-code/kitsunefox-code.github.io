import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import TypeIcon from "@/components/TypeIcon";
import { MBTI_TYPES } from "@/data/baseballMbti";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球選手MBTI全16タイプ一覧｜あなたはどのタイプ？特徴・相性・似ている選手",
  description:
    "INTJ「知将エース」・ENFP「チームの太陽」…など、野球選手MBTI全16タイプを一覧で解説。それぞれの特徴・相性の良いタイプ／苦手なタイプ・似ているNPB/MLB選手がわかります。あなたのタイプは無料の「野球人間ドック」でチェック。",
  alternates: { canonical: `${SITE_URL}/baseball-dock/type/` },
  openGraph: {
    title: "野球選手MBTI全16タイプ一覧｜あなたはどのタイプ？",
    description: "16タイプの特徴・相性・似ている選手を解説。",
    type: "website",
    url: `${SITE_URL}/baseball-dock/type/`,
    images: [{ url: "/og-mbti.png", width: 1200, height: 630 }],
  },
};

export default function MbtiTypeHubPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "32px 0 26px" }}>
        <div className="container">
          <p className="crumbs">
            <a href="/baseball-dock/">野球選手MBTI診断</a> › タイプ一覧
          </p>
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Baseball MBTI Types
          </p>
          <h1 style={{ fontSize: "clamp(23px, 4.6vw, 34px)", margin: "6px 0 10px" }}>
            野球選手MBTI<span className="hl">全16タイプ</span>
          </h1>
          <p style={{ fontSize: 15 }}>
            あなたはどのタイプ？それぞれの特徴・相性の良いタイプ／苦手なタイプ・
            似ているNPB・MLB選手を解説しています。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 20 }}>
        <AdSlot id="mbtihub-top" />

        <div className="type-hub-grid">
          {MBTI_TYPES.map((t) => (
            <a
              key={t.code}
              className="type-hub-card"
              href={`/baseball-dock/type/${t.code.toLowerCase()}/`}
            >
              <TypeIcon icon={t.icon} className="type-hub-emoji" title={t.nickname} />
              <span className="type-hub-name">
                {t.code}
                <br />
                {t.nickname}
              </span>
              <span className="type-hub-desc">{t.catch}</span>
              <span className="type-hub-cta">解説を見る →</span>
            </a>
          ))}
        </div>

        <article className="article" style={{ marginTop: 34 }}>
          <h2>全16タイプの特徴と、似ているプロ野球選手</h2>
          <p>
            ここから下は、16タイプそれぞれの性格の出かたを文章で解説したものです。
            自分のタイプはもちろん、チームメイトや監督のタイプを読むと
            「なぜあの人はあの場面でああ言うのか」が腑に落ちることがあります。
            草野球はメンバーの気質がそのままチームの色になるので、
            打順や守備位置、任せる役割を決めるときの手がかりとしても使えます。
          </p>
          {MBTI_TYPES.map((t) => (
            <section key={t.code} style={{ marginTop: 26 }}>
              <h3>
                {t.code}／{t.nickname} — {t.catch}
              </h3>
              <p>{t.long}</p>
              <p>
                <strong>似ているプロ野球選手：</strong>
                {t.players.join("・")}
              </p>
              <p>
                <strong>道具えらびのヒント：</strong>
                {t.advice}
              </p>
            </section>
          ))}

          <h2>タイプはどうやって決まるのか</h2>
          <p>
            野球人間ドックの性格パートは、MBTIと同じ4つの軸で組み立てています。
            外向（E）と内向（I）はエネルギーの向きで、試合前に声を出して上げていくか、
            静かに集中を作るかの違いに出ます。感覚（S）と直感（N）は情報の受け取り方で、
            目の前のボールの見え方を頼りにするか、配球の流れや相手の狙いから読むかの違いです。
            思考（T）と感情（F）は判断の基準で、勝つための最適解を優先するか、
            チームの空気やメンバーの気持ちを優先するか。判断（J）と知覚（P）は進め方で、
            練習メニューを決めてから動きたいか、その日の状態を見ながら決めたいかに表れます。
          </p>
          <p>
            この4軸の組み合わせで16通りになります。どのタイプが優れているということはありません。
            守備の要になるタイプもいれば、負けている終盤に強いタイプ、
            チームの雰囲気を保つことでチームを支えるタイプもいます。
            草野球は人が集まらないと成立しない競技なので、
            数字に出ない役割ができる人の価値がとても大きい競技です。
          </p>

          <h2>チーム作りへの使い方</h2>
          <p>
            全員のタイプが分かったら、まず「決める役」と「まとめる役」を分けてみてください。
            ENTJやESTJのような判断の速いタイプに段取りを任せ、
            ESFJやENFJのような人を見るタイプに連絡と欠員のフォローを任せると、
            幹事ひとりに全部が乗る状態を避けられます。
            草野球のチームが続かなくなる原因の多くは実力差ではなく、
            特定の一人に負担が集中して燃え尽きることです。
          </p>
          <p>
            守備位置を決めるときも参考になります。ISFJやESFJのように人の状態に気づきやすいタイプは
            捕手や内野の要に向きますし、ISTPやISTJのように淡々と処理できるタイプは
            打球が集中するポジションを任せても崩れにくい。
            ESTPやESFPのように場面で燃えるタイプは、
            走塁や代打など「出番が読めない役割」で力を出します。
          </p>
          <p>
            ただしこれはあくまで傾向で、診断結果に人を当てはめる道具ではありません。
            本人がやりたいポジションがあるならそれが最優先です。
            話のきっかけとして使うのが、いちばん向いている使い方だと思います。
          </p>

          <h2>よくある質問</h2>
          <h3>診断は無料ですか。登録は必要ですか。</h3>
          <p>
            無料で、会員登録もメールアドレスの入力も必要ありません。
            回答はブラウザの中だけで計算していて、サーバーには送っていません。
            所要時間は全45問でおよそ5分です。
          </p>
          <h3>何度でも受けられますか。</h3>
          <p>
            何度でも受けられます。調子や気分によって結果が少し動くことがあるので、
            気になる場合は日を変えてもう一度受けてみてください。
            2回とも同じタイプが出るなら、それがかなり安定した傾向だと考えていいと思います。
          </p>
          <h3>結果のプロ野球選手はどう選ばれていますか。</h3>
          <p>
            NPB・MLBの選手データから、性格軸とプレースタイルの回答が最も近い1名を割り出しています。
            成績の優劣ではなく傾向の近さで選んでいるので、
            有名選手が出るとは限りません。イラストはAIで生成したイメージで、本人の肖像ではありません。
          </p>
          <h3>本家のMBTIとは違うものですか。</h3>
          <p>
            別のものです。公式のMBTI検査は有資格者による実施が必要な心理検査で、
            当サイトの診断はその4軸の考え方を野球向けに応用した独自のものです。
            結果は娯楽と道具えらびの参考としてお楽しみください。
          </p>
        </article>

        <a className="start-band" href="/baseball-dock/" style={{ marginTop: 26 }}>
          <div
            className="start-band-photo"
            style={{ backgroundImage: "url('/img/gloves-grass.jpg')" }}
            aria-hidden="true"
          />
          <div className="start-band-body">
            <span className="start-band-kicker">Baseball MBTI</span>
            <span className="start-band-title">野球人間ドックを受診する</span>
            <span className="start-band-desc">
              全45問・7段階で答えるだけ。あなたのタイプと、
              最も近いプロ選手＆使用メーカーがその場でわかります。
            </span>
            <span className="start-band-btn">無料で診断する →</span>
          </div>
        </a>
      </div>
    </main>
  );
}
