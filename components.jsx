// Market — SNS自動化ツールECサイト
// Notion風ミニマル. Hairline borders, lots of whitespace, accent color used sparingly.

const PRODUCTS = [
  {
    id: 'xtp3',
    name: 'XToolsPro3',
    emoji: '🐦',
    platform: 'X (Twitter)',
    sub: '基本機能をひと通り。すでに使い込まれた定番版。',
    features: ['予約投稿', '自動いいね', '自動フォロー', 'リスト管理'],
    buyOnce: 9800,
    monthly: 980,
    tag: null,
  },
  {
    id: 'xtp4',
    name: 'XToolsPro4',
    emoji: '🐦',
    platform: 'X (Twitter)',
    sub: 'Pro3の後継版。AI下書き＋同時運用に対応。',
    features: ['AI下書き生成', '複数アカウント同時運用', '予約投稿 / 自動いいね', 'インプレッション分析'],
    buyOnce: 14800,
    monthly: 1480,
    tag: 'New',
  },
  {
    id: 'ig',
    name: 'InstagramToolsPro',
    emoji: '📷',
    platform: 'Instagram',
    sub: '投稿からDMまで、Instagram運用の全工程を自動化。',
    features: ['定期投稿 / ランダム投稿', '自動いいね・フォロー', '自動コメント・DM', 'ハッシュタグ提案'],
    buyOnce: 12800,
    monthly: 1280,
    tag: null,
  },
  {
    id: 'fb',
    name: 'FacebookToolsPro',
    emoji: '📘',
    platform: 'Facebook',
    sub: 'いいねとフォローを淡々と。シンプル設計。',
    features: ['自動いいね', '自動フォロー', 'グループ投稿', '稼働ログ'],
    buyOnce: 7800,
    monthly: 780,
    tag: null,
  },
  {
    id: 'note',
    name: 'noteToolsPro',
    emoji: '📝',
    platform: 'note',
    sub: '記事の予約公開とフォロワー獲得を支援。',
    features: ['予約公開', '自動スキ', 'フォロー / フォロー解除', 'マガジン整理'],
    buyOnce: 9800,
    monthly: 980,
    tag: null,
  },
  {
    id: 'bsky',
    name: 'BlueskyToolsPro',
    emoji: '🦋',
    platform: 'Bluesky',
    sub: '自動投稿に特化。AT Protocol対応。',
    features: ['自動投稿', '予約投稿', 'カスタムフィード対応', 'PDS切替'],
    buyOnce: 6800,
    monthly: 680,
    tag: 'Beta',
  },
  {
    id: 'yay',
    name: 'yayToolsPro',
    emoji: '🎉',
    platform: 'yay',
    sub: 'yayのコミュニティ運用を自動化。',
    features: ['自動投稿', 'サークル参加', 'フォロー / いいね', '通知整理'],
    buyOnce: 8800,
    monthly: 880,
    tag: null,
  },
];

const FAQS = [
  {
    q: '買切りと月額、どちらがお得ですか？',
    a: '長く使う想定なら買切り、まずは試したい場合や全ツールを使いたい場合は月額がおすすめです。買切りは1ツールあたり10〜18ヶ月の月額料金に相当します。',
  },
  {
    q: 'オールインワン月額から個別購入に切り替えできますか？',
    a: 'はい、いつでも切り替え可能です。次回更新日からプランが切り替わり、未使用期間分の差額は返金されます。設定はマイページの「プラン管理」から行えます。',
  },
  {
    q: 'アカウントBANのリスクはありませんか？',
    a: '各SNSの利用規約に抵触しない範囲で動作するよう、頻度・間隔をデフォルトで安全側に調整しています。とはいえ100%のリスク回避は保証できないため、ご自身でも適切な利用範囲をご検討ください。',
  },
  {
    q: '支払い方法は？',
    a: 'クレジットカード（Visa / Mastercard / JCB / AMEX）、銀行振込、PayPalに対応しています。月額プランは自動更新です。',
  },
  {
    q: '解約はいつでもできますか？',
    a: 'いつでも解約できます。マイページから1クリックで解約手続きが完了し、次回更新日まではそのままご利用いただけます。',
  },
  {
    q: '返金ポリシーは？',
    a: 'ご購入から14日以内かつ累計稼働時間が1時間未満の場合、全額返金いたします。買切り版にも適用されます。詳細は特定商取引法に基づく表記をご確認ください。',
  },
];

