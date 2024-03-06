import express from "express";
import { createBoard, getAllBoards } from "../controllers/boardController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(auth, createBoard);
router.route("/:userId").get(auth, getAllBoards);

export default router;
