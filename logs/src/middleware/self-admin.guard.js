import { catchError } from '../utils/INDEX.utils.js';
export const SelfGuard = (req, res, next) => {
  try {
    const user = req?.user;
    if (user || user.role != 'superadmin' || user?.id === req.params?.id) {
    } else {
      return catchError(res, 403, 'forbtten user');
    }
    next();
  } catch (error) {
    return catchError(res, 500, error.message);
  }
};
