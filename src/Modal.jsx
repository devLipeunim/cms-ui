// Modal.js
import React, { useState } from "react";
import CourseTable from "./CourseTable";

const Modal = ({ courses, calculateCGPA }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [score, setScore] = useState("");
  // const [gradePoint, setGradePoint] = useState(1);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleScoreChange = (event) => {
    setScore(parseInt(event.target.value));
  };

  // const handleGradePointChange = (event) => {
  //   setGradePoint(parseInt(event.target.value));
  // };

  const handleAddCourse = () => {
    if (selectedCourse && score) {
      const selectedCourseObj = courses.find(
        (course) => course.name === selectedCourse
      );
      const gradePoint = calculateGradePoint(score);
      const newCourse = { ...selectedCourseObj, score, gradePoint };
      setSelectedCourses((prevCourses) => [...prevCourses, newCourse]);
      setSelectedCourse("");
      setScore("");
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

  const calculateGradePoint = (score) => {
    if (score >= 70 && score <= 100) {
      return 4;
    } else if (score >= 60 && score <= 69) {
      return 3;
    } else if (score >= 50 && score <= 59) {
      return 2;
    } else if (score >= 45 && score <= 49) {
      return 1;
    } else {
      return 0;
    }
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
            <label htmlFor="score">Enter Score:</label>
            <input
              id="score"
              type="number"
              value={score}
              onChange={handleScoreChange}
            />
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
