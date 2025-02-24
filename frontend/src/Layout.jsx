import React, { useEffect } from "react";

import { FaUsers } from "react-icons/fa6";
import { FaUser, FaChevronDown, FaChevronUp, FaUserPlus } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

import useStore from "@/hooks/useStore";
import useUser from "@/hooks/useUser";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  let location = useLocation();
  let pathname = location.pathname;

  const allowedPaths = ["/", "/add", "/signIn", "/signUp"];
  const layoutPaths = ["/signIn", "/signUp"];

  const { activeTab, setActiveTab } = useStore();
  const { userDetails } = useUser();

  useEffect(() => {
    if (!layoutPaths?.includes(pathname) && !userDetails?.userToken) {
      navigate("/signIn");
    }
  }, [userDetails]);

  return (
    <>
      {allowedPaths?.includes(pathname) ? (
        <>
          {!layoutPaths?.includes(pathname) ? (
            <div className="flex justify-start items-start w-[100vw] h-screen main">
              <div className="bg-[#2F2F2F] w-[20vw] h-screen p-4">
                <div className="flex items-center">
                  <FaUsers className="text-2xl" />
                  <h2 className="ml-2 font-bold">Emplyee Management</h2>
                </div>
                <div className="mt-10">
                  <div
                    className={`flex border ${
                      activeTab === "employeeDetail"
                        ? "bg-white text-black border-white"
                        : "border-[#2F2F2F]"
                    } hover:border-white mb-2 p-2 rounded-md cursor-pointer`}
                    onClick={() => {
                      setActiveTab("employeeDetail");
                      navigate("/");
                    }}
                  >
                    <FaUser className="text-xl mr-1" />
                    <p className="font-semibold">Employees Details</p>
                  </div>
                  <div
                    className={`flex p-2 border ${
                      activeTab === "addEmployee"
                        ? "bg-white text-black border-white"
                        : "border-transparent"
                    } hover:border-white rounded-md cursor-pointer`}
                    onClick={() => {
                      setActiveTab("addEmployee");
                      navigate("/add");
                    }}
                  >
                    <FaUserPlus className="text-xl mr-1" />
                    <p className="font-semibold">Add Employee</p>
                  </div>
                </div>
              </div>
              {children}
            </div>
          ) : (
            <>{children}</>
          )}
        </>
      ) : (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold">Sorry!!</h2>
          <p className="font-semibold">Page Not Found</p>
        </div>
      )}
    </>
  );
};

export default Layout;
