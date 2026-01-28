import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets"; // ✅ Fix 1: import added

const Sidebar = () => {
  return (
    <div className="w-60 h-full border-r border-gray-200 bg-white p-4">
      {" "}
      {/* ✅ Fix 2: width and style */}
      <div className="flex flex-col gap-2">
        <NavLink
          end
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-5 rounded-md cursor-pointer transition ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""
            }`
          }
        >
          <img src={assets.home_icon} alt="home" className="min-w-4 w-5" />
          <p className="hidden md:inline-block">Dashboard</p>
        </NavLink>
        <NavLink
          to="/admin/addBlog"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-5 rounded-md cursor-pointer transition ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""
            }`
          }
        >
          <img src={assets.add_icon} alt="home" className="min-w-4 w-5" />
          <p className="hidden md:inline-block">Add blogs</p>
        </NavLink>

        <div className="flex flex-col gap-2">

          <NavLink
            to={"/admin/comments"}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] border border-black"
                : "flex items-center gap-3 font-medium px-3 py-2 bg-white border border-white hover:border-black transition-all"
            }
          >
            <img src={assets.email_icon} alt="" width={28} />
            <p className="max-sm:hidden">Comments</p>
          </NavLink>
        </div>

      </div>

      <div className="mt-auto mb-4 w-full px-4 sm:ml-6 ml-4">
        <NavLink
          to={"/"}
          className="flex items-center gap-3 font-medium px-3 py-2 bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-all rounded"
        >
          {/* You might want an icon here, using 'assets.arrow' or similar if appropriate, or just text */}
          <p className="max-sm:hidden">View Website</p>
        </NavLink>
      </div>
    </div >
  );
};

export default Sidebar;
