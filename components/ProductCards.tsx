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
};

// リファラ制限アプリはブラウザの本物のRefererが必要なため、JSONPで取得する。
function jsonp(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const cb = "__rkt_" + Math.random().toString(36).slice(2);
    const s = document.createElement("script");
    const w = window as unknown as Record<string, unknown>;
    const cleanup = () => {
      delete w[cb];
      s.remove();
    };
    w[cb] = (data: unknown) => {
      resolve(data);
      cleanup();
    };
    s.onerror = () => {
      reject(new Error("jsonp error"));
      cleanup();
    };
    s.src = `${url}&callback=${cb}&format=json`;
    document.body.appendChild(s);
    setTimeout(() => {
      if (w[cb]) {
        reject(new Error("timeout"));
        cleanup();
      }
    }, 10000);
  });
}

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
    };
  }).filter((i) => i.name && i.url && i.image);
}

const yen = (n: number) => "¥" + n.toLocaleString("ja-JP");

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
}: {
  keyword: string;
  heading?: string;
  hits?: number;
  fallbackRakuten?: string[];
}) {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    if (!ACCESS_KEY || !RAKUTEN_APP_ID) return;
    const params = new URLSearchParams({
      applicationId: RAKUTEN_APP_ID,
      accessKey: ACCESS_KEY,
      keyword,
      hits: String(hits),
      imageFlag: "1",
      sort: "standard",
      formatVersion: "1",
    });
    if (RAKUTEN_AFFILIATE_ID) params.set("affiliateId", RAKUTEN_AFFILIATE_ID);
    let alive = true;
    jsonp(`${ENDPOINT}?${params.toString()}`)
      .then((data) => {
        if (!alive) return;
        const parsed = parse(data).slice(0, hits);
        if (parsed.length) setItems(parsed);
      })
      .catch(() => {
        /* 失敗時はフォールバックのまま */
      });
    return () => {
      alive = false;
    };
  }, [keyword, hits]);

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
