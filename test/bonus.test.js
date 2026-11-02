// Tests du BONUS (src/bonus.js) : ils restent rouges tant que le bonus n'est pas codé.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { modifierOperation, parcelleLaPlusCouteuse, supprimerOperation, trierParCoutDecroissant } from '../src/bonus.js';

// Copie figée des données de départ : vos ajouts dans donnees/operations.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

function copieDesDonnees() {
  return DONNEES.map((operation) => ({ ...operation }));
}

test('bonus : supprimerOperation retire O03 du registre et la renvoie', () => {
  const operations = copieDesDonnees();
  assert.equal(supprimerOperation(operations, 'O03').id, 'O03');
  assert.equal(operations.length, 9);
  assert.equal(operations.find((operation) => operation.id === 'O03'), undefined);
});

test('bonus : supprimerOperation d’un identifiant inconnu ne change rien', () => {
  const operations = copieDesDonnees();
  assert.equal(supprimerOperation(operations, 'O99'), undefined);
  assert.equal(operations.length, 10);
});

test('bonus : modifierOperation change le coût, converti en nombre', () => {
  const operations = copieDesDonnees();
  assert.deepEqual(modifierOperation(operations, 'O03', 'coutFCFA', '2500'), []);
  assert.equal(operations[2].coutFCFA, 2500);
});

test('bonus : modifierOperation refuse un coût négatif et ne change rien', () => {
  const operations = copieDesDonnees();
  assert.notEqual(modifierOperation(operations, 'O03', 'coutFCFA', '-1').length, 0);
  assert.equal(operations[2].coutFCFA, 2000);
});

test('bonus : modifierOperation refuse un identifiant inconnu et la modification de l’identifiant', () => {
  const operations = copieDesDonnees();
  assert.notEqual(modifierOperation(operations, 'O99', 'coutFCFA', '100').length, 0);
  assert.notEqual(modifierOperation(operations, 'O03', 'id', 'O50').length, 0);
  assert.equal(operations[2].id, 'O03');
});

test('bonus : modifierOperation accepte une opération de la liste et refuse les autres', () => {
  const operations = copieDesDonnees();
  assert.deepEqual(modifierOperation(operations, 'O03', 'operation', 'récolte'), []);
  assert.equal(operations[2].operation, 'récolte');
  assert.notEqual(modifierOperation(operations, 'O03', 'operation', 'labour').length, 0);
});

test('bonus : trierParCoutDecroissant commence par O06 et ne modifie pas le registre', () => {
  const operations = copieDesDonnees();
  const triee = trierParCoutDecroissant(operations);
  assert.equal(triee[0].id, 'O06');
  assert.equal(triee[9].id, 'O05');
  assert.equal(operations[0].id, 'O01');
});

test('bonus : parcelleLaPlusCouteuse renvoie P1 avec 15500 FCFA, ou null', () => {
  assert.deepEqual(parcelleLaPlusCouteuse(DONNEES), { parcelle: 'P1', total: 15500 });
  assert.equal(parcelleLaPlusCouteuse([]), null);
});
