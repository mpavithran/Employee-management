const utils = {};

utils.successResponse = (data) => {
  return {
    statusCode: 200,
    message: "success",
    data,
  };
};

utils.errorResponse = (error) => {
  return {
    status: "error",
    statusCode: 500,
    message: error.message || "Internal Server Error",
    error: error.stack || null,
  };
};

module.exports = utils;
