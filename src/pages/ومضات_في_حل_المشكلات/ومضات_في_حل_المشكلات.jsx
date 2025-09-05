import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const items = [
  "امتحانات سابقة واجاباتها تليها",
  "مكتبة  ملتقى ومضات في حل المشكلات",
  "مكتبة من الفيديوهات والاعمال المميزة ل 15 مدرسة في المهارات الرياضية",
  "كنوز المهمات في مهارات الرياضيات",
  "فوازير رياضية رمضانية",
  "مسابقة دوري خوارزميات المحرق",
  "فيديوهات ابداعية للتدريب على حل المشكلات",
  "مبادرات متميزة للمدارس",
  "مهارة البحث عن حلول",
  "مهارة ايجاد طرق لحل المشكلات",
  "مهارة تحديد البيانات المتشابهة",
  "مهارة تحديد الخيارات واتخاذ القرارات",
  "مهارة استخلاص البيانات ذات العلاقة",
  "مهارة معالجة البيانات",
  "مهارة اختيار واستعمال النماذج",
  "اسالي سؤال في حل المشكلات ( المهارات الرياضية )",
];

export default function WomdatProblemSolving() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter((t) => t.toLowerCase().includes(q));
  }, [query]);

  const handleClearQuery = () => setQuery("");

  const renderHighlighted = (text) => {
    const currentQuery = query.trim();
    if (!currentQuery) return text;
    const parts = text.split(new RegExp(`(${currentQuery})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === currentQuery.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const getLinkForTitle = (title) => {
    const normalized = title.replace(/أ|إ|آ/g, "ا");
    if (/(اسال|اسالي|اسأل|اسإل)\s*سؤال/i.test(normalized)) {
      return "/منصة-اسأل-سؤال";
    }
    return `/ومضات-في-حل-المشكلات/${encodeURIComponent(
      title.replace(/\s+/g, "-")
    )}`;
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/")}
        >
          العودة للمشاريع
        </button>
      </div>
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h1 className="mb-5">ومضات في حل المشكلات</h1>
          <form
            className="row g-2 align-items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="col-12 col-lg-8">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="search"
                  className="form-control"
                  placeholder="ابحث في العناوين"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="حقل البحث"
                />
                {query && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleClearQuery}
                    aria-label="مسح البحث"
                  >
                    مسح
                  </button>
                )}
                <button type="submit" className="btn btn-primary text-white">
                  بحث
                </button>
              </div>
            </div>
            {/* Removed results count display per request */}
          </form>
        </div>
      </div>

      <ul className="list-group">
        {filtered.map((title) => (
          <li
            key={title}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center gap-3">
              <span
                className="badge text-bg-primary rounded-pill"
                style={{ minWidth: 40 }}
              >
                {items.indexOf(title) + 1}
              </span>
              <Link
                to={getLinkForTitle(title)}
                className="link-underline link-underline-opacity-0"
              >
                {renderHighlighted(title)}
              </Link>
            </div>
            <Link
              to={getLinkForTitle(title)}
              className="btn btn-primary btn-sm text-white"
            >
              فتح
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
