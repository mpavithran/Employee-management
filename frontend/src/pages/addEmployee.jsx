import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useStore from "@/hooks/useStore";

import EmployeeDetails from "@/components/EmployeeDetails";

const AddEmployee = () => {
  const { setActiveTab } = useStore();

  useEffect(() => {
    setActiveTab("addEmployee");
  }, []);
  return (
    <div className="flex justify-start items-start w-[100vw] h-screen main">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="w-[80vw] p-4">
        <h2 className="ml-8 mb-10 font-bold text-xl">Add Employee</h2>
        <EmployeeDetails />
      </div>
    </div>
  );
};

export default AddEmployee;
