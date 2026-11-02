# 3. Le menu, ajouter et lister

**Vos fichiers :** `src/registre.js`, puis `app.js` (le menu, choix 1 et 2) · **Vos tests :** `npm run test:registre` (13 tests fournis)

Une opération est un objet ; le registre est un tableau d'opérations :

```js
{ id: 'O03', date: '2026-10-21', parcelle: 'P1', culture: 'tomate', operation: 'arrosage', coutFCFA: 2000 }
```

Codez les fonctions dans l'ordre : chacune sert aux suivantes. Les tests fournis montrent ce que chacune doit renvoyer.

## Le menu (`app.js`)

`app.js` ne contient que les imports et le nom du fichier de données : écrivez tout le menu. Comportement imposé :

1. Au lancement : l'écran d'accueil, puis les données lues avec `chargerJson` et le message `10 opération(s) chargée(s) depuis donnees/operations.json.`. Si la lecture échoue : `Impossible de lire donnees/operations.json : <message de l'erreur>. Le registre démarre vide.`, et le programme continue avec une liste vide.
2. Avant **chaque** choix, le menu s'affiche, puis la question `Votre choix : `. Lisez `src/saisie.js` (`ouvrirSaisie`, `demander`, `fermerSaisie`).
3. Chaque choix lance son action, puis le menu revient.
4. `0` quitte en affichant `Au revoir !` ; le programme quitte aussi si `demander` renvoie `null` (Ctrl+C).
5. Un autre choix affiche `Choix inconnu : « 9 ». Tapez un chiffre du menu.`, puis le menu revient.
6. Aucune erreur n'arrête le programme : affichez `À compléter : …` (le message de l'erreur) si elle vient d'une fonction pas encore codée (message commençant par `TODO`), sinon `Erreur inattendue : …`, puis le menu revient.

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

Pistes : quelle boucle répète des instructions tant qu'une condition est vraie ? Quelle instruction choisit entre plusieurs cas selon une valeur ? Cherchez comment attraper une erreur. Écrivez d'abord le menu avec des actions vides, puis remplissez-les une à une.

## 1. `formaterOperation(operation)`

Renvoie une ligne de texte : `'O03 | 2026-10-21 | P1 | tomate | arrosage | 2000 FCFA'`.

**À vous.** Piste : un gabarit de chaîne `` `${…}` ``.

## 2. `listerOperations(operations)`

Renvoie une opération par ligne (pas de retour à la ligne après la dernière), ou `'Aucune opération enregistrée.'` si le tableau est vide.

**À vous.** Pistes : réutilisez `formaterOperation` ; cherchez une méthode des tableaux qui rassemble les éléments en un texte, avec un séparateur.

## 3. `trouverParId(operations, id)`

Renvoie l'opération (l'objet du registre lui-même) ou `undefined`.

**À vous.** Pistes : arrêtez la recherche dès que c'est trouvé ; que renvoyer si rien ne correspond ?

## 4. `verifierOperation(saisie, operations)`

Tous les champs de la saisie sont des **textes** : `{ id: 'O11', date: '2026-10-27', parcelle: 'P1', culture: 'tomate', operation: 'récolte', coutFCFA: '2500' }`. Renvoie un tableau de messages d'erreur, **un par règle non respectée** ; `[]` signifie « valide ». Ne modifie pas le registre.

| Champ | Règle |
| --- | --- |
| `id` | obligatoire, et absent du registre reçu |
| `date` | une date qui existe, au format `AAAA-MM-JJ` |
| `parcelle`, `culture` | obligatoires : n'importe quel texte non vide |
| `operation` | présente dans `OPERATIONS` |
| `coutFCFA` | un nombre positif ou nul |

N'ajoutez aucune autre règle.

**À vous** : écrivez d'abord l'algorithme complet, sur papier. Pistes : `src/outils.js` contient deux outils ; que vaut `Number('')`, et `versNombre('')` ? Cherchez une méthode des tableaux qui dit si une valeur fait partie d'une liste.

## 5. `creerOperation(saisie)`

Renvoie un **nouvel** objet, avec `coutFCFA` converti en nombre (`'2 500'` devient `2500`).

**À vous.**

## 6. `ajouterOperation(operations, saisie)`

Si la saisie est valide, ajoute l'opération à la fin du registre et renvoie `[]`. Sinon, renvoie les erreurs sans rien ajouter.

**Pseudo-code de référence :**

```text
erreurs ← verifierOperation(saisie, operations)
SI erreurs n'est pas vide ALORS
  RENVOYER erreurs
FIN SI
ajouter creerOperation(saisie) à la fin de operations
RENVOYER une liste vide
```

## 7. Les choix 1 et 2 (`app.js`)

Écrivez les actions `ajouter` et `lister`. Le dialogue est **imposé** : le formateur le joue automatiquement.

```text
--- Ajouter une opération ---
Identifiant (ex. O11) : o11
Date (AAAA-MM-JJ) : 2026-10-27
Parcelle (ex. P1) : p1
Culture (ex. tomate) : Tomate
Opération (semis, arrosage, désherbage, repiquage, récolte) : Récolte
Coût en FCFA : 2500
Opération O11 ajoutée. Le registre compte 11 opération(s).
```

- Les six questions dans cet ordre, avec `demander` (voir `src/saisie.js`) ; la liste des opérations vient de `OPERATIONS`.
- Avant de vérifier : identifiant et parcelle en majuscules, culture et opération en minuscules. Cherchez comment changer la casse d'un texte.
- Ajout réussi : enregistrez le registre dans `donnees/operations.json` (fiche 2), puis affichez la ligne ci-dessus.
- Saisie refusée :

  ```text
  Opération refusée :
    - Le coût doit être un nombre positif ou nul (en FCFA).
  Le registre compte toujours 10 opération(s).
  ```

- Si `demander` renvoie `null` (Ctrl+C), abandonnez l'ajout.

```text
--- Liste des opérations (10) ---
O01 | 2026-10-20 | P1 | tomate | semis | 3000 FCFA
…
```

## Vérifier

- `npm run test:registre`.
- Dans le menu : ajoutez `O11` ; essayez chaque règle avec une valeur interdite et un nouvel identifiant ; essayez une saisie avec trois erreurs. Notez les résultats dans `docs/releve-tests.md`.
