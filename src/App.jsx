import ManageVenue from "./ManageVenue.jsx";
import TimetableDetails from "./TimetableDetails.jsx";
import EditTimetable from "./EditTimetable.jsx";
import Updated from "./updated .jsx";
import Students from "./Students.jsx";
import CGPACalculator from "../cgpa.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./SignLogin.jsx";
import "./App.css";

function App() {
  return (
    <>
    <BrowserRouter>
          <Routes>
               <Route path="/" element={<LoginForm />} />
               <Route path="/admin" element={<Updated/>} />
               <Route path="/cgpa" element={<CGPACalculator/>} />
               <Route path="/timetables" element={<Students/>} />
               <Route path="/admin/manage-venue" element={<ManageVenue/>} />
               <Route path="/admin/timetable/:id" element={<TimetableDetails/>} />
               <Route path="/admin/timetable/edit/:id" element={<EditTimetable/>} />
          </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
