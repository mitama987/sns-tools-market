// Market v3 モック（2026-10-31）
// ver2.1（Amazon 風・walnut + persimmon + cream）の骨格と配色はそのまま。
// 足したもの: ① ステップアップ帯（無料の XTP6 → 強化版 XTP3）② SNS 別の棚（全ツールを値札つきで並べる）
//             ③ スマホの下部固定バー ④ XTP6 の料金・上限を一次ソース（27_XTP6 src/server/plan/limits.ts）に合わせる
// 架空のレビュー数・星・在庫・セール・カートは置かない。準備中は購入ボタンなし。
// ★ モックは /mock-v3/ に置くので、サイト内のパスは B() で ../ を付ける。

const BASE = '../';
const B = (p) => BASE + p;

const DOCS = 'https://xtools-docs-auth.web.app/';
const TOKUSHOHO = 'https://xtools-docs-auth.web.app/tokushoho.html';
const CONTACT = 'https://forms.gle/sDG46hdxTo9E4p4CA';
const NOTE = 'https://note.com/youpapalife';
const RAIJIN = 'https://raijin.youpapatools.com/';
const XTP6_URL = 'https://xtp6.youpapatools.com/?utm_source=market&utm_medium=hub';
const TTP2_DOCS = 'https://threadtoolspro2.vercel.app/docs';
const TTP2_BUY = 'https://page.theapps.jp/paid/join/H8hv3G40M25l77c8';

// 価格の一次情報: XTP3＝xtp3/index.html（¥9,800〜・フル ¥29,800）、XTP6＝27_XTP6 limits.ts（無料 1 垢・1 日 10 件／ベース 月¥3,000・年¥12,000・20 垢／プレミアム 100 垢）、
// XTP4＝xtp-compare、TTP2＝theapps、単機能ツール＝10/24 決定の ¥3,000 税込・買い切り（.docs/market-other-tools-lp-stripe.md）
const PRODUCTS = [
  // ── X の棚 ──
  {
    id: 'xtp6', shelf: 'x', sns: 'X',
    name: 'XToolsPro6 — スマホのブラウザで予約投稿・分析・AI 投稿案',
    short: 'XToolsPro6',
    env: 'Web（最初の X アカウント登録だけ PC）',
    bullets: ['予約投稿・オート投稿・伸びた投稿の分析・AI の投稿案', 'PC つけっぱなし不要。X の API 不要', 'ベースは X アカウント 20 個（プレミアム 100）'],
    kind: 'free', price: 0, priceNote: 'ベース 月¥3,000（年払いは月¥1,000）',
    free: '無料版: 1 アカウント・1 日 10 件',
    badges: ['まずはここから'],
    href: XTP6_URL, external: true, cta: '無料で始める',
    mobile: true, noPc: true, noApi: true,
  },
  {
    id: 'xtp4', shelf: 'x', sns: 'X',
    name: 'XToolsPro4 — X 公式 API で動く、AI 下書き対応の Web アプリ',
    short: 'XToolsPro4',
    env: 'Web（スマホ可）',
    bullets: ['画像・動画つき予約投稿・コミュニティ投稿', '勝ちパターン分析と AI 下書き', 'X 公式 API（有料版は自分の API キー）'],
    kind: 'free', price: 0, priceNote: '有料は月¥1,000',
    free: '無料版: 1 日 1 件',
    badges: [],
    href: B('xtp4/'), cta: '製品ページを見る',
    mobile: true, noPc: true,
  },
  {
    id: 'xtp3', shelf: 'x', sns: 'X',
    name: 'XToolsPro3 — X 運用の強化版・買い切り（Windows）',
    short: 'XToolsPro3',
    env: 'Windows PC（つけっぱなし）',
    bullets: ['複数アカウント・全基本機能が無制限', 'アカウント分析・シャドウバンチェック', 'AI 1,000pt＋お好きなアドオン 1 つつき'],
    kind: 'buy', price: 9800, priceNote: '月額なし。フルパック ¥29,800',
    free: '無料版あり（定期投稿・1 アカウント）',
    badges: ['強化版', 'ベストセラー'],
    href: B('xtp3/'), cta: '製品ページを見る',
    win: true, noApi: true,
  },
  // ── Threads・Bluesky・Yay! の棚 ──
  {
    id: 'ttp2', shelf: 'text', sns: 'Threads',
    name: 'ThreadsToolsPro2 — Threads 公式 API で予約・定期・ランダム投稿',
    short: 'ThreadsToolsPro2',
    env: 'Web（24 時間稼働・PC 不要）',
    bullets: ['定期（キュー周回）・予約・ランダム投稿', '複数アカウント・アカウント単位のプロキシ', 'スプレッドシート・CSV の一括取込'],
    kind: 'monthly', price: 1000, priceNote: '月額（税込）',
    free: null,
    badges: [],
    href: TTP2_DOCS, external: true, cta: '使い方と登録を見る',
    secondary: { label: '購入登録へ進む', href: TTP2_BUY },
    mobile: true, noPc: true,
  },
  {
    id: 'bsky', shelf: 'text', sns: 'Bluesky',
    name: 'BskyToolsPro2 — Bluesky の予約・定期投稿（スプレッドシート）',
    short: 'BskyToolsPro2',
    env: 'Google スプレッドシート（PC 不要）',
    bullets: ['スプレッドシートに書くだけで予約・定期投稿', 'Google のサーバーで動くので PC は閉じて OK', '手順書（初期設定・機能別・Q&A）つき'],
    kind: 'buy', price: 3000, priceNote: '買い切り（税込）',
    free: null,
    badges: [],
    href: B('bluesky/'), cta: '製品ページを見る',
    noPc: true,
  },
  {
    id: 'yay', shelf: 'text', sns: 'Yay!',
    name: 'YayToolsPro — Yay! のフォロー・リプライを時短（Chrome 拡張）',
    short: 'YayToolsPro',
    env: 'PC の Chrome（拡張機能）',
    bullets: ['気になるユーザーをまとめてフォロー', 'ユーザーのフォロワーをフォロー', 'リプライの時短（拡張 3 本セット）'],
    kind: 'buy', price: 3000, priceNote: '買い切り（税込）',
    free: null,
    badges: [],
    href: B('yay/'), cta: '製品ページを見る',
  },
  // ── Facebook・Instagram の棚 ──
  {
    id: 'fb', shelf: 'meta', sns: 'Facebook',
    name: 'FacebookToolsPro — Facebook の交流づくりを時短（Windows）',
    short: 'FacebookToolsPro',
    env: 'Windows PC',
    bullets: ['投稿へのいいねを自動化して交流のきっかけに', '件数と間隔は自分で設定', '手順書 PDF・手順動画つき'],
    kind: 'buy', price: 3000, priceNote: '買い切り（税込）',
    free: null,
    badges: [],
    href: B('fb-like/'), cta: '製品ページを見る',
    win: true,
  },
  {
    id: 'ig', shelf: 'meta', sns: 'Instagram',
    name: 'InstagramToolsPro — Instagram 運用ツール',
    short: 'InstagramToolsPro',
    env: '準備中',
    bullets: ['いまの Instagram の仕様に合わせて作り直しています', '公開したら X とメルマガでお知らせします'],
    comingSoon: true,
    badges: [],
  },
  // ── ブログの棚 ──
  {
    id: 'ameblo', shelf: 'blog', sns: 'アメブロ',
    name: 'AmebloToolsPro — アメブロの読者さんとの交流を時短（Windows）',
    short: 'AmebloToolsPro',
    env: 'Windows PC（最初に Ameba へログイン）',
    bullets: ['キーワードで見つけた記事にいいね', '1 日の件数と間隔を設定（既定 1 日 300 件）', '端末 1 台で使うライセンス'],
    kind: 'buy', price: 3000, priceNote: '買い切り（税込）',
    free: null,
    badges: ['新登場'],
    href: B('ameblo-like/'), cta: '製品ページを見る',
    win: true,
    thumbFallback: { bg: 'linear-gradient(135deg,#E9F7EC,#BFE6C8)', icon: '#2E9E4F', letter: 'A', label: 'AmebloToolsPro' },
  },
  {
    id: 'note', shelf: 'blog', sns: 'note',
    name: 'noteToolsPro — note のスキ・交流を時短（Windows）',
    short: 'noteToolsPro',
    env: 'Windows PC',
    bullets: ['note の記事へのスキを自動化', '件数と間隔は自分で設定', '初期設定の手順書・Q&A つき'],
    kind: 'buy', price: 3000, priceNote: '買い切り（税込）',
    free: null,
    badges: [],
    href: B('note-bot/'), cta: '製品ページを見る',
    win: true,
  },
];

