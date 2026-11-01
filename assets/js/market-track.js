// マーケットのトップの計測（GA4 カスタムイベント）— A/B テストのフェーズ 1（2026-11-01 ver1.0）
// 仕様は .docs/market-tracking.md。見た目には何もしない。失敗しても本体の邪魔をしない（例外は全部握りつぶす）。
// 送るイベント:
//   cta_click     製品に向かうクリック（data-cta を持つリンク）: product_id・cta_type・area・link_url・link_text
//   nav_click     それ以外のリンク（ヘッダー・ナビ・フッター・ページ内）: area・link_url・link_text
//   section_view  各ブロックが 25% 見えたとき 1 回: section
//   scroll_depth  25/50/75/90% で 1 回ずつ: percent_scrolled
//   faq_open      FAQ を開いたとき: faq_id・faq_q
//   info_open     (i) を開いたとき: product_id（棚の (i) は shelf id）
//   search        検索したとき: search_term
// どのイベントにも ui_variant（index.html の head で決める window.MKT_VARIANT）を付ける。
(function () {
  try {
    var q = new URLSearchParams(location.search);
    var forced = q.get('track') === '1';
    var onProd = location.hostname === 'market.youpapatools.com' && (location.pathname === '/' || location.pathname === '/index.html');
    if (!onProd && !forced) return;                       // vercel.app・localhost・mock-dark では送らない
    try { if (localStorage.getItem('mkt_notrack') === '1' && !forced) return; } catch (e) {}
    if (typeof window.gtag !== 'function') return;

    var variant = window.MKT_VARIANT || 'light';
    var send = function (name, params) {
      try {
        params = params || {};
        params.ui_variant = variant;
        window.gtag('event', name, params);
      } catch (e) {}
    };
    var cut = function (s, n) { return String(s || '').replace(/\s+/g, ' ').trim().slice(0, n || 100); };
    var areaOf = function (el) {
      if (el.closest('footer')) return 'footer';
      if (el.closest('header')) return 'header';
      var s = el.closest('section[id]');
      return s ? s.id : 'other';
    };

    // ── クリック（リンク・FAQ・(i)） ──
    document.addEventListener('click', function (ev) {
      try {
        var t = ev.target;
        if (!t || !t.closest) return;
        var a = t.closest('a[href]');
        if (a) {
          var base = { area: areaOf(a), link_url: cut(a.href, 100), link_text: cut(a.textContent || a.getAttribute('aria-label'), 100) };
          var cta = a.getAttribute('data-cta');
          if (cta) {
            base.cta_type = cta;
            base.product_id = a.getAttribute('data-pid') || '';
            send('cta_click', base);
          } else {
            send('nav_click', base);
          }
          return;
        }
        var b = t.closest('button[aria-expanded]');
        if (b && b.getAttribute('aria-expanded') === 'false') {   // React が開く前に読む＝「開く」操作だけ拾う
          var li = b.closest('#faq li[id]');
          if (li) { send('faq_open', { faq_id: li.id, faq_q: cut(b.textContent, 100).replace(/^Q/, '') }); return; }
          var art = b.closest('article[id^="p-"]');
          var shelf = b.closest('section[id^="shelf-"]');
          send('info_open', { product_id: art ? art.id.slice(2) : (shelf ? shelf.id : '') });
        }
      } catch (e) {}
    }, true);

    // ── 検索 ──
    document.addEventListener('submit', function (ev) {
      try {
        var f = ev.target;
        if (!f || f.getAttribute('role') !== 'search') return;
        var i = f.querySelector('input');
        send('search', { search_term: cut(i && i.value, 100) });
      } catch (e) {}
    }, true);

    // ── スクロールの深さ ──
    var marks = [25, 50, 75, 90], hit = {};
    var onScroll = function () {
      try {
        var d = document.documentElement;
        var max = d.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        var pct = (window.scrollY / max) * 100;
        for (var k = 0; k < marks.length; k++) {
          var m = marks[k];
          if (pct >= m && !hit[m]) { hit[m] = 1; send('scroll_depth', { percent_scrolled: m }); }
        }
      } catch (e) {}
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── ブロックが見えたか（React が描き終わってから監視） ──
    var SECTIONS = ['tools', 'shelf-x', 'shelf-text', 'shelf-meta', 'shelf-blog', 'compare', 'faq'];
    var seen = {};
    var watch = function () {
      if (!('IntersectionObserver' in window)) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var id = e.target.id || (e.target.tagName === 'FOOTER' ? 'footer' : '');
          if (!id || seen[id]) return;
          seen[id] = 1;
          send('section_view', { section: id });
          io.unobserve(e.target);
        });
      }, { threshold: 0.25 });
      SECTIONS.forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
      var ft = document.querySelector('footer.mkf');
      if (ft) io.observe(ft);
    };
    var root = document.getElementById('root');
    var ready = function () { return document.getElementById('tools') && document.querySelector('footer.mkf'); };
    if (ready()) { watch(); }
    else if (root && 'MutationObserver' in window) {
      var done = false;
      var go = function () { if (done) return; done = true; ob.disconnect(); watch(); };
      var ob = new MutationObserver(function () { if (ready()) go(); });
      ob.observe(root, { childList: true, subtree: true });
      setTimeout(go, 10000);
    }
  } catch (e) { /* 計測は本体の邪魔をしない */ }
})();

/*
Version History
- ver1.0 (2026-11-01): 新規。cta_click・nav_click・section_view・scroll_depth・faq_open・info_open・search（ui_variant 付き）。本番ホストのトップだけで動く（?track=1 で強制・?notrack=1 で自分の端末を除外）
*/
