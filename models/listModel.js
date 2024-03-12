import { Schema, model } from "mongoose";

const listSchema = new Schema({
  title: String,
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

const ListModel = model("List", listSchema);

export default ListModel;
