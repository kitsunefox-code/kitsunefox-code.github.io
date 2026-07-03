# 収益化チェックリスト（この順番でやればOK）

「👤=あなたの作業（アカウント・支払いが必要）」「🤖=Claudeに頼めば即やります」

---

## STEP 1. サイトを公開する（今日できる・無料）

- [ ] 👤 **Vercel にサインアップ**（無料）: https://vercel.com/signup → 「Continue with GitHub」を選ぶだけ
- [ ] 👤 Vercel の「Add New → Project」で GitHub リポジトリ `kusayakyu-uniform` を Import → そのまま Deploy
  - ビルド設定は自動検出されます（何も変更不要）
  - 数分で `https://xxx.vercel.app` のURLで公開されます
- [ ] 🤖 公開URLが決まったら Claude に伝える → 動作確認します

## STEP 2. 独自ドメインを取る（費用: 年1,000〜2,000円くらい）

AdSense は独自ドメインがほぼ必須です。`.vercel.app` のままでは審査に通りません。

- [ ] 👤 ドメインを購入（おすすめレジストラ: [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)＝原価販売で最安 / [お名前.com](https://www.onamae.com/) / Vercel上で直接購入も可）
  - 候補例: `kusayakyu-navi.com` `uniform-hikaku.com` など（.com か .jp 推奨）
- [ ] 👤 Vercel のプロジェクト → Settings → Domains でドメインを追加（画面の指示どおりDNS設定）
- [ ] 🤖 ドメイン名を Claude に伝える → `data/site.ts` の SITE_URL を差し替えて再デプロイ用にコミットします

## STEP 3. アクセス解析を入れる（無料・5分）

- [ ] 👤 [Google Analytics](https://analytics.google.com/) で GA4 プロパティを作成 → 測定ID（`G-XXXXXXXXXX`）をコピー
- [ ] 🤖 測定IDを Claude に伝える → `data/site.ts` に設定します

## STEP 4. Google に見つけてもらう（無料・10分）

- [ ] 👤 [Google Search Console](https://search.google.com/search-console) にサイトを登録（ドメインプロパティ推奨）
- [ ] 👤 「サイトマップ」メニューで `https://あなたのドメイン/sitemap.xml` を送信
- 以降、検索順位や流入キーワードがここで見られます

## STEP 5. アフィリエイト（ASP）に登録する（無料・審査あり）

登録は無料。サイト審査（数日）があります。複数登録して広告主の取り扱いを比べるのが定石。

- [ ] 👤 [A8.net](https://www.a8.net/)（国内最大手・審査ゆるめ）
- [ ] 👤 [もしもアフィリエイト](https://af.moshimo.com/)（Amazon・楽天の成果もまとめられる）
- [ ] 👤 [バリューコマース](https://www.valuecommerce.ne.jp/)
- [ ] 👤 [楽天アフィリエイト](https://affiliate.rakuten.co.jp/)（楽天IDがあれば即時）
- [ ] 👤 各ASP内で「ユニフォーム」「スポーツ」「オーダー」で広告主を検索 → 提携申請
  - ユニフォーム系の広告主が見つからなくても、野球用品（スワロースポーツ等）・スポーツ用品店の広告は多数あります
- [ ] 🤖 発行されたアフィリエイトリンクを Claude に渡す → `data/makers.ts` の `affiliateUrl` に設定します
  - 設定した瞬間から、ランキング・一覧表・診断結果の全ボタンが収益リンクになります

## STEP 6. Google AdSense に申請する（無料・審査1日〜2週間）

- [ ] 👤 [AdSense](https://adsense.google.com/) でアカウント作成 → サイトを追加して審査に出す
  - 必要要件は実装済み: プライバシーポリシー ✅ / 運営者情報 ✅ / お問い合わせ ✅ / PR表記 ✅
  - 審査通過率を上げるコツ: 記事を増やす（🤖 Claude に「記事を追加して」と言えば書きます）
- [ ] 👤 承認されたらクライアントID（`ca-pub-...`）とサイト運営者IDをコピー
- [ ] 🤖 IDを Claude に伝える → `data/site.ts` と `public/ads.txt` に設定します
  - この瞬間から全ページの広告枠に自動で広告が出ます

## STEP 7. 育てる（継続）

- [ ] 🤖 記事を増やす（「背番号の決め方」「チーム名の決め方」「昇華と刺繍の違い」など、Claudeが書けます）
- [ ] 🤖 メーカー情報の定期更新（価格改定チェック）
- [ ] 👤 月間1万PVを超えたあたりで、メーカーに直接「掲載プラン・成果報酬」の営業メールを送る
  （🤖 営業メールの文面も Claude が書きます）

---

## お金の目安

| 項目 | 費用 |
|------|------|
| Vercel ホスティング | 無料（Hobbyプラン） |
| 独自ドメイン | 年1,000〜2,000円 |
| ASP登録・AdSense | 無料 |
| **初期費用合計** | **年2,000円弱のみ** |

収益の立ち上がりは「AdSense: 月数百円〜（PV次第）」「アフィリエイト: 成約単価数百〜数千円」が現実的なスタートラインです。
検索流入が本格化する（3〜6ヶ月後）まで記事を積むのが最短ルートです。
