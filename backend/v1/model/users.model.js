const Sequelize = require("sequelize");

const db = require("./index");

const User = db.define(
  "users",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      field: "user_id",
      type: Sequelize.DataTypes.STRING,
    },
    userName: {
      field: "user_name",
      type: Sequelize.DataTypes.STRING,
    },
    userEmail: {
      field: "user_email",
      type: Sequelize.DataTypes.STRING,
    },
    password: {
      field: "password",
      type: Sequelize.DataTypes.STRING,
    },
    userToken: {
      field: "user_token",
      type: Sequelize.DataTypes.TEXT,
    },
    userType: {
      field: "user_type",
      type: Sequelize.DataTypes.STRING,
    },
    createdDatetime: {
      field: "created_datetime",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    status: {
      field: "status",
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
