"use client";

// バット診断（/bat-shindan/）。
// 旧URL /bat-shindan/ は404のまま検索結果に残っていたため、転送ではなく実体を作って回収する。
// ドックのバット設問を土台に、草野球で実際に一番の失敗要因になる
// 「長さ・重さ・バランス」の提案まで足したのがこのページの独自価値。
// ⚠️ 判定は useEffect で回答の変化を見て行う（setState は同期反映されないため）。
import { useEffect, useState } from "react";
import ProductCards from "@/components/ProductCards";
import {
  pickBatModel,
  BAT_MATERIAL_INFO,
  type BatMaterial,
  type BatModel,
} from "@/data/batData";
import { SITE_URL } from "@/data/site";

type Yn = { id: string; text: string };

// 素材・モデルを決める4問（はい／いいえ）
const YN_Q: Yn[] = [
  { id: "b1", text: "一発の魅力には抗えない。どうせ振るなら遠くへ飛ばしたい" },
  { id: "b2", text: "良い道具にはしっかりお金をかける主義だ" },
  { id: "b3", text: "自分のパワー・力には自信がある方だ" },
  { id: "b4", text: "新しいもの・最新技術にはワクワクする方だ" },
];

// 長さ・重さを決める設問
const HEIGHTS = [
  { id: "h1", label: "〜163cm", len: "82〜83cm", w: "680〜700g" },
  { id: "h2", label: "164〜170cm", len: "83〜84cm", w: "700〜720g" },
  { id: "h3", label: "171〜176cm", len: "84〜85cm", w: "710〜730g" },
  { id: "h4", label: "177cm〜", len: "85〜86cm", w: "720〜740g" },
];

const STYLES = [
  {
    id: "meet",
    label: "確実に当てたい（ミート重視）",
    adj: "目安より少し短め・軽めに",
    balance: "カウンターバランス（手元寄り）",
    why: "振り遅れが減り、変化球にも対応しやすくなります。",
  },
  {
    id: "balance",
    label: "どちらもほしい（バランス型）",
    adj: "目安どおりで",
    balance: "ミドルバランス（真ん中）",
    why: "最も扱いやすく、最初の一本で失敗しにくい選択です。",
  },
  {
    id: "power",
    label: "飛距離がほしい（長打重視）",
    adj: "目安の上限寄りに",
    balance: "トップバランス（先端寄り）",
    why: "遠心力が乗って飛びますが、振り遅れには注意が必要です。",
  },
];

type Result = {
  material: BatMaterial;
  model: BatModel;
  len: string;
  weight: string;
  balance: string;
  adj: string;
  why: string;
};

