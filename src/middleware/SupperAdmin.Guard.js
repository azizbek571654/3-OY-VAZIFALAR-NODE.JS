import { catchError } from '../utils/index.js';
export const SupperAdminGuard = (req, res, next) => {
  try {
    const user = req?.user;
    if (!user || user.role != 'superadmin') {
      catchError(res, 403, 'forbitten');
    }
    next();
  } catch (error) {
    catchError(res, 500, error.message);
  }
};
