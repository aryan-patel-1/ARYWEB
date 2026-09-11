# Facturation AryWeb avec Stripe

## État actuel et activation

L’intégration est en **mode test**, sans paiement réel effectué. Le code n’a pas été déployé automatiquement et le parcours Stripe complet reste à tester avec une clé serveur.

Cloudflare Access protège `/gestion` et `/api/admin` sur aryweb.fr et www.aryweb.fr. Seule **aryweb15@gmail.com** est autorisée, avec un code reçu par e-mail, pour une session d’une heure. Le serveur vérifie également la signature du jeton et l’adresse autorisée. La protection Access a été créée dans Cloudflare ; le code du site reste à déployer.

1. Dans Stripe, rester en environnement de test et récupérer la clé secrète `sk_test_…`.
2. Dans Cloudflare → Workers & Pages → aryweb → Settings → Variables and Secrets, ajouter un **secret chiffré** `STRIPE_SECRET_KEY` contenant cette clé. Ne jamais l’envoyer dans une conversation, la commiter, ou la nommer `NEXT_PUBLIC_…`.
3. Les variables serveur non secrètes sont dans `wrangler.jsonc` : origine, mode test, domaine Access, audience et e-mail administrateur. Conserver `NEXT_PUBLIC_STRIPE_MODE=test` dans les variables de build.
4. Vérifier `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, nécessaire pour recevoir les devis et messages.
5. Déployer le projet complet sur Cloudflare Pages : commande `npx next build`, sortie `out`, avec `functions` et `wrangler.jsonc` présents dans le dépôt. Un hébergement uniquement statique de `out` ne suffit pas aux paiements.

Sans clé, les paiements sont volontairement refusés. Le MCP Stripe ne fournit pas une clé utilisable par les visiteurs du site. Configurer séparément chaque environnement Cloudflare utilisé.

## Demandes de devis

Les sites, le contenu pour réseaux sociaux et le design de cartes de visite/fidélité utilisent le même formulaire `/devis` : coordonnées professionnelles, SIRET et description libre, sans prix automatique.

Après acceptation de l’envoi par Formspree, un message confirme la demande et annonce une réponse par e-mail au plus vite. Ce n’est pas un e-mail automatique au client : il faut lui répondre ensuite. Faire un essai et vérifier la réception ainsi que les indésirables.

Le contrôle du SIRET vérifie le format et la clé de contrôle, pas l’existence réelle de l’entreprise.

## Cartes NFC

Le client remplit le formulaire dans `/tarifs` avant Stripe : entreprise, SIRET, destination NFC, instructions, quantité et acceptation des CGV. Stripe recueille ensuite les informations de facturation et de livraison (France uniquement).

Le prix est imposé côté serveur : **24,90 € par carte**, de 1 à 20 cartes. Vérifier les coûts de livraison avant commercialisation. L’ancien Payment Link NFC a été désactivé pour empêcher le contournement du formulaire.

Dans Stripe, consulter la session Checkout : les métadonnées contiennent les coordonnées professionnelles, la destination et les instructions (`message_1`, etc.). Vérifier le **statut payé** avant de fabriquer ou expédier. La page `/paiement` ne constitue pas une preuve de paiement. Le traitement des commandes reste manuel, sans webhook d’expédition automatique.

## Facture comptant : mode d’emploi

1. Ouvrir `https://aryweb.fr/gestion/`, entrer `aryweb15@gmail.com` puis le code reçu.
2. Choisir le paiement comptant ; renseigner le client, son SIRET, son adresse, la prestation et le montant convenu.
3. Confirmer l’accord du client et créer le **brouillon** : aucun débit ni envoi automatique à ce stade.
4. Ouvrir le brouillon dans Stripe pour vérifier les informations, le montant final et la fiscalité applicable.
5. Revenir à l’espace privé et **finaliser**. Cette étape crée la facture définitive, ce n’est pas un aperçu.
6. Copier son lien pour l’envoyer par message, préparer un e-mail dans sa messagerie ou demander explicitement l’envoi de la facture par Stripe.

L’échéance initiale est de 30 jours. En cas d’erreur après finalisation, gérer l’annulation ou l’avoir approprié dans Stripe. Après une erreur réseau, réessayer la même demande et vérifier Stripe avant d’en créer une autre. Des clés d’idempotence limitent les doublons lors des reprises identiques.

## Mensuel, annuel et hébergement

Les options mensuelle et annuelle créent un lien Checkout personnel pour un **abonnement récurrent** au montant convenu. Copier le lien ou préparer un e-mail ; l’e-mail préparé doit ensuite être envoyé dans votre messagerie.

**Un abonnement continue jusqu’à résiliation. Ce n’est pas un paiement en plusieurs fois avec un arrêt automatique.** Pour un site à 2 000 € payable en plusieurs échéances, convenir du nombre d’échéances puis configurer un échéancier adapté dans Stripe avant d’envoyer un lien : la durée fixe n’est pas intégrée à cette page.

Le forfait **hébergement + domaine à 20 €/an** est présenté avec la création de site. Après accord du client, choisir cette option dans l’espace privé pour générer son abonnement annuel. Il est distinct de la facture du site et n’y est pas ajouté automatiquement.

Les liens Checkout expirent. Avant d’en générer un nouveau, vérifier qu’aucun abonnement n’a déjà été créé. Gérer les résiliations, modifications et impayés dans Stripe.

## Avant les vrais clients

- Vérifier réception et confirmation d’un devis test.
- Tester l’accès par code avec l’adresse autorisée et le refus d’une autre adresse.
- Payer une NFC avec une carte de test Stripe et vérifier prix, instructions, SIRET, livraison et statut payé.
- Tester un brouillon, sa finalisation, son lien et l’envoi de facture. Les comportements d’e-mail en test peuvent différer du réel.
- Tester chaque abonnement et contrôler montant et périodicité dans Stripe.
- Compléter l’identité de l’entreprise, les informations fiscales, la numérotation et les conditions contractuelles dans Stripe. Le formulaire ne détermine pas automatiquement votre régime de TVA et ne garantit pas à lui seul la conformité légale des factures.
- Prévoir une protection anti-abus/rate limiting sur `/api/nfc` et surveiller les créations de sessions avant commercialisation.

Pour encaisser réellement : activer le compte Stripe, ajouter la clé de production et passer **ensemble** `STRIPE_MODE` et `NEXT_PUBLIC_STRIPE_MODE` à `live`, puis redéployer. Ne jamais utiliser une vraie carte en mode test.

## Développement et vérification

`npm run check` : lint, types, build. `npm run test:billing` : validations et protections élémentaires. `npm run functions:check` : compilation des fonctions Pages.

Pour le local, copier `.dev.vars.example` vers `.dev.vars` et y renseigner une clé de test. Ce fichier est ignoré par Git. Après le build, `npm run pages:dev` sert les pages et les fonctions. L’origine doit correspondre à `SITE_ORIGIN`. Aucun contournement local de l’authentification privée n’est prévu : un vrai jeton Access reste nécessaire.

Références : [Stripe Invoicing](https://docs.stripe.com/invoicing), [Checkout](https://docs.stripe.com/payments/checkout), [Validation Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/).
