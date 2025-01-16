const handler = require("express-async-handler");

const structureUtils = require("../utils/structure.utils");
const helperUtils = require("../utils/helper.utils");

const Employee = require("../model/employee.details.model");
const ApiTrackDetails = require("../model/api.track.details.model");

const controller = {};

controller.getAllEmployees = handler(async (req, res) => {
  const getAllEmployees = await Employee.findAll({
    where: {
      status: 1,
    },
  });

  const data = getAllEmployees?.map((each) => ({
    id: each?.id,
    name: each?.name,
    age: each?.age,
    position: each?.position,
    department: each?.department,
    mailId: helperUtils.decryptText(each?.mailId),
    mobileNumber: parseInt(helperUtils.decryptText(each?.mobileNumber)),
    createdDatetime: each?.createdDatetime,
    status: each?.status,
  }));

  return res.json(structureUtils.successResponse(data));
});

controller.addEmployee = handler(async (req, res) => {
  if (!req?.body?.name) throw "400|Name required";
  if (!req?.body?.age) throw "400|Age required";
  if (!req?.body?.position) throw "400|Position required";
  if (!req?.body?.department) throw "400|Department required";
  if (!req?.body?.mail) throw "400|Mail required";
  if (!req?.body?.mobileNumber) throw "400|Mobile Number required";

  encryptMail = helperUtils.encryptText(req?.body?.mail);
  encryptMobileNumber = helperUtils.encryptText(
    req?.body?.mobileNumber?.toString()
  );

  let data = {
    name: req?.body?.name,
    age: req?.body?.age,
    position: req?.body?.position,
    department: req?.body?.department,
    mailId: encryptMail,
    mobileNumber: encryptMobileNumber,
    createdDatetime: new Date(),
  };

  await Employee.create(data);

  let logData = {
    activity: JSON.stringify(data),
    type: "ADD_EMPLOYEE",
  };

  helperUtils.logDetails(logData);

  return res.json(
    structureUtils.successResponse("Employee Detail added successfully")
  );
});

controller.getEmployee = handler(async (req, res) => {
  if (!req?.params?.id) throw "400|Employee id required";

  const getEmployee = await Employee.findOne({
    where: {
      id: req?.params?.id,
      status: 1,
    },
  });

  if (Object.keys(getEmployee)?.length === 0) throw "401|Employee not found";

  const data = {
    id: getEmployee?.id,
    name: getEmployee?.name,
    age: getEmployee?.age,
    position: getEmployee?.position,
    department: getEmployee?.department,
    mailId: helperUtils.decryptText(getEmployee?.mailId),
    mobileNumber: parseInt(helperUtils.decryptText(getEmployee?.mobileNumber)),
    createdDatetime: getEmployee?.createdDatetime,
    status: getEmployee?.status,
  };
  return res.json(structureUtils.successResponse(data));
});

controller.updateEmployeeDetails = handler(async (req, res) => {
  if (!req?.params?.id) throw "400|Employee id required";

  const getEmployee = await Employee.findOne({
    where: {
      id: req?.params?.id,
      status: 1,
    },
  });
  if (!getEmployee) throw "404|Invalid employee id";

  let updateData = {
    ...req.body,
    ...(req.body.mail && { mailId: helperUtils.encryptText(req.body.mail) }),
    ...(req.body.mobileNumber && {
      mobileNumber: helperUtils.encryptText(req.body.mobileNumber.toString()),
    }),
  };

  await getEmployee.update(updateData, {
    where: {
      id: req?.params?.id,
      status: 1,
    },
  });

  const data = {
    id: getEmployee?.id,
    name: getEmployee?.name,
    age: getEmployee?.age,
    position: getEmployee?.position,
    department: getEmployee?.department,
    mailId: helperUtils.decryptText(getEmployee?.mailId),
    mobileNumber: parseInt(helperUtils.decryptText(getEmployee?.mobileNumber)),
    createdDatetime: getEmployee?.createdDatetime,
    status: getEmployee?.status,
  };

  let logData = {
    activity: JSON.stringify(data),
    type: "EDIT_EMPLOYEE",
  };

  helperUtils.logDetails(logData);

  return res.json(structureUtils.successResponse(data));
});

controller.deleteEmployee = handler(async (req, res) => {
  if (!req?.params?.id) throw "400|Employee id required";

  const getEmployee = await Employee.findOne({
    where: {
      id: req?.params?.id,
      status: 1,
    },
  });
  if (!getEmployee) throw "404|Invalid employee id";

  await getEmployee.update(
    {
      status: 0,
    },
    {
      where: {
        id: req?.params?.id,
        status: 1,
      },
    }
  );

  let logData = {
    activity: JSON.stringify({ id: req?.params?.id }),
    type: "DELETE_EMPLOYEE",
  };

  helperUtils.logDetails(logData);

  return res.json(
    structureUtils.successResponse("Employee Detail deleted successfully")
  );
});

controller.apiTrackDetails = handler(async (req, res) => {
  try {
    await ApiTrackDetails.create(req?.body);
    return res.json(structureUtils.successResponse("Tracking added"));
  } catch (error) {
    console.log(error);
  }
});

module.exports = controller;
