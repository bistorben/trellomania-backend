import express from "express";
import auth from "../middlewares/auth.js";
import { createCard, getAllCards } from "../controllers/cardContoller.js";

const router = express.Router();

router.route("/").post(auth, createCard);
router.route("/:listId").get(auth, getAllCards);

export default router;
