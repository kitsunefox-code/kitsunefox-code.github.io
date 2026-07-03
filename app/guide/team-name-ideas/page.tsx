import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球チーム名の決め方＆アイデア100連発【かっこいい・面白い・和風】",
  description:
    "草野球のチーム名に迷ったらこれ。かっこいい系・面白い系・和風・地名活用など、パターン別のアイデアを100個以上掲載。決め方の5ステップと、やってはいけないNG例も解説します。",
  alternates: { canonical: `${SITE_URL}/guide/team-name-ideas/` },
  openGraph: {
    title: "草野球チーム名の決め方＆アイデア100連発",
    description:
      "かっこいい系から面白い系まで。チーム名のアイデアとNG例を一挙紹介。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "草野球チーム名の決め方＆アイデア100連発【かっこいい・面白い・和風】",
    inLanguage: "ja",
    dateModified: "2026-07-03",
    author: { "@type": "Organization", name: "草野球ユニフォーム比較ナビ" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  );
}

export default function TeamNameIdeasPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>草野球チーム名の決め方＆アイデア100連発【かっこいい・面白い・和風】</h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約7分</p>

        <p>
          チーム名は一度決めたら10年使うもの。そしてユニフォームの胸に一生刻まれるものです。
          この記事では<strong>決め方の5ステップ</strong>と、
          <strong>パターン別のアイデア100個以上</strong>、やりがちなNG例を紹介します。
        </p>

        <AdSlot id="article-top" />

        <h2>チーム名の決め方 5ステップ</h2>
        <ol>
          <li>
            <strong>方向性を決める</strong>：かっこいい／面白い／地元愛——チームの雰囲気に合う路線をまず1つ
          </li>
          <li>
            <strong>候補を10個出す</strong>：LINEグループで募集。くだらない案も全部残すのがコツ
          </li>
          <li>
            <strong>声に出して呼んでみる</strong>：審判に「〇〇さん、整列してください」と呼ばれて恥ずかしくないか
          </li>
          <li>
            <strong>検索してみる</strong>：同名チームが近隣リーグにいないか、変な意味がないかをチェック
          </li>
          <li>
            <strong>投票で決定</strong>：多数決にすれば後から文句が出ません
          </li>
        </ol>
        <div className="point-box">
          <strong>ユニフォーム視点のアドバイス：</strong>
          胸マークにする場合、<strong>英字で12文字以内</strong>だとバランスよく収まります。
          長い名前は「頭文字＋ロゴ」で処理するのが定石（例：Tokyo Victory Baseball Club → TVBC）。
        </div>

        <h2>かっこいい系（英語）</h2>
        <table>
          <thead>
            <tr><th>系統</th><th>アイデア例</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>強そうな動物</td>
              <td>ファルコンズ / ウルブズ / パンサーズ / グリズリーズ / ホークス / バイパーズ / ラプターズ / コンドルズ</td>
            </tr>
            <tr>
              <td>天体・自然</td>
              <td>コメッツ / メテオーズ / サンダーボルツ / ハリケーンズ / ブリザーズ / ソルズ / エクリプス</td>
            </tr>
            <tr>
              <td>戦士・冒険</td>
              <td>ウォーリアーズ / ナイツ / バイキングス / パイレーツ / ガーディアンズ / レンジャーズ / スパルタンズ</td>
            </tr>
            <tr>
              <td>抽象・概念</td>
              <td>レガシー / エンパイア / リベリオン / フェニックス / インフィニティ / ゼニス（頂点）/ アペックス</td>
            </tr>
          </tbody>
        </table>

        <h2>面白い系（ネタ・自虐）</h2>
        <p>草野球らしさ全開の路線。対戦相手の記憶に残るのはこっちです。</p>
        <ul>
          <li><strong>自虐系</strong>：二日酔いーズ / 全員腰痛 / 月曜有給ズ / 帰宅部OB会 / 補欠の逆襲 / 肉離れーズ</li>
          <li><strong>飯・酒系</strong>：ホルモンズ / 生ビールズ / からあげ君臨 / 締めのラーメンズ / ハイボーラーズ</li>
          <li><strong>語呂系</strong>：野球する会 / とりあえず九人 / 集合10時 / だいたい勝てない / 雨天中止願い</li>
          <li><strong>パロディ系</strong>：読売ジャイアンツならぬ「読谷ジャイアンツ」など、地元地名×プロ球団風（やりすぎ注意）</li>
        </ul>

        <h2>和風・漢字系</h2>
        <ul>
          <li><strong>一文字</strong>：漢 / 侍 / 剛 / 雷 / 燕 / 鷹 / 龍 / 極</li>
          <li><strong>二文字</strong>：豪腕 / 疾風 / 雷神 / 無双 / 天晴 / 一球 / 野武士 / 快進</li>
          <li><strong>熟語・フレーズ</strong>：一球入魂 / 全力疾走 / 下剋上 / 質実剛健 / 日進月歩（打率が）</li>
          <li><strong>クラブ風</strong>：〇〇倶楽部 / 〇〇野球団 / 〇〇組（例：日曜野球倶楽部、朝練組）</li>
        </ul>

        <h2>地名・地元活用系</h2>
        <p>リーグ内で覚えてもらいやすく、地元の大会でも映える王道パターン。</p>
        <ul>
          <li><strong>地名＋動物</strong>：「〇〇（地名）ベアーズ」「〇〇イーグルス」</li>
          <li><strong>地名＋クラブ</strong>：「〇〇ベースボールクラブ」「BC〇〇」</li>
          <li><strong>駅名・川・山</strong>：多摩川リバーズ、荒川ウインズなど地形を使うと被りにくい</li>
          <li><strong>地元名物</strong>：餃子ーズ（宇都宮）、みそかつクラブ（名古屋）など名物×野球</li>
        </ul>

        <h2>やってはいけないNG例</h2>
        <table>
          <thead>
            <tr><th>NG</th><th>理由</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>実在プロ球団と完全同名</td>
              <td>大会によっては登録不可。ロゴの流用は商標的にもNG</td>
            </tr>
            <tr>
              <td>下ネタ・侮辱的な名前</td>
              <td>リーグ登録で弾かれる+審判に読み上げられて地獄</td>
            </tr>
            <tr>
              <td>読めない当て字</td>
              <td>対戦表・トーナメント表で毎回間違えられる</td>
            </tr>
            <tr>
              <td>メンバーの個人名入り</td>
              <td>その人が辞めたら詰みます</td>
            </tr>
          </tbody>
        </table>

        <h2>チーム名が決まったら：ユニフォームに入れよう</h2>
        <p>
          チーム名が決まったら、次はユニフォームの胸に刻む番です。
          昇華プリントなら複雑なロゴも追加料金なしで再現できます。
          文字数が多い場合は頭文字ロゴ＋袖にフルネームという構成もおすすめ。
        </p>
        <a className="cta-inline" href="/#compare">
          → チーム名を映えさせるユニフォームメーカー13社を比較
        </a>
        <p>
          デザインのイメージが固まっている方は、
          <a href="/shindan/">写真からぴったりのメーカーを診断</a>もどうぞ。
        </p>

        <AdSlot id="article-bottom" />
      </article>
    </main>
  );
}
