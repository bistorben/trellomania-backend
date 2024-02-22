const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  console.log(err.status);
  const status = err.status ?? 500;
  res.status(status).send({
    status,
    message: err.message,
    ...(err.field !== undefined && { field: err.field }),
    // wenn erster Bedingung zutrifft
    // ...false --> NICHTS
    // wenn zweite
    // ...{field: err.field} --> field: err.field
  });
};

export default errorHandler;
