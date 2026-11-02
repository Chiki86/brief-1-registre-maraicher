import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { coutMinMax, syntheseParParcelle, totalCouts } from '../src/synthese.js';

// Copie figée des données de départ : vos ajouts dans donnees/operations.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

test('totalCouts : les dix opérations totalisent 40000 FCFA', () => {
  assert.equal(totalCouts(DONNEES), 40000);
});

test('totalCouts : la somme d’un registre vide vaut 0', () => {
  assert.equal(totalCouts([]), 0);
});

test('syntheseParParcelle compte et totalise les opérations de chaque parcelle', () => {
  assert.deepEqual(syntheseParParcelle(DONNEES), {
    P1: { nombre: 4, total: 15500 },
    P2: { nombre: 3, total: 9500 },
    P3: { nombre: 3, total: 15000 },
  });
});

test('coutMinMax : le plus petit coût est 1500 FCFA, le plus grand 8000 FCFA', () => {
  assert.deepEqual(coutMinMax(DONNEES), { min: 1500, max: 8000 });
});

test('coutMinMax d’un registre vide renvoie null', () => {
  assert.equal(coutMinMax([]), null);
});
