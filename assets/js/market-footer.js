// マーケット共通フッター（2026-11-01 ver1.0・ゆうさん「マーケットと同じフッターを全部の LP に共通で」）
// ★ フッターの中身はこのファイルだけで直す（トップ・xtp3/・xtp4/・xtp-compare/・ttp2/・単機能 LP 5 枚が読み込む）。
//   XTP6（27_XTP6 の _landing/MarketFooter.tsx）と TTP2（40_ThreadsToolsPro2 の components/landing/MarketFooter.tsx）は
//   アプリなので同じ中身を別に持っている（外のスクリプトをアプリに読ませないため）。ツールを足したら 3 か所を直す。
// 使い方: 置きたい場所に <div data-mk-footer></div> を置いて、このファイルを読み込む（無ければ body の最後に付ける）。
//         React のトップは window.MarketFooter.html() を dangerouslySetInnerHTML で使う。
(function () {
  var M = 'https://market.youpapatools.com/';
  var COLS = [
    { title: 'X のツール', items: [
      ['XToolsPro6（無料〜）', 'https://xtp6.youpapatools.com/?utm_source=market&utm_medium=footer'],
      ['XToolsPro3（強化版・買い切り）', M + 'xtp3/'],
      ['XToolsPro4（公式 API）', M + 'xtp4/'],
      ['XTP3・4・6 比較表', M + 'xtp-compare/'],
    ] },
    { title: 'ほかの SNS', items: [
      ['ThreadsToolsPro2（Threads）', 'https://ttp2.youpapatools.com/'],
      ['BskyToolsPro2（Bluesky）', M + 'bluesky/'],
      ['YayToolsPro（Yay!）', M + 'yay/'],
      ['FacebookToolsPro', M + 'fb-like/'],
      ['AmebloToolsPro（アメブロ）', M + 'ameblo-like/'],
      ['noteToolsPro（note）', M + 'note-bot/'],
    ] },
    { title: '購入後', items: [
      ['手順書サイト', 'https://xtools-docs-auth.web.app/'],
      ['お問い合わせフォーム', 'https://forms.gle/sDG46hdxTo9E4p4CA'],
      ['よくある質問', M + '#faq'],
    ] },
    { title: '開発者・表記', items: [
      ['note（Youパパ）', 'https://note.com/youpapalife'],
      ['X @Yu_PaPa_Life', 'https://x.com/Yu_PaPa_Life'],
      ['法人の方（RAIJIN）', 'https://raijin.youpapatools.com/'],
      ['特定商取引法に基づく表記', 'https://xtools-docs-auth.web.app/tokushoho.html'],
    ] },
  ];
  var LOGO = '<svg viewBox="0 0 22 22" aria-hidden="true"><rect x="1.5" y="1.5" width="19" height="19" rx="4" fill="#C2533C"/>' +
    '<path d="M6 15V7l3 5 3-5v8" fill="none" stroke="#FBEDD9" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="15.5" cy="15" r="1.2" fill="#FBEDD9"/></svg>';
  var CSS =
    '.mkf{background:#2D2620;color:#fff;font-family:"Noto Sans JP","Hiragino Sans","Yu Gothic UI",Meiryo,sans-serif;text-align:left;position:relative;z-index:50;line-height:1.5}' +
    '.mkf *{box-sizing:border-box}' +
    '.mkf a{color:inherit;text-decoration:none}' +
    '.mkf a:hover{text-decoration:underline}' +
    '.mkf-cols{max-width:1500px;margin:0 auto;padding:40px 24px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:32px}' +
    '@media(min-width:768px){.mkf-cols{grid-template-columns:repeat(4,minmax(0,1fr))}}' +
    '.mkf h3{font-size:15px;font-weight:700;margin:0 0 12px;color:#fff;border:0;padding:0;background:none}' +
    '.mkf ul{list-style:none;margin:0;padding:0}' +
    '.mkf li{margin:0 0 8px;font-size:14px;color:#D1D5DB;word-break:auto-phrase}' +
    '.mkf-hr{border:0;border-top:1px solid rgba(55,65,81,.6);margin:0}' +
    '.mkf-brand{max-width:1500px;margin:0 auto;padding:24px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px}' +
    '.mkf-logo{display:inline-flex;align-items:center;gap:12px}' +
    '.mkf-logo svg{width:36px;height:36px;flex-shrink:0;display:block}' +
    '.mkf-logo span{font-size:22px;font-weight:700;line-height:1;white-space:nowrap}' +
    '.mkf-tag{font-size:12px;color:#D1D5DB}' +
    '.mkf-copy{background:#1F1B16;text-align:center;font-size:11px;color:#9CA3AF;padding:24px}';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function html() {
    var cols = COLS.map(function (c) {
      return '<div><h3>' + esc(c.title) + '</h3><ul>' + c.items.map(function (it) {
        return '<li><a href="' + esc(it[1]) + '">' + esc(it[0]) + '</a></li>';
      }).join('') + '</ul></div>';
    }).join('');
    return '<footer class="mkf" data-mkf="1"><div class="mkf-cols">' + cols + '</div><hr class="mkf-hr">' +
      '<div class="mkf-brand"><a class="mkf-logo" href="' + M + '">' + LOGO + '<span>Youパパツールマーケット</span></a>' +
      '<div class="mkf-tag">個人開発の SNS 運用ツールを、作った本人が販売・サポートしています。</div></div>' +
      '<div class="mkf-copy">© 2026 Youパパツールマーケット</div></footer>';
  }
  function injectCss() {
    if (document.getElementById('mkf-css')) return;
    var st = document.createElement('style'); st.id = 'mkf-css'; st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }
  function mount() {
    injectCss();
    var slots = document.querySelectorAll('[data-mk-footer]');
    if (slots.length) {
      for (var i = 0; i < slots.length; i++) fill(slots[i]);
    } else if (!document.querySelector('[data-mkf]') && !window.MarketFooterManual) {
      var d = document.createElement('div'); d.innerHTML = html(); document.body.appendChild(d.firstChild);
    }
  }
  // data-mk-footer-wait="#root" を付けた枠は、その要素に中身が入る（React などの本体が描き終わる）まで待ってから出す。
  // 先に出すと、読み込み中に「フッターだけのページ」が一瞬見えて、本体が上に入ってくる（2026-11-01 XTP4 で発生）
  function fill(slot) {
    if (slot.querySelector('[data-mkf]')) return;
    var sel = slot.getAttribute('data-mk-footer-wait');
    var target = sel && document.querySelector(sel);
    if (target && !target.firstElementChild) {
      var done = false;
      var go = function () { if (done) return; done = true; ob.disconnect(); slot.innerHTML = html(); };
      var ob = new MutationObserver(function () { if (target.firstElementChild) go(); });
      ob.observe(target, { childList: true });
      setTimeout(go, 8000); // 本体が描けなかったときもフッターは出す
      return;
    }
    slot.innerHTML = html();
  }
  window.MarketFooter = { html: html, injectCss: injectCss };
  if (window.MarketFooterManual) { injectCss(); return; }  // React のトップは自分で描く
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();

/*
Version History
- ver1.2 (2026-11-01): data-mk-footer-wait（本体が描き終わるまで待つ）。XTP4 の LP で読み込み中にフッターだけが一瞬見えて上に戻るように見えた（ゆうさん）
- ver1.1 (2026-11-01): TTP2 のリンクを新住所 ttp2.youpapatools.com に
- ver1.0 (2026-11-01): 新規。マーケットのトップのフッター（4 列のリンク＋ロゴ＋一言＋©）を共通部品に。TTP2 は LP（threadtoolspro2.vercel.app/）へ
*/
