import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRouteUser = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  } else {
    if (user.type !== "User") {
      alert(
        "You are not authorised to view this page. Please login as a User. Redirecting to admin dashboard..."
      );
      return <Navigate to="/admindashboard" replace />;
    } else {
      return children;
    }
  }
};
