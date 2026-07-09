// 診断結果の選手に添える「AI生成イラスト」。
// 実在選手の肖像を描くと肖像権・パブリシティ権のリスクがあるため、
// ポジション／プレースタイル別の“無人格ピクトグラム”をオリジナル生成して使う。
// 墨＋朱のINK&PAPER意匠（ストロークベースの五輪ピクト風）。
import { type Player } from "@/data/players";

export type ArtKind =
  | "batter"
  | "pitcher"
  | "catcher"
  | "infielder"
  | "outfielder"
  | "runner";

const INK = "#1c1b18";
const ACCENT = "#b3472e";

// 選手のポジション・資質からイラストの種類を決める
export function pickArt(p: Player): ArtKind {
  const pos = p.position || "";
  if (pos.includes("投")) return "pitcher";
  if (pos.includes("捕")) return "catcher";
  if (/遊撃|二塁|三塁|一塁|内野/.test(pos)) return "infielder";
  if (pos.includes("外野")) return p.traits.includes("speed") ? "runner" : "outfielder";
  if (p.traits.includes("speed")) return "runner";
  if (p.traits.includes("pitcher")) return "pitcher";
  return "batter";
}

const LABELS: Record<ArtKind, string> = {
  batter: "SLUGGER",
  pitcher: "PITCHER",
  catcher: "CATCHER",
  infielder: "INFIELDER",
  outfielder: "OUTFIELDER",
  runner: "SPEEDSTER",
};