// ─── Section primitives ─────────────────────────────────────────────────────

const fmt = (n) => '¥' + n.toLocaleString('ja-JP');

function SectionLabel({ children }) {
  return (
    <div className="text-[11px] font-medium tracking-[0.14em] uppercase mkt-fg-3 mb-3">
      {children}
    </div>
  );
}

// ─── Header ─────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="sticky top-0 z-30 mkt-bg-app/85 backdrop-blur-md mkt-border-b">
      <div className="mx-auto max-w-[1120px] px-8 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold text-[15px] mkt-fg-1 tracking-tight">
          <span className="inline-block w-4 h-4 rounded-[3px] mkt-bg-1" />
          Market
        </a>
        <nav className="hidden md:flex items-center gap-7 text-[13.5px] mkt-fg-2">
          <a href="#products" className="hover:mkt-fg-1 transition-colors">商品</a>
          <a href="#pricing"  className="hover:mkt-fg-1 transition-colors">料金</a>
          <a href="#faq"      className="hover:mkt-fg-1 transition-colors">よくある質問</a>
          <a href="#docs"     className="hover:mkt-fg-1 transition-colors">ドキュメント</a>
        </nav>
        <div className="flex items-center gap-1">
          <button className="px-3 h-8 text-[13.5px] mkt-fg-2 rounded-md hover:mkt-bg-hover transition-colors">
            ログイン
          </button>
          <button className="px-3 h-8 text-[13.5px] font-medium mkt-fg-1 rounded-md mkt-border mkt-bg-surface hover:mkt-bg-sunken transition-colors">
            無料登録
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero({ deco }) {
  return (
    <section className="relative">
      {deco === 'icon' && (
        <div aria-hidden="true" className="absolute inset-0 flex items-start justify-center pt-[120px] pointer-events-none">
          <svg width="280" height="280" viewBox="0 0 280 280" className="opacity-[0.045]">
            <circle cx="140" cy="140" r="120" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="140" cy="140" r="80"  fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="140" cy="140" r="40"  fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="140" x2="260" y2="140" stroke="currentColor" strokeWidth="1" />
            <line x1="140" y1="20" x2="140" y2="260" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      )}
      {deco === 'grid' && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
             style={{
               backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
               backgroundSize: '32px 32px',
               opacity: 0.035,
               maskImage: 'radial-gradient(ellipse at 50% 30%, black 0%, transparent 70%)',
               WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 0%, transparent 70%)',
             }} />
      )}
      <div className="relative mx-auto max-w-[1120px] px-8 pt-[112px] pb-[120px] text-center">
        <div className="inline-flex items-center gap-2 px-3 h-7 mkt-border rounded-full mkt-bg-surface text-[11.5px] mkt-fg-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full mkt-bg-accent" />
          7つのSNSに対応 · 月額¥1,980で使い放題
        </div>
        <h1 className="text-[52px] leading-[1.15] font-semibold tracking-[-0.025em] mkt-fg-1 mb-6">
          SNS運用を、もっと静かに自動化。
        </h1>
        <p className="text-[17px] leading-[1.7] mkt-fg-2 max-w-[560px] mx-auto mb-10">
          X、Instagram、Facebook、note、Bluesky、yay。
          <br />
          7つのSNS自動化ツールを、買切りでも月額でも。
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <a href="#all-in-one" className="inline-flex items-center gap-2 h-11 px-5 rounded-md mkt-bg-accent mkt-fg-on-accent text-[14px] font-medium mkt-accent-hover transition-colors">
            全部入り 月額¥1,980 で始める
            <span aria-hidden="true">→</span>
          </a>
          <a href="#products" className="inline-flex items-center h-11 px-5 rounded-md mkt-border mkt-bg-surface text-[14px] font-medium mkt-fg-1 hover:mkt-bg-sunken transition-colors">
            商品ラインナップを見る
          </a>
        </div>
        <div className="mt-12 flex items-center justify-center gap-6 text-[12px] mkt-fg-3">
          <span>✓ クレカ登録不要で試せる</span>
          <span className="mkt-fg-4">·</span>
          <span>✓ いつでも解約可能</span>
          <span className="mkt-fg-4">·</span>
          <span>✓ 14日返金保証</span>
        </div>
      </div>
    </section>
  );
}

