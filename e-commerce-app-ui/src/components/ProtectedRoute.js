import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  login();

  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
