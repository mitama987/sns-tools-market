// ─── 棚のカード（ダーク版モック専用・build_mock_dark.py が本番の ShelfCard と差し替える） ───
// 参考: chatgpt.site のモックのカード（紺〜黒・円弧と淡い光・等幅ラベル・枠だけの札・セリフの製品名・STARTING AT）
// ボタン 2 つ（無料で始める／有料版を購入する・単機能は製品ページを見る）とリンク先は本番と同じ。
// 「詳細を見る →」は足さない（有料版を購入する・製品ページを見ると同じ LP へのリンクが並ぶだけのため）。補足は (i) のまま。

const CARD_META = {
  xtp6:   { label: 'X / Mobile Web',        glow: '#2DD4BF', chips: ['予約投稿', '分析', 'AI投稿案'] },
  xtp4:   { label: 'X / Web App',           glow: '#A78BFA', chips: ['公式API', 'AI下書き', '予約投稿'] },
  xtp3:   { label: 'X / Windows',           glow: '#C9A96E', chips: ['Windows', '買い切り', '複数アカウント'] },
  ttp2:   { label: 'Threads / Web',         glow: '#A5A0C8', chips: ['公式API', '定期投稿', '複数アカウント'] },
  bsky:   { label: 'Bluesky / Spreadsheet', glow: '#3B82F6', chips: ['スプシ', 'PC不要', '買い切り'] },
  yay:    { label: 'Yay! / Chrome',         glow: '#D946A8', chips: ['Chrome拡張', 'フォロー', 'リプライ'] },
  fb:     { label: 'Facebook / Windows',    glow: '#3B6FD6', chips: ['Windows', 'いいね', '買い切り'] },
  ig:     { label: 'Instagram / Soon',      glow: '#E1306C', chips: ['準備中'] },
  ameblo: { label: 'Ameblo / Windows',      glow: '#3DBE7A', chips: ['Windows', 'いいね', '買い切り'] },
  note:   { label: 'note / Windows',        glow: '#41C9B4', chips: ['Windows', 'スキ', '買い切り'] },
};

const KIND_PILL = {
  free:    { text: 'Free to start', color: '#34D399' },
  buy:     { text: 'One time',      color: '#F59E0B' },
  monthly: { text: 'Monthly',       color: '#A3E635' },
  soon:    { text: 'Coming soon',   color: '#94A3B8' },
};

const startingAt = (p) => p.comingSoon ? '—'
  : p.kind === 'free' ? '無料〜'
  : p.kind === 'monthly' ? '月¥' + p.price.toLocaleString('ja-JP')
  : '¥' + p.price.toLocaleString('ja-JP') + (p.id === 'xtp3' ? '〜' : '');

function DarkTile({ p, glow }) {
  return (
    <div className="relative aspect-[16/10] rounded-[12px] overflow-hidden bg-[#0C1220] border border-white/[0.06]">
      <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 -top-[45%] w-[80%] aspect-square rounded-full blur-3xl" style={{ background: glow, opacity: p.comingSoon ? 0.15 : 0.35 }} />
      <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-[14%] w-[66%] aspect-square rounded-full border border-white/10" />
      <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[54%] w-[34%] aspect-square rounded-[20%] overflow-hidden ring-[3px] ring-white/80 shadow-[0_18px_40px_-10px_rgba(0,0,0,.85)] -rotate-[4deg] " + (p.comingSoon ? 'grayscale opacity-60' : '')}>
        <img src={B(`thumbs/${p.id}.webp`)} alt="" loading="lazy" className="w-full h-full object-cover block" />
      </div>
    </div>
  );
}

