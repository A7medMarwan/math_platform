import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitQuestion,
  fetchUserQuestions,
} from "../../features/questions/questionsSlice";

export default function AskQuestionPage() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { userQuestions, loading } = useSelector((state) => state.questions);
  const [questionText, setQuestionText] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchUserQuestions(user.id));
    }
  }, [dispatch, isAuthenticated, user?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questionText.trim() && user?.id) {
      await dispatch(
        submitQuestion({
          userId: user.id,
          questionText,
          name: displayName.trim() || user?.email,
        })
      );
      setQuestionText(""); // Clear the input field
      setDisplayName("");
      dispatch(fetchUserQuestions(user.id)); // Refresh questions after submission
    }
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="mb-2">منصة اسأل سؤال</h1>
        <p className="text-muted">اطرح سؤالك وسيجيب عليه المختصون.</p>
      </div>

      {isAuthenticated ? (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title text-primary">اطرح سؤالاً جديداً</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="nameInput"
                  className="form-label text-primary-dark"
                >
                  الاسم
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="اكتب اسمك هنا ..."
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="questionInput"
                  className="form-label text-primary-dark"
                >
                  سؤالك
                </label>
                <textarea
                  className="form-control"
                  id="questionInput"
                  rows="4"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                  disabled={loading}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    جاري الإرسال...
                  </>
                ) : (
                  "إرسال السؤال"
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          يرجى تسجيل الدخول لطرح سؤال.
        </div>
      )}

      {/* Display User's Questions */}
      {isAuthenticated && userQuestions.length > 0 && (
        <div className="mt-5">
          <h2 className="text-primary mb-4">أسئلتي</h2>
          {userQuestions.map((q) => (
            <div className="card shadow-sm mb-3" key={q.id}>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-primary-dark">سؤالك:</h6>
                {q.name && (
                  <p className="text-muted small mb-1">الاسم: {q.name}</p>
                )}
                <p className="card-text mb-2">{q.question_text}</p>
                <p className="text-muted small mb-2">
                  تاريخ السؤال: {new Date(q.asked_at).toLocaleString()}
                </p>

                {q.is_answered && q.admin_answer ? (
                  <div className="mt-3 p-3 bg-light rounded">
                    <h6 className="text-primary-dark">إجابة الإدارة:</h6>
                    <p className="mb-0">{q.admin_answer}</p>
                    <p className="text-muted small mt-1">
                      تاريخ الإجابة: {new Date(q.answered_at).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-info mt-3">لم يتم الرد على سؤالك بعد.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAuthenticated && userQuestions.length === 0 && !loading && (
        <div className="alert alert-info text-center mt-5" role="alert">
          لم تطرح أي أسئلة بعد. اطرح سؤالك الأول!
        </div>
      )}
    </div>
  );
}
