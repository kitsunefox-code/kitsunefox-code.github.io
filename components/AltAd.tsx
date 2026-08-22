"use client";

// 代替広告（忍者AdMax など）の描画。
//
// ⚠️ 重要: 忍者AdMax のタグは中身が `document.write()` を使う旧式のスクリプト。
// ページ読み込み後に外部スクリプトを差し込むと
// 「Failed to execute 'write' on 'Document'」となり広告が出ない。
// そこで **document.write を一時的に乗っ取り**、書き込み内容をこの枠の中へ
// 流し込むことで、後入れでも正しく描画されるようにしている。
import { useEffect, useRef } from "react";

export default function AltAd({ snippet, label = "広告" }: { snippet: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    const host = ref.current;
    if (!host || !snippet || injected.current) return;
    injected.current = true;

    // スニペットから <script src> と インラインscript / 通常HTML を取り出す
    const tpl = document.createElement("template");
    tpl.innerHTML = snippet;
    const nodes = Array.from(tpl.content.childNodes);

    // document.write を、この枠への追記に差し替える
    const origWrite = document.write.bind(document);
    const origWriteln = document.writeln.bind(document);
    const writeToHost = (...args: string[]) => {
      const frag = document.createElement("div");
      frag.innerHTML = args.join("");
      // 書き込まれたHTML内の<script>も実行されるよう作り直す
      Array.from(frag.childNodes).forEach((n) => {
        if (n.nodeName === "SCRIPT") {
          const s = n as HTMLScriptElement;
          const ns = document.createElement("script");
          Array.from(s.attributes).forEach((a) => ns.setAttribute(a.name, a.value));
          ns.text = s.text;
          host.appendChild(ns);
        } else {
          host.appendChild(n.cloneNode(true));
        }
      });
    };

    let restored = false;
    const restore = () => {
      if (restored) return;
      restored = true;
      document.write = origWrite;
      document.writeln = origWriteln;
    };

    (document as Document).write = writeToHost as typeof document.write;
    (document as Document).writeln = writeToHost as typeof document.writeln;

    let pending = 0;
    const done = () => {
      pending -= 1;
      if (pending <= 0) restore();
    };

    nodes.forEach((node) => {
      if (node.nodeName === "SCRIPT") {
        const src = (node as HTMLScriptElement).src;
        const el = document.createElement("script");
        if (src) {
          pending += 1;
          el.src = src;
          // async=false で順序を保ちつつ、読み込み完了まで write を乗っ取ったままにする
          el.async = false;
          el.onload = done;
          el.onerror = done;
        } else {
          el.text = (node as HTMLScriptElement).text;
        }
        host.appendChild(el);
      } else {
        host.appendChild(node.cloneNode(true));
      }
    });

    // 外部スクリプトが無い場合や、取りこぼし対策のタイムアウト
    if (pending === 0) restore();
    const t = setTimeout(restore, 8000);
    return () => clearTimeout(t);
  }, [snippet]);

  if (!snippet) return null;
  return <div className="alt-ad" ref={ref} aria-label={label} />;
}
