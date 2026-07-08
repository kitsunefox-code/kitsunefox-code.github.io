// タイプの視覚アイコン。絵文字（AIっぽく見える）の代わりに、
// game-icons.net（CC BY 3.0）のフリー素材から選定したSVGパスを使用。
// 出典・ライセンス表記は app/layout.tsx のフッターに記載。
import ICON_PATHS_JSON from "./iconPaths.json";

export type IconDef = { viewBox: string; d: string; source: string };

export const ICON_PATHS: Record<string, IconDef> = ICON_PATHS_JSON;

export function iconFor(key: string): IconDef | undefined {
  return ICON_PATHS[key];
}
