import { useAuth } from "../hooks/useAuth";

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    // user is authenticated
    logout();
  }

  return children;
};
