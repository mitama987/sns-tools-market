# VERSION_HISTORY_ARCHIVE — sns-tools-market

## index.html（トップ）

### thumbs（2026-10-31）— XTP3・XTP4・XTP6 のサムネを淡い背景に
- ゆうさん「XTP 系の黒背景が統一感をなくしてる」→ scripts/gen_thumbs.py の 3 件を DARK_BG＋白文字から、他の製品と同じ淡いグラデーション＋濃い文字に（xtp6 コーラル／xtp4 ペールブルー／xtp3 ラベンダー）。gpt-image-2 で 3 枚再生成 → 640px WebP。旧版は thumbs/_old/
- 本番トップ・og:image も同じファイルを使うが、ブランチ feature/market-v3-mock のため本番化まで反映されない

### ver3.0-mock2 (2026-10-31) — モック第 2 版（ゆうさん「情報量多い・最初にツールを並べる・XTP6→XTP3 やおすすめは劣後」）
- 並びを「何があるか → 詳しく → おすすめ」に: ヒーロー（1 文・ボタン 1 つ）→ ツール一覧（10 マスの早見表・PC は 1 行 10 個／スマホはアイコン＋名前＋価格の 2 列）→ SNS 別の棚 → XTP6→XTP3（棚の下で小さく）→ 比較表・流れ・FAQ
- 削除: 4 枚タイルの行・棚の「店主のひとこと」・スマホ下部固定バー・ヒーローの浮きカードと説明 2 文。カードの箇条書きは 2 行、無料版の行は値札の中へ、サムネは 4:3
- 確認: 1280／390 でエラー 0・はみ出し 0・href="#" 0・カード 10・早見表 10

### ver3.0-mock (2026-10-31) — v3 のモック（/mock-v3/・本番は未変更・ブランチ feature/market-v3-mock）
- 協業相手の提案（XTP6 無料 → XTP3 強化版へのアップセル・全ツールを一目で比べられる棚）を受けて作成。見た目は ver2.1 の Amazon 風を維持（ゆうさん決定）
- 追加: ステップアップ帯（STEP 1 XTP6 無料版 ¥0 → STEP 2 XTP3 買い切り ¥9,800〜・「XTP6 ベース月払いの約 3 か月分」・Windows PC 必要の注記）、SNS 別の棚 4 つ（X／Threads・Bluesky・Yay!／Facebook・Instagram／アメブロ・note）、棚の空き枠に「店主のひとこと」、スマホの下部固定バー
- 製品: XTP3・XTP6・XTP4・TTP2 に BskyToolsPro2・YayToolsPro・FacebookToolsPro・AmebloToolsPro・noteToolsPro（各 ¥3,000 買い切り・10/24 決定）を足して 9 つ＋InstagramToolsPro（準備中・購入ボタンなし）
- 直したデータ: XTP6 を「10 アカウント・月¥1,000」→ 27_XTP6 limits.ts の値（無料 1 垢・1 日 10 件／ベース 20 垢・月¥3,000・年払い月¥1,000／プレミアム 100 垢）
- 新ツールのリンク先（fb-like/・ameblo-like/・note-bot/・yay/・bluesky/）はまだ無い（LP はこのあと作る）
- 確認: 1280px／390px でコンソールエラー 0・横はみ出し 0・href="#" 0・カード 10・棚 4。スクショは ClaudeCompany outputs/99_ops/market-v3-mock/

