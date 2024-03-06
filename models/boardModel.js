import { Schema, model } from "mongoose";

const boardSchema = new Schema({
  title: String,
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
});

const BoardModel = model("Board", boardSchema);

export default BoardModel;
