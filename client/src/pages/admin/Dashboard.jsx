import React, { useEffect, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className='flex-1 p-6 md:p-10 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-bold text-gray-800 mb-8'>Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
        {/* Card 1: Blogs */}
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex items-center gap-5'>
          <div className='w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0'>
            <img src={assets.dashboard_icon_1} alt="blogs" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashboardData.blogs}</p>
            <p className='text-gray-500 font-medium'>Total Blogs</p>
          </div>
        </div>

        {/* Card 2: Comments */}
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex items-center gap-5'>
          <div className='w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center shrink-0'>
            <img src={assets.dashboard_icon_2} alt="comments" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashboardData.comments}</p>
            <p className='text-gray-500 font-medium'>Total Comments</p>
          </div>
        </div>

        {/* Card 3: Drafts */}
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex items-center gap-5'>
          <div className='w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center shrink-0'>
            <img src={assets.dashboard_icon_3} alt="drafts" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashboardData.drafts}</p>
            <p className='text-gray-500 font-medium'>Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Section */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='p-6 border-b border-gray-100 flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center'>
            <img src={assets.dashboard_icon_4} alt="" className="w-4 h-4" />
          </div>
          <h2 className='text-lg font-bold text-gray-800'>Latest Blogs</h2>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm text-gray-500'>
            <thead className='bg-gray-50 text-gray-600 uppercase text-xs'>
              <tr>
                <th scope='col' className='px-6 py-4 font-semibold'>#</th>
                <th scope='col' className='px-6 py-4 font-semibold'>Blog Title</th>
                <th scope='col' className='px-6 py-4 font-semibold max-sm:hidden'>Date</th>
                <th scope='col' className='px-6 py-4 font-semibold max-sm:hidden'>Status</th>
                <th scope='col' className='px-6 py-4 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetcBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
              {dashboardData.recentBlogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                    No recent blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
