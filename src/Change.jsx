import React, { useState } from "react";

const Change = () => {
  // State variables
  const [venues, setVenues] = useState([
    { name: "KDLT", capacity: 100 },
    { name: "NFLT", capacity: 250 },
    { name: "CBN", capacity: 1000 },
    { name: "CLT", capacity: 1200 },
  ]);

  const [courseData, setCourseData] = useState([]);
  const [allocatedTimetable, setAllocatedTimetable] = useState([]);

  const [newVenue, setNewVenue] = useState({ name: "", capacity: "" });
  const [editIndex, setEditIndex] = useState(-1);

  //state variables to track the edited venue's name and capacity:?
  const [editedVenueName, setEditedVenueName] = useState("");
  const [editedVenueCapacity, setEditedVenueCapacity] = useState("");

  // a new state variable manuallyTypedVenue for keeping track of the manually typed venue:
  const [manuallyTypedVenue, setManuallyTypedVenue] = useState(false);

  //a new state variable editCourseIndex to keep track of the index of the course being edited. Initialize it with -1 to indicate no course is being edited.
  const [editCourseIndex, setEditCourseIndex] = useState(-1);
  const [newCourse, setNewCourse] = useState("");

  // Handler for updating course data
  const handleCourseChange = (index, field, value) => {
    const updatedCourseData = [...courseData];
    updatedCourseData[index][field] = value;

    if (field === "venue") {
      setManuallyTypedVenue(value !== "");
    }

    setCourseData(updatedCourseData);
  };

  // Handler for updating venue data
  const handleVenueChange = (index, field, value) => {
    const updatedVenues = [...venues];
    updatedVenues[index][field] = value;
    setVenues(updatedVenues);
  };

  // Function for exporting HTML to Word document
  function export2Word(element, filename = "") {
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerHTML + postHtml;
    // Create a Blob object with the HTML content
    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    // Specify link url
    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + ".doc" : "document.doc";

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      // For IE/Edge browsers
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }
  // Function for adding a new course forward
  const addCourse = () => {
    const newCourse = {
      course: "",
      supervisors: "",
      assisting_supervisors: "",
      start_time: "",
      end_time: "",
      day: "",
      capacity: "",
    };

    // Find the index of the forward course form
    const afterIndex = courseData.length + 1;

    // Insert the new course after the previous course form
    const updatedCourseData = [
      ...courseData.slice(0, afterIndex),
      newCourse,
      ...courseData.slice(afterIndex),
    ];

    setCourseData(updatedCourseData);
    
  };

  // Function for adding a new course backwards
  const addCoursePrev = () => {
    const newCourse = {
      course: "",
      supervisors: "",
      assisting_supervisors: "",
      start_time: "",
      end_time: "",
      day: "",
      capacity: "",
    };

    // Find the index of the previous course form
    const prevIndex = courseData.length - 1;

    // Insert the new course before the previous course form
    const updatedCourseData = [
      ...courseData.slice(0, prevIndex),
      newCourse,
      ...courseData.slice(prevIndex),
    ];

    setCourseData(updatedCourseData);
  };

  // Function for removing a course
  const removeCourse = (index) => {
    const updatedCourseData = [...courseData];
    updatedCourseData.splice(index, 1);
    setCourseData(updatedCourseData);

    const updatedAllocatedTimetable = [...allocatedTimetable];
    updatedAllocatedTimetable.splice(index, 1);
    setAllocatedTimetable(updatedAllocatedTimetable);
  };
  // Function for editing a course
  const editCourse = (index) => {
    setEditCourseIndex(index);

    const course = courseData[index];
    setNewCourse({
      course: course.course,
      supervisors: course.supervisors,
      assisting_supervisors: course.assisting_supervisors,
      start_time: course.start_time,
      end_time: course.end_time,
      day: course.day,
      capacity: course.capacity,
      venue: course.venue,
    });
  };

  // Function for adding a venue and its capacity
  const addVenue = () => {
    if (newVenue.name !== "" && newVenue.capacity !== 0) {
      setVenues([
        ...venues,
        { name: newVenue.name, capacity: newVenue.capacity },
      ]);
      setNewVenue({ name: "", capacity: 0 });
    } else {
      alert("Kindly input venue name and capacity");
    }
  };
  // Function for editing a venue and its capacity
  const editVenue = (index) => {
    setEditIndex(index);
    const { name, capacity } = venues[index];
    setNewVenue({ name, capacity });
    setEditedVenueName(name);
    setEditedVenueCapacity(capacity);
  };
  // Function for removing a venue
  const handleVenueRemove = (index) => {
    const updatedVenues = [...venues];
    updatedVenues.splice(index, 1);
    setVenues(updatedVenues);
  };
  // Function for updating a venue and its capacity
  const updateVenue = () => {
    const updatedVenues = [...venues];
    updatedVenues[editIndex] = {
      name: newVenue.name,
      capacity: newVenue.capacity,
    };
    setVenues(updatedVenues);
    setNewVenue({ name: "", capacity: 0 });
    setEditIndex(-1);
  };
  // Function to convert time to 12 hours format and include AM or PM. This is for the time displayed on the time-table
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    let formattedTime = "";
    let period = "";

    if (hours < 12) {
      formattedTime = hours;
      period = "AM";
    } else {
      formattedTime = hours % 12 || 12;
      period = "PM";
    }

    return formattedTime + ":" + minutes + " " + period;
  };
  // Function for allocating a venue to a course
  const allocateVenues = () => {
    const venueBookings = {
      Monday: { CBN: [], KDLT: [], NFLT: [], CLT: [] },
      Tuesday: { CBN: [], KDLT: [], NFLT: [], CLT: [] },
      Wednesday: { CBN: [], KDLT: [], NFLT: [], CLT: [] },
      Thursday: { CBN: [], KDLT: [], NFLT: [], CLT: [] },
      Friday: { CBN: [], KDLT: [], NFLT: [], CLT: [] },
      Saturday: { CBN: [], KDLT: [], NFLT: [], CLT: [] },
    };

    const updatedAllocatedTimetable = courseData.map((row) => {
      const {
        course,
        supervisors,
        assisting_supervisors,
        start_time,
        end_time,
        day,
        capacity,
        venue,
      } = row;
      if (venue && manuallyTypedVenue) {
        // If the user manually typed a venue, allocate the course to that venue
        const bookingsForVenue = venueBookings[day][venue] || [];
        venueBookings[day][venue] = bookingsForVenue;
        bookingsForVenue.push({
          course,
          supervisors,
          assisting_supervisors,
          start_time,
          end_time,
        });
        return {
          course,
          supervisors,
          assisting_supervisors,
          start_time,
          end_time,
          day,
          capacity,
          venue,
        };
      } else {
        // If the user did not manually type a venue, allocate the course based on the existing criteria
        const availableVenues = [];

        for (const venue of venues) {
          if (capacity <= venue.capacity) {
            const bookingsForVenue = venueBookings[day][venue.name] || [];
            console.log(bookingsForVenue);
            bookingsForVenue.sort((a, b) => a.end_time - b.end_time);

            // Check if the course's start time is after the previous course's end time
            if (
              !bookingsForVenue.length ||
              bookingsForVenue[bookingsForVenue.length - 1].end_time <=
                start_time
            ) {
              availableVenues.push(venue);
            }
          }
        }

        if (availableVenues.length > 0) {
          const selectedVenue = availableVenues[0];
          const bookingsForVenue = venueBookings[day][selectedVenue.name] || [];
          venueBookings[day][selectedVenue.name] = bookingsForVenue;
          bookingsForVenue.push({
            course,
            supervisors,
            assisting_supervisors,
            start_time,
            end_time,
          });
          return {
            course,
            supervisors,
            assisting_supervisors,
            start_time,
            end_time,
            day,
            capacity,
            venue: selectedVenue.name,
          };
        } else {
          // If no available venue is found, allocate the course to a "No Venue" option
          const bookingsForVenue = venueBookings[day]["No Venue"] || [];
          venueBookings[day]["No Venue"] = bookingsForVenue;
          bookingsForVenue.push({
            course,
            supervisors,
            assisting_supervisors,
            start_time,
            end_time,
          });
          return {
            course,
            supervisors,
            assisting_supervisors,
            start_time,
            end_time,
            day,
            capacity,
            venue: "No Venue",
          };
        }
      }
    });

    console.log(venueBookings);
    setAllocatedTimetable(updatedAllocatedTimetable);
  };

  const updateCourse = (index) => {
    const updatedCourseData = [...courseData];

    updatedCourseData[index] = {
      course: newCourse.course,
      supervisors: newCourse.supervisors,
      assisting_supervisors: newCourse.assisting_supervisors,
      start_time: newCourse.start_time,
      end_time: newCourse.end_time,
      day: newCourse.day,
      capacity: newCourse.capacity,
      venue: newCourse.venue,
    };

    setCourseData(updatedCourseData);

    // Update the corresponding course in the allocated timetable
    const updatedAllocatedTimetable = [...allocatedTimetable];
    updatedAllocatedTimetable[index] = {
      ...updatedAllocatedTimetable[index],
      ...updatedCourseData[index],
    };
    setAllocatedTimetable(updatedAllocatedTimetable);

    setEditCourseIndex(-1);
  };

  // Selecting courses
  const availableCourses = [
    "CSC 102",
    "CSC 103",
    "MAT 102",
    "PHY 102",
    "CHE 102",
    "PSY 102",
  ];

  // Selecting lecturers
  const availableLecturers = [
    "Dr. Ayinla",
    "Dr. Ayinla_2",
    "Dr. Ayinla_3",
    "Dr. Woods",
    "Dr. Woods_2",
    "Dr. Woods_3",
  ];

  // Selecting days
  const availableDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="container_2">
      <h1>Welcome To The Course Management System!</h1>
      <div className="details"></div>
      {venues.length > 0 && (
        <div>
          <h3>Available Venues</h3>
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
                  Venue
                </th>
                <th
                  style={{
                    padding: "5px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Capacity
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
              {venues.map((venue, index) => (
                <tr key={index}>
                  <td style={{ padding: "4px", border: "1px solid #ccc" }}>
                    {venue.name}
                  </td>
                  <td style={{ padding: "4px", border: "1px solid #ccc" }}>
                    {venue.capacity}
                  </td>
                  <td style={{ padding: "4px", border: "1px solid #ccc" }}>
                    <div className="aButton">
                      <button onClick={() => editVenue(index)}>Edit</button>
                      <button onClick={() => handleVenueRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="addVenues">
        <h3>Add/Edit Venue</h3>
        <div className="courseForm">
          <input
            type="text"
            placeholder="Venue Name"
            value={newVenue.name}
            onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Capacity"
            value={newVenue.capacity}
            onChange={(e) =>
              setNewVenue({ ...newVenue, capacity: parseInt(e.target.value) })
            }
          />
        </div>

        {editIndex !== -1 ? (
          <button onClick={updateVenue}>Update Venue</button>
        ) : (
          <button onClick={addVenue}>Add Venue</button>
        )}
      </div>
      <h3>Add Course</h3>
      {courseData.map((course, index) => (
        <div key={index}>
          <div className="courseForm">
            <select
              value={course.course}
              onChange={(e) =>
                handleCourseChange(index, "course", e.target.value)
              }
            >
              <option value="">Select a Course</option>
              {availableCourses.map((course) => (
                <option value={course} key={course}>
                  {course}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="For Others"
              value={course.course}
              onChange={(e) =>
                handleCourseChange(index, "course", e.target.value)
              }
            />

            <select
              value={course.supervisors}
              onChange={(e) =>
                handleCourseChange(index, "supervisors", e.target.value)
              }
            >
              <option value="">Select the Lecturer</option>
              {availableLecturers.map((course) => (
                <option value={course} key={course}>
                  {course}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Assisting Staff"
              value={course.assisting_supervisors}
              onChange={(e) =>
                handleCourseChange(
                  index,
                  "assisting_supervisors",
                  e.target.value
                )
              }
            />

            <label>Start Time:</label>
            <input
              type="time"
              id="stimepicker"
              value={course.start_time}
              onChange={(e) =>
                handleCourseChange(index, "start_time", e.target.value)
              }
            />
            <label>Finish Time:</label>
            <input
              type="time"
              id="ftimepicker"
              value={course.end_time}
              onChange={(e) =>
                handleCourseChange(index, "end_time", e.target.value)
              }
            />

            <select
              value={course.day}
              onChange={(e) => handleCourseChange(index, "day", e.target.value)}
            >
              <option value="" hidden>
                Select a Day
              </option>
              {availableDays.map((course) => (
                <option value={course} key={course}>
                  {course}
                </option>
              ))}
            </select>
            {/* <input
              type="date"
              placeholder="Day"
              value={course.day}
              onChange={(e) => handleCourseChange(index, "day", e.target.value)}
            /> */}
            <input
              type="number"
              placeholder="Population of Students"
              value={course.capacity}
              onChange={(e) =>
                handleCourseChange(index, "capacity", parseInt(e.target.value))
              }
            />

            <input
              type="text"
              placeholder="Optional Venue"
              value={course.venue}
              onChange={(e) =>
                handleCourseChange(index, "venue", e.target.value)
              }
            />
          </div>
        </div>
      ))}
      <div className="aButton">
        <button onClick={addCourse}>Add Course</button>
        <button onClick={allocateVenues}>Allocate Venues</button>
      </div>

      {allocatedTimetable.length > 0 && (
        <div id="content">
          <h3>Allocated Timetable</h3>
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
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allocatedTimetable.map((course, index) => (
                <tr key={index}>
                  {index === 0 ||
                  course.day !== allocatedTimetable[index - 1].day ? (
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        fontWeight: "bold",
                      }}
                      rowSpan={courseData.filter((c) => c.day === course.day).length}

                      // rowSpan={
                      //   allocatedTimetable.filter((c) => c.day === course.day)
                      //     .length
                      // }
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
                    {editCourseIndex === index ? (
                      <div className="aButton">
                        <button onClick={() => updateCourse(index)}>
                          Update
                        </button>
                        <button onClick={() => setEditCourseIndex(-1)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="aButton">
                        <button onClick={() => editCourse(index)}>
                          Edited
                        </button>
                        <button onClick={() => removeCourse(index)}>
                          Remove
                        </button>
                        <button onClick={addCoursePrev}>Add Course Prev.to this</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {allocatedTimetable.length > 0 && (
        <button
          onClick={() => {
            export2Word("content", "Timetable");
          }}
        >
          Export to DOCX
        </button>
      )}
    </div>
  );
};

export default Change;
