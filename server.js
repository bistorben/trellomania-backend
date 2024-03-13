import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import boardRouter from "./routes/boardRouter.js";
import listRouter from "./routes/listRouter.js";
import cardRouter from "./routes/cardRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = 3000;

// MongoDB connection

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected with MongoDB"))
  .catch((error) => console.log(error, " - Database did not connected!"));

mongoose.connection.on("error", () => console.log("Database connection error"));

// for render deployment reasons:
// app.set("trust proxy", 1);

// middlewares

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT || "http://localhost:5173",
    credentials: true,
  })
);

// routes
// todo: change all routes to plural
app.use("/user", userRouter);
app.use("/board", boardRouter);
app.use("/list", listRouter);
app.use("/card", cardRouter);

// error handling middleware

app.use((req, res, next) => {
  const err = new Error("This endpoint does not exist");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is running");
});
