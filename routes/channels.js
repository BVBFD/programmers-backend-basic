const express = require("express");
const {
  getAllChannel,
  makeNewChannel,
  deleteAllChannel,
  editChannelById,
  getChannelById,
  deleteChannelById,
} = require("../handlers/channels");
const { validateResults } = require("../middlewares/middlewares");
const router = express.Router();
const { body, param } = require("express-validator");

router
  .route("/")
  .get(
    body("userId")
      .notEmpty()
      .withMessage("userId를 입력하자!")
      .isInt()
      .withMessage("숫자를 입력하자!"),
    validateResults,
    getAllChannel
  )
  .post(
    [
      body("email")
        .notEmpty()
        .withMessage("Email을 입력하자!")
        .isString()
        .withMessage("문자를 입력하자!")
        .isEmail()
        .withMessage("Email 형식이 유효하지 않습니다!"),
      body("name")
        .notEmpty()
        .withMessage("Name을 입력하자!")
        .isString()
        .withMessage("문자를 입력하자!"),
    ],
    validateResults,
    makeNewChannel
  )
  .delete(deleteAllChannel);

router
  .route("/:id")
  .put(
    [
      param("id").notEmpty().withMessage("채널id 필요"),
      body("name")
        .notEmpty()
        .withMessage("채널명을 입력하자!")
        .isString()
        .withMessage("문자를 입력하자!"),
    ],
    validateResults,
    editChannelById
  )
  .get(
    param("id").notEmpty().withMessage("채널id 필요"),
    validateResults,
    getChannelById
  )
  .delete(
    param("id").notEmpty().withMessage("채널id 필요"),
    validateResults,
    deleteChannelById
  );

module.exports = router;
