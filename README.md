# BMCARE Motorsport — Sitio web

Taller mecánico de alta gama en Los Trabajadores 4454, Huechuraba, Santiago.

## Páginas publicables (HTML estático, listo para SEO)

- `index.html` — Inicio
- `nosotros.html` — Quiénes somos
- `servicios.html` — Servicios
- `preguntas-frecuentes.html` — Preguntas frecuentes y consejos
- `contacto.html` — Contacto y ubicación

Archivos que usan: `assets/site.css`, `assets/site.js`, `_ds/` (tipografía y estilos base) y `uploads/` (logo, videos y logos de marcas). También se incluyen `robots.txt` y `sitemap.xml`.

## Publicar en GitHub Pages

1. Sube al repositorio: las 5 páginas `.html`, `assets/`, `_ds/`, `uploads/`, `robots.txt`, `sitemap.xml` y el archivo `CNAME` con el texto `bmcare.cl`.
2. Settings → Pages → Deploy from a branch → `main` / raíz.
3. En tu proveedor de dominio apunta `bmcare.cl` a GitHub Pages.
4. Registra el sitio en Google Search Console y envía `https://bmcare.cl/sitemap.xml`.

Los archivos `.dc.html`, `support.js`, `image-slot.js` y `screenshots/` son archivos de diseño y respaldos: **no los subas** al sitio publicado.

## Antes de publicar

- Completa los COMPLETAR de fidelización (número de mantención y % de descuento) en `index.html`.
- Fotos del taller: en `nosotros.html` reemplaza cada marco "Foto del …" por un `<img>` con su `alt` (hay un comentario con el ejemplo).
- Imagen para redes (`og:image`): hoy usa el logo. Lo ideal es una foto de 1200×630 px.

## Biela (asistente)

Fuera de la vista previa no hay IA conectada: Biela responde con un mensaje que deriva al cliente a un ejecutivo por WhatsApp con el resumen de la conversación. Para respuestas con IA hay que conectar un servicio propio en `assets/site.js`.
