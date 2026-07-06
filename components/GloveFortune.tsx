"use client";

import { useState } from "react";
import AffiliateBox from "@/components/AffiliateBox";

// ===== グローブメーカー一覧（王道〜こだわり系まで） =====
type Maker = { id: string; name: string; mark: string; flavor: string };

const MAKERS: Maker[] = [
  { id: "mizuno", name: "ミズノ", mark: "M", flavor: "王道にして頂点。安定感で信頼を勝ち取るタイプ。" },
  { id: "mizunopro", name: "ミズノプロ", mark: "MP", flavor: "一切の妥協なし。細部へのこだわりが結果を分ける。" },
  { id: "zett", name: "ゼット（ZETT）", mark: "Z", flavor: "質実剛健。派手さより“効く働き”で勝負する。" },
  { id: "ssk", name: "エスエスケイ（SSK）", mark: "S", flavor: "バランス型。オールラウンドに輝く器用人。" },
  { id: "asics", name: "アシックス", mark: "a", flavor: "機能美の探求者。理詰めで攻めるほど冴える。" },
  { id: "rawlings", name: "ローリングス", mark: "R", flavor: "華やかな主役気質。魅せるプレーで場を沸かせる。" },
  { id: "wilson", name: "ウィルソン", mark: "W", flavor: "スマートで頭脳派。クレバーな判断が光る。" },
  { id: "kubota", name: "久保田スラッガー", mark: "久", flavor: "内野の申し子。捕球でうならせる職人気質。" },
  { id: "hatakeyama", name: "ハタケヤマ", mark: "旗", flavor: "捕手の魂。どっしり構えてチームを支える。" },
  { id: "donaiya", name: "ドナイヤ（donaiya）", mark: "ど", flavor: "隠れた実力派。玄人がうなる渋い活躍。" },
  { id: "ipselect", name: "アイピーセレクト（IP Select）", mark: "IP", flavor: "こだわりの化身。細部に神が宿る本格派。" },
  { id: "worldpegasus", name: "ワールドペガサス", mark: "翼", flavor: "自由な翼を持つ異端児。型破りが武器。" },
  { id: "higold", name: "ハイゴールド（HI-GOLD）", mark: "HG", flavor: "コスパ番長。堅実に得を積み上げる現実派。" },
  { id: "tamazawa", name: "玉澤（タマザワ）", mark: "玉", flavor: "老舗の風格。積み重ねた伝統が味方する。" },
  { id: "zeems", name: "ジームス（Zeems）", mark: "Ze", flavor: "通の選択。渋く、しかし確実に決める。" },
  { id: "atoms", name: "アトムズ（ATOMS）", mark: "At", flavor: "新進気鋭。勢いとチャレンジ精神が持ち味。" },
  { id: "belgard", name: "ベルガード", mark: "B", flavor: "実戦派。泥臭く勝ちを拾う勝負師。" },
  { id: "jb", name: "和牛JB／ボールパーク", mark: "JB", flavor: "革質は本物。じっくり効いてくる本格志向。" },
  { id: "ua", name: "アンダーアーマー", mark: "UA", flavor: "パワー系。攻めの姿勢がツキを呼ぶ。" },
  { id: "xanax", name: "ザナックス（XANAX）", mark: "X", flavor: "堅実な守り。手堅い一日で信頼を積む。" },
  { id: "louisville", name: "ルイスビル／ディマリニ", mark: "L", flavor: "パワフルで大胆。一発の魅力を秘める。" },
  { id: "other", name: "その他・こだわりの一品", mark: "★", flavor: "唯一無二。あなただけの運勢を切りひらく。" },
];

// ===== 決定論的な乱数（メーカー×日付でその日固定） =====
function fnv1a(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function makeRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    return s / 4294967296;
  };
}

// ===== 運勢データ =====
type Tier = { label: string; emoji: string; rank: number; weight: number; head: string };
const TIERS: Tier[] = [
  { label: "大吉", emoji: "🌟", rank: 5, weight: 3, head: "絶好調！今日のあなたは主役です" },
  { label: "中吉", emoji: "😎", rank: 4, weight: 5, head: "good day。流れはあなたの味方" },
  { label: "吉", emoji: "🙂", rank: 3, weight: 6, head: "悪くない一日。堅実にいきましょう" },
  { label: "小吉", emoji: "☺️", rank: 3, weight: 5, head: "小さなラッキーが積み重なる日" },
  { label: "末吉", emoji: "🤔", rank: 2, weight: 4, head: "後半に運が向いてくる、粘りの日" },
  { label: "凶", emoji: "🌀", rank: 1, weight: 1, head: "…だが草野球に本気の凶なし。笑って挽回だ" },
];

