let db = new Map();
let id = 1;

// 로그인
const login = (req, res) => {
  const { userId, pwd } = req.body;

  if (!userId || !pwd) {
    res.status(400).json({ message: "요청값 제대로 보내줘!!!" });
  }

  //   const user = Array.from(db.entries())
  //     .map(([userId, user]) => ({
  //       userId,
  //       name: user.name,
  //       pwd: user.pwd,
  //     }))
  //     .find((user) => user.userId === userId);

  const user = db.get(userId);

  if (user) {
    const validationPwd = user.pwd === pwd;
    validationPwd
      ? res.status(200).json({ message: "로그인 성공!!!", user })
      : res.status(400).json({ message: "잘못된 비밀번호!!!" });
  } else {
    res.status(404).json({ message: "존재하지 않는 유저!!!" });
  }
};

// 회원가입
const signUp = (req, res) => {
  const { userId, name, pwd } = req.body;

  if (!userId || !name || !pwd) {
    res.status(400).json({ message: "요청값 제대로 보내줘!!!" });
  }

  if (Array.from(db.values()).some((user) => user.name === name)) {
    res.status(401).json({ message: "이미 존재하는 사용자입니다!!" });
  } else {
    const user = { name, pwd };
    db.set(userId, user);
    id++;
    res.status(201).json({
      message: "회원가입이 되었습니다!!",
      user: { userId, name: user.name },
    });
  }
};

// 회원 개별 조회
const getUserById = (req, res) => {
  const { userId } = req.body;
  const user = db.get(userId);

  if (user) {
    res.status(200).json({
      message: `${user.name}이 조회되었습니다!!!`,
      user: { userId, name: user.name },
    });
  } else {
    res.status(404).json({ message: `사용자를 찾을 수 없습니다!!!` });
  }
};

// 회원 개별 탈퇴
const deleteUserById = (req, res) => {
  const { userId } = req.body;

  if (db.has(userId)) {
    db.delete(userId);
    res.status(200).json({
      message: `회원탈퇴가 완료되었습니다!!!`,
    });
  } else {
    res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }
};

module.exports = { login, signUp, getUserById, deleteUserById };
