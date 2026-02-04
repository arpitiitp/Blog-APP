import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className='w-64 h-full border-r border-gray-200 bg-white py-6 flex flex-col'>
      <div className='px-6 mb-8'>
        {/* Optional: Add Logo here if needed, or keep it clean */}
      </div>

      <div className='flex flex-col gap-2 px-4'>
        {[
          { to: '/admin', icon: assets.home_icon, label: 'Dashboard' },
          { to: '/admin/addBlog', icon: assets.add_icon, label: 'Add Blog' },
          { to: '/admin/comments', icon: assets.email_icon, label: 'Comments' },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 group ${isActive
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {/* Invert icon color for active state if they are black SVG icons, or use CSS filters. 
               Assuming icons are images, we might use brightness-0 invert for white text if needed, 
               or simply rely on the background. 
               For now, keeping it simple but creating a cleaner layout. 
           */}
            <img
              src={item.icon}
              alt={item.label}
              className={`w-5 h-5 object-contain transition-all ${
                // Optional: Add filter class here if you need to change icon color on active
                ''
                }`}
            />
            <p className='font-medium'>{item.label}</p>
          </NavLink>
        ))}
      </div>

      <div className='mt-auto px-4 mb-6'>
        <NavLink
          to='/'
          className='flex items-center gap-3 py-3 px-4 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300'
        >
          <p className='font-medium'>View Website</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
