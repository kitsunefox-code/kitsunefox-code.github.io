"use client";

// 草野球チームの成績表。
//
// ● 設計の前提
//   このサイトは静的書き出し（サーバー・DBなし）なので、データは
//   ブラウザの localStorage に保存する。端末をまたいだ共有はできないため、
//   **CSV書き出し／読み込み**を必ず用意して、データを人質にしない。
//
// ● 入力項目について
//   ご要望は「打順・打席・打数・打点・盗塁」だったが、打率を出すには安打が、
//   出塁率には四死球が要るので2つ足した。入力は1試合あたり6項目に抑えている。
//
// ● 計算の定義（画面にも明記する）
//   打率   = 安打 ÷ 打数
//   出塁率 = (安打 + 四死球) ÷ (打数 + 四死球)   ※犠打・犠飛を入力しない簡易式
//   打数が0の打席（四死球・犠打のみ）は打率の分母に入れない＝野球の通常ルール。
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "kusayakyu-stats-v1";

type GameLine = {
  id: string;
  date: string; // 試合日（YYYY-MM-DD）
  opponent: string; // 相手チーム
  pa: number; // 打席
  ab: number; // 打数
  h: number; // 安打
  rbi: number; // 打点
  sb: number; // 盗塁
  bb: number; // 四死球
};

type Player = {
  id: string;
  name: string;
  order: number; // 打順（0 = 未設定）
  games: GameLine[];
};

type Totals = {
  games: number;
  pa: number;
  ab: number;
  h: number;
  rbi: number;
  sb: number;
  bb: number;
  avg: number | null; // 打率
  obp: number | null; // 出塁率
};

const uid = () => Math.random().toString(36).slice(2, 10);

function sumOf(p: Player): Totals {
  const t = p.games.reduce(
    (a, g) => ({
      pa: a.pa + g.pa,
      ab: a.ab + g.ab,
      h: a.h + g.h,
      rbi: a.rbi + g.rbi,
      sb: a.sb + g.sb,
      bb: a.bb + g.bb,
    }),
    { pa: 0, ab: 0, h: 0, rbi: 0, sb: 0, bb: 0 }
  );
  return {
    games: p.games.length,
    ...t,
    avg: t.ab > 0 ? t.h / t.ab : null,
    obp: t.ab + t.bb > 0 ? (t.h + t.bb) / (t.ab + t.bb) : null,
  };
}

// 打率・出塁率は .333 形式（先頭の0を落とす野球の慣習）
const fmtRate = (v: number | null) =>
  v === null ? "—" : (v >= 1 ? v.toFixed(3) : v.toFixed(3).replace(/^0/, ""));

