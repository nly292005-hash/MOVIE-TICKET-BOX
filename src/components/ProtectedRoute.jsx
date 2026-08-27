import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth"; // Đường dẫn tới file auth của bạn

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isLoggedIn()) {
    // Nếu chưa đăng nhập, chuyển hướng sang /login và lưu lại đường dẫn cũ để đăng nhập xong quay lại
    return <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;