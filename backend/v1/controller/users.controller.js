const handler = require("express-async-handler");

const User = require("../model/users.model");

const helperUtils = require("../utils/helper.utils");
const structureUtils = require("../utils/structure.utils");
const constantUtils = require("../utils/constant.utils");

const controller = {};

controller.userSignUp = handler(async (req, res) => {
  if (!req?.body?.userName) throw "400|Username Required";
  if (!req?.body?.userEmail) throw "400|Useremail Required";
  if (!req?.body?.password) throw "400|Password Required";

  const ifExist = await User.count({
    where: {
      userEmail: req?.body?.userEmail,
    },
  });

  if (ifExist > 0) throw "400|User already exist";

  const userId = await helperUtils.generateRandomId(constantUtils?.ADMIN);

  const hashedPassword = await helperUtils.passwordHashing(req?.body?.password);

  const userToken = helperUtils.generateUserToken({
    userId,
    userEmail: req?.body?.userEmail,
    userType: constantUtils?.ADMIN,
  });

  let createData = {
    userId,
    userName: req?.body?.userName,
    userEmail: req?.body?.userEmail,
    password: hashedPassword,
    userToken,
    userType: constantUtils.ADMIN,
    status: constantUtils.ACTIVE,
  };

  const addedData = await User.create(createData);

  let data = {
    userId,
    userName: req?.body?.userName,
    userEmail: req?.body?.userEmail,
    userToken: userToken ?? "",
    userType: constantUtils?.ADMIN ?? "",
    createdDatetime: addedData?.createdTime,
    status: addedData?.status,
  };

  return res.json(structureUtils.successResponse(data));
});

controller.signIn = handler(async (req, res) => {
  if (!req?.body?.userEmail) throw "400|Useremail Required";
  if (!req?.body?.password) throw "400|Password Required";

  const userDetails = await User.findOne({
    where: {
      userEmail: req?.body?.userEmail,
    },
  });

  if (!userDetails) throw "400|Invalid Email";

  const comparePassword = await helperUtils.passwordCompare(
    req?.body?.password,
    userDetails?.password
  );

  if (!comparePassword) throw "400|Incorrect Password";

  let data = {
    userId: userDetails?.userId,
    userName: userDetails?.userName,
    userEmail: userDetails?.userEmail,
    createdDatetime: userDetails?.createdDatetime,
    userToken: userDetails?.userToken ?? "",
    userType: userDetails?.userType ?? "",
    status: userDetails?.status,
  };

  return res.json(structureUtils.successResponse(data));
});

module.exports = controller;
