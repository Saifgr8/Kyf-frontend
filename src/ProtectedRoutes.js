import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isUserLoggedIn, redirectPath = "/login", children }) => {
  if (!isUserLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoutes;