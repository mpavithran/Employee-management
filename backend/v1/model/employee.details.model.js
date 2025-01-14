const Sequelize = require("sequelize");

const db = require("./index");

const Employee = db.define(
  "employeeDetails",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      field: "name",
      type: Sequelize.DataTypes.STRING,
    },
    age: {
      field: "age",
      type: Sequelize.DataTypes.INTEGER,
    },
    position: {
      field: "position",
      type: Sequelize.DataTypes.STRING,
    },
    department: {
      field: "department",
      type: Sequelize.DataTypes.STRING,
    },
    mailId: {
      field: "mail_id",
      type: Sequelize.DataTypes.STRING,
    },
    mobileNumber: {
      field: "mobile_number",
      type: Sequelize.DataTypes.STRING,
    },
    createdDatetime: {
      field: "created_datetime",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    editedDatetime: {
      field: "edited_datetime",
      type: Sequelize.DataTypes.DATE,
    },
    deletedDatetime: {
      field: "deleted_datetime",
      type: Sequelize.DataTypes.DATE,
    },
    status: {
      field: "status",
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    tableName: "employee_details",
    timestamps: false,
  }
);

module.exports = Employee;
