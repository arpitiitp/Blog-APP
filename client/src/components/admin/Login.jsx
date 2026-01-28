import React, { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast"; // Ensure react-hot-toast is installed: npm install react-hot-toast

const Login = () => {
  // Destructure necessary values from the AppContext
  const { axios, setToken, navigate } = useAppContext();

  // State variables for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    try {
      // Make a POST request to the admin login API endpoint
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      // Check if the login was successful based on the 'success' property in the response data
      if (data.success) {
        // If successful, set the token in the application's state
        setToken(data.token);
        // Store the token in local storage for persistence across sessions
        localStorage.setItem("token", data.token);
        // Set the Authorization header for all subsequent Axios requests
        axios.defaults.headers.common["Authorization"] = data.token;
        // Optionally, navigate to the admin dashboard or another protected route
        navigate('/admin/dashboard'); // Assuming you want to navigate after successful login
        toast.success("Logged in successfully!"); // Show success toast
      } else {
        // If login was not successful, display an error message from the backend
        toast.error(data.message);
      }
    } catch (error) {
      // Catch any network errors or other exceptions during the API call
      toast.error(error.message); // Display the error message
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post("/api/auth/google", {
        token: credentialResponse.credential,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        navigate('/admin/dashboard');
        toast.success("Logged in with Google!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm bg-white border border-purple-200 rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-1">
          <span className="text-purple-600">Admin</span> Login
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your credentials to access the admin panel
        </p>

        {/* Form for login */}
        {/* Corrected: Changed onSubmitHandler to handleSubmit */}
        <form onSubmit={handleSubmit} className="text-left space-y-5">
          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email} // Binds input value to email state
              onChange={(e) => setEmail(e.target.value)} // Updates email state on change
              placeholder="admin@example.com"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-500 text-gray-800 placeholder-gray-400 py-2"
              required // HTML5 validation for required field
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password} // Binds input value to password state
              onChange={(e) => setPassword(e.target.value)} // Updates password state on change
              placeholder="••••••••"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-500 text-gray-800 placeholder-gray-400 py-2"
              required // HTML5 validation for required field
            />
          </div>

          <button
            type="submit" // Specifies button type as submit
            className="w-full mt-2 bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 rounded-lg shadow-sm"
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                toast.error("Google Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;