import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import MakerFortune from "@/components/MakerFortune";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球ギアメーカー占い｜好きなメーカーを選ぶだけ・今日の運勢を毎日診断【無料】",
  description:
    "あなたが使っている（または好きな）野球メーカーを選ぶだけ。そのメーカーの人物像と、総合運・打撃運・守備運・ラッキーポジション・ラッキー背番号まで、今日の運勢を詳しく占います。毎日変わるので試合前の運試しにも。ミズノ・ゼット・SSK・久保田スラッガー・ローリングス・ウィルソンなど主要メーカーに対応。登録不要・無料。",
  alternates: { canonical: `${SITE_URL}/uranai/` },
  openGraph: {
    title: "野球ギアメーカー占い｜今日の運勢を毎日診断",
    description:
      "好きな野球メーカーを選ぶだけ。総合運・打撃運・守備運・ラッキー背番号まで、今日の運勢を詳しく。",
    type: "website",
    url: `${SITE_URL}/uranai/`,
    images: [{ url: "/og-uranai.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球ギアメーカー占い｜今日の運勢",
    description: "好きな野球メーカーを選ぶだけ。今日の運勢を詳しく占います。無料・毎日更新。",
    images: ["/og-uranai.png"],
  },
};

export default function UranaiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "野球ギアメーカー占い",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    url: `${SITE_URL}/uranai/`,
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hero" style={{ padding: "34px 0 24px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Gear Fortune
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4.4vw, 34px)", margin: "0 0 10px" }}>
            野球<span className="hl">ギアメーカー占い</span>
          </h1>
          <p>
            使っている（または好きな）野球メーカーを選ぶだけ。そのメーカーの人物像と、
            <strong>今日の運勢</strong>（総合・打撃・守備・ラッキーポジション・背番号）を詳しく占います。
            毎日変わるので、<strong>試合前の運試し</strong>にもどうぞ。登録不要・無料。
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 8, paddingBottom: 30 }}>
        <AdSlot id="uranai-top" />

        <MakerFortune />

        <section className="score-howto" style={{ marginTop: 28 }}>
          <h2 className="section-title">この占いについて</h2>
          <p className="section-sub" style={{ marginTop: 8 }}>
            主要な野球ギアメーカー（ミズノ・ミズノプロ・ゼット・SSK・久保田スラッガー・ローリングス・
            ウィルソン・ハタケヤマ・ドナイヤ・アシックスなど）から、あなたの一つを選ぶと、その場で
            今日の運勢が表示されます。運勢はメーカーと日付から算出しており<strong>毎日変わります</strong>。
            結果はSNSでシェアできるので、チームのみんなで運試しをしても盛り上がります。あくまで
            エンタメ占いとしてお楽しみください。
          </p>
          <p className="section-sub" style={{ marginTop: 10 }}>
            もっと本格的に「自分に近いプロ選手」まで知りたい人は、全45問の
            <a href="/baseball-dock/">野球人間ドック</a>へ。選んだメーカーの実際の道具は
            <a href="/players/">プロ選手の使用ギア一覧</a>や
            <a href="/glove/">グローブ比較</a>・<a href="/bat/">バット比較</a>からも探せます。
          </p>
        </section>

        <article className="article" style={{ marginTop: 30 }}>
          <h2>なぜメーカーで占うのか</h2>
          <p>
            野球をやっている人にとって、道具のメーカーは単なるブランド名ではありません。
            ミズノを使う人、ゼットを使う人、久保田スラッガーを使う人には、
            それぞれ選んだ理由と、そこに至るまでのこだわりがあります。
            「なんとなく持っている」ことがまず無い。
            だからメーカーを選ぶという行為は、その人の野球観をひとつ選ぶことに近いのです。
            この占いは、そこを入口にしています。
          </p>

          <h2>メーカーごとの色</h2>
          <h3>ミズノ／ミズノプロ</h3>
          <p>
            国内最大手で、入門機から最高峰まで幅が広いのが特徴です。
            迷ったらまずここという安心感があり、
            量販店でも取り扱いが多いので試してから買いやすいのも強みです。
            ミズノプロは職人が仕上げる上位ラインで、価格は上がりますが革の質が変わります。
          </p>
          <h3>ゼット</h3>
          <p>
            プロステイタスに代表されるように、実戦向けの作りに定評があります。
            比較的手に馴染むのが早く、硬さで苦労しにくいという声が多いメーカーです。
          </p>
          <h3>久保田スラッガー</h3>
          <p>
            内野手からの支持が特に厚いメーカーです。
            型がしっかりしていて、捕ってから投げるまでの速さを重視する人に向きます。
            最初は硬く感じますが、使い込むと持ち主の手の形になっていきます。
          </p>
          <h3>SSK</h3>
          <p>
            プロエッジをはじめ、扱いやすさとコストのバランスが良いメーカーです。
            最初の一つとしても、買い替えの選択肢としても堅実です。
          </p>
          <h3>ローリングス／ウィルソン</h3>
          <p>
            海外メーカーならではの見た目の良さと、独自の型が魅力です。
            ウィルソンは内野手用の評価が高く、ローリングスは配色の自由度で選ぶ人も多くいます。
          </p>
          <h3>ハタケヤマ／ドナイヤ</h3>
          <p>
            職人色の強い国内メーカーです。数は多く出回りませんが、
            捕手用のハタケヤマ、内野手用のドナイヤと、
            特定のポジションで強い支持を集めています。
          </p>
          <p>
            それぞれの実際の型や価格帯は
            <a href="/glove/">グローブ比較</a>と
            <a href="/players/">プロ選手の使用ギア一覧</a>で確認できます。
            自分に合うメーカーが分からない人は、
            <a href="/baseball-dock/">野球人間ドック</a>の
            グローブ適性検査で、気質から型を導けます。
          </p>

          <h2>運勢の決まり方</h2>
          <p>
            運勢は選んだメーカーと当日の日付から算出しています。
            日が変われば結果も変わるので、毎日引き直せます。
            サーバーに何かを送信することはなく、結果はブラウザの中だけで計算しています。
            当然ながら、実際の試合結果や打率とは何の関係もありません。
            試合前の景気づけとして楽しんでいただくものです。
          </p>
        </article>
      </div>
      <div style={{ height: 24 }} />
    </main>
  );
}
