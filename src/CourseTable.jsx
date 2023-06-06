// CourseTable.js
import React from "react";

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
              padding: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f2f2f2",
            }}
          >
            Courses
          </th>
          <th
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f2f2f2",
            }}
          >
            Units
          </th>
          <th
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f2f2f2",
            }}
          >
            Grade Point
          </th>
          <th
            style={{
              padding: "5px",
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
            <td style={{ padding: "4px", border: "1px solid #ccc" }}>
              {course.name}
            </td>
            <td style={{ padding: "4px", border: "1px solid #ccc" }}>
              {course.units}
            </td>
            <td style={{ padding: "4px", border: "1px solid #ccc" }}>
              {course.gradePoint}
            </td>
            <td style={{ padding: "4px", border: "1px solid #ccc" }}>
              <button onClick={() => removeCourse(index)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
