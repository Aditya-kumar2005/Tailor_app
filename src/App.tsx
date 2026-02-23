import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css"; // Import styles
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import LoginStaff from "./pages/Auth/LoginStaff";
import LoginAdmin from "./pages/Auth/LoginAdmin";
import Register from "./pages/Auth/Register";
import RegisterStaff from "./pages/Auth/RegisterStaff";
import RegisterAdmin from "./pages/Auth/RegisterAdmin";
import Dashboard from "./pages/Dashboard";
import CustomerList from "./pages/Customers/CustomerList";
import OrderList from "./pages/Orders/OrderList";
import InventoryList from "./pages/Inventory/InventoryList";
import StaffList from "./pages/Staff/StaffList";
import PaymentList from "./pages/Payments/PaymentList";
import RevenueReport from "./pages/Reports/RevenueReport";
import TailorDashboard from "./pages/Tailor/TailorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import StaffReport from "./pages/Reports/StaffReport";
import CustomerReport from "./pages/Reports/CustomerReport";
import OrderReport from "./pages/Reports/OrderReport";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <div className="app-container">
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <Sidebar/>
          </div>
        <div className="content">
        <Link to="" className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "<-" : "->"}
        </Link>
      <Routes>
        {/* redirect base path to login for unauthenticated users */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Admin-only routes */}
        <Route path="/register-admin" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <RegisterAdmin />
          </ProtectedRoute>
        } />

        <Route path="/login-admin" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <LoginAdmin />
          </ProtectedRoute>
        } />

        <Route path="/customers" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <CustomerList />
          </ProtectedRoute>
        } />

        <Route path="/staff" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <StaffList />
          </ProtectedRoute>
        } />

        {/* Staff routes */}
          <Route path="/login-staff" element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <LoginStaff />
          </ProtectedRoute>
        } />

        <Route path="/register-staff" element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <RegisterStaff/>
          </ProtectedRoute>
        } />
        

        <Route path="/orders" element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <OrderList />
          </ProtectedRoute>
        } />

        <Route path="/inventory" element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <InventoryList />
          </ProtectedRoute>
        } />

        {/* Customer routes */}
        <Route path="/payments" element={
          <ProtectedRoute allowedRoles={["Admin", "Customer"]}>
            <PaymentList />
          </ProtectedRoute>
        } />

        <Route path="/tailor" element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <TailorDashboard />
          </ProtectedRoute>
        } />

        {/* Shared route */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["Admin", "Staff", "Customer"]}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/tailor" element={
          <ProtectedRoute allowedRoles={["Admin", "Staff", "Customer"]}>
            <TailorDashboard/>
          </ProtectedRoute>
        } />
        {/* duplicate /tailor route removed */}

        <Route path="/reports/revenue" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
             <div className="mt-30 grid grid-cols-2 gap-30">
            <RevenueReport />
            <OrderReport />
            <CustomerReport />
            <StaffReport />
            </div> 
          </ProtectedRoute>
        } />
      </Routes>
      </div>
      </div>
    </Router>
  </Provider>
  );
};

export default App;