// 購入ボタン（/api/buy/）に「紹介コード」と「どこから来たか」を引き継ぐ（2026-11-14 ver1.1）
//
// 1) 紹介コード（?ref=）: 保存キー xtp3_ref（どの LP から入っても同じ紹介者）→ 購入ボタンに ref
// 2) 流入元（ver1.1〜）: 保存キー mkt_attr（90 日）→ 購入ボタンに a_src・a_lp・a_first
//      a_src   … 流入元。utm_source/utm_medium があれば「note/pin」、無ければ参照元から「google/organic」「note.com/referral」、
//                どちらも無ければ「direct」。再訪問では direct 以外が来たときだけ上書き（＝最後に分かっている流入元。GA4 と同じ考え方）
//      a_lp    … 最初に見たページ（/xtp-compare/ など）
//      a_first … 初回訪問日（2026-11-13）
//    サーバー（12_stripe-webhook の /api/buy → billing/attribution.js）が Stripe の記録に付け、売上通知メールに出す。
//    個人を特定する情報は入れない（ページの種類と日付だけ）。説明は privacy/。
// 3) 購入ボタンを押したら GA4 に begin_checkout（sku）。gtag が無いページ・?notrack=1 の端末では何もしない
//
// 読み込むのはマーケットの全ページ（最初に着いたページで流入元を記録するため）。React で後から描くボタンにも効くよう、
// 読み込み時の書き換えに加えて、押す直前（pointerdown／touchstart／click など）にも付ける。
(function () {
  var BUY = '/api/buy/';
  var ATTR_KEY = 'mkt_attr';
  var ATTR_DAYS = 90;
  // 自分の販売ページ・決済まわり（ここから戻ってきても「流入元」ではない）
  var OWN = /(^|\.)youpapatools\.com$|(^|\.)stripe\.com$|^stripe-webhook-r260221-01\.web\.app$|^xtools-docs-auth\.web\.app$|^sns-tools-market\.vercel\.app$/;
  var SEARCH = /^(?:.*\.)?(google|bing|yahoo|duckduckgo|baidu|yandex|ecosia|naver)\.[a-z.]+$/;

  var clean = function (s, n) { return String(s == null ? '' : s).replace(/[^A-Za-z0-9/._-]/g, '').slice(0, n || 64); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // この訪問の流入元（分からなければ '' ＝ direct か、サイト内の移動）
  var detectSource = function (params, referrer, selfHost) {
    var us = clean(params.get('utm_source'), 40);
    if (us) return clean(us + '/' + (clean(params.get('utm_medium'), 20) || 'none'));
    var host = '';
    try { host = referrer ? new URL(referrer).hostname.toLowerCase().replace(/^www\./, '') : ''; } catch (e) { host = ''; }
    if (!host || host === selfHost || OWN.test(host)) return '';
    var m = /^mail\./.test(host) ? null : SEARCH.exec(host);   // mail.google.com などは検索ではない
    if (m) return m[1] + '/organic';
    return clean(host + '/referral');
  };

  var today = function () {
    var d = new Date();
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  };

  // 保存してある流入元を読み、今回の訪問で更新して返す
  var loadAttribution = function (params) {
    var saved = null;
    try { saved = JSON.parse(store.get(ATTR_KEY) || 'null'); } catch (e) { saved = null; }
    var fresh = saved && typeof saved === 'object' && typeof saved.t === 'number' && (Date.now() - saved.t) < ATTR_DAYS * 86400000;
    var src = detectSource(params, document.referrer, location.hostname.toLowerCase().replace(/^www\./, ''));
    var attr;
    if (!fresh) {
      attr = { src: src || 'direct', lp: clean(location.pathname), first: today(), t: Date.now() };
    } else {
      attr = { src: clean(saved.src) || 'direct', lp: clean(saved.lp), first: clean(saved.first), t: saved.t };
      if (src) attr.src = src;                       // direct 以外の新しい流入元だけ上書き
    }
    store.set(ATTR_KEY, JSON.stringify(attr));
    return attr;
  };

  var skuOf = function (href) {
    var i = String(href || '').indexOf(BUY);
    return i < 0 ? '' : clean(String(href).slice(i + BUY.length).split(/[?#]/)[0], 64);
  };

  try {
    var params = new URLSearchParams(location.search);

    var ref = params.get('ref');
    if (ref) {
      ref = ref.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
      if (ref) store.set('xtp3_ref', ref);
    }
    ref = ref || store.get('xtp3_ref') || '';

    var attr = loadAttribution(params);

    var decorate = function (a) {
      try {
        if (!a || !a.href || a.href.indexOf(BUY) < 0) return;
        var u = new URL(a.href);
        if (ref) u.searchParams.set('ref', ref);
        if (attr.src) u.searchParams.set('a_src', attr.src);
        if (attr.lp) u.searchParams.set('a_lp', attr.lp);
        if (attr.first) u.searchParams.set('a_first', attr.first);
        var next = u.toString();
        if (next !== a.href) a.href = next;
      } catch (e) {}
    };
    var decorateAll = function () {
      try { document.querySelectorAll('a[href*="' + BUY + '"]').forEach(decorate); } catch (e) {}
    };

    decorateAll();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decorateAll);

    // 後から描かれるボタン・長押し（新しいタブで開く）にも効くよう、押す直前にも付ける
    var onPress = function (ev) {
      try {
        var t = ev.target;
        var a = t && t.closest ? t.closest('a[href*="' + BUY + '"]') : null;
        if (!a) return;
        decorate(a);
        if (ev.type === 'click' && typeof window.gtag === 'function') {
          var sku = skuOf(a.href);
          window.gtag('event', 'begin_checkout', { sku: sku, items: [{ item_id: sku }], source_medium: attr.src || '' });
        }
      } catch (e) {}
    };
    ['pointerdown', 'touchstart', 'mousedown', 'auxclick', 'contextmenu', 'click'].forEach(function (name) {
      document.addEventListener(name, onPress, { capture: true, passive: true });
    });

    // E2E・動作確認用（読み取りだけ）
    window.MKT_ATTR = { src: attr.src, lp: attr.lp, first: attr.first, ref: ref };
  } catch (e) { /* 計測は本体の邪魔をしない */ }
})();

/*
Version History
- ver1.1 (2026-11-14): 流入元（a_src・a_lp・a_first）を購入ボタンに付ける。保存キー mkt_attr（90 日）。押す直前にも付ける（React で後から描くボタン・長押し対策）。
  購入ボタンのクリックで GA4 に begin_checkout。きっかけ: 11/13 の売上がどこ経由か、売上通知メールだけでは分からなかった（ゆうさん）
- ver1.0 (2026-10-31): 新規。紹介コード（?ref=）を購入ボタンに引き継ぐ（xtp3/index.html 末尾の処理と同じ）
*/
