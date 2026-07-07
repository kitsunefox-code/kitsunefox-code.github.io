// 2つの診断（野球選手MBTI診断／野球選手タイプ診断）の結果をlocalStorageに覚えておき、
// 両方終えたユーザーに複合診断ページ（/combo/{code}/{slug}/）へのリンクを出すための小ヘルパー。
const KEY_MBTI = "kn_mbti_code";
const KEY_TYPE = "kn_player_type_slug";

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* noop（プライベートモード等） */
  }
}

export const saveMbtiCode = (code: string) => safeSet(KEY_MBTI, code);
export const saveTypeSlug = (slug: string) => safeSet(KEY_TYPE, slug);
export const getSavedMbtiCode = () => safeGet(KEY_MBTI);
export const getSavedTypeSlug = () => safeGet(KEY_TYPE);