// ─── Product Grid ───────────────────────────────────────────────────────────

function ProductPreview({ p }) {
  // Tiny mock "screenshot" tile per platform — abstract UI shapes, not real images.
  // Uses muted brand-tinted background + neutral foreground so it stays Notion-quiet.
  const tint = {
    'xtp3': { bg: '#F4F5F6', fg: '#37352F' },
    'xtp4': { bg: '#F4F5F6', fg: '#37352F' },
    'ig':   { bg: '#FBF1F1', fg: '#B5567A' },
    'fb':   { bg: '#EEF2F8', fg: '#3D5A8A' },
    'note': { bg: '#EEF6F2', fg: '#2D8062' },
    'bsky': { bg: '#EFF4FB', fg: '#3E78C2' },
    'yay':  { bg: '#FBF5EC', fg: '#C68A3E' },
  }[p.id] || { bg: '#F4F5F6', fg: '#37352F' };

  return (
    <div
      className="relative mb-5 overflow-hidden rounded-md mkt-border"
      style={{ background: tint.bg, aspectRatio: '16 / 9' }}>
      {/* Tiny window chrome */}
      <div className="absolute top-0 left-0 right-0 h-5 flex items-center gap-1 px-2 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.18)' }} />
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.08)' }} />
        <span className="ml-2 text-[8px] font-mono" style={{ color: 'rgba(0,0,0,0.35)' }}>{p.platform}</span>
      </div>

      {/* Glyph + faux UI rows */}
      <div className="absolute inset-0 pt-5 p-3 flex gap-3">
        <div
          className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 text-[16px]"
          style={{ background: 'rgba(255,255,255,0.7)', color: tint.fg }}
          aria-hidden="true">
          {p.emoji}
        </div>
        <div className="flex-1 flex flex-col gap-1.5 pt-0.5">
          <div className="h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.10)', width: '70%' }} />
          <div className="h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.06)', width: '90%' }} />
          <div className="h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.06)', width: '55%' }} />
          <div className="mt-1 flex gap-1">
            <span className="h-3 px-1.5 rounded text-[7px] flex items-center" style={{ background: tint.fg, color: '#fff' }}>稼働中</span>
            <span className="h-3 px-1.5 rounded text-[7px] flex items-center font-mono tabular-nums" style={{ background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.55)' }}>24h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ p, style }) {
  const showNumber = style === 'numbered';
  const bigEmoji = style === 'big-emoji';
  return (
    <article className="group relative flex flex-col mkt-border rounded-lg mkt-bg-surface p-6 hover:mkt-bg-sunken transition-colors">
      {p.tag && (
        <span className="absolute top-5 right-5 z-10 text-[10px] font-medium tracking-[0.08em] uppercase mkt-accent-soft px-1.5 py-0.5 rounded">
          {p.tag}
        </span>
      )}

      <ProductPreview p={p} />

      <header className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          {showNumber ? (
            <span className="text-[11px] font-mono mkt-fg-3 tabular-nums">{String(p.idx).padStart(2, '0')}</span>
          ) : (
            <span className={bigEmoji ? "text-[22px] leading-none" : "text-[15px] leading-none"} aria-hidden="true">{p.emoji}</span>
          )}
          <h3 className="text-[15px] font-semibold mkt-fg-1 tracking-tight">{p.name}</h3>
        </div>
        <p className="text-[13px] mkt-fg-2 leading-[1.55]">{p.sub}</p>
      </header>

      <ul className="space-y-1.5 mb-5 mt-1">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] mkt-fg-2">
            <svg width="14" height="14" viewBox="0 0 14 14" className="mt-[3px] flex-shrink-0 mkt-fg-3" aria-hidden="true">
              <path d="M3 7.2 5.8 10 11 4.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 mkt-border-t">
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="inline-flex items-baseline gap-1 px-2 py-1 rounded mkt-bg-sunken text-[11.5px]">
            <span className="mkt-fg-3">買切り</span>
            <span className="mkt-fg-1 font-medium tabular-nums">{fmt(p.buyOnce)}</span>
          </span>
          <span className="inline-flex items-baseline gap-1 px-2 py-1 rounded mkt-bg-sunken text-[11.5px]">
            <span className="mkt-fg-3">月額</span>
            <span className="mkt-fg-1 font-medium tabular-nums">{fmt(p.monthly)}</span>
            <span className="mkt-fg-3">/月</span>
          </span>
        </div>
        <a
          href={p.id === 'xtp4' ? 'xtp4/' : '#'}
          className="inline-flex items-center gap-1 text-[13px] mkt-fg-accent font-medium"
        >
          詳細を見る
          <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

function ProductGrid({ cardStyle }) {
  return (
    <section id="products" className="mkt-border-t">
      <div className="mx-auto max-w-[1120px] px-8 py-[112px]">
        <div className="max-w-[640px] mb-14">
          <SectionLabel>Products</SectionLabel>
          <h2 className="text-[32px] font-semibold tracking-[-0.02em] mkt-fg-1 leading-[1.25] mb-3">
            7つのSNSに、それぞれの自動化を。
          </h2>
          <p className="text-[15px] mkt-fg-2 leading-[1.7]">
            各ツールは独立して動作し、買切りでも月額でも導入できます。
            すべて使うならオールインワン月額のほうがお得です。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} p={{ ...p, idx: i + 1 }} style={cardStyle} />
          ))}
          {/* Empty 8th cell: filled with a soft "request" tile to fill the 3x3 grid */}
          <div className="hidden lg:flex flex-col items-start justify-center mkt-border border-dashed rounded-lg p-6 mkt-fg-3 text-[13px] leading-[1.6]">
            <div className="text-[14px] mkt-fg-2 font-medium mb-1">対応SNSを募集中</div>
            <div>使いたいSNSがあれば、お問い合わせから教えてください。次の開発候補に加えます。</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── All-in-One CTA ─────────────────────────────────────────────────────────

