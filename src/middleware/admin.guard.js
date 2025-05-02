import { catchError } from '../utils/index.js';
export const AdminGuard = (req, res, next) => {
  try {
    const user = req?.user;
    console.log(user);

    if (!user || (user.role != 'admin' && user.role != 'superadmin')) {
      catchError(res, 403, 'forbitten');
    }
    next();
  } catch (error) {
    catchError(res, 500, error.message);
  }
};
