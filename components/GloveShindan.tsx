"use client";

import { useState } from "react";
import AffiliateBox from "@/components/AffiliateBox";

// ===== 回答の型 =====
type Pos = "pitcher" | "infield" | "outfield" | "catcher" | "first" | "allround";
type Hand = "s" | "m" | "l";
type Priority = "control" | "range" | "durability" | "price";
type Budget = "low" | "mid" | "high";
type Breakin = "self" | "quick" | "shop";
type Level = "beginner" | "experienced";

type Answers = {
  pos: Pos | null;
  hand: Hand | null;
  priority: Priority | null;
  budget: Budget | null;
  breakin: Breakin | null;
  level: Level | null;
};

// 全項目が回答済みの状態（index参照のためnullを除外した型）
type Filled = {
  pos: Pos;
  hand: Hand;
  priority: Priority;
  budget: Budget;
  breakin: Breakin;
  level: Level;
};

type Result = {
  typeName: string;
  typeEmoji: string;
  size: string;
  finish: string;
  material: string;
  price: string;
  breakinTip: string;
  advice: string;
};

const POS_OPTS: { v: Pos; label: string }[] = [
  { v: "pitcher", label: "ピッチャー" },
  { v: "infield", label: "内野手（二塁・遊撃・三塁）" },
  { v: "outfield", label: "外野手" },
  { v: "catcher", label: "キャッチャー" },
  { v: "first", label: "ファースト（一塁手）" },
  { v: "allround", label: "まだ決まってない／どこでも" },
];
const HAND_OPTS: { v: Hand; label: string }[] = [
  { v: "s", label: "小さめ（手が小さい・女性・細身）" },
  { v: "m", label: "普通" },
  { v: "l", label: "大きめ（手が大きい・がっしり）" },
];
const PRIORITY_OPTS: { v: Priority; label: string }[] = [
  { v: "control", label: "とにかく捕りやすさ・操作性" },
  { v: "range", label: "守備範囲の広さ（大きめ）" },
  { v: "durability", label: "革質・長く使えること" },
  { v: "price", label: "価格・コスパ" },
];
const BUDGET_OPTS: { v: Budget; label: string }[] = [
  { v: "low", label: "なるべく安く（〜1万円）" },
  { v: "mid", label: "標準（1〜2万円）" },
  { v: "high", label: "こだわりたい（2万円〜）" },
];
const BREAKIN_OPTS: { v: Breakin; label: string }[] = [
  { v: "self", label: "自分でじっくり育てたい" },
  { v: "quick", label: "すぐ試合で使いたい" },
  { v: "shop", label: "お店にまかせたい" },
];
const LEVEL_OPTS: { v: Level; label: string }[] = [
  { v: "beginner", label: "初心者・ブランクあり" },
  { v: "experienced", label: "経験者" },
];

const POS_TYPE: Record<Pos, { name: string; emoji: string; baseSize: string; pocket: string }> = {
  pitcher: { name: "投手用グローブ", emoji: "⚾", baseSize: "中〜やや大きめ", pocket: "握りが見えないクローズド（閉じた）ウェブ" },
  infield: { name: "内野手用グローブ", emoji: "🧤", baseSize: "小さめ〜中", pocket: "浅めポケットで持ち替えが速い" },
  outfield: { name: "外野手用グローブ", emoji: "🌾", baseSize: "大きめ", pocket: "深めポケットでフライを掴みやすい" },
  catcher: { name: "キャッチャーミット", emoji: "🎯", baseSize: "専用ミット", pocket: "丸く厚い捕手専用ミット" },
  first: { name: "ファーストミット", emoji: "🥇", baseSize: "専用ミット", pocket: "縦に長い一塁手専用ミット" },
  allround: { name: "オールラウンド用グローブ", emoji: "🔄", baseSize: "中サイズ", pocket: "内野〜外野を無難にカバー" },
};

