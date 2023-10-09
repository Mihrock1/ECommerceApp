import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import Orders from "./Orders";
import Dashboard from "../users/Dashboard";
import Cart from "../users/Cart";
import AdminDashboard from "../admin/AdminDashboard";
import AddProduct from "../admin/AddProduct";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { ProtectedRouteUser } from "./ProtectedRouteUser";
import { ProtectedRouteShared } from "./ProtectedRouteShared";
import { useAuth } from "../../hooks/useAuth";
import React from "react";
import UpdateProduct from "../admin/UpdateProduct";
import UpdateUser from "../users/UpdateUser";
import AddFunds from "../users/AddFunds";

function RouterPage() {
  const { user, jwtToken } = useAuth();

  return (
    <BrowserRouter>
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
            <ProtectedRouteUser>
              <Dashboard user={user} jwtToken={jwtToken} />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/updateuser"
          element={
            <ProtectedRouteUser>
              <UpdateUser jwtToken={jwtToken} />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/addfunds"
          element={
            <ProtectedRouteUser>
              <AddFunds jwtToken={jwtToken} />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRouteUser>
              <Cart jwtToken={jwtToken} />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/myorders"
          element={
            <ProtectedRouteShared>
              <Orders jwtToken={jwtToken} />
            </ProtectedRouteShared>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRouteAdmin>
              <AdminDashboard user={user} jwtToken={jwtToken} />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/addproduct"
          element={
            <ProtectedRouteAdmin>
              <AddProduct user={user} jwtToken={jwtToken} />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/updateproduct"
          element={
            <ProtectedRouteAdmin>
              <UpdateProduct user={user} jwtToken={jwtToken} />
            </ProtectedRouteAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterPage;
