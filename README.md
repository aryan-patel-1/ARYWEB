# AryWeb

Site vitrine d’AryWeb, réalisé avec Next.js, TypeScript et CSS.

## Lancer le projet

```bash
npm install
npm run dev
```

Le site est disponible sur [http://localhost:1234](http://localhost:1234).

## Configuration

Copier `.env.example` vers `.env.local`, puis compléter les variables nécessaires :

```bash
cp .env.example .env.local
```

Ne jamais placer de clé secrète dans une variable commençant par `NEXT_PUBLIC_`.

## Vérification

```bash
npm run check
```

## Déploiement

Le site est exporté statiquement dans le dossier `out` et déployé sur Cloudflare Pages.

- Commande de build : `npm run build`
- Dossier de sortie : `out`
