const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const errors = err.array()[0];
    return res.status(400).json(errors);
  }

  if (req.params.id) {
    req.params.id = parseInt(req.params.id);
    const id = req.params.id;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "잘못된 형식의 params.id 입니다!!!" });
    }
  }

  return next();
};

module.exports = { validateResults };
