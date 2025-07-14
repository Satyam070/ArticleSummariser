import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;

  // Not logged in
  if (!user) return <Navigate to="/login" />;

  // Logged in
  return children;
};

export default ProtectedRoute;
