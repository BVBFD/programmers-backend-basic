const express = require("express");
const {
  getAllChannel,
  makeNewChannel,
  deleteAllChannel,
  editChannelById,
  getChannelById,
  deleteChannelById,
} = require("../handlers/channels");
const { validateId } = require("../middlewares/middlewares");
const router = express.Router();

router
  .route("/")
  // 채널 전체 조회
  .get(getAllChannel)
  // 채널 개별 생성
  .post(makeNewChannel)
  // 채널 전체 삭제
  .delete(deleteAllChannel);

router
  .route("/:id")
  // 채널 개별 수정
  .put(validateId, editChannelById)
  // 채널 개별 조회
  .get(validateId, getChannelById)
  // 채널 개별 삭제
  .delete(validateId, deleteChannelById);

module.exports = router;
