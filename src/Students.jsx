import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./students.css";
import Swal from "sweetalert2";
import { formatTime, export2Word } from "./updated ";
const Students = () => {
  let claims = JSON.parse(localStorage.getItem("claims"));
  const BaseUrl = "https://cms-api-o973.onrender.com";
  const [timetable, setTimetable] = useState([]);
  const [department, setDepartment] = useState("");
  useEffect(() => {
    fetch(`${BaseUrl}/api/v1/timetable?department=${claims.department}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTimetable(data.data);
      });
  }, []);

  const generateTimetableByDepartment = () => {
    if (department !== "") {
      fetch(`${BaseUrl}/api/v1/timetable?department=${department}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.data.length == 0) {
            Swal.fire({
              title: "Error!",
              text: "Sorry, there is no timetable for this department",
              icon: "error",
              confirmButtonText: "Close",
            });
          } else {
            setTimetable(data.data);
            Swal.fire({
              title: "Success!",
              text: `Here is the timetabel for ${department} department`,
              icon: "success",
              confirmButtonText: "Close",
            });
          }
        });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Kindly input department 😒",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  // Selecting departments
  const availableDepartments = [
    "Computer Science",
    "Chemistry",
    "Electrical and Electronics",
    "Physics",
  ];

  return (
    <div>
      <Navbar />
      <div className="container_2">
        <div className="students__department-div">
          <select
            name=""
            id=""
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            <option value="">Select Department</option>
            {availableDepartments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
          <button onClick={generateTimetableByDepartment}>
            Generate Timetable
          </button>
        </div>
        {
          timetable?.length > 0 &&
            timetable?.map((element, index) => (
              <div id={"content-" + index} key={index}>
                <h3>{element.title}</h3>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                  }}
                  className="timetable"
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
                        Day
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #ccc",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                        Course
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #ccc",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                        Lecturer
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #ccc",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                        Assisting Lecturer
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #ccc",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                        Start Time
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #ccc",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                        End Time
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #ccc",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                        Venue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {element.courses.map((course, index) => (
                      <tr key={index}>
                        {index === 0 ||
                        course.day !== element.courses[index - 1].day ? (
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                              fontWeight: "bold",
                            }}
                            rowSpan={
                              element.courses.filter(
                                (c) => c.day === course.day
                              ).length
                            }
                          >
                            {course.day}
                          </td>
                        ) : null}
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {course.course}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {course.supervisors}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {course.assisting_supervisors}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {formatTime(course.start_time)}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {formatTime(course.end_time)}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {course.venue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => {
                    export2Word(`content-${index}`, "Timetable");
                  }}
                >
                  Export to DOCX
                </button>
              </div>
            ))
          // <div id="content">
          //      <h3>{title}</h3>
          //      <table
          //      style={{
          //      width: "100%",
          //      borderCollapse: "collapse",
          //      marginTop: "20px",
          //      }}
          //      className="timetable"
          //      >
          //      <thead>
          //      <tr>
          //           <th
          //           style={{
          //                padding: "10px",
          //                border: "1px solid #ccc",
          //                backgroundColor: "#f2f2f2",
          //           }}
          //           >
          //           Day
          //           </th>
          //           <th
          //           style={{
          //                padding: "10px",
          //                border: "1px solid #ccc",
          //                backgroundColor: "#f2f2f2",
          //           }}
          //           >
          //           Course
          //           </th>
          //           <th
          //           style={{
          //                padding: "10px",
          //                border: "1px solid #ccc",
          //                backgroundColor: "#f2f2f2",
          //           }}
          //           >
          //           Lecturer
          //           </th>
          //           <th
          //           style={{
          //                padding: "10px",
          //                border: "1px solid #ccc",
          //                backgroundColor: "#f2f2f2",
          //           }}
          //           >
          //           Assisting Lecturer
          //           </th>
          //           <th
          //           style={{
          //                padding: "10px",
          //                border: "1px solid #ccc",
          //                backgroundColor: "#f2f2f2",
          //           }}
          //           >
          //           Start Time
          //           </th>
          //           <th
          //           style={{
          //                padding: "10px",
          //                border: "1px solid #ccc",
          //                backgroundColor: "#f2f2f2",
          //           }}
          //           >
          //           End Time
          //           </th>
          //           <th
          //           style={{
          //                padding: "10px",
          //                border: "1px solid #ccc",
          //                backgroundColor: "#f2f2f2",
          //           }}
          //           >
          //           Venue
          //           </th>
          //      </tr>
          //      </thead>
          //      <tbody>
          //      {timetable.map((course, index) => (
          //           <tr key={index}>
          //           {index === 0 ||
          //           course.day !== timetable[index - 1].day ? (
          //                <td
          //                style={{
          //                padding: "10px",
          //                border: "1px solid #ccc",
          //                fontWeight: "bold",
          //                }}
          //                rowSpan={
          //                     timetable.filter((c) => c.day === course.day)
          //                     .length
          //                }
          //                >
          //                {course.day}
          //                </td>
          //           ) : null}
          //           <td style={{ padding: "10px", border: "1px solid #ccc" }}>
          //                {course.course}
          //           </td>
          //           <td style={{ padding: "10px", border: "1px solid #ccc" }}>
          //                {course.supervisors}
          //           </td>
          //           <td style={{ padding: "10px", border: "1px solid #ccc" }}>
          //                {course.assisting_supervisors}
          //           </td>
          //           <td style={{ padding: "10px", border: "1px solid #ccc" }}>
          //                {formatTime(course.start_time)}
          //           </td>
          //           <td style={{ padding: "10px", border: "1px solid #ccc" }}>
          //                {formatTime(course.end_time)}
          //           </td>
          //           <td style={{ padding: "10px", border: "1px solid #ccc" }}>
          //                {course.venue}
          //           </td>
          //           </tr>
          //      ))}
          //      </tbody>
          //      </table>
          //      <button onClick={() => {export2Word("content", "Timetable");}}>
          //           Export to DOCX
          //      </button>
          // </div>
        }
      </div>
    </div>
  );
};

export default Students;
