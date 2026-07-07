// 「MBTI × 選手タイプ」複合診断ページ用のデータ。
// 256通り（16 MBTIタイプ × 16 選手タイプ）を、既存の2つの診断データから組み立てで生成する。
// 個別に256文本書き起こすのではなく、両診断の解説文をテンプレートで組み合わせる方式。
import {
  MBTI_TYPES,
  mbtiByCode,
  resolvePlayers,
  type MbtiType,
} from "./baseballMbti";
import { PLAYER_TYPES, typeBySlug, examplePlayers, type PlayerType } from "./playerTypes";

export type ComboKey = { code: string; slug: string }; // code=MBTI(大文字), slug=選手タイプ

export const ALL_COMBOS: ComboKey[] = MBTI_TYPES.flatMap((m) =>
  PLAYER_TYPES.map((p) => ({ code: m.code, slug: p.slug }))
);

export function comboPath(code: string, slug: string): string {
  return `/combo/${code.toLowerCase()}/${slug}/`;
}

export type ComboData = {
  mbti: MbtiType;
  playerType: PlayerType;
  title: string; // 「ENTJ×豪快アーチスト」
  path: string;
};

export function getCombo(code: string, slug: string): ComboData | null {
  const mbti = mbtiByCode(code.toUpperCase());
  const playerType = typeBySlug(slug);
  if (!mbti || !playerType) return null;
  return {
    mbti,
    playerType,
    title: `${mbti.code}×${playerType.name}`,
    path: comboPath(mbti.code, playerType.slug),
  };
}

// 複合ページに出す代表選手（両診断それぞれの代表選手をそのまま流用。重複は除去）
export function comboPlayers(combo: ComboData) {
  const mbtiPlayers = resolvePlayers(combo.mbti.players);
  const playerTypePlayers = examplePlayers(combo.playerType, 6);
  const seen = new Set(mbtiPlayers.map((p) => p.name));
  return {
    mbtiPlayers,
    playerTypePlayers: playerTypePlayers.filter((p) => !seen.has(p.name)).slice(0, 4),
  };
}
