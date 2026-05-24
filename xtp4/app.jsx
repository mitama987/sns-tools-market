const { useState, useEffect, useRef } = React;

// ---------- Icons (inline SVG, lucide-style) ----------
const Icon = ({ d, size = 20, stroke = 2, fill = "none", children, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
       fill={fill} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
    {children || (typeof d === "string" ? <path d={d} /> : d)}
  </svg>
);
const I = {
  Sparkles: (p) => <Icon {...p}><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m5.6 5.6 2.8 2.8"/><path d="m15.6 15.6 2.8 2.8"/><path d="m18.4 5.6-2.8 2.8"/><path d="m8.4 15.6-2.8 2.8"/></Icon>,
  Reply: (p) => <Icon {...p}><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></Icon>,
  Chart: (p) => <Icon {...p}><path d="M3 3v18h18"/><path d="M7 16V10"/><path d="M12 16V6"/><path d="M17 16v-4"/></Icon>,
  Check: (p) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>,
  Arrow: (p) => <Icon {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></Icon>,
  ArrowDown: (p) => <Icon {...p}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></Icon>,
  Plus: (p) => <Icon {...p}><path d="M5 12h14"/><path d="M12 5v14"/></Icon>,
  Minus: (p) => <Icon {...p}><path d="M5 12h14"/></Icon>,
  Brain: (p) => <Icon {...p}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></Icon>,
  Clock: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></Icon>,
  Shield: (p) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Icon>,
  Zap: (p) => <Icon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>,
  Target: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></Icon>,
  Calendar: (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>,
  Globe: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></Icon>,
  Heat: (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></Icon>,
  Star: (p) => <Icon {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>,
  Lock: (p) => <Icon {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>,
};

// ---------- Logo ----------
const Logo = ({ size = 36 }) => (
  <div className="flex items-center gap-2.5">
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-[12px]" style={{
        background: "linear-gradient(135deg, #6B47E0 0%, #8B5CF6 100%)",
        boxShadow: "0 8px 20px -6px rgba(107,71,224,0.6), inset 0 1px 0 rgba(255,255,255,0.25)"
      }} />
      <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto" width={size*0.55} height={size*0.55} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
        <path d="M5 5 L19 19" />
        <path d="M19 5 L5 19" />
      </svg>
    </div>
    <span className="font-bold tracking-tight text-white text-[17px]">XToolsPro4</span>
  </div>
);

// ---------- Reveal on scroll (IntersectionObserver) ----------
const Reveal = ({ children, className = "", delay = 0, as: Tag = "div" }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setShown(true); io.disconnect(); }
      });
    }, { rootMargin: "-60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style = {
    transition: `opacity 700ms cubic-bezier(0.21,0.62,0.35,1) ${delay}ms, transform 700ms cubic-bezier(0.21,0.62,0.35,1) ${delay}ms`,
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(24px)",
    willChange: "opacity, transform",
  };
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
};

// Stagger reveal: animate children with incremental delay
const StaggerReveal = ({ children, className = "", step = 80, base = 0 }) => {
  const kids = React.Children.toArray(children);
  return (
    <div className={className}>
      {kids.map((c, i) => <Reveal key={i} delay={base + i * step}>{c}</Reveal>)}
    </div>
  );
};

// Simple accordion expand helper (CSS-based, no AnimatePresence)
const Collapse = ({ open, children }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    setHeight(open ? ref.current.scrollHeight : 0);
  }, [open, children]);
  return (
    <div style={{
      height,
      overflow: "hidden",
      transition: "height 280ms cubic-bezier(0.21,0.62,0.35,1), opacity 280ms ease",
      opacity: open ? 1 : 0,
    }}>
      <div ref={ref}>{children}</div>
    </div>
  );
};