const SHELVES = [
  { id: 'x', title: 'X（旧 Twitter）の棚', pop: '無料の XTP6 で始めて、本格的に回すなら強化版の XTP3。公式 API 派は XTP4。', wide: true, compare: true },
  { id: 'text', title: 'Threads・Bluesky・Yay! の棚', pop: 'Threads は公式 API の月額、Bluesky と Yay! は買い切り ¥3,000。', wide: true },
  { id: 'meta', title: 'Facebook・Instagram の棚', pop: 'Facebook は買い切り ¥3,000。Instagram は準備中。' },
  { id: 'blog', title: 'ブログの棚（アメブロ・note）', pop: 'どちらも買い切り ¥3,000。読者さんとの交流を時短。' },
];

const ON_SALE = PRODUCTS.filter((p) => !p.comingSoon);
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

// ─── モックの目印 ─────────────────────────────────────────────────────────

function MockStrip() {
  return (
    <div className="bg-[#FFE7A3] text-[#5A3B00] text-[12px] text-center py-1 px-3">
      モック（v3 案・2026-10-31）— 本番ではありません。新しいツールの製品ページはこれから作ります
    </div>
  );
}

// ─── Top navigation ───────────────────────────────────────────────────────

function TopNav() {
  const [q, setQ] = React.useState('');
  const onSearch = (e) => {
    e.preventDefault();
    const s = q.trim().toLowerCase();
    const hit = PRODUCTS.find((p) => (p.short + ' ' + p.sns + ' ' + p.name).toLowerCase().includes(s));
    if (hit) {
      const el = document.getElementById('p-' + hit.id);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }); el.classList.add('ring-2', 'ring-[#C2533C]'); setTimeout(() => el.classList.remove('ring-2', 'ring-[#C2533C]'), 1800); return; }
    }
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  };
  const sub = [
    { l: '★ 無料で始める（XTP6）', href: '#p-xtp6', hot: true },
    { l: '強化版・買い切り（XTP3）', href: '#p-xtp3' },
    { l: 'X', href: '#shelf-x' },
    { l: 'Threads・Bluesky・Yay!', href: '#shelf-text' },
    { l: 'Facebook・Instagram', href: '#shelf-meta' },
    { l: 'アメブロ・note', href: '#shelf-blog' },
    { l: 'XTP3・4・6 比較表', href: B('xtp-compare/') },
    { l: 'よくある質問', href: '#faq' },
  ];
  return (
    <header className="select-none">
      <div className="bg-[#1F1B16] text-white text-[13px]">
        <div className="mx-auto max-w-[1500px] flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-[60px] overflow-hidden">
          <a href="#top" className="flex items-center gap-2 px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <Logo />
            <div className="flex flex-col leading-none gap-0.5">
              <span className="text-[12px] sm:text-[16px] font-bold tracking-tight whitespace-nowrap">Youパパツールマーケット</span>
              <span className="hidden sm:block text-[9px] text-gray-300 tracking-[0.18em] uppercase">SNS Tools · {ON_SALE.length} items</span>
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

          <div className="flex-1 mx-2 min-w-0">
            <form onSubmit={onSearch} className="flex h-10 rounded overflow-hidden focus-within:ring-2 focus-within:ring-[#C2533C]" role="search">
              <label htmlFor="q" className="sr-only">ツールを探す</label>
              <input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="ツール名・SNS で探す（例: XTP6・アメブロ）"
                className="flex-1 min-w-0 px-3 text-[14px] text-[#0F1111] focus:outline-none" />
              <button type="submit" aria-label="検索" className="bg-[#C2533C] hover:bg-[#A8432F] w-12 flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBEDD9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
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

      <div className="bg-[#2D2620] text-white text-[13px]">
        <div className="mx-auto max-w-[1500px] flex items-center gap-1 px-2 h-10 overflow-x-auto whitespace-nowrap nav-scroll">
          <a href="#products" className="flex items-center gap-1 px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors font-bold">
            <svg width="16" height="14" viewBox="0 0 24 18" fill="currentColor"><rect y="0" width="24" height="2"/><rect y="8" width="24" height="2"/><rect y="16" width="24" height="2"/></svg>
            すべてのツール
          </a>
          {sub.map((s) => (
            <a key={s.l} href={s.href} className={"px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors " + (s.hot ? 'text-[#E8A87C] font-medium' : '')}>{s.l}</a>
          ))}
          <span className="flex-1"></span>
          <a href={NOTE} target="_blank" rel="noopener" className="px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors hidden lg:block">開発者の note</a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────

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
              <p className="text-[14px] md:text-[15px] text-gray-200 leading-[1.7] mb-5 max-w-[540px]">
                Youパパが個人で開発している SNS 運用ツール <span className="text-white font-bold tabular-nums">{ON_SALE.length}</span> 種を、SNS ごとの棚に値札つきで並べました。
                X・Threads・Bluesky・Yay!・Facebook・アメブロ・note。
              </p>
              <div className="flex flex-wrap gap-2">
                <a href={XTP6_URL} target="_blank" rel="noopener" className="inline-flex items-center justify-center h-10 px-6 rounded-sm bg-[#C2533C] hover:bg-[#A8432F] text-[#FBEDD9] text-[14px] font-medium border border-[#A8432F]">
                  XToolsPro6 を無料で始める
                </a>
                <a href="#products" className="inline-flex items-center justify-center h-10 px-6 rounded-sm bg-white/10 hover:bg-white/20 text-white text-[14px] font-medium border border-white/30">
                  全ツールの棚を見る
                </a>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-gray-300">
                <span>✓ 無料版は Google アカウントで即開始</span>
                <span>✓ 買い切りは Stripe 決済（カード・銀行振込）</span>
                <span>✓ 購入後は手順書とお問い合わせ窓口</span>
              </div>
            </div>

            <div className="relative hidden md:block h-[260px]" aria-hidden="true">
              <FloatCard className="top-0 right-8 rotate-[-4deg]" tool="XToolsPro6" title="予約投稿 10:00" tag="予約済" tagClass="bg-green-100 text-green-700" />
              <FloatCard className="top-12 right-32 rotate-[3deg]" tool="XToolsPro3" title="定期投稿 稼働中" tag="稼働中" tagClass="bg-green-100 text-green-700" />
              <FloatCard className="top-28 right-12 rotate-[-2deg]" tool="AmebloToolsPro" title="いいね 128 / 300" tag="次回 18:30" tagClass="bg-yellow-100 text-yellow-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatCard({ className, tool, title, tag, tagClass }) {
  return (
    <div className={"absolute w-44 h-32 bg-white rounded shadow-xl p-3 " + className}>
      <div className="text-[10px] text-gray-500 font-mono">{tool}</div>
      <div className="text-[13px] font-bold text-[#0F1111] mt-1">{title}</div>
      <div className="mt-2 space-y-1">
        <div className="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
        <div className="h-1.5 bg-gray-200 rounded-full w-full"></div>
        <div className="h-1.5 bg-gray-200 rounded-full w-2/3"></div>
      </div>
      <div className={"absolute bottom-2 right-2 px-1.5 py-0.5 text-[9px] rounded " + tagClass}>{tag}</div>
    </div>
  );
}

