const handler = require("express-async-handler");
const Employee = require("../model/employee.details.model");

const controller = {};

controller.getAllEmployees = handler(async (req, res) => {
  return res.json({
    message: "getAllEmployees",
  });
});
controller.addEmployee = handler(async (req, res) => {
  return res.json({
    message: "addEmployee",
  });
});
controller.getEmployee = handler(async (req, res) => {
  return res.json({
    message: "getEmployee",
    query: req?.params?.id,
  });
});
controller.updateEmployeeDetails = handler(async (req, res) => {
  return res.json({
    message: "updateEmployeeDetails",
    query: req?.params?.id,
  });
});
controller.deleteEmployee = handler(async (req, res) => {
  return res.json({
    message: "deleteEmployee",
    query: req?.params?.id,
  });
});

module.exports = controller;
