import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearError } from "../features/auth/authSlice";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "Muharraq.Math25@gmail.com",
    password: "Math2025",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === "admin") {
        navigate("/"); // Redirect admin to home page
      } else if (user.role === "user") {
        navigate("/");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <div className="text-center mb-4">
                <h2 className="card-title text-primary">تسجيل الدخول</h2>
                <p className="text-dark">منصة الرياضيات</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  <small>{error}</small>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label text-primary-dark"
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="username"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label text-primary-dark"
                  >
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      جاري تسجيل الدخول...
                    </>
                  ) : (
                    "تسجيل الدخول"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
