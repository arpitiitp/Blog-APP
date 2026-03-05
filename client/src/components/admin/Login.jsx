import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginType,
    setLoginType,
    handleLoginSubmit,
    handleGoogleLoginSuccess
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 p-8 border border-gray-100 overflow-hidden relative">

        {/* Decorative Background blob */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Toggle Animation Container */}
          <div className="flex relative bg-gray-100/80 p-1.5 rounded-2xl mb-8">
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-white rounded-xl shadow-sm transition-transform duration-300 ease-in-out ${loginType === 'admin' ? 'translate-x-full' : 'translate-x-0'
                }`}
            ></div>

            <button
              onClick={() => setLoginType('user')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl relative z-10 transition-colors duration-300 ${loginType === 'user' ? 'text-purple-700' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              User Login
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl relative z-10 transition-colors duration-300 ${loginType === 'admin' ? 'text-purple-700' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Admin Login
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-purple-600 hover:text-purple-500">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-2"
            >
              Sign In
            </button>
          </form>

          {loginType === 'user' && (
            <div className="mt-8">
              <div className="relative flex items-center mb-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => toast.error("Google Login Failed")}
                  theme="outline"
                  shape="rectangular"
                  size="large"
                />
              </div>

              <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-purple-600 hover:text-purple-500 hover:underline transition-all">
                  Sign up for free
                </Link>
              </p>
            </div>
          )}

          {loginType === 'admin' && (
            <p className="mt-8 text-center text-sm text-gray-500 bg-purple-50 rounded-lg py-3">
              Authorized personnel only.
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;