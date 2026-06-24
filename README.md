# Podcaster

SPA de podcasts desarrollada como prueba técnica. Permite explorar los 100 podcasts más populares, ver el detalle de cada uno y escuchar sus episodios.

**Demo:** https://luisbc.github.io/podcaster/

> **Nota:** La aplicación usa [allorigins.win](https://allorigins.win) como proxy CORS para acceder a la API de iTunes, que no incluye cabeceras CORS en sus respuestas. Este servicio es gratuito y puede presentar errores intermitentes (408, 500, 522) ajenos a la aplicación. Si la app no carga, espera unos segundos y recarga la página.

---

## Requisitos

- Node.js 20+
- npm 9+

## Instalación

```bash
npm install
```

## Modo development

Sirve los assets sin minimizar con HMR:

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173/podcaster/`.

## Modo production

Compila y minimiza los assets:

```bash
npm run build
```

Para previsualizar el build de producción localmente:

```bash
npm run preview
```

La app estará disponible en `http://localhost:4173/podcaster/`.

## Tests

```bash
npm test
```

## Stack técnico

- **React 19** + **TypeScript** + **Vite**
- **React Router v7** — navegación client-side con URLs limpias (sin hash)
- **CSS Modules** — estilos encapsulados por componente
- **DOMPurify** — sanitización de HTML en descripciones de episodios
- **Jest** + **React Testing Library** — 37 tests

## Decisiones técnicas

- **Caché en localStorage** con TTL de 24h para evitar peticiones repetidas a la API
- **AbortController** en los hooks de datos para cancelar peticiones al desmontar el componente
- **React.lazy + Suspense** para code splitting por ruta
- **allorigins.win** como proxy CORS (indicado en el enunciado de la prueba)


