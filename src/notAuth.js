import { Navigate, Outlet } from "react-router-dom";

const NotAuth = () => {
  const user = localStorage.getItem("Access Token");
  if (user) {
    return <Navigate to="/room" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default NotAuth;
