import { useNavigate } from "react-router-dom";
import "./AlmoallemAlmobdeAlsagheer.css"; // Import the new CSS file

export default function AlmoallemAlmobdeAlsagheer() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="pt-5 text-center almoallem-alsagheer-header">
        <h1>المعلم المبدع الصغير</h1>
        <div className="almoallem-alsagheer-button-group d-flex flex-column flex-md-row justify-content-center align-items-center">
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline-primary mb-2 mb-md-0 me-md-3"
          >
            العودة للمشاريع
          </button>
          <button
            onClick={() => navigate("/مكتبة_المعلم_المبدع")}
            className="btn btn-primary mb-2"
          >
            مكتبة المعلم المبدع
          </button>
        </div>
      </div>

      {/* <CircularCarousel items={carouselItems} /> */}

      <div className="row d-flex flex-wrap mt-5">
        {" "}
        {/* Added mt-5 for spacing */}
        <div className="col-12 col-sm-6">
          <div className="almoallem-alsagheer-section">
            <h2>فريق العمل:</h2>
            <ul>
              <li>
                أ. منى عبد الحميد محمود - المعلمة الأولى لقسم الرياضيات بمدرسة
                المحرق الثانوية للبنات (منظّمة المسابقة)
              </li>
              <li>
                أ. آمنة محمد البوصي - المعلمة الأولى لقسم الرياضيات بمدرسة
                التضامن الثانوية للبنات (الدعم الفني والتقني في المكتبة الرقمية)
              </li>
              <li>
                أ. شيرين اسماعيل - معلمة رياضيات بمدرسة المحرق الثانوية للبنات
                (الدعم و المراجعة)
              </li>
              <li>
                أ. خلود يوسف المالود - المديرة المساعدة بمدرسة المحرق الثانوية
                للبنات (الإشراف والمتابعة)
              </li>
              <li>
                أ. فاطمة أحمد عيد - مديرة مدرسة المحرق الثانوية للبنات (الإشراف
                العام)
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="almoallem-alsagheer-section">
            <h2>من نحن؟</h2>
            <p>
              نحن مجموعة من التربويين المهتمين بإبراز الطلبة الموهوبين في
              الرياضيات، من خلال تشجعيهم على إنتاج محتويات رقمية تخدم الكفايات
              الأساسية للمقررات الرياضية في المرحلة الثانوية، ويتقمص فيها الطالب
              دور المعلم الصغير ليشرح فيها الهدف التعليمي ويعرض المحتوى بطريقة
              ابداعية ينمي فيها مهارات القرن الواحد والعشرين ويسهم في نطوره
              الشخصي ورفع إنجازه الأكاديمي، ويتم حصاد الأعمال المنتجة من مختلف
              المدارس الثانوية في هذه المكتبة الرقمية بهدف تبادل الخبرات ونشر
              الفائدة للجميع.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
