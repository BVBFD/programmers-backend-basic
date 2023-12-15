// express 모듈 셋팅
const express = require("express");
const {
  login,
  signUp,
  getUserById,
  deleteUserById,
} = require("../handlers/users");
const router = express.Router();

// 로그인
router.post("/login", login);

// 회원가입
router.post("/join", signUp);

// 회원 개별 조회
router.get("/individual-inquiry", getUserById);

// 회원 개별 탈퇴
router.delete("/withdraw", deleteUserById);

module.exports = router;
