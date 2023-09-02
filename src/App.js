import Login from "./pages/Login/index.jsx";
import s from "./App.module.scss";
import { Main } from "./pages/Main/Main.jsx";
import CoursePage from "./pages/CoursePage/index.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage/index.jsx";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && window.location.pathname !== "/login") {
      navigate("/login");
      setIsLogged(!isLogged);
    }
    if (token && window.location.pathname === "/login") {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <div className={s.app}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/admin/courses/*" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