const num = (v: string) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export default function StatsManager() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [newName, setNewName] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // 読み込み（localStorage は private window 等で例外を投げるので必ず try）
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPlayers(JSON.parse(raw));
    } catch {
      /* 読めなくても空で始められる */
    }
    setLoaded(true);
  }, []);

  // 保存（初回読み込み前に空配列で上書きしないよう loaded を見る）
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
    } catch {
      /* 保存できない環境でも操作は続けられる */
    }
  }, [players, loaded]);

  const flash = useCallback((m: string) => {
    setNote(m);
    setTimeout(() => setNote(""), 2500);
  }, []);

  const addPlayer = () => {
    const name = newName.trim();
    if (!name) return;
    setPlayers((prev) => [
      ...prev,
      { id: uid(), name, order: prev.length + 1, games: [] },
    ]);
    setNewName("");
  };

  const removePlayer = (id: string) => {
    const p = players.find((x) => x.id === id);
    if (!p) return;
    if (!confirm(`「${p.name}」の成績をすべて削除します。よろしいですか？`)) return;
    setPlayers((prev) => prev.filter((x) => x.id !== id));
  };

  const setOrder = (id: string, order: number) =>
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, order } : p)));

  const addGame = (id: string, g: Omit<GameLine, "id">) =>
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, games: [...p.games, { ...g, id: uid() }] } : p))
    );

  const removeGame = (pid: string, gid: string) =>
    setPlayers((prev) =>
      prev.map((p) => (p.id === pid ? { ...p, games: p.games.filter((g) => g.id !== gid) } : p))
    );

  // 打順順（未設定は末尾）
  const sorted = useMemo(
    () => [...players].sort((a, b) => (a.order || 99) - (b.order || 99)),
    [players]
  );

  // チーム合計
  const team = useMemo(() => {
    const all: Player = { id: "team", name: "チーム", order: 0, games: players.flatMap((p) => p.games) };
    return sumOf(all);
  }, [players]);

  /* ── CSV 書き出し／読み込み ───────────────── */
  const exportCsv = () => {
    const head = ["選手名", "打順", "試合日", "相手", "打席", "打数", "安打", "打点", "盗塁", "四死球"];
    const rows = players.flatMap((p) =>
      p.games.map((g) => [p.name, p.order, g.date, g.opponent, g.pa, g.ab, g.h, g.rbi, g.sb, g.bb])
    );
    if (rows.length === 0) {
      flash("書き出す成績がまだありません。");
      return;
    }
    const esc = (v: string | number) => {
      const s = String(v ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [head, ...rows].map((r) => r.map(esc).join(",")).join("\r\n");
    // Excelで文字化けしないようBOMを付ける
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `草野球成績_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    flash("CSVを書き出しました。Excelでそのまま開けます。");
  };

  const importCsv = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result || "").replace(/^﻿/, "");
        const lines = text.split(/\r?\n/).filter((l) => l.trim());
        if (lines.length < 2) throw new Error("空のファイルです");
        const map = new Map<string, Player>();
        for (const line of lines.slice(1)) {
          // 簡易パース（引用符つきセルに対応）
          const cells = line.match(/("([^"]|"")*"|[^,]*)(,|$)/g)?.map((c) =>
            c.replace(/,$/, "").replace(/^"|"$/g, "").replace(/""/g, '"')
          );
          if (!cells || cells.length < 10) continue;
          const [name, order, date, opponent, pa, ab, h, rbi, sb, bb] = cells;
          if (!name) continue;
          if (!map.has(name)) {
            map.set(name, { id: uid(), name, order: num(order), games: [] });
          }
          map.get(name)!.games.push({
            id: uid(), date, opponent,
            pa: num(pa), ab: num(ab), h: num(h), rbi: num(rbi), sb: num(sb), bb: num(bb),
          });
        }
        const next = [...map.values()];
        if (next.length === 0) throw new Error("読み取れる行がありません");
        if (!confirm(`${next.length}人分を読み込みます。いまの内容は置き換わります。よろしいですか？`)) return;
        setPlayers(next);
        flash(`${next.length}人分を読み込みました。`);
      } catch (e) {
        flash("読み込めませんでした。書き出したCSVと同じ形式か確認してください。");
      }
    };
    reader.readAsText(file);
  };

  if (!loaded) return <p className="yn-hint">読み込み中…</p>;

  return (
    <div className="sm">
      {note && <p className="sm-note">{note}</p>}

      {/* 選手の追加 */}
      <div className="sm-add">
        <input
          className="sm-input"
          type="text"
          placeholder="選手名を入力（例：鈴木）"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") addPlayer(); }}
          aria-label="選手名"
        />
        <button className="sm-btn sm-btn-main" onClick={addPlayer}>選手を追加</button>
      </div>

      {players.length === 0 && (
        <p className="sm-empty">
          まず選手を追加してください。追加したら、試合ごとに打席・打数・安打・打点・盗塁を入力すると、
          打率と出塁率が自動で計算されます。
        </p>
      )}

      {/* 成績表 */}
      {players.length > 0 && (
        <>
          <div className="sm-tablewrap">
            <table className="sm-table">
              <thead>
                <tr>
                  <th>打順</th>
                  <th>選手</th>
                  <th>試合</th>
                  <th>打席</th>
                  <th>打数</th>
                  <th>安打</th>
                  <th className="sm-hl">打率</th>
                  <th className="sm-hl">出塁率</th>
                  <th>打点</th>
                  <th>盗塁</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p) => {
                  const t = sumOf(p);
                  return (
                    <tr key={p.id}>
                      <td>
                        <input
                          className="sm-order"
                          type="number"
                          min={0}
                          max={30}
                          value={p.order || ""}
                          onChange={(e) => setOrder(p.id, num(e.target.value))}
                          aria-label={`${p.name}の打順`}
                        />
                      </td>
                      <td className="sm-name">{p.name}</td>
                      <td>{t.games}</td>
                      <td>{t.pa}</td>
                      <td>{t.ab}</td>
                      <td>{t.h}</td>
                      <td className="sm-hl sm-big">{fmtRate(t.avg)}</td>
                      <td className="sm-hl">{fmtRate(t.obp)}</td>
                      <td>{t.rbi}</td>
                      <td>{t.sb}</td>
                      <td className="sm-ops">
                        <button
                          className="sm-btn sm-btn-s"
                          onClick={() => setOpenId(openId === p.id ? null : p.id)}
                        >
                          {openId === p.id ? "閉じる" : "試合を追加"}
                        </button>
                        <button className="sm-btn sm-btn-del" onClick={() => removePlayer(p.id)}>
                          削除
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr className="sm-total">
                  <td></td>
                  <td className="sm-name">チーム合計</td>
                  <td>{team.games}</td>
                  <td>{team.pa}</td>
                  <td>{team.ab}</td>
                  <td>{team.h}</td>
                  <td className="sm-hl sm-big">{fmtRate(team.avg)}</td>
                  <td className="sm-hl">{fmtRate(team.obp)}</td>
                  <td>{team.rbi}</td>
                  <td>{team.sb}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 試合の入力フォーム（開いた選手の分だけ） */}
          {openId && (
            <GameForm
              player={players.find((p) => p.id === openId)!}
              onAdd={(g) => { addGame(openId, g); flash("1試合分を記録しました。"); }}
              onRemove={(gid) => removeGame(openId, gid)}
              onClose={() => setOpenId(null)}
            />
          )}

          <div className="sm-foot">
            <button className="sm-btn" onClick={exportCsv}>📄 CSVで書き出す（Excelで開けます）</button>
            <button className="sm-btn" onClick={() => fileRef.current?.click()}>📥 CSVを読み込む</button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importCsv(f);
                e.target.value = "";
              }}
            />
          </div>
        </>
      )}

      <p className="sm-disc">
        ※ 入力したデータは<strong>この端末のブラウザの中だけ</strong>に保存されます（サーバーには送られません）。
        別の端末やスマホと共有したいとき、消えると困るときは、<strong>CSVで書き出して保管</strong>してください。
        ブラウザの履歴・サイトデータを消すと一緒に消えます。
      </p>
    </div>
  );
}

/* ── 1試合分の入力 ───────────────── */
function GameForm({
  player,
  onAdd,
  onRemove,
  onClose,
}: {
  player: Player;
  onAdd: (g: Omit<GameLine, "id">) => void;
  onRemove: (gid: string) => void;
  onClose: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [opponent, setOpponent] = useState("");
  const [pa, setPa] = useState("");
  const [ab, setAb] = useState("");
  const [h, setH] = useState("");
  const [rbi, setRbi] = useState("");
  const [sb, setSb] = useState("");
  const [bb, setBb] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    const v = { pa: num(pa), ab: num(ab), h: num(h), rbi: num(rbi), sb: num(sb), bb: num(bb) };
    // 入力ミスはここで止める（あとから数字が合わなくなるのを防ぐ）
    if (v.pa === 0 && v.ab === 0) { setErr("打席か打数を入力してください。"); return; }
    if (v.ab > v.pa) { setErr("打数が打席より多くなっています。"); return; }
    if (v.h > v.ab) { setErr("安打が打数より多くなっています。"); return; }
    if (v.bb > v.pa - v.ab) { setErr("四死球が「打席−打数」より多くなっています。"); return; }
    setErr("");
    onAdd({ date, opponent: opponent.trim(), ...v });
    setPa(""); setAb(""); setH(""); setRbi(""); setSb(""); setBb("");
  };

  const F = (label: string, value: string, set: (s: string) => void, hint?: string) => (
    <label className="sm-f">
      <span className="sm-f-label">{label}</span>
      <input
        className="sm-f-input"
        type="number"
        inputMode="numeric"
        min={0}
        max={99}
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder="0"
      />
      {hint && <span className="sm-f-hint">{hint}</span>}
    </label>
  );

  return (
    <div className="sm-form">
      <div className="sm-form-head">
        <strong>{player.name} の試合を追加</strong>
        <button className="sm-btn sm-btn-s" onClick={onClose}>閉じる</button>
      </div>

      <div className="sm-form-meta">
        <label className="sm-f">
          <span className="sm-f-label">試合日</span>
          <input className="sm-f-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="sm-f sm-f-wide">
          <span className="sm-f-label">相手チーム（任意）</span>
          <input
            className="sm-f-input"
            type="text"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            placeholder="例：ドラゴンズ"
          />
        </label>
      </div>

      <div className="sm-form-grid">
        {F("打席", pa, setPa, "四死球・犠打も含む")}
        {F("打数", ab, setAb, "四死球・犠打は除く")}
        {F("安打", h, setH, "ヒット・長打の合計")}
        {F("打点", rbi, setRbi)}
        {F("盗塁", sb, setSb)}
        {F("四死球", bb, setBb, "出塁率の計算に使用")}
      </div>

      {err && <p className="sm-err">{err}</p>}

      <button className="sm-btn sm-btn-main" onClick={submit}>この試合を記録する</button>

      {player.games.length > 0 && (
        <div className="sm-log">
          <p className="sm-log-head">記録済み（{player.games.length}試合）</p>
          <ul className="sm-log-list">
            {[...player.games].reverse().map((g) => (
              <li key={g.id}>
                <span className="sm-log-date">{g.date}</span>
                {g.opponent && <span className="sm-log-opp">vs {g.opponent}</span>}
                <span className="sm-log-stat">
                  {g.ab}打数{g.h}安打／打点{g.rbi}／盗塁{g.sb}
                </span>
                <button className="sm-btn sm-btn-del sm-btn-s" onClick={() => onRemove(g.id)}>
                  取消
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
