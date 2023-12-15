// params.id 숫자 유효성 검사 미들웨어
function validateId(req, res, next) {
  req.params.id = parseInt(req.params.id);
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: "잘못된 형식의 ID 입니다!!!" });
  }

  next();
}

module.exports = { validateId };
