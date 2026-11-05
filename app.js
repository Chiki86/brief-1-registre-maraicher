// Registre des opérations maraîchères — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { OPERATIONS, ajouterOperation, formaterOperation, listerOperations, trouverParId } from './src/registre.js';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from './src/recherche.js';
import { coutMinMax, syntheseParParcelle, totalCouts } from './src/synthese.js';
import { modifierOperation, parcelleLaPlusCouteuse, supprimerOperation, trierParCoutDecroissant } from './src/bonus.js';
const FICHIER_DONNEES = 'donnees/operations.json';

function afficherAccueil() {
  console.log('='.repeat(52));
  console.log('   REGISTRE DES OPÉRATIONS MARAÎCHÈRES');
  console.log('   AGRI-REGISTRE');
  console.log('   Exploitation maraîchère pédagogique');
  console.log('='.repeat(52));
}

function afficherMenu() {
  console.log('');
  console.log('-'.repeat(21) + ' MENU ' + '-'.repeat(21));
  console.log('1. Ajouter une opération');
  console.log('2. Lister les opérations');
  console.log('3. Rechercher (identifiant, parcelle, culture)');
  console.log('4. Trier (coût, date)');
  console.log('5. Synthèse des dépenses');
  console.log('6. Supprimer une opération');
  console.log('7. Modifier une opération');
  console.log('0. Quitter');
}
//ASYNCHRONE DE L'OPTION 1 DE APP.JS
async function ajouter(operations) {
  console.log("--- Ajoutez une opération s'il vous plait!!---");
  const id = await demander('Identifiant (ex. O10) : ');
  if (id === null) return;
  const date = await demander('Date (Format. AAAA-MM-JJ) : ');
  if (date === null) return;
  const parcelle = await demander('Parcelle (ex. P1) : ');
  if (parcelle === null) return;
  const culture = await demander('Culture (ex. Aubergine) : ');
  if (culture === null) return;
  const operation = await demander(`Opération (${OPERATIONS.join(', ')}) : `);
  if (operation === null) return;
  const cout = await demander('Coût en FCFA : ');
  if (cout === null) return;

  const saisie = {
    id: id.toUpperCase(),
    date,
    parcelle: parcelle.toUpperCase(),
    culture: culture.toLowerCase(),
    operation: operation.toLowerCase(),
    coutFCFA: cout,
  };
  const erreurs = ajouterOperation(operations, saisie);
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, operations);
    console.log(`Opération ${saisie.id} ajoutée. Le registre compte maintenant ${operations.length} opération(s).`);
  } else {
    console.log('Opération refusée :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    console.log(`Le registre compte toujours ${operations.length} opération(s).`);
  }
}
//ASYNCHRONE DE L'OPTION 2 DE APP.JS
function lister(operations) {
  console.log(`--- Liste des opérations (${operations.length}) ---`);
  console.log(listerOperations(operations));
}

