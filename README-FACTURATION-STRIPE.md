# Guide de facturation Stripe — AryWeb

Ce document explique comment utiliser Stripe progressivement et sans prendre de
risque. Il est destiné à AryWeb, pas aux visiteurs du site.

> Dernière mise à jour : 10 septembre 2026. L'interface Stripe évolue parfois :
> si le nom exact d'un menu change, utiliser la recherche du Dashboard.

## Réponse rapide : peut-on publier le site maintenant ?

Oui. Le site AryWeb peut être commit et push **avant** l'intégration de Stripe.

Dans l'état actuel du projet :

- aucun SDK Stripe n'est installé ;
- aucune clé Stripe n'est utilisée par le site ;
- aucun bouton ne permet de payer ;
- la page Tarifs présente seulement les possibilités comptant, mensuel et
  annuel, puis invite le prospect à demander un devis.

Stripe est donc indépendant de la mise en ligne actuelle. Il ne faut pas
attendre son intégration pour publier les nouvelles pages du site.

Ce qu'il ne faut pas faire pour le moment : ajouter un bouton de paiement réel
sur le site ou transmettre un lien Stripe en mode réel avant d'avoir défini les
prix, le contenu des abonnements et les conditions de résiliation.

## État actuel

- Le compte Stripe AryWeb est créé.
- AryWeb travaille dans l'environnement de test Stripe.
- Aucun argent réel ne peut être encaissé dans cet environnement.
- Les clients, produits, prix et paiements de test sont séparés du mode réel.
- La prochaine étape recommandée est d'apprendre Stripe depuis son Dashboard,
  sans écrire de code.

## La méthode recommandée pour AryWeb

La solution la plus simple n'est pas de construire immédiatement une page
privée de facturation dans AryWeb. Stripe sait déjà créer des factures et des
pages de paiement sécurisées sans code.

Utiliser d'abord :

| Besoin | Outil Stripe recommandé |
| --- | --- |
| Projet sur mesure payé comptant | Facture Stripe créée après acceptation du devis |
| Offre mensuelle à prix fixe | Produit + prix mensuel + Payment Link |
| Offre annuelle à prix fixe | Produit + prix annuel + Payment Link |
| Consulter les paiements et abonnements | Dashboard Stripe |
| Laisser un client gérer ou résilier son abonnement | Portail client Stripe, dans un second temps |

Cette méthode évite de manipuler des clés API et réduit fortement le risque de
créer un mauvais paiement dans le code.

## Les mots à connaître

- **Environnement de test / Sandbox** : espace sans argent réel dans lequel on
  peut s'entraîner librement.
- **Mode réel / Live** : espace dans lequel de vrais clients et de vrais
  paiements existent.
- **Client / Customer** : fiche contenant notamment le nom, l'e-mail et
  l'adresse de facturation du client.
- **Produit / Product** : ce qui est vendu, par exemple « Maintenance et
  hébergement ».
- **Prix / Price** : montant et périodicité associés au produit, par exemple
  49 € par mois ou 490 € par an.
- **Facture / Invoice** : document détaillé envoyé à un client précis pour
  demander un paiement.
- **Abonnement / Subscription** : paiement récurrent mensuel ou annuel.
- **Payment Link** : lien vers une page de paiement hébergée et sécurisée par
  Stripe.

## Règles de sécurité absolues

1. Ne jamais envoyer une clé secrète Stripe dans un e-mail, un message, une
   capture d'écran ou une conversation avec une IA.
2. Ne jamais placer une clé secrète dans GitHub, dans le code du navigateur ou
   dans une variable commençant par `NEXT_PUBLIC_`.
3. Ne jamais saisir ni conserver le numéro de carte d'un client. Le client le
   renseigne lui-même sur la page sécurisée de Stripe.
4. Ne pas utiliser une vraie carte bancaire pour faire des tests.
5. Vérifier le mode affiché dans Stripe avant chaque opération : test ou réel.
6. Vérifier le client, la prestation, le montant, la périodicité, l'échéance et
   la TVA avant d'envoyer une facture ou un lien.
