import express from "express";
import { addUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(addUser);
router.route("/login").post(loginUser);

export default router;
