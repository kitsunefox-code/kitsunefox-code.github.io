"use client";

// 代替広告（忍者AdMax・i-mobile など）の描画。
// 各社が発行するタグは <div> と <script> の組み合わせなので、
// innerHTML では <script> が実行されない。createContextualFragment を使うと
// スクリプトも実行されるため、どのネットワークのタグでもそのまま貼れる。
import { useEffect, useRef } from "react";

export default function AltAd({ snippet, label = "広告" }: { snippet: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    const host = ref.current;
    if (!host || !snippet || injected.current) return;
    try {
      const range = document.createRange();
      range.selectNode(host);
      // createContextualFragment は <script> を実行する（innerHTML はしない）
      const frag = range.createContextualFragment(snippet);
      host.innerHTML = "";
      host.appendChild(frag);
      injected.current = true;
    } catch {
      /* タグが不正でもページ全体は壊さない */
    }
  }, [snippet]);

  if (!snippet) return null;
  return <div className="alt-ad" ref={ref} aria-label={label} />;
}