7. Si une clé secrète a été publiée ou partagée par erreur, la considérer comme
   compromise et la remplacer immédiatement dans Stripe.

Tant qu'AryWeb utilise uniquement le Dashboard, les factures et les Payment
Links sans code, il n'est pas nécessaire de récupérer une clé API.

## Premier exercice en environnement de test

Le but est de comprendre le parcours complet avec de fausses données. Les
montants ci-dessous sont uniquement des exemples, pas les futurs tarifs AryWeb.

### 1. Vérifier l'environnement

Dans le Dashboard Stripe, vérifier que l'environnement de test ou la Sandbox
est bien sélectionné. Ne pas continuer si l'écran indique que les données
réelles sont affichées.

### 2. Créer un faux client

Dans **Clients**, créer par exemple :

```text
Nom : Client Test AryWeb
E-mail : une adresse e-mail de test contrôlée par AryWeb
Adresse : une fausse adresse clairement identifiée comme test
```

Ne pas utiliser les coordonnées d'un vrai client pendant cet exercice.

### 3. Tester une facture comptant

Dans **Facturation > Factures** :

1. cliquer sur **Créer une facture** ;
2. sélectionner le client de test ;
3. ajouter une ligne « Création d'un site vitrine — TEST » ;
4. saisir un montant fictif, par exemple 900 € ;
5. choisir l'envoi d'une facture avec une page de paiement ;
6. ajouter l'échéance souhaitée ;
7. contrôler l'aperçu complet ;
8. envoyer la facture uniquement à l'adresse de test ;
9. ouvrir la page de paiement reçue.

Pour simuler un paiement réussi, Stripe indique d'utiliser :

```text
Carte : 4242 4242 4242 4242
Expiration : n'importe quelle date future
CVC : n'importe quels trois chiffres
Autres champs : valeurs de test
```

Après le paiement, vérifier que la facture passe à l'état **Payée** dans le
Dashboard et que le reçu ou la facture est accessible.

### 4. Tester un abonnement mensuel

Dans **Catalogue de produits** ou depuis **Payment Links** :

1. créer le produit « Maintenance et hébergement — TEST » ;
2. créer un prix récurrent fictif de 49 € ;
3. sélectionner une périodicité mensuelle ;
4. créer un Payment Link associé ;
5. ouvrir le lien et payer avec la carte de test ci-dessus ;
6. ouvrir **Facturation > Abonnements** ;
7. vérifier que l'abonnement est actif, que le client et le montant sont bons ;
8. tester sa résiliation en fin de période.

### 5. Tester l'abonnement annuel

Créer un **nouveau prix récurrent annuel** pour le même produit, par exemple
490 € par an, puis un Payment Link distinct. Ne pas transformer le prix mensuel
en prix annuel : Stripe utilise des prix séparés pour chaque périodicité.

Un prix Stripe déjà utilisé est généralement archivé lorsqu'il n'est plus
valide. Pour modifier un tarif, créer un nouveau prix puis désactiver ou
archiver l'ancien lien et l'ancien prix.

## Procédure réelle : paiement comptant

Utiliser cette procédure lorsqu'un devis personnalisé a été accepté.

1. Faire accepter le devis et les conditions avant le paiement.
2. Créer ou vérifier la fiche du client dans Stripe.
3. Créer un brouillon de facture.
4. Décrire précisément la prestation et reprendre le montant accepté.
5. Contrôler l'identité du client, l'adresse, l'échéance et les mentions
   obligatoires.
6. Vérifier une dernière fois l'aperçu du PDF et de la page de paiement.
7. Envoyer la facture depuis Stripe.
8. Ne commencer la prestation qu'au moment prévu par le devis : à la signature,
   à la réception d'un acompte ou après paiement complet selon les conditions.
9. Vérifier dans Stripe que le paiement est bien marqué comme réussi. Ne pas se
   fier uniquement à un e-mail ou à une capture envoyée par le client.

Pour un projet dont le montant varie selon le devis, préférer une facture à un
Payment Link public fixe. Cela évite qu'un prospect paie une mauvaise somme ou
achète une prestation avant validation du périmètre.

