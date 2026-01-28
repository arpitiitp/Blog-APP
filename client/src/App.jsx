import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Assuming this component exists
import Blog from "./pages/Blog"; // Assuming this component exists
import Layout from "./pages/admin/Layout"; // Assuming this component exists
import Dashboard from "./pages/admin/Dashboard"; // Assuming this component exists
import AddBlog from "./pages/admin/AddBlog"; // Assuming this component exists
import ListBlog from "./pages/admin/ListBlog"; // Assuming this component exists
import Comments from "./pages/admin/Comments"; // Assuming this component exists
import Login from "./components/admin/Login"; // Assuming this component exists
import "quill/dist/quill.snow.css"; // Styles for the rich text editor (e.g., React-Quill)
import { Toaster } from "react-hot-toast"; // Component to display toast notifications
import { useAppContext } from "./context/AppContext"; // Your custom context hook

/**
 * Main application component that sets up routing and global context.
 */
const App = () => {
  // Destructure 'token' and 'loading' from the application context.
  // 'token' is used for authentication checks.
  // 'loading' indicates if the initial authentication check/data fetch is complete.
  const { token, loading } = useAppContext(); 

  // Display a loading indicator or null while the app is initializing
  // and determining the authentication status.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-700">
        Loading Application...
      </div>
    ); // You can replace this with a more sophisticated loading spinner component
  }

  return (
    <div>
      {/* Toaster component from react-hot-toast to display notifications across the app */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Define application routes using React Router DOM's Routes and Route components */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/blog/:id" element={<Blog />} /> {/* Individual blog post page */}

        {/* Admin/Protected Routes */}
        {/* The /admin path conditionally renders Layout (if authenticated) or Login (if not).
            All nested routes within this Route are relative to "/admin". */}
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          {/* Index route for /admin: Renders Dashboard when the path is exactly "/admin" */}
          <Route index element={<Dashboard />} />
          {/* NEW: Explicit route for /admin/dashboard to match navigation */}
          <Route path="dashboard" element={<Dashboard />} />
          {/* Child routes for admin functionalities */}
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        {/* Optional: Catch-all route for 404 Not Found pages */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
