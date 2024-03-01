import express from "express";
import { createBoard, getAllBoards } from "../controllers/boardController.js";

const router = express.Router();

router.route("/").get(getAllBoards).post(createBoard);

export default router;
