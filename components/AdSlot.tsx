"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT_ID, ADSENSE_SLOTS } from "@/data/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * 広告枠。data/site.ts の ADSENSE_CLIENT_ID を設定すると
 * プレースホルダーが実際の AdSense 広告に切り替わります。
 */
export default function AdSlot({
  id,
  label = "広告",
}: {
  /** ADSENSE_SLOTS のキー名（枠の場所を識別） */
  id: string;
  label?: string;
}) {
  const enabled = ADSENSE_CLIENT_ID.length > 0;

  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense スクリプト未ロード時は無視（次回レンダリングで再試行される）
    }
  }, [enabled]);

  if (!enabled) {
    return (
      <div className="ad-slot" aria-hidden="true">
        広告スペース（data/site.ts に AdSense ID を設定すると表示されます）
      </div>
    );
  }

  const slot = ADSENSE_SLOTS[id] ?? "";
  return (
    <div className="ad-slot-live" aria-label={label}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
