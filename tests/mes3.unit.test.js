import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateLateFee } from '../src/services/late-fee.service.js';

test('49 heures de retard : trois jours factures', () => {
  // Arrange : dates UTC explicites et tarif en centimes, sans horloge ni base externe.
  const input = {
    dueAt: new Date('2027-01-10T10:00:00Z'),
    returnedAt: new Date('2027-01-12T11:00:00Z'),
    dailyFeeCents: 1000,
  };

  // Act : executer la vraie fonction, sans la remplacer par un mock.
  const result = calculateLateFee(input);

  // Assert : 49 heures entament une troisieme periode de 24 heures.
  // Les attendus sont explicites pour ne pas recopier une eventuelle erreur de calcul.
  assert.deepEqual(result, { lateDays: 3, totalFeeCents: 3000 });
});

test('retour exactement a echeance : aucun frais', () => {
  // Arrange : deux dates egales representent la limite exacte, sans retard.
  const input = {
    dueAt: new Date('2027-01-10T10:00:00Z'),
    returnedAt: new Date('2027-01-10T10:00:00Z'),
    dailyFeeCents: 1000,
  };

  // Act : conserver la meme fonction et le meme tarif que dans le cas nominal.
  const result = calculateLateFee(input);

  // Assert : etre a l'heure ne doit pas declencher une journee de facturation.
  assert.deepEqual(result, { lateDays: 0, totalFeeCents: 0 });
});