function ShelfCard({ p }) {
  const [info, setInfo] = React.useState(false);
  const m = CARD_META[p.id] || { label: p.sns, glow: '#64748B', chips: [] };
  const pill = KIND_PILL[p.comingSoon ? 'soon' : p.kind];
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
    <article id={'p-' + p.id} className="relative flex flex-col h-full rounded-[16px] bg-[#0F1626] border border-white/[0.09] hover:border-white/25 transition-colors p-3 sm:p-4 scroll-mt-24" style={{ containerType: 'inline-size' }}>
      <a href={p.href || undefined} {...ext(p)} data-pid={p.id} data-cta="card_image" className={"relative block " + (p.comingSoon ? 'pointer-events-none' : '')} aria-label={p.name}>
        <DarkTile p={p} glow={m.glow} />
        {p.badges.length > 0 && (
          <span className="absolute top-2 left-2 flex flex-col items-start gap-1">
            {p.badges.map((b, i) => <span key={b} className={(i === 0 ? 'bg-[#C9A96E] text-[#0B0F1A]' : 'bg-[#0B0F1A]/70 text-[#E3C68A] ring-1 ring-[#C9A96E]/50') + ' text-[11px] font-bold px-2 py-0.5 rounded-sm'}>{b}</span>)}
          </span>
        )}
      </a>
      {/* 1 行目: 等幅ラベル ＋ 枠だけの札 */}
      <div className="flex items-center justify-between gap-2 mt-3.5">
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#8E99AF] truncate">{m.label}</span>
        <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0" style={{ color: pill.color, borderColor: pill.color + '66' }}>{pill.text}</span>
      </div>
      {/* 製品名（セリフ・1 行。長い名前ほど小さく＝カード幅と文字数から 18〜32px） */}
      <div className="mt-3 font-bold text-[#F1F4FA] leading-[1.15] whitespace-nowrap text-[24px]" style={{ fontFamily: '"Fraunces", "Noto Serif JP", serif', fontSize: `clamp(18px, ${(135 / p.short.length).toFixed(2)}cqw, 32px)`, letterSpacing: '-0.01em' }}>{p.short}</div>
      <p className="jp-phrase mt-2 text-[14px] text-[#A9B3C6] leading-[1.5] line-clamp-2 h-[3em]">{tagline}</p>
      <div className="mt-3 flex gap-1.5 overflow-hidden h-[26px]">
        {m.chips.map((c) => <span key={c} className="flex-shrink-0 whitespace-nowrap text-[12px] leading-[24px] px-2 rounded-md bg-white/[0.06] border border-white/10 text-[#C7CFDD]">{c}</span>)}
      </div>
      {/* 区切り線 → STARTING AT ＋ 価格 ／ 補足 (i) */}
      <div className="mt-3.5 pt-3 border-t border-white/10 flex items-end justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#7B869C]">Starting at</div>
          <div className="text-[22px] font-bold text-[#F1F4FA] tabular-nums leading-none mt-1.5">{startingAt(p)}</div>
        </div>
        <button type="button" onClick={() => setInfo(true)} aria-expanded={info} aria-label={p.short + ' の補足を見る'} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#7DD3FC] hover:text-[#BAE6FD]">
          補足を見る<span className="w-5 h-5 rounded-full border-[1.5px] border-current inline-flex items-center justify-center text-[11px] leading-none" style={{ fontFamily: 'Georgia, serif' }}>i</span>
        </button>
      </div>
      {/* ボタン 2 つ（リンク先・文言は本番と同じ） */}
      <div className="mt-auto pt-3.5 flex flex-col gap-2">
        {p.comingSoon ? (
          <span className="h-11 inline-flex items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-[#7B869C] text-[15px]">近日公開</span>
        ) : (
          <a href={p.ctaHref || p.href} {...ext(p)} data-pid={p.id} data-cta={p.ctaHref ? 'free' : 'product_page'} className="h-11 inline-flex items-center justify-center rounded-full bg-[#E6EAF2] hover:bg-white text-[#0B0F1A] text-[15px] font-bold transition-colors">{p.cta}</a>
        )}
        {p.secondary && (
          <a href={p.secondary.href} data-pid={p.id} data-cta="paid" className="h-11 inline-flex items-center justify-center rounded-full border border-white/25 hover:bg-white/[0.06] text-[#E6EAF2] text-[15px] font-medium transition-colors">{p.secondary.label}</a>
        )}
      </div>
      {/* 補足（カードの内側に重ねる） */}
      {info && (
        <div role="dialog" aria-label={p.short + ' の補足'} className="absolute inset-0 z-10 bg-[#0F1626] rounded-[16px] border border-[#7DD3FC]/60 p-4 flex flex-col overflow-y-auto">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="text-[20px] font-bold text-[#F1F4FA] leading-tight" style={{ fontFamily: '"Fraunces", "Noto Serif JP", serif' }}>{p.short}</div>
            <button type="button" onClick={() => setInfo(false)} aria-label="閉じる" className="flex-shrink-0 w-8 h-8 -mt-1 -mr-1 rounded-full hover:bg-white/10 text-[22px] leading-none text-[#A9B3C6]">×</button>
          </div>
          <dl className="text-[14px] leading-[1.6] space-y-2">
            {rows.map(([k, v]) => (
              <div key={k}><dt className="font-mono text-[11px] tracking-[0.12em] text-[#7DD3FC]">{k}</dt><dd className="text-[#E6EAF2]">{v}</dd></div>
            ))}
            <div>
              <dt className="font-mono text-[11px] tracking-[0.12em] text-[#7DD3FC]">{p.comingSoon ? 'いまの状況' : 'できること'}</dt>
              <dd><ul className="text-[#E6EAF2] space-y-0.5">{p.bullets.map((b) => <li key={b} className="flex gap-1.5"><span className="text-[#5C6780]">•</span><span>{b}</span></li>)}</ul></dd>
            </div>
          </dl>
        </div>
      )}
    </article>
  );
}

// ─── ツール一覧のマス（暗いマス＋アイコンだけ＋淡い色の光） ───
// サムネ（640px・淡い地＋アイコン＋製品名）からアイコン部分だけを見せる。
// 既定の切り抜き: x 165〜475・y 135〜445（10 枚の実測でアイコンはほぼ x 160〜480・y 135〜452）。ずれる製品は CARD_META に crop を足す
const ICON_CROP = { x: 165, y: 135, size: 310 };

function IndexTile({ p }) {
  const m = CARD_META[p.id] || { glow: '#64748B' };
  const c = m.crop || ICON_CROP;
  const k = 640 / c.size;
  return (
    <div className="relative w-full h-full bg-[#0C1220] border border-white/[0.06] rounded-[inherit] overflow-hidden">
      <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 -top-[55%] w-[110%] aspect-square rounded-full blur-2xl" style={{ background: m.glow, opacity: p.comingSoon ? 0.12 : 0.32 }} />
      <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[64%] aspect-square rounded-[22%] overflow-hidden shadow-[0_10px_24px_-8px_rgba(0,0,0,.8)] " + (p.comingSoon ? 'grayscale opacity-50' : '')}>
        <img src={B(`thumbs/${p.id}.webp`)} alt="" loading="lazy" className="absolute max-w-none block"
          style={{ width: (k * 100) + '%', left: (-c.x / c.size * 100) + '%', top: (-c.y / c.size * 100) + '%' }} />
      </div>
    </div>
  );
}
