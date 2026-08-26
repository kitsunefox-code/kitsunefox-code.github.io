import type { Metadata } from "next";
import DockShindan from "@/components/DockShindan";
import AdSlot from "@/components/AdSlot";
import { PLAYER_COUNT } from "@/data/players";
import { MBTI_TYPES } from "@/data/baseballMbti";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球MBTI診断【無料・全45問】16タイプ×最も近いプロ野球選手がわかる｜野球人間ドック",
  description:
    "坂本勇人・山本由伸・大谷翔平らNPB・MLB650名超から「あなたに最も近いプロ野球選手」を1人ズバリ判定。MBTI式の16タイプ野球診断（7段階×45問）で、性格タイプとおすすめ装備まで検査結果報告書一枚に。登録不要・無料・約5分。",
  alternates: { canonical: `${SITE_URL}/baseball-dock/` },
  openGraph: {
    title: "野球MBTI診断｜16タイプ×最も近いプロ野球選手がわかる",
    description:
      "MBTIタイプ×最も近いプロ選手を1人ズバリ。バット・グローブ・スパイク・打撃手袋・サポーターの処方まで報告書一枚に。",
    type: "website",
    url: `${SITE_URL}/baseball-dock/`,
    images: [{ url: "/og-dock.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球MBTI診断｜16タイプ×最も近いプロ野球選手がわかる",
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

        <article className="article" style={{ marginTop: 34 }}>
          <h2>7つの検査で何を見ているか</h2>
          <p>
            この診断は、性格だけを見るものではありません。
            草野球で実際に困るのは「自分に合う道具が分からない」ことなので、
            性格の傾向とプレースタイルを出したうえで、そこから道具の適性まで落とすように作っています。
            内訳は次のとおりです。
          </p>
          <h3>1. こころの検査（MBTI式・12問）</h3>
          <p>
            エネルギーの向き、情報の受け取り方、判断の基準、進め方の4軸を測ります。
            試合前に声を出して上げていくタイプか、静かに集中を作るタイプか。
            目の前のボールの見え方を頼りにするか、配球の流れから読むか。
            この4軸の組み合わせが16タイプになります。
          </p>
          <h3>2. プレースタイルの検査（12問）</h3>
          <p>
            打つことと守ることのどちらに気持ちが向くか、
            確実性と一発のどちらを取るか、任される場面で燃えるか慎重になるかを見ます。
            ここが最も近いプロ野球選手のマッチングに効きます。
          </p>
          <h3>3. バット適性（4問）</h3>
          <p>
            振り抜きの速さを取るか、当たったときの飛びを取るか。
            重心が手元寄りのバットと先端寄りのバットでは、同じ重量でも振り心地がまったく違います。
            自分がどちらを気持ちよく振れるタイプかを判定します。
          </p>
          <h3>4. グローブ適性（5問）</h3>
          <p>
            ここは<strong>ポジションではなく気質から型を導いている</strong>のが特徴です。
            捕球してから投げるまでを速くしたい人と、確実に握り込みたい人では、
            向いているポケットの深さも綴じ方も変わります。
            ポジションだけで選んで合わなかった経験がある人ほど、結果が腑に落ちると思います。
          </p>
          <h3>5. スパイク適性（4問）</h3>
          <p>
            土のグラウンドが多いか人工芝が多いか、足幅、踏ん張りたいか軽さを取りたいか。
            草野球は整備の甘いグラウンドを使うことも多いので、
            ここを外すと足を痛める原因になります。
          </p>
          <h3>6. バッティンググローブ適性（4問）</h3>
          <p>
            手のひらの素材と厚み、フィット感の好みを見ます。
            木製バットを使う人に効く「アメフト用グローブを流用する」裏技も、
            条件が合った場合だけ提案します。
          </p>
          <h3>7. まわりの装備（4問）</h3>
          <p>
            サポーター、アンダーシャツ、ボディケア用品まで含めた周辺装備です。
            30代以降は道具より先にここで差がつくので、
            肘・肩・腰のどこに不安があるかを聞いています。
          </p>

          <h2>16タイプ早見表</h2>
          <p>
            診断で判定されるのは次の16タイプです。それぞれの詳しい解説と似ているプロ野球選手は
            <a href="/baseball-dock/type/">タイプ一覧</a>にまとめています。
          </p>
          <table>
            <thead>
              <tr>
                <th>タイプ</th>
                <th>呼び名</th>
                <th>ひとことで言うと</th>
              </tr>
            </thead>
            <tbody>
              {MBTI_TYPES.map((t) => (
                <tr key={t.code}>
                  <td>{t.code}</td>
                  <td>{t.nickname}</td>
                  <td>{t.catch}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>結果の受け取り方</h2>
          <p>
            結果は「検査結果報告書」一枚にまとまります。
            タイプ名と各軸のパーセンテージ、最も近いプロ野球選手、
            そして7つの検査から導いた道具の処方が並びます。
            スクリーンショットを撮ってチームのグループに投げると盛り上がるので、
            新しくメンバーが入ったときのアイスブレイクにも使えます。
          </p>
          <p>
            道具の処方は、あくまで「あなたの気質から見た相性」です。
            すでに使い慣れた道具があるなら、無理に買い替える必要はありません。
            次の一本を選ぶときや、これから道具を揃える人が
            どこから手をつけるかを決めるときの手がかりとして使ってください。
            実際の価格や仕様は<a href="/hikaku/">道具・ユニフォーム比較</a>で確認できます。
          </p>

          <h2>よくある質問</h2>
          <h3>無料ですか。登録は必要ですか。</h3>
          <p>
            無料です。会員登録もメールアドレスの入力も必要ありません。
            回答はブラウザの中だけで計算しており、サーバーには送信していません。
          </p>
          <h3>どのくらい時間がかかりますか。</h3>
          <p>
            全45問で、およそ5分です。途中で中断するとやり直しになるので、
            まとまった時間に受けることをおすすめします。
          </p>
          <h3>野球経験がなくても受けられますか。</h3>
          <p>
            受けられます。設問は「そう思う〜そう思わない」の7段階で答える形式で、
            技術的な知識は要りません。これから始める人が
            最初にどんな道具を選べばいいかを知る目的でも使えます。
          </p>
          <h3>結果のプロ野球選手はどうやって選ばれていますか。</h3>
          <p>
            NPB・MLBの{PLAYER_COUNT}名から、性格軸とプレースタイルの回答が最も近い1名を割り出しています。
            成績の優劣ではなく傾向の近さで選んでいるので、有名選手が出るとは限りません。
            イラストはAIで生成したイメージで、ご本人の肖像ではありません。
          </p>
          <h3>本家のMBTIと同じものですか。</h3>
          <p>
            別のものです。公式のMBTI検査は有資格者による実施が必要な心理検査で、
            当サイトの診断はその4軸の考え方を野球向けに応用した独自のものです。
            判定と処方は、娯楽と道具えらびの参考としてお楽しみください。
          </p>
        </article>
      </div>
    </main>
  );
}
