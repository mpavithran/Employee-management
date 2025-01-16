const express = require("express");
const router = express.Router();

const { validateBody } = require("../middleware/validation.middleware");

const employeesController = require("../controller/employees.controller");
const employeesValidation = require("../validation/employee.validation");

router.get("/employees", employeesController.getAllEmployees);
router.post(
  "/employees",
  validateBody(employeesValidation.addEmployee),
  employeesController.addEmployee
);
router.get("/employees/:id", employeesController.getEmployee);
router.put(
  "/employees/:id",
  validateBody(employeesValidation.updateEmployee),
  employeesController.updateEmployeeDetails
);
router.delete("/employees/:id", employeesController.deleteEmployee);

router.post(
  "/track",
  validateBody(employeesValidation.track),
  employeesController.apiTrackDetails
);

module.exports = router;
