import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRouteAdmin = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  } else {
    if (user.type !== "Admin") {
      alert(
        "You are not authorised to view this page. Please login as an Admin. Redirecting to user dashboard..."
      );
      return <Navigate to="/dashboard" replace />;
    } else {
      return children;
    }
  }
};
