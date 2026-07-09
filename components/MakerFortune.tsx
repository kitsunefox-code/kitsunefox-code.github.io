"use client";

// 軽量「野球ギアメーカー占い」。生年月をタップするだけの超・低ハードル占い。
// 結果はギアメーカー推薦（楽天アフィリンク）＋本格版=野球人間ドックへの導線。
// 45問は重い層のための“入口”として、参加のきっかけを作る。
import { useState } from "react";
import { rktSearch } from "@/data/site";

type Fortune = {
  maker: string;
  catch: string; // キャッチコピー
  msg: string; // 今月のひとこと占い
};

// 生月(1-12) → メーカー占い（エンタメ・順不同のゆる割り当て）
const FORTUNES: Record<number, Fortune> = {
  1: { maker: "ミズノ", catch: "王道を征く月", msg: "基本に忠実なあなたは大器晩成型。定番の一本が、いちばん長い相棒になる。" },
  2: { maker: "アシックス", catch: "質実剛健の月", msg: "派手さより中身。コツコツ積んだ努力が、ここぞで効いてくる。" },
  3: { maker: "ゼット", catch: "勝負強さの月", msg: "チャンスに強いあなた。大事な場面ほど、力を発揮できそう。" },
  4: { maker: "SSK", catch: "フィットの月", msg: "手になじむ道具が運を呼ぶ。細部にこだわると調子が上向く。" },
  5: { maker: "久保田スラッガー", catch: "求道者の月", msg: "型にこだわる職人肌。妥協しない選択が、いい結果につながる。" },
  6: { maker: "ローリングス", catch: "華の月", msg: "注目を集める運気。思い切ったプレーが吉。魅せていこう。" },
  7: { maker: "ウィルソン", catch: "守備の月", msg: "守りであなたの真価が光る。地味な貢献が評価される週末に。" },
  8: { maker: "ドナイヤ", catch: "本格派の月", msg: "知る人ぞ知る実力者。派手さはなくとも、分かる人には分かる。" },
  9: { maker: "ハタケヤマ", catch: "扇の要の月", msg: "チームを支える司令塔運。あなたの声かけが流れを変える。" },
  10: { maker: "アイピーセレクト", catch: "感性の月", msg: "ひらめきが冴える時。直感で選んだ道具・作戦が当たりやすい。" },
  11: { maker: "ザナックス", catch: "粘りの月", msg: "簡単には倒れない粘り強さ。ねばって出塁、が勝利を呼ぶ。" },
  12: { maker: "ミズノプロ", catch: "頂点を目指す月", msg: "上を狙う気持ちが運気を押し上げる。ワンランク上の一本を。" },
};

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function MakerFortune() {
  const [month, setMonth] = useState<number | null>(null);
  const f = month ? FORTUNES[month] : null;

  return (
    <div className="mf-band">
      <div className="mf-head">
        <span className="mf-en">Gear Fortune</span>
        <h2 className="mf-title">
          ⚾ 今月の<span className="hl">ギアメーカー占い</span>
        </h2>
        <p className="mf-sub">
          生まれ月をタップするだけ。あなたに縁のある野球メーカーと、今月のひとことを占います（無料・登録不要）。
        </p>
      </div>

      {!f && (
        <div className="mf-months" role="group" aria-label="生まれ月を選ぶ">
          {MONTHS.map((m) => (
            <button key={m} className="mf-month" onClick={() => setMonth(m)}>
              {m}月
            </button>
          ))}
        </div>
      )}

      {f && (
        <div className="mf-result">
          <p className="mf-result-label">{month}月生まれのあなたは……</p>
          <p className="mf-maker">
            <span className="mf-maker-name">{f.maker}</span>
            <span className="mf-maker-catch">「{f.catch}」</span>
          </p>
          <p className="mf-msg">{f.msg}</p>
          <div className="mf-actions">
            <a
              className="mf-cta-buy"
              href={rktSearch(f.maker, "グローブ")}
              target="_blank"
              rel="nofollow sponsored noopener"
            >
              🛒 {f.maker}のギアを見る
            </a>
            <a className="mf-cta-dock" href="/baseball-dock/">
              本格派は「野球人間ドック」（全45問）→
            </a>
          </div>
          <button className="mf-again" onClick={() => setMonth(null)}>
            ← もう一度占う
          </button>
          <p className="mf-disc">
            ※ エンタメ占いです。メーカー名のリンクは楽天市場のおすすめ一覧（広告）が開きます。
          </p>
        </div>
      )}
    </div>
  );
}
