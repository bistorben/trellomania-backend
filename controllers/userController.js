import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const addUser = async (req, res, next) => {
  try {
    const registerData = req.body;

    // identify if registerData (userName or email) from Client is existing in database
    const existedUserName = await UserModel.findOne({
      userName: registerData.userName,
    });
    if (existedUserName) {
      const error = new Error("There is already a user with the user name");
      error.status = 400;
      throw error;
    }

    const existedUserEmail = await UserModel.findOne({
      email: registerData.email,
    });
    if (existedUserEmail) {
      const error = new Error(
        "There is already a user with the e-mail address"
      );
      error.status = 400;
      throw error;
    }

    // hash password to save new user data in data base
    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    // create user object to create/save mongo db instance
    const newUser = {
      ...registerData,
      password: hashedPassword,
    };

    const user = await UserModel.create(newUser);

    // create pojo to send basic information to client
    const userPojo = user.toObject();
    delete userPojo.password;
    res.status(201).send({
      userName: userPojo.userName,
      email: userPojo.email,
    });
  } catch (err) {
    console.log(err.message);
    console.log(err);
    next(err);
  }
};

export { addUser };
