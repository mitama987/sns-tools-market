# マーケットトップの計測（A/B テスト）

ゆうさん 2026-11-01:「今のトップでクリック率・どこまで見たか・離脱を計測 → ダーク版と A/B テストしたい」。

## 方式
- **フェーズ 1（2026-11-01〜）**: 今の版（light）だけで計測。2 週間で基準値を取り、計測が正しく動くかを確かめる
- **フェーズ 2（未着手）**: トップの訪問者を cookie `mkt_v`（90 日）で 50:50 に振り分け、light／dark を同じ期間に比べる。抽選は index.html の head（今 `window.MKT_VARIANT='light'` を入れている所）。`<html data-variant>` で CSS を先に決め、読む jsx を components-amazon.jsx／本番用 components-dark.jsx で切り替える。`?v=dark` で強制表示
- 道具: GA4（測定 ID G-ZKGY7RFRGX）で数字を判断、Microsoft Clarity（ID 未設定）はヒートマップ・録画で目で確かめる用

## 送っているイベント（assets/js/market-track.js）
| イベント | いつ | パラメータ |
|---|---|---|
| cta_click（キーイベント） | 製品に向かうリンク（`data-cta` を持つ）を押した | product_id・cta_type・area・link_url・link_text |
| nav_click | それ以外のリンク（ヘッダー・ナビ・フッター・ページ内） | area・link_url・link_text |
| section_view | 各ブロックが 25% 見えた（1 回ずつ） | section（tools／shelf-x／shelf-text／shelf-meta／shelf-blog／compare／faq／footer） |
| scroll_depth | 25/50/75/90% | percent_scrolled |
| faq_open | FAQ を開いた | faq_id・faq_q |
| info_open | (i) を開いた | product_id（棚の (i) は shelf-*） |
| search | 検索した | search_term |

- 全イベントに `ui_variant`。page_view にも（head の `gtag('config', …, { ui_variant, user_properties })`）
- cta_type: `tile`（ツール一覧のマス）／`card_image`（棚カードの画像）／`free`（無料で始める）／`paid`（有料版を購入する）／`product_page`（製品ページを見る）／`compare`（比較表のボタン）。付け先は components-amazon.jsx と scripts/mock_dark/shelf_card.jsx の `data-pid`・`data-cta`（文言から推測しない＝ボタンの文言を変えても壊れない）
- 送るのは本番ホストのトップ `/` だけ（vercel.app・localhost・mock-dark は送らない）。`?track=1` でテスト用に強制。`?notrack=1` でその端末を除外（`?notrack=0` で戻す・GA を丸ごと無効化）。`?_dbg=1` で DebugView

## GA4 管理画面の設定（人の作業・未完了のものは秘書の TODO）
- [ ] プロパティのアクセス管理に SA `ga-mcp@gws-cli-mitama.iam.gserviceaccount.com`（閲覧者）＝ analytics-mcp でレポートを取るため
- [ ] データ保持を 14 か月（既定 2 か月だと探索で比べられない）
- [ ] 拡張計測の「スクロール数」をオフ（自前の scroll_depth と重なるため）
- [ ] カスタムディメンション（イベント）: ui_variant・cta_type・product_id・area・section・percent_scrolled・faq_id／（ユーザー）ui_variant。登録より前のデータは見えないので早めに
- [ ] cta_click をキーイベントに
- [ ] 内部トラフィック（自分の IP）を定義して「有効」に
- [ ] Clarity: プロジェクト作成 → ID を index.html に（`clarity('set','ui_variant', window.MKT_VARIANT)` も）。自分の IP を除外

## 基準値レポート（2 週間後・analytics-mcp）
- 主指標: セッションあたり製品 CTA クリック率（cta_click が 1 回以上あったセッションの割合）
- 副指標: free／paid のクリック率、scroll_depth 50% 到達率、平均エンゲージメント時間、section_view の到達率の並び、デバイス別・流入元別
- 直帰率は主指標にしない（cta_click をキーイベントにすると機械的に下がる）。購入は別ドメイン（Stripe・XTP6・TTP2）なので追わない
- 必要な期間の目安（1 日 30 セッション・50:50）: クリック率 30%→45% なら約 11 日、30%→36% なら約 64 日。基準値の実測で決め、7 日の倍数で止める

## プライバシー
- `privacy/`（GA4・Clarity の目的・送る情報・止め方）。共通フッター「開発者・表記」からリンク

---
Version History
- ver1.0 (2026-11-01): 新規（フェーズ 1 の計測仕様・管理画面の作業・基準値の見方）
