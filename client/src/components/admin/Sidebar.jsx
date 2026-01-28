import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets"; // ✅ Fix 1: import added

const Sidebar = () => {
  return (
    <div className="w-60 h-full border-r border-gray-200 bg-white p-4">
      {" "}
      {/* ✅ Fix 2: width and style */}
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-5 rounded-md cursor-pointer transition ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.home_icon} alt="home" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-5 rounded-md cursor-pointer transition ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.add_icon} alt="home" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add blogs</p>
      </NavLink>

      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-5 rounded-md cursor-pointer transition ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.list_icon} alt="home" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Blog lists</p>
      </NavLink>

       <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-5 rounded-md cursor-pointer transition ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.comment_icon} alt="home" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
