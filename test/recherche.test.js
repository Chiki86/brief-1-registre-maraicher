import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from '../src/recherche.js';

// Copie figée des données de départ : vos ajouts dans donnees/operations.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

function ids(operations) {
  return operations.map((operation) => operation.id);
}

test('filtrerParParcelle garde les opérations de la parcelle P1', () => {
  assert.deepEqual(ids(filtrerParParcelle(DONNEES, 'P1')), ['O01', 'O03', 'O06', 'O09']);
});

test('filtrerParParcelle renvoie une liste vide pour une parcelle inconnue', () => {
  assert.deepEqual(filtrerParParcelle(DONNEES, 'P9'), []);
});

test('filtrerParCulture garde les opérations du gombo', () => {
  assert.deepEqual(ids(filtrerParCulture(DONNEES, 'gombo')), ['O02', 'O05', 'O08']);
});

test('trierParCout : le tri croissant commence par O05 et finit par O06', () => {
  const triee = trierParCout(DONNEES);
  assert.equal(triee[0].id, 'O05');
  assert.equal(triee[9].id, 'O06');
});

test('trierParCout utilise un comparateur numérique', () => {
  const couts = trierParCout(DONNEES).map((operation) => operation.coutFCFA);
  assert.deepEqual(couts, [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 8000]);
});

test('trierParCout ne modifie pas le registre d’origine', () => {
  const operations = DONNEES.map((operation) => ({ ...operation }));
  trierParCout(operations);
  assert.deepEqual(ids(operations), ids(DONNEES));
});

test('trierParDate classe de la plus ancienne à la plus récente', () => {
  const operations = [DONNEES[9], DONNEES[0], DONNEES[4]];
  assert.deepEqual(ids(trierParDate(operations)), ['O01', 'O05', 'O10']);
});

