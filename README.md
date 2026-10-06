# BMCARE Motorsport — Sitio web

Sitio del taller BMCARE Motorsport (Los Trabajadores 4442, Recoleta, Santiago).
Especialistas en vehículos de alta gama.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | Sitio completo: portada con video, quiénes somos, especialidades, servicios, seguimiento, consejos, preguntas, contacto, panel del taller y chatbot |
| `Portal del Cliente.dc.html` | Portal privado: login/registro, historial por vehículo, link público de reventa, PDF, fidelización y recordatorios |
| `Selector de servicios.dc.html` | Cotizador visual por zonas del auto (opcional) |
| `BMCARE Motorsport v1 (claro).dc.html` | Primera versión en tema claro (respaldo) |
| `support.js` | Runtime necesario para las páginas `.dc.html` |
| `image-slot.js` | Componente de foto arrastrable usado en las galerías |
| `_ds/` | Sistema de diseño (tokens y estilos) |
| `uploads/` | Video de portada, video de taller y logo |

## Publicar

Es un sitio estático: sirve la carpeta tal cual.

**Vercel (recomendado):** importar el repositorio en vercel.com → Add New → Project. Sin build: Framework "Other".

**GitHub Pages:** Settings → Pages → Deploy from a branch → `main` / `root`.

**Local:**

```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```

Debe servirse por HTTP (no abriendo el archivo directamente) para que carguen los videos y el sistema de diseño.

## Datos a mantener

- WhatsApp y teléfono: `+56 9 3036 9843`
- Instagram: `@bmcare_`
- Horario: lunes a viernes 08:00–18:00 · sábado 09:00–13:00
- Clave del panel del taller: `2026` (cámbiala antes de publicar)
- Cuenta demo del portal: `cliente@bmcare.cl` / `demo1234`

## Notas técnicas

- El seguimiento de vehículos, el portal y los recordatorios guardan datos en el
  navegador (`localStorage`). Es un prototipo funcional: para producción hay que
  conectar un backend con base de datos y contraseñas hasheadas.
- Los avisos por WhatsApp se abren con enlaces `wa.me` prellenados; no hay envío
  automático desde el servidor.
- Chatbot: en Vercel responde con IA a través de `api/chat.js` si existe la variable
  de entorno `ANTHROPIC_API_KEY` (Vercel → Settings → Environment Variables).
  Sin la clave, responde con respuestas automáticas por tema y deriva a WhatsApp.
- Vista móvil: menú hamburguesa bajo 900px, chat a pantalla completa en celular.