### ver2.1 (2026-10-24) — 見た目を 5 月の Amazon 風デザインに戻し、中身だけ実物に
- ゆうさん「デザインは圧倒的に旧（Amazon 風）が好み」→ ver2.0 の静的レイアウトを取り下げ、`components-amazon.jsx` を復元して書き換え
- 残したもの: 黒い 2 段ナビ・検索・ヒーローバナー・4 枚タイル・左フィルタ＋商品カード・比較表・3 ステップ・FAQ・暗いフッターの構成と配色（walnut／persimmon／cream）
- 変えたもの: 製品は実在の 4 つ（XTP3／XTP6／XTP4／TTP2）と実価格・実リンクのみ。架空のレビュー数・星・在庫・参考価格・タイムセール・カート・オールインワン月額・お届け先・ログイン・注文履歴・ダミーのフッター列を撤去。検索はページ内のツールへスクロール、フィルタ（対応 SNS／料金の形／使う場所）は実際に絞り込む。「どれを選べばいい？」タイルと「無料で試す ¥0」タイルを追加。FAQ は実情に合わせた 6 問
- React は本番ビルド（production.min）に。Tweaks パネル削除。noscript のフォールバック一覧と JSON-LD（WebSite＋ItemList）
- 画像: XTP6・TTP2 の製品サムネとタイルアイコン 3 枚・FAQ「スマホで使える？」の線画を gpt-image-2 で追加（`scripts/gen_thumbs.py` に定義）。thumbs は全部 640px WebP に（19.9MB → 0.24MB）。使わない sale/ は削除
- canonical／og:url は引き続き `https://sns-tools-market.vercel.app/`

### ver2.0 (2026-10-24) — モックから実物のハブへ
- 2026-05 のデザインモック（React 開発ビルド＋Babel・`components-amazon.jsx`・`tweaks-panel.jsx`・架空の製品 7 点／価格／レビュー 1,842 件／タイムセール／カート／全部入り月額）を撤去し、静的 HTML 1 枚に
- サイト名を「Youパパツールマーケット」に（登録 GAS・メール署名と同じ）。載せるのは今買える／使える製品だけ: XToolsPro3（/xtp3/・買い切り ¥9,800〜）、XToolsPro6（xtp6.youpapatools.com・無料〜月 ¥1,000）、XToolsPro4（/xtp4/・無料〜月 ¥1,000）、ThreadsToolsPro2（docs＋theapps 購入登録・月 ¥1,000）。比較表 /xtp-compare/ への導線、購入後の流れ 3 ステップ、フッターに特商法・お問い合わせ・手順書・note・RAIJIN
- 「X自動投稿ツール」の名乗りは置かず、「API 不要」は料金の後ろに添える（第一想起の方針）
- JSON-LD（WebSite＋ItemList/SoftwareApplication）。GA `G-ZKGY7RFRGX` は維持。`href="#"` 0 件
- `Market-notion.html`・`components.jsx`（.vercelignore 済みだった）も削除
- canonical／og:url は当面 `https://sns-tools-market.vercel.app/`（独自ドメイン `market.youpapatools.com` が付いたら差し替え）

## xtp3/amazon/index.html

### ver1.1 (2026-10-24) — canonical を本番 URL に
- `https://mitama987.github.io/youpapa-school/xtp3/amazon/` → `https://sns-tools-market.vercel.app/xtp3/amazon/`

## xtp3/index.html

### ver1.9 (2026-10-17) — 決済を Stripe 直販に（main `2c6a9f1`）
- 決済リンク 9 箇所（ベース・フル・アドオン 5・最下部 CTA）を theapps の `page.theapps.jp/charge/join/<code>` から Stripe Payment Links（`buy.stripe.com/…`・lookup_key=sku）に差し替え
- `spf.js` と `apps-af`（Apps アフィリ計測）を撤去。`?ref=<ID>` を localStorage に保存し、`buy.stripe.com` のリンクに `client_reference_id` として付ける計測スクリプトを追加（半角英数と `-` `_` のみ）
- 無料メール登録（theapps `advance/join/F8hv…`）→ 無料版の Google フォーム。フッターに特定商取引法のリンク（docs サイト `tokushoho.html`）

### ver1.4 (2026-08-02) — アドオン5種の単品購入リンク追加（Apps公開検証対応・最終解）
Chrome実機での再現・APIバイセクトにより、公開時検証の仕様を特定:
**「アフィリエイトリンクを設置するランディングページ」内に、キャンペーンで選択した成果発生用プラン
“全て”の決済リンク（page.theapps.jp/charge/join/<code>）が必要**。
（LP掲載済みの2プランだけに絞ったAPIテストで result:0000 を確認 → 仕様確定）

