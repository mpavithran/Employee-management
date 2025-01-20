const Joi = require("joi");

const validation = {};

validation.userSignUp = Joi.object().keys({
  userName: Joi.string().required("User Name required"),
  userEmail: Joi.string().required("User Email required"),
  password: Joi.string().required("Password Required"),
});

module.exports = validation;
