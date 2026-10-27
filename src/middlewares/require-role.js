import { HttpError } from '../shared/http-error.js';

export function requireRole(...roles) {
  return function checkRole(req, res, next) {
    // authenticate a deja charge le compte : le role ne vient pas du body.
    if (!roles.includes(req.user.role)) {
      throw new HttpError(403, 'FORBIDDEN', 'Votre role ne permet pas cette action.');
    }

    // Continuer uniquement lorsque le role figure parmi les roles autorises.
    next();
  };
}