- **addonsセクション**: item-grid直下に既存の未使用スタイル `.addon-cta-list` を使った購入リンクリストを追加:
  - AI生成パック ¥4,000 → charge/join/F8hv3G40M25k43j5
  - エンゲージメントパック ¥4,000 → charge/join/G8hv3G40M25k43j6
  - マルチアカウントパック ¥5,000 → charge/join/U8hv3G40M25k43n1
  - コミュニティパック ¥4,000 → charge/join/U8hv3G40M25k43i2
  - Amazonパック ¥6,000 → charge/join/D8hv3G40M25k43r0
  - 全リンク `apps-af` クラス付き
- 旧XToolsPro3（29,800円・U8hv3G40M25l11n2）はLPの価格体系（¥2,980/¥19,800）に存在しないため
  リンク追加せず、キャンペーンの成果発生用プランから除外する方針（7プラン構成）

### ver1.3 (2026-08-02) — 登録ページトラッキング型キャンペーン対応（登録フォームURLリンク追加）
キャンペーン「XToolsPro3（マルチトラッキング）」（登録ページトラッキング型・af_873584）の公開時検証
「紹介リンクのランディングページ:ランディングページ内にAppsの決済リンクが見つかりませんでした」への対応。
この型の検証は決済リンク（charge/join）ではなく**情報登録用プランの登録フォームURL**を探していると特定。

- **FINAL CTA**: `final-note`（¥0で始める→の直後）に1行追加:
  `<a class="apps-af" href="https://page.theapps.jp/advance/join/F8hv3G40M25l35v5">無料メール登録（Youパパツールマーケット）はこちら →</a>`
- 既存の決済CTA・note.comリンクは変更なし

### ver1.2 (2026-08-02) — Appsアフィリエイト計測タグ導入
アフィリエイト広告導入Appのキャンペーン登録・トラッキング計測のため、Apps公式マニュアルの埋め込みコードを設置。

- **head (L45-47)**: `</head>` 直前に `<!-- Apps Affiliate Tracking -->` ＋ `<script src="https://admin.theapps.jp/htdocs/js/spf.js"></script>` を追加
- **決済リンク5箇所** (L76, L230, L244, L447, L448): `page.theapps.jp/charge/join/` へのaタグのclass先頭に `apps-af` を追加（既存class維持）
  - hero「¥2,980から始める」/ pricing「このプランを購入」「フル装備で買う」/ final-cta「¥2,980から始める」「フル装備で買う ¥19,800」
- note.com・forms.gle等の非決済リンクには付与しない
- 既存パターン踏襲: `31_xtools-docs-auth/public/upgrade_lp_v2.html`、`30_XTP2_POST_r5/templates/lp/upgrade_premium.html`

### ver1.1 (2026-07-30) — FVコピー④案差し替え
外部フィードバック「LP全体は現行（③）が良い。FVタイトル文は④が1番刺さる」を反映。

- **hero (L70-72)**
  - eyebrow: `上場企業のAI自動化担当が開発` → `プログラミング知識不要！`
  - h1: `X自動投稿を、企業品質で。` → `完全放置で反応率アップ！初学者でもラクに運用できる最強のX自動化ツール`（`完全放置で反応率アップ！`にアクセント色、`h1-long`クラス追加）
  - lede: `API不要。全プラン買い切り。無料版あり。…` → `のべ100人以上のリアルな声を踏まえ、本当に必要な機能だけを開発。シンプルなデザインで、悩まずに直感操作が可能。情報発信やアフィリエイトなど、Xを使用している全ての方にオススメ！`
- **head メタ整合**
  - `<title>` / `meta description` / `og:title` / `og:description` を新FV文言に更新
  - `canonical` / `og:url` / `og:image` を `https://mitama987.github.io/youpapa-school/xtp3/` → `https://sns-tools-market.vercel.app/xtp3/` に修正（旧GitHub Pages残骸の解消）
- JSON-LD・CTA・hero-metaは変更なし

## xtp3/assets/css/style.css

### ver1.1 (2026-07-30) — 長文h1用クラス追加
- `.hero-copy h1.h1-long { font-size: clamp(26px, 3.4vw, 38px); line-height: 1.45; }` を追加（デスクトップ。46pxでは1行目が途中改行したため38pxに調整）
- SPメディアクエリ（max-width:640px）に `.hero-copy h1.h1-long { font-size: clamp(24px, 6.5vw, 30px); }` を追加
- 既存 `.hero-copy h1` ルールは xtp3/amazon/ サブLPと共有のため変更せず、クラス限定で上書き

