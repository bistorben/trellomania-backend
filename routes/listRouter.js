import express from "express";
import { addList, getAllLists } from "../controllers/listController.js";

const router = express.Router();

router.route("/").get(getAllLists).post(addList);

export default router;
