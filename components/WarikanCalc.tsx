"use client";

// 草野球の参加費（1試合分）の割り勘計算。
//
// ● なぜ作るか
//   チーム運営でいちばん続く手間は「会計」。球場代と審判料を立て替えて、
//   参加人数で割って、端数をどうするかを毎週考えている幹事がいる。
//   しかも日本語の草野球向けに特化した計算ツールが見当たらない。
//
// ● 設計
//   静的サイトなので localStorage のみ（kusayakyu-warikan-v1）。
//   費目は毎回ほぼ同じなので、ラベルと金額を覚えておいて次回そのまま使えるようにする。
//   出力はLINEに貼れるテキスト。金額は画像より文字のほうが使いやすい。

import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "kusayakyu-warikan-v1";

type Item = { label: string; amount: string };

const DEFAULT_ITEMS: Item[] = [
  { label: "グラウンド代", amount: "" },
  { label: "審判料", amount: "" },
  { label: "ボール代", amount: "" },
];

/** 端数の処理単位。草野球の集金は100円単位が現実的 */
const UNITS = [
  { v: 100, label: "100円単位" },
  { v: 500, label: "500円単位" },
  { v: 50, label: "50円単位" },
  { v: 10, label: "10円単位" },
  { v: 1, label: "端数そのまま" },
];

const yen = (n: number) => n.toLocaleString("ja-JP") + "円";

