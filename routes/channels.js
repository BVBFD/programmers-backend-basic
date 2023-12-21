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
  .get(getAllChannel)
  .post(makeNewChannel)
  .delete(deleteAllChannel);

router
  .route("/:id")
  .put(validateId, editChannelById)
  .get(validateId, getChannelById)
  .delete(validateId, deleteChannelById);

module.exports = router;
