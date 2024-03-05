import ListModel from "../models/listModel.js";

const getAllLists = async (req, res, next) => {
  try {
    const lists = await ListModel.find({});
    res.status(200).send(lists);
  } catch (err) {
    next(err);
  }
};

const addList = async (req, res, next) => {
  const listData = req.body;
  try {
    const list = await ListModel.create(listData);
    res.send(list);
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
