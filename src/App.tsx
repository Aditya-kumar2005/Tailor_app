import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import CustomerList from "./pages/Customers/CustomerList";
import OrderList from "./pages/Orders/OrderList";
import InventoryList from "./pages/Inventory/InventoryList";
import StaffList from "./pages/Staff/StaffList";
import PaymentList from "./pages/Payments/PaymentList";
import RevenueReport from "./pages/Reports/RevenueReport";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <div className="grid ">
        <div className="grid-rows-1"><Sidebar/></div>
        <div className="grid-rows-8">
      <Routes>
        {/* redirect base path to login for unauthenticated users */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Admin-only routes */}
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

        {/* Shared route */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["Admin", "Staff", "Customer"]}>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/reports/revenue" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <RevenueReport />
          </ProtectedRoute>
        } />
      </Routes>
      </div>
      </div>
    </Router>
  </Provider>
);

export default App;