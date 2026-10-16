# Xの自動運用（毎時1本・野球ニュース）

毎時0分に、**その時点でいちばん注目されている野球ニュース**を1本拾って投稿する仕組み。

## 注目度の測り方

インプレッション数は外から取れない。代わりに使っているのが
**「同じ出来事を何本の記事が書いたか」**。

各社が独立に「これは出す」と判断した本数なので、注目度の代理指標として素直に効く。
見出しは社ごとに全然違うので、**見出しの一致ではなく語の重なり**で同じ出来事をまとめている
（カタカナ3字以上・漢字2字以上を拾い、2語以上共有していたら同じ出来事とみなす）。

実測例：ドジャース敗退の日は「8本・3社」で、2位以下に大差をつけて1位になった。

## 使うもの

| ファイル | 役割 |
|---|---|
| `scripts/news.mjs` | ニュースの取得・出来事のまとめ・注目度の採点・一言の型 |
| `scripts/hourly.mjs` | 毎時1本ぶんの実行 |
| `scripts/x-client.mjs` | X APIへの投稿（OAuth 1.0a を自前署名・依存ゼロ） |
| `scripts/gen-x-posts.mjs` | 1日分をまとめて作るほう（手で出す用） |

```bash
node scripts/hourly.mjs --dry     # 何が出るか見るだけ
node scripts/hourly.mjs --force   # 時間帯・上限を無視して1本
node scripts/hourly.mjs           # 本番（タスクから毎時呼ばれる）
```

## 投稿を自動にするには鍵が要る

鍵が無い間は投稿せず、`いま出すやつ.html` に積むだけ（人が1タップで出す）。

1. <https://developer.x.com/> で開発者登録 → アプリを作る
2. **User authentication settings を "Read and write" にする**
3. そのあとで Access Token を**作り直す**（Readのままで発行したトークンだと403になる）
4. `x-posts/.env` を作る（このファイルは .gitignore 済み）

```
X_API_KEY=...
X_API_SECRET=...
X_ACCESS_TOKEN=...
X_ACCESS_SECRET=...
```

### ⚠️ 無料枠は月500件

投稿は**月500件＝1日16件**まで。24時間まわすと月720件で超える。
なので `hourly.mjs` は **7時〜22時の16スロット**に絞ってある（深夜は見る人も少ない）。
もっと出すなら Basic（有料）が要る。

定数は `hourly.mjs` の先頭：`START_HOUR` / `END_HOUR` / `MAX_PER_DAY` / `COOLDOWN_DAYS`。

## 毎時実行の登録（管理者のコマンドプロンプトで1回）

```
schtasks /Create /TN "kusayakyu-x-hourly" /SC HOURLY /ST 07:00 /F /TR "wscript.exe \"C:\Users\shadai15\Desktop\Claude\個人\副業\kusayakyu-uniform\x-posts\run-hidden.vbs\""
```

止めるとき：

```
schtasks /Change /TN "kusayakyu-x-hourly" /DISABLE
```

## 事故らないようにしていること

- **けが・訃報・不祥事・逮捕・戦力外・炎上**は一言を付けず、候補から外す（`SENSITIVE`）
- **勝った話か負けた話かで一言を変える**（`RESULT_ANGLES`）。
  「敗退」の記事に明るい型が付くと一発で冷めるため、話題の型より優先して当てる
- **夫人・私服などの芸能寄り**は順位を下げる（`GOSSIP`）
- 同じ話題は**5日間**出さない。直近3本と同じ話題も避ける（`COOLDOWN_DAYS`）
- **記事本文は書き写さない**。出すのは自分の一言＋リンクだけで、
  見出しとサムネはXのリンクカードに任せる
- ブラウザ自動操作では投稿しない（Xの自動化ルール違反・凍結のもと）。公式APIのみ

## 一言の質を上げたいとき

型だけだと、どうしても当たり外れが出る。
`queue.json` に以下の形で入れておくと、該当ニュースのときに**型より優先して**使われる。

```json
[{ "link": "https://...", "comment": "ここに本物の一言", "used": false }]
```

Claudeに毎朝まとめて書かせて、ここに積む運用を想定している。
