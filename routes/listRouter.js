import express from "express";
import {
  addList,
  deleteList,
  getAllLists,
  updateListOrder,
} from "../controllers/listController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(addList);
router.route("/:boardId").get(auth, getAllLists);
router.route("/:id").delete(auth, deleteList);
router.route("/order").patch(auth, updateListOrder);

export default router;