## xtp-compare/index.html

### ver1.0 (2026-10-19) — 新規: XTP3・XTP4・XTP6 機能比較ページ
- スマホ幅（360〜430px）でズームせずに読める縦長の比較表。ジャンル分け（基本／投稿／AI・分析／安全・交流／その他）・○は中央・補足は下
- 下に「XTP6 を無料で始める」ボタン（短縮リンク x6-cmp-lp → XTP6 LP・utm_source=youpapatools&utm_medium=compare）
- LINE（XTP3 オプチャ／XTP4 グループ／XTP6 オプチャ）の告知から短縮リンク x6-cmp-x3／x4／oc で流入。元は ClaudeCompany `.company/marketing/content-plan/xtp-compare-page.html`

### ver1.1 (2026-10-20) — 見出しを固定
- 下にスクロールしても見出し（機能・XTP3・XTP4・XTP6）が画面の上に残るように（`position:sticky`）。sticky を効かせるため表の `overflow:hidden` をやめ、角丸は四隅のマスに付けた

## 2026-10-31 独自ドメイン market.youpapatools.com
- sns-tools-market.vercel.app → https://market.youpapatools.com に差し替え（Vercel に domain 追加・Value Domain に A market 76.76.21.21）。旧 URL も Vercel で開ける

## 2026-10-31 トップ v3 本番化＋簡易 LP 5 枚
- トップ ver3.0: mock-v3 を components-amazon.jsx に（ツール一覧の早見表 10 マス・SNS 別の棚・XTP6→XTP3 は棚の下・XTP 系サムネは淡色）。index.html の title／description／JSON-LD（9 製品）／noscript を更新。mock-v3/ は削除
- 簡易 LP 5 枚（fb-like/ ameblo-like/ note-bot/ yay/ bluesky/）を scripts/build_tool_lps.py で生成。共通 assets/css/lp.css・assets/js/ref.js（?ref= を /api/buy に引き継ぐ）。購入ボタンは /api/buy/<sku>（¥3,000 買い切り）。#howto は購入メールの手順と同じ文
- thumbs/ameblo.webp を gpt-image-2 で追加（gen_thumbs.py に ameblo）
- 確認: ローカルで 6 ページ × 1280／390 のエラー 0・はみ出し 0・href="#" 0・画像切れ 0・購入ボタンに ref が付く

## 2026-11-01 トップ v3.1（協業相手のフィードバック 6 点）＋XTP ページに戻る帯
- モック mock-v4（ブランチ feature/market-v31-mock）で before/after を見せて、ゆうさんの OK をもらってから本番化。mock-v4/ は削除
- components-amazon.jsx ver3.1
  - ツール一覧: SNS 名を削除・名前 14px／価格 15px（名前は ToolsPro の前で折り返す）
  - 値札: 札（無料から・買い切り・月額）13px。補足（使う場所・料金の注記・無料版・箇条書き）は名前の横の (i) に移し、押すとカードの上に重ねて表示（× と Esc で閉じる）
  - 棚: 説明は札の (i) へ。パンくず・値札の色の凡例を削除。名前 18px・ボタン 15px／高さ 44px。ロゴ（ヘッダー・フッター）を大きく
  - 「X は、無料で試してから強化版へ」カード（StepUp）を削除。比較表の上に選び方の 2 行（スマホで無料・ライトに XTP6 → PC でがっつり複数アカウント XTP3／公式 API は XTP4）
  - 比較表: ○△×（同じ記号は同じ色）＋記号の下に小さく補足。項目名は ○＝良い向きに（PC つけっぱなし不要・X の API キー不要・無料で試せる・複数アカウント）。縦横の罫線・ヘッダーと左端列に薄い色・左端は右揃え・スマホでも 3 列が 1 画面（スマホのボタンは「始める」「詳しく」）
  - 購入後の流れ: 本文 1 行ずつ＋01▶02▶03（スマホは ▼）
  - FAQ: 最初は全部閉じる・1 列・1 問ずつ枠・開くと ⌄ が回転
  - XTP6・TTP2 のリンクも同じタブで開く（新しいタブだと「戻る」が効かない）
