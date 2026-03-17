import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { userData } = useAppContext();
  const isAdmin = userData?.role === 'admin';
  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className={`absolute md:relative z-50 w-64 h-full border-r border-gray-200 bg-white py-6 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='px-6 mb-8 flex justify-between items-center md:hidden'>
          <span className="font-bold text-lg text-gray-800">Menu</span>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className='flex flex-col gap-2 px-4'>
          {[
            { to: '/dashboard', icon: assets.home_icon, label: isAdmin ? 'Admin Dashboard' : 'My Dashboard' },
            { to: '/dashboard/addBlog', icon: assets.add_icon, label: 'Add Blog' },
            { to: '/dashboard/listBlog', icon: assets.list_icon, label: isAdmin ? 'All Blogs' : 'My Blogs' },
            { to: '/dashboard/comments', icon: assets.email_icon, label: isAdmin ? 'All Comments' : 'My Comments' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 group ${isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`w-5 h-5 object-contain transition-all`}
              />
              <p className='font-medium'>{item.label}</p>
            </NavLink>
          ))}
        </div>

        <div className='mt-auto px-4 mb-6'>
          <NavLink
            to='/'
            onClick={() => setIsSidebarOpen(false)}
            className='flex items-center gap-3 py-3 px-4 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300'
          >
            <p className='font-medium'>View Website</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
