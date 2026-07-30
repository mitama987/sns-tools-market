# VERSION_HISTORY_ARCHIVE — sns-tools-market

## xtp3/index.html

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
