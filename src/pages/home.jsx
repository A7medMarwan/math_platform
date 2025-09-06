import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  addSection,
  deleteSection,
} from "../features/mathPlatform/mathPlatformSlice";
// Images used inside the shared Banner component
// import { logoutUser } from "../features/auth/authSlice";

// Fallback sections if database is not available
const fallbackSections = [
  {
    to: "/قوة-البدايات",
    title: "قوة البدايات",
    desc: "انطلاقة قوية نحو التعلم.",
  },
  {
    to: "/ومضات-في-حل-المشكلات",
    title: "ومضات في حل المشكلات",
    desc: "تفكير نقدي وإبداعي.",
  },
  {
    to: "/المعلم-المبدع-الصغير",
    title: "المعلم المبدع الصغير",
    desc: "تنمية مهارات التعليم.",
  },
  {
    to: "/خوارزميات-المحرق",
    title: "خوارزميات المحرق",
    desc: "خوارزميات وتفكير منطقي.",
  },
  {
    to: "/منصة-اسأل-سؤال",
    title: "منصة اسأل سؤال",
    desc: "اسأل وتعلّم من الإجابات.",
  },
  {
    to: "/نادي-التدريب",
    title: "نادي التدريب",
    desc: "تدريبات وممارسة مستمرة.",
  },
  {
    to: "/دانات-الرياضيات",
    title: "دانات الرياضيات",
    desc: "لآلئ من مفاهيم الرياضيات.",
  },
  {
    to: "/كنوز-الرياضيات",
    title: "كنوز الرياضيات",
    desc: "اكتشف جمال الرياضيات.",
  },
  { to: "/تكنوماث", title: "تكنوماث", desc: "تقنيات حديثة في الرياضيات." },
];

export default function HomePage() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { projects, loading, error } = useSelector(
    (state) => state.mathPlatform
  );
  const { user } = useSelector((state) => state.auth); // Get user from auth slice

  const isAdmin = user && user.role === "admin";

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSectionNameAr, setNewSectionNameAr] = useState("");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleAddSection = async () => {
    if (newSectionNameAr.trim()) {
      await dispatch(addSection({ name_ar: newSectionNameAr }));
      setShowAddModal(false);
      setNewSectionNameAr("");
      dispatch(fetchProjects()); // Refresh projects after adding
    }
  };

  const handleDeleteSection = async (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      await dispatch(deleteSection(id));
      dispatch(fetchProjects()); // Refresh projects after deleting
    }
  };

  // const handleLogout = async () => {
  //   await dispatch(logoutUser());
  //   navigate("/login");
  // };

  // Logout is handled in the shared Banner component

  // Use database projects if available, otherwise fallback to hardcoded sections
  const sections =
    projects.length > 0
      ? projects.map((project) => ({
          id: project.id, // Add id to section object
          to: `/platform/${project.id}/sections`,
          title: project.name_ar || "مشروع",
        }))
      : fallbackSections.map((section) => ({
          ...section,
          id: section.title.replace(/\s+/g, "-"),
        })); // Add dummy id for fallback

  if (loading) {
    return (
      <div className="container">
        <div className="py-4 text-center">
          <h1 className="mb-2">منصة الرياضيات</h1>
          <p className="text-muted">جاري تحميل المشاريع...</p>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.warn("Database error, using fallback data:", error);
  }

  return (
    <div className="container">
      {/* Banner component is rendered globally in App.jsx */}

      {/* Under-banner heading only */}
      <div className="text-center my-4">
        <h4 className="m-0 text-primary-dark">
          مرحباً بكم في منصة تجمع كل المشاريع.
        </h4>
      </div>

      {/* Removed duplicate page title; now only banner contains the title */}

      <div className="row g-4">
        {isAdmin && (
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100 shadow-sm d-flex align-items-center justify-content-center card-hover-effect">
              <button
                className="btn btn-primary d-flex flex-column align-items-center"
                onClick={() => setShowAddModal(true)}
              >
                <i className="bi bi-plus-circle-fill me-2 fs-4"></i>
                اضافة سكشن
              </button>
            </div>
          </div>
        )}
        {sections.map((s, index) => (
          <div className="col-12 col-sm-6 col-lg-4" key={s.to || index}>
            <div className="card h-100 shadow-sm card-hover-effect">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-2">{s.title}</h5>
                <p className="card-text text-muted flex-grow-1">{s.desc}</p>
                {s.title === "قوة البدايات" ? (
                  <a
                    href="https://educational-platform-two.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-2"
                  >
                    الدخول
                  </a>
                ) : (
                  <NavLink to={s.to} className="btn btn-primary mt-2">
                    الدخول
                  </NavLink>
                )}
                {isAdmin && (
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => handleDeleteSection(s.id)} // Assuming s.id exists for database sections
                  >
                    حذف
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Section Modal */}
      <div
        className={`modal fade ${showAddModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        aria-labelledby="addSectionModalLabel"
        aria-hidden={!showAddModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addSectionModalLabel">
                اضافة سكشن جديد
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowAddModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name_ar" className="form-label">
                  الاسم بالعربية
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name_ar"
                  value={newSectionNameAr}
                  onChange={(e) => setNewSectionNameAr(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setShowAddModal(false)}
              >
                إلغاء
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddSection}
              >
                اضافة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
