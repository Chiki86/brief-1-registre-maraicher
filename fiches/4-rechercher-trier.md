# 4. Rechercher et trier

**Vos fichiers :** `src/recherche.js`, puis `app.js` (choix 3 et 4) · **Vos tests :** `npm run test:recherche` (7 tests fournis)

## 1. `filtrerParParcelle(operations, parcelle)` et 2. `filtrerParCulture(operations, culture)`

Renvoient un **nouveau** tableau, dans l'ordre du registre, éventuellement vide. `filtrerParParcelle(donnees, 'P1')` donne O01, O03, O06, O09 ; `filtrerParCulture(donnees, 'gombo')` donne O02, O05, O08.

**À vous.** Pistes : partez d'un tableau vide ; comment ajoute-t-on un élément à la fin d'un tableau ? Une méthode des tableaux fait ce travail en une ligne : utilisez-la seulement si vous savez l'expliquer.

## 3. `trierParCout(operations)`

Renvoie une **copie** triée par coût croissant ; deux coûts égaux gardent leur ordre ; le registre reçu ne change pas. Le tri commence par O05 (1500 FCFA).

**À vous.** Le brief impose un **comparateur numérique** : cherchez dans la documentation de `sort` ce qu'est une fonction de comparaison. Essayez dans un terminal `node` : `[8000, 15000, 2000].sort()`.

## 4. `trierParDate(operations)`

Renvoie une **copie** triée de la plus ancienne à la plus récente ; deux dates égales gardent leur ordre.

**À vous.** Pistes : au format `AAAA-MM-JJ`, l'ordre alphabétique est-il l'ordre du calendrier ? On ne soustrait pas deux textes : cherchez comment comparer deux chaînes.

## 5. Le menu : choix 3 et 4 (`app.js`)

Dialogue **imposé** :

```text
--- Rechercher ---
1. Par identifiant
2. Par parcelle
3. Les opérations d'une culture
Votre choix : 1
Identifiant : o03
O03 | 2026-10-21 | P1 | tomate | arrosage | 2000 FCFA
```

| Sous-choix | Question | Affichage |
| --- | --- | --- |
| `1` | `Identifiant : ` (en majuscules) | la ligne, ou `Opération O99 introuvable.` |
| `2` | `Parcelle : ` (en majuscules) | `3 opération(s) sur la parcelle P2 :` puis la liste |
| `3` | `Culture : ` (en minuscules) | `3 opération(s) pour la culture aubergine :` puis la liste |
| autre | — | `Choix inconnu : retour au menu.` |

```text
--- Trier ---
1. Par coût croissant
2. Par date, de la plus ancienne à la plus récente
Votre choix : 1
O05 | 2026-10-22 | P2 | gombo | arrosage | 1500 FCFA
…
```

La liste triée s'affiche juste après le choix, sans titre ; autre sous-choix : `Choix inconnu : retour au menu.` Les listes sont le texte de `listerOperations`.

## Vérifier

`npm run test:recherche`, puis dans le menu : `O03`, `O99`, `P2`, `aubergine`, les deux tris. Après un tri, la liste (choix 2) doit être revenue dans l'ordre d'origine.
