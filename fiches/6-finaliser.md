# 6. Tester, documenter, livrer

**Objectif :** un programme vérifié par quelqu'un d'autre, des livrables complets, une version poussée avant l'heure de livraison.

## Tester

1. `npm test` : tous les tests du socle sont verts (seuls ceux du bonus peuvent rester rouges).
2. **Faites tester par un camarade**, qui suit votre `docs/releve-tests.md` et essaie de casser le programme : coût négatif, vide, avec des lettres ou une unité ; identifiant en double, en minuscules ; date `27/10/2026` ou `2026-02-30` ; opération hors liste ; plusieurs erreurs à la fois ; choix inconnu ; Entrée sans rien taper ; parcelle `P1` avec la culture `gombo` (le registre ne le contrôle pas : notez-le dans les limites du README). Corrigez, retestez, gardez la trace.
3. **Écrivez vos propres tests** dans les fichiers `test/*.test.js` pour les cas limites (au moins quatre donnent un bonus).

## Documenter

- `docs/fiche-agronomique.md`, relue par le coach agronomie.
- `README.md` : cochez seulement ce qui marche.
- Vérifiez chaque document de `docs/` (voir « À rendre » dans `SUJET.md`).

## Livrer

Vérifiez sur un autre poste, en suivant votre README, à côté de votre projet et pas dedans :

```powershell
cd ..
git clone https://github.com/VOTRE-COMPTE/brief-1-registre-maraicher.git test-livraison
cd test-livraison
node app.js
npm test
```

Supprimez ensuite `test-livraison`. Avant l'heure : `git status` propre, `git push` fait.

## La soutenance (environ 15 minutes, individuelle)

1. **Démonstration (3 min)** : liste ; recherche de `O03` puis `O99` ; tri par coût ; synthèse ; une opération saisie en direct puis la synthèse à nouveau ; une saisie refusée.
2. **Explication (4 min)** : une fonction choisie par le jury, ligne par ligne.
3. **Modification guidée (4 min)**, par exemple : tri décroissant, coût moyen par parcelle, refuser un coût supérieur à 1 000 000 FCFA, filtrer par date.
4. **Questions (3 min)** : votre poste et Git (`git add`, `git commit`, `git push`) ; votre raisonnement (entrées, sortie, registre vide) ; vos recherches (journal) ; l'agronomie (une opération dans le cycle cultural, la rentabilité, une donnée manquante).
