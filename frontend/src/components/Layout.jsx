// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet /> {/* This renders the nested admin pages */}
      </main> </div>
  );
};

export default Layout;
