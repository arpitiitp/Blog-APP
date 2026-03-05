import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { axios, setToken, setUserData, userData, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    // Ensure axios.defaults.headers.common is handled correctly.
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    setUserData(null);
    localStorage.removeItem("user");
    navigate("/");
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
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{userData?.name || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{userData?.role || 'user'}</p>
            </div>
            <img
              src={userData?.image || assets.user_icon}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                <p className="text-sm font-semibold text-gray-800 truncate">{userData?.name || 'User'}</p>
                <p className="text-xs text-gray-500 capitalize">{userData?.role || 'user'}</p>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
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