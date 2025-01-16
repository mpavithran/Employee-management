import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import useStore from "@/hooks/useStore";
import { API } from "@/utils/API";
import axios from "axios";
import helperUtils from "@/utils/helperUtils";

const EmployeeDetails = ({
  setShowAction,
  getEmployeeDetails,
  editData,
  employeeId,
}) => {
  const navigate = useNavigate();
  const { setActiveTab } = useStore();
  const formik = useFormik({
    initialValues: {
      name: editData?.name ?? "",
      age: editData?.age ?? "",
      position: editData?.position ?? "",
      department: editData?.department ?? "",
      mail: editData?.mailId ?? "",
      mobileNumber: editData?.mobileNumber ?? "",
    },
    // validationSchema: yup.object().shape({
    //   displayName: yup.string().required("Display Name is required"),
    //   userName: yup.string().required("User Name is required"),
    //   bio: yup.string().required("Bio is required"),
    //   phoneNumber: yup
    //     .number("Only Numbers Allowed")
    //     .required("Phone Number is required"),
    // }),
    onSubmit: async (e, { resetForm }) => {
      if (Object.keys(editData)?.length > 0) {
        editDetails(e, resetForm);
      } else {
        addDetails(e, resetForm);
      }
    },
  });

  const addDetails = async (e, resetForm) => {
    let url = API.HOST + API.EMPLOYEE_ROUTE;
    try {
      if (!e.name) return toast.error("Name Required");
      if (!e.age) return toast.error("Age Required");
      if (!e.position) return toast.error("Position Required");
      if (!e.department) return toast.error("Department Required");
      if (!e.mail) return toast.error("Mail Required");
      if (!e.mobileNumber) return toast.error("Mobile Number Required");

      const { data } = await axios.post(API.HOST + API.EMPLOYEE_ROUTE, e);
      if (data?.statusCode === 200) {
        toast.success(data?.data);
        resetForm();
        getEmployeeDetails();
        let trackData = {
          url,
          method: "POST",
          request: JSON.stringify(e),
          response: JSON.stringify(data),
          statusCode: data?.statusCode,
          status: "SUCCESS",
        };

        helperUtils.track(trackData);
        setShowAction(false);
      }
    } catch (err) {
      console.log(err);
      console.log(typeof err?.response?.data?.message === "object");
      if (
        typeof err?.response?.data?.message !== "object" &&
        err?.response?.data?.message !== ""
      ) {
        toast.error(err?.response?.data?.message);
      }
      if (err?.response?.data?.message?.length > 0) {
        err?.response?.data?.message?.map((e) => toast.error(e));
      }
      let trackData = {
        url: err?.request?.responseURL,
        method: err?.config?.method?.toUpperCase(),
        request: "",
        response: JSON.stringify(err?.request?.response),
        statusCode: err?.request?.status,
        status: "ERROR",
      };
      helperUtils.track(trackData);
    }
  };

  const editDetails = async (e, resetForm) => {
    let url = `${API.HOST + API.EMPLOYEE_ROUTE}/${employeeId}`;
    try {
      //   if (!e.name) return toast.error("Name Required");
      //   if (!e.age) return toast.error("Age Required");
      //   if (!e.position) return toast.error("Position Required");
      //   if (!e.department) return toast.error("Department Required");
      //   if (!e.mail) return toast.error("Mail Required");
      //   if (!e.mobileNumber) return toast.error("Mobile Number Required");

      const { data } = await axios.put(url, e);
      if (data?.statusCode === 200) {
        // toast.success(data?.data);
        resetForm();
        getEmployeeDetails();
        let trackData = {
          url,
          method: "PUT",
          request: JSON.stringify(e),
          response: JSON.stringify(data),
          statusCode: data?.statusCode,
          status: "SUCCESS",
        };

        helperUtils.track(trackData);
        setShowAction(false);
      }
    } catch (err) {
      console.log(err);
      console.log(typeof err?.response?.data?.message === "object");
      if (
        typeof err?.response?.data?.message !== "object" &&
        err?.response?.data?.message !== ""
      ) {
        toast.error(err?.response?.data?.message);
      }
      if (err?.response?.data?.message?.length > 0) {
        err?.response?.data?.message?.map((e) => toast.error(e));
      }
      let trackData = {
        url: err?.request?.responseURL,
        method: err?.config?.method?.toUpperCase(),
        request: "",
        response: JSON.stringify(err?.request?.response),
        statusCode: err?.request?.status,
        status: "ERROR",
      };
      helperUtils.track(trackData);
    }
  };

  return (
    <>
      <form className="w-[95%] ml-8 mt-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap gap-x-4 mt-5 w-full">
          <div className="w-1/3 flex flex-col">
            <div className="flex">
              <h1 className="text-md font-bold mb-2">Name</h1>
            </div>
            <input
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              value={formik.values.name}
              placeholder="Name"
              className="px-2 py-2"
              type="text"
            />
          </div>
          <div className="w-1/3 flex flex-col">
            <div className="flex">
              <h1 className="text-md font-bold mb-2">Age</h1>
            </div>
            <input
              onChange={(e) =>
                formik.setFieldValue("age", parseInt(e.target.value))
              }
              value={formik.values.age}
              placeholder="Age"
              className="px-2 py-2"
              type="number"
            />
          </div>
          <div className="mt-3 w-1/3 flex flex-col">
            <div className="flex">
              <h1 className="text-md font-bold mb-2">Position</h1>
            </div>
            <input
              onChange={(e) => formik.setFieldValue("position", e.target.value)}
              value={formik.values.position}
              placeholder="Position"
              className="px-2 py-2"
              type="text"
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="w-1/3 flex flex-col">
            <div className="flex">
              <h1 className="text-md font-bold mb-2">Department</h1>
            </div>

            <input
              onChange={(e) =>
                formik.setFieldValue("department", e.target.value)
              }
              placeholder="Department"
              value={formik.values.department}
              className="px-2 py-2"
              type="text"
            />
          </div>
          <div className="w-1/3 flex flex-col">
            <div className="flex">
              <h1 className="text-md font-bold mb-2">Mail</h1>
            </div>

            <input
              onChange={(e) => formik.setFieldValue("mail", e.target.value)}
              placeholder="Mail"
              value={formik.values.mail}
              className="px-2 py-2"
              type="text"
            />
          </div>
          <div className="w-1/3 flex flex-col">
            <div className="flex">
              <h1 className="text-md font-bold mb-2">Mobile Number</h1>
            </div>

            <input
              onChange={(e) =>
                formik.setFieldValue("mobileNumber", parseInt(e.target.value))
              }
              placeholder="Mobile Number"
              value={formik.values.mobileNumber}
              className="px-2 py-2"
              type="number"
            />
          </div>
        </div>

        <button
          onClick={() => {
            formik.handleSubmit();
          }}
          className="mt-5 bg-blue-800 hover:bg-blue-600 px-3 rounded-md font-semibold text-white text-sm py-1 cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default EmployeeDetails;
