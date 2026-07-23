import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import AffiliateBox from "@/components/AffiliateBox";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球オフシーズンの練習メニュー【冬にやると差がつく自主トレ】",
  description:
    "試合の少ない冬・オフシーズンにこそ差がつく、草野球プレーヤーの自主トレを解説。家でできる素振り・体幹・下半身トレ、肩肘を守る準備、打撃・守備・走力を伸ばすメニューと、シーズンに向けたケガ予防・道具のメンテまで。オフの過ごし方で来季が変わります。",
  alternates: { canonical: `${SITE_URL}/guide/offseason/` },
  openGraph: {
    title: "草野球オフシーズンの練習メニュー",
    description:
      "冬にやると差がつく自主トレ。家でできる素振り・体幹・下半身、肩肘の準備、道具メンテまで。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "草野球オフシーズンの練習メニュー【冬にやると差がつく自主トレ】",
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
        name: "オフシーズンは何を優先して練習すればいい？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "試合がない冬は、フォーム改善と体づくり（体幹・下半身）に時間を使うのが効果的です。試合中はできない基礎固めをして、シーズン開幕に向けて徐々に実戦的な動きへ移していくのが王道です。",
        },
      },
      {
        "@type": "Question",
        name: "冬に投げ込みはしても大丈夫？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "寒い時期は筋肉や関節が硬く、いきなりの全力投球は故障のもとです。しっかり温めてから軽めに始め、距離・球数を少しずつ増やしましょう。痛みが出たら中止し、シーズンに向けて段階的に肩を作るのが安全です。",
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

export default function OffseasonPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球オフシーズンの練習メニュー【冬にやると差がつく自主トレ】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <p>
          試合が少ない冬。じつは<strong>ここでの過ごし方が来季を大きく変えます</strong>。
          みんなが休むオフだからこそ、コツコツ続けた人が春に一歩リードする。
          家でもできる<strong>フォーム改善・体づくり・故障予防</strong>を中心に、
          草野球プレーヤーのための自主トレをまとめました。
        </p>

        <div className="point-box">
          <strong>オフの基本方針：</strong>
          ①試合でできない<strong>基礎固め（フォーム・体幹・下半身）</strong>に時間を使う →
          ②開幕が近づいたら<strong>徐々に実戦的な動き</strong>へ。急に全力は故障のもと。段階的に。
        </div>

        <AdSlot id="article-top" />

        <h2>① 家でできる打撃練習</h2>
        <ul>
          <li><strong>素振り</strong>：鏡やスマホ動画でフォームチェック。ゆっくり正しい軌道を反復するほど効く</li>
          <li><strong>ティー打撃</strong>：置きティーで「中心〜やや下を水平に」を体に覚えさせる（省スペースでもネットがあれば）</li>
          <li><strong>タイミング素振り</strong>：投球動画に合わせて始動〜スイングのリズムを作る</li>
        </ul>
        <p>
          打撃の悩み別の直し方は
          <a href="/guide/cant-hit/">草野球で打てない原因と直し方</a>もあわせてどうぞ。
        </p>

        <h2>② 体づくり（体幹・下半身）</h2>
        <p>
          野球の動きは<strong>下半身と体幹</strong>が土台。オフに鍛えると打球・球速・守備範囲すべてが変わります。
        </p>
        <ul>
          <li><strong>体幹</strong>：プランク（30秒×3〜）、サイドプランク。ブレない軸を作る</li>
          <li><strong>下半身</strong>：スクワット・ランジ。踏み込みと蹴り出しの力に直結</li>
          <li><strong>股関節・柔軟</strong>：可動域を広げるとフォームが安定し、ケガもしにくくなる</li>
        </ul>

        <AffiliateBox
          heading="🏋️ 自主トレ用品（トレーニングチューブ・マット等）を探す"
          rakuten={["bat"]}
          retailers
          phiten
        />

        <AdSlot id="article-mid" />

        <h2>③ 肩・肘を「作る」（投手・野手共通）</h2>
        <p>
          寒い時期の全力投球は故障のもと。オフは<strong>肩を段階的に作る</strong>のが鉄則です。
        </p>
        <ul>
          <li><strong>チューブトレ</strong>：インナーマッスルを補強してケガ予防</li>
          <li><strong>キャッチボールは軽めから</strong>：しっかり温めてから、距離・球数を少しずつ</li>
          <li><strong>痛みが出たら中止</strong>：無理は禁物。開幕に間に合えばいい、くらいの余裕で</li>
        </ul>

        <h2>④ 走力・アジリティ</h2>
        <ul>
          <li><strong>ダッシュ・坂道走</strong>：一歩目の速さと走塁のスタミナに</li>
          <li><strong>ラダー・切り返し</strong>：守備範囲・盗塁の初動が変わる</li>
          <li><strong>縄跳び</strong>：手軽に持久力・リズム感・ふくらはぎ強化</li>
        </ul>

        <h2>⑤ オフのうちに道具メンテ</h2>
        <p>プレーが少ないオフは、道具をじっくり手入れする絶好のタイミングです。</p>
        <ul>
          <li><strong>グローブ</strong>：汚れ落とし・オイル・型直し・保管。開幕前に湯もみ型付けも</li>
          <li><strong>バット</strong>：汚れ拭き・グリップの巻き替え。複合は寒さで割れやすいので保管注意</li>
          <li><strong>スパイク・ユニフォーム</strong>：傷み・サイズを確認し、必要なら早めに買い替え</li>
        </ul>
        <p>
          お手入れの詳しい手順は
          <a href="/guide/glove-care/">グローブのお手入れ</a>・
          <a href="/guide/bat-care/">バットのお手入れ</a>・
          <a href="/guide/grip-tape/">グリップテープの巻き方</a>で解説しています。
        </p>

        <h2>週3でも差がつく・オフの1週間メニュー例</h2>
        <table>
          <thead>
            <tr>
              <th>頻度</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>週2〜3</td><td>素振り20分＋体幹・下半身トレ15分</td></tr>
            <tr><td>週1〜2</td><td>ダッシュ・アジリティ、余裕があればキャッチボール（軽め）</td></tr>
            <tr><td>毎日</td><td>ストレッチ・柔軟（5〜10分）。ケガ予防の土台</td></tr>
          </tbody>
        </table>
        <p>短時間でもいい。<strong>続けること</strong>が、春の一歩リードにつながります。</p>

        <div className="bat-links">
          <a className="cta-inline" href="/guide/body-care/">→ 「疲労回復・体のケア」で故障を防ぐ</a>
          <a className="cta-inline" href="/guide/cant-hit/">→ 打撃を見直す「打てない原因と直し方」</a>
          <a className="cta-inline" href="/baseball-dock/">→ 来季の道具を「野球人間ドック」で処方</a>
        </div>

        <RelatedGuides currentHref="/guide/offseason/" />
      </article>
      <div style={{ height: 30 }} />
    </main>
  );
}
