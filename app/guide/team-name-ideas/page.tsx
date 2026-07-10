import type { Metadata } from "next";
import RelatedGuides from "@/components/RelatedGuides";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球チーム名の決め方＆アイデア100連発【かっこいい・面白い・和風】",
  description:
    "チーム名は一度決めたら10年もの。しかもユニフォームの胸に一生刻まれます。かっこいい系・面白い系・和風・地名活用のアイデアを100個以上、決め方の5ステップとやってはいけないNG例つきで紹介します。",
  alternates: { canonical: `${SITE_URL}/guide/team-name-ideas/` },
  openGraph: {
    title: "草野球チーム名の決め方＆アイデア100連発",
    description:
      "かっこいい系から面白い系まで。チーム名のアイデアとNG例を、決め方の手順つきで一挙紹介。",
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
    dateModified: "2026-07-04",
    author: { "@type": "Organization", name: "草野球ナビ" },
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
          チーム名決めは、立ち上げでいちばん盛り上がる——そして、いちばん揉める瞬間です。
          しかもこの名前、<strong>一度決めたら10年使う</strong>もの。
          審判に読み上げられ、対戦表に並び、そして<strong>ユニフォームの胸に一生刻まれます。</strong>
        </p>
        <p>
          とはいえ、身構えすぎる必要はありません。
          この記事では<strong>決め方の5ステップ</strong>と、
          <strong>パターン別のアイデア100個以上</strong>、そして先輩たちがやりがちなNG例を、
          まとめて置いておきます。眺めているだけで、きっとピンとくる名前が見つかります。
        </p>

        <AdSlot id="article-top" />

        <h2>決め方の5ステップ</h2>
        <p>
          いきなり多数決に持ち込むと、まとまるものもまとまりません。この順番でいきましょう。
        </p>
        <ol>
          <li>
            <strong>方向性を1つ決める</strong>：
            かっこいい／面白い／地元愛——チームの雰囲気に合う路線を、まず一本に絞る
          </li>
          <li>
            <strong>候補を10個出す</strong>：
            LINEで募集。くだらない案も全部残すのがコツ（そこから化けることがあります）
          </li>
          <li>
            <strong>声に出して呼んでみる</strong>：
            「◯◯さん、整列してください」と審判に呼ばれて、恥ずかしくないか
          </li>
          <li>
            <strong>検索してみる</strong>：
            近隣リーグに同名チームがいないか、変な意味になっていないかを確認
          </li>
          <li>
            <strong>投票で決める</strong>：
            最後は多数決に。ここまで手順を踏めば、後から文句は出ません
          </li>
        </ol>
        <div className="point-box">
          <strong>ユニフォーム視点のひとこと：</strong>
          胸マークにするなら、<strong>英字で12文字以内</strong>だとバランスよく収まります。
          長い名前は「頭文字＋ロゴ」で処理するのが定石です
          （例：Tokyo Victory Baseball Club → TVBC）。
        </div>

        <h2>かっこいい系（英語）</h2>
        <p>王道を攻めるならこのあたり。強さ・スピード・スケール感を借りてきます。</p>
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
        <p>
          草野球らしさが全開なのはこの路線。
          対戦相手の記憶にいちばん残るのは、実はかっこいい名前より、こっちだったりします。
        </p>
        <ul>
          <li><strong>自虐系</strong>：二日酔いーズ / 全員腰痛 / 月曜有給ズ / 帰宅部OB会 / 補欠の逆襲 / 肉離れーズ</li>
          <li><strong>飯・酒系</strong>：ホルモンズ / 生ビールズ / からあげ君臨 / 締めのラーメンズ / ハイボーラーズ</li>
          <li><strong>語呂系</strong>：野球する会 / とりあえず九人 / 集合10時 / だいたい勝てない / 雨天中止願い</li>
          <li><strong>パロディ系</strong>：地元地名×プロ球団風（例：読谷ジャイアンツ）。ただしやりすぎ注意</li>
        </ul>

        <h2>和風・漢字系</h2>
        <p>ユニフォームに漢字を入れると、ぐっと引き締まって見えます。</p>
        <ul>
          <li><strong>一文字</strong>：漢 / 侍 / 剛 / 雷 / 燕 / 鷹 / 龍 / 極</li>
          <li><strong>二文字</strong>：豪腕 / 疾風 / 雷神 / 無双 / 天晴 / 一球 / 野武士 / 快進</li>
          <li><strong>熟語・フレーズ</strong>：一球入魂 / 全力疾走 / 下剋上 / 質実剛健 / 日進月歩（打率が）</li>
          <li><strong>クラブ風</strong>：◯◯倶楽部 / ◯◯野球団 / ◯◯組（例：日曜野球倶楽部、朝練組）</li>
        </ul>

        <h2>地名・地元活用系</h2>
        <p>
          リーグ内で覚えてもらいやすく、地元の大会でも映える王道パターン。被りにくいのも利点です。
        </p>
        <ul>
          <li><strong>地名＋動物</strong>：「◯◯（地名）ベアーズ」「◯◯イーグルス」</li>
          <li><strong>地名＋クラブ</strong>：「◯◯ベースボールクラブ」「BC◯◯」</li>
          <li><strong>駅名・川・山</strong>：多摩川リバーズ、荒川ウインズなど。地形を使うと被りにくい</li>
          <li><strong>地元名物</strong>：餃子ーズ（宇都宮）、みそかつクラブ（名古屋）など、名物×野球</li>
        </ul>

        <AdSlot id="article-bottom" />

        <h2>やってはいけないNG例</h2>
        <p>
          最後に、勢いで決めると後悔するパターンを。ここだけは避けてください。
        </p>
        <table>
          <thead>
            <tr><th>NG</th><th>なぜダメか</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>実在プロ球団と完全同名</td>
              <td>大会によっては登録不可。ロゴの流用は商標的にもアウト</td>
            </tr>
            <tr>
              <td>下ネタ・侮辱的な名前</td>
              <td>リーグ登録で弾かれる上、審判に読み上げられて地獄を見ます</td>
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

        <h2>名前が決まったら、胸に刻もう</h2>
        <p>
          チーム名が決まったら、次はいよいよそれをユニフォームに落とし込む番。
          昇華プリントなら、複雑なロゴでも追加料金なしで再現できます。
          文字数が多い場合は、頭文字ロゴ＋袖にフルネーム、という構成もおすすめです。
        </p>
        <a className="cta-inline" href="/uniform/">
          → チーム名を映えさせるユニフォームメーカー13社を比較
        </a>
        <p>
          デザインのイメージが固まっている方は、
          <a href="/shindan/">写真からぴったりのメーカーを診断</a>もどうぞ。
        </p>

        <RelatedGuides currentHref="/guide/team-name-ideas/" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
