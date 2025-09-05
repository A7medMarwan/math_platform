import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  fetchResourcesBySectionId,
  fetchSectionsByProjectId,
  uploadResourceToSection,
  deleteResourceById,
} from "../features/mathPlatform/mathPlatformSlice";
import AskQuestionPage from "./منصة_اسأل_سؤال/منصة_اسأل_سؤال";

export default function ResourceListPage() {
  const { projectId, sectionId } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentResources, loading, error, currentSections } = useSelector(
    (s) => s.mathPlatform
  );
  const { user } = useSelector((s) => s.auth);
  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    if (sectionId) {
      dispatch(fetchResourcesBySectionId(sectionId));
    }
  }, [dispatch, sectionId]);

  // Ensure we know the section title if state is missing
  useEffect(() => {
    if (
      !state?.sectionTitle &&
      projectId &&
      (!currentSections || currentSections.length === 0)
    ) {
      dispatch(fetchSectionsByProjectId(projectId));
    }
  }, [dispatch, state?.sectionTitle, projectId, currentSections]);

  const sectionTitle = useMemo(() => {
    if (state?.sectionTitle) return state.sectionTitle;
    const sid = isNaN(Number(sectionId)) ? sectionId : Number(sectionId);
    const found = currentSections?.find((sec) => sec.id === sid);
    return found?.title || "موارد القسم";
  }, [state?.sectionTitle, currentSections, sectionId]);

  const isAskQuestionSection = useMemo(() => {
    const normalized = (sectionTitle || "").replace(/أ|إ|آ/g, "ا");
    return /(اسال)\s*سؤال/.test(normalized);
  }, [sectionTitle]);

  if (isAskQuestionSection) {
    return (
      <div className="container">
        <div className="py-4 text-center">
          <h1 className="mb-4">{sectionTitle}</h1>
          <button
            className="btn btn-outline-primary mb-4"
            onClick={() => navigate(`/platform/${projectId}/sections`)}
          >
            العودة للأقسام
          </button>
        </div>
        <AskQuestionPage />
      </div>
    );
  }

  const normalizePublicUrl = (url) => {
    try {
      if (!url) return url;
      // If DB stored only a filename or relative key, build a public URL using uploads bucket and mapped folder
      if (!/^https?:\/\//i.test(url)) {
        const base = import.meta.env.VITE_SUPABASE_URL || "";
        const folder = folderForSection(sectionTitle);
        return `${base}/storage/v1/object/public/uploads/${folder}/${url}`;
      }
      const u = new URL(url);
      // Fix missing /public/ segment on public buckets
      if (
        u.pathname.includes("/storage/v1/object/") &&
        !u.pathname.includes("/storage/v1/object/public/")
      ) {
        u.pathname = u.pathname.replace(
          "/storage/v1/object/",
          "/storage/v1/object/public/"
        );
        return u.toString();
      }
      return url;
    } catch {
      return url;
    }
  };

  const renderResource = (resource) => {
    switch (resource.type) {
      case "pdf":
      case "video":
      case "pptx":
        return (
          <a
            href={normalizePublicUrl(resource.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-2"
          >
            فتح {resource.name}
          </a>
        );
      case "image":
        return (
          <img
            src={normalizePublicUrl(resource.url)}
            alt={resource.name}
            className="img-fluid rounded mt-2"
          />
        );
      default:
        return <p className="text-muted">نوع المورد غير مدعوم.</p>;
    }
  };

  const normalizeArabic = (text) =>
    (text || "")
      .replace(/أ|إ|آ/g, "ا")
      .replace(/[\u0660-\u0669\d]/g, "") // remove digits (Arabic/Latin)
      .replace(/\s+/g, " ")
      .trim();

  const folderForSection = (title) => {
    const t = normalizeArabic(title);
    const map = new Map([
      ["امتحانات سابقة واجاباتها", "wamdat-hall-almoshklat/exam-past-papers"],
      ["مكتبة ملتقى ومضات في حل المشكلات", "wamdat-hall-almoshklat/library"],
      [
        "مكتبة من الفيديوهات والاعمال المميزة ل مدرسة في المهارات الرياضية",
        "wamdat-hall-almoshklat/videos_projects_15_schools",
      ],
      [
        "كنوز المهمات في مهارات الرياضيات",
        "wamdat-hall-almoshklat/konoz-mohimat",
      ],
      ["فوازير رياضية رمضانية", "wamdat-hall-almoshklat/ramadan-puzzles"],
      [
        "مسابقة دوري خوارزميات المحرق",
        "wamdat-hall-almoshklat/algorithms-competition",
      ],
      [
        "فيديوهات ابداعية للتدريب على حل المشكلات",
        "wamdat-hall-almoshklat/creative-videos",
      ],
      ["مبادرات متميزة للمدارس", "wamdat-hall-almoshklat/schools-initiatives"],
      ["مهارة البحث عن حلول", "wamdat-hall-almoshklat/skill-search"],
      ["مهارة ايجاد طرق لحل المشكلات", "wamdat-hall-almoshklat/skill-methods"],
      [
        "مهارة تحديد البيانات المتشابهة",
        "wamdat-hall-almoshklat/skill-similar-data",
      ],
      [
        "مهارة تحديد الخيارات واتخاذ القرارات",
        "wamdat-hall-almoshklat/skill-options",
      ],
      [
        "مهارة استخلاص البيانات ذات العلاقة",
        "wamdat-hall-almoshklat/skill-related-data",
      ],
      ["مهارة معالجة البيانات", "wamdat-hall-almoshklat/skill-processing"],
      ["مهارة اختيار واستعمال النماذج", "wamdat-hall-almoshklat/skill-models"],
    ]);
    // Direct match
    if (map.has(t)) return map.get(t);
    // Fuzzy contains checks for slight differences
    for (const [k, v] of map.entries()) {
      if (t.includes(k)) return v;
    }
    return `${sectionId}`; // default per-section folder
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const name = file.name;
    const ext = name.split(".").pop()?.toLowerCase();
    const type = [
      "pdf",
      "pptx",
      "png",
      "jpg",
      "jpeg",
      "gif",
      "webp",
      "mp4",
      "mov",
    ].includes(ext)
      ? ext === "png" ||
        ext === "jpg" ||
        ext === "jpeg" ||
        ext === "gif" ||
        ext === "webp"
        ? "image"
        : ext === "mp4" || ext === "mov"
        ? "video"
        : ext
      : "file";
    const folder = folderForSection(sectionTitle);
    await dispatch(
      uploadResourceToSection({ sectionId, file, name, type, folder })
    );
    dispatch(fetchResourcesBySectionId(sectionId));
    e.target.value = "";
  };

  const handleDelete = async (resource) => {
    if (!window.confirm("هل تريد حذف هذا المورد؟")) return;
    await dispatch(
      deleteResourceById({ resourceId: resource.id, url: resource.url })
    );
  };

  if (loading) {
    return (
      <div className="container">
        <div className="py-4 text-center">
          <h1 className="mb-2">جاري تحميل الموارد...</h1>
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
          <p className="text-danger">حدث خطأ أثناء تحميل الموارد: {error}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            العودة للأقسام
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="py-4 text-center">
        <h1 className="mb-4">{sectionTitle}</h1>
        <button
          className="btn btn-outline-primary mb-4"
          onClick={() => navigate(`/platform/${projectId}/sections`)}
        >
          العودة للأقسام
        </button>
      </div>

      {isAdmin && (
        <div className="mb-4 d-flex justify-content-center gap-2">
          <label className="btn btn-primary mb-0">
            رفع مورد جديد
            <input
              type="file"
              accept="*/*"
              className="d-none"
              onChange={handleUpload}
            />
          </label>
        </div>
      )}

      {currentResources.length === 0 ? (
        <div className="text-center">
          <p className="text-dark">لا توجد موارد لهذا القسم بعد.</p>
        </div>
      ) : (
        <div className="row g-4">
          {currentResources.map((resource) => (
            <div className="col-12 col-sm-6 col-lg-4" key={resource.id}>
              <div className="card h-100 shadow-sm card-hover-effect">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2 text-primary-dark">
                    {resource.name}
                  </h5>
                  <p className="card-text text-primary-dark flex-grow-1">
                    {resource.type}
                  </p>
                  {renderResource(resource)}
                  {isAdmin && (
                    <button
                      className="btn btn-danger btn-sm mt-3"
                      onClick={() => handleDelete(resource)}
                    >
                      حذف
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
