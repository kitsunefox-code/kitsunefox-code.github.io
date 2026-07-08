"use client";

import { useState } from "react";
import { SITE_URL } from "@/data/site";

export default function ComboShare({
  code,
  slug,
  title,
  mbtiNickname,
  mbtiCatch,
  playerTypeName,
  playerTypeDesc,
}: {
  code: string;
  slug: string;
  title: string;
  mbtiNickname: string;
  mbtiCatch: string;
  playerTypeName: string;
  playerTypeDesc: string;
}) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${SITE_URL}/combo/${code.toLowerCase()}/${slug}/`;
  const shareText = `私の野球人格は【${title}】タイプらしい。\n性格は「${mbtiNickname}」（${mbtiCatch}）、プレースタイルは「${playerTypeName}型」（${playerTypeDesc}）。\nあなたの複合タイプは？⚾`;

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(
    "草野球ナビ,複合診断"
  )}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(shareText)}`;

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="share-box combo-share-box">
      <span className="share-label">この複合診断結果をシェア</span>
      <div className="share-btns">
        <a className="share-btn share-x" href={xUrl} target="_blank" rel="noopener noreferrer">
          𝕏 でシェア
        </a>
        <a
          className="share-btn share-line"
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          LINEで送る
        </a>
        <button className="share-btn share-copy" onClick={copyShare}>
          {copied ? "コピーしました！" : "結果をコピー"}
        </button>
      </div>
    </div>
  );
}
