# Brief 1 — Registre des opérations maraîchères

**Examen final de sélection · travail individuel.** Quatre jours de travail, organisés comme vous le voulez. Livraison à l'heure fixée par les coachs, à la fin du quatrième jour ; soutenance individuelle le lendemain.

## Le besoin

La responsable d'une exploitation maraîchère pédagogique note ses opérations (semis, arrosage, désherbage…) dans un carnet papier. Elle veut les saisir dans un terminal, retrouver une intervention, et totaliser les dépenses par parcelle. Vous êtes assistant Agritech junior : vous construisez ce registre en JavaScript, avec Node.js.

- **Besoin professionnel** : réduire les oublis de suivi et rendre les opérations consultables à partir d'un terminal.
- **Geste professionnel** : observer la parcelle avec la fiche fournie, identifier culture et opération, renseigner la date et le coût, vérifier les unités, restituer un résumé.

## Ce que vous construisez

```text
==================================================
   REGISTRE DES OPÉRATIONS MARAÎCHÈRES
   Exploitation maraîchère pédagogique
==================================================
10 opération(s) chargée(s) depuis donnees/operations.json.

--------------------- MENU ---------------------
1. Ajouter une opération
2. Lister les opérations
3. Rechercher (identifiant, parcelle, culture)
4. Trier (coût, date)
5. Synthèse des dépenses
0. Quitter
Votre choix :
```

Les opérations sont lues dans `donnees/operations.json`, et chaque ajout y est enregistré.

## Le kit

| Fichier | Contenu | Votre travail |
| --- | --- | --- |
| `app.js` | Les imports et le nom du fichier de données | Écrire tout le menu : accueil, chargement, menu affiché à chaque tour, actions, sortie, erreurs |
| `src/stockage.js` | Lire et écrire le fichier JSON | À coder en premier |
| `src/registre.js` | Formater, lister, trouver, vérifier, créer, ajouter | À coder |
| `src/recherche.js` | Filtrer et trier | À coder |
| `src/synthese.js` | Total, synthèse par parcelle, minimum et maximum | À coder |
| `src/bonus.js` | Supprimer, modifier, tri décroissant, parcelle la plus coûteuse | Bonus |
| `src/saisie.js`, `src/outils.js` | Saisie au clavier ; `versNombre`, `estDateValide` | Fournis : à utiliser, pas à modifier |
| `donnees/operations.json` | Les dix opérations de départ (fictives) | Modifié par votre programme |
| `test/` | Les tests fournis ; `donnees-test.json` est une copie figée des données de départ | Ne pas modifier ; vous pouvez ajouter des tests |
| `fiches/` | Le détail de chaque partie | À lire |
| `docs/`, `README.md` | Vos livrables écrits | À compléter |
| Fiche de référence agronomique | Remise par le coach agronomie | À citer |

## Démarrer

1. Vérifiez `node --version` (20 ou plus) et `git --version`. Configurez Git **à votre nom** :
   `git config --global user.name "Prénom NOM"` et `git config --global user.email "vous@exemple.com"`.
2. Créez sur GitHub un dépôt **vide** `brief-1-registre-maraicher`. Ouvrez le dossier du kit dans VS Code, puis dans son terminal :

   ```powershell
   git init
   git add .
   git commit -m "Départ du brief 1 : kit fourni"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/brief-1-registre-maraicher.git
   git push -u origin main
   ```

3. `node app.js` affiche seulement « À compléter » : le menu est à écrire. `npm test` affiche **3 tests verts** (les outils fournis) et **36 rouges**.

Si PowerShell bloque `npm`, tapez `npm.cmd` à la place (`npm.cmd test`, `npm.cmd run test:registre`). Pour retrouver les données de départ : `git restore donnees/operations.json`.

## Repères

Organisez votre temps comme vous le voulez. Ordre conseillé, chaque étape s'appuyant sur la précédente :

