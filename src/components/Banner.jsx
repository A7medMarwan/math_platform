import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import ministryLogo from "../Assets/Images/ministry.png";
import schoolLogo from "../Assets/Images/school-name.jpg";

export default function Banner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="py-3 brand-banner position-relative">
      <div className="row g-3 align-items-center justify-content-center text-center px-2 py-2">
        <div className="col-12 col-md-4 d-flex justify-content-center">
          {ministryLogo && (
            <img
              src={ministryLogo}
              alt="شعار الوزارة"
              className="img-fluid brand-logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
          <h2 className="m-0 text-white">منصة الرياضيات</h2>
        </div>
        <div className="col-12 col-md-4 d-flex flex-column align-items-center justify-content-center">
          {schoolLogo && (
            <img
              src={schoolLogo}
              alt="اسم المدرسة"
              className="img-fluid brand-logo mb-2"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          {isAuthenticated ? (
            <button className="btn btn-outline-light" onClick={handleLogout}>
              تسجيل الخروج
            </button>
          ) : (
            <button className="btn btn-outline-light" onClick={handleLogin}>
              تسجيل الدخول
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
