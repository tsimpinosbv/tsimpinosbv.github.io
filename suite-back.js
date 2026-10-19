/* Check Mate Suite: small "⌂ Suite" button that appears inside Check Mate, Ημερολόγιο and V.C. Tips
   only when they were opened from the Suite (tsimpinosbv.github.io). Tap it to return to the Suite. */
(function () {
  try { if (sessionStorage.getItem("cmSuite") !== "1") return; } catch (e) { return; }
  if (location.pathname === "/" || location.pathname === "/index.html") return;
  function add() {
    if (document.getElementById("cm-suite-back")) return;
    var css = document.createElement("style");
    css.textContent =
      "#cm-suite-back{position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:80;" +
      "display:inline-flex;align-items:center;gap:6px;padding:9px 14px;border-radius:999px;background:#14213a;color:#fff;" +
      "font:600 14px system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;text-decoration:none;" +
      "box-shadow:0 4px 14px rgba(0,0,0,.28);-webkit-tap-highlight-color:transparent;opacity:.92}" +
      "#cm-suite-back:active{transform:scale(.95)}" +
      "#cm-suite-back:focus-visible{outline:3px solid #ff8c1e;outline-offset:2px}" +
      "@media print{#cm-suite-back{display:none}}";
    document.head.appendChild(css);
    var a = document.createElement("a");
    a.id = "cm-suite-back";
    a.href = "/";
    a.setAttribute("aria-label", "Επιστροφή στο Check Mate Suite");
    a.innerHTML = '<span aria-hidden="true">⌂</span> Suite';
    document.body.appendChild(a);
  }
  if (document.body) add(); else document.addEventListener("DOMContentLoaded", add);
})();
