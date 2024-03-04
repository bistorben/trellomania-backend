import { Schema, model } from "mongoose";

const listSchema = new Schema({
  title: String,
});

const ListModel = model("List", listSchema);

export default ListModel;
