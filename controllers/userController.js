import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// addUser controller

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

//  login user controller

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      const err = new Error("Email or password is wrong");
      err.status = 401;
      throw err;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error("Email or password is wrong");
      err.status = 401;
      throw err;
    }

    const tokenPayload = {
      sub: user._id,
      userName: user.userName,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60,
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    res.send({ message: "Du bist eingeloggt!" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("access_token").send({ message: "Logged Out" });
  // res.send(req.cookies.access_token);
};

const secret = (req, res, next) => {
  res.send("Du darfst das nur lesen, wenn du eingeloggt bist");
};

export { addUser, loginUser, secret, logoutUser };