// 共通の描画パーツ
function Figure({ kind }: { kind: ArtKind }) {
  const limb = {
    stroke: INK,
    strokeWidth: 13,
    strokeLinecap: "round" as const,
    fill: "none",
  };
  const thin = { ...limb, strokeWidth: 9, stroke: ACCENT };
  const ground = (
    <line x1="24" y1="178" x2="176" y2="178" stroke={INK} strokeWidth="3" opacity="0.25" />
  );

  switch (kind) {
    case "batter":
      return (
        <g>
          {ground}
          {/* バット（朱） */}
          <line x1="150" y1="78" x2="192" y2="42" {...thin} strokeWidth={10} />
          {/* 腕 */}
          <path d="M110 64 Q132 66 150 78" {...limb} />
          {/* 胴 */}
          <line x1="112" y1="58" x2="97" y2="108" {...limb} strokeWidth={15} />
          {/* 脚 */}
          <path d="M97 108 L122 138 L119 170" {...limb} />
          <path d="M97 108 L69 136 L56 166" {...limb} />
          {/* 頭＋帽子 */}
          <circle cx="118" cy="40" r="15" fill={INK} />
          <path d="M103 38 a15 15 0 0 1 30 0 z" fill={ACCENT} />
          <line x1="130" y1="32" x2="144" y2="29" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    case "pitcher":
      return (
        <g>
          {ground}
          {/* 投球腕＋ボール */}
          <path d="M98 60 L126 46 L148 24" {...limb} />
          <circle cx="158" cy="16" r="7" fill={ACCENT} />
          {/* グラブ腕 */}
          <path d="M95 62 L62 72" {...limb} />
          <circle cx="52" cy="74" r="10" fill={ACCENT} />
          {/* 胴 */}
          <line x1="97" y1="56" x2="101" y2="106" {...limb} strokeWidth={15} />
          {/* 脚（足上げ） */}
          <path d="M101 106 L69 92 L60 118" {...limb} />
          <path d="M101 106 L106 140 L103 172" {...limb} />
          {/* 頭＋帽子 */}
          <circle cx="97" cy="38" r="15" fill={INK} />
          <path d="M82 36 a15 15 0 0 1 30 0 z" fill={ACCENT} />
          <line x1="84" y1="30" x2="70" y2="27" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    case "catcher":
      return (
        <g>
          {ground}
          {/* 胴（低い構え） */}
          <line x1="100" y1="78" x2="100" y2="116" {...limb} strokeWidth={15} />
          {/* 脚（スクワット） */}
          <path d="M100 116 L66 126 L73 162" {...limb} />
          <path d="M100 116 L134 126 L127 162" {...limb} />
          {/* ミット腕 */}
          <path d="M100 84 L108 126" {...limb} />
          <circle cx="111" cy="140" r="12" fill={ACCENT} />
          {/* 頭＋キャップ（後ろ被り） */}
          <circle cx="100" cy="60" r="15" fill={INK} />
          <path d="M85 58 a15 15 0 0 1 30 0 z" fill={ACCENT} />
        </g>
      );
    case "infielder":
      return (
        <g>
          {ground}
          {/* 胴（前傾） */}
          <line x1="84" y1="72" x2="108" y2="110" {...limb} strokeWidth={15} />
          {/* グラブ腕（低く差し出す） */}
          <path d="M88 78 L60 118" {...limb} />
          <circle cx="54" cy="130" r="11" fill={ACCENT} />
          {/* 逆腕 */}
          <path d="M92 80 L116 96" {...limb} />
          {/* 脚（広く） */}
          <path d="M108 110 L140 132 L146 166" {...limb} />
          <path d="M108 110 L92 142 L82 170" {...limb} />
          {/* 頭＋帽子 */}
          <circle cx="78" cy="56" r="15" fill={INK} />
          <path d="M63 54 a15 15 0 0 1 30 0 z" fill={ACCENT} />
          <line x1="64" y1="48" x2="50" y2="46" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    case "outfielder":
      return (
        <g>
          {ground}
          {/* 打球 */}
          <circle cx="142" cy="12" r="6" fill={ACCENT} />
          {/* 捕球腕（頭上） */}
          <path d="M100 66 L118 34" {...limb} />
          <circle cx="124" cy="24" r="11" fill={ACCENT} />
          {/* 逆腕 */}
          <path d="M98 70 L70 88" {...limb} />
          {/* 胴 */}
          <line x1="100" y1="62" x2="96" y2="112" {...limb} strokeWidth={15} />
          {/* 脚（走りながら） */}
          <path d="M96 112 L122 130 L120 162" {...limb} />
          <path d="M96 112 L68 138 L48 150" {...limb} />
          {/* 頭＋帽子 */}
          <circle cx="100" cy="46" r="15" fill={INK} />
          <path d="M85 44 a15 15 0 0 1 30 0 z" fill={ACCENT} />
          <line x1="112" y1="38" x2="126" y2="35" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    case "runner":
      return (
        <g>
          {ground}
          {/* 腕（前後に振る） */}
          <path d="M100 64 L132 82" {...limb} />
          <path d="M98 62 L64 50" {...limb} />
          {/* 胴（前傾） */}
          <line x1="102" y1="58" x2="88" y2="106" {...limb} strokeWidth={15} />
          {/* 脚（スプリント） */}
          <path d="M88 106 L120 118 L114 152" {...limb} />
          <path d="M88 106 L58 128 L36 118" {...limb} />
          {/* 頭＋帽子 */}
          <circle cx="108" cy="40" r="15" fill={INK} />
          <path d="M93 38 a15 15 0 0 1 30 0 z" fill={ACCENT} />
          <line x1="120" y1="32" x2="134" y2="29" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
          {/* スピード線 */}
          <line x1="30" y1="70" x2="56" y2="70" stroke={INK} strokeWidth="4" opacity="0.3" strokeLinecap="round" />
          <line x1="24" y1="86" x2="46" y2="86" stroke={INK} strokeWidth="4" opacity="0.3" strokeLinecap="round" />
        </g>
      );
  }
}

/**
 * 選手イラストカード（ベースボールカード風の枠つき）
 */
export default function PlayerArt({
  player,
  className,
}: {
  player: Player;
  className?: string;
}) {
  const kind = pickArt(player);
  return (
    <figure className={`pa-card ${className || ""}`}>
      <svg viewBox="0 0 200 200" role="img" aria-label={`${player.name}のイメージイラスト`}>
        <Figure kind={kind} />
      </svg>
      <figcaption className="pa-label">{LABELS[kind]}</figcaption>
    </figure>
  );
}
