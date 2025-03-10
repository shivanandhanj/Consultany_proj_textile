{/* Sidebar */}

import React, { useState ,useEffect} from 'react';
import {Link,useLocation} from 'react-router-dom'
import { 
    Bell, Settings, Search, Package, Users, DollarSign, 
    TrendingUp, ShoppingBag, Menu, X, Home, Activity, 
    FileText, BarChart2, LogOut
  } from 'lucide-react';
const Sidebar=()=>{
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);


  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY === 0) {
            setSidebarOpen(true); // Open when at the top
          } else {
            setSidebarOpen(false); // Close on scroll
          }// Close sidebar on scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]); // Runs when location (route) changes
    
    return (
<div className={`${sidebarOpen ? " w-54" : "w-20"}  bg-indigo-700 text-white transition-all duration-1`}>
<div className="p-4  flex  fixed items-center justify-between">
  {sidebarOpen && <h1 className="text-xl font-bold">Textile Admin</h1>}
  <button 
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="p-1 rounded-full hover:bg-indigo-600"
  >
    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
</div>

<nav className="mt-8 fixed top-10 left-0 h-screen ">
  <div className="px-4 mb-4">
  <Link to={"/admin"} >
    <div className={`flex items-center p-3 rounded-lg text-white ${
              location.pathname === "/admin"
                ? "bg-indigo-800"  // Active menu item style
                : "bg-indigo-700"
            }`}>
       
      <Home size={20} />
      {sidebarOpen && <span className="ml-4">Dashboard</span>}
     
    </div>
    </Link>
  </div>
  
  {[
    { icon: <ShoppingBag size={20} />, label: "Products" ,path: "/admin/products"},
    { icon: <Users size={20} />, label: "Customers" ,path: "/admin/customers"},
    { icon: <Package size={20} />, label: "Orders" ,path: "/admin/orders"},
    { icon: <Activity size={20} />, label: "Analytics" },
    { icon: <FileText size={20} />, label: "Inventory",path: "/admin/inventory" },
    { icon: <BarChart2 size={20} />, label: "Reports" },
    { icon: <Settings size={20} />, label: "Settings" },
  ].map((item, index) => (
    <div key={index} className="px-4 mb-4 ">
        <Link to={item.path}  >
      <div className={`flex items-center p-3 rounded-lg  cursor-pointer  ${
              location.pathname === item.path
                ? "bg-indigo-800"  // Active menu item style
                : "bg-indigo-700"
            }`}>

      
        {item.icon}
        
        {sidebarOpen && <span className="ml-4">{item.label}</span>}
      </div>
      </Link>
    </div>
  ))}
  
  <div className="px-4 mt-8">
    <div className="flex items-center p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
      <LogOut size={20} />
      {sidebarOpen && <span className="ml-4">Logout</span>}
    </div>
  </div>
</nav>
</div>
)};
export default Sidebar;