const toNum = (s: string) => {
  // 「3,000」「3000円」のような入力も受ける
  const n = parseInt(String(s).replace(/[^\d-]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export default function WarikanCalc() {
  const [items, setItems] = useState<Item[]>(DEFAULT_ITEMS);
  const [people, setPeople] = useState("12");
  const [freeCount, setFreeCount] = useState("0");
  const [unit, setUnit] = useState(100);
  const [payer, setPayer] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as {
          items?: Item[];
          people?: string;
          unit?: number;
          payer?: string;
        };
        if (Array.isArray(s.items) && s.items.length > 0) {
          setItems(
            s.items.map((i) => ({
              label: typeof i?.label === "string" ? i.label : "",
              amount: typeof i?.amount === "string" ? i.amount : "",
            }))
          );
        }
        if (typeof s.people === "string") setPeople(s.people);
        if (typeof s.unit === "number") setUnit(s.unit);
        if (typeof s.payer === "string") setPayer(s.payer);
      }
    } catch {
      /* 読めなくても既定値で始められる */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, people, unit, payer }));
    } catch {
      /* 保存できない環境でも操作は続けられる */
    }
  }, [items, people, unit, payer, loaded]);

  const flash = useCallback((m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 2600);
  }, []);

  const setItem = (i: number, patch: Partial<Item>) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const addItem = () =>
    setItems((prev) => (prev.length >= 10 ? prev : [...prev, { label: "", amount: "" }]));

  const removeItem = (i: number) =>
    setItems((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== i)));

  const calc = useMemo(() => {
    const total = items.reduce((a, it) => a + toNum(it.amount), 0);
    const n = toNum(people);
    const free = Math.min(toNum(freeCount), Math.max(n - 1, 0));
    const payers = Math.max(n - free, 0);
    if (total === 0 || payers === 0) {
      return { total, payers, free, per: 0, collected: 0, diff: 0, raw: 0, ok: false };
    }
    const raw = total / payers;
    const per = Math.ceil(raw / unit) * unit;
    const collected = per * payers;
    return { total, payers, free, per, collected, diff: collected - total, raw, ok: true };
  }, [items, people, freeCount, unit]);

  const listText = useMemo(() => {
    const lines: string[] = ["【今日の集金】"];
    for (const it of items) {
      const a = toNum(it.amount);
      if (a > 0) lines.push(`${it.label || "その他"}　${yen(a)}`);
    }
    lines.push(`合計　${yen(calc.total)}`);
    lines.push("");
    lines.push(
      calc.free > 0
        ? `参加${toNum(people)}人（うち無料${calc.free}人）→ ${calc.payers}人で割る`
        : `参加${calc.payers}人で割る`
    );
    lines.push(`▼ ひとり ${yen(calc.per)}`);
    if (calc.diff > 0) lines.push(`（集まる合計 ${yen(calc.collected)}／余り ${yen(calc.diff)}はチーム会計へ）`);
    if (payer.trim()) lines.push("", `立て替え：${payer.trim()}さん。${payer.trim()}さんに渡してください。`);
    return lines.join("\n");
  }, [items, calc, people, payer]);

  const copyList = async () => {
    if (!calc.ok) {
      flash("金額と人数を入れてください。");
      return;
    }
    try {
      await navigator.clipboard.writeText(listText);
      flash("集金リストをコピーしました。LINEにそのまま貼れます。");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = listText;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        flash("集金リストをコピーしました。");
      } catch {
        flash("コピーできませんでした。下の文面を手で選択してください。");
      }
      ta.remove();
    }
  };

  if (!loaded) return <p className="yn-hint">読み込み中…</p>;

  return (
    <div className="wk">
      {msg && <p className="sm-note">{msg}</p>}

      {/* 費目 */}
      <div className="wk-items">
        {items.map((it, i) => (
          <div className="wk-item" key={i}>
            <input
              className="wk-label"
              type="text"
              value={it.label}
              onChange={(e) => setItem(i, { label: e.target.value })}
              placeholder="費目（例：グラウンド代）"
              maxLength={14}
              aria-label={`費目${i + 1}の名前`}
            />
            <input
              className="wk-amount"
              type="text"
              inputMode="numeric"
              value={it.amount}
              onChange={(e) => setItem(i, { amount: e.target.value })}
              placeholder="0"
              aria-label={`費目${i + 1}の金額`}
            />
            <span className="wk-yen">円</span>
            <button
              className="lm-mini lm-mini-del"
              onClick={() => removeItem(i)}
              aria-label="この費目を削除"
              title="削除"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="lm-rowops">
        <button className="sm-btn sm-btn-s" onClick={addItem} disabled={items.length >= 10}>
          ＋ 費目を増やす
        </button>
      </div>

      {/* 人数と端数 */}
      <div className="wk-meta">
        <label className="sm-f">
          <span className="sm-f-label">参加人数</span>
          <input
            className="sm-f-input"
            type="number"
            inputMode="numeric"
            min={1}
            max={40}
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </label>
        <label className="sm-f">
          <span className="sm-f-label">うち無料の人（助っ人など）</span>
          <input
            className="sm-f-input"
            type="number"
            inputMode="numeric"
            min={0}
            max={40}
            value={freeCount}
            onChange={(e) => setFreeCount(e.target.value)}
          />
        </label>
        <label className="sm-f">
          <span className="sm-f-label">端数の切り上げ</span>
          <select className="sm-f-input" value={unit} onChange={(e) => setUnit(Number(e.target.value))}>
            {UNITS.map((u) => (
              <option key={u.v} value={u.v}>
                {u.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* 結果 */}
      <div className={`wk-result ${calc.ok ? "" : "wk-result-off"}`}>
        {calc.ok ? (
          <>
            <p className="wk-res-lead">ひとり</p>
            <p className="wk-res-num">{yen(calc.per)}</p>
            <p className="wk-res-sub">
              合計 {yen(calc.total)} ÷ {calc.payers}人
              {calc.free > 0 && `（無料${calc.free}人をのぞく）`}
              ＝ {yen(Math.round(calc.raw))} を切り上げ
            </p>
            {calc.diff > 0 ? (
              <p className="wk-res-diff">
                集まる合計 {yen(calc.collected)}／<strong>余り {yen(calc.diff)}</strong>
                はチーム会計へ
              </p>
            ) : (
              <p className="wk-res-diff">過不足なし（ちょうど {yen(calc.collected)}）</p>
            )}
          </>
        ) : (
          <p className="wk-res-lead">金額と人数を入れると、ひとり分が出ます。</p>
        )}
      </div>

      {/* 立て替え */}
      <label className="sm-f sm-f-wide wk-payer">
        <span className="sm-f-label">立て替えた人（任意）</span>
        <input
          className="sm-f-input"
          type="text"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
          placeholder="例：鈴木"
          maxLength={16}
        />
      </label>

      <div className="lm-out">
        <button className="sm-btn sm-btn-main lm-make" onClick={copyList}>
          📋 集金リストをコピー（LINE用）
        </button>
      </div>

      {calc.ok && (
        <div className="wk-preview">
          <p className="lm-preview-head">貼りつく文面</p>
          <pre className="wk-pre">{listText}</pre>
        </div>
      )}

      <p className="sm-disc">
        ※ 入力した費目と金額は<strong>この端末のブラウザの中だけ</strong>に保存されます。
        毎回ほぼ同じ費目なので、次の試合は<strong>金額と人数を直すだけ</strong>で済みます。
      </p>
    </div>
  );
}
