import jwt from "jsonwebtoken";
import { catchError } from "../utils/index.js";
export const jwtAuthDuard = (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    if (!auth || !auth.startsWith("Bearer")) {
      return res.status(401).json({
        starusCode: 401,
        message: "authoriation error",
      });
    }

    const token = auth.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Token NOt founf",
      });
    }

    const decodeData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (!decodeData) {
      return res.status(401).json({
        statusCode: 401,
        message: "Token exipore",
      });
    }
    req.user = decodeData;
    next();
  } catch (error) {
    catchError(error, res);
  }
};
