const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  const status = err.status ?? 500;
  res.status(status).send({
    status,
    message: err.message,
  });
};

export default errorHandler;
