import express from "express";
import {
  addUser,
  loginUser,
  logoutUser,
  getAuthUser,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(addUser);
router.route("/login").post(loginUser);
router.route("/loggedin").get(auth, getAuthUser);
router.route("/logout").post(logoutUser);

export default router;
