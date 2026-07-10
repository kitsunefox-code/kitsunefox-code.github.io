import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球の雨天中止の判断基準と連絡マナー【いつ・誰が・どう決める？】",
  description:
    "草野球の雨天中止をいつ・誰が・どう判断すればいいかを解説。前日夜と当日朝の判断タイミング、雨雲レーダーや天気予報の見方、球場の使用可否（ぬかるみ・水はけ）の確認、両チーム・メンバーへの連絡の流れとマナー、中止時のキャンセル料の考え方まで。幹事・代表者が困らないための実践ガイドです。",
  alternates: { canonical: `${SITE_URL}/guide/rain-cancel/` },
  openGraph: {
    title: "草野球の雨天中止の判断基準と連絡マナー",
    description: "前日夜・当日朝の判断、レーダーの見方、球場確認、連絡の流れとマナー。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球の雨天中止の判断基準と連絡マナー【いつ・誰が・どう決める？】",
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
        name: "草野球の雨天中止はいつ決めればいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "明らかな荒天なら前日夜のうちに決めて早めに連絡すると、メンバーの予定に配慮できます。微妙な天気の場合は当日朝（集合の数時間前）に、雨雲レーダーや球場の状態を見て最終判断するのが一般的です。判断のタイミングをチームであらかじめ決めておくと迷いません。",
        },
      },
      {
        "@type": "Question",
        name: "雨は止んでいても中止になるのはなぜ？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "前日までの雨でグラウンドがぬかるんでいたり水たまりが残っていたりすると、安全にプレーできず球場が使用不可になることがあります。雨が止んでいても、球場の水はけ・状態と使用可否を確認する必要があります。管理者の指示にも従いましょう。",
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

export default function RainCancelPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球の雨天中止の判断基準と連絡マナー【いつ・誰が・どう決める？】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約5分</p>

        <p>
          「この天気、やる？やらない？」——幹事・代表者を悩ませる雨天判断。
          決めるのが遅いとメンバーに迷惑がかかり、早すぎると「やれたのに」となる。
          この記事では、<strong>いつ・誰が・どう決めるか</strong>と、揉めない連絡マナーをまとめました。
        </p>

        <AdSlot id="article-top" />

        <h2>判断のタイミング：前日夜と当日朝</h2>
        <table>
          <thead>
            <tr><th>タイミング</th><th>こんな時</th><th>ポイント</th></tr>
          </thead>
          <tbody>
            <tr><td>前日夜</td><td>予報が明らかな荒天・終日雨</td><td>早めに中止連絡。メンバーの予定に配慮できる</td></tr>
            <tr><td>当日朝（集合の数時間前）</td><td>微妙な天気・回復傾向</td><td>レーダー・球場状態を見て最終判断</td></tr>
            <tr><td>現地集合後</td><td>降ったり止んだり</td><td>安全最優先。無理はしない</td></tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>決めておくと迷わない：</strong>
          「誰が（代表・幹事）」「いつまでに（例：当日朝◯時）」「どう連絡するか（グループLINE等）」を、
          チームであらかじめルール化しておきましょう。当日バタつかず、揉めません。
        </div>

        <h2>判断の材料</h2>
        <ul>
          <li><strong>雨雲レーダー</strong>：試合時間帯に雨雲がかかるか。直前の動きを確認</li>
          <li><strong>時間帯別予報</strong>：降水確率・降水量。回復・悪化のタイミング</li>
          <li><strong>球場の状態</strong>：ぬかるみ・水たまり・水はけ。前日までの雨も影響</li>
          <li><strong>球場の使用可否</strong>：管理者・施設の判断。使用不可なら中止（<a href="/guide/ground-reservation/">球場予約ガイド</a>）</li>
          <li><strong>相手チームの意向</strong>：練習試合なら両チームで相談して決める</li>
        </ul>

        <AdSlot id="article-mid" />

        <h2>雨が止んでいても中止になる理由</h2>
        <p>
          「雨は止んだのに中止？」と思うことがありますが、
          前日までの雨で<strong>グラウンドがぬかるむ・水たまりが残る</strong>と、
          安全にプレーできず球場が使用不可になります。無理に使うと球場を傷め、次から借りにくくなることも。
          雨が上がっていても、<strong>球場の状態と使用可否の確認</strong>が必要です。
        </p>

        <h2>連絡の流れとマナー</h2>
        <ol>
          <li><strong>決めたらすぐ連絡</strong>：グループLINE等で全員に。決定時刻も明記</li>
          <li><strong>相手チーム・審判・球場へ</strong>：練習試合なら相手にも早めに連絡。予約キャンセルも忘れずに</li>
          <li><strong>代替案も添える</strong>：延期日の候補、または「本日は中止、次回◯日」など次につなげる一言を</li>
        </ol>
        <div className="point-box">
          <strong>キャンセル料に注意：</strong>
          球場によっては<strong>直前キャンセルに料金が発生</strong>することがあります。予約時にキャンセル規定を確認し、
          中止連絡はできるだけ早く。費用はチームでどう扱うかも決めておくとスムーズです。
        </div>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/game-flow/">→ 「試合の進め方・基本ルール」を読む</a>
          <a className="cta-inline" href="/guide/manners/">→ 「草野球のマナー」も読む</a>
          <a className="cta-inline" href="/guide/find-opponent/">→ 「対戦相手の探し方」（連絡の事前確認）</a>
        </div>

        <RelatedGuides currentHref="/guide/rain-cancel/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
