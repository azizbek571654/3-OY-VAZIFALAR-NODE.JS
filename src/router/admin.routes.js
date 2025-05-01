import { Router } from "express";
import { AdminController } from "../controller/index.js"
import {jwtAuthDuard,SupperAdminGuard,SelfGuard,} from "../middleware/index.js";
import { logger } from "../logger.js";

const AdminRouter = Router();
const conteroller = new AdminController();

AdminRouter.post("/supperadmin", conteroller.createSupperAdmin)
  .post("/", jwtAuthDuard, SupperAdminGuard, conteroller.createAdmin)
  .post("/sigin", conteroller.siginAdmin)
  .post("/confim-signin", conteroller.confimSiginAdmin)
  .post("/signout", jwtAuthDuard, conteroller.signoutAdmin)
  .post("/token", conteroller.accessToken)
  .get("/", jwtAuthDuard, SupperAdminGuard, conteroller.getAllAdmins)
  .get("/:id", jwtAuthDuard, SelfGuard, conteroller.getAdminById)
  .patch("/:id", jwtAuthDuard, SelfGuard, conteroller.updateAdminById)
  .delete("/:id", jwtAuthDuard, SupperAdminGuard, conteroller.deleteAdminById);

export default AdminRouter;
