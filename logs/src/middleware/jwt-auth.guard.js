import jwt from 'jsonwebtoken';
import { catchError } from '../utils/INDEX.utils.js';
export const jwtAuthDuard = (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    if (!auth || !auth.startsWith('Bearer')) {
      return catchError(res, 401, 'Athorization error');
    }

    const token = auth.split(' ')[1];
    if (!token) {
      return catchError(res, 401, 'Token not found');
    }

    const decodeData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (!decodeData) {
      return catchError(res, 401, 'token expired');
    }
    req.user = decodeData;
    next();
  } catch (error) {
    return catchError(res, 500, error.message);
  }
};
