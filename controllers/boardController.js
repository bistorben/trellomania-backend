import BoardModel from "../models/boardModel.js";
import UserModel from "../models/userModel.js";
import ListModel from "../models/listModel.js";

const createBoard = async (req, res, next) => {
  // const boardData = req.body;
  const { title, userId } = req.body;
  try {
    // there are better solutions for adding 3 standard lists - a todo for later
    const board = await BoardModel.create({
      title,
      lists: [],
    });

    const list1 = await ListModel.create({
      boardId: board._id,
      title: "todo",
      order: 0,
    });
    const list2 = await ListModel.create({
      boardId: board._id,
      title: "doing",
      order: 1,
    });
    const list3 = await ListModel.create({
      boardId: board._id,
      title: "done",
      order: 2,
    });

    board.lists.push(list1._id, list2._id, list3._id);

    await board.save();

    // const board = await BoardModel.create({
    //   title,
    //   lists: [list1._id, list2._id, list3._id],
    // });

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { boards: board._id } },
      { new: true, safe: true, upsert: false }
    );

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    res.status(201).send(board);
  } catch (err) {
    next(err);
  }
};

const getAllBoards = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userWithBoards = await UserModel.findById(userId).populate("boards");
    res.status(200).send(userWithBoards.boards);
  } catch (err) {
    next(err);
  }
};

export { createBoard, getAllBoards };
