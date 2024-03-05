import jwt from "jsonwebtoken";

// verify JSON WEB TOKEN (JWT)
const auth = (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.tokenPayload = payload;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

export default auth;
