import jwt from "jsonwebtoken";
import { catchError } from "../utils/index.js";
export const jwtAuthDuard = (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    if (!auth || !auth.startsWith("Bearer")) {
      catchError(res, 401, "Aythorization error");
    }

    const token = auth.split(" ")[1];
    if (!token) {
      catchError(res, 401, "Token not found");
    }

    const decodeData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (!decodeData) {
      catchError(res, 401, "token expired");
    }
    req.user = decodeData;
    next();
  } catch (error) {
    catchError(res, 500, error.message);
  }
};
