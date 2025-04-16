import express from "express";
import {
  getPlayers,
  getPlayerById,
  getPlayersByTeam,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "../controller/player.controller.js";

const router = express.Router();

router.get("/", getPlayers);
router.get("/team/:team_id", getPlayersByTeam);
router.get("/:id", getPlayerById);
router.post("/", createPlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