function diagnose(a: Filled): Result {
  const base = POS_TYPE[a.pos];

  // サイズ（手の大きさで微調整）
  let size = base.baseSize;
  if (a.pos !== "catcher" && a.pos !== "first") {
    const adj =
      a.hand === "s" ? "（手が小さめなら1サイズ小さめが扱いやすい）"
      : a.hand === "l" ? "（手が大きめなら大きめサイズでもOK）"
      : "";
    size = `${base.baseSize}${adj}｜ポケット：${base.pocket}`;
  } else {
    size = `${base.baseSize}｜${base.pocket}`;
  }

  // 仕上げ・重視点
  const finish =
    a.priority === "control"
      ? "軽さと操作性を重視。手になじむ柔らかめの仕上げが◎"
      : a.priority === "range"
        ? "捕球面を広く。ひと回り大きめ＆深めポケットで守備範囲を稼ぐ"
        : a.priority === "durability"
          ? "しっかりした革でコシ重視。使い込むほど手になじむ本格仕様"
          : "扱いやすさ優先。エントリー〜ミドルの軽量モデルで十分";

  // 素材
  const material =
    a.budget === "high" || a.priority === "durability"
      ? "ステアハイド／キップレザーなどの上質な天然皮革"
      : a.budget === "low" || a.priority === "price"
        ? "扱いやすい合皮〜エントリー革（手入れがラク・軽い）"
        : "標準的な天然皮革（バランス型）";

  // 予算
  const price =
    a.budget === "low"
      ? "6,000〜12,000円（最初の一つに十分）"
      : a.budget === "high"
        ? "20,000〜30,000円（革質・ブランドにこだわるクラス）"
        : "13,000〜20,000円";

  // 型付けのアドバイス
  const breakinTip =
    a.breakin === "self"
      ? "手もみ＋キャッチボールでじっくり育てるのが正解。グラブオイルは薄く少量、塗りすぎ注意。育てる楽しみも味わえます。"
      : a.breakin === "quick"
        ? "「湯もみ型付け済み」やオイルグラブなど、最初から柔らかいモデルを選ぶと即戦力。買った店の型付けサービスも活用を。"
        : "購入店で型付けを依頼するのが確実。プロが手を入れると、最初から実戦で使いやすい状態に仕上がります。";

  // ひとことアドバイス
  let advice: string;
  if (a.pos === "catcher") {
    advice = "捕手は消耗が激しいポジション。丈夫さと、捕球音が鳴る“ポケットの決まりやすさ”を重視すると長く戦えます。";
  } else if (a.pos === "first") {
    advice = "一塁は捕球回数が多い。すくいやすさ重視で、少し大きめのミットが安心です。";
  } else if (a.pos === "infield") {
    advice = "内野は“持ち替えの速さ”が命。大きすぎない、浅めポケットのモデルが守備を安定させます。";
  } else if (a.pos === "outfield") {
    advice = "外野はリーチと捕球面積が武器。大きめ・深めで、フライを安心して掴める一枚を。";
  } else if (a.pos === "pitcher") {
    advice = "投手はボールの握りを隠せるクローズドウェブが基本。軽くて構えやすいモデルが投球に集中させてくれます。";
  } else {
    advice = "ポジションが固まっていないうちは、内野〜外野を無難にこなすオールラウンド用が安心。まず1つ持ち、専門化はあとからでOK。";
  }
  if (a.level === "beginner") {
    advice += " 初心者なら、最初から高級品より“扱いやすく手入れがラクな一枚”がおすすめです。";
  }

  return {
    typeName: base.name,
    typeEmoji: base.emoji,
    size,
    finish,
    material,
    price,
    breakinTip,
    advice,
  };
}

export default function GloveShindan() {
  const [a, setA] = useState<Answers>({
    pos: null,
    hand: null,
    priority: null,
    budget: null,
    breakin: null,
    level: null,
  });
  const [result, setResult] = useState<Result | null>(null);

  const ready =
    a.pos !== null &&
    a.hand !== null &&
    a.priority !== null &&
    a.budget !== null &&
    a.breakin !== null &&
    a.level !== null;

  const run = () => {
    if (!ready) return;
    setResult(diagnose(a as Filled));
    setTimeout(() => {
      document.getElementById("glove-result")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const opt = <T extends string>(
    key: keyof Answers,
    opts: { v: T; label: string }[],
    current: T | null
  ) => (
    <div className="option-grid">
      {opts.map((o) => (
        <button
          key={o.v}
          className={`option-btn ${current === o.v ? "active" : ""}`}
          onClick={() => {
            setA((prev) => ({ ...prev, [key]: o.v }));
            setResult(null);
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="shindan-step">
        <h2>
          <span className="step-num">1</span>守りたいポジションは？
        </h2>
        {opt("pos", POS_OPTS, a.pos)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">2</span>手の大きさは？
        </h2>
        {opt("hand", HAND_OPTS, a.hand)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">3</span>いちばん重視したいのは？
        </h2>
        {opt("priority", PRIORITY_OPTS, a.priority)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">4</span>予算は？
        </h2>
        {opt("budget", BUDGET_OPTS, a.budget)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">5</span>型付けはどうしたい？
        </h2>
        {opt("breakin", BREAKIN_OPTS, a.breakin)}
      </div>
      <div className="shindan-step">
        <h2>
          <span className="step-num">6</span>野球経験は？
        </h2>
        {opt("level", LEVEL_OPTS, a.level)}
      </div>

      <button className="shindan-submit" disabled={!ready} onClick={run}>
        {ready ? "🧤 診断結果を見る" : "6つの質問すべてに答えると診断できます"}
      </button>

      {result && (
        <section id="glove-result" style={{ paddingTop: 30 }}>
          <h2 className="section-title">あなたにおすすめのグローブ</h2>
          <article className="result-card first">
            <span className="result-rank-badge">
              {result.typeEmoji} おすすめは「{result.typeName}」
            </span>
            <div className="bat-spec">
              <div className="bat-spec-row">
                <span className="bat-spec-k">サイズ・型</span>
                <span className="bat-spec-v">{result.size}</span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">仕上げ・重視点</span>
                <span className="bat-spec-v">{result.finish}</span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">おすすめ素材</span>
                <span className="bat-spec-v">{result.material}</span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">予算の目安</span>
                <span className="bat-spec-v">{result.price}</span>
              </div>
              <div className="bat-spec-row">
                <span className="bat-spec-k">型付けの方針</span>
                <span className="bat-spec-v">{result.breakinTip}</span>
              </div>
            </div>
            <p className="bat-advice">💡 {result.advice}</p>
          </article>

          <AffiliateBox
            heading={`🧤 「${result.typeName}」を探す`}
            rakuten={["glove"]}
            retailers
          />

          <div className="bat-links">
            <a className="cta-inline" href="/guide/glove-guide/">
              → もっと詳しく：初めてのグローブの選び方
            </a>
            <a className="cta-inline" href="/guide/glove-care/">
              → 買ったあとに：グローブのお手入れ・型付け完全ガイド
            </a>
          </div>
        </section>
      )}
    </>
  );
}
