import { createEquipment } from '../services/equipment.service.js';

export async function create(req, res) {
  // Le middleware a selectionne et valide les champs autorises.
  // Le service porte les regles metier ; le controleur traduit le resultat en HTTP.
  const equipment = await createEquipment(req.validatedBody);
  res.status(201).json({ data: equipment });
}
