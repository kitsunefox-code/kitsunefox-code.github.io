import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球が楽しくない・辞めたいと思ったら【原因別の対処と、続ける/離れる判断】",
  description:
    "草野球が楽しくない、行くのが億劫、辞めたい…そう感じたときの原因別の対処法をまとめました。うまくいかない・人間関係・拘束や負担・温度差など、よくある原因ごとの考え方と、続けるための工夫、そして無理せず離れる・別のチームを探すという選択肢まで。ひとりで抱え込まず、自分に合う関わり方を見つけるためのヒントです。",
  alternates: { canonical: `${SITE_URL}/guide/not-fun/` },
  openGraph: {
    title: "草野球が楽しくない・辞めたいと思ったら",
    description: "原因別の対処と、続ける工夫・離れる/別チームという選択肢。抱え込まないために。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球が楽しくない・辞めたいと思ったら【原因別の対処と判断】",
    inLanguage: "ja",
    dateModified: "2026-07-11",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "草野球が楽しくないのは自分だけ？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "そんなことはありません。うまくいかない時期、人間関係、拘束や負担、チームとの温度差など、誰しも『楽しくない』と感じる瞬間はあります。大切なのは原因を切り分けて、続け方を工夫する・関わり方を変える・無理なら離れる、と自分に合う選択をすることです。",
        },
      },
      {
        "@type": "Question",
        name: "チームを辞めるのは気まずいです。",
        acceptedAnswer: {
          "@type": "Answer",
          text: "退部は珍しいことではありません。感謝を伝え、迷惑がかかりにくいタイミング（シーズンの区切りなど）を選び、早めに正直に伝えれば、円満に離れられます。合わないチームに無理に居続けるより、別のチームや関わり方を探す方が、また野球を楽しめることもあります。",
        },
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export default function NotFunPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球が楽しくない・辞めたいと思ったら【原因別の対処と判断】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          楽しくて始めたはずの草野球が、最近ちょっとしんどい。行くのが億劫、辞めたいかも——
          そう感じるのは、<strong>あなただけではありません</strong>。
          大事なのは、なんとなくフェードアウトする前に<strong>原因を切り分ける</strong>こと。
          そのうえで「続け方を変える」「関わり方を変える」「無理なら離れる」を選べば大丈夫です。
        </p>

        <AdSlot id="article-top" />

        <h2>まず、原因を切り分ける</h2>
        <table>
          <thead>
            <tr><th>原因</th><th>ありがちな状況</th></tr>
          </thead>
          <tbody>
            <tr><td>プレーがうまくいかない</td><td>打てない・エラー・出番が少ない</td></tr>
            <tr><td>人間関係</td><td>合わない人がいる・空気が重い・怒られる</td></tr>
            <tr><td>拘束・負担</td><td>毎週の予定・雑用・遠征・費用がしんどい</td></tr>
            <tr><td>温度差</td><td>ガチ vs エンジョイ。自分の熱量と合わない</td></tr>
            <tr><td>ライフステージの変化</td><td>仕事・家庭で時間が取れなくなった</td></tr>
          </tbody>
        </table>
        <p>「なんとなく嫌」を、この5つのどれかに当てはめてみると、対処が見えてきます。</p>

        <h2>原因①：プレーがうまくいかない</h2>
        <ul>
          <li><strong>小さな成功を作る</strong>：うまくなろうと焦らず、「今日はいい当たりが1本」でOK</li>
          <li><strong>練習で自信を</strong>：<a href="/guide/cant-hit/">打てない原因と直し方</a>や<a href="/guide/team-practice/">練習メニュー</a>で一歩ずつ</li>
          <li><strong>役割を見つける</strong>：打てなくても守備・声出し・ムードメイクなど、貢献の形はいろいろ</li>
        </ul>

        <h2>原因②：人間関係</h2>
        <ul>
          <li><strong>距離を取る</strong>：合わない人とは無理に仲良くしなくていい。試合を楽しむことに集中</li>
          <li><strong>味方を作る</strong>：気の合う一人がいるだけで、居心地は変わる</li>
          <li><strong>それでも辛いなら</strong>：我慢し続ける必要はありません（後述）</li>
        </ul>

        <AdSlot id="article-mid" />

        <h2>原因③④：負担・温度差</h2>
        <ul>
          <li><strong>参加頻度を調整</strong>：毎回でなく、行ける時だけ参加できるか相談してみる</li>
          <li><strong>役割の偏りを見直す</strong>：雑用が一部に偏っていないか。分担をチームに提案</li>
          <li><strong>熱量の合うチームへ</strong>：ガチ志向とエンジョイ志向は、合うチームを選ぶと解決することが多い</li>
        </ul>

        <h2>それでも合わないなら：離れる・変えるも正解</h2>
        <p>
          いろいろ試しても楽しくないなら、<strong>無理に続ける必要はありません</strong>。
          合わないチームに我慢して居続けるより、次の選択肢を持つほうが、また野球を楽しめることもあります。
        </p>
        <ul>
          <li><strong>別のチーム・リーグを探す</strong>：熱量・雰囲気の合う場所へ（<a href="/guide/find-opponent/">対戦相手・チーム探し</a>／<a href="/guide/kanto-league/">リーグの探し方</a>）</li>
          <li><strong>助っ人として関わる</strong>：固定チームに縛られず、行ける時だけ助っ人参加という形も（<a href="/guide/helper-recruit/">助っ人の集め方</a>）</li>
          <li><strong>いったん休む</strong>：ライフステージの変化なら、無理せず休んで、また戻ればいい</li>
        </ul>
        <div className="point-box">
          <strong>辞める時は円満に：</strong>
          退部は珍しいことではありません。<strong>感謝を伝え、区切りのいいタイミングで、早めに正直に</strong>伝えれば、
          気まずくならずに離れられます。「合わなかった」だけで、あなたも相手も悪くありません。
        </div>

        <h2>そもそも、草野球は「楽しむため」のもの</h2>
        <p>
          勝ち負けも上達も大事だけど、<strong>いちばんは「楽しい」かどうか</strong>。
          自分に合う関わり方・チームを選べば、週末がまた楽しみになります。
          抱え込まず、あなたのペースで野球と付き合っていきましょう。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/find-opponent/">→ 合うチームを探すなら「対戦相手・チーム探し」</a>
          <a className="cta-inline" href="/guide/helper-recruit/">→ 縛られない「助っ人」という関わり方</a>
          <a className="cta-inline" href="/baseball-dock/">→ 気分転換に「野球人間ドック」で自分タイプ診断</a>
        </div>

        <RelatedGuides currentHref="/guide/not-fun/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
