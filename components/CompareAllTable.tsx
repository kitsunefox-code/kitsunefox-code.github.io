import { makers, ctaUrl, overallScore } from "@/data/makers";
import Stars from "@/components/Stars";

/** 全メーカーを1枚の表で見比べる一覧表（mybest風・サーバーレンダリング） */
export default function CompareAllTable() {
  return (
    <div className="compare-table-wrap">
      <table className="compare-table">
        <thead>
          <tr>
            <th>順位</th>
            <th>メーカー</th>
            <th>総合評価</th>
            <th>最安の目安</th>
            <th>最低ロット</th>
            <th>納期の目安</th>
            <th>方式</th>
            <th>シミュレーター</th>
            <th>公式</th>
          </tr>
        </thead>
        <tbody>
          {makers.map((m, i) => {
            const score = overallScore(m);
            return (
              <tr key={m.id}>
                <td className="num">{i + 1}位</td>
                <td className="maker-name-cell">{m.name}</td>
                <td>
                  <span className="num">{score.toFixed(1)}</span>{" "}
                  <Stars value={score} />
                </td>
                <td>
                  {m.priceMin === null
                    ? "要確認"
                    : `${m.priceMin.toLocaleString()}円〜`}
                  <br />
                  <small style={{ color: "#64748b" }}>/ {m.priceUnit}</small>
                </td>
                <td>{m.minLot}</td>
                <td>{m.leadTime}</td>
                <td>{m.methods.join("・")}</td>
                <td>{m.designSimulator ? "○" : "−"}</td>
                <td>
                  <a
                    className="link-btn"
                    href={ctaUrl(m)}
                    target="_blank"
                    rel="noopener sponsored"
                  >
                    見る
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
