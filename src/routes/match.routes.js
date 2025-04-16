import express from "express";
import {
  getMatches,
  getMatchById,
  getMatchesByTournament,
  getMatchesByTeam,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../controller/match.controller.js";

const router = express.Router();

router.get("/", getMatches);
router.get("/tournament/:tournamentId", getMatchesByTournament);
router.get("/team/:teamId", getMatchesByTeam);
router.get("/:id", getMatchById);
router.post("/", createMatch);
router.put("/:id", updateMatch);
router.delete("/:id", deleteMatch);

export default router;