// ---------- Background decoration ----------
const Orbs = () => (
  <>
    <div className="pointer-events-none fixed -top-40 -left-20 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-30"
         style={{ background: "radial-gradient(circle, #6B47E0 0%, transparent 60%)" }} />
    <div className="pointer-events-none fixed top-[40vh] -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-25"
         style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 60%)" }} />
    <div className="pointer-events-none fixed bottom-[10vh] left-[20vw] w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20"
         style={{ background: "radial-gradient(circle, #4F46E5 0%, transparent 60%)" }} />
    <div className="pointer-events-none fixed inset-0 grid-overlay opacity-60" />
  </>
);

// ---------- Phone frame with embedded screenshot ----------
const Phone = ({ src, alt, rotate = 0, className = "" }) => (
  <div className={`relative ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
    <div className="phone-glow" />
    <div className="phone-frame">
      <div className="phone-screen">
        <img src={src} alt={alt} loading="lazy"
             className="w-full h-full object-cover block" />
      </div>
    </div>
  </div>
);

// ---------- Nav ----------
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-[#0A0D1F]/70 border-b border-white/5" : ""}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#features" className="hover:text-white transition">機能</a>
          <a href="#pricing" className="hover:text-white transition">料金</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </nav>
        <a href="#pricing" className="btn-grad ring-focus inline-flex items-center gap-1.5 rounded-full px-4 md:px-5 py-2 md:py-2.5 text-sm font-semibold text-white">
          無料で始める
          <I.Arrow size={14} />
        </a>
      </div>
    </header>
  );
};

// ---------- Hero ----------
const Hero = () => (
  <section className="relative pt-32 md:pt-40 pb-16 md:pb-24">
    <div className="max-w-6xl mx-auto px-5 md:px-6">
      <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center">
        <div className="md:col-span-7 order-2 md:order-1">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-slate-300 mb-6">
              <span className="inline-flex w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              スマホ完結のX運用AI <span className="text-slate-500">／ XToolsPro4</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h-display text-balance text-[44px] leading-[1.05] sm:text-6xl md:text-7xl text-white">
              X運用、<br className="md:hidden" />
              <span className="gradient-text">AI</span>に<br className="hidden md:block" />
              任せませんか？
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-slate-300 text-pretty text-lg md:text-xl leading-relaxed max-w-xl">
              AIが投稿を自動生成・自動リプライ。<br className="hidden sm:inline" />
              あなたはアイデアだけ。
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#pricing" className="btn-grad ring-focus inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold text-white">
                無料で始める <I.Arrow size={16} />
              </a>
              <a href="#pricing" className="ring-focus inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white border border-white/15 hover:bg-white/5 transition">
                料金プランを見る
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex items-center gap-5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5"><I.Shield size={14} className="text-purple-400" />30日間返金保証</div>
              <div className="flex items-center gap-1.5"><I.Lock size={14} className="text-purple-400" />X公式API準拠</div>
              <div className="hidden sm:flex items-center gap-1.5"><I.Zap size={14} className="text-purple-400" />即日開始</div>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-5 order-1 md:order-2 flex justify-center">
          <Reveal delay={0.1}>
            <Phone src="images/xtp4-appstore-A1-hero.png" alt="XToolsPro4 ダッシュボード"
                   rotate={-3} className="w-[260px] sm:w-[300px] md:w-[320px]" />
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <Reveal delay={0.4}>
        <div className="mt-14 md:mt-20 flex justify-center">
          <div className="bob inline-flex flex-col items-center gap-2 text-slate-500 text-[11px] tracking-[0.2em] uppercase">
            <span>Scroll</span>
            <I.ArrowDown size={14} />
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ---------- Stats ----------
const STATS = [
  { v: "200+", label: "X運用者が導入" },
  { v: "+312%", label: "平均インプレ" },
  { v: "28h/月", label: "節約時間" },
];

const Stats = () => (
  <section className="relative py-20 md:py-24">
    <div className="max-w-6xl mx-auto px-5 md:px-6">
      <Reveal>
        <p className="text-center text-xs tracking-[0.25em] uppercase text-purple-300/80 mb-10">Trusted by creators</p>
      </Reveal>
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 80} className="glass rounded-2xl p-5 md:p-8 text-center">
            <div className="h-display gradient-text text-3xl md:text-5xl">{s.v}</div>
            <div className="mt-2 text-[11px] md:text-sm text-slate-400">{s.label}</div>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-center text-[11px] text-slate-500">※実データではなくイメージです</p>
    </div>
  </section>
);

// ---------- Feature row ----------
const FEATURES = [
  {
    eyebrow: "FEATURE 01 ／ AI自動投稿",
    title: <>寝ている間も、<br/><span className="gradient-text">AI</span>が投稿する。</>,
    body: "あなたのスタイルを学習したAIが、24時間ノンストップで投稿を生成。ネタ切れも、投稿のし忘れも、もう過去のものに。",
    bullets: [
      { icon: <I.Brain size={16}/>, label: "スタイル学習" },
      { icon: <I.Calendar size={16}/>, label: "投稿スケジュール自動化" },
      { icon: <I.Globe size={16}/>, label: "日本語ネイティブ精度" },
    ],
    img: "images/xtp4-appstore-A2-auto-post.png",
    alt: "AI自動投稿の画面",
    rotate: 2,
    reverse: false,
  },
  {
    eyebrow: "FEATURE 02 ／ AI自動リプライ",
    title: <>リプライは、<br/><span className="gradient-text">AI</span>に任せる。</>,
    body: "指定アカウントの投稿に、関連性の高いリプライをAIが自動送信。エンゲージメントを自然に積み上げる。",
    bullets: [
      { icon: <I.Target size={16}/>, label: "ターゲットアカウント指定" },
      { icon: <I.Reply size={16}/>, label: "文脈理解リプライ" },
      { icon: <I.Clock size={16}/>, label: "過剰投稿を防ぐレート制御" },
    ],
    img: "images/xtp4-appstore-A3-auto-reply.png",
    alt: "AI自動リプライの画面",
    rotate: -2,
    reverse: true,
  },
  {
    eyebrow: "FEATURE 03 ／ 投稿分析",
    title: <>何が効いたか、<br/><span className="gradient-text">データ</span>で分かる。</>,
    body: "インプレッション・エンゲージメント・フォロワー増加をリアルタイムで可視化。次に何を投稿すべきかが、データで見える。",
    bullets: [
      { icon: <I.Chart size={16}/>, label: "投稿別パフォーマンス" },
      { icon: <I.Heat size={16}/>, label: "時間帯ヒートマップ" },
      { icon: <I.Sparkles size={16}/>, label: "KPIダッシュボード" },
    ],
    img: "images/xtp4-appstore-A4-analytics.png",
    alt: "投稿分析の画面",
    rotate: 2,
    reverse: false,
  },
];

const FeatureRow = ({ f, idx }) => (
  <div className={`grid md:grid-cols-12 gap-10 md:gap-12 items-center ${f.reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
    <Reveal className="md:col-span-6">
      <div className="space-y-5">
        <span className="inline-block text-[11px] tracking-[0.22em] uppercase text-purple-300/90 font-semibold">{f.eyebrow}</span>
        <h3 className="h-display text-balance text-4xl md:text-5xl lg:text-6xl text-white">{f.title}</h3>
        <p className="text-slate-300 text-pretty text-base md:text-lg leading-relaxed max-w-lg">{f.body}</p>
        <ul className="grid sm:grid-cols-1 gap-2.5 pt-2">
          {f.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-200 text-[15px]">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/20">
                {b.icon}
              </span>
              {b.label}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
    <Reveal className="md:col-span-6 hidden md:flex justify-center" delay={0.1}>
      <Phone src={f.img} alt={f.alt} rotate={f.rotate} className="w-[260px] sm:w-[300px] md:w-[330px]" />
    </Reveal>
  </div>
);

// ---------- Mobile-only Phone carousel ----------
const PhoneCarousel = ({ items }) => {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const idx = Math.round(el.scrollLeft / w);
      setActive(Math.max(0, Math.min(items.length - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);
  const scrollTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };
  return (
    <div className="md:hidden -mx-5">
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((f, i) => (
          <div key={i} className="snap-center shrink-0 w-full flex justify-center px-5 py-4">
            <Phone src={f.img} alt={f.alt} rotate={0} className="w-[260px] sm:w-[300px]" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`スライド ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${active === i ? "w-6 bg-purple-400" : "w-1.5 bg-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
};

const Features = () => (
  <section id="features" className="relative py-24 md:py-32">
    <div className="max-w-6xl mx-auto px-5 md:px-6 space-y-28 md:space-y-36">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-purple-300/80 mb-4">Features</p>
          <h2 className="h-display text-balance text-4xl md:text-5xl text-white">
            ポケットの中に、<br/>マーケティングチームを。
          </h2>
          <p className="mt-4 text-slate-400 text-pretty">スマホ完結。3つのAIが、あなたのX運用を24時間まわす。</p>
        </div>
      </Reveal>
      <Reveal>
        <PhoneCarousel items={FEATURES} />
      </Reveal>
      {FEATURES.map((f, i) => <FeatureRow key={i} f={f} idx={i} />)}
    </div>
  </section>
);

// ---------- How it works ----------
const STEPS = [
  { n: "01", title: "アカウント連携", body: "X API認証で、安全にあなたのアカウントへ接続。" },
  { n: "02", title: "スタイル学習", body: "過去投稿を読み込ませて、あなたらしさを学習。" },
  { n: "03", title: "自動運転開始", body: "あとはAIが運用。投稿・リプライ・分析を24時間。" },
];

const HowItWorks = () => (
  <section className="relative py-24 md:py-32">
    <div className="max-w-6xl mx-auto px-5 md:px-6">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs tracking-[0.25em] uppercase text-purple-300/80 mb-4">How it works</p>
          <h2 className="h-display text-balance text-4xl md:text-5xl text-white">3ステップで、<br/>運用が動き出す。</h2>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-5 md:gap-6">
        {STEPS.map((s, i) => (
          <Reveal key={i} delay={i * 100} className="relative glass rounded-2xl p-7 md:p-8 overflow-hidden">
            <span className="absolute right-3 top-1 select-none h-display text-[9rem] leading-none text-white/[0.04]">{s.n}</span>
            <div className="relative">
              <div className="text-purple-300/80 text-xs tracking-[0.2em] font-semibold">STEP {s.n}</div>
              <h3 className="mt-3 text-white text-xl md:text-2xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-slate-400 text-[14px] leading-relaxed">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ---------- Pricing ----------
const PLANS = [
  {
    name: "Free",
    tagline: "まず試してみる",
    price: "¥0",
    cadence: "/ 月",
    sub: "クレジットカード不要",
    features: [
      { v: true,  t: "AI投稿生成 / 月 10件まで" },
      { v: true,  t: "スケジュール投稿 / 100件まで" },
      { v: true,  t: "基本分析（過去7日分）" },
      { v: true,  t: "1アカウント" },
      { v: false, t: "AI自動リプライ" },
      { v: false, t: "スタイル学習エンジン" },
    ],
    cta: "無料で始める",
    href: "https://line.me/ti/g2/KGlX13eiEN7aM1cHqu_LMaakdFiYveFak8AZPQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
    featured: false,
  },
  {
    name: "Pro",
    tagline: "全機能、全開放",
    price: "¥1,000",
    cadence: "/ 月",
    sub: "いつでも解約 OK",
    features: [
      { v: true, t: "AI自動投稿（無制限）" },
      { v: true, t: "AI自動リプライ" },
      { v: true, t: "投稿分析ダッシュボード" },
      { v: true, t: "スタイル学習エンジン" },
      { v: true, t: "最大 100 アカウント" },
      { v: true, t: "優先サポート" },
    ],
    cta: "Pro を始める",
    href: "#",
    featured: true,
  },
];

const PlanCard = ({ p }) => (
  <div className={`relative ${p.featured ? "md:-mt-4" : ""}`}>
    {p.featured && (
      <div className="absolute -inset-1 rounded-[2rem] blur-2xl opacity-50 pointer-events-none"
           style={{ background: "linear-gradient(135deg, #6B47E0, #8B5CF6)" }} />
    )}
    <div className={`relative rounded-[2rem] p-[1.5px] h-full ${p.featured ? "" : ""}`}
         style={{ background: p.featured
           ? "linear-gradient(160deg, rgba(139,92,246,0.8), rgba(255,255,255,0.04) 40%, rgba(139,92,246,0.6))"
           : "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.08))"
         }}>
      <div className={`rounded-[1.93rem] h-full p-7 md:p-9 ${p.featured ? "bg-[#0E1024]/95" : "bg-[#0B0E20]/80"}`}>
        <div className="flex items-center justify-between">
          <div className={`text-xs tracking-[0.22em] uppercase font-semibold ${p.featured ? "text-purple-300/90" : "text-slate-400"}`}>{p.name}</div>
          {p.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-400/25">
              <I.Star size={10} fill="currentColor" /> 人気
            </span>
          )}
        </div>
        <p className="mt-2 text-slate-300 text-[13px]">{p.tagline}</p>
        <div className="mt-6 flex items-end gap-2">
          <span className={`h-display leading-none ${p.featured ? "text-white text-6xl md:text-7xl" : "text-white text-5xl md:text-6xl"}`}>{p.price}</span>
          <span className="pb-2 text-slate-400 text-sm">{p.cadence}</span>
        </div>
        <p className="mt-1.5 text-slate-500 text-xs">{p.sub}</p>

        <div className="hairline my-7" />

        <ul className="grid gap-3">
          {p.features.map((f, i) => (
            <li key={i} className={`flex items-center gap-3 text-[14px] ${f.v ? "text-slate-200" : "text-slate-500 line-through decoration-slate-700"}`}>
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${f.v ? "bg-gradient-to-br from-[#6B47E0] to-[#8B5CF6]" : "bg-white/5 border border-white/10"}`}>
                {f.v ? <I.Check size={12} stroke={3} /> : <I.Minus size={10} />}
              </span>
              {f.t}
            </li>
          ))}
        </ul>

        <a href={p.href} {...(/^https?:/.test(p.href) ? { target: "_blank", rel: "noopener" } : {})} className={`mt-8 ring-focus inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold transition ${p.featured ? "btn-grad text-white" : "text-white border border-white/15 hover:bg-white/5"}`}>
          {p.cta} <I.Arrow size={15} />
        </a>
        {p.featured && (
          <p className="mt-4 text-center text-[11px] text-slate-500">
            <I.Shield size={11} className="inline -mt-0.5 mr-1 text-purple-400" />
            いつでも解約 ・ 30日間返金保証
          </p>
        )}
      </div>
    </div>
  </div>
);

const Pricing = () => (
  <section id="pricing" className="relative py-24 md:py-32">
    <div className="max-w-6xl mx-auto px-5 md:px-6">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-purple-300/80 mb-4">Pricing</p>
          <h2 className="h-display text-balance text-4xl md:text-5xl text-white">まず、無料で。<br/>順調なら、Proへ。</h2>
          <p className="mt-4 text-slate-400">しっかり試してから、ステップアップ。いつでも解約できます。</p>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto items-stretch">
        {PLANS.map((p, i) => (
          <Reveal key={i} delay={i * 100} className="h-full">
            <PlanCard p={p} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <p className="mt-8 text-center text-xs text-slate-500">表示は税込価格です。Pro は月額課金、いつでもアップグレード・ダウングレード可能です。</p>
      </Reveal>
    </div>
  </section>
);

// ---------- FAQ ----------
const FAQS = [
  { q: "AIが生成する投稿の質は？", a: "あなたの過去投稿を学習させることで、語彙・トーン・改行スタイルまで再現します。生成後の手動修正もスマホから1タップで可能です。日本語ネイティブ精度のモデルを採用しています。" },
  { q: "Xの利用規約に違反しませんか？", a: "XToolsPro4はX公式APIを通じて動作します。レート制御・スパム検出を内蔵しており、規約に準じた範囲で運用できる設計です。" },
  { q: "解約はできますか？", a: "いつでもマイページから解約できます。解約手続きは1タップ、月望までは引き続きご利用いただけます。長期拘束はありません。" },
  { q: "複数アカウントで使えますか？", a: "Free プランは1アカウント、Pro プランでは最大100アカウントまで運用可能です。それ以上は追加ライセンスをご案内します。" },
  { q: "サポートはありますか？", a: "メール / チャットサポートを提供しています。営業日2時間以内の返信を目安に対応しています。" },
];

const Accordion = ({ q, a, isOpen, onClick }) => (
  <div className={`rounded-2xl border ${isOpen ? "border-purple-400/30 bg-white/[0.03]" : "border-white/8"} transition`}>
    <button onClick={onClick}
            className="ring-focus w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-5">
      <span className="text-white font-semibold text-[15px] md:text-base">{q}</span>
      <span className={`inline-flex w-7 h-7 shrink-0 items-center justify-center rounded-full border border-white/15 transition ${isOpen ? "rotate-45 bg-purple-500/20 border-purple-400/40 text-purple-200" : "text-slate-300"}`}>
        <I.Plus size={14} />
      </span>
    </button>
    <Collapse open={isOpen}>
      <p className="px-5 md:px-6 pb-5 text-slate-300 text-[14px] leading-relaxed text-pretty">{a}</p>
    </Collapse>
  </div>
);

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-5 md:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-purple-300/80 mb-4">FAQ</p>
            <h2 className="h-display text-balance text-4xl md:text-5xl text-white">よくある質問</h2>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Accordion key={i} q={f.q} a={f.a}
                         isOpen={open === i}
                         onClick={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ---------- Final CTA ----------
const FinalCTA = () => (
  <section className="relative py-24 md:py-28">
    <div className="max-w-6xl mx-auto px-5 md:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] p-10 md:p-20 text-center"
             style={{ background: "linear-gradient(135deg, #6B47E0 0%, #8B5CF6 100%)" }}>
          {/* decorative */}
          <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-black/20 blur-3xl" />
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="relative">
            <h2 className="h-display text-white text-balance text-5xl md:text-7xl">X運用、再発明。</h2>
            <p className="mt-5 text-white/85 text-pretty text-lg md:text-xl">今日から、ポケットの中にマーケティングチームを。</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href="https://line.me/ti/g2/KGlX13eiEN7aM1cHqu_LMaakdFiYveFak8AZPQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" target="_blank" rel="noopener" className="ring-focus inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-bold text-[#2A1B6E] bg-white hover:bg-slate-100 transition">
                無料で始める <I.Arrow size={16} />
              </a>
              <a href="#pricing" className="ring-focus inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold text-white border border-white/30 hover:bg-white/10 transition">
                料金を見る
              </a>
            </div>
            <p className="mt-6 text-white/70 text-xs">クレジットカード不要 ／ 30日間返金保証</p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ---------- Footer ----------
const Footer = () => (
  <footer className="relative py-14 border-t border-white/5">
    <div className="max-w-6xl mx-auto px-5 md:px-6">
      <div className="hairline mb-10" />
      <p className="text-center text-[11px] tracking-[0.3em] uppercase text-slate-500 mb-10">Made for X.</p>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Logo />
          <p className="text-slate-500 text-xs">© 2026 XToolsPro4. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
          <a href="#" className="hover:text-white transition">特商法</a>
          <a href="#" className="hover:text-white transition">利用規約</a>
          <a href="#" className="hover:text-white transition">プライバシーポリシー</a>
          <a href="#" className="hover:text-white transition">お問い合わせ</a>
        </nav>
      </div>
    </div>
  </footer>
);

// ---------- App ----------
const App = () => (
  <div className="relative min-h-screen overflow-hidden">
    <Orbs />
    <Nav />
    <main className="relative">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
