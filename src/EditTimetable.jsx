import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router";
import {
  formatTime,
  availableCourses,
  availableDays,
  availableLecturers,
} from "./updated ";
import Swal from "sweetalert2";
function EditTimetable() {
  const BaseUrl = "https://cms-api-o973.onrender.com";
  let params = useParams();
  const [venues, setVenues] = useState([]);
  const [timetable, setTimetable] = useState({});
  const [title, setTitle] = useState("");
  const [editCourse, setEditCourse] = useState("");
  const [editLecturer, setEditLecturer] = useState("");
  const [editAstLecturer, setEditAstLecturer] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editFinishTime, setEditFinishTime] = useState("");
  const [editDay, setEditDay] = useState("");
  const [editPopulation, setEditPopulation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [editVenues, setEditVenues] = useState("");
  const [newVenue, setNewVenue] = useState({ name: "", capacity: "" });
  const [editIndex, setEditIndex] = useState(-1);
  const [editId, setEditId] = useState("");
  //state variables to track the edited venue's name and capacity:?
  const [editedVenueName, setEditedVenueName] = useState("");
  const [editedVenueCapacity, setEditedVenueCapacity] = useState("");
  useEffect(() => {
    fetch(`${BaseUrl}/api/v1/timetable/${params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.data);
        setTimetable(data.data);
        setTitle(data.data.title);
      });
  }, []);

  /// state variables to hold the edited course details:
  const [editCourseData, setEditCourseData] = useState({
    course: "",
    supervisors: "",
    assisting_supervisors: "",
    start_time: "",
    end_time: "",
    day: "",
    capacity: "",
    venue: "",
  });

  const addNewCourseBefore = (index) => {
    const newCourse = { ...editCourseData };
    const updatedCourses = [...timetable.courses];
    updatedCourses.splice(index, 0, newCourse);
    setTimetable({ ...timetable, courses: updatedCourses });
    setEditCourseData({
      course: "",
      supervisors: "",
      assisting_supervisors: "",
      start_time: "",
      end_time: "",
      day: "",
      capacity: "",
      venue: "",
    });
  };
  
  const addNewCourseAfter = (index) => {
    const newCourse = { ...editCourseData };
    const updatedCourses = [...timetable.courses];
    updatedCourses.splice(index + 1, 0, newCourse);
    setTimetable({ ...timetable, courses: updatedCourses });
    setEditCourseData({
      course: "",
      supervisors: "",
      assisting_supervisors: "",
      start_time: "",
      end_time: "",
      day: "",
      capacity: "",
      venue: "",
    });
  };
  
  // Function for adding a new course
  // const addCourse = (e, index) => {
  //   // e.preventDefault();
  //   const updatedCourses = [...timetable.courses];
  //   updatedCourses.splice(index, 0, editCourseData);
  //   setTimetable({ ...timetable, courses: updatedCourses });
  //   setEditIndex(-1);
  //   setEditCourseData({
  //     course: "",
  //     supervisors: "",
  //     assisting_supervisors: "",
  //     start_time: "",
  //     end_time: "",
  //     day: "",
  //     capacity: "",
  //     venue: "",
  //   });
  // };

  // Function for adding a new course before the specified index
  // const addCourseBefore = (index) => {
  //   const newCourse = {
  //     course: "",
  //     supervisors: "",
  //     assisting_supervisors: "",
  //     start_time: "",
  //     end_time: "",
  //     day: "",
  //     capacity: "",
  //     venue: "",
  //   };

  //   const updatedCourses = [...timetable.courses];
  //   updatedCourses.splice(index - 1, 0, newCourse);

  //   setTimetable((prevTimetable) => ({
  //     ...prevTimetable,
  //     courses: updatedCourses,
  //   }));
  // };

  // // Function for adding a new course after the specified index
  // const addCourseAfter = (index) => {
  //   const newCourse = {
  //     course: "",
  //     supervisors: "",
  //     assisting_supervisors: "",
  //     start_time: "",
  //     end_time: "",
  //     day: "",
  //     capacity: "",
  //     venue: "",
  //   };

  //   const updatedCourses = [...timetable.courses];
  //   updatedCourses.splice(index + 1, 0, newCourse);

  //   setTimetable((prevTimetable) => ({
  //     ...prevTimetable,
  //     courses: updatedCourses,
  //   }));
  // };

  // Function for editing a course
  const editVenue = (index, id) => {
    setEditIndex(index);
    setEditId(id);
    const {
      day,
      course,
      assisting_supervisors,
      supervisors,
      end_time,
      start_time,
      capacity,
      venue,
    } = timetable.courses[index];
    console.log(timetable.courses[index]);
    setEditCourseData({
      course,
      supervisors,
      assisting_supervisors,
      start_time,
      end_time,
      day,
      capacity,
      venue,
    });
  };
  // a Cancel button to discard the changes and revert to the original course details:
  const cancelEdit = () => {
    setEditIndex(-1);
    setEditCourseData({
      course: "",
      supervisors: "",
      assisting_supervisors: "",
      start_time: "",
      end_time: "",
      day: "",
      capacity: "",
      venue: "",
    });
  };
  //  the removeCourse function to remove the course from the timetable:
  const removeCourse = (index) => {
    const updatedCourses = [...timetable.courses];
    updatedCourses.splice(index, 1);
    setTimetable({ ...timetable, courses: updatedCourses });
  };

  // Function for updating a course and its details
  const updateCourse = () => {
    if (editIndex !== -1) {
      const updatedCourses = [...timetable.courses];
      updatedCourses[editIndex] = {
        ...updatedCourses[editIndex],
        ...editCourseData,
      };
      setTimetable({
        ...timetable,
        courses: updatedCourses,
      });
      setEditCourseData({
        course: "",
        supervisors: "",
        assisting_supervisors: "",
        start_time: "",
        end_time: "",
        day: "",
        capacity: "",
        venue: "",
      });
      setEditIndex(-1);
      // Call an API to update the course details in the database
    }

    //  if (newVenue.name !== "" && newVenue.capacity !== 0) {
    //       let payload ={
    //            name: newVenue.name,
    //            capacity: newVenue.capacity
    //       }
    //       fetch(`${BaseUrl}/api/v1/venue/update/${editId}`, {
    //            headers:{
    //                 'content-type':'application/json'
    //            },
    //            method: 'PUT',
    //            body: JSON.stringify(payload)
    //       }).then(res => {return res.json()}).then((data) => {
    //            if (data.status === "Ok") {
    //                 Swal.fire({
    //                      title: 'Success!',
    //                      text: data.message,
    //                      icon: 'success',
    //                      confirmButtonText: 'Thanks'
    //                 })
    //                 const updatedVenues = [...venues];
    //                 updatedVenues[editIndex] = {
    //                      name: newVenue.name,
    //                      capacity: newVenue.capacity,
    //                 };
    //                 setVenues(updatedVenues);
    //                 setNewVenue({ name: "", capacity: 0 });
    //                 setEditIndex(-1);
    //            }else{
    //                 Swal.fire({
    //                      title: 'Error!',
    //                      text: data.message,
    //                      icon: 'error',
    //                      confirmButtonText: 'Close'
    //                 })
    //            }
    //       })
    //  }else{
    //       Swal.fire({
    //            title: 'Error!',
    //            text: "Kindly input venue and capacity",
    //            icon: 'error',
    //            confirmButtonText: 'Close'
    //       })
    //  }
  };
  return (
    <div style={{ marginTop: "130px" }}>
      <Navbar />
      {timetable !== {} && (
        <div style={{ padding: "50px 100px" }}>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            style={{
              padding: "10px",
              border: "1px solid gray",
              borderRadius: "8px",
              fontSize: "20px",
              fontWeight: 900,
            }}
          />
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
                  Assisting Staff
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
              {timetable?.courses?.map((course, index) => (
                <tr key={index}>
                  {index === 0 ||
                  course.day !== timetable.courses[index - 1].day ? (
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        fontWeight: "bold",
                      }}
                      rowSpan={
                        timetable.courses.filter((c) => c.day === course.day)
                          .length
                      }
                    >
                      {course.day}
                    </td>
                  ) : null}
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {course.course}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {course.supervisors}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {course.assisting_supervisors}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {formatTime(course.start_time)}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {formatTime(course.end_time)}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {course.venue}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    <div className="aButton">
                      {course.population === editCourseData.population &&
                      editIndex === index ? (
                        <div className="aButton">
                          <button onClick={updateCourse}>Save</button>
                          <button onClick={cancelEdit}>Cancel</button>
                        </div>
                      ) : (
                        <div className="aButton">
                          <button onClick={() => editVenue(index)}>Edit</button>
                          <button onClick={() => removeCourse(index)}>
                            Remove
                          </button>
                          <button onClick={() => addNewCourseBefore(index)}>
                            Add Before this course
                          </button>
                          <button onClick={() => addNewCourseAfter(index)}>
                            Add After this course
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="addVenues" style={{ marginBottom: "20px" }}>
        <h3>Edit Timetable</h3>
        <div className="courseForm">
          <div className="timetable__form-wrapper">
            <label htmlFor="">Course</label>
            <select
              value={editCourseData.course}
              onChange={(e) => {
                setEditCourseData({
                  ...editCourseData,
                  course: e.target.value,
                });
              }}
            >
              <option value="" hidden>
                Select a Course
              </option>
              {availableCourses.map((course) => (
                <option value={course} key={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className="timetable__form-wrapper">
            <label htmlFor="">Lecturer</label>
            <select
              value={editCourseData.supervisors}
              onChange={(e) => {
                setEditCourseData({
                  ...editCourseData,
                  supervisors: e.target.value,
                });
              }}
            >
              <option value="" hidden>
                Select the Lecturer
              </option>
              {availableLecturers.map((course) => (
                <option value={course} key={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className="timetable__form-wrapper">
            <label htmlFor="">Assisting Staff</label>
            <input
              type="text"
              value={editCourseData.assisting_supervisors}
              onChange={(e) => {
                setEditCourseData({
                  ...editCourseData,
                  assisting_supervisors: e.target.value,
                });
              }}
            />
          </div>
          <div className="timetable__form-wrapper">
            <label htmlFor="">Start Time</label>
            <input
              type="time"
              id="stimepicker"
              value={editCourseData.start_time}
              onChange={(e) => {
                setEditCourseData({
                  ...editCourseData,
                  start_time: e.target.value,
                });
              }}
            />
          </div>
          <div className="timetable__form-wrapper">
            <label htmlFor="">Finish Time</label>
            <input
              type="time"
              id="ftimepicker"
              value={editCourseData.end_time}
              onChange={(e) => {
                setEditCourseData({
                  ...editCourseData,
                  end_time: e.target.value,
                });
              }}
            />
          </div>
          <div className="timetable__form-wrapper">
            <label htmlFor="">Day</label>
            <select
              name=""
              id=""
              value={editCourseData.day}
              onChange={(e) => {
                setEditCourseData({
                  ...editCourseData,
                  day: e.target.value,
                });
              }}
            >
              <option value="" hidden>
                Select a Day
              </option>
              {availableDays.map((day) => (
                <option value={day} key={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="timetable__form-wrapper">
            <label htmlFor="">Population</label>
            <input
              type="number"
              value={editCourseData.population}
              onChange={(e) => {
                setEditCourseData({
                  ...editCourseData,
                  population: e.target.value,
                });
              }}
            />
          </div> */}
          <div className="timetable__form-wrapper">
            <label htmlFor="">Venue(optional)</label>
            <input
              type="text"
              value={editCourseData.venue}
              onChange={(e) => {
                setEditCourseData({
                  ...editCourseData,
                  venue: e.target.value,
                });
              }}
            />
          </div>
          <div className="timetable__form-buttonDiv">
            <button onClick={cancelEdit}>Clear fields</button>
            <button>POST</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTimetable;
