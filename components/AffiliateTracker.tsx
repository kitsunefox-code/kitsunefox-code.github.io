"use client";

// アフィリエイトリンクのクリックをGA4に送る。
//
// なぜ1箇所でやるか:
//   アフィリリンクは ProductCards / AffiliateBox / GoodsLinks / 記事内の rktSearch など
//   26箇所以上に散っている。各所に onClick を足すと必ず付け忘れが出るので、
//   document レベルで click を委譲キャッチして一括で送る。
//
// 何が分かるようになるか:
//   「どのページの」「どの種類の導線が」「どの商材で」クリックされたか。
//   これまでは計測が無く、配置の良し悪しを数字で判断できなかった。
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// アフィリエイト先のドメイン（A8経由・楽天直・各社ASP）
const AFFILIATE_HOSTS = [
  "a8.net",
  "rakuten.co.jp",
  "px.a8.net",
  "hb.afl.rakuten.co.jp",
];

function isAffiliate(href: string): boolean {
  try {
    const u = new URL(href, location.href);
    if (u.origin === location.origin) return false;
    return AFFILIATE_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith("." + h));
  } catch {
    return false;
  }
}

// クリックされた導線の種類を、祖先要素のクラス名から推定する
function placementOf(el: Element): string {
  const map: [string, string][] = [
    [".pq-result", "diagnosis-result"], // 診断結果の中
    [".dock-gear-nav", "dock-gear-nav"], // 診断ページ上部の導線
    [".alt-ad", "ad"], // 広告枠（誤判定の切り分け用）
    [".goods-card", "goods-links"],
  ];
  for (const [sel, name] of map) {
    if (el.closest(sel)) return name;
  }
  // コンポーネント由来のクラス接頭辞から拾う
  const holder = el.closest('[class*="pc"], [class*="aff"], [class*="product"]');
  if (holder) {
    const cls = (holder.className || "").toString();
    if (/product|pc-/.test(cls)) return "product-cards";
    if (/aff/.test(cls)) return "affiliate-box";
  }
  return "other";
}

export default function AffiliateTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const a = target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href || !isAffiliate(href)) return;

      const label = (a.textContent || "").trim().slice(0, 80);
      try {
        window.gtag?.("event", "affiliate_click", {
          // 何をクリックしたか
          link_text: label || "(no text)",
          link_url: href.slice(0, 300),
          // どこでクリックしたか（配置の良し悪しを後で比較するため）
          placement: placementOf(a),
          page_path: location.pathname,
        });
      } catch {
        /* 計測の失敗で遷移を邪魔しない */
      }
    };

    // capture=true: 子要素で stopPropagation されても拾えるようにする
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
