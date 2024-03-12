import CardModel from "../models/cardModel.js";
import ListModel from "../models/listModel.js";

const createCard = async (req, res, next) => {
  const { title, listId } = req.body;
  try {
    const card = await CardModel.create({ title });
    const list = await ListModel.findByIdAndUpdate(
      listId,
      { $push: { cards: card._id } },
      { new: true, safe: true, upsert: false }
    );

    if (!list) {
      const err = new Error("List not found");
      err.status = 404;
      throw err;
    }

    res.status(201).send(card);
  } catch (err) {
    next(err);
  }
};

const getAllCards = async (req, res) => {
  const { listId } = req.params;
  try {
    const listsWithCards = await ListModel.findById(listId).populate("cards");
    res.status(200).send(listsWithCards.cards);
  } catch (err) {
    next(err);
  }
};

export { createCard, getAllCards };
