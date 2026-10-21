import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import ProductCards from "@/components/ProductCards";
import EditorsPicks from "@/components/EditorsPicks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "野球スパイク／シューズ比較【2026年版】ポイントと金具の違い・主要ブランド・価格で比較",
  description:
    "野球スパイクを、樹脂ポイントと金具の違い、主要ブランド（ミズノ・アシックス・ニューバランス・ゼット）の特徴、カットの高さ、価格帯で比較。草野球で失敗しない一足の選び方まで解説します。",
  alternates: { canonical: `${SITE_URL}/spikes/` },
  openGraph: {
    title: "野球スパイク／シューズ比較【2026年版】",
    description:
      "ポイントと金具の違い、主要ブランドの特徴、価格帯で比較。草野球向けの選び方も。",
    type: "website",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "野球スパイク／シューズ比較【2026年版】ポイントと金具・主要ブランド・価格",
    inLanguage: "ja",
    dateModified: "2026-07-06",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
  );
}

export default function SpikesComparePage() {
  return (
    <main>
      <div className="hero" style={{ padding: "56px 0 46px" }}>
        <div className="container">
          <p className="hero-kicker" style={{ color: "var(--accent)" }}>
            Spikes
          </p>
          <h1>
            スパイク／シューズ<span className="hl">比較</span>
          </h1>
          <p>
            樹脂ポイントと金具の違い、主要ブランドの特徴、カット・価格で比較。
            草野球で失敗しない一足の選び方まで。
          </p>
        </div>
      </div>

      <div className="container">
        <AdSlot id="top-under-hero" />
        <article className="article">
          <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約5分</p>

          <p>
            草野球のスパイク選びは、まず<strong>ポイント（樹脂）か金具か</strong>から。
            そのうえで、ブランド・カット・価格で絞ります。
          </p>

          <EditorsPicks
            heading="編集部の一押し 野球スパイク"
            picks={[
              {
                keyword: "野球 スパイク ミズノ ポイント",
                label: "定番ポイント",
                comment: "フィットと種類の豊富さ。迷ったらまずここから選べば安心。",
              },
              {
                keyword: "野球 スパイク アシックス",
                label: "履き心地重視",
                comment: "機能性とクッションに定評。足あたりのよさで選ぶなら。",
              },
              {
                keyword: "野球 スパイク ニューバランス",
                label: "幅・快適さ",
                comment: "幅の選択肢とクッション。人気上昇中で快適さ重視の人に。",
              },
            ]}
          />

          <h2>ポイント（樹脂）と金具で比較</h2>
          <table>
            <thead>
              <tr>
                <th>種類</th>
                <th>グリップ</th>
                <th>草野球での適性</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>樹脂ポイント（スタッド）</td>
                <td>十分</td>
                <td>◎ 多くの公共グラウンドでOK。まずはこれ</td>
              </tr>
              <tr>
                <td>金具（メタル）</td>
                <td>強い</td>
                <td>△ 禁止の球場が多い。要確認</td>
              </tr>
              <tr>
                <td>トレーニングシューズ</td>
                <td>弱め</td>
                <td>○ 練習・アップ用。試合はスパイク推奨</td>
              </tr>
            </tbody>
          </table>
          <div className="point-box">
            <strong>草野球はまず樹脂ポイント：</strong>
            多くの公共グラウンドが金具スパイクを禁止しています。迷ったら樹脂ポイントを選べば、
            まず困りません。金具は使える球場を確認してから。
          </div>

          <h2>主要ブランドの傾向</h2>
          <table>
            <thead>
              <tr>
                <th>ブランド</th>
                <th>特徴</th>
                <th>価格帯目安</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ミズノ</td><td>定番。フィットと種類の豊富さ</td><td>4,000〜9,000円</td></tr>
              <tr><td>アシックス</td><td>機能性と履き心地に定評</td><td>4,500〜10,000円</td></tr>
              <tr><td>ニューバランス</td><td>クッションと幅の選択肢。人気上昇中</td><td>6,000〜13,000円</td></tr>
              <tr><td>ゼット（ZETT）</td><td>コスパ良好。手ごろに揃えたい人に</td><td>3,500〜7,000円</td></tr>
            </tbody>
          </table>

          <h2>価格帯で選ぶ早見表</h2>
          <table>
            <thead>
              <tr>
                <th>価格帯</th>
                <th>目安</th>
                <th>こんな人・代表タイプ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>エントリー</td><td>3,500〜5,500円</td><td>まず一足。人工皮革の樹脂ポイント</td></tr>
              <tr><td>ミドル</td><td>5,500〜9,000円</td><td>フィット重視。定番ブランドの中位</td></tr>
              <tr><td>ハイエンド</td><td>9,000〜13,000円</td><td>履き心地・軽さ。上位・天然皮革モデル</td></tr>
            </tbody>
          </table>

          <h2>サイズ選びで失敗しないために</h2>
          <p>
            スパイクで一番多い失敗は、素材でもブランドでもなく
            <strong>サイズ</strong>です。普段のスニーカーと同じ感覚で選ぶと、だいたい緩すぎます。
          </p>
          <ul>
            <li>
              <strong>靴下を履いた状態で合わせる</strong>——野球用の厚手ソックスやストッキングを
              履く前提なので、素足基準だと必ずずれます。
            </li>
            <li>
              <strong>つま先に5mm前後の余裕</strong>——指が当たると走塁で爪を痛めます。
              逆に1cm以上余ると、踏み込んだときに足が前に滑ります。
            </li>
            <li>
              <strong>夕方に合わせる</strong>——足は夕方にむくむので、朝のサイズで選ぶと
              試合中にきつくなることがあります。
            </li>
          </ul>
          <p className="note">
            ※ 同じ「26.5cm」でもメーカーで実寸が違います。可能なら店頭で履いて確かめ、
            通販で買う場合はメーカーのサイズ表（実寸）を必ず確認してください。
          </p>

          <h2>履き慣らしと、買い替えの目安</h2>
          <p>
            新品のスパイクをいきなり試合で使うと、靴ずれで集中できなくなります。
            <strong>練習で2〜3回履いてから試合に下ろす</strong>のが無難です。
          </p>
          <p>
            買い替えのサインは、見た目より<strong>ソールの減り</strong>です。
            ポイント（突起）が丸くなってくると、踏ん張ったときに滑ります。
            「最近やけに滑るな」と感じたら、スパイクの裏を見てください。
            アッパーが綺麗でも、ソールが減っていれば替えどきです。
          </p>

          <h2>お手入れ（これだけでかなり持ちます）</h2>
          <ul>
            <li>
              <strong>土を落として乾かす</strong>——濡れたまま袋に入れっぱなしが一番傷みます。
              新聞紙を詰めて陰干しが基本です。
            </li>
            <li>
              <strong>直射日光・ドライヤーは避ける</strong>——人工皮革も天然皮革も、
              急激に乾かすと硬くなって割れます。
            </li>
            <li>
              <strong>金具は緩みを確認</strong>——取り替え式の金具は、使っているうちに緩みます。
              シーズン中に一度は締め直してください。
            </li>
          </ul>

          <ProductCards
            keyword="野球 スパイク ポイント"
          minPrice={5000}
            heading="👟 楽天で人気の野球スパイク"
          />

          <AdSlot id="article-mid" />

          <h2>くわしい選び方</h2>
          <div className="bat-links">
            <a className="cta-inline" href="/spikes-shindan/">→ 4問の「スパイク診断」でソールとカットを提案してもらう</a>
            <a className="cta-inline" href="/baseball-dock/">→ 道具の適性をまとめて「野球人間ドック」で調べる</a>
            <a className="cta-inline" href="/guide/spikes-guide/">
              → じっくり読む「野球スパイクの選び方」
            </a>
            <a className="cta-inline" href="/guide/gear-checklist/">
              → 他に必要なものは「道具・装備 一式チェックリスト」
            </a>
          </div>
        </article>
        <div style={{ height: 24 }} />
      </div>
    </main>
  );
}
