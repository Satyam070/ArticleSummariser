import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const PublicRoute = ({ children }) => {
  const user = auth.currentUser;

  // If logged in, redirect to dashboard or home
  if (user) return <Navigate to="/" />;

  return children;
};

export default PublicRoute;
