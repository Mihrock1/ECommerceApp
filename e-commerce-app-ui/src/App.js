import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Orders from "./components/users/Orders";
import Dashboard from "./components/users/Dashboard";
import Cart from "./components/users/Cart";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { PublicRoute } from "./components/PublicRoute";

function App() {
  const {
    user,
    jwtToken,
    isAuthenticated,
    setEmail,
    setPassword,
    login,
    logout,
  } = useAuth();

  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/registration"
              element={
                <PublicRoute>
                  <Registration />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard user={user} jwtToken={jwtToken} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart user={user} jwtToken={jwtToken} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myorders"
              element={
                <ProtectedRoute>
                  <Orders user={user} jwtToken={jwtToken} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
