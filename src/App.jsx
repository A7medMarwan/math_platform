import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Banner from "./components/Banner";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = "منصة الرياضيات";
  }, []);
  return (
    <div style={{ direction: "rtl", minHeight: "100vh" }}>
      <main className="container py-3">
        {pathname !== "/login" && <Banner />}
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
