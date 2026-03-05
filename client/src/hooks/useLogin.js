import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

export const useLogin = () => {
    const { axios, saveAuth, navigate } = useAppContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginType, setLoginType] = useState("user"); // "user" or "admin"

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            // Determine the API endpoint based on the selected login type
            const endpoint = loginType === "admin" ? "/api/admin/login" : "/api/auth/login";

            const { data } = await axios.post(endpoint, { email, password });

            if (data.success) {
                saveAuth(data.token, data.user);
                navigate('/dashboard');
                toast.success(loginType === "admin" ? "Admin logged in successfully!" : "Logged in successfully!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const { data } = await axios.post("/api/auth/google", {
                token: credentialResponse.credential,
            });

            if (data.success) {
                saveAuth(data.token, data.user);
                navigate('/dashboard');
                toast.success("Logged in with Google!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Google Login Failed");
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loginType,
        setLoginType,
        handleLoginSubmit,
        handleGoogleLoginSuccess
    };
};