## Procédure réelle : paiement mensuel ou annuel

Avant de créer le lien réel, définir par écrit :

- le prix TTC ou net à payer ;
- tout ce qui est inclus et exclu ;
- la date du premier prélèvement ;
- la périodicité mensuelle ou annuelle ;
- l'existence ou non d'un engagement ;
- le renouvellement automatique ou non ;
- le délai et la méthode de résiliation ;
- ce qui arrive au site, au domaine et à l'hébergement après résiliation ;
- les conséquences d'un paiement échoué.

Ensuite :

1. créer le produit en mode réel ;
2. créer un prix mensuel et/ou un prix annuel séparé ;
3. créer un Payment Link pour chaque formule ;
4. vérifier la page de paiement et les informations affichées ;
5. transmettre uniquement le bon lien au client concerné ;
6. vérifier la création de l'abonnement dans Stripe ;
7. conserver le devis ou contrat accepté avec la preuve de l'accord.

Ne jamais présenter le paiement annuel comme un simple « paiement comptant » :
s'il se renouvelle automatiquement, il s'agit bien d'un abonnement annuel et
cela doit être annoncé clairement.

## Résiliation et portail client

Stripe propose un portail client hébergé qui peut permettre au client de :

- consulter et télécharger ses factures ;
- modifier son moyen de paiement ;
- mettre à jour ses informations de facturation ;
- résilier son abonnement immédiatement ou en fin de période, selon les réglages.

Commencer par tester ce portail dans la Sandbox. Définir précisément ce que le
client est autorisé à modifier avant de l'activer en mode réel. Le portail est
utile, mais il n'est pas nécessaire pour publier le site AryWeb aujourd'hui.

## Passage du test au mode réel

Ne pas supposer qu'un produit ou un lien de test est devenu réel. Les objets de
test et les objets réels sont distincts : les clients, produits, prix et liens
nécessaires doivent être créés ou configurés dans le bon environnement.

Avant le premier vrai client :

- [ ] activer complètement le compte Stripe et terminer les vérifications
      d'identité demandées ;
- [ ] activer la double authentification ;
- [ ] vérifier le nom légal, le SIREN, l'adresse et l'IBAN ;
- [ ] configurer le nom public AryWeb, le logo, l'e-mail d'assistance et
      `https://aryweb.fr` ;
- [ ] vérifier les e-mails et documents envoyés au client ;
- [ ] confirmer le régime de TVA et les mentions de facture avec un
      professionnel si nécessaire ;
- [ ] finaliser les CGV, le processus de devis, de renouvellement, de
      résiliation et de remboursement ;
- [ ] créer les produits et prix définitifs dans le mode réel ;
- [ ] vérifier chaque Payment Link réel avant de le transmettre ;
- [ ] connaître les frais Stripe applicables au moyen de paiement choisi ;
- [ ] garder le premier encaissement sous surveillance dans le Dashboard.

Ne pas tester le mode réel avec une vraie carte. Stripe demande d'effectuer les
tests avec ses cartes de test et l'environnement prévu à cet effet.

## TVA et facture électronique en France

Si AryWeb bénéficie bien de la franchise en base de TVA, vérifier que les
factures contiennent la mention :

```text
TVA non applicable, article 293 B du code général des impôts.
```

Ne pas appliquer cette mention sans avoir confirmé que le régime fiscal
d'AryWeb le permet encore.

La facture PDF et le paiement Stripe ne suffisent pas nécessairement à couvrir
toutes les obligations françaises de facturation électronique. Au calendrier
officiel actuellement publié :

- depuis le 1er septembre 2026, toutes les entreprises doivent pouvoir recevoir
  des factures électroniques ;
- à partir du 1er septembre 2027, les petites et micro-entreprises doivent être
  capables d'en émettre et de transmettre les données concernées.

Avant cette seconde échéance, vérifier avec le comptable ou un professionnel
quelle plateforme agréée utiliser et comment la relier à Stripe ou au logiciel
de facturation. Stripe encaisse les paiements ; il ne faut pas le considérer
automatiquement comme l'unique outil de conformité comptable et fiscale.

## Intégrer Stripe au site plus tard

