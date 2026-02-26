Got it 👍
Your logic, routing, roles, Redux, everything is **perfect** — we’ll **only change UI behavior**:

### 🎯 What we will do (NO logic change)

1. **Navbar fixed at top** ✅ (already almost done)
2. **Add a toggle button (☰) on left side of Navbar**
3. **Sidebar hidden by default**
4. **Click toggle → Sidebar slides in from left**
5. **Click again → Sidebar hides**
6. **Main content auto-adjusts**
7. **Fix small layout issues (padding, overlap)**

---

## ✅ Key Idea

* Sidebar visibility controlled from **MainLayout**
* Navbar gets a **toggle button**
* Sidebar becomes **fixed + animated**
* Content margin changes dynamically

---

## 1️⃣ Update `MainLayout.tsx` (MAIN CHANGE)

```tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="pt-16 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
```

---

## 2️⃣ Update `Navbar.tsx` (ADD TOGGLE BUTTON ONLY)

### 🔹 Change Props

```tsx
interface NavbarProps {
  toggleSidebar: () => void;
}
```

### 🔹 Update Component Signature

```tsx
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
```

### 🔹 Add Toggle Button (LEFT SIDE)

Replace **Logo section** with this:

```tsx
<div className="flex items-center gap-3">
  <button
    onClick={toggleSidebar}
    className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
  >
    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  <NavLink to="/dashboard" className="text-xl font-bold text-blue-600 font-serif">
    TailorFlow
  </NavLink>
</div>
```

### 🔹 Fix Navbar Position

Change `<nav>` class to:

```tsx
<nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-30 h-16">
```

✅ Navbar is now **fixed**

---

## 3️⃣ Update `Sidebar.tsx` (SLIDE + FIXED)

### 🔹 Update Props

```tsx
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
```

### 🔹 Update Component

```tsx
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
```

### 🔹 Replace `<aside>` with this:

```tsx
<aside
  className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 text-white p-4 z-40
  transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
>
```

### 🔹 Optional: Close sidebar on link click

Inside `NavLink`:

```tsx
<NavLink
  to={link.path}
  className={linkClassName}
  onClick={onClose}
>
```

---

## 4️⃣ Resulting Behavior ✅

✔ Navbar **always fixed at top**
✔ ☰ **Toggle button on left**
✔ Sidebar **slides in from left**
✔ Sidebar **overlays content on mobile**
✔ Content **pushes right on desktop**
✔ No Redux / Route / Role logic changed
✔ No errors introduced

---

## 🧠 Why this is correct architecture

* UI state lives in **layout**, not Redux
* Sidebar & Navbar remain **dumb components**
* Clean separation of concerns
* Easily extendable (overlay, backdrop, animations)

---

If you want next:

* ✅ Backdrop overlay on mobile
* ✅ Close sidebar on outside click
* ✅ Remember sidebar state (localStorage)
* ✅ Smooth Framer Motion animation

Just tell me 👍
