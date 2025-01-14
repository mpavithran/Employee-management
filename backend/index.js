const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
app.use(morgan("dev"));

app.use("/api/v1", require("./v1/router"));

app.use("/api", (req, res) => {
  return res.status(200).json({
    message: "API Working!",
  });
});

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "NOT_FOUND",
  });
});

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`server started at PORT ${PORT}`);
});
