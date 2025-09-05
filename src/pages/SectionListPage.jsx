import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import {
  fetchSectionsByProjectId,
  addSectionToProject,
  deleteSectionFromProject,
} from "../features/mathPlatform/mathPlatformSlice";
import { useState } from "react"; // Import useState

export default function SectionListPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentSections, loading, error, projects } = useSelector(
    (state) => state.mathPlatform
  );
  const { user } = useSelector((state) => state.auth); // Get user from auth slice

  const isAdmin = user && user.role === "admin";

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  useEffect(() => {
    if (projectId) {
      dispatch(fetchSectionsByProjectId(projectId));
    }
  }, [dispatch, projectId]);

  const handleAddSection = async () => {
    if (newSectionTitle.trim()) {
      await dispatch(
        addSectionToProject({ projectId: projectId, title: newSectionTitle })
      );
      setShowAddModal(false);
      setNewSectionTitle("");
      dispatch(fetchSectionsByProjectId(projectId)); // Refresh sections after adding
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذا القسم؟")) {
      await dispatch(deleteSectionFromProject(sectionId));
      dispatch(fetchSectionsByProjectId(projectId)); // Refresh sections after deleting
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="py-4 text-center">
          <h1 className="mb-2">جاري تحميل الأقسام...</h1>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="py-4 text-center">
          <h1 className="mb-2">خطأ</h1>
          <p className="text-danger">حدث خطأ أثناء تحميل الأقسام: {error}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="py-4 text-center">
        <h1 className="mb-4">
          {(() => {
            const pid = isNaN(Number(projectId))
              ? projectId
              : Number(projectId);
            const project = projects?.find((p) => p.id === pid);
            return project?.name_ar || "أقسام المشروع";
          })()}
        </h1>
        <button
          className="btn btn-outline-primary mb-4"
          onClick={() => navigate("/")}
        >
          العودة للمشاريع
        </button>
      </div>

      {currentSections.length === 0 ? (
        <div className="text-center">
          <p className="text-dark">لا توجد أقسام لهذا المشروع بعد.</p>
        </div>
      ) : (
        <div className="row g-4">
          {isAdmin && (
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm d-flex align-items-center justify-content-center card-hover-effect">
                <button
                  className="btn btn-primary d-flex flex-column align-items-center"
                  onClick={() => setShowAddModal(true)}
                >
                  <i className="bi bi-plus-circle-fill me-2 fs-4"></i>
                  اضافة قسم
                </button>
              </div>
            </div>
          )}
          {currentSections.map((section) => (
            <div className="col-12 col-sm-6 col-lg-4" key={section.id}>
              <NavLink
                to={`/platform/${projectId}/sections/${section.id}/resources`}
                state={{ sectionTitle: section.title }}
                className="card h-100 shadow-sm card-hover-effect text-decoration-none text-dark"
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-3 d-flex align-items-center">
                    <i className="bi bi-folder me-2 text-primary"></i>
                    {section.title}
                  </h5>
                  {isAdmin && (
                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent NavLink navigation
                        e.stopPropagation(); // Stop event propagation
                        handleDeleteSection(section.id);
                      }}
                    >
                      حذف
                    </button>
                  )}
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      )}

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
                اضافة قسم جديد
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
                <label htmlFor="sectionTitle" className="form-label">
                  عنوان القسم
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sectionTitle"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
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
