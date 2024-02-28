const createBoard = (req, res) => {
  const boardData = req.body;
  res.send(boardData);
};

export { createBoard };
