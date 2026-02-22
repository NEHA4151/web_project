import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Portfolio from './components/Portfolio/Portfolio';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';
import AssetFlowchart from './components/AssetFlowchart/AssetFlowchart';
import SmartInsights from './components/SmartInsights/SmartInsights';
import Goals from './components/Goals/Goals';
import Analytics from './components/Analytics/Analytics';
import Investments from './components/Investments/Investments';
import Gamification from './components/Gamification/Gamification';
import Profile from './components/Profile/Profile';
import Auth from './components/Auth/Auth';
import './App.css';

// A wrapper component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

// A wrapper component for the main app layout
const AppLayout = ({ children }) => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Route */}
              <Route path="/auth" element={<Auth />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
              <Route path="/portfolio" element={<ProtectedRoute><AppLayout><Portfolio /></AppLayout></ProtectedRoute>} />
              <Route path="/expenses" element={<ProtectedRoute><AppLayout><ExpenseTracker /></AppLayout></ProtectedRoute>} />
              <Route path="/flowchart" element={<ProtectedRoute><AppLayout><AssetFlowchart /></AppLayout></ProtectedRoute>} />
              <Route path="/insights" element={<ProtectedRoute><AppLayout><SmartInsights /></AppLayout></ProtectedRoute>} />
              <Route path="/goals" element={<ProtectedRoute><AppLayout><Goals /></AppLayout></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><AppLayout><Analytics /></AppLayout></ProtectedRoute>} />
              <Route path="/investments" element={<ProtectedRoute><AppLayout><Investments /></AppLayout></ProtectedRoute>} />
              <Route path="/gamification" element={<ProtectedRoute><AppLayout><Gamification /></AppLayout></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><AppLayout><Profile /></AppLayout></ProtectedRoute>} />

              {/* Catch-all route to redirect back to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;

