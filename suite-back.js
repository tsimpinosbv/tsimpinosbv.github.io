/* Check Mate Suite: small "⌂ Suite" button that appears inside Check Mate, Ημερολόγιο and V.C. Tips
   only when they were opened from the Suite (tsimpinosbv.github.io). Tap it to return to the Suite. */
(function () {
  /* footer credit + «Σχετικά» (About) window. Runs on the Suite and on all three apps.
     The footer stays hidden while a page is still loading ("Φόρτωση…") and fades in after. */
  (function credit() {
    var d = null, timer = 0;
    function loading() {
      if (document.readyState !== "complete" || document.getElementById("boot")) return true;
      var t = (document.getElementById("root") || document.getElementById("app") || document.body).innerText || "";
      return /Φόρτωση[^\n]*…/.test(t);
    }
    function check() { timer = 0; if (d) d.classList.toggle("on", !loading()); }
    function later() { if (!timer) timer = setTimeout(check, 400); }
    function about() {
      var dlg = document.getElementById("cm-about");
      if (!dlg) {
        dlg = document.createElement("dialog");
        dlg.id = "cm-about";
        dlg.setAttribute("aria-labelledby", "cm-about-h");
        dlg.innerHTML =
          '<button type="button" class="cm-ab-x" aria-label="Κλείσιμο">×</button>' +
          '<img src="/creator.webp" alt="Λογότυπο Γιάννη Τσιμπινού" width="220" height="220">' +
          '<h2 id="cm-about-h">Γιάννης Τσιμπινός</h2>' +
          '<p class="cm-ab-role">IT Teacher · Web App Developer</p>' +
          '<p><a href="mailto:tsibinos@gmail.com">✉ tsibinos@gmail.com</a></p>' +
          '<hr><p class="cm-ab-apps"><b>Check Mate Suite</b><br>Check Mate · Ημερολόγιο · V.C. Tips</p>' +
          '<p class="cm-ab-small">Σχεδιασμός και ανάπτυξη: Γιάννης Τσιμπινός</p>';
        document.body.appendChild(dlg);
        dlg.querySelector(".cm-ab-x").onclick = function () { dlg.close(); };
        dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
      }
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    }
    function addCredit() {
      if (document.getElementById("cm-credit")) return;
      var st = document.createElement("style");
      st.textContent =
        "#cm-credit{display:none;align-items:center;justify-content:center;gap:6px 10px;flex-wrap:wrap;text-align:center;" +
        "font:12px/1.4 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#7a869c;" +
        "padding:18px 16px calc(64px + env(safe-area-inset-bottom,0px));clear:both;width:100%;box-sizing:border-box}" +
        "#cm-credit.on{display:flex;animation:cmcr .4s ease-out}@keyframes cmcr{from{opacity:0}to{opacity:1}}" +
                "#cm-credit button{display:inline-flex;align-items:center;gap:7px;font:600 13px/1 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#2a7fd4;" +
        "background:#fff;border:1px solid #cfe0f4;border-radius:999px;padding:7px 14px 7px 9px;cursor:pointer;box-shadow:0 2px 8px rgba(20,33,58,.08);transition:transform .12s,box-shadow .12s}" +
        "#cm-credit button:hover{box-shadow:0 4px 14px rgba(20,33,58,.14);transform:translateY(-1px)}" +
        "#cm-credit button:focus-visible{outline:3px solid #f0821e;outline-offset:2px}" +
        "#cm-about{border:0;border-radius:18px;padding:26px 24px 20px;max-width:min(360px,calc(100vw - 32px));text-align:center;" +
        "font:15px/1.45 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#14213a;background:#fff;box-shadow:0 18px 50px rgba(0,0,0,.3)}" +
        "#cm-about::backdrop{background:rgba(14,21,36,.55)}" +
        "#cm-about img{width:min(220px,60vw);height:auto;display:block;margin:0 auto 10px;border-radius:50%}" +
        "#cm-about h2{margin:4px 0 2px;font-size:22px}#cm-about p{margin:6px 0}" +
        "#cm-about .cm-ab-role{color:#2a7fd4;font-weight:600}#cm-about a{color:#2a7fd4;font-weight:600;text-decoration:none}" +
        "#cm-about hr{border:0;border-top:1px solid #e1e7f0;margin:14px 0}" +
        "#cm-about .cm-ab-apps{display:block;font-size:14px;color:#3d4a60}#cm-about .cm-ab-small{font-size:12px;color:#7a869c}" +
        "#cm-about .cm-ab-x{position:absolute;top:8px;right:10px;border:0;background:none;font-size:26px;line-height:1;color:#7a869c;cursor:pointer}" +
        "@media print{#cm-credit{display:none!important}}";
      document.head.appendChild(st);
      d = document.createElement("div");
      d.id = "cm-credit";
      d.innerHTML = '<button type="button" aria-haspopup="dialog"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="10.5" fill="#2a7fd4"/><circle cx="12" cy="7.4" r="1.6" fill="#fff"/>' +
        '<rect x="10.6" y="10.2" width="2.8" height="7.6" rx="1.4" fill="#fff"/><circle cx="19.2" cy="4.8" r="3.2" fill="#f0821e" stroke="#fff" stroke-width="1.4"/></svg>' +
        '<span>Σχετικά</span></button>';
      d.querySelector("button").onclick = about;
      document.body.appendChild(d);
      new MutationObserver(later).observe(document.body, {childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:["hidden"]});
      window.addEventListener("load", function () { setTimeout(check, 600); });
      later();
    }
    if (document.body) addCredit(); else document.addEventListener("DOMContentLoaded", addCredit);
  })();
  if (location.pathname === "/" || location.pathname === "/index.html") return;
  /* show it when: opened from the Suite in this window, came from the Suite page,
     or the app runs installed (its own window on PC, or from the phone's home screen) */
  var fromSuite = false;
  try { fromSuite = sessionStorage.getItem("cmSuite") === "1"; } catch (e) {}
  try {
    var ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.origin === location.origin && (ref.pathname === "/" || ref.pathname === "/index.html")) {
      fromSuite = true; try { sessionStorage.setItem("cmSuite", "1"); } catch (e) {}
    }
  } catch (e) {}
  var installed = false;
  try {
    installed = ["standalone", "minimal-ui", "window-controls-overlay", "fullscreen"].some(function (m) {
      return window.matchMedia("(display-mode: " + m + ")").matches;
    }) || window.navigator.standalone === true;
  } catch (e) {}
  /* opened through the Suite: hide this app's own install button / iPhone install tip
     and stop Chrome from offering to install it separately (the Suite is the installed app) */
  if (fromSuite) {
    var hide = document.createElement("style");
    hide.textContent = "#cm-install,#cm-ios{display:none!important}";
    (document.head || document.documentElement).appendChild(hide);
    var dropManifest = function () {
      var links = document.querySelectorAll('link[rel="manifest"]');
      for (var i = 0; i < links.length; i++) links[i].parentNode.removeChild(links[i]);
    };
    dropManifest();
    window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); e.stopImmediatePropagation(); }, true);
    document.addEventListener("DOMContentLoaded", dropManifest);
  }
  if (!fromSuite && !installed) return;
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
