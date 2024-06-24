// import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import { routes } from "./routes";
import HomePage from "./pages/Home";
import ClassPage from "./pages/Class/Index";
import StudentPage from "./pages/Student/Index";
import TeacherPage from "./pages/Teacher/Index";
import Common from "./pages/Common";


function App() {

  // const [date, setDate] = useState("");

  return (
    <Routes>
      <Route path={routes.home} element={<Common />}>
        <Route path={routes.home} element={<HomePage />} />

        <Route path={routes.class.index} element={<ClassPage />} />


        <Route path={routes.student.index} element={<StudentPage />} />


        <Route path={routes.teacher.index} element={<TeacherPage />} />

      </Route>
    </Routes>


    // <div className="w-screen h-screen flex justify-center items-center bg-sky-400">
    //   Home Page

    //   <DatePicker
    //     value={date}
    //     onChange={e => setDate(e?.getFullYear().toString() || "")}
    //     showYearPicker
    //     dateFormat={"yyyy"} />
    // </div>
  )
}

export default App
