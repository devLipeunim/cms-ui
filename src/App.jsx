import Navbar from "./Navbar.jsx";
import Updated from "./updated .jsx";
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
          </Routes>
    </BrowserRouter>
      {/* */}
      {/*  */}
      {/* <CGPACalculator/> */}
    </>
  );
}

export default App;
