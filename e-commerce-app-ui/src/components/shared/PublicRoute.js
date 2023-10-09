import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      logout();
      alert("You have been logged out.");
    }
  }, [isAuthenticated, logout, navigate]);

  return children;
};
