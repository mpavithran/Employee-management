const mode = import.meta.env.VITE_MODE ?? "LOCAL";

export const API = {
  HOST: "",
  EMPLOYEE_ROUTE: "/api/v1/employee/employees",
  //   GET_ALL_EMPLOYEES: "/api/v1/employee/employees",
  //   ADD_EMPLOYEE: "/api/v1/employee/employees",
  //   GET_EMPLOYEE_DETAILS: "/api/v1/employee/employees",
  //   UPDATE_EMPLOYEE_DETAILS: "/api/v1/employee/employees",
  //   DELETE_EMPLOYEE: "/api/v1/employee/employees",
};

if (mode === "LOCAL") {
  API["HOST"] = "http://localhost:3001";
}
