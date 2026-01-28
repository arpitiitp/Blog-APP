import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const { axios, setToken } = useAppContext();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/auth/register", {
                name,
                email,
                password,
            });

            if (data.success) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                axios.defaults.headers.common["Authorization"] = data.token;
                navigate('/admin/dashboard');
                toast.success("Account created successfully!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm bg-white border border-purple-200 rounded-2xl shadow-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-1">
                    <span className="text-purple-600">Admin</span> Signup
                </h2>
                <p className="text-gray-600 mb-6">
                    Create an account to access the panel
                </p>
                <form onSubmit={handleSubmit} className="text-left space-y-5">
                    <div>
                        <label className="text-gray-700 font-medium block mb-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-500 text-gray-800 placeholder-gray-400 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-medium block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-500 text-gray-800 placeholder-gray-400 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-medium block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-500 text-gray-800 placeholder-gray-400 py-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 rounded-lg shadow-sm"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/admin" className="text-purple-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
