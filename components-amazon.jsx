// Market — warm boutique e-commerce style（ver2.1・2026-10-24）
// 2026-05 のデザインモックの見た目（Amazon 風の密度あるマーケット・
// walnut + persimmon + cream）を保ったまま、中身を実在の製品・実価格・実リンクに。
// 架空のレビュー数・在庫・セール・カート・オールインワン月額は置かない。

const DOCS = 'https://xtools-docs-auth.web.app/';
const TOKUSHOHO = 'https://xtools-docs-auth.web.app/tokushoho.html';
const CONTACT = 'https://forms.gle/sDG46hdxTo9E4p4CA';
const NOTE = 'https://note.com/youpapalife';
const RAIJIN = 'https://raijin.youpapatools.com/';
const XTP6_URL = 'https://xtp6.youpapatools.com/?utm_source=market&utm_medium=hub';
const TTP2_DOCS = 'https://threadtoolspro2.vercel.app/docs';
const TTP2_BUY = 'https://page.theapps.jp/paid/join/H8hv3G40M25l77c8';

// 価格はすべて一次情報で確認（2026-10-24）: XTP3＝LP の Stripe リンク、XTP4／XTP6＝比較表と limits、TTP2＝theapps の決済ページ
const PRODUCTS = [
  {
    id: 'xtp3',
    name: 'XToolsPro3 — X(Twitter) 運用ツール・買い切り版（Windows）',
    short: 'XToolsPro3',
    platform: 'X (Twitter)',
    env: 'Windows PC（つけっぱなしが必要）',
    bullets: [
      '定期・予約・ランダム投稿、画像投稿、複数アカウント管理',
      'スプレッドシート取り込み、AI の文章生成（アドオン）',
      '買い切り。月額なし。X の API 不要',
      '無料版あり（定期投稿のみ）',
    ],
    price: 9800,
    priceNote: '買い切り（ベース）。フルパック ¥29,800',
    free: '無料版あり（定期投稿のみ）',
    badges: ['ベストセラー'],
    href: 'xtp3/',
    cta: '製品ページを見る',
  },
  {
    id: 'xtp6',
    name: 'XToolsPro6 — スマホのブラウザで予約投稿・分析・AI 投稿案',
    short: 'XToolsPro6',
    platform: 'X (Twitter)',
    env: 'Web（最初の X アカウント登録だけ PC）',
    bullets: [
      '予約投稿・オート投稿・伸びた投稿の分析・AI の投稿案',
      'アカウント 10 個まで（有料）。PC つけっぱなし不要',
      'X の API 不要。Google アカウントで無料開始',
      '14 日お試しつき',
    ],
    price: 0,
    priceNote: '無料〜。有料は月 ¥1,000（14 日お試し）',
    free: '無料版: 1 日 10 件（予約・オート・分析・AI）',
    badges: ['新登場', 'おすすめ'],
    href: XTP6_URL,
    cta: '無料で始める',
    external: true,
  },
  {
    id: 'xtp4',
    name: 'XToolsPro4 — X 公式 API で動く、AI 下書き対応の Web アプリ',
    short: 'XToolsPro4',
    platform: 'X (Twitter)',
    env: 'Web（スマホ可）',
    bullets: [
      'ランダム投稿・スプレッドシート取込・コミュニティ投稿',
      '画像・動画つきの予約投稿、勝ちパターン分析と AI 下書き',
      'X 公式 API で動作（有料版は自分の API キーが必要）',
      'アカウント 50 個まで',
    ],
    price: 0,
    priceNote: '無料〜。有料は月 ¥1,000',
    free: '無料版: 1 日 1 件',
    badges: [],
    href: 'xtp4/',
    cta: '製品ページを見る',
  },
  {
    id: 'ttp2',
    name: 'ThreadsToolsPro2 — Threads 公式 API で予約・定期・ランダム投稿',
    short: 'ThreadsToolsPro2',
    platform: 'Threads',
    env: 'Web（24 時間稼働・PC 不要）',
    bullets: [
      '定期投稿（キューを周回）・予約投稿・ランダム投稿',
      '複数アカウント運用、アカウント単位のプロキシ',
      'スプレッドシート・CSV の一括取込',
      'Threads 公式 API＋OAuth（RPA ではない）',
    ],
    price: 1000,
    priceNote: '月額（税込）',
    monthly: true,
    free: null,
    badges: [],
    href: TTP2_DOCS,
    cta: '使い方と登録を見る',
    secondary: { label: '購入登録へ進む', href: TTP2_BUY },
    external: true,
  },
];

