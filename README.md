# Dentisti in Progress — Astro blog

Questo progetto usa Astro per pubblicare il sito statico di Dentisti in Progress con homepage modulare e blog in Markdown.

## Requisiti

- Node.js 18+
- npm

## Installazione

```bash
npm install
```

## Sviluppo locale

```bash
npm run dev
```

Apri nel browser la URL mostrata dal terminale, di solito:

- http://localhost:4321

## Build di produzione

```bash
npm run build
```

Il sito statico viene generato nella cartella `dist/`.

## Anteprima build

```bash
npm run preview
```

## Struttura principale

```text
src/
  components/
    blog/
      BlogCard.astro
    site/
      Header.astro
      Footer.astro
  content/
    blog/
      introduzione-al-blog.md
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    blog/
      index.astro
      [slug].astro
      tags/
        [tag].astro
  styles/
    global.css
```

## Come aggiungere un articolo

1. crea un file `.md` dentro `src/content/blog/`
2. inserisci il frontmatter seguente:

```md
---
title: "Titolo articolo"
description: "Breve descrizione dell'articolo"
pubDate: 2026-09-26
author: "Dentisti in Progress"
tags: ["community", "odontoiatria"]
draft: false
---

## Titolo del contenuto

Il tuo testo qui.
```

3. salva il file
4. il sito lo rileverà automaticamente durante il build

## Dominio di pubblicazione

Il sito è configurato per il dominio:

- https://www.dentisti-inprogress.it

## Deploy statico

Puoi pubblicare il contenuto di `dist/` su:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel static deployment

Per deploy automatici, usa un workflow che esegue:

```bash
pnpm install --frozen-lockfile
pnpm build
```

Il workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) esegue il build e pubblica la cartella `dist/` su un web server remoto tramite SSH e rsync dopo ogni push su `main`. È disponibile anche l'avvio manuale da GitHub Actions.

Configura nel repository questi GitHub Actions secrets:

- `SSH_HOST`: hostname o indirizzo IP del server
- `SSH_PORT`: porta SSH, opzionale; se assente usa `22`
- `SSH_USER`: utente SSH
- `SSH_PRIVATE_KEY`: chiave privata SSH autorizzata sul server
- `REMOTE_PATH`: percorso assoluto della cartella pubblica sul server
