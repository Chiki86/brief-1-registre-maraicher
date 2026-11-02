# 7. Bonus — pour aller plus loin

**Vos fichiers :** `src/bonus.js`, puis `app.js` · **Vos tests :** `npm run test:bonus` (8 tests)

Seulement quand le socle est complet. Pas de pseudo-code de référence ni de piste détaillée : combinez ce que vous avez appris, cherchez ce qui manque, et sachez expliquer ce code en soutenance.

## Les fonctions (`src/bonus.js`, +1)

- **`supprimerOperation(operations, id)`** : retire l'opération du registre et la renvoie ; `undefined` si elle n'existe pas (le registre ne change pas). Piste : il faut sa position dans le tableau, puis la retirer à cette position ; cherchez une méthode des tableaux pour chaque étape.
- **`modifierOperation(operations, id, champ, valeur)`** : modifie un champ ; la valeur arrive en texte et suit les règles de l'ajout. Renvoie les erreurs (`[]` si c'est fait). Erreur si l'identifiant est introuvable, si `champ` vaut `'id'`, si `champ` n'est pas dans `CHAMPS_MODIFIABLES`, ou si la valeur est refusée ; dans ce cas, rien ne change. Pistes : les règles existent déjà dans `verifierOperation` ; attention, l'opération ne doit pas être vue comme un doublon d'elle-même.
- **`trierParCoutDecroissant(operations)`** : une copie, la plus chère d'abord.
- **`parcelleLaPlusCouteuse(operations)`** : `{ parcelle: 'P1', total: 15500 }` avec les données de départ ; `null` si le registre est vide ; en cas d'égalité, la première rencontrée.

## Le menu (`app.js`, +1)

Ajoutez au menu `6. Supprimer une opération` et `7. Modifier une opération`, et importez vos fonctions de `src/bonus.js`. Dialogue **imposé** :

| Choix | Questions, dans l'ordre | Affichage |
| --- | --- | --- |
| `6` | `Identifiant : ` (en majuscules) | `Opération O03 supprimée. Le registre compte 9 opération(s).` ou `Opération O99 introuvable.` |
| `7` | `Identifiant : ` (en majuscules), `Champ à modifier (date, parcelle, culture, operation, coutFCFA) : `, `Nouvelle valeur : ` | `Opération O03 modifiée.` ou `Modification refusée :` puis une erreur par ligne (`  - …`) |

Après une suppression ou une modification réussie, enregistrez le registre dans `donnees/operations.json`.

Deux ajouts d'affichage, comptés dans ce point :

- sous-menu **Trier** : `3. Par coût décroissant`, la liste s'affichant juste après le choix ;
- **synthèse**, juste après la ligne du coût minimum et maximum : `Parcelle la plus coûteuse : P1 (15500 FCFA)` (rien si le registre est vide).

Le formateur joue ces scénarios dans votre `app.js` : relancez `node app.js` après chaque modification.
