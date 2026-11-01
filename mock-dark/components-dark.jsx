// Market ダーク版モック（mock-dark/・scripts/build_mock_dark.py で本番から生成）
// ver2.1（Amazon 風・walnut + persimmon + cream）の骨格と配色はそのまま。
// 足したもの: ① ステップアップ帯（無料の XTP6 → 強化版 XTP3）② SNS 別の棚（全ツールを値札つきで並べる）
//             ③ スマホの下部固定バー ④ XTP6 の料金・上限を一次ソース（27_XTP6 src/server/plan/limits.ts）に合わせる
// 架空のレビュー数・星・在庫・セール・カートは置かない。準備中は購入ボタンなし。
// サイト内のパスは B() を通す（モック時代は ../ を付けていた名残。本番は '' ）。

const BASE = '../'; // mock-dark/ から本番の thumbs/・各 LP を参照
const B = (p) => BASE + p;

const DOCS = 'https://xtools-docs-auth.web.app/';
const TOKUSHOHO = 'https://xtools-docs-auth.web.app/tokushoho.html';
const CONTACT = 'https://forms.gle/sDG46hdxTo9E4p4CA';
const NOTE = 'https://note.com/youpapalife';
const RAIJIN = 'https://raijin.youpapatools.com/';
const XTP6_URL = 'https://xtp6.youpapatools.com/?utm_source=market&utm_medium=hub';
const TTP2_DOCS = B('ttp2/'); // 2026-11-01 手順書を threadtoolspro2.vercel.app/docs → マーケットの /ttp2/ へ
const TTP2_LP = 'https://ttp2.youpapatools.com/'; // LP（2026-11-01 から新住所・アプリは threadtoolspro2.vercel.app のまま）
const XTP3_FREE = 'https://forms.gle/hyrb2QmFnnoU96VR6'; // XTP3 無料版のユーザー登録（Google フォーム・xtp3/ の LP と同じ）
const TTP2_FREE = 'https://docs.google.com/forms/d/e/1FAIpQLSc-kOUGYYU_PncqI7ncs_2FnGgj0pLuXrYtFnxnG-NScJSDKg/viewform'; // 無料版の登録フォーム（TTP2 の LP と同じ）
// 2026-11-01 ゆうさん: XTP6・XTP4・XTP3・TTP2 は「無料で始める」（登録）と「有料版を購入する」（LP の最初＝プランを選んでから買う）に分ける
const XTP6_FREE = 'https://xtp6.youpapatools.com/login?utm_source=market&utm_medium=hub'; // Google でログイン＝登録
const XTP4_FREE = 'https://xtoolspro4.vercel.app/sign-up';

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
    href: XTP6_URL, cta: '無料で始める', ctaHref: XTP6_FREE,
    secondary: { label: '有料版を購入する', href: XTP6_URL }, // 2026-11-01: 有料は 4 つとも LP の最初へ（ゆうさん「同じ動きで」）
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
    href: B('xtp4/'), cta: '無料で始める', ctaHref: XTP4_FREE,
    secondary: { label: '有料版を購入する', href: B('xtp4/') }, // 有料は LP の最初へ
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
    href: B('xtp3/'), cta: '無料で始める', ctaHref: XTP3_FREE,
    secondary: { label: '有料版を購入する', href: B('xtp3/') }, // 有料は LP の最初へ（プラン・アドオンを選んでから買う）
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
    href: TTP2_LP, cta: '無料で始める', ctaHref: TTP2_FREE,
    secondary: { label: '有料版を購入する', href: TTP2_LP }, // 2026-11-01 ゆうさん: 有料は決済へ直行せず LP の最初へ（XTP3 と同じ形）
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
      <rect x="1.5" y="1.5" width="19" height="19" rx="4" fill="#C9A96E"/>
      <path d="M6 15V7l3 5 3-5v8" fill="none" stroke="#14110E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="15.5" cy="15" r="1.2" fill="#14110E"/>
    </svg>
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
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }); el.classList.add('ring-2', 'ring-[#C9A96E]'); setTimeout(() => el.classList.remove('ring-2', 'ring-[#C9A96E]'), 1800); return; }
    }
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  };
  const sub = [
    { l: 'X', href: '#shelf-x' },
    { l: 'Threads・Bluesky・Yay!', href: '#shelf-text' },
    { l: 'Facebook・Instagram', href: '#shelf-meta' },
    { l: 'アメブロ・note', href: '#shelf-blog' },
    { l: 'XTP3・4・6 比較表', href: B('xtp-compare/') },
    { l: 'よくある質問', href: '#faq' },
  ];
  return (
    <header className="select-none">
      <div className="bg-[#050403] text-[#C9A96E] text-[11px] tracking-[0.2em] text-center py-1 uppercase">Mock · ダーク版（本番には未反映）</div>
      <div className="bg-[#0B0907] text-white text-[13px]">
        <div className="mx-auto max-w-[1500px] flex items-center gap-1 sm:gap-2 px-2 sm:px-3 h-[60px] overflow-hidden">
          <a href="#top" className="flex items-center gap-2 px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <Logo size={28} />
            <div className="flex flex-col leading-none gap-0.5">
              <span className="text-[13px] sm:text-[18px] font-bold tracking-tight whitespace-nowrap">Youパパツールマーケット</span>
              <span className="hidden sm:block text-[9px] text-[#A89C8A] tracking-[0.18em] uppercase">SNS Tools · {ON_SALE.length} items</span>
            </div>
          </a>

          <a href={RAIJIN} target="_blank" rel="noopener" className="hidden lg:flex items-end gap-1 px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
              <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>
            </svg>
            <div className="leading-tight">
              <div className="text-[11px] text-[#A89C8A]">法人の方は</div>
              <div className="text-[13px] font-bold">RAIJIN へ</div>
            </div>
          </a>

          <div className="flex-1 mx-2 min-w-0">
            <form onSubmit={onSearch} className="flex h-10 rounded overflow-hidden ring-1 ring-[#C9A96E]/40 focus-within:ring-2 focus-within:ring-[#C9A96E]" role="search">
              <label htmlFor="q" className="sr-only">ツールを探す</label>
              <input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="ツール名・SNS で探す（例: XTP6・アメブロ）"
                className="flex-1 min-w-0 px-3 text-[14px] bg-[#1A1612] text-[#F2EDE3] placeholder:text-[#8F8473] focus:outline-none" />
              <button type="submit" aria-label="検索" className="bg-[#C9A96E] hover:bg-[#B8955A] w-12 flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#14110E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </form>
          </div>

          <a href={DOCS} target="_blank" rel="noopener" className="hidden md:block px-2 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors flex-shrink-0">
            <div className="text-[11px] leading-tight text-[#A89C8A]">購入後の</div>
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

      <div className="bg-[#14110E] text-white text-[13px] border-b border-[#C9A96E]/30">
        <div className="mx-auto max-w-[1500px] flex items-center gap-1 px-2 h-10 overflow-x-auto whitespace-nowrap nav-scroll">
          <a href="#tools" className="flex items-center gap-1 px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors font-bold">
            <svg width="16" height="14" viewBox="0 0 24 18" fill="currentColor"><rect y="0" width="24" height="2"/><rect y="8" width="24" height="2"/><rect y="16" width="24" height="2"/></svg>
            すべてのツール
          </a>
          {sub.map((s) => (
            <a key={s.l} href={s.href} className={"px-3 py-1.5 rounded border border-transparent hover:border-white/60 transition-colors " + (s.hot ? 'text-[#E3C68A] font-medium' : '')}>{s.l}</a>
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
    <div className="bg-gradient-to-b from-[#14110E] to-transparent">
      <div className="mx-auto max-w-[1500px] px-3 pt-3">
        <div className="rounded-sm overflow-hidden bg-gradient-to-br from-[#0B0907] via-[#1E1913] to-[#0B0907] text-white border border-[#C9A96E]/30">
          <div className="flex flex-wrap items-end justify-between gap-4 px-6 py-6 md:px-10 md:py-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[#E3C68A] text-[11px] font-bold tracking-[0.24em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3C68A]"></span>
                作った本人が販売・サポート
              </div>
              <h1 className="text-[24px] md:text-[34px] font-bold leading-[1.2]">SNS運用を、<span className="text-[#E3C68A]">仕組み</span>に任せる。</h1>
              <p className="text-[13px] md:text-[14px] text-[#CFC6B6] mt-2">X・Threads・Bluesky・Yay!・Facebook・アメブロ・note の運用ツール <span className="font-bold text-white tabular-nums">{ON_SALE.length}</span> 種。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ツール一覧（早見表） ─────────────────────────────────────────────────

// 「ThreadsToolsPro2」→ 狭いときは「Threads／ToolsPro2」で折り返す（途中で切らない）
function ShortName({ s }) {
  const i = s.indexOf("ToolsPro");
  return i > 0 ? <>{s.slice(0, i)}<wbr />{s.slice(i)}</> : s;
}

function ToolIndex() {
  const label = (p) => p.comingSoon ? '準備中'
    : p.kind === 'free' ? '無料〜'
    : p.kind === 'monthly' ? '月¥' + p.price.toLocaleString('ja-JP')
    : '¥' + p.price.toLocaleString('ja-JP') + (p.id === 'xtp3' ? '〜' : '');
  const color = (p) => p.comingSoon ? 'text-[#6E6557]' : p.kind === 'free' ? 'text-[#D8C08A]' : 'text-[#F2EDE3]';
  return (
    <section id="tools" className="mx-auto max-w-[1500px] px-3 mt-3 scroll-mt-4">
      <div className="bg-[#17140F] rounded-sm border border-[#C9A96E]/20 p-4 md:p-6">
        <div className="flex items-baseline justify-between gap-2 mb-3 md:mb-4">
          <h2 className="text-[18px] md:text-[22px] font-bold text-[#F2EDE3]"><span className="eyebrow">The Collection</span>ツール一覧<span className="ml-2 text-[15px] text-[#8F8473] font-normal">{ON_SALE.length} 種＋準備中 1</span></h2>
        </div>
        {/* スマホ＝アイコン＋名前＋価格の 2 列リスト、sm〜＝タイル（lg は 1 行 10 個） */}
        <ul className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {PRODUCTS.map((p) => (
            <li key={p.id}>
              <a href={p.href || ('#p-' + p.id)} className="flex sm:block items-center gap-2 h-full rounded-sm bg-[#1C1813] hover:bg-[#2A231B] p-1.5 sm:text-center transition-colors">
                <div className="w-11 h-11 sm:w-auto sm:h-auto sm:aspect-square flex-shrink-0 rounded-sm overflow-hidden sm:mb-1.5"><Thumb p={p} small /></div>
                <div className="min-w-0">
                  <div className="text-[14px] font-bold text-[#F2EDE3] leading-tight sm:min-h-[2.5em]"><ShortName s={p.short} /></div>
                  <div className={"text-[15px] font-bold tabular-nums leading-tight mt-0.5 " + color(p)}>{label(p)}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── ② 棚（カップ麺棚: SNS ごとに値札つきで並べる） ───────────────────────

function Thumb({ p, small }) {
  if (p.thumbFallback) {
    const f = p.thumbFallback;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: f.bg }}>
        <div className="w-[38%] aspect-square rounded-[22%] flex items-center justify-center text-white font-bold shadow-lg" style={{ background: f.icon, fontSize: small ? 'clamp(18px,4vw,36px)' : 'clamp(28px,6vw,56px)' }}>{f.letter}</div>
        {!small && <div className="text-[13px] sm:text-[15px] font-bold text-[#1F3D26]">{f.label}</div>}
      </div>
    );
  }
  return <img src={B(`thumbs/${p.id}.webp`)} alt="" className={"w-full h-full object-cover block " + (p.comingSoon ? 'grayscale opacity-60' : '')} loading="lazy" />;
}

// 値札: 札（無料から／買い切り／月額）と価格だけ。補足は (i) へ
function PriceTag({ p }) {
  if (p.comingSoon) {
    return (
      <div className="rounded-sm border border-dashed border-[#3A3128] bg-[#1C1813] px-3 py-2.5">
        <span className="inline-block text-[13px] font-bold tracking-[0.06em] text-[#A89C8A] bg-[#2A231B] px-2 py-0.5 rounded-sm">準備中</span>
        <div className="mt-1.5 text-[28px] font-medium text-[#6E6557] leading-none">—</div>
      </div>
    );
  }
  const kindLabel = { free: '無料から', buy: '買い切り', monthly: '月額' }[p.kind];
  const kindColor = { free: '#2B7F72', buy: '#A8503A', monthly: '#3A6FC0' }[p.kind];
  return (
    <div className="rounded-sm border border-[#3A3128] bg-[#120F0B] pl-3 pr-2 py-2.5 border-l-4" style={{ borderLeftColor: kindColor }}>
      <span className="inline-block text-[13px] font-bold tracking-[0.06em] text-white px-2 py-0.5 rounded-sm" style={{ background: kindColor }}>{kindLabel}</span>
      <div className="mt-1.5 leading-none">
        {p.price === 0 ? (
          <span className="text-[28px] font-medium text-[#F2EDE3] tabular-nums">¥0<span className="text-[15px] ml-0.5">〜</span></span>
        ) : (
          <span className="text-[28px] font-medium text-[#F2EDE3] tabular-nums">
            <span className="text-[16px] align-top mr-0.5">¥</span>{p.price.toLocaleString('ja-JP')}
            {p.kind === 'monthly' && <span className="text-[14px] text-[#A89C8A] ml-0.5 font-normal">/月</span>}
            {p.id === 'xtp3' && <span className="text-[15px] ml-0.5">〜</span>}
          </span>
        )}
      </div>
    </div>
  );
}

// (i) ボタン: 押すと補足を出す
function InfoBtn({ onClick, label, open, dark }) {
  const base = "flex-shrink-0 w-7 h-7 rounded-full border-2 inline-flex items-center justify-center text-[14px] font-bold leading-none transition-colors ";
  const look = dark
    ? (open ? 'bg-[#C9A96E] text-[#14110E] border-[#C9A96E]' : 'border-white/80 text-white hover:bg-[#17140F]/10')
    : (open ? 'bg-[#C9A96E] border-[#C9A96E] text-[#14110E]' : 'border-[#D8C08A] text-[#D8C08A] hover:bg-[#2A231B]');
  return (
    <button type="button" onClick={onClick} aria-label={label} aria-expanded={!!open} title={label}
      className={base + look} style={{ fontFamily: 'Georgia, serif' }}>i</button>
  );
}

function ShelfCard({ p }) {
  const [info, setInfo] = React.useState(false);
  const tagline = p.name.split(' — ')[1] || '';
  React.useEffect(() => {
    if (!info) return;
    const esc = (e) => { if (e.key === 'Escape') setInfo(false); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [info]);
  const rows = [
    ['使う場所', p.env],
    !p.comingSoon && ['料金', p.priceNote],
    p.free && ['無料版', p.free.replace(/^無料版[:：]\s*/, '')],
  ].filter(Boolean);
  return (
    <article id={'p-' + p.id} className="relative bg-[#17140F] rounded-sm p-3 sm:p-4 border border-[#2E271F] hover:border-[#C9A96E]/50 transition-colors flex flex-col h-full scroll-mt-24">
      <a href={p.href || undefined} {...ext(p)} className={"relative block mb-3 " + (p.comingSoon ? 'pointer-events-none' : '')} aria-label={p.name}>
        <div className="rounded-sm overflow-hidden aspect-[4/3] bg-[#1C1813] ring-1 ring-[#C9A96E]/25"><Thumb p={p} /></div>
        {p.badges.length > 0 && (
          <span className="absolute top-2 left-2 flex flex-col items-start gap-1">
            {p.badges.map((b, i) => <span key={b} className={(i === 0 ? 'bg-[#C9A96E] text-[#14110E]' : 'bg-[#14110E]/85 text-[#E3C68A] ring-1 ring-[#C9A96E]/50') + ' text-[12px] font-bold px-2 py-0.5 rounded-sm'}>{b}</span>)}
          </span>
        )}
        {p.comingSoon && <span className="absolute inset-0 flex items-center justify-center"><span className="bg-[#0B0907]/80 text-white text-[14px] font-bold px-3 py-1 rounded-sm">準備中</span></span>}
      </a>
      {/* 名前＋何をするかの 1 行。高さを固定 → 値札がどのカードでも同じ高さに来る */}
      <div className="flex items-start gap-2 mb-2.5">
        <div className="min-w-0 flex-1">
          <div className="text-[18px] font-bold text-[#F2EDE3] leading-tight"><ShortName s={p.short} /></div>
          <div className="text-[14px] text-[#D6CCBB] leading-[1.5] mt-1 line-clamp-2 h-[3em]">{tagline}</div>
        </div>
        <InfoBtn onClick={() => setInfo(true)} label={p.short + ' の補足を見る'} open={info} />
      </div>
      <PriceTag p={p} />
      <div className="mt-auto pt-3 flex flex-col gap-2">
        {p.comingSoon ? (
          <span className="h-11 inline-flex items-center justify-center rounded-full bg-[#1F1A14] border border-[#2E271F] text-[#8F8473] text-[15px]">近日公開</span>
        ) : (
          <a href={p.ctaHref || p.href} {...ext(p)} className="h-11 inline-flex items-center justify-center rounded-full bg-[#C9A96E] hover:bg-[#B8955A] border border-[#B8955A] text-[#14110E] text-[15px] font-bold transition-colors">{p.cta}</a>
        )}
        {p.secondary && (
          <a href={p.secondary.href} className="h-11 inline-flex items-center justify-center rounded-full bg-transparent hover:bg-[#C9A96E]/10 border border-[#C9A96E]/60 text-[#E3C68A] text-[15px] font-medium transition-colors">{p.secondary.label}</a>
        )}
      </div>
      {/* 補足（カードの内側に重ねる＝スマホの横スクロール棚でも切れない） */}
      {info && (
        <div role="dialog" aria-label={p.short + ' の補足'} className="absolute inset-0 z-10 bg-[#17140F] rounded-sm border-2 border-[#D8C08A] p-4 flex flex-col overflow-y-auto">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="text-[17px] font-bold text-[#F2EDE3] leading-tight">{p.short}</div>
            <button type="button" onClick={() => setInfo(false)} aria-label="閉じる" className="flex-shrink-0 w-8 h-8 -mt-1 -mr-1 rounded-full hover:bg-[#1F1A14] text-[22px] leading-none text-[#A89C8A]">×</button>
          </div>
          <dl className="text-[14px] leading-[1.6] space-y-2">
            {rows.map(([k, v]) => (
              <div key={k}><dt className="text-[12px] font-bold text-[#D8C08A]">{k}</dt><dd className="text-[#EDE6D8]">{v}</dd></div>
            ))}
            <div>
              <dt className="text-[12px] font-bold text-[#D8C08A]">{p.comingSoon ? 'いまの状況' : 'できること'}</dt>
              <dd><ul className="text-[#EDE6D8] space-y-0.5">{p.bullets.map((b) => <li key={b} className="flex gap-1.5"><span className="text-[#6E6557]">•</span><span>{b}</span></li>)}</ul></dd>
            </div>
          </dl>
        </div>
      )}
    </article>
  );
}

function Shelf({ shelf, items }) {
  const wide = shelf.wide;
  const [pop, setPop] = React.useState(false);
  return (
    <section id={'shelf-' + shelf.id} className={"scroll-mt-4 min-w-0 " + (wide ? 'xl:col-span-2' : '')}>
      {/* 棚の札（説明は (i) で開く） */}
      <div className="flex items-center justify-between gap-3 bg-[#14110E] text-white rounded-t-sm px-4 py-2.5 border border-b-0 border-[#C9A96E]/30">
        <h3 className="text-[17px] font-bold">{shelf.title}</h3>
        <InfoBtn dark onClick={() => setPop(!pop)} open={pop} label={shelf.title + ' の説明'} />
      </div>
      {pop && <p className="bg-[#1F1A14] text-[14px] text-[#D8CDB8] px-4 py-2 border-x border-[#3A3128]">{shelf.pop}</p>}
      {/* 棚板 */}
      <div className="bg-[#100D0A] px-3 pt-3 pb-3 border border-t-0 border-[#C9A96E]/20 border-b-[3px] border-b-[#C9A96E]/70 rounded-b-sm">
        <div className={
          "shelf-scroll flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-3 px-3 pb-1 " +
          "sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:overflow-visible sm:grid-cols-2 " +
          (wide ? 'lg:grid-cols-3' : 'lg:grid-cols-2')
        }>
          {items.map((p) => (
            <div key={p.id} className="w-[78%] flex-shrink-0 snap-start sm:w-auto">
              <ShelfCard p={p} />
            </div>
          ))}
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
      <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-5">
        <aside className="hidden lg:block text-[15px]">
          <FilterGroup title="対応SNS" items={FILTERS.sns} active={active} toggle={toggle} />
          <FilterGroup title="料金の形" items={FILTERS.license} active={active} toggle={toggle} />
          <FilterGroup title="使う場所" items={FILTERS.env} active={active} toggle={toggle} />
          <div className="mt-6 rounded-sm bg-[#17140F] p-3 text-[14px] text-[#D6CCBB] leading-[1.6]">
            <div className="font-bold text-[#F2EDE3] mb-1">X のツールで迷ったら</div>
            <a href="#compare" className="text-[#D8C08A] hover:underline">3 ツールの違い</a> を見てください。
          </div>
        </aside>

        <div className="min-w-0">
          <div className="bg-[#17140F] rounded-sm px-4 py-3 mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[15px] text-[#BDB2A0]">
              <span className="text-[18px] text-[#F2EDE3] font-bold">SNS 運用ツール</span>
              <span className="ml-2 text-[#8F8473]"><span className="tabular-nums">{shown}</span> / <span className="tabular-nums">{ON_SALE.length}</span> 件</span>
              {active.length > 0 && <button type="button" onClick={() => toggle(null)} className="ml-3 text-[#D8C08A] hover:underline">絞り込みを解除</button>}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 min-w-0">
            {SHELVES.map((s) => {
              const items = PRODUCTS.filter((p) => p.shelf === s.id && pass(p));
              return items.length ? <Shelf key={s.id} shelf={s} items={items} /> : null;
            })}
          </div>
          {shown === 0 && (
            <div className="bg-[#17140F] rounded-sm p-6 text-[15px] text-[#BDB2A0]">この条件に合うツールはありません。<button type="button" onClick={() => toggle(null)} className="ml-2 text-[#D8C08A] hover:underline">絞り込みを解除</button></div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, items, active, toggle }) {
  return (
    <div className="mb-5">
      <h3 className="font-bold text-[#F2EDE3] text-[16px] mb-1.5">{title}</h3>
      <ul className="space-y-1">
        {items.map((it) => {
          const on = active.includes(it);
          const n = ON_SALE.filter(it.test).length;
          return (
            <li key={it.l}>
              <label className="flex items-center gap-2 cursor-pointer py-0.5">
                <input type="checkbox" checked={on} onChange={() => toggle(it)} className="accent-[#C9A96E] w-4 h-4"/>
                <span className={"flex-1 " + (on ? "font-bold text-[#F2EDE3]" : "text-[#D8C08A] hover:text-[#F2DCA6]")}>
                  {it.l} <span className="text-[#8F8473] font-normal">({n})</span>
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
    { id: 'xtp6', name: 'XToolsPro6', price: '無料〜', sub: 'ベース 月¥3,000（年払いは月¥1,000）', color: '#E8463A', tag: 'まず試す', href: XTP6_URL, cta: '無料で始める', ctaShort: '始める' },
    { id: 'xtp3', name: 'XToolsPro3', price: '¥9,800〜', sub: '買い切り・月額なし', color: '#8C97AA', tag: '強化版', recommended: true, href: B('xtp3/'), cta: '製品ページへ', ctaShort: '詳しく' },
    { id: 'xtp4', name: 'XToolsPro4', price: '無料〜', sub: '有料 月¥1,000', color: '#2F6FD6', href: B('xtp4/'), cta: '製品ページへ', ctaShort: '詳しく' },
  ];
  // ○＝できる・△＝条件つき・×＝できない（同じ記号は同じ色）。記号の下に小さく補足
  const rows = [
    ['PC つけっぱなし不要', [['○'], ['×', 'PC をつけたまま動かす'], ['○']]],
    ['X の API キー不要', [['○'], ['○'], ['△', '有料版は自分のキー']]],
    ['スマホで使える', [['○', '最初の登録だけ PC'], ['×', 'Windows PC'], ['○']]],
    ['無料で試せる', [['○', '1 アカウント・1 日 10 件'], ['△', '定期投稿のみ・1 アカウント'], ['△', '1 日 1 件']]],
    ['複数アカウント', [['○', '20（プレミアム 100）'], ['○', '目安 100'], ['○', '50 まで']]],
    ['AI の投稿案', [['○'], ['○', '1,000pt つき'], ['○']]],
  ];
  const MARK = {
    '○': { color: '#7FC8B8', sr: 'できる' },
    '△': { color: '#E0B860', sr: '条件つき' },
    '×': { color: '#E08070', sr: 'できない' },
  };
  // 記号は SVG で描いて ○△× の線の太さをそろえる（文字の ○△ は × より細く見えるため・2026-11-01 ゆうさん）
  const SHAPE = {
    '○': <circle cx="12" cy="12" r="8.5" />,
    '△': <path d="M12 3.5 L21 19.5 H3 Z" />,
    '×': <path d="M5 5 L19 19 M19 5 L5 19" />,
  };
  const Mark = ({ m, size }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className="inline-block align-middle" fill="none" stroke={MARK[m].color}
      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={MARK[m].sr}>{SHAPE[m]}</svg>
  );
  const cell = 'border border-[#3A3128] py-2.5 px-1 sm:py-3 sm:px-4'; // スマホでも 3 列が 1 画面に収まるよう余白を詰める
  const head = 'bg-[#1F1A14]';
  const stick = '';
  const Pill = ({ c }) => (
    <span className="inline-flex items-center gap-1.5 font-bold text-[#F2EDE3]">
      <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: c.color }}></span>{c.name}
    </span>
  );
  return (
    <section id="compare" className="mx-auto max-w-[1500px] px-3 mt-10 scroll-mt-4">
      <div className="bg-[#17140F] rounded-sm p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <h2 className="text-[24px] font-bold text-[#F2EDE3]"><span className="eyebrow">Compare</span>X の 3 ツールの違い</h2>
          <a href={B('xtp-compare/')} className="text-[15px] text-[#D8C08A] hover:text-[#F2DCA6] hover:underline">スマホ向けの詳しい比較表 ›</a>
        </div>
        {/* 選び方の流れ（旧「X は、無料で試してから強化版へ」カードの代わり） */}
        <div className="mb-6 rounded-sm bg-[#1C1813] border border-[#3A3128] px-4 py-3.5 text-[16px] text-[#F2EDE3] leading-[1.8]">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>まずは<b>スマホで無料・ライトに</b>始めて</span><Pill c={cols[0]} />
            <span className="text-[#C9A96E] font-bold" aria-hidden="true">→</span>
            <span>物足りなくなったら<b>PC でがっつり複数アカウント運用</b></span><Pill c={cols[1]} />
          </div>
          <div className="mt-1 text-[15px] text-[#BDB2A0]">X の公式 API で動かしたい人は <Pill c={cols[2]} /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-[14px] sm:text-[16px] border-collapse" style={{ wordBreak: "auto-phrase" }}>
            <thead>
              <tr>
                <th className={cell + ' ' + head + stick + ' w-[25%] sm:w-[22%]'}></th>
                {cols.map((c) => (
                  <th key={c.id} className={cell + ' ' + head + ' text-center align-top'}>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-1.5">
                      <span className="inline-flex items-center gap-1.5 font-bold text-[#F2EDE3] text-[12px] sm:text-[16px]"><span className="hidden sm:inline-block w-2.5 h-2.5 rounded-sm" style={{ background: c.color }}></span>{c.name}</span>
                      {c.tag && <span className={"text-[11px] sm:text-[12px] font-bold px-1.5 py-0.5 rounded " + (c.recommended ? 'bg-[#C9A96E] text-[#14110E]' : 'ring-1 ring-[#C9A96E]/50 text-[#E3C68A]')}>{c.tag}</span>}
                    </div>
                    <div className="text-[17px] sm:text-[24px] font-medium text-[#F2EDE3] tabular-nums leading-none">{c.price}</div>
                    <div className="text-[11px] sm:text-[14px] text-[#BDB2A0] font-normal mt-1.5 leading-snug">{c.sub}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, vals]) => (
                <tr key={label}>
                  <th scope="row" className={cell + ' ' + head + stick + ' text-right font-bold text-[#F2EDE3] text-[12px] sm:text-[16px] leading-snug'}>{label}</th>
                  {vals.map(([m, note], i) => (
                    <td key={i} className={cell + ' text-center align-middle'}>
                      <div className="leading-none"><Mark m={m} size={26} /></div>
                      {note && <div className="text-[11px] sm:text-[13px] text-[#BDB2A0] mt-1.5 leading-snug">{note}</div>}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row" className={cell + ' ' + head + stick}></th>
                {cols.map((c) => (
                  <td key={c.id} className={cell + " text-center"}>
                    <a href={c.href} className={"inline-flex items-center justify-center min-h-10 px-2 sm:px-4 py-1 rounded-full text-[12px] sm:text-[15px] leading-tight font-bold border " +
                      (c.recommended ? "bg-[#C9A96E] hover:bg-[#B8955A] border-[#B8955A] text-[#14110E]" : "bg-[#17140F] hover:bg-[#1F1A14] border-[#3A3128] text-[#F2EDE3]")}><span className="sm:hidden">{c.ctaShort}</span><span className="hidden sm:inline">{c.cta}</span></a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[14px] text-[#A89C8A] mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {Object.entries(MARK).map(([m, v]) => <span key={m} className="inline-flex items-center gap-1"><Mark m={m} size={16} />{v.sr}</span>)}
          <span className="text-[#8F8473]">2026 年 10 月時点</span>
        </p>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────

function Steps() {
  const steps = [
    { n: '01', title: '各ツールのページで購入・無料登録', body: 'カード・銀行振込に対応' },
    { n: '02', title: 'メールの手順書を見て設定', body: '購入するとすぐ届きます' },
    { n: '03', title: '困ったらお問い合わせ', body: '開発者本人が返信します' },
  ];
  const Arrow = () => (
    <div className="flex items-center justify-center text-[#C9A96E]" aria-hidden="true">
      <svg className="rotate-90 md:rotate-0" width="22" height="26" viewBox="0 0 22 26"><path d="M3 2 L20 13 L3 24 Z" fill="currentColor"/></svg>
    </div>
  );
  return (
    <section className="mx-auto max-w-[1500px] px-3 mt-10">
      <div className="bg-[#17140F] rounded-sm p-5 md:p-6">
        <h2 className="text-[24px] font-bold text-[#F2EDE3] mb-5"><span className="eyebrow">How it works</span>購入してからの流れ</h2>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 md:gap-4 items-stretch">
          {steps.map((s, i) => (
            <React.Fragment key={s.n}>
              {i > 0 && <Arrow />}
              <div className="flex gap-4 items-center rounded-sm bg-[#1C1813] border border-[#3A3128] px-4 py-4">
                <div className="text-[40px] font-light text-[#C9A96E] leading-none tabular-nums" style={{fontFamily: 'Fraunces, Georgia, serif'}}>{s.n}</div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#F2EDE3] leading-snug">{s.title}</h3>
                  <p className="text-[15px] text-[#BDB2A0] mt-0.5">{s.body}</p>
                </div>
              </div>
            </React.Fragment>
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
  { q: '支払い方法は？', a: '買い切り（XToolsPro3・各 ¥3,000 のツール）と、XToolsPro4・ThreadsToolsPro2 の月額は Stripe でクレジットカードなどに対応しています（買い切りは銀行振込も可）。XToolsPro6 の有料版はアプリ内で登録します。' },
  { q: '困ったときの連絡先は？', a: 'お問い合わせフォームからご連絡ください。開発者本人が返信します。購入後のセットアップは手順書にまとめています。' },
];

function FAQ() {
  const [openIdx, setOpenIdx] = React.useState(-1); // 最初は全部閉じる
  React.useEffect(() => {
    const pick = () => { const m = location.hash.match(/^#faq-(\d)$/); if (m) setOpenIdx(Number(m[1])); };
    pick();
    window.addEventListener('hashchange', pick);
    return () => window.removeEventListener('hashchange', pick);
  }, []);
  return (
    <section id="faq" className="mx-auto max-w-[1500px] px-3 mt-10 scroll-mt-4">
      <div className="bg-[#17140F] rounded-sm p-5 md:p-6">
        <div className="max-w-[960px] flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <h2 className="text-[24px] font-bold text-[#F2EDE3]"><span className="eyebrow">Need to know</span>よくある質問</h2>
          <a href={CONTACT} target="_blank" rel="noopener" className="text-[15px] text-[#D8C08A] hover:text-[#F2DCA6] hover:underline">ほかの質問はこちら ›</a>
        </div>
        <ul className="max-w-[960px] space-y-2.5">
          {FAQS.map((item, i) => {
            const open = openIdx === i;
            return (
              <li key={item.q} id={'faq-' + i} className={"rounded-sm border scroll-mt-4 " + (open ? 'border-[#C9A96E]' : 'border-[#3A3128]')}>
                <button type="button" onClick={() => setOpenIdx(open ? -1 : i)} aria-expanded={open}
                  className={"w-full flex items-center justify-between gap-3 text-left px-4 py-3.5 hover:bg-[#1C1813] " + (open ? 'bg-[#1C1813]' : '')}>
                  <span className="flex gap-2.5 items-start">
                    <span className="text-[#C9A96E] font-bold text-[17px] leading-snug select-none">Q</span>
                    <span className="text-[16px] text-[#F2EDE3] font-bold leading-snug">{item.q}</span>
                  </span>
                  <svg className={"flex-shrink-0 text-[#8F8473] transition-transform " + (open ? 'rotate-180' : '')} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {open && (
                  <div className="flex gap-2.5 items-start px-4 py-3.5 border-t border-[#3A3128] bg-[#120F0B]">
                    <span className="text-[#D8C08A] font-bold text-[17px] leading-snug select-none">A</span>
                    <p className="flex-1 text-[15px] text-[#EDE6D8] leading-[1.8]">{item.a}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────

function Footer() {
  // 中身は assets/js/market-footer.js（全 LP 共通・1 か所で直す）
  return (
    <div>
      <a href="#top" className="block bg-[#100D0A] hover:bg-[#1A1612] text-[#E3C68A] border-t border-[#C9A96E]/30 tracking-[0.12em] text-center py-3.5 text-[13px] mt-10 transition-colors">ページの先頭へ戻る</a>
      <div dangerouslySetInnerHTML={{ __html: window.MarketFooter ? window.MarketFooter.html() : '' }} />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────

function App() {
  const [active, setActive] = React.useState([]);
  const toggle = (f) => setActive((a) => (f === null ? [] : a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));
  return (
    <div className="amz-app" id="top">
      <TopNav />
      <HeroBanner />
      <ToolIndex />
      <ProductsSection active={active} toggle={toggle} />
      <ComparisonTable />
      <Steps />
      <FAQ />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

/*
Version History
- ver1.0 (2026-11-01): ダーク版モック（黒×シャンパンゴールド×罫線・見出しは明朝）。本番 ver3.10 から生成
*/
