const middleware = {};

middleware.validateBody = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    console.log(JSON.stringify(req.body, null, 2));
    console.log(
      JSON.stringify(
        error.details.map((each) => each.message),
        null,
        2
      )
    );
    res.status(422).json({
      statusCode: 422,
      status: "error",
      message: error.details.map((each) => each.message),
    });
  } else {
    req.body = value;
    next();
  }
};

module.exports = middleware;
