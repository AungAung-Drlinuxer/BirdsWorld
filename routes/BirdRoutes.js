import express from 'express';
import {
  getAllBirds,
  createBird,
  getBirdById,
  updateBird,
  deleteBird,
} from '../controllers/BirdController.js';

const router = express.Router();

router.route("/").get(getAllBirds).post(createBird);
router.route("/:id").get(getBirdById).put(updateBird).delete(deleteBird);

export default router;