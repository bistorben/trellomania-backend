import express from "express";
import {
  createBoard,
  getAllBoards,
  getBoardById,
  shareBoardWithUser,
} from "../controllers/boardController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(auth, createBoard);
router.route("/:userId").get(auth, getAllBoards);
// quick solution for presentation, needs to be changed....
router.route("/getname/:boardId").get(auth, getBoardById);
router.route("/share").patch(auth, shareBoardWithUser);

export default router;
