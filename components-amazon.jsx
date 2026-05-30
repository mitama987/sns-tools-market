// Market — warm boutique e-commerce style
// Same dense info-rich structure as a big-box marketplace, but with a
// walnut + persimmon + cream palette, custom logo mark, and editorial
// numeric/serif accents to step away from generic Amazon DNA.

const PRODUCTS = [
  {
    id: 'xtp3',
    name: 'XToolsPro3 — X(Twitter)自動運用ツール 永続ライセンス版',
    short: 'XToolsPro3',
    emoji: '🐦',
    platform: 'X (Twitter)',
    tint: { bg: '#F4F5F6', fg: '#37352F' },
    bullets: [
      '予約投稿・自動いいね・自動フォローを1本に集約',
      'リスト管理 / フィルタ条件で精密な運用が可能',
      '永続ライセンス（買切り版）',
      'Windows 10/11 対応 · macOS 12+ 対応',
    ],
    price: 9800,
    listPrice: 12800,
    monthly: 980,
    rating: 4.4,
    reviewCount: 1842,
    deal: null,
    badges: ['ベストセラー'],
    stock: '在庫あり',
    delivery: '即日ダウンロード可能',
  },
  {
    id: 'xtp4',
    name: 'XToolsPro4 — AI下書き対応 X(Twitter)複数アカウント運用',
    short: 'XToolsPro4',
    emoji: '🐦',
    platform: 'X (Twitter)',
    tint: { bg: '#F4F5F6', fg: '#37352F' },
    bullets: [
      'AI下書き生成（Claude / GPT 両対応）',
      '最大10アカウント同時運用',
      'インプレッション分析ダッシュボード',
      'Pro3からの優待アップグレード価格あり',
    ],
    price: 14800,
    listPrice: 19800,
    monthly: 1480,
    rating: 4.7,
    reviewCount: 524,
    deal: '新登場',
    badges: ['新登場', 'おすすめ'],
    stock: '在庫あり',
    delivery: '即日ダウンロード可能',
  },
  {
    id: 'ig',
    name: 'InstagramToolsPro — 定期投稿・自動DMまで対応',
    short: 'InstagramToolsPro',
    emoji: '📷',
    platform: 'Instagram',
    tint: { bg: '#FBF1F1', fg: '#B5567A' },
    bullets: [
      '定期投稿 / ランダム投稿のスケジューラ',
      '自動いいね・フォロー・コメント・DM',
      'ハッシュタグ自動提案機能',
      '12ヶ月のアップデート保証付き',
    ],
    price: 12800,
    listPrice: 16800,
    monthly: 1280,
    rating: 4.5,
    reviewCount: 967,
    deal: 'タイムセール',
    badges: ['タイムセール'],
    stock: '在庫あり',
    delivery: '即日ダウンロード可能',
  },
  {
    id: 'fb',
    name: 'FacebookToolsPro — シンプルな自動いいね/フォローツール',
    short: 'FacebookToolsPro',
    emoji: '📘',
    platform: 'Facebook',
    tint: { bg: '#EEF2F8', fg: '#3D5A8A' },
    bullets: [
      '自動いいね・自動フォロー',
      'グループ投稿のスケジュール対応',
      '稼働ログのエクスポート（CSV）',
      'シンプル設計・初心者向け',
    ],
    price: 7800,
    listPrice: 9800,
    monthly: 780,
    rating: 4.1,
    reviewCount: 312,
    deal: null,
    badges: [],
    stock: '残り12点',
    delivery: '即日ダウンロード可能',
  },
  {
    id: 'note',
    name: 'noteToolsPro — note記事の予約公開・スキ・フォロー支援',
    short: 'noteToolsPro',
    emoji: '📝',
    platform: 'note',
    tint: { bg: '#EEF6F2', fg: '#2D8062' },
    bullets: [
      '記事の予約公開・下書き一括管理',
      '自動スキ・自動フォロー / フォロー解除',
      'マガジン整理・タグ最適化',
      'クリエイター応援価格',
    ],
    price: 9800,
    listPrice: 11800,
    monthly: 980,
    rating: 4.3,
    reviewCount: 488,
    deal: null,
    badges: [],
    stock: '在庫あり',
    delivery: '即日ダウンロード可能',
  },
  {
    id: 'bsky',
    name: 'BlueskyToolsPro — AT Protocol対応 自動投稿ツール',
    short: 'BlueskyToolsPro',
    emoji: '🦋',
    platform: 'Bluesky',
    tint: { bg: '#EFF4FB', fg: '#3E78C2' },
    bullets: [
      '自動投稿・予約投稿に特化',
      'カスタムフィード対応',
      'PDS切替・複数アカウント',
      'Bluesky API最新仕様準拠',
    ],
    price: 6800,
    listPrice: 7800,
    monthly: 680,
    rating: 4.0,
    reviewCount: 87,
    deal: 'Beta',
    badges: ['Beta'],
    stock: '在庫あり',
    delivery: '即日ダウンロード可能',
  },
  {
    id: 'yay',
    name: 'yayToolsPro — yayコミュニティ運用自動化',
    short: 'yayToolsPro',
    emoji: '🎉',
    platform: 'yay',
    tint: { bg: '#FBF5EC', fg: '#C68A3E' },
    bullets: [
      '自動投稿・サークル参加',
      '自動フォロー・自動いいね',
      '通知整理・ミュート管理',
      'iOS実機検証済み',
    ],
    price: 8800,
    listPrice: 10800,
    monthly: 880,
    rating: 4.2,
    reviewCount: 256,
    deal: null,
    badges: [],
    stock: '在庫あり',
    delivery: '即日ダウンロード可能',
  },
];

