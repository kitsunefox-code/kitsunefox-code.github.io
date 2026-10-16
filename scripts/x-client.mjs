// X（旧Twitter）への投稿クライアント。OAuth 1.0a を自前で署名する（依存ゼロ）。
//
// ● なぜ公式APIなのか
//   ブラウザを自動操作して投稿するのはXの自動化ルール違反で、凍結される。
//   公式APIからの自動投稿は**認められている**ので、やるならこっち一択。
//
// ● 必要な鍵（x-posts/.env に置く。gitには上げない）
//   X_API_KEY            … Consumer Key
//   X_API_SECRET         … Consumer Secret
//   X_ACCESS_TOKEN       … Access Token（自分のアカウントのもの）
//   X_ACCESS_SECRET      … Access Token Secret
//   取得先: https://developer.x.com/ → Projects & Apps → Keys and tokens
//   ⚠️ アプリの権限を「Read and write」にしてから Access Token を**作り直す**こと。
//      Read のみで発行したトークンのままだと403になる。
//
// ● 無料枠の上限
//   投稿は月500件まで（≒1日16件）。毎時0分に24回まわすと月720件で超過するので、
//   hourly.mjs 側で1日の上限と稼働時間帯を絞っている。

import crypto from "crypto";
import fs from "fs";
import path from "path";

/** x-posts/.env を読む（KEY=VALUE の素朴な形式） */
export function loadEnv(dir) {
  const file = path.join(dir, ".env");
  const out = {};
  try {
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i < 0) continue;
      out[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  } catch {
    /* 無ければ空。呼び出し側が「鍵なし」として扱う */
  }
  // 環境変数のほうが優先（CIや一時的な上書き用）
  for (const k of ["X_API_KEY", "X_API_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_SECRET"]) {
    if (process.env[k]) out[k] = process.env[k];
  }
  return out;
}

export function hasCredentials(env) {
  return Boolean(env.X_API_KEY && env.X_API_SECRET && env.X_ACCESS_TOKEN && env.X_ACCESS_SECRET);
}

// RFC3986。encodeURIComponent が逃がさない 4文字を自分で潰す
const enc = (s) =>
  encodeURIComponent(String(s)).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());

function sign(method, url, params, consumerSecret, tokenSecret) {
  const base = [
    method.toUpperCase(),
    enc(url),
    enc(
      Object.keys(params)
        .sort()
        .map((k) => `${enc(k)}=${enc(params[k])}`)
        .join("&")
    ),
  ].join("&");
  const key = `${enc(consumerSecret)}&${enc(tokenSecret)}`;
  return crypto.createHmac("sha1", key).update(base).digest("base64");
}

/**
 * 1件投稿する。
 * ⚠️ JSONボディのPOSTなので、OAuth署名にはボディを含めない（oauth_* だけで署名する）。
 *    ここを含めてしまうと401になる。
 */
export async function postTweet(env, text) {
  const url = "https://api.x.com/2/tweets";
  const oauth = {
    oauth_consumer_key: env.X_API_KEY,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: env.X_ACCESS_TOKEN,
    oauth_version: "1.0",
  };
  oauth.oauth_signature = sign("POST", url, oauth, env.X_API_SECRET, env.X_ACCESS_SECRET);

  const header =
    "OAuth " +
    Object.keys(oauth)
      .sort()
      .map((k) => `${enc(k)}="${enc(oauth[k])}"`)
      .join(", ");

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: header, "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal: AbortSignal.timeout(20000),
  });

  const body = await res.text();
  if (!res.ok) {
    // 429（枠切れ）と403（権限不足）は原因が分かるように持ち上げる
    const e = new Error(`X API ${res.status}: ${body.slice(0, 400)}`);
    e.status = res.status;
    throw e;
  }
  try {
    return JSON.parse(body);
  } catch {
    return { raw: body };
  }
}
