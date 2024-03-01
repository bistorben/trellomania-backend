import { Schema, model } from "mongoose";

const boardSchema = new Schema({
  title: String,
  userId: String,
});

const BoardModel = model("Board", boardSchema);

export default BoardModel;
