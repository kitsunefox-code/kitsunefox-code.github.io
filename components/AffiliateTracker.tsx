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

// クリックされた導線の種類を、祖先要素のクラス名から推定する。
// ⚠️ 推測で書かず、実DOMを調べた実際のクラス名に合わせること
//   （prod-* = ProductCards / aff-* = AffiliateBox / goods-* = GoodsLinks）。
//   最初は [class*="pc"] のような当て推量で書いたため placement が "other" に
//   落ちていた。判定順は「狭い文脈 → 広い文脈」。
function placementOf(el: Element): string {
  // まず「ページのどこか」（文脈）を優先して見る
  if (el.closest(".pq-result")) return "diagnosis-result"; // 診断結果の中
  if (el.closest(".dock-gear-nav")) return "dock-gear-nav"; // 診断ページ上部の導線
  if (el.closest(".alt-ad")) return "ad"; // 広告枠（切り分け用）

  // 次に「どの部品か」を見る
  if (el.closest(".prod-box, .prod-card")) return "product-cards";
  if (el.closest(".aff-box, .aff-card")) return "affiliate-box";
  if (el.closest(".goods-grid, .goods-card")) return "goods-links";

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
