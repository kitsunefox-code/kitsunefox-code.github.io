import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/data/site";
import { COMPARES } from "@/data/compare";

export const metadata: Metadata = {
  title: "草野球の道具・ユニフォーム比較まとめ｜バット・グローブ・スパイク・バッティンググローブ",
  description:
    "草野球の道具とユニフォームの比較をまとめました。オーダーユニフォームのメーカー比較、軟式バット・グローブ・スパイク・バッティンググローブの比較まで。ブランド・価格・特徴で見比べて、あなたに合う一品が見つかります。",
  alternates: { canonical: `${SITE_URL}/hikaku/` },
  openGraph: {
    title: "草野球の道具・ユニフォーム比較まとめ",
    description:
      "ユニフォーム・バット・グローブ・スパイク・バッティンググローブを比較。ブランド・価格・特徴で。",
    type: "website",
  },
};

export default function HikakuHubPage() {
  return (
    <main>
      <div className="hero" style={{ padding: "56px 0 46px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Compare
          </p>
          <h1>
            道具・ユニフォーム<span className="hl">比較</span>まとめ
          </h1>
          <p>
            ユニフォームから、バット・グローブ・スパイク・バッティンググローブまで。
            ブランド・価格・特徴で見比べて、あなたに合う一品を。
          </p>
        </div>
      </div>

      <div className="container">
        <AdSlot id="top-under-hero" />
        <section>
          <h2 className="section-title">比較コンテンツ一覧</h2>
          <p className="section-sub">
            知りたいカテゴリを選んでください。各ページで楽天の実売れ筋も表示します。
          </p>
          <div className="pillar-grid">
            {COMPARES.map((c) => (
              <a key={c.href} className="pillar-card" href={c.href}>
                <span className="pillar-kicker">{c.kicker}</span>
                <span className="pillar-title">{c.title}</span>
                <span className="pillar-desc">{c.desc}</span>
                <span className="pillar-arrow">比較を見る →</span>
              </a>
            ))}
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <h2 className="section-title">診断で選ぶのもおすすめ</h2>
          <p className="section-sub">
            数問答えるだけで、あなたに合う道具がその場でわかります。
          </p>
          <div className="bat-links">
            <a className="cta-inline" href="/baseball-dock/">→ 性格から道具まで「野球人間ドック」でフル診断する</a>
            <a className="cta-inline" href="/shindan/">
              → 写真でわかるユニフォーム診断
            </a>
          </div>
        </section>
        <article className="article" style={{ marginTop: 20 }}>
          <h2>道具を揃える順番と、かけるお金の配分</h2>
          <p>
            これから草野球を始める人、あるいはチームを作ったばかりの人がまず迷うのが
            「何から買えばいいのか」と「どこにお金をかけるべきか」です。
            結論から言うと、優先順位は<strong>グローブ → スパイク → バット</strong>の順です。
            グローブは守備で必ず全員が使い、手に馴染むまで時間がかかるので最初に買うべきもの。
            スパイクは怪我に直結します。バットはチームの共用品を借りられることが多いので、最後で構いません。
          </p>
          <p>
            予算配分の目安としては、最初の一式で3万円前後を見ておくと現実的です。
            グローブに1万5千円から2万円、スパイクに5千円から1万円、
            そのほかアンダーシャツやベルトなどの小物に数千円という内訳になります。
            バットを自分で買うなら、ここにさらに1万5千円から3万円が乗ります。
            費用の全体像は<a href="/guide/annual-cost/">草野球の年間費用</a>にまとめています。
          </p>

          <h3>グローブは「ポジション」より先に「捕り方」で選ぶ</h3>
          <p>
            グローブ選びでよくある失敗が、ポジションだけで型を決めてしまうことです。
            同じ内野手用でも、捕ってから投げるまでを速くしたい人が使う浅めのポケットと、
            確実に握り込みたい人が使う深めのポケットでは、まったく別物と言っていいほど使用感が違います。
            草野球はポジションが固定されないことも多いので、
            自分がどういう捕り方をする人間かで選んだほうが結果的に長く使えます。
          </p>
          <p>
            <a href="/glove/">グローブ比較</a>ではメーカーごとの型と革の傾向をまとめています。
            自分の傾向が分からない人は、
            <a href="/baseball-dock/">野球人間ドック</a>の
            グローブ適性検査（5問）で気質から型を導けます。
          </p>

          <h3>バットは重量よりバランスを見る</h3>
          <p>
            バットのカタログで最初に目に入るのは長さと重量ですが、
            振り心地を決めているのは重心の位置です。
            同じ84センチ720グラムでも、重心が手元寄りのバットは軽く感じて振り抜きやすく、
            先端寄りのバットは重く感じるかわりに当たったときに飛びます。
            スイングスピードに自信がないうちは手元寄りから入るのが安全です。
          </p>
          <p>
            軟式は打球がボールの潰れ方に左右されるため、
            硬式の常識がそのままは通用しません。詳しくは
            <a href="/bat/">バット比較</a>と
            <a href="/guide/m-ball/">M号球について</a>をご覧ください。
          </p>

          <h3>スパイクはグラウンドの種類で決まる</h3>
          <p>
            草野球で使うグラウンドは、河川敷の土、学校の校庭、人工芝と幅があります。
            金具のスパイクは土では圧倒的に踏ん張れますが、人工芝では使用を禁止されている施設が多く、
            持っていても履けない場面が出ます。
            使う頻度の高いグラウンドがどちらかで、最初の一足を決めてください。
            迷ったら樹脂ポイントが無難です。
            <a href="/spikes/">スパイク比較</a>で足幅と固定方式の違いを整理しています。
          </p>

          <h3>ユニフォームはチーム単位、道具は個人単位</h3>
          <p>
            ユニフォームだけは個人では決められません。
            オーダーメーカーによって最低ロット、納期、昇華と刺繍のどちらに強いか、
            少人数チームに対応してくれるかが大きく違います。
            人数の少ないチームが最低ロットの大きいメーカーに当たると、
            そこで話が止まってしまいます。
            <a href="/uniform/">ユニフォームメーカー比較</a>で、
            価格・納期・最低ロット・実績を横並びにしてあります。
          </p>

          <h2>比較の見方について</h2>
          <p>
            各ページの価格・納期・仕様は、メーカーの公式サイトなど公開されている情報をもとにした目安です。
            オーダー品は枚数・デザイン・時期によって実際の見積りが変わりますし、
            市販品の価格は販売店やタイミングで動きます。
            最終的な条件は必ず各メーカーの公式サイトか販売店でご確認ください。
            評価の付け方は<a href="/about/">運営者情報・評価基準</a>で公開しています。
          </p>
        </article>
        <div style={{ height: 20 }} />
      </div>
    </main>
  );
}
