import BoardModel from "../models/boardModel.js";

const createBoard = async (req, res, next) => {
  const boardData = req.body;
  try {
    const board = await BoardModel.create(boardData);
    res.status(201).send(board);
  } catch (err) {
    next(err);
  }
};

const getAllBoards = async (req, res, next) => {
  try {
    const boards = await BoardModel.find({});
    res.status(200).send(boards);
  } catch (err) {
    next(err);
  }
};

export { createBoard, getAllBoards };
