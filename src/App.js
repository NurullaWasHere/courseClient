import Login from "./pages/Login";
import s from "./App.module.scss";
import { Main } from "./pages/Main/Main";
import CoursePage from "./pages/CoursePage/CoursePage";
import { Routes, Route} from "react-router-dom";
import AdminPage from "./pages/AdminPage";

function App() {


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
