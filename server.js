import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const server = express();
const PORT = 3000;

// MongoDB connection

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected with MongoDB"))
  .catch((error) => console.log(error, " - Database did not connected!"));

mongoose.connection.on("error", () => console.log("Database connection error"));

// middlewares

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

// routes

server.use("/user", userRouter);

// error handling middleware

server.use((req, res, next) => {
  const err = new Error("This endpoint does not exist");
  err.status = 404;
  next(err);
});

server.use(errorHandler);

server.listen(PORT, () => {
  console.log("server is running");
});