const fmt = (n) => '¥' + n.toLocaleString('ja-JP');

// ─── Star rating ──────────────────────────────────────────────────────────

function Stars({ value, size = 14 }) {
  // Render 5 stars, fractional fill via gradient mask.
  const pct = (value / 5) * 100;
  return (
    <span className="inline-flex items-center" aria-label={`${value} / 5`}>
      <span className="relative inline-block" style={{ fontSize: size, lineHeight: 1, letterSpacing: 1 }}>
        <span style={{ color: '#DCDCDC' }}>★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden whitespace-nowrap"
          style={{ width: `${pct}%`, color: '#D49434' }}>
          ★★★★★
        </span>
      </span>
    </span>
  );
}

// ─── Top navigation (dark Amazon-style bar) ───────────────────────────────

function TopNav({ cart }) {
  return (
    <header className="select-none">
      {/* Primary nav */}
      <div className="bg-[#1F1B16] text-white text-[13px]">
        <div className="mx-auto max-w-[1500px] flex items-center gap-2 px-3 h-[60px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <rect x="1.5" y="1.5" width="19" height="19" rx="4" fill="#C2533C"/>
              <path d="M6 15V7l3 5 3-5v8" fill="none" stroke="#FBEDD9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="15.5" cy="15" r="1.2" fill="#FBEDD9"/>
            </svg>
            <div className="flex flex-col leading-none gap-0.5">
              <span className="text-[18px] font-bold tracking-tight">Market</span>
              <span className="text-[9px] text-gray-300 tracking-[0.18em] uppercase">SNS Tools Atelier</span>
            </div>
          </a>

          {/* Deliver-to */}
          <a href="#" className="hidden lg:flex items-end gap-1 px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div className="leading-tight">
              <div className="text-[11px] text-gray-300">お届け先</div>
              <div className="text-[13px] font-bold">東京都 100-XXXX</div>
            </div>
          </a>

          {/* Search */}
          <div className="flex-1 mx-2 min-w-0">
            <form className="flex h-10 rounded overflow-hidden focus-within:ring-2 focus-within:ring-[#C2533C]">
              <button type="button" className="bg-[#FAF7F2] hover:bg-[#EFE9DD] text-[12px] text-[#0F1111] px-3 border-r border-gray-300 flex items-center gap-1 flex-shrink-0">
                すべて
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
              </button>
              <input
                type="text"
                placeholder="商品やキーワードを検索"
                defaultValue=""
                className="flex-1 min-w-0 px-3 text-[14px] text-[#0F1111] focus:outline-none"
              />
              <button type="submit" className="bg-[#C2533C] hover:bg-[#A8432F] w-12 flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBEDD9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </form>
          </div>

          {/* Account / Orders / Cart */}
          <a href="#" className="hidden md:block px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <div className="text-[11px] leading-tight text-gray-300">こんにちは、ゲスト</div>
            <div className="text-[13px] font-bold leading-tight flex items-center gap-0.5">
              ログイン
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </a>
          <a href="#" className="hidden lg:block px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <div className="text-[11px] leading-tight text-gray-300">返品も</div>
            <div className="text-[13px] font-bold leading-tight">注文履歴</div>
          </a>
          <a href="#" className="flex items-end gap-1 px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <div className="relative">
              <svg width="34" height="28" viewBox="0 0 36 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="27" r="2"/>
                <circle cx="26" cy="27" r="2"/>
                <path d="M2 4h5l3 17h21l3-12H10"/>
              </svg>
              <span className="absolute top-0 left-[18px] text-[#C2533C] font-bold text-[15px] leading-none">{cart}</span>
            </div>
            <span className="font-bold text-[13px] pb-1">カート</span>
          </a>
        </div>
      </div>

      {/* Secondary nav */}
      <div className="bg-[#2D2620] text-white text-[13px]">
        <div className="mx-auto max-w-[1500px] flex items-center gap-1 px-2 h-10 overflow-x-auto whitespace-nowrap">
          <a href="#" className="flex items-center gap-1 px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors font-bold">
            <svg width="16" height="14" viewBox="0 0 24 18" fill="currentColor">
              <rect y="0" width="24" height="2"/><rect y="8" width="24" height="2"/><rect y="16" width="24" height="2"/>
            </svg>
            すべて
          </a>
          <a href="#products" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">SNS自動化ツール</a>
          <a href="#all-in-one" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors text-[#E8A87C] font-medium">★ オールインワン月額</a>
          <a href="#" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">今日のセール</a>
          <a href="#" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">買切り版</a>
          <a href="#" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">月額版</a>
          <a href="#" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">ドキュメント</a>
          <a href="#faq" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">ヘルプ</a>
          <a href="#" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors hidden md:block">カスタマーサービス</a>
          <span className="flex-1"></span>
          <a href="#" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors hidden lg:block">アフィリエイト</a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero banner (Amazon main banner style) ───────────────────────────────

function HeroBanner() {
  return (
    <div className="bg-gradient-to-b from-[#2D2620] to-transparent">
      <div className="mx-auto max-w-[1500px] px-3 pt-3">
        <div className="relative rounded-sm overflow-hidden bg-gradient-to-br from-[#1F1B16] via-[#3A2F25] to-[#1F1B16] text-white">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 p-6 md:p-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 text-[#E8A87C] text-[11px] font-bold tracking-[0.12em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A87C]"></span>
                Market 限定オファー
              </div>
              <h1 className="text-[28px] md:text-[40px] font-bold leading-[1.15] mb-4">
                SNS自動化ツール、<br/>
                全部入りで<span className="text-[#E8A87C]">月額¥1,980</span>。
              </h1>
              <p className="text-[14px] md:text-[15px] text-gray-200 leading-[1.7] mb-6 max-w-[520px]">
                X、Instagram、Facebook、note、Bluesky、yay — 7つのSNSをまとめて自動化。
                個別契約合計 ¥7,060/月 → オールインワンなら <span className="text-white font-bold">¥1,980/月</span>（72%OFF）。
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="#all-in-one" className="inline-flex items-center justify-center h-10 px-6 rounded-sm bg-[#C2533C] hover:bg-[#A8432F] text-[#FBEDD9] text-[14px] font-medium border border-[#A8432F]">
                  今すぐ始める
                </a>
                <a href="#products" className="inline-flex items-center justify-center h-10 px-6 rounded-sm bg-white/10 hover:bg-white/20 text-white text-[14px] font-medium border border-white/30">
                  商品ラインナップを見る
                </a>
              </div>
              <div className="mt-5 flex items-center gap-4 text-[12px] text-gray-300">
                <span>✓ 7日間無料トライアル</span>
                <span>✓ いつでも解約可能</span>
                <span>✓ 14日返金保証</span>
              </div>
            </div>

            {/* Right: floating cards mock */}
            <div className="relative hidden md:block h-[260px]" aria-hidden="true">
              <div className="absolute top-0 right-8 w-44 h-32 bg-white rounded shadow-xl rotate-[-4deg] p-3">
                <div className="text-[10px] text-gray-500 font-mono">Instagram</div>
                <div className="text-[18px]">📷</div>
                <div className="mt-1 space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-full"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-2/3"></div>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] rounded">稼働中</div>
              </div>
              <div className="absolute top-12 right-32 w-44 h-32 bg-white rounded shadow-xl rotate-[3deg] p-3">
                <div className="text-[10px] text-gray-500 font-mono">X (Twitter)</div>
                <div className="text-[18px]">🐦</div>
                <div className="mt-1 space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded-full w-2/3"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-full"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] rounded">稼働中</div>
              </div>
              <div className="absolute top-28 right-12 w-44 h-32 bg-white rounded shadow-xl rotate-[-2deg] p-3">
                <div className="text-[10px] text-gray-500 font-mono">note</div>
                <div className="text-[18px]">📝</div>
                <div className="mt-1 space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded-full w-1/2"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-[9px] rounded">予約済</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Category tiles row ───────────────────────────────────────────────────

function CategoryTiles() {
  const tiles = [
    {
      title: '今、人気のツール',
      cta: '詳細を見る',
      items: [
        { name: 'XToolsPro4', emoji: '🐦', sub: 'X (Twitter)', img: 'thumbs/tiles/tile-xtp4-icon.png' },
        { name: 'InstagramToolsPro', emoji: '📷', sub: 'Instagram', img: 'thumbs/tiles/tile-ig-icon.png' },
        { name: 'noteToolsPro', emoji: '📝', sub: 'note', img: 'thumbs/tiles/tile-note-icon.png' },
        { name: 'BlueskyToolsPro', emoji: '🦋', sub: 'Bluesky', img: 'thumbs/tiles/tile-bsky-icon.png' },
      ],
    },
    {
      title: 'タイムセール開催中',
      cta: 'セールを見る',
      items: [
        { name: '最大40%OFF', emoji: '🏷️', sub: '今日まで', img: 'thumbs/sale/sale-40off.png' },
        { name: 'まとめ買いで20%還元', emoji: '🎁', sub: '4点以上', img: 'thumbs/sale/sale-bundle20.png' },
        { name: 'アップグレード優待', emoji: '⬆️', sub: 'Pro3→Pro4', img: 'thumbs/sale/sale-upgrade.png' },
        { name: '新規限定 初月¥980', emoji: '🆕', sub: 'お試し', img: 'thumbs/sale/sale-new980.png' },
      ],
    },
    {
      title: 'よくある質問',
      cta: 'すべて見る',
      items: [
        { name: '買切りと月額の違い', emoji: '💰', sub: '', img: 'thumbs/faq/faq-pricing.png' },
        { name: 'BANのリスクは？', emoji: '🛡️', sub: '', img: 'thumbs/faq/faq-ban.png' },
        { name: '返金ポリシー', emoji: '↩️', sub: '', img: 'thumbs/faq/faq-refund.png' },
        { name: 'アカウント連携手順', emoji: '🔗', sub: '', img: 'thumbs/faq/faq-link.png' },
      ],
    },
    {
      title: '全部入り月額プラン',
      cta: '今すぐ始める',
      hero: true,
    },
  ];
  return (
    <div className="mx-auto max-w-[1500px] px-3 mt-3 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tiles.map((t, i) => (
          <div key={i} className="bg-white rounded-sm shadow-sm p-5">
            <h2 className="text-[18px] font-bold text-[#0F1111] mb-3 leading-tight">{t.title}</h2>
            {t.hero ? (
              <div>
                <div className="rounded-sm bg-gradient-to-br from-[#FBEDD9] to-[#E8A87C] h-[140px] flex flex-col items-center justify-center mb-2">
                  <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#0F1111]/70 mb-1">All-in-one</div>
                  <div className="text-[40px] font-bold leading-none tabular-nums text-[#0F1111]">¥1,980</div>
                  <div className="text-[12px] text-[#0F1111]/70 mt-1">/ 月（税込）</div>
                </div>
                <p className="text-[12px] text-gray-700 leading-[1.6]">全7ツール使い放題。72%OFF。</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {t.items.map((it, j) => (
                  <a
                    href={it.name === 'XToolsPro4' ? 'xtp4/' : it.name === 'XToolsPro3' ? 'xtp3/' : '#'}
                    key={j}
                    className="group">
                    <div className="aspect-square bg-[#FAF7F2] rounded-sm overflow-hidden flex items-center justify-center text-[28px] group-hover:bg-[#EFE9DD] transition-colors">
                      {it.img ? (
                        <img src={it.img} alt="" loading="lazy" className="w-full h-full object-cover block" />
                      ) : (
                        it.emoji
                      )}
                    </div>
                    <div className="text-[11px] text-[#0F1111] mt-1 line-clamp-1 font-medium">{it.name}</div>
                    {it.sub && <div className="text-[10px] text-gray-500 line-clamp-1">{it.sub}</div>}
                  </a>
                ))}
              </div>
            )}
            <a href="#" className="text-[12px] text-[#1B7670] hover:text-[#0F4B47] hover:underline">{t.cta} ›</a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <div className="mx-auto max-w-[1500px] px-3 pt-6 pb-2 text-[12px] text-gray-600">
      <a href="#" className="text-[#1B7670] hover:text-[#0F4B47] hover:underline">ホーム</a>
      <span className="mx-1.5 text-gray-400">›</span>
      <a href="#" className="text-[#1B7670] hover:text-[#0F4B47] hover:underline">ソフトウェア</a>
      <span className="mx-1.5 text-gray-400">›</span>
      <span>SNS自動化ツール</span>
    </div>
  );
}

// ─── Product card (Amazon search-result style) ───────────────────────────

function ProductTile({ p, onAdd }) {
  const off = Math.round((1 - p.price / p.listPrice) * 100);
  return (
    <article className="bg-white rounded-sm p-4 hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Image area */}
      <a
        href={p.id === 'xtp4' ? 'xtp4/' : p.id === 'xtp3' ? 'xtp3/' : '#'}
        className="relative block mb-3"
        aria-label={p.name}>
        <div className="rounded-sm overflow-hidden aspect-square">
          <img
            src={`thumbs/${p.id}.png`}
            alt=""
            className="w-full h-full object-cover block"
            loading="lazy"
          />
        </div>
        {p.deal && (
          <span className="absolute top-2 left-2 bg-[#A8392A] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
            {p.deal}
          </span>
        )}
      </a>

      {p.badges.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {p.badges.map((b) => (
            <span key={b} className="bg-[#7A4A20] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">{b}</span>
          ))}
        </div>
      )}

      <a
        href={p.id === 'xtp4' ? 'xtp4/' : p.id === 'xtp3' ? 'xtp3/' : '#'}
        className="text-[14px] text-[#0F1111] hover:text-[#0F4B47] leading-[1.4] mb-1 line-clamp-2">
        {p.name}
      </a>

      <div className="flex items-center gap-1 mb-1.5">
        <Stars value={p.rating} />
        <a href="#" className="text-[12px] text-[#1B7670] hover:text-[#0F4B47] hover:underline tabular-nums">
          {p.reviewCount.toLocaleString('ja-JP')}
        </a>
      </div>

      {/* Price */}
      <div className="mb-2">
        {off > 0 && (
          <span className="text-[#A8392A] text-[14px] font-medium mr-1">-{off}%</span>
        )}
        <span className="text-[22px] font-medium text-[#0F1111] tabular-nums">
          <span className="text-[14px] align-top mr-0.5">¥</span>
          {p.price.toLocaleString('ja-JP')}
        </span>
        <div className="text-[12px] text-gray-500">
          参考価格: <span className="line-through tabular-nums">{fmt(p.listPrice)}</span>
        </div>
        <div className="text-[12px] text-gray-700 mt-0.5">
          または <span className="font-medium text-[#0F1111] tabular-nums">{fmt(p.monthly)}/月</span> の月額版
        </div>
      </div>

      {/* Stock + delivery */}
      <div className="text-[12px] mb-3">
        <div className="text-[#007600] font-medium">{p.stock}</div>
        <div className="text-gray-600">{p.delivery}</div>
      </div>

      <ul className="text-[12px] text-gray-700 space-y-0.5 mb-3 leading-[1.55]">
        {p.bullets.slice(0, 2).map((b, i) => (
          <li key={i} className="flex gap-1.5"><span className="text-gray-400">•</span><span className="line-clamp-1">{b}</span></li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-1.5">
        <button
          onClick={() => onAdd(p)}
          className="h-8 rounded-full bg-[#C2533C] hover:bg-[#A8432F] border border-[#A8432F] text-[#FBEDD9] text-[13px] font-medium transition-colors">
          カートに入れる
        </button>
        <button className="h-8 rounded-full bg-[#FBEDD9] hover:bg-[#F1DDB8] border border-[#3A2F25] text-[#1F1B16] text-[13px] font-medium transition-colors">
          今すぐ買う
        </button>
      </div>
    </article>
  );
}

// ─── Products section ─────────────────────────────────────────────────────

function ProductsSection({ onAdd, sort, setSort }) {
  const sorted = React.useMemo(() => {
    const arr = [...PRODUCTS];
    if (sort === 'price-asc') arr.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') arr.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') arr.sort((a, b) => b.rating - a.rating);
    else if (sort === 'reviews') arr.sort((a, b) => b.reviewCount - a.reviewCount);
    return arr;
  }, [sort]);

  return (
    <section id="products" className="mx-auto max-w-[1500px] px-3 mt-6">
      <Breadcrumb />

      <div className="grid lg:grid-cols-[220px_1fr] gap-5">
        {/* Sidebar filters */}
        <aside className="hidden lg:block text-[13px]">
          <FilterGroup title="対応SNS" items={[
            { l: 'X (Twitter)', n: 2, checked: true },
            { l: 'Instagram', n: 1, checked: false },
            { l: 'Facebook', n: 1, checked: false },
            { l: 'note', n: 1, checked: false },
            { l: 'Bluesky', n: 1, checked: false },
            { l: 'yay', n: 1, checked: false },
          ]}/>
          <FilterGroup title="ライセンス形態" items={[
            { l: '買切り版', n: 7, checked: false },
            { l: '月額版', n: 7, checked: false },
            { l: 'オールインワン', n: 1, checked: true },
          ]}/>
          <FilterGroup title="価格帯" items={[
            { l: '¥5,000以下', n: 1, checked: false },
            { l: '¥5,000 - ¥10,000', n: 4, checked: false },
            { l: '¥10,000 - ¥15,000', n: 2, checked: false },
            { l: '¥15,000以上', n: 0, checked: false },
          ]}/>
          <FilterGroup title="カスタマーレビュー" rating items={[
            { v: 4, n: 7 },
            { v: 3, n: 7 },
            { v: 2, n: 7 },
            { v: 1, n: 7 },
          ]}/>
          <FilterGroup title="新着・セール" items={[
            { l: '新登場', n: 1, checked: false },
            { l: 'タイムセール', n: 1, checked: false },
            { l: 'ベストセラー', n: 1, checked: false },
          ]}/>
        </aside>

        {/* Main */}
        <div>
          {/* Result header */}
          <div className="bg-white rounded-sm px-4 py-3 mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200">
            <div className="text-[13px] text-gray-700">
              <span className="text-[14px] text-[#0F1111] font-bold">SNS自動化ツール</span>
              <span className="ml-2 text-gray-500"><span className="tabular-nums">1-{sorted.length}</span> / <span className="tabular-nums">{sorted.length}</span>件の結果</span>
            </div>
            <div className="flex items-center gap-2 text-[13px]">
              <span className="text-gray-700">並び替え:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#FAF7F2] hover:bg-[#EFE9DD] border border-gray-300 rounded px-2 py-1 text-[13px] text-[#0F1111]">
                <option value="featured">おすすめ順</option>
                <option value="price-asc">価格の安い順</option>
                <option value="price-desc">価格の高い順</option>
                <option value="rating">評価の高い順</option>
                <option value="reviews">レビュー数順</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {sorted.map((p) => (
              <ProductTile key={p.id} p={p} onAdd={onAdd} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, items, rating }) {
  return (
    <div className="mb-5">
      <h3 className="font-bold text-[#0F1111] text-[14px] mb-1.5">{title}</h3>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i}>
            {rating ? (
              <a href="#" className="flex items-center gap-1 text-[#1B7670] hover:text-[#0F4B47] hover:underline py-0.5">
                <Stars value={it.v} size={13} />
                <span className="text-[12px] text-gray-700 ml-1">以上 <span className="tabular-nums">({it.n})</span></span>
              </a>
            ) : (
              <label className={"flex items-center gap-2 cursor-pointer py-0.5 " + (it.checked ? "" : "")}>
                <input type="checkbox" defaultChecked={it.checked} className="accent-[#007185]"/>
                <a href="#" className={"flex-1 " + (it.checked ? "font-bold text-[#0F1111]" : "text-[#1B7670] hover:text-[#0F4B47] hover:underline")}>
                  {it.l} <span className="text-gray-500 font-normal">({it.n})</span>
                </a>
              </label>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── All-in-one buy box (Prime-style) ─────────────────────────────────────

function AllInOneBuyBox({ onAdd }) {
  return (
    <section id="all-in-one" className="mx-auto max-w-[1500px] px-3 mt-10">
      <div className="bg-white rounded-sm">
        <div className="bg-[#1F1B16] text-white px-6 py-3 rounded-t-sm flex items-baseline gap-2 flex-wrap">
          <span className="font-bold text-[18px]">Market <span className="text-[#E8A87C]">all-in-one</span></span>
          <span className="text-[13px] text-gray-200">全7ツールが、月額¥1,980で使い放題</span>
        </div>

        <div className="grid md:grid-cols-[2fr_1.4fr_1fr] gap-0">
          {/* Description */}
          <div className="p-6 md:p-8 border-r border-gray-200">
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-gray-500 mb-2">概要</div>
            <h3 className="text-[22px] font-bold text-[#0F1111] mb-3 leading-tight">
              全7ツール、まとめて使い放題。
            </h3>
            <p className="text-[13px] text-gray-700 leading-[1.7] mb-4">
              個別に契約すると月額¥7,060。オールインワン月額なら、その3.5分の1以下で全ツールが使えます。
              プランの変更・解約はいつでも可能、新ツール追加時も追加料金なし。
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-gray-700">
              {PRODUCTS.map((p) => (
                <li key={p.id} className="flex items-center gap-1.5">
                  <span className="text-[#007600]">✓</span>
                  <span>{p.short}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="p-6 md:p-8 border-r border-gray-200">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[14px] text-[#A8392A] font-medium">-72%</span>
              <span className="text-[40px] font-medium text-[#0F1111] tabular-nums leading-none">
                <span className="text-[18px] align-top mr-0.5">¥</span>1,980
              </span>
              <span className="text-[14px] text-gray-600 ml-1">/月</span>
            </div>
            <div className="text-[12px] text-gray-500 mb-3">
              個別合計参考価格: <span className="line-through tabular-nums">¥7,060/月</span>
            </div>

            <div className="flex items-center gap-1 mb-1">
              <Stars value={4.8} />
              <a href="#" className="text-[12px] text-[#1B7670] hover:text-[#0F4B47] hover:underline tabular-nums">4,283</a>
            </div>
            <a href="#" className="text-[12px] text-[#1B7670] hover:text-[#0F4B47] hover:underline">レビューを見る ›</a>

            <hr className="my-4 border-gray-200"/>

            <div className="text-[12px] space-y-1">
              <div><span className="font-medium text-[#0F1111]">7日間</span>の無料トライアル</div>
              <div className="text-gray-600">クレジットカード登録不要</div>
              <div className="text-[#007600] font-medium mt-2">いつでもキャンセル可能</div>
              <div className="text-gray-600">14日間の返金保証</div>
            </div>
          </div>

          {/* Buy box */}
          <div className="p-6 md:p-8 bg-[#FAF7F2]">
            <div className="text-[22px] font-medium text-[#0F1111] tabular-nums leading-none mb-1">
              <span className="text-[14px] align-top mr-0.5">¥</span>1,980<span className="text-[13px] text-gray-600 ml-1 font-normal">/月</span>
            </div>
            <div className="text-[12px] text-gray-700 mb-2">配送料無料 <span className="font-bold">即日有効化</span></div>
            <div className="text-[12px] text-[#007600] font-medium mb-3">在庫あり</div>

            <div className="text-[12px] mb-3 space-y-1">
              <div><span className="text-gray-600">提供:</span> <a href="#" className="text-[#1B7670] hover:text-[#0F4B47] hover:underline">Market, Inc.</a></div>
              <div><span className="text-gray-600">配送:</span> Market, Inc.</div>
              <div><span className="text-gray-600">返金:</span> 14日以内</div>
            </div>

            <select className="w-full bg-[#FAF7F2] hover:bg-[#EFE9DD] border border-gray-300 rounded px-2 py-1.5 text-[13px] text-[#0F1111] mb-2">
              <option>数量: 1</option>
              <option>数量: 2</option>
              <option>数量: 3</option>
            </select>

            <button
              onClick={() => onAdd({ id: 'all-in-one', short: 'オールインワン月額', name: 'Market all-in-one', price: 1980, monthly: 1980 })}
              className="w-full h-9 rounded-full bg-[#C2533C] hover:bg-[#A8432F] border border-[#A8432F] text-[#FBEDD9] text-[13px] font-medium mb-2 transition-colors">
              カートに入れる
            </button>
            <button className="w-full h-9 rounded-full bg-[#FBEDD9] hover:bg-[#F1DDB8] border border-[#3A2F25] text-[#1F1B16] text-[13px] font-medium transition-colors">
              今すぐ始める
            </button>

            <div className="mt-3 flex items-center gap-1.5 text-[12px] text-gray-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              安全な取引
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Comparison table ─────────────────────────────────────────────────────

function ComparisonTable() {
  const cols = [
    { name: '買切り（個別）', price: '¥6,800〜', sub: '一度きり', recommended: false, features: [true, false, false, true, false, false] },
    { name: '月額（個別）',   price: '¥680〜',   sub: '/月',     recommended: false, features: [true, true, false, true, true, false] },
    { name: 'オールインワン月額', price: '¥1,980', sub: '/月',     recommended: true,  features: [true, true, true, true, true, true] },
  ];
  const rows = [
    '対象ツールが永続利用 / 月額利用',
    '自動アップデート',
    '全7ツール使い放題',
    'メールサポート',
    'プラン変更・解約自由',
    '新ツール追加時の追加料金なし',
  ];
  return (
    <section id="pricing" className="mx-auto max-w-[1500px] px-3 mt-10">
      <div className="bg-white rounded-sm p-6">
        <h2 className="text-[22px] font-bold text-[#0F1111] mb-1">プラン比較</h2>
        <p className="text-[13px] text-gray-600 mb-5">必要な範囲だけ買切りで揃えるか、全部入りで使い倒すか。</p>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left py-3 px-3 w-1/3 border-b border-gray-200"></th>
                {cols.map((c) => (
                  <th key={c.name} className={"text-left py-3 px-3 align-top border-b border-gray-200 " + (c.recommended ? "bg-[#FBEDD9]" : "")}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#0F1111]">{c.name}</span>
                      {c.recommended && <span className="bg-[#7A4A20] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">おすすめ</span>}
                    </div>
                    <div className="text-[20px] font-medium text-[#0F1111] tabular-nums leading-none">{c.price}<span className="text-[12px] text-gray-600 ml-1 font-normal">{c.sub}</span></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r} className="border-b border-gray-100">
                  <td className="py-3 px-3 text-gray-800">{r}</td>
                  {cols.map((c) => (
                    <td key={c.name} className={"py-3 px-3 " + (c.recommended ? "bg-[#FBEDD9]" : "")}>
                      {c.features[i] ? (
                        <span className="text-[#007600] text-[16px]" aria-label="あり">✓</span>
                      ) : (
                        <span className="text-gray-300 text-[16px]" aria-label="なし">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-3 px-3"></td>
                {cols.map((c) => (
                  <td key={c.name} className={"py-3 px-3 " + (c.recommended ? "bg-[#FBEDD9]" : "")}>
                    <button className={"h-8 px-3 rounded-full text-[12px] font-medium border " +
                      (c.recommended
                        ? "bg-[#C2533C] hover:bg-[#A8432F] border-[#A8432F] text-[#FBEDD9]"
                        : "bg-white hover:bg-gray-50 border-gray-300 text-[#0F1111]")}>
                      {c.recommended ? '今すぐ始める' : '選択'}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────

function Steps() {
  const steps = [
    { n: '01', title: 'アカウント登録', body: 'メールアドレスだけで30秒。クレジットカード登録は不要。' },
    { n: '02', title: '購入 or 月額契約', body: '使いたいツールを買切りで購入するか、全部入り月額を選択。' },
    { n: '03', title: 'SNSと連携',     body: 'OAuth認証で各SNSを接続。最短1分で自動化が始まります。' },
  ];
  return (
    <section className="mx-auto max-w-[1500px] px-3 mt-10">
      <div className="bg-white rounded-sm p-6">
        <h2 className="text-[22px] font-bold text-[#0F1111] mb-5">3ステップで自動化開始</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4">
              <div className="text-[40px] font-light text-[#C2533C] leading-none tabular-nums" style={{fontFamily: 'Fraunces, Georgia, serif'}}>{s.n}</div>
              <div>
                <h3 className="text-[15px] font-bold text-[#0F1111] mb-1">{s.title}</h3>
                <p className="text-[13px] text-gray-600 leading-[1.7]">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ / Customer Q&A ───────────────────────────────────────────────────

const FAQS = [
  {
    q: '買切りと月額、どちらがお得？',
    a: '長く使う想定なら買切り、まずは試したい場合や全ツールを使いたい場合は月額がおすすめです。買切りは1ツールあたり10〜18ヶ月の月額料金に相当します。',
    by: 'Market公式 · 販売者',
    votes: 248,
  },
  {
    q: 'オールインワンから個別購入に変更できる？',
    a: 'はい、いつでも切り替え可能です。次回更新日からプランが切り替わり、未使用期間分の差額は返金されます。',
    by: 'Market公式 · 販売者',
    votes: 187,
  },
  {
    q: 'アカウントBANのリスクは？',
    a: '各SNSの利用規約に抵触しない範囲で動作するよう、頻度・間隔をデフォルトで安全側に調整しています。とはいえ100%のリスク回避は保証できないため、ご自身でも利用範囲をご検討ください。',
    by: 'Market公式 · 販売者',
    votes: 432,
  },
  {
    q: '支払い方法は？',
    a: 'クレジットカード（Visa / Mastercard / JCB / AMEX）、銀行振込、PayPalに対応しています。月額プランは自動更新です。',
    by: 'Market公式 · 販売者',
    votes: 92,
  },
  {
    q: '解約はいつでもできる？',
    a: 'いつでも解約できます。マイページから1クリックで解約手続きが完了し、次回更新日まではそのままご利用いただけます。',
    by: 'Market公式 · 販売者',
    votes: 121,
  },
  {
    q: '返金ポリシーは？',
    a: 'ご購入から14日以内かつ累計稼働時間が1時間未満の場合、全額返金いたします。買切り版にも適用されます。',
    by: 'Market公式 · 販売者',
    votes: 76,
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <section id="faq" className="mx-auto max-w-[1500px] px-3 mt-10">
      <div className="bg-white rounded-sm p-6">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-[22px] font-bold text-[#0F1111]">カスタマーQ&A</h2>
          <a href="#" className="text-[13px] text-[#1B7670] hover:text-[#0F4B47] hover:underline">すべて見る ›</a>
        </div>
        <p className="text-[13px] text-gray-600 mb-5"><span className="tabular-nums">{FAQS.length}</span>件のよく寄せられる質問</p>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {FAQS.map((item, i) => (
            <div key={item.q} className="border-b border-gray-100 pb-4">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                aria-expanded={openIdx === i}
                className="w-full flex items-start justify-between gap-3 text-left">
                <div className="flex gap-2 items-start">
                  <span className="text-gray-500 font-bold text-[14px] mt-0.5 select-none">Q:</span>
                  <span className="text-[14px] text-[#1B7670] hover:text-[#0F4B47] hover:underline font-medium leading-snug">{item.q}</span>
                </div>
                <span className="text-gray-400 text-[14px] mt-0.5">{openIdx === i ? '−' : '+'}</span>
              </button>
              {openIdx === i && (
                <div className="mt-2.5 pl-5 flex gap-2 items-start">
                  <span className="text-gray-500 font-bold text-[14px] mt-0.5 select-none">A:</span>
                  <div className="flex-1">
                    <p className="text-[13px] text-gray-800 leading-[1.7] mb-2">{item.a}</p>
                    <div className="text-[11px] text-gray-500">
                      <span>{item.by}</span>
                      <span className="mx-2">·</span>
                      <span><span className="tabular-nums">{item.votes}</span>人が役立ったと回答</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Back-to-top + Footer ─────────────────────────────────────────────────

function BackToTop() {
  return (
    <a href="#" className="block bg-[#3A3128] hover:bg-[#4A4035] text-white text-center py-3.5 text-[13px] mt-10 transition-colors">
      ページの先頭へ戻る
    </a>
  );
}

function Footer() {
  const cols = [
    { title: 'Marketについて', items: ['会社情報', '採用情報', 'プレスリリース', '投資家情報', 'ブログ'] },
    { title: 'お金を稼ぐ', items: ['アフィリエイトプログラム', 'パートナー販売', '開発者として参加', '広告掲載'] },
    { title: '便利な決済方法', items: ['Marketギフトカード', 'クレジットカード', 'PayPay対応', '銀行振込', '請求書払い'] },
    { title: 'ヘルプ&サポート', items: ['注文履歴', '返品・返金', 'プラン管理', 'ヘルプセンター', 'カスタマーサービス'] },
  ];
  return (
    <footer className="mt-0 text-white">
      <BackToTop />
      <div className="bg-[#2D2620]">
        <div className="mx-auto max-w-[1500px] px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="font-bold text-[15px] mb-3">{c.title}</h3>
              <ul className="space-y-2 text-[13px] text-gray-300">
                {c.items.map((it) => (
                  <li key={it}><a href="#" className="hover:underline">{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="border-gray-700/60"/>
        <div className="mx-auto max-w-[1500px] px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <rect x="1.5" y="1.5" width="19" height="19" rx="4" fill="#C2533C"/>
              <path d="M6 15V7l3 5 3-5v8" fill="none" stroke="#FBEDD9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="15.5" cy="15" r="1.2" fill="#FBEDD9"/>
            </svg>
            <span className="text-[18px] font-bold leading-none">Market</span>
          </a>
          <div className="flex flex-wrap gap-3 text-[12px]">
            <button className="px-3 py-1.5 border border-gray-500 rounded text-gray-200 hover:bg-white/5">🌐 日本語</button>
            <button className="px-3 py-1.5 border border-gray-500 rounded text-gray-200 hover:bg-white/5">¥ JPY - 日本円</button>
            <button className="px-3 py-1.5 border border-gray-500 rounded text-gray-200 hover:bg-white/5">🇯🇵 日本</button>
          </div>
        </div>
      </div>
      <div className="bg-[#1F1B16]">
        <div className="mx-auto max-w-[1500px] px-6 py-8 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-gray-300 mb-3">
            <a href="#" className="hover:underline">特定商取引法に基づく表記</a>
            <a href="#" className="hover:underline">プライバシー</a>
            <a href="#" className="hover:underline">利用規約</a>
            <a href="#" className="hover:underline">広告について</a>
            <a href="#" className="hover:underline">クッキー</a>
            <a href="#" className="hover:underline">お問い合わせ</a>
          </nav>
          <div className="text-[11px] text-gray-400">© 2026 Market, Inc. — SNS自動化ツール販売プラットフォーム</div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FF9900",
  "showFilters": true,
  "density": "comfortable"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cart, setCart] = React.useState(0);
  const [sort, setSort] = React.useState('featured');

  const onAdd = (p) => {
    setCart((c) => c + 1);
  };

  return (
    <div className="amz-app">
      <TopNav cart={cart} />
      <HeroBanner />
      <CategoryTiles />
      <ProductsSection onAdd={onAdd} sort={sort} setSort={setSort} />
      <AllInOneBuyBox onAdd={onAdd} />
      <ComparisonTable />
      <Steps />
      <FAQ />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Display" />
        <TweakRadio
          label="密度"
          value={t.density}
          options={[
            { value: 'compact', label: 'コンパクト' },
            { value: 'comfortable', label: '標準' },
          ]}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakToggle
          label="サイドフィルタを表示"
          value={t.showFilters}
          onChange={(v) => setTweak('showFilters', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
