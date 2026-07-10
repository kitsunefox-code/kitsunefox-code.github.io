import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球のチーム練習メニュー【2時間で効率よく・少人数でもできる】",
  description:
    "限られた時間・人数でやる草野球のチーム練習メニューを、2時間の時間配分つきで具体的に紹介。アップ→キャッチボール→ノック→バッティング→連係→締めの流れ、少人数でもできる工夫、上達につながる優先順位まで。楽しく、でも中身のある練習でチームを強くしましょう。",
  alternates: { canonical: `${SITE_URL}/guide/team-practice/` },
  openGraph: {
    title: "草野球のチーム練習メニュー",
    description:
      "2時間の時間配分つき。アップ→キャッチボール→ノック→打撃→連係。少人数の工夫も。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球のチーム練習メニュー【2時間で効率よく・少人数でもできる】",
    inLanguage: "ja",
    dateModified: "2026-07-09",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "人数が少ない時の練習はどうすればいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "少人数なら、キャッチボールの質を上げる、ペッパー（トスバッティング）、内野なら2〜3人でのゴロ捕球〜送球、ティー打撃など、少ない人数でも数をこなせるメニューが有効です。人数がそろわない前提で回せる練習を用意しておくと無駄がありません。",
        },
      },
      {
        "@type": "Question",
        name: "限られた練習時間で優先すべきことは？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "まずケガ予防のアップと、全員が必ず行うキャッチボールの質。次に試合で起きやすい状況（ゴロ処理、中継、カバーリング）の連係確認です。派手なメニューより、試合に直結する基本の反復が勝率を上げます。",
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

export default function TeamPracticePage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球のチーム練習メニュー【2時間で効率よく・少人数でもできる】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <p>
          週末の限られた時間で、みんなが集まるとは限らない。
          そんな草野球でも、<strong>流れと優先順位</strong>を決めておけば、
          短い時間でしっかり中身のある練習ができます。
          <strong>2時間の時間配分つき</strong>で、そのまま使えるメニューを紹介します。
        </p>

        <div className="point-box">
          <strong>練習の優先順位：</strong>
          ①ケガ予防のアップ → ②全員必須のキャッチボールの質 → ③試合で起きる状況（ゴロ・中継・カバー）の連係。
          派手なメニューより、<strong>試合に直結する基本の反復</strong>が勝率を上げます。
        </div>

        <AdSlot id="article-top" />

        <h2>2時間の練習・時間配分（例）</h2>
        <table>
          <thead>
            <tr>
              <th>時間</th>
              <th>メニュー</th>
              <th>ねらい</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>0:00–0:15</td><td>アップ・ストレッチ・ダッシュ</td><td>ケガ予防・体を起こす</td></tr>
            <tr><td>0:15–0:35</td><td>キャッチボール（+遠投）</td><td>送球の基本・肩づくり</td></tr>
            <tr><td>0:35–1:05</td><td>ノック（内野・外野）</td><td>捕球〜送球、連係の確認</td></tr>
            <tr><td>1:05–1:40</td><td>バッティング（フリー/ティー/トス）</td><td>打撃・タイミング</td></tr>
            <tr><td>1:40–1:55</td><td>連係プレー・状況設定</td><td>中継・カバー・サインの確認</td></tr>
            <tr><td>1:55–2:00</td><td>クールダウン・ミーティング</td><td>ケア・次回の共有</td></tr>
          </tbody>
        </table>

        <h2>① アップ（ケガをしない体に）</h2>
        <ul>
          <li>軽いジョグ→動的ストレッチ（股関節・肩まわり）→ダッシュ数本</li>
          <li>いきなり全力投球・全力スイングはしない。段階的に上げる</li>
        </ul>

        <h2>② キャッチボールは「練習」にする</h2>
        <p>ただ投げ合うだけでなく、意識を持つと上達に直結します。</p>
        <ul>
          <li><strong>正確に胸へ</strong>：相手の胸に集める。ワンステップで素早く</li>
          <li><strong>捕ってから速く</strong>：握り替え〜送球のリズムを意識</li>
          <li><strong>徐々に距離を伸ばす</strong>：最後に遠投で肩を作る（無理はしない）</li>
        </ul>

        <AffiliateBox
          heading="⚾ 練習用品（ノックバット・ボール・ネット等）を探す"
          rakuten={["bat", "glove"]}
          retailers
        />

        <AdSlot id="article-mid" />

        <h2>③ ノック（守備の連係まで）</h2>
        <ul>
          <li><strong>内野</strong>：正面ゴロ→送球。慣れたら左右・ゲッツー。声を出す</li>
          <li><strong>外野</strong>：前後の打球・中継への返球。カットマンを必ず経由</li>
          <li><strong>連係</strong>：ランナーを想定し「どこへ投げるか」を体で覚える</li>
        </ul>

        <h2>④ バッティング（人数で使い分け）</h2>
        <ul>
          <li><strong>フリー打撃</strong>：投手役がいる時。実戦感覚で</li>
          <li><strong>ティー打撃</strong>：省スペース・少人数でも数を打てる。フォーム固めに最適</li>
          <li><strong>トスバッティング（ペッパー）</strong>：2人でOK。ミート技術と目の慣れ</li>
        </ul>
        <p>
          打撃で悩んでいる人は
          <a href="/guide/cant-hit/">打てない原因と直し方</a>もあわせてどうぞ。
        </p>

        <h2>⑤ 連係・状況設定（試合に直結）</h2>
        <ul>
          <li><strong>カバーリング</strong>：各ポジションの「どこをカバーするか」を確認</li>
          <li><strong>中継プレー</strong>：外野からの返球ラインを固定</li>
          <li><strong>サインの確認</strong>：バント・エンドラン等、チームの約束事を共有</li>
        </ul>

        <h2>少人数（3〜6人）でもできるメニュー</h2>
        <ul>
          <li>キャッチボールの質を徹底的に上げる（正確性・速さ）</li>
          <li>2〜3人でのゴロ捕球〜送球のローテーション</li>
          <li>ティー打撃・トスバッティングで打撃の数をこなす</li>
          <li>ランメニュー（ダッシュ・塁間走）で走力アップ</li>
        </ul>

        <h2>締め：ミーティングとケア</h2>
        <p>
          最後に軽くクールダウンし、次回の予定や課題を共有。
          翌日に疲れを残さないために<a href="/guide/body-care/">体のケア</a>も忘れずに。
          短くても「今日はこれをやった」が積み重なると、チームは確実に強くなります。
        </p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/cant-hit/">→ 打撃を伸ばす「打てない原因と直し方」</a>
          <a className="cta-inline" href="/guide/offseason/">→ オフの自主トレは「オフシーズンの練習メニュー」</a>
          <a className="cta-inline" href="/baseball-dock/">→ 自分に合う道具を「野球人間ドック」で処方</a>
        </div>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
