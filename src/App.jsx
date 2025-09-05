import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Banner from "./components/Banner";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "منصة الرياضيات";
  }, []);
  return (
    <div style={{ direction: "rtl", minHeight: "100vh" }}>
      <main className="container py-3">
        <Banner />
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
