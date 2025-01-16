const Joi = require("joi");

const validation = {};

validation.addEmployee = Joi.object().keys({
  name: Joi.string().required("Name required!"),
  age: Joi.number().required("Age required"),
  position: Joi.string().required("Position required"),
  department: Joi.string().required("Department required"),
  mail: Joi.string().email().required("Mail required"),
  mobileNumber: Joi.number().required("Mobile Number required"),
});

validation.updateEmployee = Joi.object().keys({
  name: Joi.string().optional().strict().messages({
    "string.base": "Name must be a string",
  }),
  age: Joi.number().optional().min(0).max(120).strict().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be at least 0",
    "number.max": "Age must not exceed 120",
  }),
  position: Joi.string().optional().strict().messages({
    "string.base": "Position must be a string",
  }),
  department: Joi.string().optional().strict().messages({
    "string.base": "Department must be a string",
  }),
  mail: Joi.string().email().optional().strict().messages({
    "string.email": "Invalid email format",
  }),
  mobileNumber: Joi.number().optional().min(0).strict().messages({
    "number.base": "Mobile number must be a number",
    "number.min": "Invalid mobile number",
  }),
});

validation.track = Joi.object().keys({
  url: Joi.string().strict().required("URL required!"),
  method: Joi.string().strict().required("Method required!"),
  request: Joi.string().allow(""),
  response: Joi.string().strict().required("Response required"),
  statusCode: Joi.number().strict().required("Status Code required"),
  status: Joi.string().strict().required("Status required"),
});

module.exports = validation;
