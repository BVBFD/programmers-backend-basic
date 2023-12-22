const express = require("express");
const {
  login,
  signUp,
  getUserByEmail,
  deleteUserById,
} = require("../handlers/users");
const router = express.Router();
const { body } = require("express-validator");
const { validateResults } = require("../middlewares/middlewares");

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email을 입력하자!")
      .isString()
      .withMessage("문자를 입력하자!")
      .isEmail()
      .withMessage("Email 형식이 유효하지 않습니다!"),
    body("password")
      .notEmpty()
      .withMessage("Password를 입력하자!")
      .isInt()
      .withMessage("숫자를 입력하자!"),
  ],
  validateResults,
  login
);

router.post(
  "/join",
  [
    body("email")
      .notEmpty()
      .withMessage("Email을 입력하자!")
      .isString()
      .withMessage("문자를 입력하자!")
      .isEmail()
      .withMessage("Email 형식이 유효하지 않습니다!"),
    body("password")
      .notEmpty()
      .withMessage("Password를 입력하자!")
      .isInt()
      .withMessage("숫자를 입력하자!"),
    body("name")
      .notEmpty()
      .withMessage("Name을 입력하자!")
      .isString()
      .withMessage("문자를 입력하자!"),
    body("contact")
      .notEmpty()
      .withMessage("Contact을 입력하자!")
      .isInt()
      .withMessage("숫자를 입력하자!"),
  ],
  validateResults,
  signUp
);

router.get(
  "/individual-inquiry",
  body("email")
    .notEmpty()
    .withMessage("Email을 입력하자!")
    .isString()
    .withMessage("문자를 입력하자!")
    .isEmail()
    .withMessage("Email 형식이 유효하지 않습니다!"),
  validateResults,
  getUserByEmail
);

router.delete(
  "/withdraw",
  body("email")
    .notEmpty()
    .withMessage("Email을 입력하자!")
    .isString()
    .withMessage("문자를 입력하자!")
    .isEmail()
    .withMessage("Email 형식이 유효하지 않습니다!"),
  validateResults,
  deleteUserById
);

module.exports = router;
