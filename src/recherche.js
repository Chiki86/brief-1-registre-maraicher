// Rechercher et trier les opérations.
// Fiche : fiches/4-rechercher-trier.md · Vérifier : npm run test:recherche

// Renvoie un NOUVEAU tableau avec les opérations de cette parcelle (éventuellement vide).
export function filtrerParParcelle(operations, parcelle) {
  throw new Error('TODO : coder filtrerParParcelle dans src/recherche.js');
}

// Renvoie un NOUVEAU tableau avec les opérations de cette culture (éventuellement vide).
export function filtrerParCulture(operations, culture) {
  throw new Error('TODO : coder filtrerParCulture dans src/recherche.js');
}

// Renvoie une COPIE triée par coût croissant, avec un comparateur numérique.
// Deux opérations de même coût gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParCout(operations) {
  throw new Error('TODO : coder trierParCout dans src/recherche.js');
}

// Renvoie une COPIE triée par date, de la plus ancienne à la plus récente.
// Deux opérations de même date gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParDate(operations) {
  throw new Error('TODO : coder trierParDate dans src/recherche.js');
}
