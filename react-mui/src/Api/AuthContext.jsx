import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Instance } from "./Axios";

const AuthContext = createContext();

// Hook to get the AuthContext value

export const UseAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  const setAuthData = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLogIn(true);
    setUser(userData);
  };

  //create a helper function to clear data from local storage

  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogIn(false);
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const res = await Instance.post("api/register", userData);
      const { token, user } = res.data;
      setAuthData(token, user);
      navigate("/login");
      return { success: true, user };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const res = await Instance.post("api/login", credentials);
      const { token, user } = res.data;
      setAuthData(token, user);
      setIsLogIn(true);
      return { success: true, user };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await Instance.post("api/logout");
      clearAuthData();
      navigate("login");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const value = {
    isLogIn,
    user,
    register,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
