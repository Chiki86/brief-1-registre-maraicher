// Ajouter et lister les opérations.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { estDateValide, versNombre } from './outils.js';

// Liste fermée des opérations culturales acceptées, fournie par le coach agronomie.
export const OPERATIONS = ['semis', 'arrosage', 'désherbage', 'repiquage', 'récolte'];

// Renvoie une ligne de texte qui décrit l'opération.
// Exemple : 'O03 | 2026-10-21 | P1 | tomate | arrosage | 2000 FCFA'
export function formaterOperation(operation) {
  return `${operation.id} | ${operation.date} | ${operation.parcelle} | ${operation.culture} | ${operation.operation} | ${operation.coutFCFA} FCFA`
  throw new Error('TODO : coder formaterOperation dans src/registre.js');
}

// Renvoie un texte avec une opération par ligne (lignes séparées par '\n'),
// ou 'Aucune opération enregistrée.' si la liste est vide.
export function listerOperations(operations) {
  if (operations.length === 0) { 
  return "Aucune opération enregistrée.";
}
  return operations.map(formaterOperation).join('\n')


  throw new Error('TODO : coder listerOperations dans src/registre.js');
  
}

// Renvoie l'opération qui a cet identifiant, ou undefined si elle n'existe pas.
export function trouverParId(operations, id) {
return operations.find(a=>a.id===id)
  throw new Error('TODO : coder tarouverParId dans src/registre.js');
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'O11', date: '2026-10-27', parcelle: 'P1', culture: 'tomate', operation: 'récolte', coutFCFA: '2500' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · date réelle au format AAAA-MM-JJ · parcelle et culture
// obligatoires (n'importe quel texte non vide) · operation présente dans OPERATIONS
// · coutFCFA nombre positif ou nul.
export function verifierOperation(saisie, operations) {
  const erreurs = [];
if (saisie.id===''){
  erreurs.push('id obligatoire');
}
else if (trouverParId(operations,saisie.id) !== undefined){
  erreurs.push(`identifiant ${saisie.id} existe déja`);
}
if (!estDateValide(saisie.date)){
  erreurs.push (`Veuilles entrer une date valide au format AAAA-MM-JJ`);
}
if(saisie.parcelle===''){
  erreurs.push (`Parcelle obligatoire, veuillez entrer une parcelle valide`)
}
if(saisie.culture===''){
  erreurs.push(`culture obligatoire, veuilles entrer une culture valide`)
}
if(!OPERATIONS.includes(saisie.operation)){
  erreurs.push(`Veuillez entrer une operation valide de la liste: semis, arrosage , désherbage, repiquage, recolte`)
}const conversion= versNombre(saisie.coutFCFA)
if ( Number.isNaN(conversion)|| conversion<0){
  erreurs.push(`veuillez entrer un nombre positif`)
}
return erreurs


  throw new Error('TODO : coder verifierOperation dans src/registre.js');
}

// Fabrique l'opération à enregistrer à partir d'une saisie VALIDE : coutFCFA devient un nombre.
export function creerOperation(saisie) {
  throw new Error('TODO : coder creerOperation dans src/registre.js');
}

// Ajoute la saisie au registre si elle est valide (verifierOperation, puis creerOperation).
// Renvoie les erreurs : [] si l'opération a été ajoutée ; sinon les messages, et rien n'est ajouté.
export function ajouterOperation(operations, saisie) {
  throw new Error('TODO : coder ajout verifiererOperation dans src/registre.js');
}
