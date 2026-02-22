import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We intentionally do NOT restore the session from local storage 
    // so that the user is forced to log in every time the app starts.
    /*
    const storedUser = localStorage.getItem('finance-tracker-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    */
    setLoading(false);
  }, []);

  // Helper to get all registered users
  const getUsersDb = () => {
    const db = localStorage.getItem('finance-tracker-users-db');
    return db ? JSON.parse(db) : [];
  };

  const login = (email, password) => {
    const users = getUsersDb();
    const existingUser = users.find(u => u.email === email && u.password === password);

    if (existingUser) {
      // Don't store password in active session state
      const sessionUser = { name: existingUser.name, email: existingUser.email };
      setUser(sessionUser);
      localStorage.setItem('finance-tracker-user', JSON.stringify(sessionUser));
      return { success: true };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
    const users = getUsersDb();

    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Account with this email already exists' };
    }

    // Add new user to "database"
    const newUser = { name, email: email, password };
    users.push(newUser);
    localStorage.setItem('finance-tracker-users-db', JSON.stringify(users));

    // We intentionally DO NOT log the user in here anymore.
    return { success: true, message: 'Account created successfully! Please log in.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('finance-tracker-user');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
