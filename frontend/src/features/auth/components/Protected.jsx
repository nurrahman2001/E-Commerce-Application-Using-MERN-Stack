import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { Navigate, useLocation } from "react-router-dom";

export const Protected = ({ children, adminOnly = false }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const location = useLocation();

  // Redirect to login if trying to access cart or wishlist without being logged in
  const isAuthRequired = ["/cart", "/wishlist"].includes(location.pathname);
  if (!loggedInUser && isAuthRequired) {
    return <Navigate to="/login" replace />;
  }

  // If protecting an admin-only route
  if (adminOnly) {
    if (!loggedInUser) {
      return <Navigate to="/admin/login" replace />;
    }
  } else {
    // Regular user authentication check
    if (!loggedInUser?.isVerified) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};
