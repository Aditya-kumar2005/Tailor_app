import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

// --- Layout and Authentication ---
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// --- Page Components ---
// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

// Main App
import Dashboard from "./pages/Dashboard";
import CustomerList from "./pages/Customers/CustomerList";
import StaffList from "./pages/Staff/StaffList";
import OrderList from "./pages/Orders/OrderList";
import InventoryList from "./pages/Inventory/InventoryList";
import PaymentList from "./pages/Payments/PaymentList";
// import TailorDashboard from "./pages/Tailor/TailorDashboard";

// Reports
import ReportDashboard from "./pages/Reports/ReportDashboard";
import RevenueReport from "./pages/Reports/RevenueReport";
import OrderReport from "./pages/Reports/OrderReport";
import CustomerReport from "./pages/Reports/CustomerReport";
import StaffReport from "./pages/Reports/StaffReport";

// Settings
import Settings from "./pages/Settings/Settings";
import ProfileSettings from "./pages/Settings/ProfileSettings";
import SystemSettings from "./pages/Settings/SystemSettings";
import TailorList from "./pages/Tailor/TailorList";

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-red-100 ">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-16">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["Admin", "Staff", "Customer"]}><Dashboard /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute allowedRoles={["Admin"]}><CustomerList /></ProtectedRoute>} />
            <Route path="/staff" element={<ProtectedRoute allowedRoles={["Admin"]}><StaffList /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute allowedRoles={["Admin", "Staff"]}><OrderList /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute allowedRoles={["Admin", "Staff"]}><InventoryList /></ProtectedRoute>} />
            <Route path="/tailor" element={<ProtectedRoute allowedRoles={["Admin", "Staff"]}><TailorList /></ProtectedRoute>} />
            {/* <Route path="/tailor" element={<ProtectedRoute allowedRoles={["Admin", "Staff"]}><TailorDashboard /></ProtectedRoute>} /> */}
            <Route path="/payments" element={<ProtectedRoute allowedRoles={["Admin", "Customer"]}><PaymentList /></ProtectedRoute>} />
            
            <Route path="/reports" element={<ProtectedRoute allowedRoles={["Admin"]}><ReportDashboard /></ProtectedRoute>}>
              <Route path="revenue" element={<RevenueReport />} />
              <Route path="order" element={<OrderReport />} />
              <Route path="customer" element={<CustomerReport />} />
              <Route path="staff" element={<StaffReport />} />
            </Route>

            <Route path="/settings" element={<ProtectedRoute allowedRoles={["Admin", "Staff", "Customer"]}><Settings /></ProtectedRoute>}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="system" element={<ProtectedRoute allowedRoles={["Admin"]}><SystemSettings /></ProtectedRoute>} />
            </Route>
          </Route>

          <Route path="*" element={<div><h2>404 Not Found</h2></div>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
