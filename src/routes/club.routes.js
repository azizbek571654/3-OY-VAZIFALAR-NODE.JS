import express from 'express';
import { getClubs, getClubById, createClub, updateClub, deleteClub } from '../controller/club.controller.js';

const router = express.Router();

router.get('/', getClubs);
router.get('/:id', getClubById);
router.post('/', createClub);
router.put('/:id', updateClub);
router.delete('/:id', deleteClub);

export default router;
