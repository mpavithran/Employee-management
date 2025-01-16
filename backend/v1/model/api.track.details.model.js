const Sequelize = require("sequelize");

const db = require("./index");

const ApiTrackDetails = db.define(
  "apiTrackDetails",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    url: {
      field: "url",
      type: Sequelize.DataTypes.STRING,
    },
    method: {
      field: "method",
      type: Sequelize.DataTypes.STRING,
    },
    request: {
      field: "request",
      type: Sequelize.DataTypes.TEXT,
    },
    response: {
      field: "response",
      type: Sequelize.DataTypes.TEXT,
    },
    statusCode: {
      field: "status_code",
      type: Sequelize.DataTypes.INTEGER,
    },
    status: {
      field: "status",
      type: Sequelize.DataTypes.STRING,
    },
    createdDatetime: {
      field: "created_datetime",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "api_track_details",
    timestamps: false,
  }
);

module.exports = ApiTrackDetails;
