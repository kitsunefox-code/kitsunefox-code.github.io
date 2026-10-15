"use client";

// 打順表メーカー。
//
// ● なぜ作るか
//   草野球チームは毎試合オーダーを作る。たいていLINEに手打ちしている。
//   ここで作ると「画像」と「LINEに貼れる文字」の両方が一度に出るので、
//   毎週使ってもらえる＝毎週サイトに戻ってくる。
//
// ● 設計
//   静的サイトなのでデータは localStorage のみ（kusayakyu-lineup-v1）。
//   /stats/ の成績表（kusayakyu-stats-v1）から選手名と打率を引ける。
//   同じ型を別ファイルで二重に持つと壊れるので、読むときだけ最小の形で解釈する。

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderLineupCard, canvasToBlob, type LineupCardData } from "@/lib/lineupCard";

const STORAGE_KEY = "kusayakyu-lineup-v1";
const STATS_KEY = "kusayakyu-stats-v1";

/** 守備位置。草野球では指名打者を使わないことも多いのでDHは任意扱い */
const POSITIONS = ["", "投", "捕", "一", "二", "三", "遊", "左", "中", "右", "DH", "指", "—"];

type Row = { name: string; position: string };

type Saved = {
  teamName: string;
  opponent: string;
  date: string;
  note: string;
  rows: Row[];
  bench: string;
  showAvg: boolean;
};

const emptyRows = (n: number): Row[] => Array.from({ length: n }, () => ({ name: "", position: "" }));

const todayIso = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

/** 2026-10-15 → 2026年10月15日（土） */
function fmtDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  if (Number.isNaN(dt.getTime())) return "";
  const w = "日月火水木金土"[dt.getDay()];
  return `${y}年${m}月${d}日（${w}）`;
}

/** 成績表(localStorage)から {名前 → 打率} と打順を拾う。形が違っても落ちないようにする */
function readStats(): { name: string; order: number; avg: string | null }[] {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const out: { name: string; order: number; avg: string | null }[] = [];
    for (const p of parsed) {
      if (!p || typeof p !== "object") continue;
      const o = p as { name?: unknown; order?: unknown; games?: unknown };
      if (typeof o.name !== "string" || !o.name) continue;
      let ab = 0;
      let h = 0;
      if (Array.isArray(o.games)) {
        for (const g of o.games) {
          const gg = g as { ab?: unknown; h?: unknown };
          if (typeof gg?.ab === "number") ab += gg.ab;
          if (typeof gg?.h === "number") h += gg.h;
        }
      }
      const avg = ab > 0 ? (h / ab).toFixed(3).replace(/^0/, "") : null;
      out.push({ name: o.name, order: typeof o.order === "number" ? o.order : 0, avg });
    }
    return out.sort((a, b) => (a.order || 99) - (b.order || 99));
  } catch {
    return [];
  }
}