const POSITIONS = [
  "ピッチャー", "キャッチャー", "ファースト", "セカンド",
  "サード", "ショート", "レフト", "センター", "ライト",
];
const ITEMS = [
  "新しいアンダーシャツ", "冷えた麦茶", "赤いリストバンド", "念入りなアップ",
  "手入れしたグラブ", "白いソックス", "お気に入りの帽子", "試合前のコーヒー",
  "新品の軍手（ベンチ用）", "ひまわりの種", "ロージンバッグ", "スポーツドリンク",
];
const ADVICE = [
  "初球から振っていい日。積極性がツキを呼びます。",
  "守備位置は“半歩前”が正解。打球はあなたの正面へ。",
  "声を出すほど運気アップ。ベンチを盛り上げる人に福あり。",
  "無理なスライディングは禁物。今日は堅実な走塁で。",
  "四球を恐れず、じっくり見極めると good。",
  "試合後の一杯まで含めて“今日の運勢”。仲間との時間を大切に。",
  "ミスした次のプレーで取り返せる日。引きずらないのが吉。",
  "バントのサインが来たら決めどき。小技が光ります。",
  "エラーしても笑顔。ムードメーカーが勝利を呼び込みます。",
  "道具の手入れをすると、明日以降の運も上向きに。",
  "苦手なコースにこそチャンスあり。思い切って踏み込んで。",
  "今日は“つなぐ意識”が吉。ヒットより進塁打が効きます。",
];

function stars(n: number): string {
  return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
}

type Fortune = {
  maker: Maker;
  dateLabel: string;
  tier: Tier;
  batting: number;
  fielding: number;
  running: number;
  luckyPos: string;
  luckyNum: number;
  luckyOrder: number;
  luckyItem: string;
  advice: string;
  partner: Maker;
};

