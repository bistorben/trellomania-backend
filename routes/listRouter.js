import express from "express";
import {
  addList,
  deleteList,
  getAllLists,
} from "../controllers/listController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(auth, getAllLists).post(auth, addList);
router.route("/:id").delete(auth, deleteList);

export default router;
