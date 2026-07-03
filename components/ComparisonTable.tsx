"use client";

import { useMemo, useState } from "react";
import {
  makers,
  ctaUrl,
  overallScore,
  RATING_AXES,
  ALL_METHODS,
  ALL_TAGS,
  type OrderMethod,
  type Tag,
} from "@/data/makers";
import Stars from "@/components/Stars";
import UniformIcon from "@/components/UniformIcon";

type SortKey = "default" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortKey, string> = {
  default: "総合評価順（おすすめ）",
  "price-asc": "価格が安い順",
  "price-desc": "価格が高い順",
};

function RankMedal({ rank }: { rank: number }) {
  const cls =
    rank === 1 ? "rank-1" : rank === 2 ? "rank-2" : rank === 3 ? "rank-3" : "rank-n";
  return (
    <span className={`rank-medal ${cls}`}>
      {rank}
      <small>位</small>
    </span>
  );
}

export default function ComparisonTable() {
  const [method, setMethod] = useState<OrderMethod | null>(null);
  const [tag, setTag] = useState<Tag | null>(null);
  const [sort, setSort] = useState<SortKey>("default");

  const filtered = useMemo(() => {
    // makers の並び順 = 総合評価順（デフォルトのランキング）
    let list = makers.filter((m) => {
      if (method && !m.methods.includes(method)) return false;
      if (tag && !m.tags.includes(tag)) return false;
      return true;
    });

    if (sort !== "default") {
      list = [...list].sort((a, b) => {
        // 価格不明（null）は常に末尾へ
        if (a.priceMin === null && b.priceMin === null) return 0;
        if (a.priceMin === null) return 1;
        if (b.priceMin === null) return -1;
        return sort === "price-asc"
          ? a.priceMin - b.priceMin
          : b.priceMin - a.priceMin;
      });
    }
    return list;
  }, [method, tag, sort]);

  return (
    <>
      <div className="filters">
        <div className="row">
          <span className="label">オーダー方式</span>
          <button
            className={`chip ${method === null ? "active" : ""}`}
            onClick={() => setMethod(null)}
          >
            すべて
          </button>
          {ALL_METHODS.map((mth) => (
            <button
              key={mth}
              className={`chip ${method === mth ? "active" : ""}`}
              onClick={() => setMethod((cur) => (cur === mth ? null : mth))}
            >
              {mth}
            </button>
          ))}
        </div>
        <div className="row">
          <span className="label">こだわり</span>
          <button
            className={`chip ${tag === null ? "active" : ""}`}
            onClick={() => setTag(null)}
          >
            すべて
          </button>
          {ALL_TAGS.map((t) => (
            <button
              key={t}
              className={`chip ${tag === t ? "active" : ""}`}
              onClick={() => setTag((cur) => (cur === t ? null : t))}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="row">
          <span className="label">並べ替え</span>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
              <option key={k} value={k}>
                {SORT_LABELS[k]}
              </option>
            ))}
          </select>
          <span className="result-count">{filtered.length}社を表示中</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="disclaimer" style={{ textAlign: "center" }}>
          条件に合うメーカーが見つかりませんでした。絞り込みを変えてお試しください。
        </div>
      ) : (
        <div className="maker-grid">
          {filtered.map((m, i) => {
            const score = overallScore(m);
            return (
              <article className="maker-card" key={m.id}>
                <div>
                  <div className="maker-head">
                    <UniformIcon id={m.id} size={72} />
                    <div className="maker-head-main">
                      <h3
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          margin: 0,
                        }}
                      >
                        <RankMedal rank={i + 1} />
                        {m.name}
                      </h3>

                      {/* 総合評価（mybest風） */}
                      <div className="score-line">
                        <span className="score-num">
                          {score.toFixed(1)}
                          <small> /5.0</small>
                        </span>
                        <Stars value={score} />
                      </div>
                    </div>
                  </div>

                  {/* 項目別スコア */}
                  <div className="axis-scores">
                    {RATING_AXES.map((ax) => (
                      <span className="axis-score" key={ax.key}>
                        {ax.label}
                        <span className="axis-bar">
                          <span
                            style={{
                              width: `${(m.ratings[ax.key] / 5) * 100}%`,
                            }}
                          />
                        </span>
                        <b>{m.ratings[ax.key].toFixed(1)}</b>
                      </span>
                    ))}
                  </div>

                  <div className="maker-tags" style={{ marginTop: 10 }}>
                    {m.tags.map((t) => (
                      <span className="tag" key={t}>
                        #{t}
                      </span>
                    ))}
                  </div>
                  <ul className="maker-features">
                    {m.features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                  <table className="spec-table">
                    <tbody>
                      <tr>
                        <td className="k">オーダー方式</td>
                        <td>
                          {m.methods.map((mth) => (
                            <span className="method-badge" key={mth}>
                              {mth}
                            </span>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td className="k">最低ロット</td>
                        <td>{m.minLot}</td>
                      </tr>
                      <tr>
                        <td className="k">納期の目安</td>
                        <td>{m.leadTime}</td>
                      </tr>
                      <tr>
                        <td className="k">デザイン作成</td>
                        <td>
                          {m.designSimulator
                            ? "Webシミュレーター等あり"
                            : "要問い合わせ"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="maker-cta">
                  <div className="price-caption">最安の目安</div>
                  <div className="price">
                    {m.priceMin === null ? (
                      <span style={{ fontSize: 18 }}>要確認</span>
                    ) : (
                      <>
                        {m.priceMin.toLocaleString()}
                        <small>円〜</small>
                      </>
                    )}
                  </div>
                  <div className="price-unit">
                    / {m.priceUnit}
                    {(m.priceLabel.match(/（.*）/)?.[0] ?? "") && (
                      <>
                        <br />
                        <span style={{ fontSize: 11 }}>
                          {m.priceLabel.match(/（.*）/)?.[0]}
                        </span>
                      </>
                    )}
                  </div>
                  <a
                    className="btn"
                    href={ctaUrl(m)}
                    target="_blank"
                    rel="noopener sponsored"
                  >
                    公式サイトを見る
                  </a>
                  <a
                    className="btn secondary"
                    href={m.officialUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    料金の詳細を確認
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
