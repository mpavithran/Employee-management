const colour = require("colors");

const middleware = {};

middleware.errorHandler = async (err, req, res) => {
  if (err.message)
    console.log(colour?.brightRed?.bold("-".repeat(process.stdout.columns)));

  if (err) {
    if (req?.user?.userId)
      console.log(colour?.brightCyan?.bold(req?.user?.userId));
  }

  if (err.message) {
    if (Object.keys(req.body).length > 0)
      console.log(JSON.stringify(req.body, null, 2));
    console.log(
      colour?.brightRed?.bold(err.stack) +
        "\t" +
        colour?.brightRed?.bold(req.path)
    );
    res.status(500).json({ statusCode: 500, message: err.message });
  } else {
    console.log(
      colour?.yellow?.bold(err?.includes("|") ? err?.split("|")[1] : err) +
        "\t" +
        colour?.yellow?.bold(req.path)
    );
    res.status(err.includes("|") ? parseInt(err.split("|")[0]) : 500).json({
      statusCode: err.includes("|") ? parseInt(err.split("|")[0]) : 500,
      message: err.includes("|") ? err.split("|")[1] : err,
    });
  }
};

module.exports = middleware;
