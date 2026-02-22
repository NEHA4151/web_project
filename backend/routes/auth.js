import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://web-project-pkg0.onrender.com";

  useEffect(() => {
    const storedUser = localStorage.getItem("finance-tracker-user");
    const storedToken = localStorage.getItem("finance-tracker-token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Invalid credentials",
        };
      }

      const sessionUser = data.user;

      setUser(sessionUser);

      localStorage.setItem(
        "finance-tracker-user",
        JSON.stringify(sessionUser)
      );

      localStorage.setItem("finance-tracker-token", data.token);

      return { success: true };

    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Server error" };
    }
  };

  // ✅ SIGNUP
  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Signup failed",
        };
      }

      return {
        success: true,
        message: data.message,
      };

    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("finance-tracker-user");
    localStorage.removeItem("finance-tracker-token");
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
