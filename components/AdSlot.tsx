"use client";

import { useEffect, useRef } from "react";
import {
  ADSENSE_CLIENT_ID,
  ADSENSE_SLOTS,
  ADSENSE_DEFAULT_SLOT,
  ADSENSE_ENABLED,
} from "@/data/site";

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

  // AdSense停止中（ADSENSE_ENABLED=false）：何も描画しない。
  // ここでプレースホルダーを出すと本番に「広告スペース」の空箱が並んでしまうため、
  // 必ず null を返すこと。
  if (!enabled) return null;

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
