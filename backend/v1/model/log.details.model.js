const Sequelize = require("sequelize");

const db = require("./index");

const LogDetails = db.define(
  "logDetails",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    activity: {
      field: "activity",
      type: Sequelize.DataTypes.TEXT,
    },
    type: {
      field: "type",
      type: Sequelize.DataTypes.STRING,
    },
    employeeId: {
      field: "employee_id",
      type: Sequelize.DataTypes.INTEGER,
    },
    editor: {
      field: "editor",
      type: Sequelize.DataTypes.STRING,
    },
    createdDatetime: {
      field: "created_datetime",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "log_details",
    timestamps: false,
  }
);

module.exports = LogDetails;