// ─── ① ステップアップ帯（無料の XTP6 → 強化版 XTP3） ─────────────────────

function StepUp() {
  const check = (t) => (
    <li key={t} className="flex gap-1.5"><span className="text-[#C2533C] font-bold">✓</span><span>{t}</span></li>
  );
  return (
    <section id="stepup" className="mx-auto max-w-[1500px] px-3 mt-3 relative z-10 scroll-mt-4">
      <div className="bg-white rounded-sm shadow-sm p-5 md:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h2 className="text-[20px] md:text-[22px] font-bold text-[#0F1111]">まずは無料で。慣れたら、強化版へ。</h2>
          <a href={B('xtp-compare/')} className="text-[13px] text-[#1B7670] hover:text-[#0F4B47] hover:underline">XTP3・4・6 の違いを表で見る ›</a>
        </div>
        <p className="text-[13px] text-gray-600 mb-7">X の自動化は、スマホで始められる XToolsPro6 がいちばん手軽です。アカウントや投稿を増やしたくなったら、買い切りの XToolsPro3 へ。</p>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-end">
          {/* STEP 1 */}
          <div className="rounded-sm border border-[#E3DACB] bg-[#FAF7F2] p-4 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-[0.12em] text-[#7A4A20]">STEP 1</span>
              <span className="text-[11px] text-gray-500">まず試す</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <img src={B('thumbs/xtp6.webp')} alt="" className="w-14 h-14 rounded-sm object-cover" />
              <div>
                <div className="text-[15px] font-bold text-[#0F1111] leading-tight">XToolsPro6 無料版</div>
                <div className="text-[24px] font-medium tabular-nums leading-none mt-1">¥0</div>
              </div>
            </div>
            <ul className="text-[12px] text-gray-700 space-y-1 mb-4">
              {['スマホのブラウザで、今日から', 'X アカウント 1 個・1 日 10 件まで', 'カード登録なし（Google でログイン）'].map(check)}
            </ul>
            <a href={XTP6_URL} target="_blank" rel="noopener" className="h-9 w-full inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-[#0F1111] text-[13px] font-medium">
              無料で始める
            </a>
          </div>

          {/* 矢印 */}
          <div className="flex md:flex-col items-center justify-center gap-2 text-[#C2533C] py-1 md:pb-24">
            <svg className="rotate-90 md:rotate-0" width="34" height="20" viewBox="0 0 34 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 10h28M22 3l8 7-8 7"/>
            </svg>
            <span className="text-[12px] font-bold whitespace-nowrap">物足りなくなったら</span>
          </div>

          {/* STEP 2（強化版・一段高く） */}
          <div className="relative rounded-sm border-2 border-[#C2533C] bg-[#FBEDD9] p-4 md:pt-5 shadow-md mt-3 md:mt-0">
            <span className="absolute -top-3 left-4 bg-[#A8392A] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm">強化版</span>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-[0.12em] text-[#7A4A20]">STEP 2</span>
              <span className="text-[11px] text-gray-600">本格的に回す</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <img src={B('thumbs/xtp3.webp')} alt="" className="w-14 h-14 rounded-sm object-cover" />
              <div>
                <div className="text-[15px] font-bold text-[#0F1111] leading-tight">XToolsPro3（買い切り）</div>
                <div className="text-[24px] font-medium tabular-nums leading-none mt-1"><span className="text-[14px] align-top mr-0.5">¥</span>9,800<span className="text-[13px] ml-0.5">〜</span></div>
              </div>
            </div>
            <ul className="text-[12px] text-gray-800 space-y-1 mb-3">
              {['複数アカウント・全基本機能が無制限', 'アカウント分析・シャドウバンチェック', 'AI 1,000pt＋お好きなアドオン 1 つつき', '月額なし。一度買えばずっと使える'].map(check)}
            </ul>
            <div className="text-[12px] text-[#5A3B1A] bg-white/70 rounded-sm px-2.5 py-1.5 mb-3 leading-[1.6]">
              XTP6 ベース（月払い ¥3,000）の<b>約 3 か月分</b>で、ずっと使えます。<br className="hidden sm:block"/>
              <span className="text-gray-600">※ Windows PC（つけっぱなし）が必要。スマホだけで続けたい方は XTP6 のベースへ。</span>
            </div>
            <a href={B('xtp3/')} className="h-10 w-full inline-flex items-center justify-center rounded-full bg-[#C2533C] hover:bg-[#A8432F] border border-[#A8432F] text-[#FBEDD9] text-[14px] font-medium">
              XToolsPro3 を見る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Category tiles row ───────────────────────────────────────────────────

function CategoryTiles() {
  const tiles = [
    {
      title: 'SNS から選ぶ', cta: 'すべての棚を見る', ctaHref: '#products',
      items: [
        { name: 'X', sub: '3 ツール', img: B('thumbs/tiles/tile-xtp6-icon.webp'), href: '#shelf-x' },
        { name: 'Threads・Bluesky・Yay!', sub: '3 ツール', img: B('thumbs/tiles/tile-ttp2-icon.webp'), href: '#shelf-text' },
        { name: 'Facebook・Instagram', sub: '1 ツール＋準備中', img: B('thumbs/fb.webp'), href: '#shelf-meta' },
        { name: 'アメブロ・note', sub: '2 ツール', img: B('thumbs/tiles/tile-note-icon.webp'), href: '#shelf-blog' },
      ],
    },
    {
      title: 'どれを選べばいい？', cta: 'XTP3・4・6 の比較表', ctaHref: B('xtp-compare/'),
      guide: [
        { k: 'スマホから無料で始めたい', v: 'XToolsPro6', href: '#p-xtp6', color: '#E8463A' },
        { k: 'PC で本格的に・月額なし', v: 'XToolsPro3（強化版）', href: '#p-xtp3', color: '#5A6578' },
        { k: 'Threads・Bluesky を回したい', v: 'TTP2／BskyToolsPro2', href: '#shelf-text', color: '#1F1B16' },
        { k: 'ブログや Facebook の交流を時短', v: '各 ¥3,000 の買い切り', href: '#shelf-blog', color: '#2E9E4F' },
      ],
    },
    {
      title: 'よくある質問', cta: 'すべて見る', ctaHref: '#faq',
      items: [
        { name: '買い切りと月額の違い', img: B('thumbs/faq/faq-pricing.webp'), href: '#faq-0' },
        { name: 'XTP6 から XTP3 へ', img: B('thumbs/faq/faq-link.webp'), href: '#faq-1' },
        { name: '凍結のリスクは？', img: B('thumbs/faq/faq-ban.webp'), href: '#faq-2' },
        { name: 'スマホで使える？', img: B('thumbs/faq/faq-phone.webp'), href: '#faq-3' },
      ],
    },
    { title: '無料で試す', cta: 'XToolsPro6 を無料で始める', ctaHref: XTP6_URL, external: true, hero: true },
  ];
  return (
    <div className="mx-auto max-w-[1500px] px-3 mt-3">
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
                <p className="text-[12px] text-gray-700 leading-[1.6]">XToolsPro6 の無料版は X アカウント 1 個・1 日 10 件まで、予約・オート投稿・分析・AI が使えます。XToolsPro4（1 日 1 件）と XToolsPro3（定期投稿）にも無料版があります。</p>
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

// ─── ② 棚（カップ麺棚: SNS ごとに値札つきで並べる） ───────────────────────

function Thumb({ p }) {
  if (p.thumbFallback) {
    const f = p.thumbFallback;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: f.bg }}>
        <div className="w-[38%] aspect-square rounded-[22%] flex items-center justify-center text-white font-bold shadow-lg" style={{ background: f.icon, fontSize: 'clamp(28px,6vw,56px)' }}>{f.letter}</div>
        <div className="text-[13px] sm:text-[15px] font-bold text-[#1F3D26]">{f.label}</div>
      </div>
    );
  }
  return <img src={B(`thumbs/${p.id}.webp`)} alt="" className={"w-full h-full object-cover block " + (p.comingSoon ? 'grayscale opacity-60' : '')} loading="lazy" />;
}

function PriceTag({ p }) {
  if (p.comingSoon) {
    return (
      <div className="rounded-sm border border-dashed border-gray-300 bg-[#FAF7F2] px-3 py-2">
        <div className="text-[10px] font-bold tracking-[0.12em] text-gray-500">COMING SOON</div>
        <div className="text-[20px] font-medium text-gray-500 leading-tight">準備中</div>
        <div className="text-[11px] text-gray-500">価格は公開時にお知らせします</div>
      </div>
    );
  }
  const kindLabel = { free: '無料から', buy: '買い切り', monthly: '月額' }[p.kind];
  const kindColor = { free: '#1B7670', buy: '#A8392A', monthly: '#2F6FD6' }[p.kind];
  return (
    <div className="rounded-sm border border-[#E3DACB] bg-[#FFFBF3] pl-3 pr-2 py-2 border-l-4" style={{ borderLeftColor: kindColor }}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold tracking-[0.1em] text-white px-1.5 py-0.5 rounded-sm" style={{ background: kindColor }}>{kindLabel}</span>
        {p.free && <span className="text-[10px] text-[#007600] font-medium">無料版あり</span>}
      </div>
      <div className="mt-1 leading-none">
        {p.price === 0 ? (
          <span className="text-[24px] font-medium text-[#0F1111] tabular-nums">¥0<span className="text-[13px] ml-0.5">〜</span></span>
        ) : (
          <span className="text-[24px] font-medium text-[#0F1111] tabular-nums">
            <span className="text-[14px] align-top mr-0.5">¥</span>{p.price.toLocaleString('ja-JP')}
            {p.kind === 'monthly' && <span className="text-[12px] text-gray-600 ml-0.5 font-normal">/月</span>}
            {p.id === 'xtp3' && <span className="text-[13px] ml-0.5">〜</span>}
          </span>
        )}
      </div>
      <div className="text-[11px] text-gray-700 mt-1 line-clamp-1">{p.priceNote}</div>
    </div>
  );
}

function ShelfCard({ p }) {
  return (
    <article id={'p-' + p.id} className="bg-white rounded-sm p-3 sm:p-4 hover:shadow-md transition-shadow flex flex-col h-full scroll-mt-24">
      <a href={p.href || undefined} {...ext(p)} className={"relative block mb-3 " + (p.comingSoon ? 'pointer-events-none' : '')} aria-label={p.name}>
        <div className="rounded-sm overflow-hidden aspect-[4/3] sm:aspect-square bg-[#FAF7F2]"><Thumb p={p} /></div>
        {p.badges.length > 0 && (
          <span className="absolute top-2 left-2 flex flex-col items-start gap-1">
            {p.badges.map((b, i) => <span key={b} className={(i === 0 ? 'bg-[#A8392A] text-[11px]' : 'bg-[#7A4A20] text-[10px]') + ' text-white font-bold px-1.5 py-0.5 rounded-sm'}>{b}</span>)}
          </span>
        )}
        {p.comingSoon && <span className="absolute inset-0 flex items-center justify-center"><span className="bg-[#1F1B16]/80 text-white text-[13px] font-bold px-3 py-1 rounded-sm">準備中</span></span>}
      </a>
      {/* 名前と使う場所は高さを固定 → 値札がどのカードでも同じ高さに来る */}
      <div className="text-[14px] text-[#0F1111] leading-[1.4] mb-1 line-clamp-2 font-medium h-[2.8em]">{p.name}</div>
      <div className="text-[12px] text-gray-600 mb-2 line-clamp-1">{p.sns} · {p.env}</div>
      <PriceTag p={p} />
      <div className="text-[11px] text-[#007600] mt-1 h-[1.5em] line-clamp-1">{p.free || ''}</div>
      <ul className="text-[12px] text-gray-700 space-y-0.5 mt-1 mb-3 leading-[1.55]">
        {p.bullets.map((b, i) => <li key={i} className="flex gap-1.5"><span className="text-gray-400">•</span><span>{b}</span></li>)}
      </ul>
      <div className="mt-auto flex flex-col gap-2">
        {p.comingSoon ? (
          <span className="h-9 inline-flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-500 text-[13px]">近日公開</span>
        ) : (
          <a href={p.href} {...ext(p)} className="h-9 inline-flex items-center justify-center rounded-full bg-[#C2533C] hover:bg-[#A8432F] border border-[#A8432F] text-[#FBEDD9] text-[13px] font-medium transition-colors">{p.cta}</a>
        )}
        {p.secondary && (
          <a href={p.secondary.href} target="_blank" rel="noopener" className="h-9 inline-flex items-center justify-center rounded-full bg-[#FBEDD9] hover:bg-[#F1DDB8] border border-[#3A2F25] text-[#1F1B16] text-[13px] font-medium transition-colors">{p.secondary.label}</a>
        )}
      </div>
    </article>
  );
}

// 棚のポップ（棚の空いた枠に置く案内カード・PC の xl だけ）
function ShelfPop({ shelf }) {
  return (
    <div className="hidden xl:flex flex-col justify-center rounded-sm border-2 border-dashed border-[#C2533C]/40 bg-[#FFF6E6] p-5 text-[13px] text-[#3A2F25] leading-[1.7]">
      <div className="text-[11px] font-bold tracking-[0.12em] text-[#A8392A] mb-2">店主のひとこと</div>
      <p className="mb-3">{shelf.pop}</p>
      {shelf.compare && <a href={B('xtp-compare/')} className="text-[#1B7670] hover:underline font-medium">XTP3・4・6 の比較表 ›</a>}
    </div>
  );
}

function Shelf({ shelf, items }) {
  const wide = shelf.wide;
  return (
    <section id={'shelf-' + shelf.id} className={"scroll-mt-4 min-w-0 " + (wide ? 'xl:col-span-2' : '')}>
      {/* 棚の札 */}
      <div className="flex items-center justify-between gap-3 bg-[#2D2620] text-white rounded-t-sm px-4 py-2">
        <h3 className="text-[15px] font-bold">{shelf.title}</h3>
        <span className="text-[12px] text-gray-300 tabular-nums whitespace-nowrap">{items.filter((p) => !p.comingSoon).length} ツール</span>
      </div>
      <p className="xl:hidden bg-[#FFF6E6] text-[12px] text-[#5A3B1A] px-4 py-1.5 border-x border-[#E3DACB]">{shelf.pop}</p>
      {/* 棚板 */}
      <div className="bg-[#EFE6D6] px-3 pt-3 pb-3 border-b-[6px] border-[#7A4A20] rounded-b-sm">
        <div className={
          "shelf-scroll flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-3 px-3 pb-1 " +
          "sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:overflow-visible sm:grid-cols-2 " +
          (wide ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-2')
        }>
          {items.map((p) => (
            <div key={p.id} className="w-[78%] flex-shrink-0 snap-start sm:w-auto">
              <ShelfCard p={p} />
            </div>
          ))}
          {wide && items.length < 4 && <ShelfPop shelf={shelf} />}
        </div>
      </div>
    </section>
  );
}

const FILTERS = {
  sns: ['X', 'Threads', 'Bluesky', 'Yay!', 'Facebook', 'アメブロ', 'note'].map((s) => ({ l: s, test: (p) => p.sns === s })),
  license: [
    { l: '買い切り', test: (p) => p.kind === 'buy' },
    { l: '無料版あり', test: (p) => !!p.free },
    { l: '月額', test: (p) => p.kind === 'monthly' || p.kind === 'free' },
  ],
  env: [
    { l: 'スマホで使える', test: (p) => !!p.mobile },
    { l: 'PC つけっぱなし不要', test: (p) => !!p.noPc },
    { l: 'Windows PC で使う', test: (p) => !!p.win },
  ],
};

function ProductsSection({ active, toggle }) {
  const pass = (p) => active.length === 0 || (!p.comingSoon && active.every((f) => f.test(p)));
  const shown = PRODUCTS.filter((p) => !p.comingSoon && pass(p)).length;
  return (
    <section id="products" className="mx-auto max-w-[1500px] px-3 mt-6 scroll-mt-4">
      <div className="pt-2 pb-2 text-[12px] text-gray-600">
        <a href="#top" className="text-[#1B7670] hover:text-[#0F4B47] hover:underline">ホーム</a>
        <span className="mx-1.5 text-gray-400">›</span>
        <span>SNS 運用ツールの棚</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        <aside className="hidden lg:block text-[13px]">
          <FilterGroup title="対応SNS" items={FILTERS.sns} active={active} toggle={toggle} />
          <FilterGroup title="料金の形" items={FILTERS.license} active={active} toggle={toggle} />
          <FilterGroup title="使う場所" items={FILTERS.env} active={active} toggle={toggle} />
          <div className="mt-6 rounded-sm bg-white p-3 text-[12px] text-gray-700 leading-[1.6]">
            <div className="font-bold text-[#0F1111] mb-1">迷ったら</div>
            X は <a href="#stepup" className="text-[#1B7670] hover:underline">無料の XTP6 → 強化版 XTP3</a> の順がおすすめ。違いは <a href={B('xtp-compare/')} className="text-[#1B7670] hover:underline">比較表</a> に。
          </div>
        </aside>

        <div className="min-w-0">
          <div className="bg-white rounded-sm px-4 py-3 mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200">
            <div className="text-[13px] text-gray-700">
              <span className="text-[14px] text-[#0F1111] font-bold">SNS 運用ツール</span>
              <span className="ml-2 text-gray-500"><span className="tabular-nums">{shown}</span> / <span className="tabular-nums">{ON_SALE.length}</span> 件（準備中 1）</span>
              {active.length > 0 && <button type="button" onClick={() => toggle(null)} className="ml-3 text-[#1B7670] hover:underline">絞り込みを解除</button>}
            </div>
            <div className="text-[12px] text-gray-600">値札の色: <span className="text-[#1B7670] font-bold">無料から</span>・<span className="text-[#A8392A] font-bold">買い切り</span>・<span className="text-[#2F6FD6] font-bold">月額</span></div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 min-w-0">
            {SHELVES.map((s) => {
              const items = PRODUCTS.filter((p) => p.shelf === s.id && pass(p));
              return items.length ? <Shelf key={s.id} shelf={s} items={items} /> : null;
            })}
          </div>
          {shown === 0 && (
            <div className="bg-white rounded-sm p-6 text-[13px] text-gray-700">この条件に合うツールはありません。<button type="button" onClick={() => toggle(null)} className="ml-2 text-[#1B7670] hover:underline">絞り込みを解除</button></div>
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
          const n = ON_SALE.filter(it.test).length;
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
    { id: 'xtp6', name: 'XToolsPro6', price: '無料〜', sub: 'ベース 月¥3,000（年払いは月¥1,000）', color: '#E8463A', tag: 'まず試す', href: XTP6_URL, external: true, cta: '無料で始める' },
    { id: 'xtp3', name: 'XToolsPro3', price: '¥9,800〜', sub: '買い切り・月額なし', color: '#5A6578', tag: '強化版', recommended: true, href: B('xtp3/'), cta: '製品ページへ' },
    { id: 'xtp4', name: 'XToolsPro4', price: '無料〜', sub: '有料 月¥1,000', color: '#2F6FD6', href: B('xtp4/'), cta: '製品ページへ' },
  ];
  const rows = [
    ['PC つけっぱなし', ['不要', '必要', '不要']],
    ['X の API', ['不要', '不要', '必要（有料版は自分のキー）']],
    ['スマホで使える', ['○（最初の登録だけ PC）', '—', '○']],
    ['無料版', ['1 アカウント・1 日 10 件', '定期投稿のみ（1 アカウント）', '1 日 1 件']],
    ['アカウント数', ['20 まで（プレミアム 100）', '目安 100', '50 まで']],
    ['AI の投稿案', ['○', '1,000pt つき', '○']],
  ];
  return (
    <section id="compare" className="mx-auto max-w-[1500px] px-3 mt-10">
      <div className="bg-white rounded-sm p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h2 className="text-[22px] font-bold text-[#0F1111]">X の 3 ツールの違い</h2>
          <a href={B('xtp-compare/')} className="text-[13px] text-[#1B7670] hover:text-[#0F4B47] hover:underline">スマホ向けの詳しい比較表 ›</a>
        </div>
        <p className="text-[13px] text-gray-600 mb-5">スマホで手軽に始めるなら XTP6、PC で本格的に・月額なしで回すなら XTP3、公式 API で動かしたいなら XTP4（2026 年 10 月時点）。</p>
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
                      {c.tag && <span className={"text-white text-[10px] font-bold px-1.5 py-0.5 rounded " + (c.recommended ? 'bg-[#A8392A]' : 'bg-[#7A4A20]')}>{c.tag}</span>}
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
                        : v === '—' ? <span className="text-gray-300 text-[16px]">—</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-3 px-3"></td>
                {cols.map((c) => (
                  <td key={c.id} className={"py-3 px-3 " + (c.recommended ? "bg-[#FBEDD9]" : "")}>
                    <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener' } : {})} className={"inline-flex items-center h-8 px-3 rounded-full text-[12px] font-medium border " +
                      (c.recommended ? "bg-[#C2533C] hover:bg-[#A8432F] border-[#A8432F] text-[#FBEDD9]" : "bg-white hover:bg-gray-50 border-gray-300 text-[#0F1111]")}>{c.cta}</a>
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
    { n: '01', title: '各ツールのページで購入・無料登録', body: '買い切り（XToolsPro3・各 ¥3,000 のツール）は Stripe 決済でカード・銀行振込に対応。XToolsPro6／XToolsPro4 は Google アカウントで無料登録。ThreadsToolsPro2 は購入登録のあとマニュアルへ。' },
    { n: '02', title: '届いたメールの手順書を見ながら設定', body: '購入するとダウンロードと手順書の案内がメールで届きます。XToolsPro6 は最初の X アカウント登録だけ PC の Chrome が必要です。' },
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
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────

const FAQS = [
  { q: '買い切りと月額、どちらを選べばいい？', a: 'X なら、まず無料の XToolsPro6 で試すのがおすすめです。アカウントや投稿を増やしたくなったら、PC をつけっぱなしにできる方は買い切りの XToolsPro3（¥9,800〜・月額なし）、スマホだけで続けたい方は XToolsPro6 のベース（月 ¥3,000・年払いは月 ¥1,000）。X 以外のツール（Bluesky・Yay!・Facebook・アメブロ・note）は各 ¥3,000 の買い切りです。' },
  { q: 'XToolsPro6 から XToolsPro3 に乗り換えられる？', a: 'はい。XToolsPro6 は無料版のまま残せるので、XToolsPro3 を買ってからしばらく並べて使い、慣れたら移る形がおすすめです。投稿データの自動引き継ぎはないので、XToolsPro3 には投稿文を入れ直してください（一括で入れるならスプレッドシート取込のアドオンが便利です）。' },
  { q: 'アカウント凍結のリスクは？', a: 'どのツールも、間隔や 1 日の件数を安全側の既定値にしていますが、凍結しないことは保証できません。ご自身の運用ルールの範囲で件数と頻度を決めてください。XToolsPro4 と ThreadsToolsPro2 は各 SNS の公式 API で動きます。' },
  { q: 'スマホで使える？', a: 'XToolsPro6・XToolsPro4・ThreadsToolsPro2 はスマホのブラウザで使えます（XToolsPro6 は最初の X アカウント登録だけ PC の Chrome）。BskyToolsPro2 はスプレッドシートなのでスマホからも書けます。XToolsPro3・FacebookToolsPro・AmebloToolsPro・noteToolsPro は Windows PC、YayToolsPro は PC の Chrome で使います。' },
  { q: '支払い方法は？', a: '買い切り（XToolsPro3・各 ¥3,000 のツール）は Stripe でクレジットカード・銀行振込などに対応しています。XToolsPro6／XToolsPro4 の有料版はアプリ内で登録します。ThreadsToolsPro2 は決済ページ（theapps）からの月額です。' },
  { q: '困ったときの連絡先は？', a: 'お問い合わせフォームからご連絡ください。開発者本人が返信します。購入後のセットアップは手順書にまとめています。' },
];

function FAQ() {
  const [openIdx, setOpenIdx] = React.useState(1);
  React.useEffect(() => {
    const pick = () => { const m = location.hash.match(/^#faq-(\d)$/); if (m) setOpenIdx(Number(m[1])); };
    pick();
    window.addEventListener('hashchange', pick);
    return () => window.removeEventListener('hashchange', pick);
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
              <button type="button" onClick={() => setOpenIdx(openIdx === i ? -1 : i)} aria-expanded={openIdx === i} className="w-full flex items-start justify-between gap-3 text-left">
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

// ─── Footer ───────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    { title: 'X のツール', items: [
      { l: 'XToolsPro6（無料〜）', href: XTP6_URL, ext: true },
      { l: 'XToolsPro3（強化版・買い切り）', href: B('xtp3/') },
      { l: 'XToolsPro4（公式 API）', href: B('xtp4/') },
      { l: 'XTP3・4・6 比較表', href: B('xtp-compare/') },
    ] },
    { title: 'ほかの SNS', items: [
      { l: 'ThreadsToolsPro2（Threads）', href: TTP2_DOCS, ext: true },
      { l: 'BskyToolsPro2（Bluesky）', href: B('bluesky/') },
      { l: 'YayToolsPro（Yay!）', href: B('yay/') },
      { l: 'FacebookToolsPro', href: B('fb-like/') },
      { l: 'AmebloToolsPro（アメブロ）', href: B('ameblo-like/') },
      { l: 'noteToolsPro（note）', href: B('note-bot/') },
    ] },
    { title: '購入後', items: [
      { l: '手順書サイト', href: DOCS, ext: true },
      { l: 'お問い合わせフォーム', href: CONTACT, ext: true },
      { l: 'よくある質問', href: '#faq' },
    ] },
    { title: '開発者・表記', items: [
      { l: 'note（Youパパ）', href: NOTE, ext: true },
      { l: 'X @Yu_PaPa_Life', href: 'https://x.com/Yu_PaPa_Life', ext: true },
      { l: '法人の方（RAIJIN）', href: RAIJIN, ext: true },
      { l: '特定商取引法に基づく表記', href: TOKUSHOHO, ext: true },
    ] },
  ];
  return (
    <footer className="text-white">
      <a href="#top" className="block bg-[#3A3128] hover:bg-[#4A4035] text-white text-center py-3.5 text-[13px] mt-10 transition-colors">ページの先頭へ戻る</a>
      <div className="bg-[#2D2620]">
        <div className="mx-auto max-w-[1500px] px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="font-bold text-[15px] mb-3">{c.title}</h3>
              <ul className="space-y-2 text-[13px] text-gray-300">
                {c.items.map((it) => <li key={it.l}><a href={it.href} {...(it.ext ? { target: '_blank', rel: 'noopener' } : {})} className="hover:underline">{it.l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <hr className="border-gray-700/60"/>
        <div className="mx-auto max-w-[1500px] px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2"><Logo /><span className="text-[16px] font-bold leading-none">Youパパツールマーケット</span></a>
          <div className="text-[12px] text-gray-300">個人開発の SNS 運用ツールを、作った本人が販売・サポートしています。</div>
        </div>
      </div>
      <div className="bg-[#1F1B16]">
        <div className="mx-auto max-w-[1500px] px-6 py-8 text-center text-[11px] text-gray-400">© 2026 Youパパツールマーケット</div>
      </div>
    </footer>
  );
}

// ─── ③ スマホの下部固定バー ───────────────────────────────────────────────

function MobileStickyCta() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#1F1B16]/95 backdrop-blur px-3 py-2 flex items-center gap-2 border-t border-white/10">
      <a href={XTP6_URL} target="_blank" rel="noopener" className="flex-1 h-11 inline-flex items-center justify-center rounded-full bg-[#C2533C] text-[#FBEDD9] text-[14px] font-bold">XToolsPro6 を無料で始める</a>
      <a href="#stepup" className="h-11 px-3 inline-flex flex-col items-center justify-center rounded-full border border-white/30 text-white text-[11px] leading-tight">
        <span>強化版</span><span className="font-bold">XTP3</span>
      </a>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────

function App() {
  const [active, setActive] = React.useState([]);
  const toggle = (f) => setActive((a) => (f === null ? [] : a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));
  return (
    <div className="amz-app pb-16 md:pb-0" id="top">
      <MockStrip />
      <TopNav />
      <HeroBanner />
      <StepUp />
      <CategoryTiles />
      <ProductsSection active={active} toggle={toggle} />
      <ComparisonTable />
      <Steps />
      <FAQ />
      <Footer />
      <MobileStickyCta />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

/*
Version History
- ver3.0-mock (2026-10-31): v3 のモック。ver2.1 の Amazon 風の骨格と配色はそのまま、①ステップアップ帯（無料の XTP6 → 強化版 XTP3）②SNS 別の棚（9 製品＋Instagram 準備中・値札の高さをそろえる・スマホは棚ごとに横スクロール）③スマホの下部固定バー ④XTP6 の料金・上限を 27_XTP6 limits.ts に合わせる（無料 1 垢・1 日 10 件／ベース 月¥3,000・年払い月¥1,000・20 垢／プレミアム 100）。FAQ に「XTP6 から XTP3 に乗り換えられる？」
*/
