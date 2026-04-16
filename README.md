## Dalal

Application web (React + Vite) + backend (Express + tRPC) + Drizzle (MySQL).

### Démarrage (Windows / macOS / Linux)

Installer:

```bash
npx -y pnpm@10.4.1 install
```

Créer un `.env` à partir de `.env.example`, puis lancer:

```bash
npx -y pnpm@10.4.1 run dev
```

### Vérifications

```bash
npx -y pnpm@10.4.1 run check
npx -y pnpm@10.4.1 run test
npx -y pnpm@10.4.1 run build
```

### Go-live (checklist minimale)

- **Secrets**: `JWT_SECRET` obligatoire (le serveur refuse de démarrer si absent).
- **Origines autorisées**: définir `APP_ALLOWED_ORIGINS` en prod (ex: `https://dalal.app`).
- **Base de données**: définir `DATABASE_URL` si vous activez les features communauté.
- **Clés publiques**: ne jamais exposer de clé “secrète” dans des variables `VITE_*`.

### Déploiement sur Vercel

Le front (Vite) est servi en statique depuis `dist/public`, et l’API est exposée via une Serverless Function `api/index.ts`.

Dans Vercel:
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist/public`
- **Environment Variables** (au minimum):
  - `JWT_SECRET`
  - `VITE_APP_ID`
  - `OAUTH_SERVER_URL`
  - `APP_ALLOWED_ORIGINS` (recommandé, ex: `https://dalal.vercel.app`)
  - `DATABASE_URL` (si communauté activée)

