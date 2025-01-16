import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import useStore from "@/hooks/useStore";
import { API } from "@/utils/API";
import helperUtils from "@/utils/helperUtils";

import { MdClose, MdEdit } from "react-icons/md";
import {
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaUserPlus,
  FaTrash,
} from "react-icons/fa";
import EmployeeDetails from "@/components/EmployeeDetails";

const EmplyeeManagement = () => {
  const { activeTab, setActiveTab } = useStore();

  const [showAction, setShowAction] = useState(false);
  const [emplyeeDetails, setEmplyeeDetails] = useState([]);
  const [editData, setEditData] = useState({});

  const getEmployeeDetails = async () => {
    let url = API.HOST + API.EMPLOYEE_ROUTE;
    try {
      const { data } = await axios.get(url, {});

      setEmplyeeDetails(data?.data);

      let trackData = {
        url,
        method: "GET",
        request: "",
        response: JSON.stringify(data),
        statusCode: data?.statusCode,
        status: "SUCCESS",
      };

      helperUtils.track(trackData);
    } catch (error) {
      let trackData = {
        url: error?.request?.responseURL,
        method: error?.config?.method?.toUpperCase(),
        request: "",
        response: JSON.stringify(error?.request?.response),
        statusCode: error?.request?.status,
        status: "ERROR",
      };

      helperUtils.track(trackData);
      console.log(error);
    }
  };

  const deleteEmployee = async (id) => {
    let url = `${API.HOST + API.EMPLOYEE_ROUTE}/${id}`;
    try {
      const { data } = await axios.delete(url, {});
      if (data?.statusCode === 200) {
        toast.success(data?.data);
        getEmployeeDetails();

        let trackData = {
          url,
          method: "DELETE",
          request: "",
          response: JSON.stringify(data),
          statusCode: data?.statusCode,
          status: "SUCCESS",
        };

        helperUtils.track(trackData);
      }
    } catch (error) {
      let trackData = {
        url: error?.request?.responseURL,
        method: error?.config?.method?.toUpperCase(),
        request: "",
        response: JSON.stringify(error?.request?.response),
        statusCode: error?.request?.status,
        status: "ERROR",
      };

      helperUtils.track(trackData);
      console.log(error);
    }
  };

  useEffect(() => {
    setActiveTab("employeeDetail");
    getEmployeeDetails();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-start items-start w-[100vw] h-screen main">
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="w-[80vw] p-4 h-[95%] overflow-scroll">
          <h2 className="ml-8 font-bold text-xl">Employees Details</h2>
          <table className="w-[95%] h-[100%] border-separate border-spacing-y-2 mt-10 text-center bg-[#2F2F2F] mx-auto rounded-lg">
            <thead>
              <tr className="">
                <td className="pl-4 py-2">No</td>
                <td className="px-4">Name</td>
                <td>Age</td>
                <td>Email</td>
                <td>Mobile Number</td>
                <td>Position</td>
                <td>Department</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="">
              {emplyeeDetails?.map((each, i) => (
                <tr
                  className={`hover:bg-[#565353] rounded-lg relative`}
                  key={each?.id}
                >
                  <td className="py-2">{i + 1}</td>
                  <td>{each?.name}</td>
                  <td>{each?.age}</td>
                  <td>{each?.mailId}</td>
                  <td>{each?.mobileNumber}</td>
                  <td>{each?.position}</td>
                  <td>{each?.department}</td>
                  <td className="relative">
                    <div className="flex justify-center items-center">
                      <MdEdit
                        className="mr-1 text-xl text-blue-500 cursor-pointer"
                        onClick={() => {
                          setEditData(each);
                          console.log(each);
                          setShowAction(true);
                        }}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => deleteEmployee(each?.id)}
                      />
                    </div>
                    {/* <div
                  className="flex justify-center items-center w-fit mx-auto border px-1 rounded-md cursor-pointer"
                  onClick={() => {
                    setShowAction(1);
                  }}
                >
                  <p>Action </p>
                  <FaChevronDown className="mt-1 ml-1 text-sm" />
                  <FaChevronUp className="mt-1 ml-1 text-sm" />
                </div> */}
                    {/* {showAction === 1 && (
                  <div className="absolute top-10 left-10 border w-[80px] rounded-md cursor-pointer">
                    <p className="border-b hover:bg-[#757575]">Edit</p>
                    <p className="hover:bg-[#757575]">Delete</p>
                  </div>
                )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAction && (
        <div className="fixed inset-0 z-30 h-screen w-[100vw] flex justify-center items-center">
          <div
            className="fixed inset-0 bg-black opacity-80"
            onClick={() => {
              setShowAction(false);
            }}
          ></div>
          <div className="flex flex-col w-[50vw] p-4 relative bg-[#2F2F2F] rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="ml-2 font-bold text-xl">Edit Employee</h2>
              <MdClose
                className="text-2xl cursor-pointer"
                onClick={() => setShowAction(false)}
              />
            </div>
            <EmployeeDetails
              setShowAction={setShowAction}
              getEmployeeDetails={getEmployeeDetails}
              editData={editData}
              employeeId={editData?.id}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EmplyeeManagement;
