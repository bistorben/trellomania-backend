import express from "express";
import { createBoard } from "../controllers/boardController.js";

const router = express.Router();

router.route("/").post(createBoard);

export default router;
