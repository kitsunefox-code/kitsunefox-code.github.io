"use client";

import { useEffect, useRef, useState } from "react";

// ===== 型 =====
type ResultKey =
  | "1B"
  | "2B"
  | "3B"
  | "HR"
  | "BB"
  | "HBP"
  | "SAC"
  | "SF"
  | "K"
  | "OUT"
  | "E";

type PA = { id: string; r: ResultKey; rbi: number };
type Game = { id: string; date: string; opp: string; pas: PA[] };

// 打席結果の定義（表示用のラベル・色と、集計に使う性質）
const RESULTS: {
  key: ResultKey;
  label: string;
  short: string;
  cls: string;
}[] = [
  { key: "1B", label: "ヒット", short: "安", cls: "r-hit" },
  { key: "2B", label: "二塁打", short: "2", cls: "r-hit" },
  { key: "3B", label: "三塁打", short: "3", cls: "r-hit" },
  { key: "HR", label: "本塁打", short: "本", cls: "r-hr" },
  { key: "BB", label: "四球", short: "四", cls: "r-ob" },
  { key: "HBP", label: "死球", short: "死", cls: "r-ob" },
  { key: "SAC", label: "犠打", short: "犠打", cls: "r-sac" },
  { key: "SF", label: "犠飛", short: "犠飛", cls: "r-sac" },
  { key: "K", label: "三振", short: "三", cls: "r-out" },
  { key: "OUT", label: "凡退", short: "凡", cls: "r-out" },
  { key: "E", label: "出塁(失策)", short: "失", cls: "r-out" },
];

const META: Record<
  ResultKey,
  { ab: boolean; hit: boolean; tb: number; sf?: boolean; bb?: boolean; hbp?: boolean; hr?: boolean; so?: boolean }
> = {
  "1B": { ab: true, hit: true, tb: 1 },
  "2B": { ab: true, hit: true, tb: 2 },
  "3B": { ab: true, hit: true, tb: 3 },
  HR: { ab: true, hit: true, tb: 4, hr: true },
  BB: { ab: false, hit: false, tb: 0, bb: true },
  HBP: { ab: false, hit: false, tb: 0, hbp: true },
  SAC: { ab: false, hit: false, tb: 0 },
  SF: { ab: false, hit: false, tb: 0, sf: true },
  K: { ab: true, hit: false, tb: 0, so: true },
  OUT: { ab: true, hit: false, tb: 0 },
  E: { ab: true, hit: false, tb: 0 },
};

function computeStats(pas: PA[]) {
  let ab = 0,
    h = 0,
    hr = 0,
    bb = 0,
    hbp = 0,
    sf = 0,
    so = 0,
    tb = 0,
    rbi = 0;
  for (const p of pas) {
    const m = META[p.r];
    if (m.ab) ab++;
    if (m.hit) h++;
    if (m.hr) hr++;
    if (m.bb) bb++;
    if (m.hbp) hbp++;
    if (m.sf) sf++;
    if (m.so) so++;
    tb += m.tb;
    rbi += p.rbi;
  }
  const paCount = pas.length;
  const avg = ab > 0 ? h / ab : 0;
  const obDen = ab + bb + hbp + sf;
  const obp = obDen > 0 ? (h + bb + hbp) / obDen : 0;
  const slg = ab > 0 ? tb / ab : 0;
  const ops = obp + slg;
  return { paCount, ab, h, hr, bb, hbp, so, sf, tb, rbi, avg, obp, slg, ops };
}

function fmt3(v: number) {
  if (!isFinite(v)) v = 0;
  const s = v.toFixed(3);
  return s.startsWith("0") ? s.slice(1) : s; // .333 / 1.000
}

const LS_KEY = "kusayakyu_stats_v1";