export default function BatShindan() {
  const [ans, setAns] = useState<Record<string, boolean>>({});
  const [height, setHeight] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);

  const ynDone = YN_Q.every((q) => q.id in ans);
  const allDone = ynDone && height !== "" && style !== "";

  useEffect(() => {
    if (result) return;
    if (!allDone) return;
    const yes = (id: string) => ans[id] === true;
    const material: BatMaterial =
      yes("b1") && yes("b2") ? "beyond" : yes("b2") || yes("b3") ? "carbon" : "metal";
    const model = pickBatModel(material, { latest: yes("b4"), power: yes("b3") });
    const h = HEIGHTS.find((x) => x.id === height)!;
    const s = STYLES.find((x) => x.id === style)!;
    setResult({
      material,
      model,
      len: h.len,
      weight: h.w,
      balance: s.balance,
      adj: s.adj,
      why: s.why,
    });
    setTimeout(
      () => document.getElementById("bs-result")?.scrollIntoView({ behavior: "smooth" }),
      80
    );
  }, [ans, height, style, allDone, result]);

  const reset = () => {
    setAns({});
    setHeight("");
    setStyle("");
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const answered = Object.keys(ans).length + (height ? 1 : 0) + (style ? 1 : 0);
  const total = YN_Q.length + 2;

  const shareText = result
    ? `⚾バット診断⚾\n私に合うのは【${BAT_MATERIAL_INFO[result.material].label}】の${result.model.name}、${result.len}／${result.weight}でした！`
    : "";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(SITE_URL + "/bat-shindan/")}&hashtags=${encodeURIComponent(
    "バット診断,草野球ナビ"
  )}`;

  return (
    <div className="pq">
      {!result && (
        <>
          <div className="lk-progress">
            <span className="lk-progress-label">
              全{total}問中 {answered}問 完了
            </span>
            <span className="lk-progress-bar">
              <span
                className="lk-progress-fill"
                style={{ width: `${(answered / total) * 100}%` }}
              />
            </span>
          </div>

          {YN_Q.map((q, i) => (
            <div className="pq-item" key={q.id}>
              <p className="pq-num">Q{i + 1}</p>
              <p className="pq-q">{q.text}</p>
              <div className="pq-choices">
                <button
                  className={`pq-choice ${ans[q.id] === true ? "on" : ""}`}
                  onClick={() => setAns((p) => ({ ...p, [q.id]: true }))}
                >
                  はい
                </button>
                <button
                  className={`pq-choice ${ans[q.id] === false ? "on" : ""}`}
                  onClick={() => setAns((p) => ({ ...p, [q.id]: false }))}
                >
                  いいえ
                </button>
              </div>
            </div>
          ))}

          <div className="pq-item">
            <p className="pq-num">Q5</p>
            <p className="pq-q">身長はどのくらいですか？</p>
            <div className="pq-choices">
              {HEIGHTS.map((h) => (
                <button
                  key={h.id}
                  className={`pq-choice ${height === h.id ? "on" : ""}`}
                  onClick={() => setHeight(h.id)}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pq-item">
            <p className="pq-num">Q6</p>
            <p className="pq-q">打席で優先したいのは？</p>
            <div className="pq-choices">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  className={`pq-choice ${style === s.id ? "on" : ""}`}
                  onClick={() => setStyle(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {!allDone && (
            <p className="yn-hint" style={{ textAlign: "center" }}>
              6問すべて答えると、その場で結果が出ます。
            </p>
          )}
        </>
      )}

      {result && (
        <div className="pq-result" id="bs-result">
          <p className="pq-result-label">あなたに合うバットは…</p>
          <p className="pq-name" style={{ fontSize: "clamp(22px, 5vw, 34px)" }}>
            {result.model.name}
          </p>
          <p className="pq-pos">
            {BAT_MATERIAL_INFO[result.material].label}／{result.model.maker}
          </p>
          <p className="pq-note">{result.model.note}</p>

          <div className="pq-gear">
            <p className="pq-gear-head">長さ・重さの目安</p>
            <p className="pq-gear-body">
              <strong>
                {result.len}／{result.weight}
              </strong>
              （{result.adj}）
            </p>
            <p className="pq-gear-body" style={{ marginTop: 6 }}>
              バランスは<strong>{result.balance}</strong>がおすすめ。{result.why}
            </p>
          </div>

          <div className="pq-gear">
            <p className="pq-gear-head">価格の目安</p>
            <p className="pq-gear-body">
              {BAT_MATERIAL_INFO[result.material].price}／
              {BAT_MATERIAL_INFO[result.material].feature}
            </p>
          </div>

          <p className="player-disc" style={{ textAlign: "center" }}>
            ※ 長さ・重さはあくまで目安です。迷ったら軽い方が失敗しません。
            公式戦で使うなら、JSBB（全軟）の検定マークと、所属リーグが高反発バットを
            認めているかを必ず確認してください。
          </p>

          <div className="share-box">
            <span className="share-label">結果をシェア</span>
            <div className="share-btns">
              <a className="share-btn share-x" href={xUrl} target="_blank" rel="noopener noreferrer">
                Xでシェア
              </a>
            </div>
          </div>

          <ProductCards keyword={result.model.keyword} heading={`🏏 ${result.model.name}を探す`} />

          <button className="stats-clear" onClick={reset}>
            もう一度診断する
          </button>

          <div className="bat-links">
            <a className="cta-inline" href="/bat/">
              → 素材・価格帯・メーカーをじっくり比較する
            </a>
            <a className="cta-inline" href="/guide/bat-guide/">
              → 読む「軟式バットの選び方」
            </a>
            <a className="cta-inline" href="/baseball-dock/">
              → 全45問の「野球MBTI診断」で道具一式を処方してもらう
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
