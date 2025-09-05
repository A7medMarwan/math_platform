import { useParams, Link, useNavigate } from "react-router-dom";

export default function ومضات_تفاصيل() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const title = decodeURIComponent(slug || "").replace(/-/g, " ");

  return (
    <div className="container">
      <div className="d-flex gap-2 mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate(-1)}
        >
          العودة للقائمة
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          العودة للمشاريع
        </button>
      </div>
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">الرئيسية</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/ومضات-في-حل-المشكلات">ومضات في حل المشكلات</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <h1 className="mb-3">{title}</h1>
      <p className="text-muted">
        سيتم تحميل محتوى هذا القسم (PDFs) من Supabase لاحقاً.
      </p>
    </div>
  );
}
