// import React from 'react';
// import { CogIcon } from '@heroicons/react/24/outline';

// // --- Icon Imports ---
// // Using placeholder icons for now. In a real project, you'd use an icon library like react-icons.
// const DashboardIcon = () => <span>{'🏠'}</span>;
// const TailorIcon = () => <span>{'✂️'}</span>;
// const CustomersIcon = () => <span>{'👥'}</span>;
// const StaffIcon = () => <span>{'👨‍💼'}</span>;
// const OrdersIcon = () => <span>{'📦'}</span>;
// const InventoryIcon = () => <span>{'📝'}</span>;
// const PaymentsIcon = () => <span>{'💳'}</span>;
// const ReportsIcon = () => <span>{'📊'}</span>;

// // --- Type Definitions ---
// export type Role = "Admin" | "Staff" | "Customer";

// export interface NavLinkItem {
//   path: string;
//   label: string;
//   allowedRoles: Role[];
//   icon: React.ComponentType; // Each link will have an associated icon component
// }

// // --- Centralized Navigation Links Configuration ---
// export const navLinks: NavLinkItem[] = [
//   {
//     path: "/dashboard",
//     label: "Dashboard",
//     allowedRoles: ["Admin", "Staff", "Customer"],
//     icon: DashboardIcon,
//   },
//   {
//     path: "/tailor",
//     label: "Tailor",
//     allowedRoles: ["Admin", "Staff"],
//     icon: TailorIcon,
//   },
//   {
//     path: "/customers",
//     label: "Customers",
//     allowedRoles: ["Admin"],
//     icon: CustomersIcon,
//   },
//   {
//     path: "/staff",
//     label: "Staff",
//     allowedRoles: ["Admin"],
//     icon: StaffIcon,
//   },
//   {
//     path: "/orders",
//     label: "Orders",
//     allowedRoles: ["Admin", "Staff"],
//     icon: OrdersIcon,
//   },
//   {
//     path: "/inventory",
//     label: "Inventory",
//     allowedRoles: ["Admin", "Staff"],
//     icon: InventoryIcon,
//   },
//   {
//     path: "/payments",
//     label: "Payments",
//     allowedRoles: ["Admin", "Customer"],
//     icon: PaymentsIcon,
//   },
//   {
//     path: "/reports",
//     label: "Reports",
//     allowedRoles: ["Admin"],
//     icon: ReportsIcon,
//   },
//   {
//     path: "/settings",
//     label: "Settings",
//     allowedRoles: ["Admin", "Staff", "Customer"],
//     icon: CogIcon,
//   },
// ];
import { DashboardIcon, TailorIcon, CustomersIcon, StaffIcon, OrdersIcon, InventoryIcon, PaymentsIcon, ReportsIcon, SettingsIcon } from "../components/icons";

export type Role = "Admin" | "Staff" | "Customer";

export interface NavLinkItem {
  path: string;
  label: string;
  allowedRoles: Role[];
  icon: React.ComponentType;
}

export const navLinks: NavLinkItem[] = [
  { path: "/dashboard", label: "Dashboard", allowedRoles: ["Admin","Staff","Customer"], icon: DashboardIcon },
  { path: "/tailor", label: "Tailor", allowedRoles: ["Admin","Staff"], icon: TailorIcon },
  { path: "/customers", label: "Customers", allowedRoles: ["Admin"], icon: CustomersIcon },
  { path: "/staff", label: "Staff", allowedRoles: ["Admin"], icon: StaffIcon },
  { path: "/orders", label: "Orders", allowedRoles: ["Admin","Staff"], icon: OrdersIcon },
  { path: "/inventory", label: "Inventory", allowedRoles: ["Admin","Staff"], icon: InventoryIcon },
  { path: "/payments", label: "Payments", allowedRoles: ["Admin","Customer"], icon: PaymentsIcon },
  { path: "/reports", label: "Reports", allowedRoles: ["Admin"], icon: ReportsIcon },
  { path: "/settings", label: "Settings", allowedRoles: ["Admin","Staff","Customer"], icon: SettingsIcon },
];
