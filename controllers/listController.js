import ListModel from "../models/listModel.js";
import BoardModel from "../models/boardModel.js";

const getAllLists = async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const boardWithLists = await BoardModel.findById(boardId).populate({
      path: "lists",
      populate: {
        path: "cards",
      },
    });

    boardWithLists.lists.sort((a, b) => a.order - b.order);

    res.status(200).send(boardWithLists.lists);
  } catch (err) {
    next(err);
  }
};

const addList = async (req, res, next) => {
  const { title, boardId } = req.body;
  console.log("body from add list", req.body);
  try {
    const highestOrderList = await ListModel.findOne({ boardId })
      .sort("-order")
      .exec();
    console.log("highOrder: ", highestOrderList);

    const order = highestOrderList ? highestOrderList.order + 1 : 0;

    const list = await ListModel.create({
      boardId,
      title,
      order,
    });

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

const updateListOrder = async (req, res, next) => {
  const { boardId, sourceList, destinationList } = req.body;
  try {
    const boardWithLists = await BoardModel.findById(boardId).populate(
      "lists",
      "order"
    );
    const destinationL = boardWithLists.lists.find(
      (list) => list.order === destinationList.oldOrder
    );

    if (!destinationL) {
      const err = new Error("List not found");
      err.status = 404;
      throw err;
    }

    destinationL.order = destinationList.newOrder;
    await destinationL.save();

    await ListModel.findByIdAndUpdate(sourceList.sourceListId, {
      order: sourceList.newOrder,
    });
  } catch (err) {
    next(err);
  }
  res.send(req.body);
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

export { getAllLists, addList, deleteList, updateListOrder };
