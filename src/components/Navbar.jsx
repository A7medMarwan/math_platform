import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        {isAuthenticated ? (
          <button className="btn btn-outline-light me-3" onClick={handleLogout}>
            تسجيل الخروج
          </button>
        ) : (
          <Link className="btn btn-outline-light me-3" to="/login">
            تسجيل الدخول
          </Link>
        )}

        <Link className="navbar-brand text-white mx-auto" to="/">
          منصة الرياضيات
        </Link>

        <div className="navbar-nav ms-auto">
          {isAuthenticated && (
            <Link className="nav-link text-white" to="/profile">
              <i className="bi bi-person-circle fs-4"></i> {/* Profile icon */}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
