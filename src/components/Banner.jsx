import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import ministryLogo from "../Assets/Images/ministry.png";
import schoolLogo from "../Assets/Images/school-name.jpg";

export default function Banner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="py-3 brand-banner position-relative">
      <button
        className="btn btn-outline-light position-absolute top-0 start-0 m-2"
        onClick={handleLogout}
      >
        تسجيل الخروج
      </button>
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
        <div className="col-12 col-md-4 d-flex justify-content-center">
          {schoolLogo && (
            <img
              src={schoolLogo}
              alt="اسم المدرسة"
              className="img-fluid brand-logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
