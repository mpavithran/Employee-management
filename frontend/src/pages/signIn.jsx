import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { API } from "@/utils/API";
import axios from "axios";
import helperUtils from "@/utils/helperUtils";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import useUser from "@/hooks/useUser";

const signIn = () => {
  const { setUserDetails } = useUser();
  const navigate = useNavigate();

  const [signInDone, setSignInDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userEmail: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&#]/,
          "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"
        ),
    }),
    onSubmit: async (e, { resetForm }) => {
      try {
        signIn(e, resetForm);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const signIn = async (e, resetForm) => {
    let url = API.HOST + API.SIGNIN;
    try {
      if (!e.userEmail) return toast.error("User Email Required");
      if (!e.password) return toast.error("Password Required");

      const { data } = await axios.post(url, e);
      if (data?.statusCode === 200) {
        setUserDetails(data?.data);
        let trackData = {
          url,
          method: "POST",
          request: JSON.stringify(e),
          response: JSON.stringify(data),
          statusCode: data?.statusCode,
          status: "SUCCESS",
        };

        helperUtils.track(trackData);
        setSignInDone(true);
        resetForm();
        navigate("/");
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
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <Toaster position="bottom-right" reverseOrder={false} />
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="mt-5 w-[500px]">
          <div className="w-[100%] h-[90px] flex flex-col mb-2">
            <div className="flex">
              <h1 className="text-md font-bold mb-2">User Email</h1>
            </div>

            <input
              onChange={(e) =>
                formik.setFieldValue("userEmail", e.target.value)
              }
              placeholder="Enter User Email"
              value={formik.values.userEmail}
              className="px-2 py-2"
              type="text"
            />
            {formik.touched.userEmail && formik.errors.userEmail && (
              <div className="text-sm" style={{ color: "red" }}>
                {formik.errors.userEmail}
              </div>
            )}
          </div>
          <div className="w-[100%] h-[90px] flex flex-col mb-2">
            <div className="flex">
              <h1 className="text-md font-bold mb-2">Password</h1>
            </div>
            <div className="w-[100%] relative">
              <input
                onChange={(e) =>
                  formik.setFieldValue("password", e.target.value)
                }
                placeholder="Enter Password"
                value={formik.values.password}
                className="w-full px-2 py-2"
                name="password"
                type={showPassword ? "text" : "password"}
              />
              <FaEye
                className={`${
                  showPassword && "hidden"
                } absolute top-3 right-4 cursor-pointer`}
                onClick={() => {
                  setShowPassword(true);
                }}
              />
              <FaEyeSlash
                className={`${
                  !showPassword && "hidden"
                } absolute top-3 right-4 cursor-pointer`}
                onClick={() => {
                  setShowPassword(false);
                }}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm" style={{ color: "red" }}>
                {formik.errors.password}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            !signInDone && formik.handleSubmit();
          }}
          className={`mt-5 bg-blue-800 hover:bg-blue-600 px-3 rounded-md font-semibold text-white text-sm py-1 ${
            signInDone ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default signIn;
