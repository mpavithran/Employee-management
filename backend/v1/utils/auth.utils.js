const jwt = require("jsonwebtoken");
const User = require("../model/users.model");
require("dotenv")?.config();

const utils = {};

utils.validateUser = async (req, res, next) => {
  const errResponse = {
    statusCode: 401,
    message: "Auth Failed",
  };

  try {
    if (req.headers["authorization"]?.split(" ")?.[1]) {
      const user = jwt.decode(req.headers["authorization"]?.split(" ")?.[1]);

      let verifyUser;
      try {
        verifyUser = jwt.verify(
          req.headers["authorization"]?.split(" ")?.[1],
          process?.env?.JWT_SECRET_KEY
        );
        console.log("Login UserId:", verifyUser?.userId);
      } catch (err) {
        console.log({
          decodeData: user ?? "",
          token: req?.headers["authorization"]?.split(" ")?.[1] ?? "",
          jwtError: err,
        });
        return res.status(401).json(errResponse);
      }

      if (!verifyUser?.userId) {
        return res.status(401).json(errResponse);
      }

      if (verifyUser?.userId !== user?.userId) {
        return res.status(401).json(errResponse);
      }

      if (!user?.userId) {
        return res.status(401).json(errResponse);
      }

      const data = await User.findOne({
        where: {
          userId: verifyUser?.userId,
        },
      });

      if (!data) {
        return res.status(401).json(errResponse);
      }

      req.user = {
        userId: verifyUser?.userId,
        userName: data?.userName,
        userEmail: data?.userEmail,
        userType: data?.userType,
        status: data?.status,
        userToken: req.headers["authorization"]?.split(" ")?.[1],
      };

      next();
    } else {
      return res.status(401).json(errResponse);
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json(errResponse);
  }
};

module.exports = utils;
