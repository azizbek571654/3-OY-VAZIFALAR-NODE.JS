import express from "express";
import {
  getTeams,
  getTeamById,
  getTeamsByTournament,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controller/team.controller.js";

const router = express.Router();

router.get("/", getTeams);
router.get("/tournament/:tournamentId", getTeamsByTournament);
router.get("/:id", getTeamById);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