Trois niveaux sont possibles :

### Niveau 1 — recommandé maintenant : aucun code

Créer les factures et liens dans le Dashboard, puis les envoyer au client après
validation du devis. C'est suffisant pour commencer et c'est le moins risqué.

### Niveau 2 — boutons vers Stripe

Ajouter sur le site des boutons qui ouvrent des Payment Links Stripe. Cette
étape ne doit être faite qu'une fois les offres et conditions définitives. Les
liens peuvent être publics, mais aucune clé secrète ne doit être ajoutée au code.

### Niveau 3 — espace privé AryWeb

Créer plus tard une page privée comme `/gestion/factures`, protégée par une
authentification, et un backend Cloudflare qui communique avec Stripe. Cette
version nécessitera notamment :

- des secrets configurés uniquement côté serveur dans Cloudflare ;
- des webhooks Stripe vérifiés ;
- une protection contre les factures ou abonnements créés deux fois ;
- des autorisations d'accès strictes ;
- des journaux, des tests et une procédure de secours.

Ce niveau n'est pas nécessaire avant la première mise en ligne du site.

## Vérifications avant le commit et le push actuels

Depuis le dossier du projet :

```bash
npm run check
git status --short
git diff --check
```

Vérifier que le futur commit contient notamment :

- les nouvelles pages dans `app/` ;
- les nouveaux composants ;
- les images dans `public/projects/` ;
- la suppression de l'ancienne section Services ;
- ce fichier `README-FACTURATION-STRIPE.md` ;
- aucune valeur secrète ni fichier `.env.local`.

Pour rechercher uniquement les **noms de fichiers** susceptibles de contenir
une clé secrète, sans afficher la clé dans le terminal :

```bash
rg -l 'sk_(test|live)_' --glob '!node_modules/**' --glob '!.next/**' .
rg -l 'whsec_' --glob '!node_modules/**' --glob '!.next/**' .
```

Le résultat peut citer ce README, car il explique le format des clés. Tout autre
fichier doit être examiné avant le commit. Ne jamais coller la valeur trouvée
dans un message. Si une vraie clé apparaît dans un fichier suivi par Git, la
retirer du fichier et la remplacer dans Stripe avant tout push.

Quand les vérifications sont bonnes, préparer le commit :

```bash
git add -A
git diff --cached --stat
git status --short
```

Examiner la liste avant de lancer soi-même `git commit`, puis `git push`.

## Décisions qu'AryWeb doit encore prendre

L'intégration réelle doit attendre les réponses suivantes, mais pas le commit
du site actuel :

1. Quel est le prix mensuel définitif ?
2. Que comprend exactement cette formule ?
3. Quel est le prix annuel et offre-t-il une réduction ?
4. Les abonnements sont-ils renouvelés automatiquement ?
5. Quel est le délai de résiliation ?
6. Que devient l'hébergement lors d'une résiliation ?
7. Pour un projet comptant, faut-il un acompte ou un paiement intégral ?
8. AryWeb relève-t-il toujours de la franchise en base de TVA ?

## Documentation officielle

- Créer un Payment Link sans code :
  <https://docs.stripe.com/payment-links/create>
- Créer et envoyer une facture depuis le Dashboard :
  <https://docs.stripe.com/invoicing/dashboard>
- Tester Stripe et utiliser les cartes de test :
  <https://docs.stripe.com/testing>
- Différence entre environnement de test et mode réel :
  <https://docs.stripe.com/testing-use-cases>
- Gérer les abonnements :
  <https://docs.stripe.com/billing/subscriptions>
- Configurer le portail client :
  <https://docs.stripe.com/customer-management>
- Protéger les clés secrètes :
  <https://docs.stripe.com/keys-best-practices>
- Tarifs Stripe France : <https://stripe.com/fr/pricing>
- Franchise en base de TVA :
  <https://www.economie.gouv.fr/entreprises/gerer-sa-fiscalite-et-ses-impots/autres-impots-et-taxes/entreprises-pouvez-vous-beneficier-de-la-franchise-de-tva>
- Facturation électronique en France :
  <https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises>
