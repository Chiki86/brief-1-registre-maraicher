// Registre des opérations maraîchères — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { OPERATIONS, ajouterOperation, formaterOperation, listerOperations, trouverParId } from './src/registre.js';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from './src/recherche.js';
import { coutMinMax, syntheseParParcelle, totalCouts } from './src/synthese.js';

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
  console.log('0. Quitter');
}

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
function lister(operations) {
  console.log(`--- Liste des opérations (${operations.length}) ---`);
  console.log(listerOperations(operations));
}
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
          case '1': await ajouter(operations); break;
          case '2': lister(operations); break;
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
