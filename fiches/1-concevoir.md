# 1. Comprendre et préparer

**Objectif :** un poste prêt, un dépôt GitHub, le besoin compris, un plan de travail.

1. **Poste et dépôt.** Suivez « Démarrer » dans `SUJET.md`. Montrez au coach : `npm test` affiche 3 tests verts, le dépôt est sur GitHub.
2. **Le besoin.** Rédigez la partie « Contexte » du `README.md` : qui utilise l'outil, son besoin, ce qu'il saisit et ce qu'il veut voir. Distinguez trois notions : le **coût enregistré** (une dépense, présente dans les données), le **revenu** (absent) et la **rentabilité** (impossible à calculer ici).
3. **L'agronomie.** Avec la fiche de référence et le coach agronomie, placez les cinq opérations de la liste (`semis`, `repiquage`, `arrosage`, `désherbage`, `récolte`) dans le cycle d'une culture. Gardez vos notes pour `docs/fiche-agronomique.md`.
4. **Les données.** Complétez `docs/dictionnaire-donnees.md`. Ouvrez `donnees/operations.json` et calculez à la main le total des coûts, puis le nombre d'opérations et le total de chaque parcelle (dans `docs/releve-tests.md`).
5. **Le code fourni.** Lisez `src/saisie.js` (la saisie au clavier), `src/outils.js` et les tests de `test/`. `app.js` est presque vide : vous y écrirez tout le menu. Notez dans `docs/journal-recherche.md` les notions que vous devrez chercher.
6. **Le plan.** Remplissez la colonne « Prévu » de `docs/taches.md` : c'est vous qui organisez vos quatre jours.

**Une expérience pour lire un test rouge :** dans `src/outils.js`, remplacez `return NaN;` par `return 0;`, lancez `npm run test:outils`, lisez le message (`expected` = attendu, `actual` = obtenu), puis annulez avec `git restore src/outils.js`.
