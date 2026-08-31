# AryWeb

Site vitrine professionnel pour **AryWeb**, une activité étudiante de création de sites web et de cartes NFC destinée aux indépendants, artisans et commerces.

Le parcours repose sur les services, la méthode de travail, les engagements et les réponses aux questions fréquentes. Il ne contient volontairement ni portfolio, ni section « réalisations », ni fausse preuve sociale.

## Fonctionnalités

- page d’accueil complète et responsive ;
- direction visuelle éditoriale, avec compositions asymétriques et typographie Bricolage Grotesque servie localement ;
- loader de marque bref, affiché une seule fois par session ;
- révélations au défilement, barre de progression et léger effet de profondeur sur le hero ;
- animations désactivées lorsque `prefers-reduced-motion` est activé et profondeur désactivée sur les appareils tactiles ;
- navigation accessible sur ordinateur et mobile ;
- services détaillés, dont les cartes de contact NFC, avec une illustration clairement présentée comme un schéma ;
- section de tarifs configurables et positionnement honnête pour les petits budgets ;
- méthode en quatre étapes, présentation et FAQ ;
- formulaire de contact validé côté navigateur puis envoyé directement à Formspree ;
- protection anti-spam par champ invisible et protections du prestataire de formulaire ;
- solution de repli claire vers l’adresse e-mail ;
- métadonnées Open Graph et Twitter, canonical, JSON-LD, sitemap et robots ;
- manifeste web, pages 404 et erreur avec redirection vers l’accueil, politique de confidentialité et mentions légales configurables ;
- en-têtes HTTP de sécurité en production ;
- image de partage social générée par le code dans la même direction graphique ;
- images optimisées en WebP et JPEG ;
- intégration continue avec GitHub Actions et mises à jour Dependabot prêtes à l’emploi après publication du dépôt sur GitHub.

## Technologies

- Next.js 16.3 avec App Router
- React 19
- TypeScript strict
- CSS natif
- Bricolage Grotesque Variable, hébergée localement
- ESLint

## Installation

Prérequis : Node.js 22 ou une version plus récente.

```bash
npm install
npm run dev
```

