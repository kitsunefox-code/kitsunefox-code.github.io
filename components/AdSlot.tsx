"use client";

import { useEffect, useRef } from "react";
import {
  ADSENSE_CLIENT_ID,
  ADSENSE_SLOTS,
  ADSENSE_DEFAULT_SLOT,
  ADSENSE_ENABLED,
  ALT_AD_SLOTS,
  ALT_AD_DEFAULT,
  ALT_AD_PRIMARY_SLOTS,
} from "@/data/site";
import AltAd from "@/components/AltAd";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * 広告枠。
 *
 * ● 運用方針（重要）
 *   手動配置の <ins> 広告ユニットは **data-ad-slot（スロットID）が無いと配信されず
 *   "unfilled" になる**。そのため：
 *   - data/site.ts の ADSENSE_SLOTS にスロットIDを設定した枠だけ、実際の <ins> を出す。
 *   - スロット未設定の枠は何も描画しない（＝レイアウトに空の壊れ枠を残さない）。
 *     この状態でも、AdSense 管理画面で「自動広告(Auto ads)」をONにすれば
 *     Google がページ全体を見て自動で広告を差し込むため、収益化は成立する。
 *   - AdSense未設定（開発時）は、場所が分かるプレースホルダーを出す。
 */
export default function AdSlot({
  id,
  label = "広告",
}: {
  /** ADSENSE_SLOTS のキー名（枠の場所を識別） */
  id: string;
  label?: string;
}) {
  // ADSENSE_ENABLED が false の間は完全に無効（スクリプトも読み込まれない）
  const enabled = ADSENSE_ENABLED && ADSENSE_CLIENT_ID.length > 0;
  // 個別スロット未設定なら共通のデフォルトスロットにフォールバック（1個作れば全枠点灯）
  const slot = ADSENSE_SLOTS[id] || ADSENSE_DEFAULT_SLOT;
  const pushed = useRef(false);

  useEffect(() => {
    if (!enabled || !slot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense スクリプト未ロード時は無視（次回レンダリングで再試行される）
    }
  }, [enabled, slot]);

  // AdSense停止中：代替広告（忍者AdMax等）のタグがあればそれを出す。
  // タグ未設定なら何も描画しない（プレースホルダーを出すと本番に空箱が並ぶため）。
  if (!enabled) {
    // 枠ID専用のタグがあればそれを使う。無ければ共通タグだが、
    // 共通タグは1ページ1回しか描画できないため「主枠」に限定する。
    const ownTag = ALT_AD_SLOTS[id];
    const altSnippet = ownTag || (ALT_AD_PRIMARY_SLOTS.has(id) ? ALT_AD_DEFAULT : "");
    return altSnippet ? <AltAd snippet={altSnippet} label={label} /> : null;
  }

  // AdSense有効だがスロット未設定：手動ユニットは出さず、自動広告に委ねる
  if (!slot) return null;

  // スロットID設定済み：実際の広告ユニットを配置
  return (
    <div className="ad-slot-live" aria-label={label}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
