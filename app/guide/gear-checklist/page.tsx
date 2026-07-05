import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球に必要な道具・装備 一式チェックリスト【初心者向け】予算と揃える順番",
  description:
    "草野球を始めるのに必要な道具を初心者向けに一覧化。グローブ・スパイク・バット・アンダーシャツなど、最低限そろえるもの／チームで用意するもの／あると便利なものを予算感つきで解説します。",
  alternates: { canonical: `${SITE_URL}/guide/gear-checklist/` },
  openGraph: {
    title: "草野球に必要な道具・装備 一式チェックリスト【初心者向け】",
    description:
      "最低限そろえるもの・予算・揃える順番。これから草野球を始める人向けの持ち物ガイド。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "草野球に必要な道具・装備 一式チェックリスト【初心者向け】予算と揃える順番",
    inLanguage: "ja",
    dateModified: "2026-07-04",
    author: { "@type": "Organization", name: "草野球ユニフォーム比較ナビ" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "草野球を始めるのに最低いくらかかりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "グローブ・スパイク・アンダーシャツなど個人装備の最低限なら1.5万〜3万円ほど。バットやヘルメットはチーム共用が多いので、まずは個人装備だけでOKです。",
        },
      },
      {
        "@type": "Question",
        name: "最初に買うべき道具は何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "グローブが最優先です。次にスパイク（またはトレーニングシューズ）、アンダーシャツ。バット・ヘルメット・キャッチャー道具はチームの共用品を借りられることが多いです。",
        },
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}

export default function GearChecklistPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>
          草野球に必要な道具・装備 一式チェックリスト【初心者向け】予算と揃える順番
        </h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約6分</p>

        <p>
          「草野球に誘われたけど、何を買えばいいの？」——大丈夫です。
          最初から全部そろえる必要はありません。この記事では
          <strong>個人でそろえるもの・チームで用意するもの・あると便利なもの</strong>
          に分けて、予算感つきで解説します。
        </p>

        <AdSlot id="article-top" />

        <h2>まず結論：最初にそろえる3点</h2>
        <div className="point-box">
          <strong>①グローブ ②スパイク ③アンダーシャツ</strong>
          。この3つがあれば練習・試合に参加できます。合計
          <strong>1.5万〜3万円</strong>が目安。バットやヘルメットはチームの共用品を
          借りられることが多いので、後回しでOKです。
        </div>

        <h2>個人でそろえるもの（優先度順）</h2>
        <table>
          <thead>
            <tr>
              <th>道具</th>
              <th>予算目安</th>
              <th>ポイント</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>グローブ</strong>（最優先）</td>
              <td>8,000〜20,000円</td>
              <td>ポジション兼用の内野・外野用オールラウンドタイプが最初は無難</td>
            </tr>
            <tr>
              <td><strong>スパイク／シューズ</strong></td>
              <td>4,000〜10,000円</td>
              <td>グラウンドが土なら金具、人工芝ならポイント。迷えばトレシューでも可</td>
            </tr>
            <tr>
              <td><strong>アンダーシャツ</strong></td>
              <td>1,500〜3,000円</td>
              <td>チーム指定の色に合わせる。夏用（吸汗速乾）と冬用（保温）がある</td>
            </tr>
            <tr>
              <td>アンダーソックス・ストッキング</td>
              <td>1,000〜2,000円</td>
              <td>ユニフォームの色に合わせて統一するとチーム感が出る</td>
            </tr>
            <tr>
              <td>ベルト</td>
              <td>1,000〜2,000円</td>
              <td>色をチームでそろえるだけで見栄えアップ</td>
            </tr>
            <tr>
              <td>バッティンググローブ（任意）</td>
              <td>2,000〜4,000円</td>
              <td>マメ防止・グリップ向上。あると快適</td>
            </tr>
          </tbody>
        </table>
        <p>
          個人装備は楽天やスポーツ用品店のセールでそろえるのが最安です。
          下の「あわせて揃えたい野球グッズ」から品目別に探せます。
        </p>

        <h2>チームで用意するもの（借りられることが多い）</h2>
        <ul>
          <li><strong>バット</strong>：金属・カーボン。数本をチーム共用にするのが一般的</li>
          <li><strong>ヘルメット</strong>：打席・ベースコーチ用にチームで2〜3個</li>
          <li><strong>キャッチャー防具一式</strong>：マスク・プロテクター・レガース（高価なので共用）</li>
          <li><strong>ボール</strong>：軟式M号（一般用）。練習・試合でまとめて用意</li>
          <li><strong>救急セット・ベース</strong>：幹事が管理</li>
        </ul>
        <div className="point-box">
          初めての練習は<strong>グローブと動ける服装だけ</strong>で参加してOK。
          周りの道具を見てから、自分に合うものを買うのが失敗しないコツです。
        </div>

        <h2>あると便利なもの</h2>
        <ul>
          <li><strong>スポーツバッグ／リュック</strong>：道具一式が入る大きめが便利</li>
          <li><strong>タオル・着替え・日焼け止め</strong>：夏場は必須</li>
          <li><strong>サングラス</strong>：外野の飛球対策に</li>
          <li><strong>アイシング・サポーター</strong>：翌日に響かせないために（社会人の必需品）</li>
        </ul>

        <h2>そろえる順番のおすすめ</h2>
        <ol>
          <li>まずは<strong>グローブ</strong>を買って練習に参加</li>
          <li>続けられそうなら<strong>スパイク・アンダーシャツ</strong>を追加</li>
          <li>チームに正式加入したら<strong>ユニフォーム</strong>を作る（下記リンクで比較）</li>
          <li>余裕が出たらバッティンググローブなどの快適グッズ</li>
        </ol>

        <h2>よくある質問</h2>
        <h3>Q. 道具はどこで買うのが安い？</h3>
        <p>
          型落ちや型付け済みを狙うなら楽天、実物を試したいならスポーツ量販店（ゼビオ等）。
          セール時期（オフシーズンの秋〜冬）が狙い目です。
        </p>
        <h3>Q. 中古でもいい？</h3>
        <p>
          グローブは中古でも十分使えます（自分の手に馴染ませればOK）。
          ヘルメットや防具など安全に関わるものは新品が安心です。
        </p>

        <p>
          道具がそろってチームに正式加入したら、次はユニフォーム。
          チームの一体感がぐっと上がります。
        </p>
        <a className="cta-inline" href="/#compare">
          → オーダーユニフォームメーカー13社の比較ランキングを見る
        </a>

        <AdSlot id="article-bottom" />
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
