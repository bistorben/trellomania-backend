import express from "express";
import { createBoard, getAllBoards } from "../controllers/boardController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(auth, getAllBoards).post(auth, createBoard);

export default router;
