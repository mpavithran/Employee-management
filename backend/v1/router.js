const express = require("express");
const router = express.Router();

const employeeRouter = require("./routes/employee.routes");

const { errorHandler } = require("./middleware/error.middleware");

router.use("/employee", employeeRouter);

router.use((err, req, res, next) => errorHandler(err, req, res));

router.use("*", (req, res) => {
  return res.status(404).json({
    message: "ROUTE_NOT_FOUND",
  });
});

module.exports = router;
