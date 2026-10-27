"use client";

import { useEffect, useState } from "react";
import AffiliateBox from "@/components/AffiliateBox";
import { RAKUTEN_APP_ID, RAKUTEN_AFFILIATE_ID } from "@/data/site";

// アクセスキーはリファラ制限アプリ用。ドメインでロックされるためクライアント同梱でOK。
// ビルド時に NEXT_PUBLIC_RAKUTEN_ACCESS_KEY(=GitHub Secret) が埋め込まれる。
const ACCESS_KEY = process.env.NEXT_PUBLIC_RAKUTEN_ACCESS_KEY || "";
const ENDPOINT =
  "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260701";

type Item = {
  name: string;
  price: number;
  url: string;
  image: string;
  shop: string;
  /** 報酬率(%)。楽天は実測で一律4%だが、将来変わりうるので商品ごとに持つ */
  rate: number;
  reviews: number;
};

function parse(data: unknown): Item[] {
  const d = data as { Items?: { Item?: Record<string, unknown> }[] };
  if (!d || !Array.isArray(d.Items)) return [];
  return d.Items.map((wrap) => {
    const it = (wrap.Item || wrap) as Record<string, unknown>;
    const imgs = (it.mediumImageUrls || []) as
      | { imageUrl: string }[]
      | string[];
    const first = imgs[0] as { imageUrl?: string } | string | undefined;
    const raw = typeof first === "string" ? first : first?.imageUrl || "";
    return {
      name: String(it.itemName || ""),
      price: Number(it.itemPrice || 0),
      url: String(it.affiliateUrl || it.itemUrl || ""),
      image: raw.replace(/\?_ex=\d+x\d+$/, "?_ex=300x300"),
      shop: String(it.shopName || ""),
      rate: Number(it.affiliateRate || 0),
      reviews: Number(it.reviewCount || 0),
    };
  }).filter((i) => i.name && i.url && i.image);
}

const yen = (n: number) => "¥" + n.toLocaleString("ja-JP");

/**
 * どの商品をカードに出すかの採点。
 *
 * ⚠️ ここは本番APIで実測して決めた。軟式グローブで比べた結果：
 *   - 既定の "standard"   … 無名ブランドの安物が上。1件あたりの報酬 約¥785
 *   - レビュー件数順だけ  … Falcon・PROMARKが3枠を占めて同じく約¥785
 *   - 下の式            … 久保田スラッガー・ローリングスが並び 約¥1,445（1.84倍）
 *
 * 高額一辺倒にすると評価0件の商品が出て売れない。レビュー件数の対数を掛けて、
 * 「そこそこ信頼されていて、かつ単価が高いもの」を選ぶ。報酬率は楽天が一律4%なので
 * 実質は価格で効くが、率が変わっても追従するよう式に残す。
 */
function revenueScore(i: Item): number {
  const fee = (i.price * i.rate) / 100;
  return fee * (1 + Math.log10(1 + i.reviews));
}

/**
 * 楽天商品検索APIの実商品カードを表示（クライアント側JSONP）。
 * 初期表示・取得失敗時は検索リンク(AffiliateBox)にフォールバックするので、
 * SEO用のアフィリンクは常にHTMLに存在する。
 */
export default function ProductCards({
  keyword,
  heading = "🛒 楽天で人気の商品",
  hits = 4,
  fallbackRakuten = [],
  minPrice,
}: {
  keyword: string;
  heading?: string;
  hits?: number;
  fallbackRakuten?: string[];
  /** 下限価格。道具カテゴリで小物（グリップテープ等）が混ざるのを防ぐ */
  minPrice?: number;
}) {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    if (!ACCESS_KEY || !RAKUTEN_APP_ID) return;
    const params = new URLSearchParams({
      applicationId: RAKUTEN_APP_ID,
      accessKey: ACCESS_KEY,
      keyword,
      // 採点で絞るので、表示枚数より多めに取る（上限30件）
      hits: String(Math.min(30, Math.max(hits * 6, 10))),
      imageFlag: "1",
      // ⚠️ "standard" は無名ブランドの安物（評価2件台）が上に来る。
      //    レビュー件数順にすると、草野球で実際に使われているSSK・ディマリニ等が並び、
      //    平均価格が約1.7倍（≒報酬も1.7倍）になることを本番APIで実測して決めた。
      sort: "-reviewCount",
      formatVersion: "1",
      // 大人の草野球向けサイトなので、少年・ジュニア用モデルを除外。
      // 「軟式」を探しているページでは硬式・ソフトボール用も弾く（実測で混ざった）
      NGKeyword:
        "少年 ジュニア キッズ 小学生" +
        (keyword.includes("軟式") ? " 硬式 ソフトボール" : ""),
    });
    if (minPrice) params.set("minPrice", String(minPrice));
    if (RAKUTEN_AFFILIATE_ID) params.set("affiliateId", RAKUTEN_AFFILIATE_ID);
    let alive = true;
    // 新エンドポイントはCORS対応。ブラウザのリファラ(オリジン)で認可される。
    fetch(`${ENDPOINT}?${params.toString()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        const parsed = parse(data)
          .sort((a, b) => revenueScore(b) - revenueScore(a))
          .slice(0, hits);
        if (parsed.length) setItems(parsed);
      })
      .catch(() => {
        /* 失敗時はフォールバックのまま */
      });
    return () => {
      alive = false;
    };
  }, [keyword, hits, minPrice]);

  // 取得できるまで（＆失敗時）は検索リンクにフォールバック
  if (!items) {
    return (
      <AffiliateBox heading={heading} rakuten={fallbackRakuten} retailers />
    );
  }

  return (
    <div className="prod-box">
      <p className="aff-heading">{heading}</p>
      <div className="prod-grid">
        {items.map((it) => (
          <a
            key={it.url}
            className="prod-card"
            href={it.url}
            target="_blank"
            rel="noopener sponsored nofollow"
          >
            <span className="prod-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.image} alt={it.name} loading="lazy" />
            </span>
            <span className="prod-name">{it.name}</span>
            <span className="prod-meta">
              <span className="prod-price">{yen(it.price)}</span>
              <span className="prod-shop">{it.shop}</span>
            </span>
            <span className="prod-btn">楽天で見る →</span>
          </a>
        ))}
      </div>
      <p className="aff-note">
        ※ 楽天市場の商品を自動表示（広告）。価格・在庫は変動します。
      </p>
    </div>
  );
}
