import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/userRoutes.js";

const server = express();
const PORT = 3000;

// middlewares

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

// routes

server.use("/user", userRouter);

server.listen(PORT, () => {
  console.log("server is running");
});
