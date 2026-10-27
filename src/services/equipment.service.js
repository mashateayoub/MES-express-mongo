import { equipmentRepository } from '../repositories/equipment.repository.js';
import { HttpError } from '../shared/http-error.js';

export async function createEquipment(input) {
  try {
    // Construire un nouvel objet limite aux champs metier attendus.
    // Le nettoyage evite des codes differents seulement par la casse ou les espaces.
    const data = {
      assetTag: input.assetTag.trim().toUpperCase(),
      name: input.name.trim(),
      category: input.category,
      dailyLateFeeCents: input.dailyLateFeeCents,
      // Un nouvel equipement est toujours actif, quelle que soit la demande cliente.
      isArchived: false,
    };

    // await permet aussi d'intercepter un rejet du repository dans le catch ci-dessous.
    return await equipmentRepository.create(data);
  } catch (error) {
    // L'index unique protege le code d'inventaire, meme entre demandes simultanees.
    // Seul son doublon devient un conflit metier ; les pannes restent des erreurs techniques.
    if (error.code === 11000 && error.keyPattern?.assetTag) {
      throw new HttpError(409, 'EQUIPMENT_ALREADY_EXISTS', 'Ce code existe deja.');
    }
    throw error;
  }
}
