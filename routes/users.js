const express = require("express");
const {
  login,
  signUp,
  getUserByEmail,
  deleteUserById,
} = require("../handlers/users");
const router = express.Router();

router.post("/login", login);

router.post("/join", signUp);

router.get("/individual-inquiry", getUserByEmail);

router.delete("/withdraw", deleteUserById);

module.exports = router;