//ASYNCHRONE DE L'OPTION 3 APP.JS
  async function rechercher(operations) {
  console.log('--- Rechercher ---');
  console.log('1. Par identifiant');
  console.log('2. Par parcelle');
  console.log("3. Les opérations d'une culture");
  const choix = await demander(' Veuillez faire votre choix : ');
  if (choix === null) return;

  if (choix === '1') {
    const reponse = await demander('Identifiant : ');
    if (reponse === null) return;
    const id = reponse.toUpperCase();
    const trouvee = trouverParId(operations, id);
    console.log(trouvee === undefined ? `l'Opération ${id} est introuvable.` : formaterOperation(trouvee));
  } else if (choix === '2') {
    const reponse = await demander('Parcelle : ');
    if (reponse === null) return;
    const parcelle = reponse.toUpperCase();
    const resultat = filtrerParParcelle(operations, parcelle);
    console.log(`Il y a ${resultat.length} opération(s) sur la parcelle ${parcelle} :`);
    console.log(listerOperations(resultat));
  } else if (choix === '3') {
    const reponse = await demander('Culture : ');
    if (reponse === null) return;
    const culture = reponse.toLowerCase();
    const resultat = filtrerParCulture(operations, culture);
    console.log(`Il y a ${resultat.length} opération(s) pour la culture ${culture} :`);
    console.log(listerOperations(resultat));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}
//ASYNCHRONE DE L'OPTION 4 APP.JS
async function trier(operations) {
  console.log('--- Trier ---');
  console.log('1. Par coût croissant');
  console.log('2. Par date, de la plus ancienne à la plus récente');
  console.log('3. Par coût décroissant');
  const choix = await demander(' Veuillez faire votre choix : ');
  if (choix === null) return;

  if (choix === '1') {
    console.log(listerOperations(trierParCout(operations)));
  } else if (choix === '2') {
    console.log(listerOperations(trierParDate(operations)));
  } else if (choix === '3') {
    console.log(listerOperations(trierParCoutDecroissant(operations)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}
//L'OPTION 5 APP.JS
function synthese(operations) {
  console.log('--- Synthèse des dépenses enregistrées ---');
  console.log(`Nombre d'opérations : ${operations.length}`);
  console.log(`Total des coûts : ${totalCouts(operations)} FCFA`);
  console.log('Par parcelle :');
  for (const [parcelle, donnees] of Object.entries(syntheseParParcelle(operations))) {
    console.log(`  ${parcelle} : ${donnees.nombre} opération(s), ${donnees.total} FCFA`);
  }
  const minMax = coutMinMax(operations);
  if (minMax === null) {
    console.log('Coût minimum et maximum : aucune donnée.');
  } else {
    console.log(`Coût minimum : ${minMax.min} FCFA · Coût maximum : ${minMax.max} FCFA`);
    const chere = parcelleLaPlusCouteuse(operations);
    console.log(`Parcelle la plus coûteuse : ${chere.parcelle} (${chere.total} FCFA)`);
  }
  console.log('Rappel : ce sont des dépenses. Sans les revenus, elles ne mesurent pas la rentabilité.');
}
//ASYNHCRHONE DE L'OPTION 6 APP.JS

async function supprimer(operations) {
  const reponse = await demander('Identifiant : ');
  if (reponse === null) return;
  const id = reponse.toUpperCase();
  const supprimee = supprimerOperation(operations, id);
  if (supprimee === undefined) {
    console.log(`Opération ${id} introuvable.`);
  } else {
    await enregistrerJson(FICHIER_DONNEES, operations);
    console.log(`Opération ${id} supprimée. Le registre compte ${operations.length} opération(s).`);
  }
}
//ASYNHCRHONE DE L'OPTION 7 APP.JS

async function modifier(operations) {
  const reponseId = await demander('Identifiant : ');
  if (reponseId === null) return;
  const champ = await demander('Champ à modifier (date, parcelle, culture, operation, coutFCFA) : ');
  if (champ === null) return;
  const reponse = await demander('Nouvelle valeur : ');
  if (reponse === null) return;

  const id = reponseId.toUpperCase();
  let valeur = reponse;
  if (champ === 'parcelle') valeur = reponse.toUpperCase();
  if (champ === 'culture' || champ === 'operation') valeur = reponse.toLowerCase();

  const erreurs = modifierOperation(operations, id, champ, valeur);
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, operations);
    console.log(`Opération ${id} modifiée.`);
  } else {
    console.log('Modification refusée :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
  }
}
// EXCECUTION DE L'INTERRACTION DU REGISTRE APP.JS
async function main() {
  ouvrirSaisie();
  afficherAccueil();

  let operations = [];
  try {
    operations = await chargerJson(FICHIER_DONNEES);
    console.log(`Vous avez ${operations.length} opération(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le registre démarre vide.`);
    operations = [];
  }

  let continuer = true;
  while (continuer) {
    afficherMenu();
    const choix = await demander('Veuillez faire un choix : ');
    if (choix === null || choix === '0') {
      console.log('AGRI-REGISTRE vous dit au revoir et à bientot !');
      continuer = false;
    } else {
      try {
        switch (choix) {
          case '1': await ajouter(operations);break;
          case '2': lister(operations); break;
          case '3': await rechercher(operations);break;
          case '4': await trier(operations); break;
          case '5': synthese(operations); break;
          case '6': await supprimer(operations); break;
          case '7': await modifier(operations); break;
          default:
            console.log(`Choix inconnu : « ${choix} ». Veuillez Taper un chiffre du menu, MERCI!!!`);
        }
      } catch (erreur) {
        if (erreur.message.startsWith('TODO')) {
          console.log(`À compléter : ${erreur.message}`);
        } else {
          console.log(`Erreur inattendue : ${erreur.message}`);
        }
      }
    }
  }

  fermerSaisie();
}

main();
