import BoardModel from "../models/boardModel.js";
import UserModel from "../models/userModel.js";

const createBoard = async (req, res, next) => {
  // const boardData = req.body;
  const { title, userId } = req.body;
  try {
    const board = await BoardModel.create({ title });

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
