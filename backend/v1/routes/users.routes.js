const express = require("express");
const router = express.Router();
const userController = require("../controller/users.controller");
const errorMiddleware = require("../middleware/error.middleware");

const { validateBody } = require("../middleware/validation.middleware");

const userValidation = require("../validation/user.validation");

router.post(
  "/signUp",
  validateBody(userValidation.userSignUp),
  userController.userSignUp
);
router.post("/signIn", userController.signIn);

module.exports = router;
