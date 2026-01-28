import React from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  // CORRECTED: Call useAppContext() to get the context object
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    // Ensure axios.defaults.headers.common is handled correctly.
    // Setting to null is fine, or you can delete the property: delete axios.defaults.headers.common['Authorization'];
    axios.defaults.headers.common["Authorization"] = null; 
    setToken(null); // Clear the token in global state
    navigate("/"); // Redirect to the home page
  };

  return (
    <>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <img
          src={assets.logo}
          alt="QuickBlog Logo"
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")} // Navigate home on logo click
        />
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/80 transition-all"
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        {/* The Sidebar component will be rendered here */}
        <Sidebar />
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;