Ouvrir ensuite [http://localhost:1234](http://localhost:1234).

## Configuration

Les valeurs publiques suivantes personnalisent le site :

```env
NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr
NEXT_PUBLIC_CONTACT_EMAIL=aryweb15@gmail.com
NEXT_PUBLIC_LOCATION=Votre ville & à distance
NEXT_PUBLIC_PRICE_SHOWCASE=249 €
NEXT_PUBLIC_PRICE_ECOMMERCE=499 €
NEXT_PUBLIC_PRICE_REDESIGN=
NEXT_PUBLIC_PRICE_NFC=24,90 €
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/votre-identifiant
```

Une variable préfixée par `NEXT_PUBLIC_` est visible dans le navigateur : n’y placez jamais de secret.

Les prix par défaut sont 249 € pour le site vitrine, 499 € pour l’e-commerce et 24,90 € par carte NFC. La refonte reste sur devis. Avant publication, confirmez le régime de TVA applicable, le périmètre inclus et les éventuels frais récurrents ou de livraison.

### Activer l’envoi du formulaire

Créez un formulaire dans Formspree, copiez son endpoint public au format
`https://formspree.io/f/identifiant`, puis renseignez `NEXT_PUBLIC_FORMSPREE_ENDPOINT` dans
l’interface de Cloudflare Pages. Aucun secret ni backend n’est nécessaire. Sans endpoint, le
formulaire affiche l’adresse e-mail de secours au lieu de perdre la demande.

### Compléter les mentions légales

Renseignez les variables `LEGAL_*` et `HOST_*` directement dans l’interface de l’hébergeur. Il faut notamment ajouter `LEGAL_PHONE` ainsi que le nom, l’adresse et le téléphone de l’hébergeur. Tant que les informations indispensables manquent, la page affiche un avertissement.

Les obligations exactes dépendent du statut et du pays de l’éditeur : faites valider le contenu avant une publication commerciale.

## Commandes

```bash
npm run dev        # serveur de développement
npm run lint       # contrôle ESLint
npm run typecheck  # contrôle TypeScript
npm run build      # build de production
npm run start      # lancement du build (port fourni par l’hébergeur)
npm run check      # lint + TypeScript + build
```

## Structure principale

- `app/page.tsx` : assemblage de la page et données structurées
- `app/opengraph-image.tsx` : aperçu éditorial pour les partages sociaux
- `components/home/` : sections de la page d’accueil
- `components/home/hero-visual.tsx` : affiche interactive du hero
- `components/home/nfc-section.tsx` : présentation et schéma de la carte NFC
- `components/home/pricing.tsx` : offres et tarifs configurables
- `components/contact-form.tsx` : formulaire et retours utilisateur
- `components/intro-loader.tsx` : introduction jouée une fois par session
- `components/motion-controller.tsx` : révélations et progression de lecture
- `components/site-header.tsx` : navigation desktop et mobile
- `lib/site.ts` : coordonnées, navigation et contenus réutilisés
- `lib/contact.ts` : validation et formatage des demandes
- `lib/legal.ts` : configuration des mentions légales
- `app/globals.css` : design, animations et responsive
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts` : fichiers SEO natifs
- `app/confidentialite/` et `app/mentions-legales/` : pages d’information

## Sécurité et confidentialité

- Le site ne contient aucune clé d’envoi et n’exécute aucun backend applicatif.
- L’endpoint Formspree est public par conception ; la restriction de domaine et les protections anti-spam se configurent chez Formspree.
- Les données ne sont pas stockées par l’application, mais les soumissions sont conservées dans le compte Formspree.
- Aucun outil publicitaire, cookie marketing ou outil de mesure d’audience n’est installé.
- Le `.gitignore` exclut les variables locales, clés, certificats, bases, exports et journaux.

Une clé déjà publiée doit être révoquée et remplacée : l’ajouter ensuite au `.gitignore` ne nettoie pas un historique Git existant.

## Avant la publication

- confirmer l’adresse e-mail, la localisation et tous les textes commerciaux ;
- confirmer le prénom à afficher publiquement, les prestations réellement incluses et un éventuel délai de réponse ;
- définir les quatre prix publics, leur mention HT/TTC et le contenu exact de chaque offre ;
- préciser pour les cartes NFC le support, la personnalisation, le QR code éventuel, la compatibilité testée, l’abonnement éventuel, les délais et frais de livraison ;
- vérifier les droits d’utilisation de l’avatar ;
- définir le domaine réel dans `NEXT_PUBLIC_SITE_URL` ;
- configurer l’endpoint Formspree, restreindre le formulaire au domaine public et tester une vraie réception ;
- compléter puis faire valider les mentions légales et la politique de confidentialité ;
- confirmer le prestataire d’hébergement et le prestataire de formulaire ;
- tester le site à 375 px, 768 px et 1440 px, au clavier et avec un lecteur d’écran ;
- contrôler l’Open Graph, le sitemap, la Search Console et Lighthouse après déploiement ;
- surveiller les avis de sécurité Next.js et appliquer rapidement les versions correctives.

## Prochaines améliorations possibles

- ajouter des tests end-to-end Playwright et une vérification d’accessibilité automatisée ;
- ajouter des pages service uniquement lorsque du contenu spécifique et utile est disponible ;
- brancher une supervision respectueuse de la vie privée après le déploiement ;
- ajouter des témoignages seulement avec l’autorisation explicite de vrais clients ;
- remplacer l’avatar du hero ou compléter la section À propos avec une vraie photo sobre de vous ou de votre espace de travail ;
- remplacer le schéma NFC par une vraie photo de votre carte près d’un téléphone dès qu’un prototype physique existe ;
- préciser les délais, inclusions et modalités de maintenance dès que l’offre commerciale est arrêtée.

Une photo authentique du produit NFC apportera davantage de confiance qu’une illustration générée. Elle n’est pas obligatoire pour cette première version : le schéma actuel reste explicite et n’invente ni produit fini ni réalisation.
