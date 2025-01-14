const express = require("express");
const router = express.Router();

const { validateBody } = require("../middleware/validation.middleware");
const employeesController = require("../controller/employees.controller");

router.get("/employees", employeesController.getAllEmployees);
router.post("/employees", employeesController.addEmployee);
router.get("/employees/:id", employeesController.getEmployee);
router.put("/employees/:id", employeesController.updateEmployeeDetails);
router.delete("/employees/:id", employeesController.deleteEmployee);

module.exports = router;
