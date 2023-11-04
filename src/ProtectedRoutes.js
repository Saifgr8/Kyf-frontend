import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isUserLoggedIn, redirectPath = "/login", children }) => {
  console.log("isUserLoggedIn", isUserLoggedIn);
  console.log("redirectPath", redirectPath);
  console.log("children", children);
  if (!isUserLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoutes;