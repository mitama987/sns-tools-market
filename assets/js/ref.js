// 紹介コード（?ref=）を購入ボタン（/api/buy/）に引き継ぐ（2026-10-31 ver1.0）
// xtp3/index.html 末尾の処理と同じ。保存キーも同じ xtp3_ref（どの LP から入っても同じ紹介者）。
(function () {
  try {
    var params = new URLSearchParams(location.search);
    var ref = params.get("ref");
    if (ref) {
      ref = ref.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);
      if (ref) localStorage.setItem("xtp3_ref", ref);
    }
    ref = ref || localStorage.getItem("xtp3_ref");
    if (!ref) return;
    document.querySelectorAll('a[href*="/api/buy/"]').forEach(function (a) {
      var u = new URL(a.href);
      u.searchParams.set("ref", ref);
      a.href = u.toString();
    });
  } catch (e) { /* 計測は本体の邪魔をしない */ }
})();