export default function StatsSheet() {
  const [player, setPlayer] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [rbiSel, setRbiSel] = useState(0);
  const [scope, setScope] = useState<"game" | "all">("game");
  const [loaded, setLoaded] = useState(false);

  // activeId を同期的に参照するためのref（連打時に古いクロージャで
  // 試合が増殖するのを防ぐ）。setActiveIdと必ずセットで更新する。
  const activeIdRef = useRef<string | null>(null);
  const selectActive = (id: string | null) => {
    activeIdRef.current = id;
    setActiveId(id);
  };

  // 端末に保存したデータを読み込み
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setPlayer(d.player || "");
        setGames(Array.isArray(d.games) ? d.games : []);
        const aid = d.activeId ?? d.games?.[0]?.id ?? null;
        activeIdRef.current = aid;
        setActiveId(aid);
      }
    } catch {
      /* 破損時は無視 */
    }
    setLoaded(true);
  }, []);

  // 変更のたびに保存
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ player, games, activeId }));
    } catch {
      /* 容量超過等は無視 */
    }
  }, [player, games, activeId, loaded]);

  const uid = () =>
    Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

  const active = games.find((g) => g.id === activeId) || null;

  const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  };

  const addGame = () => {
    const id = uid();
    setGames((g) => [{ id, date: todayStr(), opp: "", pas: [] }, ...g]);
    selectActive(id);
    return id;
  };

  const addPA = (r: ResultKey) => {
    // refから同期的に現在の試合IDを取得（連打してもクロージャが古くならない）
    let gid = activeIdRef.current;
    if (!gid) {
      gid = addGame();
    }
    const pa: PA = { id: uid(), r, rbi: rbiSel };
    setGames((gs) =>
      gs.map((g) => (g.id === gid ? { ...g, pas: [...g.pas, pa] } : g))
    );
    setRbiSel(0);
  };

  const cycleRbi = (gid: string, paId: string) => {
    setGames((gs) =>
      gs.map((g) =>
        g.id === gid
          ? {
              ...g,
              pas: g.pas.map((p) =>
                p.id === paId ? { ...p, rbi: (p.rbi + 1) % 5 } : p
              ),
            }
          : g
      )
    );
  };

  const delPA = (gid: string, paId: string) => {
    setGames((gs) =>
      gs.map((g) =>
        g.id === gid ? { ...g, pas: g.pas.filter((p) => p.id !== paId) } : g
      )
    );
  };

  const delGame = (gid: string) => {
    setGames((gs) => gs.filter((g) => g.id !== gid));
    if (activeId === gid) selectActive(null);
  };

  const setOpp = (gid: string, opp: string) => {
    setGames((gs) => gs.map((g) => (g.id === gid ? { ...g, opp } : g)));
  };

  const allPAs = games.flatMap((g) => g.pas);
  const shown = scope === "all" ? allPAs : active ? active.pas : [];
  const s = computeStats(shown);

  const copySummary = () => {
    const all = computeStats(allPAs);
    const lines = [
      `【${player || "わたし"}の通算成績】`,
      `打率 ${fmt3(all.avg)}（${all.h}安打/${all.ab}打数）`,
      `本塁打 ${all.hr}／打点 ${all.rbi}／四死球 ${all.bb + all.hbp}／三振 ${all.so}`,
      `OPS ${fmt3(all.ops)}（出塁率 ${fmt3(all.obp)}／長打率 ${fmt3(all.slg)}）`,
      `${games.length}試合・${all.paCount}打席`,
      `— 草野球ナビ かんたん成績管理`,
    ];
    const text = lines.join("\n");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => alert("成績をコピーしました！LINE等に貼り付けられます。"),
        () => window.prompt("コピーしてください", text)
      );
    } else {
      window.prompt("コピーしてください", text);
    }
  };

  const clearAll = () => {
    if (window.confirm("すべての成績データを削除します。よろしいですか？")) {
      setGames([]);
      selectActive(null);
    }
  };

  return (
    <>
      {/* 選手名 */}
      <div className="stats-row">
        <label className="stats-label">選手名（任意）</label>
        <input
          className="stats-input"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          placeholder="例：たなか"
          maxLength={20}
        />
      </div>

      {/* 成績サマリー */}
      <div className="stats-summary">
        <div className="stats-scope">
          <button
            className={`chip ${scope === "game" ? "active" : ""}`}
            onClick={() => setScope("game")}
          >
            この試合
          </button>
          <button
            className={`chip ${scope === "all" ? "active" : ""}`}
            onClick={() => setScope("all")}
          >
            通算（全{games.length}試合）
          </button>
        </div>
        <div className="stats-avg">
          <span className="stats-avg-num">{fmt3(s.avg)}</span>
          <span className="stats-avg-cap">打率</span>
        </div>
        <div className="stats-grid">
          <div className="stat-cell">
            <b>{s.ab}</b>
            <span>打数</span>
          </div>
          <div className="stat-cell">
            <b>{s.h}</b>
            <span>安打</span>
          </div>
          <div className="stat-cell">
            <b>{s.hr}</b>
            <span>本塁打</span>
          </div>
          <div className="stat-cell">
            <b>{s.rbi}</b>
            <span>打点</span>
          </div>
          <div className="stat-cell">
            <b>{s.bb + s.hbp}</b>
            <span>四死球</span>
          </div>
          <div className="stat-cell">
            <b>{s.so}</b>
            <span>三振</span>
          </div>
          <div className="stat-cell wide">
            <b>{fmt3(s.ops)}</b>
            <span>OPS（出塁{fmt3(s.obp)}／長打{fmt3(s.slg)}）</span>
          </div>
        </div>
      </div>

      {/* 試合の選択 */}
      <div className="games-bar">
        <button className="game-add" onClick={addGame}>
          ＋ 試合を追加
        </button>
        {games.map((g) => (
          <button
            key={g.id}
            className={`game-chip ${g.id === activeId ? "active" : ""}`}
            onClick={() => selectActive(g.id)}
          >
            {g.date}
            {g.opp ? `｜${g.opp}` : ""}（{g.pas.length}打席）
          </button>
        ))}
      </div>

      {active ? (
        <>
          {/* 対戦相手 */}
          <div className="stats-row">
            <label className="stats-label">対戦相手（任意）</label>
            <input
              className="stats-input"
              value={active.opp}
              onChange={(e) => setOpp(active.id, e.target.value)}
              placeholder="例：ドラゴンズ"
              maxLength={20}
            />
            <button
              className="game-del"
              onClick={() => delGame(active.id)}
              title="この試合を削除"
            >
              試合を削除
            </button>
          </div>

          {/* 打点セレクタ */}
          <div className="rbi-selector">
            <span className="rbi-label">打点（この打席）</span>
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                className={`rbi-btn ${rbiSel === n ? "active" : ""}`}
                onClick={() => setRbiSel(n)}
              >
                {n}
              </button>
            ))}
          </div>

          {/* 結果ボタン */}
          <p className="entry-hint">
            打席の結果をタップ → 記録されます（打点は上で選んでから）
          </p>
          <div className="result-buttons">
            {RESULTS.map((r) => (
              <button
                key={r.key}
                className={`result-btn ${r.cls}`}
                onClick={() => addPA(r.key)}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* この試合のログ */}
          <div className="pa-log">
            <div className="pa-log-head">
              <span>この試合の打席（新しい順）</span>
              <span>{active.pas.length}打席</span>
            </div>
            {active.pas.length === 0 ? (
              <p className="pa-empty">まだ打席がありません。上のボタンで記録しましょう。</p>
            ) : (
              [...active.pas]
                .map((p, i) => ({ p, i }))
                .reverse()
                .map(({ p, i }) => {
                  const def = RESULTS.find((x) => x.key === p.r)!;
                  return (
                    <div className="pa-item" key={p.id}>
                      <span className="pa-order">{i + 1}打席</span>
                      <span className={`pa-badge ${def.cls}`}>{def.label}</span>
                      <button
                        className="pa-rbi"
                        onClick={() => cycleRbi(active.id, p.id)}
                        title="タップで打点を変更"
                      >
                        打点 {p.rbi}
                      </button>
                      <button
                        className="pa-del"
                        onClick={() => delPA(active.id, p.id)}
                        aria-label="削除"
                      >
                        ×
                      </button>
                    </div>
                  );
                })
            )}
          </div>
        </>
      ) : (
        <div className="stats-empty">
          <p>
            「＋ 試合を追加」を押すか、いきなり結果ボタンを押すと、
            今日の試合として記録が始まります。
          </p>
          <p className="entry-hint">打席の結果をタップ → 自動で打率などを計算します</p>
          <div className="result-buttons">
            {RESULTS.map((r) => (
              <button
                key={r.key}
                className={`result-btn ${r.cls}`}
                onClick={() => addPA(r.key)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* フッター操作 */}
      <div className="stats-actions">
        <button className="btn" style={{ marginTop: 0 }} onClick={copySummary}>
          📋 通算成績をコピー（LINEに貼れる）
        </button>
        <button className="stats-clear" onClick={clearAll}>
          全データを削除
        </button>
      </div>
      <p className="stats-note">
        ※ データはこの端末のブラウザにのみ保存されます（サーバーには送信されません）。
        別の端末とは共有されません。
      </p>
    </>
  );
}
