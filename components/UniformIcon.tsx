import { BRANDS, DEFAULT_BRAND } from "@/data/brands";

/**
 * 各メーカーのイメージカラーで描いた野球ユニフォーム（シャツ）のSVG。
 * 実物写真ではなく著作権フリーのイラストです。
 */
export default function UniformIcon({
  id,
  size = 72,
}: {
  id: string;
  size?: number;
}) {
  const b = BRANDS[id] ?? DEFAULT_BRAND;
  const markFont =
    b.mark.length >= 3 ? 15 : b.mark.length === 2 ? 20 : 30;

  // 野球シャツのシルエット（肩→袖→胴→裾）
  const body =
    "M42,16 L34,13 L13,22 L18,42 L33,39 L35,92 L65,92 L67,39 L82,42 L87,22 L66,13 L58,16 L50,27 Z";

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={`${b.mark} のユニフォームイメージ`}
      style={{ flexShrink: 0, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}
    >
      {/* 本体 */}
      <path
        d={body}
        fill={b.primary}
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* 前立て（ボタン列の帯） */}
      <rect x="47" y="25" width="6" height="67" fill={b.secondary} rx="1" />
      {/* 襟のV字 */}
      <path
        d="M42,16 L50,28 L58,16"
        fill="none"
        stroke={b.secondary}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* 袖口の差し色 */}
      <path d="M13,22 L18,42 L23,40.5 L18,20.5 Z" fill={b.secondary} opacity="0.9" />
      <path d="M87,22 L82,42 L77,40.5 L82,20.5 Z" fill={b.secondary} opacity="0.9" />
      {/* ボタン */}
      <g fill={b.text} opacity="0.85">
        <circle cx="50" cy="34" r="1.4" />
        <circle cx="50" cy="46" r="1.4" />
        <circle cx="50" cy="72" r="1.4" />
        <circle cx="50" cy="84" r="1.4" />
      </g>
      {/* 胸マーク（略号） */}
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontSize={markFont}
        fontWeight="800"
        fill={b.text}
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ letterSpacing: "-0.02em" }}
      >
        {b.mark}
      </text>
    </svg>
  );
}
