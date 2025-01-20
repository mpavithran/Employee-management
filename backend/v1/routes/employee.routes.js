const express = require("express");
const router = express.Router();

const { validateBody } = require("../middleware/validation.middleware");
const { validateUser } = require("../utils/auth.utils");

const employeesController = require("../controller/employees.controller");
const employeesValidation = require("../validation/employee.validation");

router.get("/employees", validateUser, employeesController.getAllEmployees);
router.post(
  "/employees",
  validateUser,
  validateBody(employeesValidation.addEmployee),
  employeesController.addEmployee
);
router.get("/employees/:id", validateUser, employeesController.getEmployee);
router.put(
  "/employees/:id",
  validateUser,
  validateBody(employeesValidation.updateEmployee),
  employeesController.updateEmployeeDetails
);
router.delete(
  "/employees/:id",
  validateUser,
  employeesController.deleteEmployee
);

router.post(
  "/track",
  validateBody(employeesValidation.track),
  employeesController.apiTrackDetails
);

module.exports = router;
