// Synthèse des dépenses enregistrées.
// Fiche : fiches/5-synthese.md · Vérifier : npm run test:synthese

// Renvoie la somme des coûts, en FCFA. Liste vide : 0.
export function totalCouts(operations) {
  let total = 0;
  for (const operation of operations) {
    total = total + operation.coutFCFA;
  }
  return total;
}

// Renvoie un objet : pour chaque parcelle, le nombre d'opérations et le total de leurs coûts.
// Exemple : { P1: { nombre: 4, total: 15500 }, P2: { nombre: 3, total: 9500 } }
// Liste vide : {} (un objet vide).
export function syntheseParParcelle(operations) {
  const synthese = {};
  for (const operation of operations) {
    const cle = operation.parcelle;
    if (synthese[cle] === undefined) {
      synthese[cle] = { nombre: 0, total: 0 };
    }
    synthese[cle].nombre = synthese[cle].nombre + 1;
    synthese[cle].total = synthese[cle].total + operation.coutFCFA;
  }
  return synthese;
}

// Renvoie { min, max } des coûts, ou null si la liste est vide.
// Exemple : { min: 1500, max: 8000 }
export function coutMinMax(operations) {
  if (operations.length === 0) {
    return null;
  }
  let min = operations[0].coutFCFA;
  let max = operations[0].coutFCFA;
  for (const operation of operations) {
    if (operation.coutFCFA < min) {
      min = operation.coutFCFA;
    }
    if (operation.coutFCFA > max) {
      max = operation.coutFCFA;
    }
  }
  return { min, max };
}
