import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllQuestions,
  answerQuestion,
} from "../features/questions/questionsSlice";

export default function AdminQuestionManagementPage() {
  const dispatch = useDispatch();
  const { allQuestions, loading, error } = useSelector(
    (state) => state.questions
  );
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user && user.role === "admin";

  const [answerText, setAnswerText] = useState({}); // State to hold answers for each question

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchAllQuestions());
    }
  }, [dispatch, isAdmin]);

  const handleAnswerChange = (questionId, text) => {
    setAnswerText((prev) => ({ ...prev, [questionId]: text }));
  };

  const handleSubmitAnswer = async (questionId) => {
    if (answerText[questionId]?.trim()) {
      await dispatch(
        answerQuestion({ questionId, answerText: answerText[questionId] })
      );
      setAnswerText((prev) => ({ ...prev, [questionId]: "" })); // Clear answer after submission
      dispatch(fetchAllQuestions()); // Refresh questions after answering
    }
  };

  if (!isAdmin) {
    return (
      <div className="container py-4 text-center">
        <h1 className="text-danger">وصول غير مصرح به</h1>
        <p className="text-muted">ليس لديك صلاحيات الوصول إلى هذه الصفحة.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <h1 className="mb-2">جاري تحميل الأسئلة...</h1>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4 text-center">
        <h1 className="mb-2">خطأ</h1>
        <p className="text-danger">حدث خطأ أثناء تحميل الأسئلة: {error}</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="mb-2">إدارة الأسئلة</h1>
        <p className="text-muted">عرض والرد على أسئلة المستخدمين.</p>
      </div>

      {allQuestions.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          لا توجد أسئلة حالياً.
        </div>
      ) : (
        <div className="row g-4">
          {allQuestions.map((q) => (
            <div className="col-12" key={q.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    سؤال من: {q.name || "مستخدم غير معروف"}
                  </h5>
                  <p className="card-text">{q.question_text}</p>
                  <p className="text-muted small mb-2">
                    تاريخ السؤال: {new Date(q.asked_at).toLocaleString()}
                  </p>

                  {q.is_answered ? (
                    <div className="mt-3 p-3 bg-light rounded">
                      <h6 className="text-primary-dark">إجابة الإدارة:</h6>
                      <p className="mb-0">{q.admin_answer}</p>
                      <p className="text-muted small mt-1">
                        تاريخ الإجابة:{" "}
                        {new Date(q.answered_at).toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <h6 className="text-info">الرد على السؤال:</h6>
                      <textarea
                        className="form-control mb-2"
                        rows="3"
                        value={answerText[q.id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(q.id, e.target.value)
                        }
                        placeholder="اكتب إجابتك هنا..."
                        disabled={loading}
                      ></textarea>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleSubmitAnswer(q.id)}
                        disabled={loading || !answerText[q.id]?.trim()}
                      >
                        إرسال الإجابة
                      </button>
                    </div>
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
