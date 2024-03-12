import { Schema, model } from "mongoose";

const cardSchema = new Schema({
  title: String,
});

const CardModel = model("Card", cardSchema);

export default CardModel;