const fmt = (n) => '¥' + n.toLocaleString('ja-JP');
const ext = (p) => (p.external ? { target: '_blank', rel: 'noopener' } : {});

// ─── Logo ─────────────────────────────────────────────────────────────────

function Logo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true">
      <rect x="1.5" y="1.5" width="19" height="19" rx="4" fill="#C2533C"/>
      <path d="M6 15V7l3 5 3-5v8" fill="none" stroke="#FBEDD9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="15.5" cy="15" r="1.2" fill="#FBEDD9"/>
    </svg>
  );
}

// ─── Top navigation (dark Amazon-style bar) ───────────────────────────────

function TopNav() {
  const [q, setQ] = React.useState('');
  const onSearch = (e) => {
    e.preventDefault();
    const s = q.trim().toLowerCase();
    const hit = PRODUCTS.find((p) => (p.short + ' ' + p.platform + ' ' + p.name).toLowerCase().includes(s));
    if (hit) {
      const el = document.getElementById('p-' + hit.id);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('ring-2', 'ring-[#C2533C]'); setTimeout(() => el.classList.remove('ring-2', 'ring-[#C2533C]'), 1800); return; }
    }
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header className="select-none">
      {/* Primary nav */}
      <div className="bg-[#1F1B16] text-white text-[13px]">
        <div className="mx-auto max-w-[1500px] flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-[60px] overflow-hidden">
          <a href="/" className="flex items-center gap-2 px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <Logo />
            <div className="flex flex-col leading-none gap-0.5">
              <span className="text-[12px] sm:text-[16px] font-bold tracking-tight whitespace-nowrap">Youパパツールマーケット</span>
              <span className="hidden sm:block text-[9px] text-gray-300 tracking-[0.18em] uppercase">X · Threads Tools</span>
            </div>
          </a>

          <a href={RAIJIN} target="_blank" rel="noopener" className="hidden lg:flex items-end gap-1 px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
              <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>
            </svg>
            <div className="leading-tight">
              <div className="text-[11px] text-gray-300">法人の方は</div>
              <div className="text-[13px] font-bold">RAIJIN へ</div>
            </div>
          </a>

          {/* Search（ページ内のツールへ飛ぶ） */}
          <div className="flex-1 mx-2 min-w-0">
            <form onSubmit={onSearch} className="flex h-10 rounded overflow-hidden focus-within:ring-2 focus-within:ring-[#C2533C]" role="search">
              <label htmlFor="q" className="sr-only">ツールを探す</label>
              <input
                id="q"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ツール名で探す（例: XTP6・Threads）"
                className="flex-1 min-w-0 px-3 text-[14px] text-[#0F1111] focus:outline-none"
              />
              <button type="submit" aria-label="検索" className="bg-[#C2533C] hover:bg-[#A8432F] w-12 flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBEDD9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </form>
          </div>

          <a href={DOCS} target="_blank" rel="noopener" className="hidden md:block px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <div className="text-[11px] leading-tight text-gray-300">購入後の</div>
            <div className="text-[13px] font-bold leading-tight">手順書</div>
          </a>
          <a href={CONTACT} target="_blank" rel="noopener" aria-label="お問い合わせ" title="お問い合わせ" className="flex items-end gap-1 px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span className="hidden sm:inline font-bold text-[13px] pb-0.5">お問い合わせ</span>
          </a>
        </div>
      </div>

      {/* Secondary nav */}
      <div className="bg-[#2D2620] text-white text-[13px]">
        <div className="mx-auto max-w-[1500px] flex items-center gap-1 px-2 h-10 overflow-x-auto whitespace-nowrap nav-scroll">
          <a href="#products" className="flex items-center gap-1 px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors font-bold">
            <svg width="16" height="14" viewBox="0 0 24 18" fill="currentColor">
              <rect y="0" width="24" height="2"/><rect y="8" width="24" height="2"/><rect y="16" width="24" height="2"/>
            </svg>
            すべてのツール
          </a>
          <a href="#p-xtp3" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">買い切り（XTP3）</a>
          <a href="#p-xtp6" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors text-[#E8A87C] font-medium">★ 無料で始める（XTP6）</a>
          <a href="#p-xtp4" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">公式 API（XTP4）</a>
          <a href="#p-ttp2" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">Threads（TTP2）</a>
          <a href="xtp-compare/" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">XTP3・4・6 比較表</a>
          <a href="#faq" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors">よくある質問</a>
          <span className="flex-1"></span>
          <a href={NOTE} target="_blank" rel="noopener" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors hidden lg:block">開発者の note</a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero banner ──────────────────────────────────────────────────────────

function HeroBanner() {
  return (
    <div className="bg-gradient-to-b from-[#2D2620] to-transparent">
      <div className="mx-auto max-w-[1500px] px-3 pt-3">
        <div className="relative rounded-sm overflow-hidden bg-gradient-to-br from-[#1F1B16] via-[#3A2F25] to-[#1F1B16] text-white">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 p-6 md:p-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 text-[#E8A87C] text-[11px] font-bold tracking-[0.12em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A87C]"></span>
                作った本人が販売・サポート
              </div>
              <h1 className="text-[28px] md:text-[40px] font-bold leading-[1.15] mb-4">
                SNS運用を、<br/>
                <span className="text-[#E8A87C]">仕組み</span>に任せる。
              </h1>
              <p className="text-[14px] md:text-[15px] text-gray-200 leading-[1.7] mb-6 max-w-[520px]">
                Youパパが個人で開発している X（旧 Twitter）と Threads の運用ツールです。
                スマホで無料から始められる <span className="text-white font-bold">XToolsPro6</span>、PC で腰を据えて回す買い切りの <span className="text-white font-bold">XToolsPro3</span>、公式 API の <span className="text-white font-bold">XToolsPro4</span>、Threads 向けの <span className="text-white font-bold">ThreadsToolsPro2</span>。
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="#products" className="inline-flex items-center justify-center h-10 px-6 rounded-sm bg-[#C2533C] hover:bg-[#A8432F] text-[#FBEDD9] text-[14px] font-medium border border-[#A8432F]">
                  ツールを選ぶ
                </a>
                <a href="xtp-compare/" className="inline-flex items-center justify-center h-10 px-6 rounded-sm bg-white/10 hover:bg-white/20 text-white text-[14px] font-medium border border-white/30">
                  XTP3・4・6 の違いを見る
                </a>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-gray-300">
                <span>✓ 無料版は Google アカウントで即開始</span>
                <span>✓ 買い切りは Stripe 決済</span>
                <span>✓ 購入後は手順書とお問い合わせ窓口</span>
              </div>
            </div>

            {/* Right: floating cards */}
            <div className="relative hidden md:block h-[260px]" aria-hidden="true">
              <div className="absolute top-0 right-8 w-44 h-32 bg-white rounded shadow-xl rotate-[-4deg] p-3">
                <div className="text-[10px] text-gray-500 font-mono">XToolsPro6</div>
                <div className="text-[13px] font-bold text-[#0F1111] mt-1">予約投稿 10:00</div>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-full"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-2/3"></div>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] rounded">予約済</div>
              </div>
              <div className="absolute top-12 right-32 w-44 h-32 bg-white rounded shadow-xl rotate-[3deg] p-3">
                <div className="text-[10px] text-gray-500 font-mono">XToolsPro3</div>
                <div className="text-[13px] font-bold text-[#0F1111] mt-1">定期投稿 稼働中</div>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded-full w-2/3"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-full"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] rounded">稼働中</div>
              </div>
              <div className="absolute top-28 right-12 w-44 h-32 bg-white rounded shadow-xl rotate-[-2deg] p-3">
                <div className="text-[10px] text-gray-500 font-mono">ThreadsToolsPro2</div>
                <div className="text-[13px] font-bold text-[#0F1111] mt-1">ランダム投稿</div>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded-full w-1/2"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-[9px] rounded">次回 18:30</div>
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
      title: 'ツール一覧',
      cta: 'すべて見る',
      ctaHref: '#products',
      items: [
        { name: 'XToolsPro6', sub: 'X · 無料〜', img: 'thumbs/tiles/tile-xtp6-icon.webp', href: '#p-xtp6' },
        { name: 'XToolsPro3', sub: 'X · 買い切り', img: 'thumbs/tiles/tile-xtp3-icon.webp', href: '#p-xtp3' },
        { name: 'XToolsPro4', sub: 'X · 公式 API', img: 'thumbs/tiles/tile-xtp4-icon.webp', href: '#p-xtp4' },
        { name: 'ThreadsToolsPro2', sub: 'Threads · 月額', img: 'thumbs/tiles/tile-ttp2-icon.webp', href: '#p-ttp2' },
      ],
    },
    {
      title: 'どれを選べばいい？',
      cta: '比較表を見る',
      ctaHref: 'xtp-compare/',
      guide: [
        { k: 'PC をつけっぱなしにできる', v: 'XToolsPro3（買い切り）', href: '#p-xtp3', color: '#5A6578' },
        { k: 'スマホから無料で始めたい', v: 'XToolsPro6', href: '#p-xtp6', color: '#E8463A' },
        { k: 'X 公式 API で動かしたい', v: 'XToolsPro4', href: '#p-xtp4', color: '#2F6FD6' },
        { k: 'Threads を回したい', v: 'ThreadsToolsPro2', href: '#p-ttp2', color: '#1F1B16' },
      ],
    },
    {
      title: 'よくある質問',
      cta: 'すべて見る',
      ctaHref: '#faq',
      items: [
        { name: '買い切りと月額の違い', sub: '', img: 'thumbs/faq/faq-pricing.webp', href: '#faq-0' },
        { name: '凍結のリスクは？', sub: '', img: 'thumbs/faq/faq-ban.webp', href: '#faq-1' },
        { name: 'スマホで使える？', sub: '', img: 'thumbs/faq/faq-phone.webp', href: '#faq-2' },
        { name: 'アカウント連携の手順', sub: '', img: 'thumbs/faq/faq-link.webp', href: '#faq-3' },
      ],
    },
    {
      title: '無料で試す',
      cta: 'XToolsPro6 を無料で始める',
      ctaHref: XTP6_URL,
      external: true,
      hero: true,
    },
  ];
  return (
    <div className="mx-auto max-w-[1500px] px-3 mt-3 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tiles.map((t, i) => (
          <div key={i} className="bg-white rounded-sm shadow-sm p-5 flex flex-col">
            <h2 className="text-[18px] font-bold text-[#0F1111] mb-3 leading-tight">{t.title}</h2>
            {t.hero ? (
              <div className="mb-3">
                <div className="rounded-sm bg-gradient-to-br from-[#FBEDD9] to-[#E8A87C] h-[140px] flex flex-col items-center justify-center mb-2">
                  <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#0F1111]/70 mb-1">Free plan</div>
                  <div className="text-[40px] font-bold leading-none tabular-nums text-[#0F1111]">¥0</div>
                  <div className="text-[12px] text-[#0F1111]/70 mt-1">カード登録なし・Google でログイン</div>
                </div>
                <p className="text-[12px] text-gray-700 leading-[1.6]">XToolsPro6 の無料版は 1 日 10 件まで予約・オート投稿・分析・AI が使えます。XToolsPro4 の無料版（1 日 1 件）、XToolsPro3 の無料版（定期投稿）もあります。</p>
              </div>
            ) : t.guide ? (
              <ul className="space-y-1.5 mb-3 text-[12px]">
                {t.guide.map((g) => (
                  <li key={g.k}>
                    <a href={g.href} className="block rounded-sm bg-[#FAF7F2] hover:bg-[#EFE9DD] px-2.5 py-2 border-l-4 transition-colors" style={{ borderColor: g.color }}>
                      <div className="text-gray-700">{g.k}</div>
                      <div className="font-bold text-[#0F1111]">→ {g.v}</div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {t.items.map((it, j) => (
                  <a href={it.href} key={j} className="group">
                    <div className="aspect-square bg-[#FAF7F2] rounded-sm overflow-hidden flex items-center justify-center group-hover:bg-[#EFE9DD] transition-colors">
                      <img src={it.img} alt="" loading="lazy" className="w-full h-full object-cover block" />
                    </div>
                    <div className="text-[11px] text-[#0F1111] mt-1 line-clamp-1 font-medium">{it.name}</div>
                    {it.sub && <div className="text-[10px] text-gray-500 line-clamp-1">{it.sub}</div>}
                  </a>
                ))}
              </div>
            )}
            <a href={t.ctaHref} {...(t.external ? { target: '_blank', rel: 'noopener' } : {})} className="mt-auto text-[12px] text-[#1B7670] hover:text-[#0F4B47] hover:underline">{t.cta} ›</a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <div className="pt-6 pb-2 text-[12px] text-gray-600">
      <a href="/" className="text-[#1B7670] hover:text-[#0F4B47] hover:underline">ホーム</a>
      <span className="mx-1.5 text-gray-400">›</span>
      <span>X・Threads の運用ツール</span>
    </div>
  );
}

// ─── Product card (Amazon search-result style) ───────────────────────────

function ProductTile({ p }) {
  return (
    <article id={'p-' + p.id} className="bg-white rounded-sm p-4 hover:shadow-md transition-shadow flex flex-col h-full scroll-mt-4">
      <a href={p.href} {...ext(p)} className="relative block mb-3" aria-label={p.name}>
        <div className="rounded-sm overflow-hidden aspect-square">
          <img src={`thumbs/${p.id}.webp`} alt="" className="w-full h-full object-cover block" loading="lazy" />
        </div>
        {p.badges[0] && (
          <span className="absolute top-2 left-2 bg-[#A8392A] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
            {p.badges[0]}
          </span>
        )}
      </a>

      {p.badges.length > 1 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {p.badges.slice(1).map((b) => (
            <span key={b} className="bg-[#7A4A20] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">{b}</span>
          ))}
        </div>
      )}

      <a href={p.href} {...ext(p)} className="text-[14px] text-[#0F1111] hover:text-[#0F4B47] leading-[1.4] mb-1 line-clamp-2 font-medium">
        {p.name}
      </a>

      <div className="text-[12px] text-gray-600 mb-1.5">{p.platform} · {p.env}</div>

      {/* Price */}
      <div className="mb-2">
        {p.price === 0 ? (
          <span className="text-[22px] font-medium text-[#0F1111] tabular-nums">無料<span className="text-[14px] ml-0.5">〜</span></span>
        ) : (
          <span className="text-[22px] font-medium text-[#0F1111] tabular-nums">
            <span className="text-[14px] align-top mr-0.5">¥</span>
            {p.price.toLocaleString('ja-JP')}
            {p.monthly && <span className="text-[13px] text-gray-600 ml-1 font-normal">/月</span>}
          </span>
        )}
        <div className="text-[12px] text-gray-700 mt-0.5">{p.priceNote}</div>
      </div>

      <div className="text-[12px] mb-3">
        {p.free ? <div className="text-[#007600] font-medium">{p.free}</div> : <div className="text-gray-600">無料版なし</div>}
      </div>

      <ul className="text-[12px] text-gray-700 space-y-0.5 mb-3 leading-[1.55]">
        {p.bullets.map((b, i) => (
          <li key={i} className="flex gap-1.5"><span className="text-gray-400">•</span><span>{b}</span></li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-1.5">
        <a href={p.href} {...ext(p)}
          className="h-9 inline-flex items-center justify-center rounded-full bg-[#C2533C] hover:bg-[#A8432F] border border-[#A8432F] text-[#FBEDD9] text-[13px] font-medium transition-colors">
          {p.cta}
        </a>
        {p.secondary && (
          <a href={p.secondary.href} target="_blank" rel="noopener"
            className="h-9 inline-flex items-center justify-center rounded-full bg-[#FBEDD9] hover:bg-[#F1DDB8] border border-[#3A2F25] text-[#1F1B16] text-[13px] font-medium transition-colors">
            {p.secondary.label}
          </a>
        )}
      </div>
    </article>
  );
}

// ─── Products section ─────────────────────────────────────────────────────

const FILTERS = {
  platform: [
    { l: 'X (Twitter)', test: (p) => p.platform === 'X (Twitter)' },
    { l: 'Threads', test: (p) => p.platform === 'Threads' },
  ],
  license: [
    { l: '買い切り', test: (p) => p.id === 'xtp3' },
    { l: '月額（無料版あり）', test: (p) => p.price === 0 },
    { l: '月額', test: (p) => p.monthly },
  ],
  env: [
    { l: 'スマホで使える', test: (p) => p.id !== 'xtp3' },
    { l: 'PC つけっぱなし不要', test: (p) => p.id !== 'xtp3' },
    { l: 'X の API 不要', test: (p) => p.id === 'xtp3' || p.id === 'xtp6' },
  ],
};

function ProductsSection({ sort, setSort, active, toggle }) {
  const filtered = React.useMemo(() => {
    let arr = PRODUCTS.filter((p) => active.every((f) => f.test(p)));
    if (sort === 'price-asc') arr = [...arr].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') arr = [...arr].sort((a, b) => b.price - a.price);
    return arr;
  }, [sort, active]);

  return (
    <section id="products" className="mx-auto max-w-[1500px] px-3 mt-6 scroll-mt-4">
      <Breadcrumb />

      <div className="grid lg:grid-cols-[220px_1fr] gap-5">
        <aside className="hidden lg:block text-[13px]">
          <FilterGroup title="対応SNS" items={FILTERS.platform} active={active} toggle={toggle} />
          <FilterGroup title="料金の形" items={FILTERS.license} active={active} toggle={toggle} />
          <FilterGroup title="使う場所" items={FILTERS.env} active={active} toggle={toggle} />
          <div className="mt-6 rounded-sm bg-white p-3 text-[12px] text-gray-700 leading-[1.6]">
            <div className="font-bold text-[#0F1111] mb-1">迷ったら</div>
            XTP3・XTP4・XTP6 の違いは <a href="xtp-compare/" className="text-[#1B7670] hover:underline">比較表</a> に。PC の有無・API・料金・アカウント数・AI を 1 枚で。
          </div>
        </aside>

        <div>
          <div className="bg-white rounded-sm px-4 py-3 mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200">
            <div className="text-[13px] text-gray-700">
              <span className="text-[14px] text-[#0F1111] font-bold">X・Threads の運用ツール</span>
              <span className="ml-2 text-gray-500"><span className="tabular-nums">{filtered.length}</span> / <span className="tabular-nums">{PRODUCTS.length}</span> 件</span>
              {active.length > 0 && (
                <button type="button" onClick={() => toggle(null)} className="ml-3 text-[#1B7670] hover:underline">絞り込みを解除</button>
              )}
            </div>
            <div className="flex items-center gap-2 text-[13px]">
              <label htmlFor="sort" className="text-gray-700">並び替え:</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#FAF7F2] hover:bg-[#EFE9DD] border border-gray-300 rounded px-2 py-1 text-[13px] text-[#0F1111]">
                <option value="featured">おすすめ順</option>
                <option value="price-asc">価格の安い順</option>
                <option value="price-desc">価格の高い順</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-sm p-6 text-[13px] text-gray-700">この条件に合うツールはありません。<button type="button" onClick={() => toggle(null)} className="ml-2 text-[#1B7670] hover:underline">絞り込みを解除</button></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {filtered.map((p) => (
                <ProductTile key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, items, active, toggle }) {
  return (
    <div className="mb-5">
      <h3 className="font-bold text-[#0F1111] text-[14px] mb-1.5">{title}</h3>
      <ul className="space-y-1">
        {items.map((it) => {
          const on = active.includes(it);
          const n = PRODUCTS.filter(it.test).length;
          return (
            <li key={it.l}>
              <label className="flex items-center gap-2 cursor-pointer py-0.5">
                <input type="checkbox" checked={on} onChange={() => toggle(it)} className="accent-[#C2533C]"/>
                <span className={"flex-1 " + (on ? "font-bold text-[#0F1111]" : "text-[#1B7670] hover:text-[#0F4B47]")}>
                  {it.l} <span className="text-gray-500 font-normal">({n})</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Comparison table（XTP3・XTP4・XTP6） ─────────────────────────────────

function ComparisonTable() {
  const cols = [
    { id: 'xtp3', name: 'XToolsPro3', price: '¥9,800〜', sub: '買い切り', color: '#5A6578', href: 'xtp3/' },
    { id: 'xtp4', name: 'XToolsPro4', price: '無料〜', sub: '有料 月¥1,000', color: '#2F6FD6', href: 'xtp4/' },
    { id: 'xtp6', name: 'XToolsPro6', price: '無料〜', sub: '有料 月¥1,000・14日お試し', color: '#E8463A', recommended: true, href: XTP6_URL, external: true },
  ];
  const rows = [
    ['PC つけっぱなし', ['必要', '不要', '不要']],
    ['X の API', ['不要', '必要（有料版は自分のキー）', '不要']],
    ['スマホで使える', ['—', '○', '○（最初の登録だけ PC）']],
    ['無料版', ['定期投稿のみ', '1 日 1 件', '1 日 10 件']],
    ['アカウント数', ['目安 100', '50 まで', '10 まで']],
    ['AI の投稿案', ['アドオン', '○', '○']],
  ];
  return (
    <section id="compare" className="mx-auto max-w-[1500px] px-3 mt-10">
      <div className="bg-white rounded-sm p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h2 className="text-[22px] font-bold text-[#0F1111]">XTP3・XTP4・XTP6 の違い</h2>
          <a href="xtp-compare/" className="text-[13px] text-[#1B7670] hover:text-[#0F4B47] hover:underline">スマホ向けの詳しい比較表 ›</a>
        </div>
        <p className="text-[13px] text-gray-600 mb-5">PC をつけっぱなしにできるか、スマホで使いたいか、公式 API を使いたいかで決まります（2026 年 10 月時点）。</p>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left py-3 px-3 w-1/4 border-b border-gray-200"></th>
                {cols.map((c) => (
                  <th key={c.id} className={"text-left py-3 px-3 align-top border-b border-gray-200 " + (c.recommended ? "bg-[#FBEDD9]" : "")}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: c.color }}></span>
                      <span className="font-bold text-[#0F1111]">{c.name}</span>
                      {c.recommended && <span className="bg-[#7A4A20] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>}
                    </div>
                    <div className="text-[20px] font-medium text-[#0F1111] tabular-nums leading-none">{c.price}</div>
                    <div className="text-[12px] text-gray-600 mt-1">{c.sub}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, vals]) => (
                <tr key={label} className="border-b border-gray-100">
                  <td className="py-3 px-3 text-gray-800 font-medium">{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} className={"py-3 px-3 text-gray-800 " + (cols[i].recommended ? "bg-[#FBEDD9]" : "")}>
                      {v === '必要' ? <span className="inline-block bg-[#D92D20] text-white text-[12px] font-bold px-2 py-0.5 rounded">必要</span>
                        : v === '—' ? <span className="text-gray-300 text-[16px]">—</span>
                        : v}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-3 px-3"></td>
                {cols.map((c) => (
                  <td key={c.id} className={"py-3 px-3 " + (c.recommended ? "bg-[#FBEDD9]" : "")}>
                    <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener' } : {})} className={"inline-flex items-center h-8 px-3 rounded-full text-[12px] font-medium border " +
                      (c.recommended
                        ? "bg-[#C2533C] hover:bg-[#A8432F] border-[#A8432F] text-[#FBEDD9]"
                        : "bg-white hover:bg-gray-50 border-gray-300 text-[#0F1111]")}>
                      {c.recommended ? '無料で始める' : '製品ページへ'}
                    </a>
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
    { n: '01', title: '各ツールのページで購入・無料登録', body: '買い切りの XToolsPro3 は Stripe 決済。XToolsPro6／XToolsPro4 は Google アカウントで無料登録。ThreadsToolsPro2 は購入登録のあとマニュアルへ。' },
    { n: '02', title: '手順書を見ながら設定', body: 'セットアップの手順書は手順書サイトに。XToolsPro6 は最初の X アカウント登録だけ PC の Chrome が必要です。' },
    { n: '03', title: '困ったらお問い合わせ', body: 'お問い合わせフォームから。開発者本人が返信します。' },
  ];
  return (
    <section className="mx-auto max-w-[1500px] px-3 mt-10">
      <div className="bg-white rounded-sm p-6">
        <h2 className="text-[22px] font-bold text-[#0F1111] mb-5">購入してからの流れ</h2>
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
        <div className="mt-5 flex flex-wrap gap-3 text-[13px]">
          <a href={DOCS} target="_blank" rel="noopener" className="text-[#1B7670] hover:text-[#0F4B47] hover:underline">手順書サイト ›</a>
          <a href={CONTACT} target="_blank" rel="noopener" className="text-[#1B7670] hover:text-[#0F4B47] hover:underline">お問い合わせフォーム ›</a>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: '買い切りと月額、どちらを選べばいい？',
    a: 'PC をつけっぱなしにできて長く使うなら買い切りの XToolsPro3（¥9,800〜・月額なし）。スマホで使いたい、まず無料で試したいなら XToolsPro6（無料〜・有料は月 ¥1,000）。X の公式 API で動かしたいなら XToolsPro4（無料〜・有料は月 ¥1,000）。',
  },
  {
    q: 'アカウント凍結のリスクは？',
    a: 'どのツールも、投稿の間隔や 1 日の件数を安全側の既定値にしていますが、凍結しないことは保証できません。ご自身の運用ルールの範囲で件数と頻度を決めてください。XToolsPro4 と ThreadsToolsPro2 は各 SNS の公式 API で動きます。',
  },
  {
    q: 'スマホで使える？',
    a: 'XToolsPro6・XToolsPro4・ThreadsToolsPro2 はスマホのブラウザで使えます。XToolsPro6 は最初の X アカウント登録（auth_token の取り出し）だけ PC の Chrome が必要で、そのあとはスマホだけで使えます。XToolsPro3 は Windows アプリなので PC が必要です。',
  },
  {
    q: 'アカウント連携の手順は？',
    a: 'XToolsPro4 と ThreadsToolsPro2 は OAuth（公式のログイン画面）で連携します。ThreadsToolsPro2 は Meta の仕様で、連携する Threads アカウントを事前に「テスター」として招待する手順があります（マニュアルに記載）。XToolsPro3／6 は X の API を使わず、ブラウザのログイン情報で動きます。詳しくは手順書をご覧ください。',
  },
  {
    q: '支払い方法は？',
    a: 'XToolsPro3（買い切り）は Stripe のクレジットカード決済。XToolsPro6／XToolsPro4 の有料版はアプリ内で登録します。ThreadsToolsPro2 は決済ページ（theapps）からの月額です。',
  },
  {
    q: '困ったときの連絡先は？',
    a: 'お問い合わせフォームからご連絡ください。開発者本人が返信します。購入後のセットアップは手順書サイトにまとめています。',
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = React.useState(0);
  React.useEffect(() => {
    const m = location.hash.match(/^#faq-(\d)$/);
    if (m) setOpenIdx(Number(m[1]));
    const onHash = () => { const mm = location.hash.match(/^#faq-(\d)$/); if (mm) setOpenIdx(Number(mm[1])); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return (
    <section id="faq" className="mx-auto max-w-[1500px] px-3 mt-10 scroll-mt-4">
      <div className="bg-white rounded-sm p-6">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-[22px] font-bold text-[#0F1111]">よくある質問</h2>
          <a href={CONTACT} target="_blank" rel="noopener" className="text-[13px] text-[#1B7670] hover:text-[#0F4B47] hover:underline">ほかの質問はこちら ›</a>
        </div>
        <p className="text-[13px] text-gray-600 mb-5"><span className="tabular-nums">{FAQS.length}</span> 件</p>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {FAQS.map((item, i) => (
            <div key={item.q} id={'faq-' + i} className="border-b border-gray-100 pb-4 scroll-mt-4">
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
                  <p className="flex-1 text-[13px] text-gray-800 leading-[1.7]">{item.a}</p>
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
    <a href="#top" className="block bg-[#3A3128] hover:bg-[#4A4035] text-white text-center py-3.5 text-[13px] mt-10 transition-colors">
      ページの先頭へ戻る
    </a>
  );
}

function Footer() {
  const cols = [
    { title: 'ツール', items: [
      { l: 'XToolsPro3（買い切り）', href: 'xtp3/' },
      { l: 'XToolsPro6（無料〜）', href: XTP6_URL, ext: true },
      { l: 'XToolsPro4（公式 API）', href: 'xtp4/' },
      { l: 'ThreadsToolsPro2', href: TTP2_DOCS, ext: true },
      { l: 'XTP3・4・6 比較表', href: 'xtp-compare/' },
    ] },
    { title: '購入後', items: [
      { l: '手順書サイト', href: DOCS, ext: true },
      { l: 'お問い合わせフォーム', href: CONTACT, ext: true },
      { l: 'よくある質問', href: '#faq' },
    ] },
    { title: '開発者', items: [
      { l: 'note（Youパパ）', href: NOTE, ext: true },
      { l: 'X @Yu_PaPa_Life', href: 'https://x.com/Yu_PaPa_Life', ext: true },
      { l: '法人の方・開発者について（RAIJIN）', href: RAIJIN, ext: true },
    ] },
    { title: '表記', items: [
      { l: '特定商取引法に基づく表記', href: TOKUSHOHO, ext: true },
    ] },
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
                  <li key={it.l}><a href={it.href} {...(it.ext ? { target: '_blank', rel: 'noopener' } : {})} className="hover:underline">{it.l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="border-gray-700/60"/>
        <div className="mx-auto max-w-[1500px] px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-[16px] font-bold leading-none">Youパパツールマーケット</span>
          </a>
          <div className="text-[12px] text-gray-300">個人開発の SNS 運用ツールを、作った本人が販売・サポートしています。</div>
        </div>
      </div>
      <div className="bg-[#1F1B16]">
        <div className="mx-auto max-w-[1500px] px-6 py-8 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-gray-300 mb-3">
            <a href={TOKUSHOHO} target="_blank" rel="noopener" className="hover:underline">特定商取引法に基づく表記</a>
            <a href={CONTACT} target="_blank" rel="noopener" className="hover:underline">お問い合わせ</a>
            <a href={RAIJIN} target="_blank" rel="noopener" className="hover:underline">RAIJIN（法人向け）</a>
          </nav>
          <div className="text-[11px] text-gray-400">© 2026 Youパパツールマーケット</div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────

function App() {
  const [sort, setSort] = React.useState('featured');
  const [active, setActive] = React.useState([]);
  const toggle = (f) => setActive((a) => (f === null ? [] : a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));

  return (
    <div className="amz-app" id="top">
      <TopNav />
      <HeroBanner />
      <CategoryTiles />
      <ProductsSection sort={sort} setSort={setSort} active={active} toggle={toggle} />
      <ComparisonTable />
      <Steps />
      <FAQ />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