| Étape | Fiche | Vérifier |
| --- | --- | --- |
| 1. Comprendre le besoin, préparer le poste, planifier | `fiches/1-concevoir.md` | `npm test` |
| 2. Lire et écrire le JSON | `fiches/2-donnees-json.md` | `npm run test:stockage` |
| 3. Le menu ; ajouter et lister ; choix 1 et 2 | `fiches/3-ajouter-lister.md` | `npm run test:registre` |
| 4. Rechercher et trier ; choix 3 et 4 | `fiches/4-rechercher-trier.md` | `npm run test:recherche` |
| 5. Synthèse ; choix 5 | `fiches/5-synthese.md` | `npm run test:synthese` |
| 6. Tester, documenter, livrer, préparer la soutenance | `fiches/6-finaliser.md` | `npm test` |
| Bonus | `fiches/7-bonus.md` | `npm run test:bonus` |

Repère de mi-parcours : les étapes 1 à 3 sont faites. Gardez la dernière demi-journée pour l'étape 6.

## Les règles

- **Individuel.** L'entraide est permise : expliquer, sans écrire le code de l'autre. Notez-la dans `docs/fiche-individuelle.md`.
- **Pas d'exemple de code.** Deux fonctions ont un pseudo-code de référence dans leur fiche ; pour les autres, écrivez votre algorithme sur papier avant de coder.
- **Cherchez par vous-même** : le cours, la documentation JavaScript de MDN (<https://developer.mozilla.org/fr/docs/Web/JavaScript>), la documentation de Node.js (<https://nodejs.org/api/>). Notez vos recherches dans `docs/journal-recherche.md`. Une IA ou un site peuvent vous aider à comprendre : citez-les, et sachez expliquer chaque ligne gardée.
- **Un code que vous ne savez pas expliquer n'est pas un acquis** : en soutenance, ses points peuvent ne pas être comptés.
- **Les tests fournis ne vérifient pas tout.** Le formateur a des tests cachés (autres données, cas limites) et joue des scénarios dans votre menu. Lisez chaque règle, écrivez vos propres tests, n'écrivez jamais un résultat en dur.
- Ne modifiez pas `src/saisie.js`, `src/outils.js` ni les tests fournis. Dans `app.js`, respectez les textes et les numéros imposés par les fiches.
- Un commit par étape qui marche, avec un message qui dit ce que vous avez fait.

## Les données

```js
{ id: 'O03', date: '2026-10-21', parcelle: 'P1', culture: 'tomate', operation: 'arrosage', coutFCFA: 2000 }
```

| Champ | Contenu |
| --- | --- |
| `id` | Identifiant unique, par exemple `O03` |
| `date` | Date de l'opération, au format `AAAA-MM-JJ` |
| `parcelle`, `culture` | Par exemple `P1`, `tomate` |
| `operation` | `semis`, `arrosage`, `désherbage`, `repiquage` ou `récolte` |
| `coutFCFA` | Dépense enregistrée, en FCFA : un nombre positif ou nul |

Le coût est une **dépense** : sans les revenus, on ne peut pas parler de rentabilité.

**Résultats de référence**, avec les données de départ :

- total des coûts : **40 000 FCFA** ; P1 : 4 opérations, 15 500 FCFA ; P2 : 3, 9 500 FCFA ; P3 : 3, 15 000 FCFA ;
- coût minimum **1 500 FCFA**, maximum **8 000 FCFA** ;
- `O03` : P1, tomate, arrosage, 2 000 FCFA ; `O99` : introuvable ; le tri par coût commence par `O05` ;
- un coût négatif, vide ou non numérique est refusé ; un deuxième `O01` est refusé ; la somme d'un registre vide vaut 0.

## À rendre

À l'heure de livraison, la dernière version poussée sur GitHub est évaluée :

- le code, avec tous les tests du socle au vert (seuls ceux du bonus peuvent rester rouges) ;
- `README.md` complété ;
- dans `docs/` : dictionnaire des données, tableau des tâches, relevé des tests, journal de recherche, fiche agronomique (une page), fiche individuelle.
