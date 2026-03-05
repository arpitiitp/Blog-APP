import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null); // in-memory only, never in localStorage
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Atomic helper: saves token to localStorage + state, keeps user in memory only.
  const saveAuth = (token, user) => {
    setToken(token);
    setUserData(user);
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = token;
  };

  // Clears all auth state. Removes token from localStorage. User data was never there.
  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate('/');
  };

  // On page reload: restore token from localStorage, then hit /api/auth/me once
  // to re-hydrate user profile in memory — no user data ever written to localStorage.
  useEffect(() => {
    fetchBlogs();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = storedToken;
      // Re-fetch user profile with the stored token (one lightweight DB call)
      axios.get("/api/auth/me")
        .then(({ data }) => {
          if (data.success) {
            setUserData(data.user);
          } else {
            // Token is invalid/expired — clear session
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        });
    }
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    userData,
    setUserData,
    saveAuth,
    logout,
    blogs,
    setBlogs,
    fetchBlogs,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
