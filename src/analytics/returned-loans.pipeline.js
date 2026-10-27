export function buildReturnedLoansPipeline() {
  return [
    // Ne calculer les statistiques que sur les prets effectivement rendus.
    { $match: { status: 'RETURNED' } },

    // Retrouver l'equipement pour connaitre sa categorie et son etat d'archivage.
    {
      $lookup: {
        from: 'equipments',
        localField: 'equipmentId',
        foreignField: '_id',
        as: 'equipment',
      },
    },
    // La jointure retourne un tableau ; chaque pret retrouve ici son equipement.
    // Un pret sans equipement correspondant est exclu du rapport.
    { $unwind: '$equipment' },
    { $match: { 'equipment.isArchived': false } },

    // Chaque document represente un pret : compter les documents et moyenner leurs durees.
    {
      $group: {
        _id: '$equipment.category',
        returnedCount: { $sum: 1 },
        averageDurationDays: { $avg: '$durationDays' },
      },
    },
    // Exposer uniquement les champs du rapport et arrondir apres le calcul de la moyenne.
    {
      $project: {
        _id: 0,
        category: '$_id',
        returnedCount: 1,
        averageDurationDays: { $round: ['$averageDurationDays', 2] },
      },
    },
    // Stabiliser l'ordre des categories dans la reponse.
    { $sort: { category: 1 } },
  ];
}
