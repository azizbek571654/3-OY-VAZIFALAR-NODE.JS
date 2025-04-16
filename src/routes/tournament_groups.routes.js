import express from "express";
import {
  getTournamentGroups,
  getTournamentGroupById,
  getGroupsByTournament,
  createTournamentGroup,
  updateTournamentGroup,
  deleteTournamentGroup,
} from "../controller/tournament_groups.controller.js";

const router = express.Router();

router.get("/", getTournamentGroups);
router.get("/tournament/:tournament_id", getGroupsByTournament);
router.get("/:id", getTournamentGroupById);
router.post("/", createTournamentGroup);
router.put("/:id", updateTournamentGroup);
router.delete("/:id", deleteTournamentGroup);

export default router;