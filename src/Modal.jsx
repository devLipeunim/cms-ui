// Modal.js
import React, { useState } from "react";
import CourseTable from "./CourseTable";

const Modal = ({ courses, calculateCGPA }) => {
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [gradePoint, setGradePoint] = useState(1);
  
    const handleCourseChange = (event) => {
      setSelectedCourse(event.target.value);
    };
  
    const handleGradePointChange = (event) => {
      setGradePoint(parseInt(event.target.value));
    };
  
    const handleAddCourse = () => {
      if (selectedCourse && gradePoint) {
        const selectedCourseObj = courses.find(
          (course) => course.name === selectedCourse
        );
        const newCourse = { ...selectedCourseObj, gradePoint };
        setSelectedCourses((prevCourses) => [...prevCourses, newCourse]);
        setSelectedCourse("");
        setGradePoint(1);
      }
    };
  
    const handleRemoveCourse = (index) => {
      setSelectedCourses((prevCourses) => {
        const updatedCourses = [...prevCourses];
        updatedCourses.splice(index, 1);
        return updatedCourses;
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      calculateCGPA(selectedCourses);
    };
  
    return (
      <div className="">
        <h2>Calculate CGPA</h2>
        <form onSubmit={handleSubmit}>
          <div className="courseForm">
            <div>
              <label htmlFor="course">Select Course:</label>
              <select
                id="course"
                value={selectedCourse}
                onChange={handleCourseChange}
              >
                <option value="" hidden></option>
                {courses.map((course, index) => (
                  <option key={index} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="gradePoint">Select Grade Point:</label>
              <select
                id="gradePoint"
                value={gradePoint}
                onChange={handleGradePointChange}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
  
          <button type="button" onClick={handleAddCourse}>
            Add Course
          </button>
          <CourseTable
            courses={selectedCourses}
            removeCourse={handleRemoveCourse}
          />
          <button type="submit">Calculate</button>
        </form>
      </div>
    );
  };

export default Modal;
