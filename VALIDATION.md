# Vérification des corrigés — 27 octobre 2026

Les réponses sont intégrées et commentées dans les six fichiers des exercices, dans le dossier MES courant.

## Corrigés livrés

- MES 1 : routage, contrôle du rôle, contrôleur et préparation métier du service.
- MES 2 : sélection des prêts rendus, jointure avec les équipements, exclusion du matériel archivé, regroupement, moyenne et présentation du rapport.
- MES 3 : test du retard partiel et test du retour exactement à l'échéance.

## Résultats

Les 13 tests du projet courant ont été exécutés : **13 réussites, aucun échec, aucun test ignoré**.

- MES 1 : 5 tests réussis.
- MES 2 : 3 tests réussis.
- MES 3 : 2 tests réussis.
- Socle : 3 tests réussis.

Les tests HTTP utilisent Supertest et une vraie base MongoDB éphémère 7.0.24, distincte de la base de démonstration. Les tests unitaires ne nécessitent pas de base. La syntaxe des six fichiers corrigés a aussi été vérifiée.

Commande exécutée depuis le dossier MES :

```sh
npm test -- tests/mes1.test.js tests/mes2.test.js tests/mes3.unit.test.js
```

Ces résultats concernent les fichiers corrigés réels du projet, et non une copie temporaire. Les assertions et les tests d'acceptation existants n'ont pas été assouplis.
