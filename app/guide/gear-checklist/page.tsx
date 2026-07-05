import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球に必要な道具・装備 一式チェックリスト【初心者向け】予算と揃える順番",
  description:
    "「誘われたけど、何を買えばいいの？」——大丈夫、最初から全部そろえる必要はありません。最低限そろえるもの／チームで借りられるもの／あると便利なものを、予算感と“揃える順番”つきで初心者向けに解説します。",
  alternates: { canonical: `${SITE_URL}/guide/gear-checklist/` },
  openGraph: {
    title: "草野球に必要な道具・装備 一式チェックリスト【初心者向け】",
    description:
      "最低限そろえるもの・予算・揃える順番。手ぶらでいいの？に答える持ち物ガイド。",
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
    author: { "@type": "Organization", name: "草野球ナビ" },
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
          「今度うちのチーム来なよ」と誘われて、いざスポーツ店に行ってみたら、
          グローブだけで何千円〜何万円まで種類があって、思わずフリーズ——。
          そんな経験、ありませんか。
        </p>
        <p>
          安心してください。<strong>最初から全部そろえる必要はまったくありません。</strong>
          この記事では、道具を<strong>「個人でそろえるもの」「チームで借りられるもの」「あると便利なもの」</strong>
          に分けて、予算感と“揃える順番”つきで整理しました。読めば、何をいつ買えばいいかがスッキリします。
        </p>

        <AdSlot id="article-top" />

        <h2>結論：最初にそろえるのは、この3点だけ</h2>
        <div className="point-box">
          <strong>①グローブ ②スパイク ③アンダーシャツ。</strong>
          この3つがあれば、練習にも試合にも参加できます。合計<strong>1.5万〜3万円</strong>が目安。
          バットやヘルメットはチームの共用品を借りられることが多いので、後回しでOKです。
        </div>

        <h2>個人でそろえるもの（優先度が高い順）</h2>
        <p>
          いきなり全部そろえるとお財布が悲鳴を上げます。まずは上から順に、必要なものだけ。
        </p>
        <table>
          <thead>
            <tr>
              <th>道具</th>
              <th>予算目安</th>
              <th>ひとこと</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>グローブ</strong>（最優先）</td>
              <td>8,000〜20,000円</td>
              <td>最初はポジション兼用の内野・外野オールラウンドが無難</td>
            </tr>
            <tr>
              <td><strong>スパイク／シューズ</strong></td>
              <td>4,000〜10,000円</td>
              <td>土なら金具、人工芝ならポイント。迷えばトレシューでも可</td>
            </tr>
            <tr>
              <td><strong>アンダーシャツ</strong></td>
              <td>1,500〜3,000円</td>
              <td>チーム指定の色に。夏用（吸汗速乾）と冬用（保温）がある</td>
            </tr>
            <tr>
              <td>アンダーソックス・ストッキング</td>
              <td>1,000〜2,000円</td>
              <td>ユニフォームの色に合わせると、チーム感が出る</td>
            </tr>
            <tr>
              <td>ベルト</td>
              <td>1,000〜2,000円</td>
              <td>色をそろえるだけで見栄えが一段アップ</td>
            </tr>
            <tr>
              <td>バッティンググローブ（任意）</td>
              <td>2,000〜4,000円</td>
              <td>マメ防止・グリップ向上。あると快適</td>
            </tr>
          </tbody>
        </table>
        <p>
          個人装備は、楽天やスポーツ量販店のセールでそろえるのが最安です。
          下の「あわせて揃えたい野球グッズ」から、品目別に探せます。
        </p>

        <h2>チームで用意するもの（たいてい借りられる）</h2>
        <p>
          ここは自分で買わなくて大丈夫なものたち。高価なものほどチーム共用が基本です。
        </p>
        <ul>
          <li><strong>バット</strong>：金属・カーボン。数本をチーム共用にするのが一般的</li>
          <li><strong>ヘルメット</strong>：打席・ベースコーチ用にチームで2〜3個</li>
          <li><strong>キャッチャー防具一式</strong>：マスク・プロテクター・レガース（高価なので共用）</li>
          <li><strong>ボール</strong>：軟式M号（一般用）。練習・試合でまとめて用意</li>
          <li><strong>救急セット・ベース</strong>：たいてい幹事が管理</li>
        </ul>
        <div className="point-box">
          初めての練習は、<strong>グローブと動ける服装だけ</strong>で参加してOK。
          周りの道具を見てから、自分に合うものを買うのが失敗しないコツです。
        </div>

        <AdSlot id="article-bottom" />

        <h2>あると便利なもの</h2>
        <ul>
          <li><strong>スポーツバッグ／リュック</strong>：道具一式が入る大きめが便利</li>
          <li><strong>タオル・着替え・日焼け止め</strong>：夏場は必須</li>
          <li><strong>サングラス</strong>：外野の飛球対策に</li>
          <li><strong>アイシング・サポーター</strong>：翌日に響かせないために（社会人の必需品）</li>
        </ul>

        <h2>そろえる順番のおすすめ</h2>
        <ol>
          <li>まずは<strong>グローブ</strong>だけ買って、練習に参加してみる</li>
          <li>続けられそうなら<strong>スパイク・アンダーシャツ</strong>を追加</li>
          <li>チームに正式加入したら<strong>ユニフォーム</strong>を作る（下記リンクで比較）</li>
          <li>余裕が出たら、バッティンググローブなどの快適グッズ</li>
        </ol>

        <h2>よくある質問</h2>
        <h3>Q. 道具はどこで買うのが安い？</h3>
        <p>
          型落ちや型付け済みを狙うなら楽天、実物を試したいならスポーツ量販店（ゼビオなど）。
          セール時期（オフシーズンの秋〜冬）が狙い目です。
        </p>
        <h3>Q. 中古でもいい？</h3>
        <p>
          グローブは中古でも十分使えます（自分の手に馴染ませればOK）。
          ただし、ヘルメットや防具など安全に関わるものは、新品が安心です。
        </p>

        <p>
          道具がそろって、チームに正式加入したら、次はユニフォーム。
          そろいの一着で、あなたの草野球ライフはぐっと楽しくなります。
        </p>
        <a className="cta-inline" href="/#compare">
          → オーダーユニフォームメーカー13社の比較ランキングを見る
        </a>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
