var BIELA_API = "/api/chat"; // Servidor del asistente IA en Vercel (api/chat.js). Sin ANTHROPIC_API_KEY deriva a WhatsApp.
(function () {
  var TEL = "56930369843";
  function wa(t) { return "https://wa.me/" + TEL + "?text=" + encodeURIComponent(t); }

  // Videos en bucle continuo
  document.querySelectorAll("video[data-loop]").forEach(function (v) {
    function play() { var r = v.play(); if (r && r.catch) r.catch(function () {}); }
    v.addEventListener("ended", function () { v.currentTime = 0; play(); });
    v.addEventListener("pause", function () { if (!document.hidden) play(); });
    play();
  });

  // Pestañas
  document.querySelectorAll("[data-tabs]").forEach(function (g) {
    var btns = Array.prototype.slice.call(g.querySelectorAll("[data-tab-btn]"));
    var panels = Array.prototype.slice.call(g.querySelectorAll("[data-tab-panel]"));
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () {
        btns.forEach(function (x, j) { x.setAttribute("aria-selected", String(i === j)); });
        panels.forEach(function (p, j) { p.hidden = i !== j; });
      });
    });
  });

  // Abrir el servicio indicado en la URL (#srv-03)
  function abrirHash() {
    var id = location.hash.slice(1);
    if (!id) return;
    var d = document.getElementById(id);
    if (d && d.tagName === "DETAILS") {
      d.open = true;
      var y = d.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
  abrirHash();
  window.addEventListener("hashchange", abrirHash);

  // Carrusel de reseñas
  var track = document.querySelector("[data-track]");
  document.querySelectorAll("[data-track-dir]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (track) track.scrollBy({ left: track.clientWidth * 0.8 * Number(b.getAttribute("data-track-dir")), behavior: "smooth" });
    });
  });

  // Rotador ¿Sabías que?
  var avisos = Array.prototype.slice.call(document.querySelectorAll(".aviso"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".aviso-dot"));
  if (avisos.length) {
    var ai = 0, timer = null;
    var mostrar = function (i) {
      ai = i;
      avisos.forEach(function (a, j) { a.classList.toggle("on", j === i); });
      dots.forEach(function (d, j) { d.classList.remove("on"); void d.offsetWidth; if (j === i) d.classList.add("on"); });
    };
    var reiniciar = function () { clearInterval(timer); timer = setInterval(function () { mostrar((ai + 1) % avisos.length); }, 5200); };
    dots.forEach(function (d, j) { d.addEventListener("click", function () { mostrar(j); reiniciar(); }); });
    mostrar(0);
    reiniciar();
  }

  // Formulario "Solicita una hora"
  var fh = document.getElementById("form-hora");
  if (fh) {
    fh.addEventListener("submit", function (e) {
      e.preventDefault();
      var n = fh.nombre.value.trim(), a = fh.auto.value.trim(), m = fh.mensaje.value.trim();
      var txt = "Hola BMCARE Motorsport, quiero solicitar una hora." +
        (n ? "\nNombre: " + n : "") + (a ? "\nVehículo: " + a : "") + (m ? "\nNecesito: " + m : "");
      window.open(wa(txt), "_blank", "noopener");
    });
  }

  // Buscador de marcas
  var MARCAS = ["Abarth","Acura","Alfa Romeo","Alpine","Aston Martin","Audi","Baic","Bentley","BMW","Brilliance","Bugatti","Buick","BYD","Cadillac","Changan","Chery","Chevrolet","Chrysler","Citroën","Cupra","Dacia","Daewoo","Daihatsu","DFSK","Dodge","DS","Exeed","Ferrari","Fiat","Ford","Foton","GAC","Geely","Genesis","GMC","Great Wall","Haval","Honda","Hummer","Hyundai","Infiniti","Isuzu","JAC","Jaguar","Jeep","Jetour","Kia","Koenigsegg","Lada","Lamborghini","Lancia","Land Rover","Lexus","Lincoln","Lotus","Lucid","Lynk & Co","Mahindra","Maserati","Maxus","Maybach","Mazda","McLaren","Mercedes-Benz","MG","Mini","Mitsubishi","Nissan","Omoda","Opel","Pagani","Peugeot","Polestar","Porsche","RAM","Renault","Rivian","Rolls-Royce","Saab","Seat","Skoda","Smart","SsangYong","Subaru","Suzuki","Tata","Tesla","Toyota","Volkswagen","Volvo","Zeekr","Zotye"];
  var bq = document.getElementById("marca-q");
  var bres = document.getElementById("marca-res");
  var bsin = document.getElementById("marca-sin");
  var bsel = document.getElementById("marca-sel");
  function norm(t) { return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
  function elegirMarca(nombre) {
    if (!bsel) return;
    bsel.hidden = false;
    bsel.querySelector("[data-marca-nombre]").textContent = "¿Tienes un " + nombre + "?";
    bsel.querySelector("[data-marca-wa]").href = wa("Hola BMCARE Motorsport, tengo un " + nombre + ". ¿Pueden atenderlo? Quisiera más información.");
    bsel.setAttribute("data-marca", nombre);
  }
  if (bq) {
    var mItems = document.querySelectorAll("[data-marca-item]");
    var bcat = "all", bcount = document.getElementById("marca-count");
    var filtrar = function () {
      var q = norm(bq.value.trim()), vis = 0;
      mItems.forEach(function (el) { var ok = (!q || norm(el.getAttribute("data-marca-item")).indexOf(q) >= 0) && (bcat === "all" || (" " + el.getAttribute("data-cat") + " ").indexOf(" " + bcat + " ") >= 0); el.hidden = !ok; if (ok) vis++; });
      if (bsin) bsin.hidden = vis > 0;
      if (bcount) bcount.textContent = vis + (vis === 1 ? " marca" : " marcas");
    };
    bq.addEventListener("input", filtrar);
    document.querySelectorAll("[data-cat-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        bcat = b.getAttribute("data-cat-filter");
        document.querySelectorAll("[data-cat-filter]").forEach(function (o) { var on = o === b; o.classList.toggle("on", on); o.setAttribute("aria-pressed", on); });
        filtrar();
      });
    });
  }
  document.querySelectorAll("[data-logo-marca]").forEach(function (el) {
    el.addEventListener("click", function () { elegirMarca(el.getAttribute("data-logo-marca")); });
  });
  if (bsel) {
    bsel.querySelector("[data-marca-cerrar]").addEventListener("click", function () { bsel.hidden = true; });
    bsel.querySelector("[data-marca-biela]").addEventListener("click", function () {
      var m = bsel.getAttribute("data-marca");
      abrirChat();
      preguntar("Tengo un " + m + ". ¿Lo atienden en BMCARE y qué servicios le recomiendan?");
    });
  }

  // Asistente IA: ver assets/biela.js (se carga desde aquí)
  function abrirChat() { if (window.BZ) window.BZ.abrirChat(); }
  function preguntar(t) { if (window.BZ) window.BZ.preguntar(t); }
  (function () {
    var s = document.createElement("script");
    s.src = (/\/(marcas|servicios)\//.test(location.pathname) ? "../" : "") + "assets/biela.js";
    document.body.appendChild(s);
  })();
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".nav-marcas[open]").forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute("open"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") document.querySelectorAll(".nav-marcas[open]").forEach(function (d) { d.removeAttribute("open"); });
  });

  /* ---- Cookies y medición ---- */
  var GTM_ID = "GTM-COMPLETAR"; // reemplaza por tu ID real de Google Tag Manager
  var BASE = /\/(marcas|servicios)\//.test(location.pathname) ? "../" : "";
  function leerConsent() { var m = document.cookie.match(/(?:^|; )bm_consent=([^;]+)/); return m ? m[1] : ""; }
  function guardarConsent(v) { document.cookie = "bm_consent=" + v + "; max-age=" + (60 * 60 * 24 * 180) + "; path=/; SameSite=Lax"; }
  var gtmCargado = false;
  function activarMedicion() {
    if (gtmCargado || GTM_ID.indexOf("COMPLETAR") > -1) return;
    gtmCargado = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    var j = document.createElement("script"); j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
    document.head.appendChild(j);
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-evento]");
    if (!el || leerConsent() !== "si") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: el.getAttribute("data-evento"), pagina: location.pathname });
  });
  function avisoCookies() {
    if (document.getElementById("bm-cookies")) return;
    var d = document.createElement("div");
    d.id = "bm-cookies"; d.setAttribute("role", "region"); d.setAttribute("aria-label", "Aviso de cookies");
    d.style.cssText = "position:fixed;left:clamp(14px,2.5vw,26px);bottom:clamp(14px,2.5vw,26px);z-index:70;max-width:min(440px,calc(100vw - 104px));padding:16px 18px;background:linear-gradient(160deg,#15181b 0%,#0b0d0f 58%,#161a1e 100%);border:1px solid rgba(233,235,237,0.2);box-shadow:0 18px 44px rgba(0,0,0,0.6);color:rgba(233,235,237,0.9);font-size:13.5px;line-height:1.5";
    d.innerHTML = '<p style="margin:0">Usamos cookies de medición (Google Analytics y Google Ads) solo si las aceptas. <a href="' + BASE + 'politica-de-privacidad.html" style="color:#94bce3">Más información</a></p>' +
      '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">' +
      '<button type="button" data-c="si" style="min-height:40px;padding:0 18px;background:linear-gradient(135deg,#22384b 0%,#4a6f93 42%,#2c455d 70%,#5f89b0 100%);border:1px solid rgba(255,255,255,0.3);color:#fff;cursor:pointer;font-family:var(--font-heading);font-weight:600;font-size:14px;letter-spacing:0.1em;text-transform:uppercase">Aceptar</button>' +
      '<button type="button" data-c="no" style="min-height:40px;padding:0 18px;background:transparent;border:1px solid rgba(233,235,237,0.35);color:#fff;cursor:pointer;font-family:var(--font-heading);font-weight:600;font-size:14px;letter-spacing:0.1em;text-transform:uppercase">Rechazar</button></div>';
    d.addEventListener("click", function (e) {
      var b = e.target.closest("[data-c]"); if (!b) return;
      guardarConsent(b.getAttribute("data-c")); d.remove();
      if (b.getAttribute("data-c") === "si") activarMedicion();
    });
    document.body.appendChild(d);
  }
  if (leerConsent() === "si") activarMedicion(); else if (!leerConsent()) avisoCookies();
  document.querySelectorAll("[data-cookies-pref]").forEach(function (b) { b.addEventListener("click", avisoCookies); });

  document.querySelectorAll("form[data-cotizar]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var g = function (n) { var el = f.elements[n]; return el ? el.value.trim() : ""; };
      var t = "Hola BMCARE Motorsport, quiero cotizar: " + f.getAttribute("data-cotizar") + ".\nNombre: " + g("nombre") + "\nVehículo: " + g("vehiculo") + (g("km") ? "\nKilometraje: " + g("km") : "") + (g("necesidad") ? "\nNecesito: " + g("necesidad") : "");
      window.open("https://wa.me/56930369843?text=" + encodeURIComponent(t), "_blank", "noopener");
    });
  });

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rot = document.querySelector("[data-rotador]");
  if (rot && !reduce) {
    var fr = rot.querySelectorAll(".hero-frase"), fi = 0;
    setInterval(function () {
      fr[fi].classList.remove("on"); fr[fi].setAttribute("aria-hidden", "true");
      fi = (fi + 1) % fr.length;
      fr[fi].classList.add("on"); fr[fi].removeAttribute("aria-hidden");
    }, 3600);
  }
  if (!reduce && "IntersectionObserver" in window && document.querySelector("[data-hero]")) {
    var secs = document.querySelectorAll("main > section:not([data-no-reveal]), main > div:not([data-no-reveal])");
    var vh = window.innerHeight;
    document.documentElement.classList.add("rv-on");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("rv-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    secs.forEach(function (el) { if (el.getBoundingClientRect().top < vh) el.classList.add("rv-in"); else io.observe(el); });
  }

  document.querySelectorAll("[data-resena-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = document.getElementById(b.getAttribute("aria-controls")); if (!t) return;
      var open = t.classList.toggle("open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
      b.textContent = open ? "Mostrar menos" : "Leer reseña completa";
    });
  });
})();

(function(){function init(){var h=document.querySelector('header'),nav=h&&h.querySelector('nav[aria-label="Principal"]');if(!nav||h.querySelector('.nav-toggle'))return;
if(!nav.id)nav.id='nav-principal';var b=document.createElement('button');b.type='button';b.className='nav-toggle';b.setAttribute('aria-controls',nav.id);b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Abrir menú');b.innerHTML='<span aria-hidden="true"></span>';nav.parentNode.insertBefore(b,nav);
function set(o){h.classList.toggle('nav-open',o);b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú');if(!o)nav.querySelectorAll('details[open]').forEach(function(d){d.open=false})}
b.addEventListener('click',function(){set(!h.classList.contains('nav-open'))});
nav.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&h.classList.contains('nav-open')){set(false);b.focus()}});
document.addEventListener('click',function(e){if(h.classList.contains('nav-open')&&!h.contains(e.target))set(false)});
matchMedia('(min-width:761px)').addEventListener('change',function(m){if(m.matches)set(false)});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
