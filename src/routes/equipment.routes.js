import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { requireRole } from '../middlewares/require-role.js';
import { validateCreateEquipment } from '../middlewares/validate-create-equipment.js';
import { create } from '../controllers/equipment.controller.js';
import { asyncHandler } from '../shared/async-handler.js';

export const equipmentRouter = Router();

// L'identite est verifiee avant les droits, puis les donnees sont validees.
// Le prefixe /api/equipments est deja monte dans app.js.
// L'adaptateur transmet les erreurs asynchrones au gestionnaire central.
equipmentRouter.post(
  '/',
  asyncHandler(authenticate),
  requireRole('admin'),
  validateCreateEquipment,
  asyncHandler(create),
);
