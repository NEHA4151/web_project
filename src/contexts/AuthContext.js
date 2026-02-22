import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://web-project-pkg0.onrender.com";

  useEffect(() => {
    const storedUser = localStorage.getItem("finance-tracker-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ LOGIN (Backend Connected)
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Invalid email or password",
        };
      }

      const sessionUser = {
        name: data.name,
        email: data.email,
      };

      setUser(sessionUser);
      localStorage.setItem(
        "finance-tracker-user",
        JSON.stringify(sessionUser)
      );

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Server error" };
    }
  };

  // ✅ SIGNUP (Backend Connected)
  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Signup failed",
        };
      }

      return {
        success: true,
        message: "Account created successfully! Please log in.",
      };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("finance-tracker-user");
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
