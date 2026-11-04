// Rechercher et trier les opérations.
// Fiche : fiches/4-rechercher-trier.md · Vérifier : npm run test:recherche

// Renvoie un NOUVEAU tableau avec les opérations de cette parcelle (éventuellement vide).
export function filtrerParParcelle(operations, parcelle) {
  const resultat = [];
  for( const operation of operations){
    if (operation.parcelle===parcelle){
      resultat.push(operation);
    }
  } return resultat
}

// Renvoie un NOUVEAU tableau avec les opérations de cette culture (éventuellement vide).
export function filtrerParCulture(operations, culture) {
  const resultats=[]
  for( const operation of operations){
    if (operation.culture===culture){
      resultats.push(operation);
    }
  } return resultats
}
// Renvoie une COPIE triée par coût croissant, avec un comparateur numérique.
// Deux opérations de même coût gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParCout(operations) {
  return[...operations].sort ((a,b) => a.coutFCFA-b.coutFCFA);
}

// Renvoie une COPIE triée par date, de la plus ancienne à la plus récente.
// Deux opérations de même date gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParDate(operations) {
  return[...operations].sort ((c,d)=> {
    if (c.date < d.date) return -1;
    if (c.date > d.date) return 1;
    return 0;
  });
}
