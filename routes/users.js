const express = require("express");
const router = express.Router();

// 회원가입
router.post("/join", (req, res, next) => {
  res.json("회원가입");
});

// 로그인
router.post("/login", (req, res, next) => {
  res.json("로그인");
});

// 비밀번호 초기화 요청
router.post("/reset", (req, res, next) => {
  res.json("비밀번호 초기화 요청");
});

// 비밀번호 초기화
router.put("/reset", (req, res, next) => {
  res.json("비밀번호 초기화");
});

module.exports = router;