- xtp3/index.html ver2.2・xtp4（index.html／app.jsx）ver1.2・xtp-compare/index.html ver1.2: 先頭にマーケットへ戻る帯（Youパパツールマーケット／← ツール一覧）。XTP4 はヘッダーが fixed なのでヘッダーの中に置いた

## 2026-11-01 トップ v3.2・戻る帯をロゴに
- components-amazon.jsx ver3.2: ツール一覧のマスの行き先を棚のカード（#p-…）→ 各ツールの製品ページ（p.href）に。準備中の Instagram だけ棚のカードへ。ヒーローの「ツール一覧を見る」ボタンを削除
- xtp3 ver2.3・xtp4 ver1.3・xtp-compare ver1.3: 戻る帯をマーケットのヘッダー左上と同じロゴ（M.＋Youパパツールマーケット＋SNS TOOLS · 9 ITEMS）にして左上へ。「← ツール一覧」は外した
- components-amazon.jsx ver3.3: 比較表の ○△× を SVG（線の太さ 3）で描いてそろえた（文字の ○△ が × より細く見えた）

## 2026-11-01 TTP2 の手順書を /ttp2/ へ
- 40_ThreadsToolsPro2 の public/docs（index.html・styles.css・script.js・screenshots）を ttp2/ にコピー。読み込みパスを相対に・canonical 追加・左上にマーケットのロゴ帯（fixed 48px・サイドバー／メニューボタン／本文／アンカー位置を 48px 下げ・script.js の headerOffset 32→80）。正本は今後こちら
- 旧 https://threadtoolspro2.vercel.app/docs は TTP2 側の next.config で /ttp2/ へ転送（一時・307）
- components-amazon.jsx ver3.4・index.html: TTP2 のリンク（棚・一覧・フッター・JSON-LD・noscript）を /ttp2/ に
- 2026-11-01: ロゴ帯を右寄せに（xtp3 ver2.4・xtp4 ver1.4・xtp-compare ver1.4・ttp2 ver1.17）

## 2026-11-01 共通フッター（assets/js/market-footer.js）
- トップのフッター（4 列のリンク＋ロゴ＋一言＋©）を共通部品に。トップ（components ver3.5・React が window.MarketFooter.html() を描く）・xtp3 ver2.5・xtp4 ver1.5・xtp-compare ver1.5・ttp2 ver1.18・単機能 LP 5 枚（build_tool_lps.py ver1.1 で再生成）が読み込む
- xtp3 の元フッターからかぶるリンク（お問い合わせ・手順書・特商法）を削除。xtp4 のフッターの中身の無いリンク（href="#" 4 つ）を削除。単機能 LP の元フッターは共通フッターに置き換え
- TTP2 のカード・一覧・JSON-LD・noscript・フッターは LP（threadtoolspro2.vercel.app/）へ（手順書は /ttp2/）
- xtp4: マーケットの帯はスクロールした分だけ上に隠れる（XTP3 と同じ見え方）
- 2026-11-01: xtp3 ver2.6・xtp4 ver1.6: 自前のフッターを消してマーケット共通フッターだけに（2 重フッターをやめた）
- 2026-11-01 components ver3.6: XTP6・XTP4・TTP2 のカードを「無料で始める」と「有料版を購入する」に分けた（XTP6＝/login と /plan/checkout?period=month・XTP4＝sign-up と theapps・TTP2＝登録フォームと Stripe）
- 2026-11-01 components ver3.7・market-footer ver1.1: TTP2 の LP を新住所 https://ttp2.youpapatools.com/ に（LP だけ・アプリとログインは threadtoolspro2.vercel.app のまま。旧住所の未ログインのトップは新住所へ 307）
- 2026-11-01 components ver3.8: XTP3 も「無料で始める」（登録フォーム forms.gle/hyrb2QmFnnoU96VR6）と「有料版を購入する」（/xtp3/）に。TTP2 の有料は Stripe 直行 → LP（ttp2.youpapatools.com）へ
