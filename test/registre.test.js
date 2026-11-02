import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  ajouterOperation,
  creerOperation,
  formaterOperation,
  listerOperations,
  trouverParId,
  verifierOperation,
} from '../src/registre.js';

// Copie figée des données de départ : vos ajouts dans donnees/operations.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

// Une copie neuve des données pour chaque test : un ajout ne gêne pas les autres tests.
function copieDesDonnees() {
  return DONNEES.map((operation) => ({ ...operation }));
}

const SAISIE_VALIDE = { id: 'O11', date: '2026-10-27', parcelle: 'P1', culture: 'tomate', operation: 'récolte', coutFCFA: '2500' };

test('formaterOperation écrit une opération sur une ligne', () => {
  assert.equal(formaterOperation(DONNEES[2]), 'O03 | 2026-10-21 | P1 | tomate | arrosage | 2000 FCFA');
});

test('listerOperations écrit une ligne par opération', () => {
  const lignes = listerOperations(DONNEES).split('\n');
  assert.equal(lignes.length, 10);
  assert.equal(lignes[0], 'O01 | 2026-10-20 | P1 | tomate | semis | 3000 FCFA');
});

test('listerOperations affiche un message si le registre est vide', () => {
  assert.equal(listerOperations([]), 'Aucune opération enregistrée.');
});

test('trouverParId : O03 renvoie P1 tomate, arrosage, 2000 FCFA', () => {
  const operation = trouverParId(DONNEES, 'O03');
  assert.equal(operation.parcelle, 'P1');
  assert.equal(operation.culture, 'tomate');
  assert.equal(operation.operation, 'arrosage');
  assert.equal(operation.coutFCFA, 2000);
});

test('trouverParId : O99 est introuvable (undefined)', () => {
  assert.equal(trouverParId(DONNEES, 'O99'), undefined);
});

test('verifierOperation accepte une saisie valide', () => {
  assert.deepEqual(verifierOperation(SAISIE_VALIDE, DONNEES), []);
});

test('verifierOperation refuse un coût négatif, vide ou non numérique', () => {
  assert.notEqual(verifierOperation({ ...SAISIE_VALIDE, coutFCFA: '-500' }, DONNEES).length, 0);
  assert.notEqual(verifierOperation({ ...SAISIE_VALIDE, coutFCFA: '' }, DONNEES).length, 0);
  assert.notEqual(verifierOperation({ ...SAISIE_VALIDE, coutFCFA: 'abc' }, DONNEES).length, 0);
});

test('verifierOperation refuse un identifiant vide ou déjà utilisé', () => {
  assert.notEqual(verifierOperation({ ...SAISIE_VALIDE, id: '' }, DONNEES).length, 0);
  assert.notEqual(verifierOperation({ ...SAISIE_VALIDE, id: 'O01' }, DONNEES).length, 0);
});

test('verifierOperation refuse une opération absente de la liste fournie', () => {
  assert.notEqual(verifierOperation({ ...SAISIE_VALIDE, operation: 'labour' }, DONNEES).length, 0);
});

test('creerOperation convertit le coût en nombre', () => {
  assert.deepEqual(creerOperation(SAISIE_VALIDE), {
    id: 'O11',
    date: '2026-10-27',
    parcelle: 'P1',
    culture: 'tomate',
    operation: 'récolte',
    coutFCFA: 2500,
  });
});

test('ajouterOperation ajoute une saisie valide à la fin du registre', () => {
  const operations = copieDesDonnees();
  assert.deepEqual(ajouterOperation(operations, SAISIE_VALIDE), []);
  assert.equal(operations.length, 11);
  assert.equal(operations[10].id, 'O11');
  assert.equal(operations[10].coutFCFA, 2500);
});

test('ajouterOperation refuse un deuxième O01 : la liste reste à dix lignes', () => {
  const operations = copieDesDonnees();
  assert.notEqual(ajouterOperation(operations, { ...SAISIE_VALIDE, id: 'O01' }).length, 0);
  assert.equal(operations.length, 10);
});

test('ajouterOperation refuse un coût négatif sans ajouter de ligne', () => {
  const operations = copieDesDonnees();
  assert.notEqual(ajouterOperation(operations, { ...SAISIE_VALIDE, coutFCFA: '-500' }).length, 0);
  assert.equal(operations.length, 10);
});