function AllInOne() {
  return (
    <section id="all-in-one" className="mkt-bg-sunken mkt-border-y">
      <div className="mx-auto max-w-[1120px] px-8 py-[112px]">
        <div className="rounded-xl mkt-bg-surface mkt-border-strong p-10 md:p-14">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-14 items-start">
            <div>
              <SectionLabel>All-in-one Monthly</SectionLabel>
              <h2 className="text-[34px] md:text-[40px] font-semibold tracking-[-0.025em] leading-[1.2] mkt-fg-1 mb-4">
                全7ツール、まとめて使い放題。
              </h2>
              <p className="text-[15px] mkt-fg-2 leading-[1.75] mb-8 max-w-[440px]">
                個別に契約すると月額¥7,060。
                オールインワン月額なら、その<span className="mkt-fg-1 font-medium">3.5分の1以下</span>で全ツールが使えます。
                プランの変更・解約はいつでも可能です。
              </p>
              <div className="flex items-end gap-3 mb-8">
                <span className="text-[64px] font-semibold tracking-[-0.04em] mkt-fg-1 leading-none tabular-nums">
                  ¥1,980
                </span>
                <span className="mkt-fg-2 text-[14px] pb-2">/ 月（税込）</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a href="#" className="inline-flex items-center gap-2 h-11 px-6 rounded-md mkt-bg-accent mkt-fg-on-accent text-[14px] font-medium mkt-accent-hover transition-colors">
                  今すぐ始める
                  <span aria-hidden="true">→</span>
                </a>
                <span className="text-[12.5px] mkt-fg-3">クレジットカード不要 · 7日間無料トライアル</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-medium tracking-[0.14em] uppercase mkt-fg-3 mb-4">
                含まれるツール
              </div>
              <ul className="space-y-2.5">
                {PRODUCTS.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 text-[13.5px]">
                    <svg width="14" height="14" viewBox="0 0 14 14" className="mkt-fg-accent flex-shrink-0" aria-hidden="true">
                      <path d="M3 7.2 5.8 10 11 4.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="mkt-fg-1 font-medium">{p.name}</span>
                    <span className="mkt-fg-3 text-[12px]">{p.platform}</span>
                    <span className="ml-auto mkt-fg-4 text-[11.5px] tabular-nums line-through">
                      {fmt(p.monthly)}/月
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 mkt-border-t flex items-baseline justify-between">
                <span className="text-[12.5px] mkt-fg-3">個別契約の合計</span>
                <span className="text-[14px] mkt-fg-2 tabular-nums">
                  ¥{PRODUCTS.reduce((s, p) => s + p.monthly, 0).toLocaleString('ja-JP')} / 月
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Table ──────────────────────────────────────────────────────────

function PricingTable() {
  const rows = [
    { plan: '買切り（個別）', detail: '1ツールを永続利用', price: '¥6,800 〜', sub: '一度きり', highlight: false },
    { plan: '月額（個別）',   detail: '1ツールを月額契約', price: '¥680 〜',   sub: '/ 月',     highlight: false },
    { plan: 'オールインワン月額', detail: '全7ツールを使い放題', price: '¥1,980', sub: '/ 月', highlight: true },
  ];
  return (
    <section id="pricing">
      <div className="mx-auto max-w-[1120px] px-8 py-[112px]">
        <div className="max-w-[640px] mb-14">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="text-[32px] font-semibold tracking-[-0.02em] mkt-fg-1 leading-[1.25] mb-3">
            シンプルな3つのプラン。
          </h2>
          <p className="text-[15px] mkt-fg-2 leading-[1.7]">
            必要なツールだけ買切りで揃えるも良し、全部入りの月額で使い倒すも良し。
          </p>
        </div>

        <div className="mkt-border rounded-lg overflow-hidden mkt-bg-surface">
          <div className="grid grid-cols-[2fr_3fr_1.5fr] mkt-bg-sunken text-[11px] font-medium tracking-[0.14em] uppercase mkt-fg-3">
            <div className="px-6 py-3">プラン</div>
            <div className="px-6 py-3">内容</div>
            <div className="px-6 py-3 text-right">価格</div>
          </div>
          {rows.map((r, i) => (
            <div key={r.plan}
                 className={"grid grid-cols-[2fr_3fr_1.5fr] items-center mkt-border-t " +
                            (r.highlight ? "mkt-bg-sunken" : "")}>
              <div className="px-6 py-5">
                <div className={"text-[15px] " + (r.highlight ? "font-semibold mkt-fg-1" : "font-medium mkt-fg-1")}>
                  {r.plan}
                </div>
              </div>
              <div className="px-6 py-5 text-[13.5px] mkt-fg-2">
                {r.detail}
              </div>
              <div className="px-6 py-5 text-right">
                <span className={"tabular-nums " + (r.highlight ? "text-[20px] font-semibold mkt-fg-1" : "text-[15px] font-medium mkt-fg-1")}>
                  {r.price}
                </span>
                <span className="ml-1 text-[12px] mkt-fg-3">{r.sub}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] mkt-fg-3">
          表示価格はすべて税込です。買切り版にも12ヶ月間のアップデート保証が付きます。
        </p>
      </div>
    </section>
  );
}

// ─── Steps ──────────────────────────────────────────────────────────────────

function Steps() {
  const steps = [
    { n: '01', title: 'アカウント登録', body: 'メールアドレスだけで30秒。クレジットカード登録は不要です。' },
    { n: '02', title: '購入 or 月額契約', body: '使いたいツールを買切りで購入するか、全部入り月額を選びます。' },
    { n: '03', title: 'SNSと連携',     body: 'OAuth認証で各SNSを接続。最短1分で自動化が始まります。' },
  ];
  return (
    <section className="mkt-border-t">
      <div className="mx-auto max-w-[1120px] px-8 py-[112px]">
        <div className="max-w-[640px] mb-14">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="text-[32px] font-semibold tracking-[-0.02em] mkt-fg-1 leading-[1.25]">
            3ステップで自動化開始。
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {steps.map((s) => (
            <div key={s.n} className="p-8 mkt-border rounded-lg mkt-bg-surface">
              <div className="text-[11px] font-mono mkt-fg-3 mb-6 tracking-wide">{s.n}</div>
              <h3 className="text-[16px] font-semibold mkt-fg-1 mb-2">{s.title}</h3>
              <p className="text-[13.5px] mkt-fg-2 leading-[1.7]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

function FAQItem({ item, open, onToggle }) {
  return (
    <div className="mkt-border-t">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 text-left py-5 hover:mkt-bg-hover transition-colors px-1 -mx-1 rounded">
        <span className="text-[15px] font-medium mkt-fg-1">{item.q}</span>
        <span
          aria-hidden="true"
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center mkt-fg-3 transition-transform"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-300"
        style={{ maxHeight: open ? 200 : 0, opacity: open ? 1 : 0 }}>
        <p className="pb-6 pr-12 text-[14px] mkt-fg-2 leading-[1.75]">{item.a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <section id="faq" className="mkt-bg-sunken mkt-border-t">
      <div className="mx-auto max-w-[1120px] px-8 py-[112px]">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12">
          <div>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-[32px] font-semibold tracking-[-0.02em] mkt-fg-1 leading-[1.25] mb-3">
              よくある質問。
            </h2>
            <p className="text-[14px] mkt-fg-2 leading-[1.7]">
              ここにない質問は
              <a href="#" className="mkt-fg-accent underline underline-offset-2 ml-1">お問い合わせ</a>
              からどうぞ。
            </p>
          </div>
          <div>
            {FAQS.map((item, i) => (
              <FAQItem
                key={item.q}
                item={item}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            ))}
            <div className="mkt-border-t" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function FooterIcon({ d }) {
  return (
    <a href="#" className="w-8 h-8 flex items-center justify-center rounded mkt-fg-3 hover:mkt-fg-1 hover:mkt-bg-hover transition-colors">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    </a>
  );
}

function Footer() {
  return (
    <footer className="mkt-border-t">
      <div className="mx-auto max-w-[1120px] px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 font-semibold text-[14px] mkt-fg-1">
              <span className="inline-block w-3.5 h-3.5 rounded-[3px] mkt-bg-1" />
              Market
            </a>
            <span className="mkt-fg-4 text-[12px]">© 2026 Market, Inc.</span>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] mkt-fg-3">
            <a href="#" className="hover:mkt-fg-1 transition-colors">特定商取引法に基づく表記</a>
            <a href="#" className="hover:mkt-fg-1 transition-colors">プライバシー</a>
            <a href="#" className="hover:mkt-fg-1 transition-colors">利用規約</a>
            <a href="#" className="hover:mkt-fg-1 transition-colors">お問い合わせ</a>
          </nav>
          <div className="flex items-center gap-1">
            <FooterIcon d="M18 6 6 18M6 6l12 12" />
            <FooterIcon d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
            <FooterIcon d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c0-.249 1.51-2.772 1.818-4.013z" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#2383E2",
  "heroDeco": "icon",
  "cardStyle": "default",
  "dark": false
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply accent + theme to :root so CSS variables drive everything
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--mkt-accent', t.accent);
    // Compute hover (10% darker) by mixing with black via color-mix
    root.style.setProperty('--mkt-accent-hover', `color-mix(in srgb, ${t.accent} 88%, #000)`);
    root.dataset.theme = t.dark ? 'dark' : 'light';
  }, [t.accent, t.dark]);

  return (
    <div className="mkt-app">
      <Header />
      <main>
        <Hero deco={t.heroDeco} />
        <ProductGrid cardStyle={t.cardStyle} />
        <AllInOne />
        <PricingTable />
        <Steps />
        <FAQ />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakColor
          label="アクセント色"
          value={t.accent}
          options={['#2383E2', '#37352F', '#A88560', '#0F7B6C', '#E03E3E']}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakToggle
          label="ダークモード"
          value={t.dark}
          onChange={(v) => setTweak('dark', v)}
        />
        <TweakSection label="Hero" />
        <TweakRadio
          label="装飾"
          value={t.heroDeco}
          options={[
            { value: 'none', label: 'なし' },
            { value: 'icon', label: '細線' },
            { value: 'grid', label: 'グリッド' },
          ]}
          onChange={(v) => setTweak('heroDeco', v)}
        />
        <TweakSection label="Product cards" />
        <TweakRadio
          label="スタイル"
          value={t.cardStyle}
          options={[
            { value: 'default',   label: '絵文字' },
            { value: 'numbered',  label: '番号' },
            { value: 'big-emoji', label: '大きめ' },
          ]}
          onChange={(v) => setTweak('cardStyle', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
