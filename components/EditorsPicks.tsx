"use client";

import { useEffect, useState } from "react";
import { RAKUTEN_APP_ID, RAKUTEN_AFFILIATE_ID } from "@/data/site";

const ACCESS_KEY = process.env.NEXT_PUBLIC_RAKUTEN_ACCESS_KEY || "";
const ENDPOINT =
  "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260701";

export type Pick = { keyword: string; label: string; comment: string };
type Item = { name: string; price: number; url: string; image: string; shop: string };

async function fetchOne(keyword: string): Promise<Item | null> {
  if (!ACCESS_KEY || !RAKUTEN_APP_ID) return null;
  const p = new URLSearchParams({
    applicationId: RAKUTEN_APP_ID,
    accessKey: ACCESS_KEY,
    keyword,
    hits: "1",
    imageFlag: "1",
    sort: "standard",
    formatVersion: "1",
    // 大人の草野球向けサイトなので、少年・ジュニア用モデルを除外
    NGKeyword: "少年 ジュニア キッズ 小学生",
  });
  if (RAKUTEN_AFFILIATE_ID) p.set("affiliateId", RAKUTEN_AFFILIATE_ID);
  try {
    const r = await fetch(`${ENDPOINT}?${p.toString()}`);
    if (!r.ok) return null;
    const d = (await r.json()) as { Items?: { Item?: Record<string, unknown> }[] };
    const w = d.Items && d.Items[0];
    const it = (w && (w.Item || w)) as Record<string, unknown> | undefined;
    if (!it) return null;
    const imgs = (it.mediumImageUrls || []) as { imageUrl: string }[] | string[];
    const first = imgs[0] as { imageUrl?: string } | string | undefined;
    const raw = typeof first === "string" ? first : first?.imageUrl || "";
    if (!it.itemName || !raw) return null;
    return {
      name: String(it.itemName),
      price: Number(it.itemPrice || 0),
      url: String(it.affiliateUrl || it.itemUrl || ""),
      image: raw.replace(/\?_ex=\d+x\d+$/, "?_ex=300x300"),
      shop: String(it.shopName || ""),
    };
  } catch {
    return null;
  }
}

/**
 * 編集部が選んだキーワードごとに楽天の該当商品を1点ずつ表示する「一押し」枠。
 * 取得できたものだけ表示（失敗時は非表示）。下部のProductCardsがSEO用リンクを担う。
 */
export default function EditorsPicks({
  heading = "編集部の一押し",
  picks,
}: {
  heading?: string;
  picks: Pick[];
}) {
  const [items, setItems] = useState<(Item | null)[] | null>(null);

  useEffect(() => {
    let alive = true;
    Promise.all(picks.map((p) => fetchOne(p.keyword))).then((res) => {
      if (alive) setItems(res);
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!items) return null;
  const rows = picks
    .map((p, i) => ({ p, it: items[i] }))
    .filter((x): x is { p: Pick; it: Item } => !!x.it);
  if (rows.length === 0) return null;

  const yen = (n: number) => "¥" + n.toLocaleString("ja-JP");

  return (
    <div className="picks-box">
      <p className="picks-heading">★ {heading}</p>
      <div className="picks-list">
        {rows.map(({ p, it }, i) => (
          <a
            key={p.keyword}
            className="pick-card"
            href={it.url}
            target="_blank"
            rel="noopener sponsored nofollow"
          >
            <span className="pick-rank">{i + 1}</span>
            <span className="pick-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.image} alt={it.name} loading="lazy" />
            </span>
            <span className="pick-body">
              <span className="pick-label">{p.label}</span>
              <span className="pick-name">{it.name}</span>
              <span className="pick-comment">{p.comment}</span>
              <span className="pick-meta">
                <span className="pick-price">{yen(it.price)}</span>
                <span className="pick-shop">{it.shop}</span>
              </span>
            </span>
            <span className="pick-btn">楽天で見る →</span>
          </a>
        ))}
      </div>
      <p className="aff-note">
        ※ 編集部が選んだキーワードで楽天の該当商品を表示（広告）。価格・在庫は変動します。
      </p>
    </div>
  );
}
