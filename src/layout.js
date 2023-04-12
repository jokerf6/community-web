import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {
  const user = localStorage.getItem("Access Token");
  if (user) {
    const role = localStorage.getItem("role");
    if(role === "ADMIN"){
    return <Navigate to="/settings" />;
    }
    else{
    return <Navigate to="/login" />;

    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default Layout;
