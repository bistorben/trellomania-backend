import { Schema, model } from "mongoose";

const listSchema = new Schema({
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  title: String,
  order: Number,
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

const ListModel = model("List", listSchema);

export default ListModel;
