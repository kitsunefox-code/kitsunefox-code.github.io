"use client";

// プロ野球選手の使用ギア（グローブ・バット）一覧。
// 収録選手データ（PLAYERS）から、名前・リーグ・ポジションで絞り込み、
// 各メーカーを楽天アフィリンク（rktSearch経由）にする。本人モデルは強調表示。
import { useMemo, useState } from "react";
import { PLAYERS } from "@/data/players";
import { rktSearch } from "@/data/site";

type LeagueFilter = "all" | "NPB" | "MLB";
type PosFilter = "all" | "pitcher" | "catcher" | "infield" | "outfield";

function posCategory(pos: string): PosFilter {
  if (pos.includes("投")) return "pitcher";
  if (pos.includes("捕")) return "catcher";
  if (/一塁|二塁|三塁|遊撃|内野/.test(pos)) return "infield";
  if (pos.includes("外野") || pos.includes("指名")) return "outfield";
  return "infield";
}

const POS_TABS: { key: PosFilter; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "pitcher", label: "投手" },
  { key: "catcher", label: "捕手" },
  { key: "infield", label: "内野手" },
  { key: "outfield", label: "外野手" },
];

const LEAGUE_TABS: { key: LeagueFilter; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "NPB", label: "NPB（日本）" },
  { key: "MLB", label: "MLB（メジャー）" },
];

// メーカー名 → 楽天アフィリンク（"各社"や空は汎用検索へ）
function makerLink(maker: string | undefined, kind: "グローブ" | "バット"): string {
  return rktSearch(!maker || maker === "各社" ? "" : maker, kind);
}

export default function PlayersGear() {
  const [q, setQ] = useState("");
  const [league, setLeague] = useState<LeagueFilter>("all");
  const [pos, setPos] = useState<PosFilter>("all");

  const filtered = useMemo(() => {
    const kw = q.trim();
    return PLAYERS.filter((p) => {
      if (league !== "all" && p.league !== league) return false;
      if (pos !== "all" && posCategory(p.position) !== pos) return false;
      if (kw && !p.name.includes(kw)) return false;
      return true;
    });
  }, [q, league, pos]);

  return (
    <div className="pl-gear">
      <div className="pl-controls">
        <input
          className="pl-search"
          type="search"
          inputMode="search"
          placeholder="選手名で検索（例：大谷、坂本、トラウト）"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="選手名で検索"
        />
        <div className="pl-tabs" role="tablist" aria-label="リーグ">
          {LEAGUE_TABS.map((t) => (
            <button
              key={t.key}
              className={`pl-tab ${league === t.key ? "on" : ""}`}
              onClick={() => setLeague(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="pl-tabs" role="tablist" aria-label="ポジション">
          {POS_TABS.map((t) => (
            <button
              key={t.key}
              className={`pl-tab ${pos === t.key ? "on" : ""}`}
              onClick={() => setPos(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <p className="pl-count">
        {filtered.length}名を表示中（全{PLAYERS.length}名）
      </p>

      <div className="pl-list">
        {filtered.map((p) => (
          <div className="pl-row" key={`${p.league}-${p.name}`}>
            <div className="pl-head">
              <span className="pl-name">{p.name}</span>
              <span className={`pl-league ${p.league === "MLB" ? "mlb" : "npb"}`}>{p.league}</span>
              <span className="pl-pos">{p.position}</span>
            </div>
            <div className="pl-gears">
              <span className="pl-gear-item">
                <span className="pl-gear-label">グローブ</span>
                <a
                  className="pl-gear-link"
                  href={makerLink(p.glove, "グローブ")}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                >
                  {p.gloveModel ? (
                    <>
                      {p.gloveModel}
                      <span className="pl-model-badge">本人モデル</span>
                    </>
                  ) : (
                    p.glove || "各社"
                  )}
                </a>
              </span>
              {p.bat && (
                <span className="pl-gear-item">
                  <span className="pl-gear-label">バット</span>
                  <a
                    className="pl-gear-link"
                    href={makerLink(p.bat, "バット")}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                  >
                    {p.batModel ? (
                      <>
                        {p.batModel}
                        <span className="pl-model-badge">本人モデル</span>
                      </>
                    ) : (
                      p.bat
                    )}
                  </a>
                </span>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="pl-empty">該当する選手が見つかりませんでした。検索条件を変えてみてください。</p>
        )}
      </div>

      <p className="player-disc" style={{ marginTop: 18 }}>
        ※ 使用ギア・メーカーは公開情報にもとづく参考です（時期・場面により変わることがあります）。
        メーカー名のリンクは楽天市場のおすすめ一覧（広告）が開きます。「本人モデル」は市販の
        本人モデルが存在する選手のみ表示しています。
      </p>
    </div>
  );
}
