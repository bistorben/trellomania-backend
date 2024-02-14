import UserModel from "../models/userModel.js";

const addUser = async (req, res, next) => {
  const newUser = req.body;

  try {
    const user = await UserModel.create(newUser);
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export { addUser };
