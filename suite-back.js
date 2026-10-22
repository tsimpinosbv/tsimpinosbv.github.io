/* Check Mate Suite: small "⌂ Suite" button that appears inside Check Mate, Ημερολόγιο and V.C. Tips
   only when they were opened from the Suite (tsimpinosbv.github.io). Tap it to return to the Suite. */
(function () {
  if (location.pathname === "/" || location.pathname === "/index.html") return;
  /* creator credit at the bottom of every app page (Check Mate, Ημερολόγιο, V.C. Tips).
     It stays hidden while the page is still loading ("Φόρτωση…") and fades in once the content is there. */
  (function credit() {
    var LOGO = "data:image/webp;base64,UklGRkQRAABXRUJQVlA4WAoAAAAQAAAAXwAAXwAAQUxQSKgAAAABgCTAbdxm/v9pHE0CYLb2EBETgK8e0lXjJbQcJ8sk2abIOkH2boq0UqiRYl0UbaFwA8WvqeCSKq6o5IJqjqnokKqepLIDqvtIhY9R5VNU+hDVPkPF3wRVfwtU/gugf59pxxeAbrwFNONNoBdn0IpD6MQpNOIY+vC8DZNdOIkmTPdgvgWbHdhtwHYe+2k4ZmGag28KzhmY+xHoRagPwR6kb9Fxjq5P8AVWUDggdhAAAPA5AJ0BKmAAYAA+VSKLRSOiIR1cRKw4BUS2AF2ZhyYb3nzNuW+5H0pkH6NuafJo5288v+A/5fsJ/NHsAfq16bf9Z+yvuQ/qP+W9RP88/0P7je9h+QHuE/v3qAf2P/Z+mB7BnoAfqh6ZH7l/B//Y/+H+3///+Qj9nP/r1gH//4hb+MdnH9l+qr1X/Ffmv73+XXIX6G/3Xon9H/w3kZ/p/yO81fgt/Q/kb8AX41/Mf8L+WXuIv0XAXsB82/zv+A/eb/M+jP/N+gv159gD9Xf9t6x/43wYfEvYC/mf9w/5nsu/zv/k/035ce1z6K/8n+Y+Ab+af2D/ef3r96v8j82/so/Z7//+8B+w3//ddup94xG/ihaVOyyAAdciacEBk2p0TvJ8/OaFSJvZY7cIYh5WM8llXw/5S4piMXLMiPR6r8XzEH3U99xzuqc9JR2bQLmv7vCeqNv1QI53+tg1mQA7wFVebdQSFZ9JFTJ/uN1Fmom9zqJvIgveAXQCM92wME8oGC0GJcVvef3gWiPj4AsBFTdegSgpQ2ACGdtPjHKZQI8LWxOsZxBHTuhQOvsoORrkJTRbdqsGaKa8kqvh57F76xOBagHMHfC8wjysZ4X6iy3mW3rj+LhSPAAA/vvHf//i4P//Fmn//4oNuak4Dde8BP/+vhbeGaDkcMoUFB1GbuqUxXwemRQzeG4bbOmOHYHOvuSNEZW4ZaIY/98hzFi3en7/6tJfm36oMTxTzRgcRnnK10Dn0gCJDl0szWKiuRajmOkj8zyPW2Fk4wN7SAVbqwsWtawm9+8dmUkU/cObUzX2R5GpRr5Ya8vAHGW+cJj3dfUHmTdvGw8WrQukM4zApOvj13PzeWVGnB8Ky/nMv3e8YZyXnZ+Sw4rhgjki+Ox8doENfo2fxRju4EwMap4sY+LisHg83j2sg9/r5VGBkpy3jQa7spt+A4TgI9lPpy7yINB+WN20lhztUKl+FaiDC2vohuzuBn0dWVnBJAck9OyWaltbYop9znD5qvUywBFOlV3WlzUIDj7SAB3daoStiUzHTu+0DRwSDQOi7OHFV7otDUZGt+ATdDsAYdR7MUcg6G3hKug42LX5EHLK2g/ob+32ir3/rGw4koWvfPL6cR+33W41pNOco0Uflti+iGiOeqzSYw/lusd8GJ+9HEHUjiU0O1xRTUCNmvlMyboCVBNsimphtiUvdRBAPXwMPWnmXrfW27kRSeZ5D8fxJluqlVKZWieJPb/+7Osw5wB3TBIBf/8AF3Istot9rzr3E/D1bu9dnsW/KmeUcHCD7ZfM0XX76ULf2oYYVibcHolS/zdkeuObPo2oBpyC7uGvpVBIaC3tR8sQHreBsLrvjL/vrXmZmfW8ReF3+xlG81VQ2PPg2gJKozeJVbOuK8S/0aBLVVF229VR5w5O7dfMIQ5nEUZmMr1a1wKIx5QEUbRTVx6n86bRd0ozvJuixSMVekcYWafvA2E+PM3KrzLOZT5fuq0FxiSdmz7uxJwxibHAReBsXqgve6m05jmBWEvrSScALwIVqo4tVuiWYJMdmEIet2wFj+CP81C5odnfpwWsQF1EXl2UH7/EIZk20akNK00XapIeqIR+iB+2HNwXWEXz+n0lsRaYwWzSv/tEjmydAP1sFjbjYjLADoclKpK235BnCI7doHX07ts2UcWXVKq0oTxzKn9nTT1ROyTvtXhnlrwRRWRcLBPmzL4o3odiyFdXh4l6cnGDPefwXNZp5lmLkoxYPrVC75GLCjoXaasSnuzLXQo+F2Tby3HVnWqeZg5Humt30f39MGAGxfC5XF6r+uJNQ4QpRFW4bs7JtyyQXUIJl+z3wd72+0QlfiAq/oCUNKXs3550ozVHrqBPai6PAmBWgPDtAxrAfdp3iP6nOHJU3SLXzqdZmzVUguXRY9hp4DFSdb4KGrE14XOJlgNUYWpZeitni38CknRw19BkqOOzmt8+HL/ihf6hLqBZ/T4mCta//ccTZvYRO7Lc8Tma2Gc6DPJnC961ZR9BINQEDpdET4+3jLFTjTb65YvcMq6TN0pttsW+mQ2siOKip62WloHJdREQJ9+CxOluiFOmeWxv4C5eA/eP42ghn8CAid+KhQkSFsyJaPYjlHvVqAcQR3e21AMU6ei6zWNTW2yAoeM73fGpPAvMxSKKs9ZuGDpK+9v5EuL2VZeDgjk6DTqBWfvQFVnf8fgqHZ4V5T7N7o/wFB73Q4nnPQKr7uUEPyfCAyTXFV3ZgA7IhPaZiZXBai3e2czBDEZM22zdN4qtcZJlzDQxY86Mtso+b9OP08MHpWfz74BMCIWY+ZjqQxY38SwKLmd2is1eAKMkd/bVlrS+eUdQvD6mYra2nuof5/jELrPeOpWrD5eIeP4+73zF9VB4A6OZoEpKi1rer/TdVlYHfjxn6t8b2wJ4DKm4/02lAaPhNoBjyIYt2VmS68C0UXE/dDtAgEb20+WKwnA39N/f3F+vnq6/Ke1DMCzCJbF8S8ervPGOrD/s2CTPqyodLntGfrSKjN4k0sqznrLlxOya0CF3M5PZIMJkfwn5GMFzhlqmdcdR6qBJC6uN6KuZmbzBMlR5A85oumkuNppaILuVp8lUczqZ58io0GJ+EG9YiONwGMUjQsrnjZVaXblqeczXK7JYHARiJ/mL4Q4GfoAZfes5XOl/gDYWP2Ls54/7AEcP27D9DZgmMG2VD+jx4a8W5dxMAzedUfM83TQN4pB7rZ5DVLQghYK1nSadJZY3sEI/BtYAaXG29XOOgolqEpPiDfzAS5KMPxG1trPzdz8RyWT7Np1rTHj8dFZ2475jpFtPxCa/1dMs8ZFQ59G/we/rT+/VbtRWkRGq6Pr9rnia6IvRGeTN8KQbDPUbhnPfyNqVdkiMkzIplei2jUKRnY3AJghwVUi+4k76+R1MQThp4XMYRUgnKSmXL0XrJbJo8sEZPsDc7IB1m5qt/1R+Lq7i/xvOoI7owFr+qR11n+M9reEG4uWEJB+GUqj4yKarlBnLfTj9gJ0VZ5ON83dYgYHhDrEwzEY5jO7jf35sF89zUtNqVIcySgxVLLPVrO9hf7p/7DmhZKshwrc21F2VFe//7VJaS4yIPAVIv70Lskd0nU573/aPXqDZCSp8UJ3HUgGp63UMcaQEeJ8tDGUVn8NlGkDN4LsEGWMVV65V7tr1lz0fylLzv3ou/F2g0lvPkZ5ft5/4Y/SVSL8OlB6uhC6+o/7fDq/9AvuSpszptQA9yggTCxe8Egmtz8v+D//EXshsPV6dteZRBaiYcsmhnGeNE/ol7OPbKEDwAbmbbMPmzGdhJ0ns76dRYMiCVxCJzNKUhpwzwFRAF0PeO88d9jQHzkBGgw2qL074VPQDSVFkOfS0mkWg4LGL/4hqOwUOYPiPNS+TShIw2SsTAfcAM67PpAYitP8+k7IdNZ+z6ROH8KO8ZPUyKIbY5p/cd8ur43s2gXxE//UPsS+Lskk/JdWEqTTR1Oc067xvDxJnjGSLXEdjcq9OPrMQxKtc9Y7p1/tq5WbIiFKkGrOULB28ke4IJQ2PbI77/37AQ5uQ5Mc5NDyiAqalIJf1ZbIve/nYy1Hu4f2sR391fPQud0vbLeSpb3cKPwb1D9U3UDPBiV+OE1V+VHq2nDZJcpoQdNKMc7yebh6pieePKAi+KnAXlZZb9C4XK+ZgcnIDjcofrpqDmKqmCy/RW+oIT79plwpOI5BiGTHUASDNtAvZFD0LdeDB+P2rCV1Hji3LoxHiUjbGvktFBVXmB7H9HxuBrQ+EJ835UtkHZBYIj9Y/iU30QHA4fI2YPVpLReeUKOxzGEGmoYHDTy5diL40/O7lvZEX2NzbFwo99+p5cu5KTegjRc1oqYjWcXQ/3/tbA5YN0x872YBeIwWqQlsXMm9QQFkrf5pbh+KvLgupc2YsgCBCqbp6372uNoZDEy2E3IP6fDHWNEjTrBDKceC5QMxJULMGyQmRIN/Zf1he9KtuZAp4lZdp7UlQIUnRPr6/I5pQd5XKYc5rtvf8n6/F9QKiUFD1CgelKNxZWIG5vVeIAs2WMUjehFyIIPk0nzaRqj11MluMulHbr+wutmcUYvVdcxi0MR1Zp1xS6YVAhCYvhGi3b6m2Oaao0zr/UDm4vbuzdzhK4/Z9whB9Ry+LuL4xHHaBl4pp7tYSqLeiKbGmJAJlMZYUNF5Q84K6HSAGTBty456cr/QDHrayxm1bYXcuAu9mOJio3HM+4BBvnA2igPRoQAUo/zib8C0VnCCWw/cMQfqG7NFKx57jCMr6Lc2iMGTMp7pkYM3F9tHOqWfn0obzG23cswmzyrf03pGxRNBK6U12s4feQZdmRbrcfrDLIBrvQM5ldNklD6crLZviZyidahKDImnCr4+f+c53KJuobF6MK3IkIrGpkmveAU5IjemqOAHg6geHIjF/CoTk49L03geH0Xz24lHkLuQunThAO3cb9y4GpVrK0DH2t+aIOQ4zgP+Nw5fE3ZiaVTQtg+ybvsiDylgQs/HfC5ysqX7EQvt81gz9dDw0vSA+2ch9kfzLoPfsAGrBIiwc4y6Tzm45UXaRRc0a9u2ntWeR8EdE4BmYUUvtCUH2afrelFWuyu8zFfMFJpN3bLV74RTG4Dta7JsLCnQn9iuQ5+IJbvKpJjLWFP2a+2hR1Y7UvmfXcaD5rIklYXN6UH88q8vsEMl8mAXlltZES8dxMbe6ZvVswtNkbl1CFrqZ4N9LCWeSJ3hZCTRR7EuBuY8Xz2vLrEOTq35M3sAny9N3wGa3iX3e3VFyisJrkfKMrOjvgeJiNbHMxeEQGiboDPmQ6EVWxxH5h6Bs27Zg37Xh0L2FqZ9RpqmoUY6Y9NTnTD56G+cesWWTxFeLOh6VZr0bzeHIZG6tWMeYUb2avBtyS/lHA0/bpL1Vcq5gJvr/c2GCpP2CfFeFmxmeTbwEryEqwdZvmBzIw+2vyoaSX7RJqkVOIXQeWhRUKgI8vyDVmljF02X7KqKGrQcau1VoCvAlLyz1hjvfip07Xj95f/3Z+2LAAA8irSPR+Apyuki4hBlAbgJs2Qmje5VjWqHNX1fsmsP3/YhSWij9+HjB7DIRO615E9hrCCLmqEr+oFc8ch6ilOPSMjRleOdSfQ6MIor79cq75py3S1pGTjkBMjMOmdqf6G4gS0jGkDGqPx2SXsn+/TX4Xl5d3wtVEtzWeELo0mriH4BugcTmO2tWAmBVs9u7fx0zhGIZzxeWQGifDfY7G6A8I0HBVnbNInyeGEAuf76UA8qpsslQ/0D7oSz27bBqvy2nKLDgSbF5XGAEmOeJJ/V84zUpk+z3nykuF2h2/RyYtx52aYLklD0/aOqtJ4GAD6atquyLWidTBjFZczr5iMWSvgiBkSeQgVbijzFIq5kXcN/mUMk2HLWeAnhpXXWwDR9BpsXrozCWHjp7rejcz0LlsYTVXrLxbwwrCwAaj/n+lf00zuSFbjhFO9vygcA0Ixato8eP3nrOs1AbKmG6X4RzbUw1sgLzU0fJmFefW7K5QCJq2Jb+4ufFWDGNGWAcuvjhLEQloPHA89fYamKFHaIsqbmT871Ap91qWvqKZiFxLJYx//h3P//yCf//kAv//8fUgnzea4HQAAAA";
    var d = null, timer = 0;
    function loading() {
      if (document.readyState !== "complete" || document.getElementById("boot")) return true;
      var t = (document.getElementById("root") || document.getElementById("app") || document.body).innerText || "";
      return /Φόρτωση[^\n]*…/.test(t);
    }
    function check() {
      timer = 0; if (!d) return;
      var show = !loading();
      if (show !== d.classList.contains("on")) d.classList.toggle("on", show);
    }
    function later() { if (!timer) timer = setTimeout(check, 400); }
    function addCredit() {
      if (document.getElementById("cm-credit")) return;
      var st = document.createElement("style");
      st.textContent =
        "#cm-credit{display:none;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;text-align:center;" +
        "font:12px/1.4 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#7a869c;" +
        "padding:18px 16px calc(64px + env(safe-area-inset-bottom,0px));clear:both}" +
        "#cm-credit.on{display:flex;animation:cmcr .4s ease-out}" +
        "@keyframes cmcr{from{opacity:0}to{opacity:1}}" +
        "#cm-credit img{width:40px;height:40px;border-radius:50%;flex:none;box-shadow:0 1px 4px rgba(0,0,0,.15)}" +
        "#cm-credit b{font-weight:600}#cm-credit a{color:inherit;text-decoration:underline;text-underline-offset:2px}" +
        "@media print{#cm-credit{padding-bottom:0}}";
      document.head.appendChild(st);
      d = document.createElement("div");
      d.id = "cm-credit";
      d.innerHTML = '<img src="' + LOGO + '" alt="Γιάννης Τσιμπινός" width="40" height="40">' +
        '<span>Δημιουργός: <b>Γιάννης Τσιμπινός</b> · <a href="mailto:tsibinos@gmail.com">tsibinos@gmail.com</a></span>';
      document.body.appendChild(d);
      new MutationObserver(later).observe(document.body, {childList:true, subtree:true, characterData:true});
      window.addEventListener("load", function () { setTimeout(check, 600); });
      later();
    }
    if (document.body) addCredit(); else document.addEventListener("DOMContentLoaded", addCredit);
  })();
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
