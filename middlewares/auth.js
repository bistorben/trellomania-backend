import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

export default verifyToken;
