import { useEffect, useState } from "react";
import { supabase2 } from "../../lib/supabaseClient2";
import Carousel from "../../components/Carousel"; // Import the new Carousel component
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UploadModal from "../../components/UploadModal"; // Import the UploadModal component

export default function MaktabatAlmoallemAlmobde() {
  console.log("MaktabatAlmoallemAlmobde component rendered");
  const [math151Lessons, setMath151Lessons] = useState([]);
  const [math152Lessons, setMath152Lessons] = useState([]);
  const [math253Lessons, setMath253Lessons] = useState([]);
  const [math261Lessons, setMath261Lessons] = useState([]);
  const [math262Lessons, setMath262Lessons] = useState([]);
  const [math263Lessons, setMath263Lessons] = useState([]);
  const [math362Lessons, setMath362Lessons] = useState([]);
  const [math363And364Lessons, setMath363And364Lessons] = useState([]);
  const [math365And366Lessons, setMath365And366Lessons] = useState([]);
  const [nationalExamsLessons, setNationalExamsLessons] = useState([]);
  const [showSubjectSelection, setShowSubjectSelection] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const navigate = useNavigate(); // Initialize navigate

  const mathSubjects = [
    { label: "رياض 151", table: "Math 151" },
    { label: "رياض 152", table: "Math 152" },
    { label: "رياض 253", table: "Math 253" },
    { label: "رياض 261", table: "Math 261" },
    { label: "رياض 262", table: "Math 262" },
    { label: "رياض 263", table: "Math 263" },
    { label: "رياض 362", table: "Math 362" },
    { label: "رياض 363+364", table: "Math 363+364" },
    { label: "رياض 365+366", table: "Math 365+366" },
    { label: "الامتحانات الوطنية", table: "National Exams Lessons" },
  ];

  // Define fetch functions outside useEffect to make them accessible
  const fetchMath151Lessons = async () => {
    const { data, error } = await supabase2
      .from("Math 151")
      .select(`*, "Student Name", "School Name", "Lesson Name", url`);
    if (error) {
      console.error("Error fetching Math 151 lessons:", error.message);
    } else {
      setMath151Lessons(
        data.map((item) => ({
          text: item["Lesson Name"],
          imageUrl: item.url,
          studentName: item["Student Name"],
          schoolName: item["School Name"],
        }))
      );
    }
  };

  const fetchMath152Lessons = async () => {
    const { data, error } = await supabase2
      .from("Math 152")
      .select(`*, "Student Name", "School Name", "Lesson Name", url`);
    if (error) {
      console.error("Error fetching Math 152 lessons:", error.message);
    } else {
      setMath152Lessons(
        data.map((item) => ({
          text: item["Lesson Name"],
          imageUrl: item.url,
          studentName: item["Student Name"],
          schoolName: item["School Name"],
        }))
      );
    }
  };

  const fetchMath253Lessons = async () => {
    const { data, error } = await supabase2
      .from("Math 253")
      .select(`*, "Student Name", "School Name", "Lesson Name", url`);
    if (error) {
      console.error("Error fetching Math 253 lessons:", error.message);
    } else {
      setMath253Lessons(
        data.map((item) => ({
          text: item["Lesson Name"],
          imageUrl: item.url,
          studentName: item["Student Name"],
          schoolName: item["School Name"],
        }))
      );
    }
  };

  const fetchMath261Lessons = async () => {
    const { data, error } = await supabase2
      .from("Math 261")
      .select(`*, "Student Name", "School Name", "Lesson Name", url`);
    if (error) {
      console.error("Error fetching Math 261 lessons:", error.message);
    } else {
      setMath261Lessons(
        data.map((item) => ({
          text: item["Lesson Name"],
          imageUrl: item.url,
          studentName: item["Student Name"],
          schoolName: item["School Name"],
        }))
      );
    }
  };

  const fetchMath262Lessons = async () => {
    const { data, error } = await supabase2
      .from("Math 262")
      .select(`*, "Student Name", "School Name", "Lesson Name", url`);
    if (error) {
      console.error("Error fetching Math 262 lessons:", error.message);
    } else {
      setMath262Lessons(
        data.map((item) => ({
          text: item["Lesson Name"],
          imageUrl: item.url,
          studentName: item["Student Name"],
          schoolName: item["School Name"],
        }))
      );
    }
  };

  const fetchMath263Lessons = async () => {
    const { data, error } = await supabase2
      .from("Math 263")
      .select(`*, "Student Name", "School Name", "Lesson Name", url`);
    if (error) {
      console.error("Error fetching Math 263 lessons:", error.message);
    } else {
      setMath263Lessons(
        data.map((item) => ({
          text: item["Lesson Name"],
          imageUrl: item.url,
          studentName: item["Student Name"],
          schoolName: item["School Name"],
        }))
      );
    }
  };

  const fetchMath362Lessons = async () => {
    const { data, error } = await supabase2
      .from("Math 362")
      .select(`*, "Student Name", "School Name", "Lesson Name", url`);
    if (error) {
      console.error("Error fetching Math 362 lessons:", error.message);
    } else {
      setMath362Lessons(
        data.map((item) => ({
          text: item["Lesson Name"],
          imageUrl: item.url,
          studentName: item["Student Name"],
          schoolName: item["School Name"],
        }))
      );
    }
  };

  const fetchMath363And364Lessons = async () => {
    const { data, error } = await supabase2
      .from("Math 363+364")
      .select(`*, "Student Name", "School Name", "Lesson Name", url`);
    if (error) {
      console.error("Error fetching Math 363+364 lessons:", error.message);
    } else {
      setMath363And364Lessons(
        data.map((item) => ({
          text: item["Lesson Name"],
          imageUrl: item.url,
          studentName: item["Student Name"],
          schoolName: item["School Name"],
        }))
      );
    }
  };

  const fetchMath365And366Lessons = async () => {
    const { data, error } = await supabase2
      .from("Math 365+366")
      .select(`*, "Math", "Student Name", "School Name", "Lesson Name", url`);
    if (error) {
      console.error("Error fetching Math 365+366 lessons:", error.message);
    } else {
      setMath365And366Lessons(
        data.map((item) => ({
          text: item["Lesson Name"],
          imageUrl: item.url,
          studentName: item["Student Name"],
          schoolName: item["School Name"],
          mathColumn: item["Math"],
        }))
      );
    }
  };

  const fetchNationalExamsLessons = async () => {
    const { data, error } = await supabase2
      .from("National Exams Lessons")
      .select('id, "Student Name", "School Name", "Exam National", url');
    if (error) {
      console.error("Error fetching National Exams Lessons:", error.message);
    } else {
      setNationalExamsLessons(
        data.map((item) => ({
          text: item["Exam National"], // Mapped to Exam National as there is no 'Lesson Name' column
          imageUrl: item.url,
          studentName: item["Student Name"],
          schoolName: item["School Name"],
          examNational: item["Exam National"],
        }))
      );
    }
  };

  const fetchAllLessons = () => {
    console.log("Fetching all lessons...");
    fetchMath151Lessons();
    fetchMath152Lessons();
    fetchMath253Lessons();
    fetchMath261Lessons();
    fetchMath262Lessons();
    fetchMath263Lessons();
    fetchMath362Lessons();
    fetchMath363And364Lessons();
    fetchMath365And366Lessons();
    fetchNationalExamsLessons();
  };

  useEffect(() => {
    fetchAllLessons();
  }, []);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setShowModal(true);
    setShowSubjectSelection(false);
  };

  const handleModalSubmit = async (formData) => {
    if (!selectedSubject) return;

    console.log(
      "Submitting to table:",
      selectedSubject.table,
      "with data:",
      formData
    );

    const { data, error } = await supabase2
      .from(selectedSubject.table)
      .insert([formData]);

    if (error) {
      console.error("Error uploading lesson:", error.message);
      alert(`خطأ في رفع الدرس: ${error.message}`);
    } else {
      console.log("Lesson uploaded successfully:", data);
      alert("تم رفع الدرس بنجاح!");
      // Refresh relevant carousel data
      switch (selectedSubject.table) {
        case "Math 151":
          fetchMath151Lessons();
          break;
        case "Math 152":
          fetchMath152Lessons();
          break;
        case "Math 253":
          fetchMath253Lessons();
          break;
        case "Math 261":
          fetchMath261Lessons();
          break;
        case "Math 262":
          fetchMath262Lessons();
          break;
        case "Math 263":
          fetchMath263Lessons();
          break;
        case "Math 362":
          fetchMath362Lessons();
          break;
        case "Math 363+364":
          fetchMath363And364Lessons();
          break;
        case "Math 365+366":
          fetchMath365And366Lessons();
          break;
        case "National Exams Lessons":
          fetchNationalExamsLessons();
          break;
        default:
          break;
      }
    }

    setShowModal(false);
    setSelectedSubject(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedSubject(null);
  };

  return (
    <div className="container">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-primary mb-4 mt-3"
      >
        &lt; العودة
      </button>
      <div className="py-4 text-center">
        <h1>مكتبة المعلم المبدع</h1>
        <button
          onClick={() => setShowSubjectSelection(true)}
          className="btn btn-primary mb-4"
        >
          رفع درس أو فيديو
        </button>
      </div>
      {showSubjectSelection && (
        <div className="subject-selection-dropdown mt-3">
          <h3>اختر المقرر:</h3>
          {mathSubjects.map((subject) => (
            <button
              key={subject.table}
              onClick={() => handleSubjectSelect(subject)}
              className="btn btn-outline-primary me-2 mb-2"
            >
              {subject.label}
            </button>
          ))}
        </div>
      )}
      {showModal && selectedSubject && (
        <UploadModal
          show={showModal}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          subject={selectedSubject}
        />
      )}
      <h2>دروس مقرر ريض151</h2>
      <Carousel items={math151Lessons} /> {/* Use the new Carousel component */}
      <div
        style={{
          margin: "40px 0",
          borderBottom: "1px solid var(--primary)",
          opacity: 0.5,
        }}
      ></div>
      <h2 className="mt-5">دروس مقرر ريض 152</h2>
      <Carousel items={math152Lessons} />
      <div
        style={{
          margin: "40px 0",
          borderBottom: "1px solid var(--primary)",
          opacity: 0.5,
        }}
      ></div>
      <h2 className="mt-5">دروس مقرر ريض253</h2>
      <Carousel items={math253Lessons} />
      <div
        style={{
          margin: "40px 0",
          borderBottom: "1px solid var(--primary)",
          opacity: 0.5,
        }}
      ></div>
      <h2 className="mt-5">دروس مقرر ريض 261</h2>
      <Carousel items={math261Lessons} />
      <div
        style={{
          margin: "40px 0",
          borderBottom: "1px solid var(--primary)",
          opacity: 0.5,
        }}
      ></div>
      <h2 className="mt-5">دروس مقرر ريض 262</h2>
      <Carousel items={math262Lessons} />
      <div
        style={{
          margin: "40px 0",
          borderBottom: "1px solid var(--primary)",
          opacity: 0.5,
        }}
      ></div>
      <h2 className="mt-5">دروس مقرر ريض 263</h2>
      <Carousel items={math263Lessons} />
      <div
        style={{
          margin: "40px 0",
          borderBottom: "1px solid var(--primary)",
          opacity: 0.5,
        }}
      ></div>
      <h2 className="mt-5">دروس مقرر ريض 362</h2>
      <Carousel items={math362Lessons} />
      <div
        style={{
          margin: "40px 0",
          borderBottom: "1px solid var(--primary)",
          opacity: 0.5,
        }}
      ></div>
      <h2 className="mt-5">دروس مقرر ريض 363+364</h2>
      <Carousel items={math363And364Lessons} />
      <div
        style={{
          margin: "40px 0",
          borderBottom: "1px solid var(--primary)",
          opacity: 0.5,
        }}
      ></div>
      <h2 className="mt-5">دروس مقرر ريض 365+366</h2>
      <Carousel items={math365And366Lessons} />
      <div
        style={{
          margin: "40px 0",
          borderBottom: "1px solid var(--primary)",
          opacity: 0.5,
        }}
      ></div>
      <h2 className="mt-5">دروس الامتحانات الوطنية</h2>
      <Carousel items={nationalExamsLessons} />
    </div>
  );
}
