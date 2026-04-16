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
- **Base de données**: définir `DATABASE_URL` si vous activez les features communauté. Pour une BD cloud, activer aussi `DATABASE_SSL=true` (souvent requis).
- **Clés publiques**: ne jamais exposer de clé “secrète” dans des variables `VITE_*`.

### Déploiement sur Vercel

Le front (Vite) est servi en statique depuis `dist/public`, et l’API est exposée via une Serverless Function `api/index.ts`.

Dans Vercel:
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist/public`
- **Environment Variables** (obligatoires pour que l’API démarre):
  - `JWT_SECRET` (32+ caractères)
  - `VITE_APP_ID`
  - `OAUTH_SERVER_URL` (URL de base du serveur OAuth utilisé par le backend)
  - `VITE_OAUTH_PORTAL_URL` **ou** `VITE_OAUTH_SERVER_URL` (URL de base du portail OAuth utilisé par le navigateur au moment du login)
    - En pratique, si le portail est le même hôte que `OAUTH_SERVER_URL`, mets la même valeur que `OAUTH_SERVER_URL` dans `VITE_OAUTH_PORTAL_URL`.
- **Recommandé en production**:
  - `APP_ALLOWED_ORIGINS` (ex: `https://ton-domaine.vercel.app`)
- **Si tu actives la communauté / persistance utilisateur**:
  - `DATABASE_URL`
  - `DATABASE_SSL=true` (souvent requis en cloud)
  - `DATABASE_SSL_REJECT_UNAUTHORIZED=true`
  - `DATABASE_SSL_CA` (si ton provider fournit un certificat CA)
- **Optionnel**:
  - `OWNER_OPEN_ID`
  - `BUILT_IN_FORGE_API_URL` / `BUILT_IN_FORGE_API_KEY`
  - `VITE_FRONTEND_FORGE_API_URL` / `VITE_FRONTEND_FORGE_API_KEY` (cartes Google via proxy Forge)

Note: les variables `VITE_*` sont injectées **au build** par Vercel. Après modification, relance un déploiement.

