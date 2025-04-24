import { Router } from "express";
import { AdminController } from "../controller/Admin.controller.js"
import { jwtAuthDuard } from "../middleware/jwt-auth.guard.js";
import { SupperAdminGuard } from "../middleware/SupperAdmin.Guard.js";
import { SelfGuard } from "../middleware/self-admin.guard.js";

const router = Router();
const conteroller = new AdminController();

router
  .post("/supperadmin", conteroller.createSupperAdmin)
  .post("/", jwtAuthDuard, SupperAdminGuard, conteroller.createAdmin)
  .post("/sigin", conteroller.siginAdmin)
  .get("/", jwtAuthDuard, SupperAdminGuard, conteroller.getAllAdmins)
  .get("/:id", jwtAuthDuard, SelfGuard, conteroller.getAdminById)
  .patch("/:id", jwtAuthDuard, SelfGuard, conteroller.updateAdminById)
  .delete("/:id", jwtAuthDuard, SupperAdminGuard, conteroller.deleteAdminById);

export default router;
