import { catchError } from "../utils/index.js";
export const SelfGuard = (req, res, next) => {
  try {
    const user = req?.user;
    if (user || user.role != "superadmin" || user?.id === req.params?.id) {
      next();
    } else {
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
