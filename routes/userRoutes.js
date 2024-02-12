import express from "express";
import { testController } from "../controllers/userController.js";

const router = express.Router();

router.route("/abc").post(testController);

export default router;
