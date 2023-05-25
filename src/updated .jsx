import React, { useState } from "react";

const Updated = () => {
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

  // Handler for updating course data
  const handleCourseChange = (index, field, value) => {
    const updatedCourseData = [...courseData];
    updatedCourseData[index][field] = value;
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
  // Function for adding a new course
  const addCourse = () => {
    setCourseData([
      ...courseData,
      {
        course: "",
        supervisors: "",
        start_time: "",
        end_time: "",
        day: "",
        capacity: "",
      },
    ]);
  };

  // Function for removing a course

  const removeCourse = (index) => {
    const updatedCourseData = [...courseData];
    updatedCourseData.splice(index, 1);
    setCourseData(updatedCourseData);
  };

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

  const editVenue = (index) => {
    setEditIndex(index);
    const { name, capacity } = venues[index];
    setNewVenue({ name, capacity });
  };

  const handleVenueRemove = (index) => {
    const updatedVenues = [...venues];
    updatedVenues.splice(index, 1);
    setVenues(updatedVenues);
  };

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

  const allocateVenues = () => {
    const venueBookings = {
      Monday: { CBN: [], KDLT: [], NFLT: [], FLT: [] },
      Tuesday: { CBN: [], KDLT: [], NFLT: [], FLT: [] },
      Wednesday: { CBN: [], KDLT: [], NFLT: [], FLT: [] },
      Thursday: { CBN: [], KDLT: [], NFLT: [], FLT: [] },
      Friday: { CBN: [], KDLT: [], NFLT: [], FLT: [] },
    };

    const updatedAllocatedTimetable = courseData.map((row) => {
      const { course, supervisors, start_time, end_time, day, capacity } = row;
      const availableVenues = [];

      for (const venue of venues) {
        if (capacity <= venue.capacity) {
          const bookingsForVenue = venueBookings[day][venue.name] || [];
          console.log(bookingsForVenue);
          bookingsForVenue.sort((a, b) => a.end_time - b.end_time);
          if (
            !bookingsForVenue.length ||
            bookingsForVenue[bookingsForVenue.length - 1].end_time <= start_time
          ) {
            availableVenues.push(venue);
          }
        }
      }

      if (availableVenues.length > 0) {
        const selectedVenue = availableVenues[0];
        const bookingsForVenue = venueBookings[day][selectedVenue.name] || [];
        venueBookings[day][selectedVenue.name] = bookingsForVenue;
        bookingsForVenue.push({ course, supervisors, start_time, end_time });
        return {
          course,
          supervisors,
          start_time,
          end_time,
          day,
          capacity,
          venue: selectedVenue.name,
        };
      }

      return {
        course,
        supervisors,
        start_time,
        end_time,
        day,
        capacity,
        venue: "Not available",
      };
    });

    setAllocatedTimetable(updatedAllocatedTimetable);
  };

  return (
    <div className="container_2">
      <h1>Welcome To The Course Management System!</h1>
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
                  Capacity
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
              {venues.map((venue, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {venue.name}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {venue.capacity}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
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
            <input
              type="text"
              placeholder="Course"
              value={course.course}
              onChange={(e) =>
                handleCourseChange(index, "course", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Lecturer"
              value={course.supervisors}
              onChange={(e) =>
                handleCourseChange(index, "supervisors", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Start Time"
              value={course.start_time}
              onChange={(e) =>
                handleCourseChange(index, "start_time", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="End Time"
              value={course.end_time}
              onChange={(e) =>
                handleCourseChange(index, "end_time", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Day"
              value={course.day}
              onChange={(e) => handleCourseChange(index, "day", e.target.value)}
            />
            <input
              type="number"
              placeholder="Population of Students"
              value={course.capacity}
              onChange={(e) =>
                handleCourseChange(index, "capacity", parseInt(e.target.value))
              }
            />
          </div>
          <button onClick={() => removeCourse(index)}>Remove</button>
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
                  Start Time
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Finish Time
                </th>
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
                  Venue
                </th>
              </tr>
            </thead>
            <tbody>
              {allocatedTimetable.map((row, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {row.course}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {row.supervisors}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {row.start_time}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {row.end_time}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {row.day}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {row.venue}
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

export default Updated;
