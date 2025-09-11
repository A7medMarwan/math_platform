import React, { useState, useEffect } from "react";

const UploadModal = ({ show, onClose, onSubmit, subject }) => {
  const [studentName, setStudentName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [url, setUrl] = useState("");
  const [examNational, setExamNational] = useState(""); // For National Exams
  const [mathColumn, setMathColumn] = useState(""); // For Math 365+366

  useEffect(() => {
    if (!show) {
      // Reset form fields when modal closes
      setStudentName("");
      setSchoolName("");
      setLessonName("");
      setUrl("");
      setExamNational("");
      setMathColumn("");
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      "Student Name": studentName,
      "School Name": schoolName,
      url: url,
    };

    if (subject.table === "National Exams Lessons") {
      formData["Exam National"] = lessonName; // Use lessonName for Exam National field
    } else {
      formData["Lesson Name"] = lessonName; // Use Lesson Name for all other tables
    }

    if (subject.table === "Math 365+366") {
      formData["Math"] = mathColumn;
    }

    onSubmit(formData);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>رفع درس جديد لـ {subject.label}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="lessonName" className="form-label">
              اسم الدرس
            </label>
            <input
              type="text"
              className="form-control"
              id="lessonName"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">
              اسم الطالب
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="schoolName" className="form-label">
              اسم المدرسة
            </label>
            <input
              type="text"
              className="form-control"
              id="schoolName"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="url" className="form-label">
              رابط الدرس (URL)
            </label>
            <input
              type="url"
              className="form-control"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          {subject.table === "National Exams Lessons" && (
            <div className="mb-3">
              <label htmlFor="examNational" className="form-label">
                الامتحان الوطني
              </label>
              <input
                type="text"
                className="form-control"
                id="examNational"
                value={examNational}
                onChange={(e) => setExamNational(e.target.value)}
                required
              />
            </div>
          )}
          {subject.table === "Math 365+366" && (
            <div className="mb-3">
              <label htmlFor="mathColumn" className="form-label">
                الرياضيات
              </label>
              <input
                type="text"
                className="form-control"
                id="mathColumn"
                value={mathColumn}
                onChange={(e) => setMathColumn(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary me-2">
            رفع
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            إلغاء
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
