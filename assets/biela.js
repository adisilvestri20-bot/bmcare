// Asistente IA de BMCARE Motorsport. Expone window.BZ = { abrirChat, preguntar }.
(function () {
  var TEL = "56930369843";
  function wa(t) { return "https://wa.me/" + TEL + "?text=" + encodeURIComponent(t); }
  var RAIZ = /\/(marcas|servicios)\//.test(location.pathname) ? "../" : "";
  var LOGO = RAIZ + "assets/img/logo-empresa.webp";
  var viejo = document.getElementById("biela"); if (viejo) viejo.remove();
  var oldTg = document.getElementById("biela-toggle");
  var SVG = function (p) { return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>"; };
  var IC = {
    diag: SVG('<path d="M3 12h3l2-5 4 10 2-5h7"/><circle cx="12" cy="12" r="10" opacity=".35"/>'),
    mant: SVG('<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8-1.3-1.3a4 4 0 0 0-5-5l2.6 2.6-2.1 2.1L9.6 5.8"/><path d="M3 21l6-6"/>'),
    fren: SVG('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21"/><path d="M16.5 5.2a8 8 0 0 1 2.3 2.3" stroke-width="2.4"/>'),
    motor: SVG('<path d="M4 10h2V8h4V6h4v2h3l2 2h2v6h-2l-2 2H8l-2-2H4z"/><path d="M2 11v4M10 11v4M14 11v4"/>'),
    susp: SVG('<path d="M12 2v3M12 19v3"/><path d="M8 5h8l-8 3h8l-8 3h8l-8 3h8l-8 3h8"/>'),
    cot: SVG('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6M9 9h2"/>'),
    clip: SVG('<path d="M21.4 11.05 12.2 20.2a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8"/>'),
    send: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12 2-12 2z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.1.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.6.4-3-.3a9 9 0 0 1-3.7-3.7c-.7-1.4-.6-2.4-.3-3z" fill="currentColor" stroke="none"/></svg>',
    arrow: SVG('<path d="M5 12h14M13 6l6 6-6 6"/>')
  };
  var ATAJOS = [["diag", "Diagnóstico", "Necesito un diagnóstico para mi auto"], ["mant", "Mantenciones", "Necesito una mantención"], ["fren", "Frenos", "Tengo una consulta sobre frenos"], ["motor", "Motor", "Tengo una consulta sobre el motor"], ["susp", "Suspensión", "Tengo una consulta sobre la suspensión"], ["cot", "Cotizar servicio", "Quiero cotizar un servicio"]];

  var chat = document.createElement("div");
  chat.id = "biela"; chat.className = "bz-panel"; chat.hidden = true;
  chat.setAttribute("role", "dialog"); chat.setAttribute("aria-labelledby", "bz-titulo");
  chat.innerHTML =
    '<div class="bz-head"><span class="bz-logo"><img src="' + LOGO + '" alt="" width="44" height="44"></span>' +
    '<div class="bz-head-tx"><div id="bz-titulo" class="bz-tit">Biela</div><div class="bz-sub">Asistente IA de BMCARE · <i class="bz-dot" aria-hidden="true"></i> En línea</div></div>' +
    '<button type="button" class="bz-hb" id="biela-min" aria-label="Minimizar chat"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg></button>' +
    '<button type="button" class="bz-hb" id="biela-close" aria-label="Cerrar chat"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
    '<div class="bz-body"><div id="biela-msgs" class="bz-msgs" aria-live="polite"></div>' +
    '<div id="biela-adj" class="bz-adj" hidden></div>' +
    '<a id="biela-ejecutivo" class="bz-esp" data-evento="click_whatsapp" target="_blank" rel="noopener" href="#">' + IC.wa + '<span>Hablar con un especialista</span>' + IC.arrow + '</a>' +
    '<form id="biela-form" class="bz-form"><label class="bz-clip" aria-label="Adjuntar foto" title="Adjuntar foto">' + IC.clip + '<input id="biela-file" type="file" accept="image/*" multiple hidden></label>' +
    '<input id="biela-input" class="bz-in" aria-label="Escribe tu consulta" placeholder="Escribe tu consulta..." autocomplete="off">' +
    '<button type="submit" class="bz-send" aria-label="Enviar consulta">' + IC.send + '</button></form></div>';
  document.body.appendChild(chat);

  var fab = document.createElement("div");
  fab.className = "bz-fabwrap";
  fab.innerHTML = '<span class="bz-tip" aria-hidden="true">¿Necesitas ayuda con tu auto?</span><button id="biela-toggle" type="button" class="bz-fab" aria-label="Abrir chat con Biela, asistente de BMCARE" aria-expanded="false" aria-controls="biela"><img src="' + LOGO + '" alt="" width="48" height="48"></button>';
  if (oldTg) oldTg.replaceWith(fab); else { fab.classList.add("bz-solo"); document.body.appendChild(fab); }

  var msgsEl = document.getElementById("biela-msgs");
  var form = document.getElementById("biela-form");
  var input = document.getElementById("biela-input");
  var fileIn = document.getElementById("biela-file");
  var adjEl = document.getElementById("biela-adj");
  var ejecutivo = document.getElementById("biela-ejecutivo");
  var tg = document.getElementById("biela-toggle");
  function hora() { return new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }); }
  var mensajes = [{ rol: "bot", texto: "¡Hola! 👋\nSoy Biela, la asistente de BMCARE Motorsport.\n¿En qué podemos ayudarte?", hora: hora(), saludo: true }];
  var CIERRE = "¿Te paso con un especialista por WhatsApp con tu ficha armada? Toca “Hablar con un especialista”.";
  var FALLA = "Ahora no puedo responder por aquí, pero un especialista te atiende por WhatsApp. Toca “Hablar con un especialista” y te llevamos con tu consulta ya escrita.";
  var archivos = [];
  var cargando = false;

  var SISTEMA = "Eres Biela, la asistente IA de BMCARE Motorsport, taller independiente en Los Trabajadores 4454, Huechuraba, Santiago, que atiende todo tipo de vehículos y se especializa en alta gama europea y asiática. Horario: lunes a viernes 08:00-18:00 y sábado 09:00-13:00. WhatsApp +56 9 3036 9843. " +
    "Conoces toda el área de mecánica automotriz y puedes mirar las fotos que adjunte el cliente. Responde en español de Chile, claro y breve (máximo 120 palabras). " +
    "REGLAS OBLIGATORIAS: 1) Nunca des precios, rangos de precio ni costos estimados; si te los piden, explica que el presupuesto lo entrega el taller después de revisar el auto. " +
    "2) Nunca des un diagnóstico definitivo: habla de causas posibles y aclara que solo la revisión en el taller lo confirma. " +
    "3) Si aún no conoces la marca, el modelo, el año y el kilometraje del auto, pregúntalos antes de orientar (pide solo los que falten). " +
    "4) Si el síntoma implica riesgo (frenos, dirección, temperatura alta, humo, testigo rojo), dilo primero y recomienda no manejar. " +
    "5) Termina SIEMPRE ofreciendo pasar a WhatsApp con un especialista, con la ficha de la consulta ya armada. " +
    "No uses emojis ni símbolos decorativos.";

  function burbuja(m) {
    var user = m.rol === "user";
    var row = document.createElement("div");
    row.className = "bz-row " + (user ? "bz-u" : "bz-b");
    if (!user) { var av = document.createElement("span"); av.className = "bz-av"; av.innerHTML = '<img src="' + LOGO + '" alt="" width="34" height="34">'; row.appendChild(av); }
    var b = document.createElement("div");
    b.className = "bz-bub";
    if (m.typing) { b.innerHTML = '<span class="bz-typing" role="status" aria-label="Escribiendo…"><i></i><i></i><i></i></span>'; }
    else {
      var t = document.createElement("div"); t.className = "bz-tx"; t.textContent = m.texto; b.appendChild(t);
      var h = document.createElement("div"); h.className = "bz-time"; h.textContent = m.hora || "";
      if (user) h.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 18 12" width="16" height="11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Enviado"><path d="M1 6.5 4.5 10 11 2M7 9.2 7.8 10 14.5 2"/></svg>');
      b.appendChild(h);
    }
    row.appendChild(b);
    return row;
  }
  function grillaAtajos() {
    var g = document.createElement("div"); g.className = "bz-grid";
    ATAJOS.forEach(function (a) {
      var btn = document.createElement("button"); btn.type = "button"; btn.className = "bz-chip";
      btn.innerHTML = '<span class="bz-ic">' + IC[a[0]] + "</span><span>" + a[1] + "</span>";
      btn.addEventListener("click", function () { preguntar(a[2]); });
      g.appendChild(btn);
    });
    return g;
  }
  function pintar() {
    msgsEl.innerHTML = "";
    mensajes.forEach(function (m) { msgsEl.appendChild(burbuja(m)); if (m.saludo) msgsEl.appendChild(grillaAtajos()); });
    if (cargando) msgsEl.appendChild(burbuja({ rol: "bot", typing: true }));
    msgsEl.scrollTop = msgsEl.scrollHeight;
    adjEl.innerHTML = ""; adjEl.hidden = !archivos.length;
    archivos.forEach(function (f, i) {
      var s = document.createElement("span"); s.className = "bz-file"; s.textContent = f.name;
      var x = document.createElement("button"); x.type = "button"; x.setAttribute("aria-label", "Quitar " + f.name); x.textContent = "×";
      x.addEventListener("click", function () { archivos.splice(i, 1); pintar(); });
      s.appendChild(x); adjEl.appendChild(s);
    });
    var dichos = mensajes.filter(function (m) { return m.rol === "user"; }).map(function (m) { return "- " + m.texto; }).join("\n");
    var ult = mensajes.filter(function (m) { return m.rol === "bot" && !m.saludo && !m.error; }).slice(-1)[0];
    var ficha = dichos ? "\n\nFICHA DE LA CONSULTA\nVehículo (marca, modelo, año, km) y consulta según el cliente:\n" + dichos + (ult ? "\n\nOrientación de Biela (no es diagnóstico):\n" + ult.texto.replace(CIERRE, "").trim() : "") : "";
    ejecutivo.href = wa("Hola BMCARE Motorsport, vengo del chat con Biela y quiero hablar con un especialista." + ficha);
  }
  function leerFoto(f) {
    return new Promise(function (ok) {
      var r = new FileReader();
      r.onload = function () {
        var img = new Image();
        img.onload = function () {
          var esc = Math.min(1, 1024 / Math.max(img.width, img.height));
          var c = document.createElement("canvas");
          c.width = Math.round(img.width * esc); c.height = Math.round(img.height * esc);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          ok(c.toDataURL("image/jpeg", 0.82).split(",")[1]);
        };
        img.onerror = function () { ok(""); };
        img.src = String(r.result || "");
      };
      r.onerror = function () { ok(""); };
      r.readAsDataURL(f);
    });
  }
  function destacarEsp() { ejecutivo.classList.remove("bz-alert"); void ejecutivo.offsetWidth; ejecutivo.classList.add("bz-alert"); }
  function responder(txt, error) {
    cargando = false;
    if (!error && txt.indexOf("WhatsApp") === -1) txt += "\n\n" + CIERRE;
    mensajes.push({ rol: "bot", texto: txt, hora: hora(), error: !!error });
    pintar();
    if (error) destacarEsp();
  }
  function preguntar(texto) {
    var q = String(texto || "").trim();
    if ((!q && !archivos.length) || cargando) return;
    var adj = archivos.slice(); archivos = [];
    var visible = q + (adj.length ? "\n[" + adj.map(function (f) { return f.name; }).join(" · ") + "]" : "");
    var previos = mensajes.filter(function (m) { return !m.saludo && !m.error; });
    var userMsg = { rol: "user", texto: visible.trim(), hora: hora(), fotos: [] };
    mensajes.push(userMsg);
    cargando = true;
    pintar();
    var api = String(window.BIELA_API || "/api/chat").trim();
    var hayClaude = window.claude && typeof window.claude.complete === "function";
    if (!hayClaude && !api) { setTimeout(function () { responder(FALLA, true); }, 700); return; }
    Promise.all(adj.filter(function (f) { return (f.type || "").indexOf("image/") === 0; }).map(leerFoto)).then(function (fotos) {
      fotos = fotos.filter(Boolean); userMsg.fotos = fotos;
      var pregunta = q || "Revisa la foto adjunta.";
      if (hayClaude) {
        var hist = previos.map(function (m) { return { role: m.rol === "user" ? "user" : "assistant", content: m.texto }; });
        var bloques = fotos.map(function (b64) { return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } }; });
        bloques.push({ type: "text", text: pregunta });
        var pedir = function (c) { return window.claude.complete({ system: SISTEMA, messages: hist.concat([{ role: "user", content: c }]), max_tokens: 700 }); };
        return pedir(bloques).catch(function () { return pedir(pregunta); });
      }
      var cuerpo = previos.concat([userMsg]).map(function (m) {
        var o = { role: m.rol === "user" ? "user" : "assistant", text: m === userMsg ? pregunta : m.texto };
        if (m.fotos && m.fotos.length) o.images = m.fotos;
        return o;
      });
      return fetch(api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ system: SISTEMA, messages: cuerpo }) })
        .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
        .then(function (d) { if (!d || !d.text) throw new Error("vacío"); return d.text; });
    }).then(function (r) {
      var txt = String(r || "").trim();
      responder(txt || FALLA, !txt);
    }).catch(function () { responder(FALLA, true); });
  }
  var esMovil = window.matchMedia("(max-width: 560px)");
  function ajustarMovil() {
    if (!esMovil.matches || chat.hidden) { chat.style.bottom = ""; return; }
    var limite = window.innerHeight;
    var waFab = fab.parentElement && fab.parentElement.querySelector('a[href*="wa.me"]');
    [waFab, document.getElementById("bm-cookies")].forEach(function (el) {
      if (!el) return; var r = el.getBoundingClientRect(); if (r.height && r.top < limite) limite = r.top;
    });
    chat.style.bottom = Math.max(0, window.innerHeight - limite + 8) + "px";
  }
  var ultimoFoco = null;
  function abrirChat() {
    if (!chat.hidden) return;
    ultimoFoco = document.activeElement;
    chat.hidden = false; document.documentElement.classList.add("bz-open");
    tg.setAttribute("aria-expanded", "true"); tg.setAttribute("aria-label", "Cerrar chat con Biela");
    pintar(); ajustarMovil();
    setTimeout(function () { input.focus(); }, 30);
  }
  function cerrarChat() {
    if (chat.hidden) return;
    chat.hidden = true; document.documentElement.classList.remove("bz-open");
    tg.setAttribute("aria-expanded", "false"); tg.setAttribute("aria-label", "Abrir chat con Biela, asistente de BMCARE");
    var f = ultimoFoco && ultimoFoco !== document.body && ultimoFoco.focus ? ultimoFoco : tg;
    f.focus();
  }
  tg.addEventListener("click", function () { if (chat.hidden) abrirChat(); else cerrarChat(); });
  document.getElementById("biela-close").addEventListener("click", cerrarChat);
  document.getElementById("biela-min").addEventListener("click", cerrarChat);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrarChat(); });
  window.addEventListener("resize", ajustarMovil);
  document.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("#bm-cookies [data-c]")) setTimeout(ajustarMovil, 0); });
  form.addEventListener("submit", function (e) { e.preventDefault(); var v = input.value; input.value = ""; preguntar(v); });
  fileIn.addEventListener("change", function () {
    archivos = archivos.concat(Array.prototype.slice.call(fileIn.files || [])).slice(0, 5);
    fileIn.value = ""; pintar(); input.focus();
  });
  pintar();
  window.BZ = { abrirChat: abrirChat, preguntar: preguntar };
})();
