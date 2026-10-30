/* Check Mate Suite: small "⌂ Suite" button that appears inside Check Mate, Ημερολόγιο and V.C. Tips
   only when they were opened from the Suite (tsimpinosbv.github.io). Tap it to return to the Suite. */
(function () {
  /* personal display setting (all apps on this site share it): theme — follows the phone/computer until the
     user taps the light/dark switch in the footer, then light or dark is remembered on this device */
  var PREF = { theme: "" };
  try { PREF.theme = localStorage.getItem("cm-theme") || ""; localStorage.removeItem("cm-big"); localStorage.removeItem("cm-compact"); } catch (e) {}
  function applyPrefs() {
    var r = document.documentElement;
    if (PREF.theme === "light" || PREF.theme === "dark") r.setAttribute("data-theme", PREF.theme); else r.removeAttribute("data-theme");
    r.classList.remove("cm-compact"); r.classList.remove("cm-big");
  }
  applyPrefs();
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
    /* light / dark switch: one tap changes the look (remembered on this device, for all apps on this site) */
    var DARKQ = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
    function isDark() { return PREF.theme ? PREF.theme === "dark" : !!(DARKQ && DARKQ.matches); }
    var MOON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="#2a7fd4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';
    var SUN = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="#f0a020" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>';
    function themeLabel(btn) {
      var dark = isDark();
      btn.innerHTML = dark ? SUN : MOON;
      btn.title = dark ? "Αλλαγή σε ανοιχτό θέμα" : "Αλλαγή σε σκούρο θέμα";
      btn.setAttribute("aria-label", btn.title);
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
    }
    function toggleTheme(btn) {
      PREF.theme = isDark() ? "light" : "dark";
      try { localStorage.setItem("cm-theme", PREF.theme); } catch (e) {}
      applyPrefs(); themeLabel(btn);
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
        "#cm-credit .cm-themebtn{width:34px;height:34px;padding:0;justify-content:center;border-radius:50%}" +
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
        "@media (prefers-color-scheme:dark){:root:not([data-theme=light]) #cm-credit{color:#97a3ba}" +
        ":root:not([data-theme=light]) #cm-credit button{background:#1b2436;border-color:#33405a;color:#7cb8f5;box-shadow:none}" +
        ":root:not([data-theme=light]) #cm-about{background:#1b2436;color:#eef2f8}" +
        ":root:not([data-theme=light]) #cm-about a,:root:not([data-theme=light]) #cm-about .cm-ab-role{color:#7cb8f5}" +
        ":root:not([data-theme=light]) #cm-about hr{border-top-color:#33405a}" +
        ":root:not([data-theme=light]) #cm-about .cm-ab-apps{color:#c5cfdf}}" +
        ":root[data-theme=dark] #cm-credit{color:#97a3ba}:root[data-theme=dark] #cm-credit button{background:#1b2436;border-color:#33405a;color:#7cb8f5;box-shadow:none}" +
        ":root[data-theme=dark] #cm-about{background:#1b2436;color:#eef2f8}" +
        ":root[data-theme=dark] #cm-about a,:root[data-theme=dark] #cm-about .cm-ab-role{color:#7cb8f5}:root[data-theme=dark] #cm-about hr{border-top-color:#33405a}" +
        ":root[data-theme=dark] #cm-about .cm-ab-apps{color:#c5cfdf}" +
        "@media print{#cm-credit{display:none!important}}";
      document.head.appendChild(st);
      d = document.createElement("div");
      d.id = "cm-credit";
      d.innerHTML = '<button type="button" aria-haspopup="dialog"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="10.5" fill="#2a7fd4"/><circle cx="12" cy="7.4" r="1.6" fill="#fff"/>' +
        '<rect x="10.6" y="10.2" width="2.8" height="7.6" rx="1.4" fill="#fff"/><circle cx="19.2" cy="4.8" r="3.2" fill="#f0821e" stroke="#fff" stroke-width="1.4"/></svg>' +
        '<span>Σχετικά</span></button>' +
        '<button type="button" class="cm-themebtn"></button>';
      d.querySelector("button").onclick = about;
      var tb = d.querySelector(".cm-themebtn"); themeLabel(tb);
      tb.onclick = function () { toggleTheme(tb); };
      if (DARKQ && DARKQ.addEventListener) DARKQ.addEventListener("change", function () { themeLabel(tb); });
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
  /* app switcher (bottom-left): Κεντρική (Suite home) + the two other apps. Logging out stays where it is:
     the «Αποσύνδεση» button of each app and of the Suite home screen. */
  function add() {
    if (document.getElementById("cm-suite-back")) return;
    var APPS = [
      {k:"home",  url:"/",                          icon:"/icon-192.png",                   name:"Κεντρική"},
      {k:"cm",    url:"/checkmate/checkmate.html",  icon:"/checkmate/icons/icon-192.png",   name:"Check Mate"},
      {k:"diary", url:"/checkmate/imerologio.html", icon:"/checkmate/icons/diary-192.png",  name:"Ημερολόγιο"},
      {k:"vct",   url:"/vctips/",                   icon:"/vctips/icons/icon-192.png",      name:"V.C. Tips"}
    ];
    var p = location.pathname;
    var cur = /imerologio/.test(p) ? "diary" : /^\/vctips\//.test(p) ? "vct" : /^\/checkmate\//.test(p) ? "cm" : "";
    var css = document.createElement("style");
    css.textContent =
      "#cm-suite-back{position:fixed;left:8px;bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:80;-webkit-tap-highlight-color:transparent}" +
      "#cm-suite-back .tg{width:34px;height:34px;border-radius:50%;border:0;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;" +
      "background:rgba(255,255,255,.82);box-shadow:0 2px 8px rgba(20,33,58,.25);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);transition:transform .15s}" +
      "#cm-suite-back .tg:active{transform:scale(.9)}#cm-suite-back .tg svg{width:20px;height:20px;transition:transform .2s}" +
      "#cm-suite-back.open .tg{background:#e4effb;box-shadow:0 0 0 2px #2a7fd4}" +
      "#cm-suite-back .tg:focus-visible,#cm-suite-back .pop a:focus-visible{outline:2px solid #f0821e;outline-offset:2px}" +
      "#cm-suite-back .pop{position:absolute;left:0;bottom:42px;display:flex;flex-direction:column;gap:6px;padding:6px;border-radius:14px;" +
      "background:rgba(255,255,255,.97);box-shadow:0 8px 24px rgba(20,33,58,.28);opacity:0;transform:translateY(8px) scale(.96);" +
      "transform-origin:bottom left;pointer-events:none;transition:opacity .15s,transform .15s}" +
      "#cm-suite-back.open .pop{opacity:1;transform:none;pointer-events:auto}" +
      "#cm-suite-back .pop a{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;text-decoration:none}" +
      "#cm-suite-back .pop a:hover{background:#eef4fb}#cm-suite-back .pop a:active{transform:scale(.92)}" +
      "#cm-suite-back .pop img{width:30px;height:30px;border-radius:7px;display:block;box-shadow:0 1px 3px rgba(20,33,58,.2)}" +
      "#cm-suite-back .pop svg{width:26px;height:26px;display:block}" +
      "@media print{#cm-suite-back{display:none}}";
    document.head.appendChild(css);
    var HOUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.2 11.2 12 3.6l8.8 7.6" fill="none" stroke="#2a7fd4" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M5.6 10.2V20h4.6v-5.2h3.6V20h4.6v-9.8" fill="#2a7fd4"/><circle cx="18.4" cy="5.4" r="2.2" fill="#f0821e"/></svg>';
    var GRID = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7.5" height="7.5" rx="2" fill="#2a7fd4"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2" fill="#2a7fd4"/>' +
      '<rect x="3" y="13.5" width="7.5" height="7.5" rx="2" fill="#2a7fd4"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" fill="#f0821e"/></svg>';
    var nav = document.createElement("nav");
    nav.id = "cm-suite-back";
    nav.setAttribute("aria-label", "Εφαρμογές Check Mate Suite");
    nav.innerHTML = '<div class="pop" id="cm-sw-pop">' + APPS.filter(function (x) { return x.k !== cur; }).map(function (x) {
      var label = x.k === "home" ? "Κεντρική οθόνη (Check Mate Suite)" : "Άνοιγμα " + x.name;
      return '<a href="' + x.url + '" tabindex="-1" title="' + (x.k === "home" ? "Κεντρική" : x.name) + '" aria-label="' + label + '">' +
        (x.k === "home" ? HOUSE : '<img src="' + x.icon + '" alt="" width="30" height="30">') + "</a>";
    }).join("") + '</div><button type="button" class="tg" aria-expanded="false" aria-controls="cm-sw-pop" title="Εφαρμογές" aria-label="Εφαρμογές">' + GRID + '</button>';
    document.body.appendChild(nav);
    var tg = nav.querySelector(".tg"), links = nav.querySelectorAll(".pop a");
    function setOpen(o) {
      nav.classList.toggle("open", o); tg.setAttribute("aria-expanded", o ? "true" : "false");
      for (var i = 0; i < links.length; i++) links[i].tabIndex = o ? 0 : -1;
    }
    tg.onclick = function (e) { e.stopPropagation(); setOpen(!nav.classList.contains("open")); };
    document.addEventListener("click", function (e) { if (!nav.contains(e.target)) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }
  if (document.body) add(); else document.addEventListener("DOMContentLoaded", add);
})();

/* «Νέα έκδοση» button: each app page carries <meta name="app-build">. Every few minutes (and whenever the app is
   brought back to the screen) the page asks the server for its latest copy; if the build differs, a small orange
   button appears. Tapping it fetches the fresh files and reloads — no need to reinstall the app. */
(function () {
  var meta = document.querySelector('meta[name="app-build"]');
  if (!meta || !window.fetch) return;
  var mine = meta.content, shown = false, busy = false, last = 0;
  function show() {
    if (shown) return; shown = true;
    var st = document.createElement("style");
    st.textContent =
      "#cm-upd{position:fixed;left:50%;top:calc(10px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:2147483000;" +
      "display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:10px 16px 10px 12px;cursor:pointer;" +
      "background:#f0821e;color:#fff;font:600 14px/1.2 'Commissioner',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;" +
      "white-space:nowrap;box-shadow:0 8px 24px rgba(20,33,58,.35);animation:cmupd .35s ease-out;max-width:calc(100vw - 24px)}" +
      "#cm-upd svg{width:20px;height:20px;flex:none;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}" +
      "#cm-upd small{font-weight:400;opacity:.9}#cm-upd:focus-visible{outline:3px solid #14213a;outline-offset:2px}" +
      "#cm-upd.busy svg{animation:cmspin 1s linear infinite}" +
      "@keyframes cmupd{from{opacity:0;transform:translate(-50%,-12px)}to{opacity:1;transform:translate(-50%,0)}}" +
      "@keyframes cmspin{to{transform:rotate(360deg)}}" +
      "@media (prefers-reduced-motion:reduce){#cm-upd,#cm-upd.busy svg{animation:none}}@media print{#cm-upd{display:none}}";
    document.head.appendChild(st);
    var b = document.createElement("button");
    b.type = "button"; b.id = "cm-upd"; b.setAttribute("role", "status");
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>' +
      '<span>Νέα έκδοση <small>· πάτα εδώ</small></span>';
    b.onclick = update;
    document.body.appendChild(b);
  }
  function update() {
    var b = document.getElementById("cm-upd"); if (b) { b.classList.add("busy"); b.disabled = true; }
    /* refresh the browser's copies of this page and its own scripts/styles, then reload */
    var urls = [location.href.split("#")[0]];
    [].forEach.call(document.querySelectorAll("script[src],link[rel=stylesheet][href],link[rel=manifest][href]"), function (el) {
      var u = el.src || el.href; if (u && u.indexOf(location.origin) === 0) urls.push(u);
    });
    var jobs = urls.map(function (u) { return fetch(u, { cache: "reload" }).catch(function () {}); });
    Promise.all(jobs).then(function () { location.reload(); }, function () { location.reload(); });
    setTimeout(function () { location.reload(); }, 8000);
  }
  function check() {
    if (shown || busy || document.visibilityState === "hidden" || !navigator.onLine) return;
    if (Date.now() - last < 60000) return;
    busy = true; last = Date.now();
    fetch(location.pathname + "?v=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.ok ? r.text() : ""; })
      .then(function (t) {
        var m = /<meta name="app-build" content="([^"]*)"/.exec(t || "");
        if (m && m[1] && m[1] !== mine) show();
      })
      .catch(function () {})
      .then(function () { busy = false; });
  }
  setTimeout(check, 8000);
  setInterval(check, 5 * 60 * 1000);
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") check(); });
  addEventListener("online", check);
})();
