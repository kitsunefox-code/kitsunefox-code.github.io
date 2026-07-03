/** mybest風の星評価（0.1刻みで塗り分け） */
export default function Stars({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span className="stars" role="img" aria-label={`5点満点中${value}点`}>
      ★★★★★
      <span className="fill" style={{ width: `${pct}%` }} aria-hidden="true">
        ★★★★★
      </span>
    </span>
  );
}