function tellFortune(maker: Maker): Fortune {
  const now = new Date();
  const ymd = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`;
  const rng = makeRng(fnv1a(`${maker.id}-${ymd}`));

  // ティア（重み付き抽選）
  const pool: Tier[] = [];
  TIERS.forEach((t) => {
    for (let i = 0; i < t.weight; i++) pool.push(t);
  });
  const tier = pool[Math.floor(rng() * pool.length)];

  // 各運はティアを基準に±1でブレさせ、整合性を保つ
  const around = (base: number) =>
    Math.max(1, Math.min(5, base + (Math.floor(rng() * 3) - 1)));
  const batting = around(tier.rank);
  const fielding = around(tier.rank);
  const running = around(tier.rank);

  const luckyPos = POSITIONS[Math.floor(rng() * POSITIONS.length)];
  const luckyNum = 1 + Math.floor(rng() * 99);
  const luckyOrder = 1 + Math.floor(rng() * 9);
  const luckyItem = ITEMS[Math.floor(rng() * ITEMS.length)];
  const advice = ADVICE[Math.floor(rng() * ADVICE.length)];

  // 相性のいいメーカー（自分以外）
  const others = MAKERS.filter((m) => m.id !== maker.id);
  const partner = others[Math.floor(rng() * others.length)];

  return {
    maker,
    dateLabel: `${now.getMonth() + 1}月${now.getDate()}日`,
    tier,
    batting,
    fielding,
    running,
    luckyPos,
    luckyNum,
    luckyOrder,
    luckyItem,
    advice,
    partner,
  };
}

export default function GloveFortune() {
  const [selId, setSelId] = useState<string | null>(null);
  const [f, setF] = useState<Fortune | null>(null);

  const run = (m: Maker) => {
    setSelId(m.id);
    setF(tellFortune(m));
    setTimeout(() => {
      document
        .getElementById("fortune-result")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const copy = () => {
    if (!f) return;
    const text = [
      `🔮グローブメーカー占い（${f.dateLabel}）`,
      `${f.maker.name}使いの今日の運勢は…【${f.tier.label}】${f.tier.emoji}`,
      `打撃運${stars(f.batting)} 守備運${stars(f.fielding)} 走塁運${stars(f.running)}`,
      `ラッキーポジション：${f.luckyPos}／ラッキー背番号：${f.luckyNum}`,
      `相性のいいメーカー：${f.partner.name}`,
      `💡${f.advice}`,
      `— 草野球ナビ`,
    ].join("\n");
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(
          () => alert("結果をコピーしました！LINE等に貼れます。"),
          () => window.prompt("コピーしてください", text)
        );
    } else {
      window.prompt("コピーしてください", text);
    }
  };

  return (
    <>
      <div className="shindan-step">
        <h2>
          <span className="step-num">?</span>
          試合でメインに使っているグローブは？
        </h2>
        <p className="step-sub">
          あなたの相棒メーカーを選ぶと、今日の運勢がわかります。こだわりの一品まで対応。
        </p>
        <div className="fortune-makers">
          {MAKERS.map((m) => (
            <button
              key={m.id}
              className={`fortune-maker ${selId === m.id ? "active" : ""}`}
              onClick={() => run(m)}
            >
              <span className="fortune-mark">{m.mark}</span>
              <span className="fortune-mname">{m.name}</span>
            </button>
          ))}
        </div>
      </div>

      {f && (
        <section id="fortune-result" style={{ paddingTop: 24 }}>
          <article className="fortune-card">
            <p className="fortune-date">{f.dateLabel}の運勢</p>
            <p className="fortune-maker-line">
              <span className="fortune-mark big">{f.maker.mark}</span>
              <span>
                <b>{f.maker.name}</b>使いのあなた
                <br />
                <small>{f.maker.flavor}</small>
              </span>
            </p>

            <div className="fortune-tier">
              <span className="fortune-tier-emoji">{f.tier.emoji}</span>
              <span className="fortune-tier-label">{f.tier.label}</span>
            </div>
            <p className="fortune-tier-head">{f.tier.head}</p>

            <div className="fortune-grid">
              <div className="fortune-cell">
                <span className="fortune-cell-k">打撃運</span>
                <span className="fortune-cell-v">{stars(f.batting)}</span>
              </div>
              <div className="fortune-cell">
                <span className="fortune-cell-k">守備運</span>
                <span className="fortune-cell-v">{stars(f.fielding)}</span>
              </div>
              <div className="fortune-cell">
                <span className="fortune-cell-k">走塁運</span>
                <span className="fortune-cell-v">{stars(f.running)}</span>
              </div>
            </div>

            <div className="fortune-lucky">
              <div>
                <span className="fortune-lucky-k">ラッキーポジション</span>
                <span className="fortune-lucky-v">{f.luckyPos}</span>
              </div>
              <div>
                <span className="fortune-lucky-k">ラッキー背番号</span>
                <span className="fortune-lucky-v">{f.luckyNum}</span>
              </div>
              <div>
                <span className="fortune-lucky-k">ラッキー打順</span>
                <span className="fortune-lucky-v">{f.luckyOrder}番</span>
              </div>
              <div>
                <span className="fortune-lucky-k">ラッキーアイテム</span>
                <span className="fortune-lucky-v">{f.luckyItem}</span>
              </div>
            </div>

            <p className="fortune-advice">💡 {f.advice}</p>
            <p className="fortune-partner">
              🤝 今日、相性のいいメーカー使い：<b>{f.partner.name}</b>
              の人と組むとツキUP
            </p>

            <div className="fortune-actions">
              <button className="btn" style={{ marginTop: 0 }} onClick={copy}>
                📋 結果をコピー（LINEでシェア）
              </button>
              <button
                className="stats-clear"
                onClick={() => {
                  setSelId(null);
                  setF(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                別のメーカーで占う
              </button>
            </div>
            <p className="fortune-note">
              ※ 運勢はメーカーと日付から決まり、毎日変わります。あくまでお遊びです⚾
            </p>
          </article>

          <AffiliateBox
            heading="🧤 新しい相棒（グローブ）を探す"
            rakuten={["glove"]}
            retailers
          />
          <a className="cta-inline" href="/guide/glove-guide/">
            → グローブの選び方も見る（軟式・ポジション別・サイズ）
          </a>
        </section>
      )}
    </>
  );
}
