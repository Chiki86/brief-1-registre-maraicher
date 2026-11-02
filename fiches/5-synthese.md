# 5. Synthèse des dépenses

**Vos fichiers :** `src/synthese.js`, puis `app.js` (choix 5) · **Vos tests :** `npm run test:synthese` (5 tests fournis)

Aucune de ces fonctions ne modifie le registre reçu.

## 1. `totalCouts(operations)`

Renvoie la somme des coûts : `40000` avec les données de départ, `0` pour un registre vide.

**À vous.** Piste : avec quelle valeur commence la variable qui accumule ?

## 2. `syntheseParParcelle(operations)`

Renvoie un objet : `{ P1: { nombre: 4, total: 15500 }, P2: { nombre: 3, total: 9500 }, P3: { nombre: 3, total: 15000 } }` ; `{}` pour un registre vide.

**Pseudo-code de référence :**

```text
synthese ← objet vide
POUR CHAQUE operation DANS operations
  cle ← operation.parcelle
  SI synthese n'a pas encore la clé cle ALORS
    synthese[cle] ← { nombre: 0, total: 0 }
  FIN SI
  synthese[cle].nombre ← synthese[cle].nombre + 1
  synthese[cle].total ← synthese[cle].total + operation.coutFCFA
FIN POUR
RENVOYER synthese
```

Piste : `synthese.cle` et `synthese[cle]` ne veulent pas dire la même chose.

## 3. `coutMinMax(operations)`

Renvoie `{ min: 1500, max: 8000 }`, ou `null` pour un registre vide.

**À vous** : écrivez d'abord l'algorithme et suivez-le à la main sur un exemple. Pistes : avec quelle valeur commencer `min` ? Un coût peut valoir `0`.

## 4. Le menu : choix 5 (`app.js`)

Dialogue **imposé** (données de départ) :

```text
--- Synthèse des dépenses enregistrées ---
Nombre d'opérations : 10
Total des coûts : 40000 FCFA
Par parcelle :
  P1 : 4 opération(s), 15500 FCFA
  P2 : 3 opération(s), 9500 FCFA
  P3 : 3 opération(s), 15000 FCFA
Coût minimum : 1500 FCFA · Coût maximum : 8000 FCFA
Rappel : ce sont des dépenses. Sans les revenus, elles ne mesurent pas la rentabilité.
```

- Une ligne par parcelle, dans l'ordre de l'objet de `syntheseParParcelle`. Cherchez comment parcourir les clés et les valeurs d'un objet.
- Registre vide : `Coût minimum et maximum : aucune donnée`.

## Vérifier

`npm run test:synthese`, puis le choix 5 : comparez avec vos calculs à la main. Ajoutez une opération sur une nouvelle parcelle `P4` : sa ligne apparaît.