export default function LineupMaker() {
  const [teamName, setTeamName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState(todayIso());
  const [note, setNote] = useState("");
  const [rows, setRows] = useState<Row[]>(emptyRows(9));
  const [bench, setBench] = useState("");
  const [showAvg, setShowAvg] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [msg, setMsg] = useState("");
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [statsCount, setStatsCount] = useState(0);
  const firstRef = useRef<HTMLInputElement>(null);

  // 読み込み
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as Partial<Saved>;
        if (typeof s.teamName === "string") setTeamName(s.teamName);
        if (typeof s.note === "string") setNote(s.note);
        if (Array.isArray(s.rows) && s.rows.length > 0) {
          setRows(
            s.rows.map((r) => ({
              name: typeof r?.name === "string" ? r.name : "",
              position: typeof r?.position === "string" ? r.position : "",
            }))
          );
        }
        if (typeof s.bench === "string") setBench(s.bench);
        if (typeof s.showAvg === "boolean") setShowAvg(s.showAvg);
        // 相手と日付は毎試合変わるので復元しない
      }
    } catch {
      /* 読めなくても空から始められる */
    }
    setStatsCount(readStats().length);
    setLoaded(true);
  }, []);

  // 保存（相手・日付は入れない＝次の試合で使い回す前提）
  useEffect(() => {
    if (!loaded) return;
    try {
      const s: Saved = { teamName, opponent: "", date: "", note, rows, bench, showAvg };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {
      /* 保存できない環境でも操作は続けられる */
    }
  }, [teamName, note, rows, bench, showAvg, loaded]);

  const flash = useCallback((m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 2800);
  }, []);

  const statsMap = useMemo(() => {
    const m = new Map<string, string | null>();
    for (const s of readStats()) m.set(s.name, s.avg);
    return m;
  }, [loaded, statsCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const setRow = (i: number, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    setRows((prev) => {
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const addRow = () => setRows((prev) => (prev.length >= 15 ? prev : [...prev, { name: "", position: "" }]));
  const removeRow = (i: number) =>
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== i)));

  const clearAll = () => {
    if (!confirm("入力した打順をすべて消します。よろしいですか？")) return;
    setRows(emptyRows(9));
    setBench("");
    setOpponent("");
    setNote("");
    setCardUrl(null);
    firstRef.current?.focus();
  };

  /** 成績表から名前と打順を取り込む */
  const importFromStats = () => {
    const s = readStats();
    if (s.length === 0) {
      flash("成績表にまだ選手が登録されていません。先に「成績表」で選手を追加してください。");
      return;
    }
    const picked = s.slice(0, 15);
    setRows(picked.map((p) => ({ name: p.name, position: "" })));
    setShowAvg(picked.some((p) => p.avg));
    setStatsCount(s.length);
    flash(`成績表から${picked.length}人を読み込みました。打率も自動で入ります。`);
  };

  const filled = rows.filter((r) => r.name.trim());
  const benchList = bench
    .split(/[、,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  /* ── 文字でコピー（LINE用） ───────────── */
  const asText = () => {
    const lines: string[] = [];
    const head = [teamName.trim(), opponent.trim() ? `vs ${opponent.trim()}` : "", fmtDate(date)]
      .filter(Boolean)
      .join("　");
    if (head) lines.push(head);
    lines.push("");
    filled.forEach((r, i) => {
      const avg = showAvg ? statsMap.get(r.name.trim()) : null;
      lines.push(
        `${i + 1}. ${r.position ? `[${r.position}] ` : ""}${r.name.trim()}${avg ? `　${avg}` : ""}`
      );
    });
    if (benchList.length > 0) lines.push("", `控え：${benchList.join("・")}`);
    if (note.trim()) lines.push("", note.trim());
    return lines.join("\n");
  };

  const copyText = async () => {
    if (filled.length === 0) {
      flash("先に選手名を入力してください。");
      return;
    }
    const text = asText();
    try {
      await navigator.clipboard.writeText(text);
      flash("打順をコピーしました。LINEやメールにそのまま貼れます。");
    } catch {
      // クリップボードが使えない環境（古いSafari等）では選択してもらう
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        flash("打順をコピーしました。");
      } catch {
        flash("コピーできませんでした。お手数ですが画像のほうをお使いください。");
      }
      ta.remove();
    }
  };

  /* ── 画像を作る ───────────── */
  const makeImage = async () => {
    if (filled.length === 0) {
      flash("先に選手名を入力してください。");
      return;
    }
    setBusy(true);
    try {
      const data: LineupCardData = {
        teamName: teamName.trim(),
        opponent: opponent.trim(),
        date: fmtDate(date),
        note: note.trim(),
        bench: benchList,
        players: filled.map((r, i) => ({
          order: i + 1,
          name: r.name.trim(),
          position: r.position === "—" ? "" : r.position,
          avg: showAvg ? statsMap.get(r.name.trim()) ?? null : null,
        })),
      };
      const canvas = await renderLineupCard(data);
      setCardUrl(canvas.toDataURL("image/png"));
      const blob = await canvasToBlob(canvas);
      if (!blob) throw new Error("blob failed");
      const fileName = `打順表_${teamName.trim() || "オーダー"}_${date}.png`;
      const file = new File([blob], fileName, { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
      if (nav.canShare && nav.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({
          files: [file],
          text: `${teamName.trim() || "今日"}のオーダー${opponent.trim() ? `（vs ${opponent.trim()}）` : ""}`,
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        flash("画像を保存しました。LINEやXにそのまま貼れます。");
      }
    } catch {
      flash("画像を作れませんでした。お手数ですが、もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  };

  if (!loaded) return <p className="yn-hint">読み込み中…</p>;

  return (
    <div className="lm">
      {msg && <p className="sm-note">{msg}</p>}

      {/* 試合の情報 */}
      <div className="lm-meta">
        <label className="sm-f lm-f-team">
          <span className="sm-f-label">チーム名</span>
          <input
            ref={firstRef}
            className="sm-f-input"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="例：江東ベアーズ"
            maxLength={24}
          />
        </label>
        <label className="sm-f">
          <span className="sm-f-label">対戦相手（任意）</span>
          <input
            className="sm-f-input"
            type="text"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            placeholder="例：城東クラブ"
            maxLength={24}
          />
        </label>
        <label className="sm-f">
          <span className="sm-f-label">試合日</span>
          <input className="sm-f-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>

      {/* 成績表からの取り込み */}
      <div className="lm-import">
        <button className="sm-btn" onClick={importFromStats}>
          📊 成績表から選手を読み込む
        </button>
        <label className="lm-check">
          <input type="checkbox" checked={showAvg} onChange={(e) => setShowAvg(e.target.checked)} />
          <span>打率を載せる（成績表に記録がある選手のみ）</span>
        </label>
      </div>

      {/* 打順 */}
      <div className="lm-rows">
        {rows.map((r, i) => {
          const avg = showAvg ? statsMap.get(r.name.trim()) : null;
          return (
            <div className="lm-row" key={i}>
              <span className="lm-no">{i + 1}</span>
              <select
                className="lm-pos"
                value={r.position}
                onChange={(e) => setRow(i, { position: e.target.value })}
                aria-label={`${i + 1}番の守備位置`}
              >
                {POSITIONS.map((p) => (
                  <option key={p || "none"} value={p}>
                    {p || "守備"}
                  </option>
                ))}
              </select>
              <input
                className="lm-name"
                type="text"
                value={r.name}
                onChange={(e) => setRow(i, { name: e.target.value })}
                placeholder={`${i + 1}番の選手名`}
                maxLength={16}
                aria-label={`${i + 1}番の選手名`}
              />
              {showAvg && <span className="lm-avg">{avg ?? ""}</span>}
              <span className="lm-ops">
                <button className="lm-mini" onClick={() => move(i, -1)} aria-label="上へ" title="上へ">
                  ↑
                </button>
                <button className="lm-mini" onClick={() => move(i, 1)} aria-label="下へ" title="下へ">
                  ↓
                </button>
                <button
                  className="lm-mini lm-mini-del"
                  onClick={() => removeRow(i)}
                  aria-label="この行を削除"
                  title="削除"
                >
                  ×
                </button>
              </span>
            </div>
          );
        })}
      </div>

      <div className="lm-rowops">
        <button className="sm-btn sm-btn-s" onClick={addRow} disabled={rows.length >= 15}>
          ＋ 打順を増やす
        </button>
        <button className="sm-btn sm-btn-s" onClick={clearAll}>
          入力を消す
        </button>
      </div>

      {/* 控え・メモ */}
      <div className="lm-extra">
        <label className="sm-f sm-f-wide">
          <span className="sm-f-label">控え（任意・「、」で区切る）</span>
          <input
            className="sm-f-input"
            type="text"
            value={bench}
            onChange={(e) => setBench(e.target.value)}
            placeholder="例：田中、佐藤、山本"
          />
        </label>
        <label className="sm-f sm-f-wide">
          <span className="sm-f-label">一言メモ（任意）</span>
          <input
            className="sm-f-input"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="例：8:30 球場集合／雨天中止は7時に連絡"
            maxLength={48}
          />
        </label>
      </div>

      {/* 出力 */}
      <div className="lm-out">
        <button className="sm-btn sm-btn-main lm-make" onClick={makeImage} disabled={busy}>
          {busy ? "作成中…" : "🖼️ 打順表の画像を作る"}
        </button>
        <button className="sm-btn" onClick={copyText}>
          📋 文字でコピー（LINE用）
        </button>
      </div>

      {cardUrl && (
        <div className="lm-preview">
          <p className="lm-preview-head">できた打順表（長押し・右クリックでも保存できます）</p>
          {/* 生成済みPNGのプレビュー。next/imageは静的書き出し＋dataURLと相性が悪いためimgを使う */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cardUrl} alt="作成した打順表" className="lm-preview-img" />
        </div>
      )}

      <p className="sm-disc">
        ※ 入力した内容は<strong>この端末のブラウザの中だけ</strong>に保存されます（サーバーには送られません）。
        次に開いたときも、チーム名と選手名はそのまま残るので、
        <strong>相手と日付を変えるだけ</strong>で毎試合使えます。
      </p>
    </div>
  );
}
