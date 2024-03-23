import ListModel from "../models/listModel.js";
import BoardModel from "../models/boardModel.js";
import CardModel from "../models/cardModel.js";

const getAllLists = async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const boardWithLists = await BoardModel.findById(boardId).populate({
      path: "lists",
      populate: {
        path: "cards",
      },
    });

    res.status(200).send(boardWithLists.lists);
  } catch (err) {
    next(err);
  }
};

const addList = async (req, res, next) => {
  const { title, boardId } = req.body;
  try {
    const list = await ListModel.create({ title });

    const board = await BoardModel.findByIdAndUpdate(
      boardId,
      { $push: { lists: list._id } },
      { new: true, safe: true, upsert: false }
    );

    if (!board) {
      const err = new Error("Board not found");
      err.status = 404;
      throw err;
    }

    res.status(201).send(list);
  } catch (err) {
    next(err);
  }
};

const deleteList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await ListModel.findByIdAndDelete(id);

    if (!list) {
      const err = new Error(`There is no list with the id: ${id}`);
      err.status = 404;
      throw err;
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export { getAllLists, addList, deleteList };
