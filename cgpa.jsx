import React, { useState } from "react";
import Navbar from "./src/Navbar";
const CourseTable = ({ courses, removeCourse }) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: "#f2f2f2",
            }}
          >
            Courses
          </th>
          <th
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: "#f2f2f2",
            }}
          >
            Units
          </th>
          <th
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: "#f2f2f2",
            }}
          >
            Grade Point
          </th>
          <th
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: "#f2f2f2",
            }}
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td style={{ padding: "10px", border: "1px solid #ccc" }}>
              {course.name}
            </td>
            <td style={{ padding: "10px", border: "1px solid #ccc" }}>
              {course.units}
            </td>
            <td style={{ padding: "10px", border: "1px solid #ccc" }}>
              {course.gradePoint}
            </td>
            <td style={{ padding: "10px", border: "1px solid #ccc" }}>
              <button onClick={() => removeCourse(index)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

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
     <Navbar/>
      <h2 style={{}}>Calculate CGPA</h2>
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

const CGPACalculator = () => {
  const departments = [
    {
      name: "Computer Science",
      levels: [
        {
          name: "Level 100",
          courses: [
            { name: "CSC 102", units: 4, gradePoint: 0 },
            { name: "MAT 121", units: 4, gradePoint: 0 },
            { name: "MAT 111", units: 4, gradePoint: 0 },
            { name: "PHY 102", units: 3, gradePoint: 0 },
            { name: "GES 107", units: 2, gradePoint: 0 },
            { name: "GES 108", units: 2, gradePoint: 0 },
            { name: "STA 115", units: 3, gradePoint: 0 },
            { name: "CSC 103", units: 4, gradePoint: 0 },
            { name: "MAT 141", units: 4, gradePoint: 0 },
            { name: "GES 101", units: 2, gradePoint: 0 },
            { name: "STA 121", units: 3, gradePoint: 0 },
            { name: "PHY 104", units: 3, gradePoint: 0 },
            { name: "PHY 105", units: 3, gradePoint: 0 },
          ],
        },
        {
          name: "Level 200",
          courses: [
            { name: "MAT 241", units: 4, gradePoint: 0 },
            { name: "GES 201", units: 2, gradePoint: 0 },
            { name: "STA 221", units: 3, gradePoint: 0 },
            { name: "PHY 204", units: 3, gradePoint: 0 },
            { name: "PHY 205", units: 3, gradePoint: 0 },
          ],
        },
      ],
    },
    {
      name: "Economics",
      levels: [
        {
          name: "Level 100",
          courses: [
            { name: "ECO 141", units: 4, gradePoint: 0 },
            { name: "ECO 101", units: 2, gradePoint: 0 },
            { name: "ECO 121", units: 3, gradePoint: 0 },
            { name: "ECO 104", units: 3, gradePoint: 0 },
            { name: "ECO 105", units: 3, gradePoint: 0 },
          ],
        },
        {
          name: "Level 200",
          courses: [
            { name: "ECO 241", units: 4, gradePoint: 0 },
            { name: "ECO 201", units: 2, gradePoint: 0 },
            { name: "ECO 221", units: 3, gradePoint: 0 },
            { name: "ECO 204", units: 3, gradePoint: 0 },
            { name: "ECO 205", units: 3, gradePoint: 0 },
          ],
        },
      ],
    },
  ];

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
    alert(`Your CGPA is: ${newCGPA.toFixed(2)}`);
  };

  return (
    <div>
      <h1>CGPA Calculator</h1>
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

        <button type="submit">Add Course</button>
      </form>
      <Modal courses={courses} calculateCGPA={calculateCGPA} />
    </div>
  );
};

export default CGPACalculator;
