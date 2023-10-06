import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      logout();
    }

    return () => {};
  }, [children, isAuthenticated, logout]);

  return children;
};
