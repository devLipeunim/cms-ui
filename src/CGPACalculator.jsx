// CGPACalculator.js
import React, { useState } from "react";
import CourseTable from "./CourseTable";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Swal from "sweetalert2";
import ReadMe from "./ReadMe"
import computerScience from "./Courses/ComputerScience";
import economics from "./Courses//Economics";

const CGPACalculator = () => {
  const departments = [computerScience, economics];

  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [selectedLevel, setSelectedLevel] = useState(
    selectedDepartment.levels[0]
  );
  const [courses, setCourses] = useState(selectedLevel.courses);
  const [newCourse, setNewCourse] = useState("");
  const [newUnits, setNewUnits] = useState("");

  const handleDepartmentChange = (event) => {
    const department = departments.find(
      (dept) => dept.name === event.target.value
    );
    setSelectedDepartment(department);
    setSelectedLevel(department.levels[0]);
    setCourses(department.levels[0].courses);
  };

  const handleLevelChange = (event) => {
    const level = selectedDepartment.levels.find(
      (lvl) => lvl.name === event.target.value
    );
    setSelectedLevel(level);
    setCourses(level.courses);
  };

  const removeCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const handleNewCourseChange = (event) => {
    setNewCourse(event.target.value);
  };

  const handleNewUnitsChange = (event) => {
    setNewUnits(event.target.value);
  };

  const handleAddCourse = (event) => {
    event.preventDefault();
    if (newCourse && newUnits) {
      const newCourseObj = {
        name: newCourse,
        units: parseInt(newUnits),
        score: 0,
        gradePoint: 0,
      };
      setCourses((prevCourses) => [...prevCourses, newCourseObj]);
      setNewCourse("");
      setNewUnits("");
    }
  };

  const calculateCGPA = (selectedCourses) => {
    const totalUnits = courses.reduce((sum, course) => sum + course.units, 0);
    const product = selectedCourses.reduce(
      (sum, course) => sum + course.gradePoint * course.units,
      0
    );
    const newCGPA = product / totalUnits;
    const finalCGPA = newCGPA.toFixed(2);
    if (finalCGPA >= 3.5 && finalCGPA <= 4.0) {
      Swal.fire({
        title: "CONGRATULATIONS! 🥳",
        text: `You are on ${finalCGPA} out of 4.0 >>> FIRST CLASS`,
        icon: "success",
        confirmButtonText: "You are doing well 🤩",
      });
    } else if (finalCGPA >= 3.0 && finalCGPA <= 3.49) {
      Swal.fire({
        title: "CONGRATULATIONS! 🥳",
        text: `You are on ${finalCGPA} out of 4.0 >>> SECOND CLASS UPPER`,
        icon: "success",
        confirmButtonText: "You are doing well 🤩",
      });
    } else if (finalCGPA >= 2.0 && finalCGPA <= 2.99) {
      Swal.fire({
        title: "CONGRATULATIONS! 🥳",
        text: `You are on ${finalCGPA} out of 4.0 >>> SECOND CLASS LOWER`,
        icon: "success",
        confirmButtonText: "You are doing well 🤩",
      });
    } else if (finalCGPA >= 1.0 && finalCGPA <= 1.99) {
      Swal.fire({
        title: "CONGRATULATIONS! 🥳",
        text: `You are on ${finalCGPA} out of 4.0 >>> THIRD CLASS`,
        icon: "success",
        confirmButtonText: "You are doing well 🤩",
      });
    } else if (finalCGPA < 1.0) {
      Swal.fire({
        title: "CONGRATULATIONS! 🥳",
        text: `You are on ${finalCGPA} out of 4.0 >>> FAIL`,
        icon: "success",
        confirmButtonText: "You are doing well 🤩",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: `Your CGPA is: ${finalCGPA} is NOT IN THE STANDARD RANGE`,
        icon: "error",
        confirmButtonText: "close",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container_2">
        <h1>CGPA Calculator</h1>
        <ReadMe/>
        <div className="courseForm">
          <div>
            <label htmlFor="department">Select Department:</label>
            <select
              id="department"
              hidden
              value={selectedDepartment.name}
              onChange={handleDepartmentChange}
            >
              {departments.map((department, index) => (
                <option key={index} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="level">Select Level:</label>
            <select
              id="level"
              value={selectedLevel.name}
              onChange={handleLevelChange}
            >
              {selectedDepartment.levels.map((level, index) => (
                <option key={index} value={level.name}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <CourseTable courses={courses} removeCourse={removeCourse} />
        <form onSubmit={handleAddCourse}>
          <div className="courseForm">
            <div>
              <label htmlFor="newCourse">New Course:</label>
              <input
                id="newCourse"
                type="text"
                value={newCourse}
                onChange={handleNewCourseChange}
              />
            </div>
            <div>
              <label htmlFor="newUnits">Unit:</label>
              <input
                id="newUnits"
                type="number"
                value={newUnits}
                onChange={handleNewUnitsChange}
              />
            </div>
          </div>

          <button type="submit">Add New Course</button>
        </form>
        <Modal courses={courses} calculateCGPA={calculateCGPA} />
      </div>
    </div>
  );
};

export default CGPACalculator;
