import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import EmplyeeManagement from "@/pages/emplyeeManagement";
import AddEmployee from "@/pages/addEmployee";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EmplyeeManagement />} />
          <Route path="/add" element={<AddEmployee />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
