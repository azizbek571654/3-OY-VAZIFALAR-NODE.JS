import { catchError } from "../utils/index.js";
export const SupperAdminGuard = (req, res, next) => {
  try {
    const user = req?.user;
    if (!user || user.role != "superadmin") {
      return res.status(403).json({
        stattusCode: 403,
        message: "forbitten user",
      });
    }
    next();
  } catch (error) {
    catchError(error, res);
  }
};
