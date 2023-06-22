import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ProgramUx from "./Program_ux";
import ProgramCodes from "./Program_codes";
import CourseUpload from "./UploadCourses";
import UploadAsstLecturers from "./UploadAsstLecturers";
import UploadLecturers from "./UploadLecturer";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import emptyFolder from "./assets/empty-folder.svg";
import "./index.css";
import "./timetable.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

//Material Ui imports
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Function to convert time to 12 hours format and include AM or PM. This is for the time displayed on the time-table
export const formatTime = (time) => {
  const [hours, minutes] = time?.split(":");
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

// Function for exporting HTML to Word document
export function export2Word(element, filename = "") {
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
// Selecting courses
export const availableCourses = [
  "CSC 102",
  "CSC 103",
  "CSC 213",
  "CSC 222",
  "CSC 293",
  "CSC 231",
  "CSC 234",
  "CSC 235",
  "CSC 236",
  "CSC 242",
  "CSC 272",
  "CSC 299",
  "CSC 301",
  "CSC 302",
  "CSC 313",
  "CSC 321",
  "CSC 322",
  "CSC 331",
  "CSC 334",
  "CSC 335",
  "CSC 341",
  "CSC 351",
  "CSC 399",
  "CSC 381",
  // "CSC 412",
  // "CSC 421",
  // "CSC 431",
  // "CSC 472",
  // "CSC 475",
  // "CSC 476",
  // "CSC 499",
  // "CSC 531",
  // "CSC 532",
  // "CSC 533",
  // "CSC 551",
  // "CSC 552",
  // "CSC 553",
  // "CSC 554",
  // "CSC 571",
  // "CSC 572",
  // "CSC 573",
  // "CSC 574",
  // "CSC 575",
  // "CSC 581",
  // "CSC 582",
  // "CSC 583",
  // "CSC 584",
  // "CSC 599",
  "CSC 715",
  "CSC 712",
  "CSC 719",
  "CSC 722",
  "CSC 723",
  "CSC 725",
  "CSC 745",
  "CSC 776",
  "CSC 777",
  "MBC 715",
  "MBC 702",
  "MBC 705",
  "MBC 706",
  "MBC 707",
  "MBC 738",
  "JUMAT",
];

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const timeFrames = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

// Selecting lecturers
export const availableLecturers = [
  "Dr. Ayinla",
  "Dr. Ayinla_2",
  "Dr. Ayinla_3",
  "Dr. Woods",
  "Dr. Woods_2",
  "Dr. Woods_3",
];

// Selecting days
export const availableDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Updated = () => {
  let claims = JSON.parse(localStorage.getItem("claims"));
  const BaseUrl = "https://cms-api-o973.onrender.com";
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [lecturer, setLecturer] = useState([]);
  const [astLecturer, setAstLecturer] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [population, setPopulation] = useState("");
  const [manualVenue, setManualVenue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [newCourseData, setNewCourseData] = useState([]);
  const [allocatedTimetable, setAllocatedTimetable] = useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetch(`${BaseUrl}/api/v1/venue`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVenues(data.data);
      });
  }, []);
  useEffect(() => {
    fetch(`${BaseUrl}/api/v1/timetable/?creator=${claims.userName}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCourseData(data.data);
      });
  }, []);
//   useEffect(() => {
//     fetch(`${BaseUrl}/api/v1/lecturers/?department=${claims.department}`)
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//           setLecturer(data.data);
//       });
//   }, []);
//   useEffect(() => {
//     fetch(`${BaseUrl}/api/v1/courses/?department=${claims.department}`)
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//           setCourse(data.data);
//       });
//   }, []);

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

  const clearForm = () => {
    setCourse("");
    setLecturer([]);
    setAstLecturer([]);
    setDay("");
    setStartTime("");
    setFinishTime("");
    setPopulation("");
    setManualVenue("");
    setDate("");
  };
  // Function for adding a new course for examination/test
  const addExamCourse = (e) => {
    e.preventDefault();
    if (
      course !== "" &&
      lecturer !== "" &&
      astLecturer !== "" &&
      startTime !== "" &&
      finishTime !== "" &&
      day !== "" &&
      population !== ""
    ) {
      if (manualVenue !== "") {
        setNewCourseData([
          ...newCourseData,
          {
            course: course,
            supervisors: lecturer,
            assisting_supervisors: astLecturer,
            start_time: startTime,
            end_time: finishTime,
            day: day,
            capacity: population,
            venue: manualVenue,
            date: value == 0 ? date : null,
          },
        ]);
      } else {
        setNewCourseData([
          ...newCourseData,
          {
            course: course,
            supervisors: lecturer,
            assisting_supervisors: astLecturer,
            start_time: startTime,
            end_time: finishTime,
            day: day,
            capacity: population,
            date: value == 0 ? date : null,
          },
        ]);
      }

      if (newCourseData.length <= 1) {
        Swal.fire({
          title: "Success!",
          text:
            "Course has been added. Now you can keep adding as much as you want.",
          icon: "success",
          confirmButtonText: "Thanks",
        });
        clearForm();
      } else {
        Swal.fire({
          title: "Success!",
          text: "Course has been added!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        clearForm();
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Kindly fill all fields 😒",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  // Function for adding a new course for Semester
  const addSemesterCourse = (e) => {
    e.preventDefault();
    if (
      course !== "" &&
      startTime !== "" &&
      finishTime !== "" &&
      day !== "" &&
      population !== ""
    ) {
      if (manualVenue !== "") {
        setNewCourseData([
          ...newCourseData,
          {
            course: course,
            start_time: startTime,
            end_time: finishTime,
            day: day,
            capacity: population,
            venue: manualVenue,
          },
        ]);
      } else {
        setNewCourseData([
          ...newCourseData,
          {
            course: course,
            start_time: startTime,
            end_time: finishTime,
            day: day,
            capacity: population,
          },
        ]);
      }

      if (newCourseData.length <= 1) {
        Swal.fire({
          title: "Success!",
          text:
            "Course has been added. Now you can keep adding as much as you want.",
          icon: "success",
          confirmButtonText: "Thanks",
        });
        clearForm();
      } else {
        Swal.fire({
          title: "Success!",
          text: "Course has been added!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        clearForm();
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Kindly fill all fields 😒",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const handleFinish = (e) => {
    e.preventDefault();
    if (newCourseData.length >= 1 && title !== "") {
      Swal.fire({
        title: "Are you done?",
        text: "Have you added all courses for this timetable? 😏",
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "Yes I have 🙂",
        denyButtonText: `Ooops🤭`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          allocateVenues();
          setTitle("");
        } else if (result.isDenied) {
          // Do nothing
        }
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Kindly add at least a course and a title 😒",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  // Function for removing a course
  const deleteTimetable = (id, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this timetable ?",
      icon: "info",
      showDenyButton: true,
      confirmButtonText: "Yes delete 🙂",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(`${BaseUrl}/api/v1/timetable/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            Swal.fire({
              title: "Success!",
              text: "Timetable has been deleted!",
              icon: "success",
              confirmButtonText: "Close",
            });
            courseData.splice(index, 1);
          });
      } else if (result.isDenied) {
        // Do nothing
      }
    });
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

    const updatedAllocatedTimetable = newCourseData.map((row) => {
      const {
        course,
        supervisors,
        assisting_supervisors,
        start_time,
        end_time,
        day,
        capacity,
        venue,
        date,
      } = row;
      const availableVenues = [];

      for (const venue of venues) {
        if (capacity <= venue.capacity) {
          const bookingsForVenue = venueBookings[day][venue.name] || [];
          bookingsForVenue.sort((a, b) => a.end_time - b.end_time);

          // Check if the course's start time is after the previous course's end time
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
        bookingsForVenue.push({
          course,
          supervisors,
          assisting_supervisors,
          start_time,
          end_time,
        });
        console.log(manualVenue);
        manualVenue !== ""
          ? console.log(manualVenue)
          : console.log(selectedVenue.name);
        return {
          course,
          supervisors,
          assisting_supervisors,
          start_time,
          end_time,
          day,
          capacity,
          venue: venue ? venue : selectedVenue.name,
          date,
        };
      }

      return {
        course,
        supervisors,
        assisting_supervisors,
        start_time,
        end_time,
        day,
        capacity,
        venue: "Not available",
        date,
      };
    });
    if (updatedAllocatedTimetable != []) {
      let payload = {
        title: title,
        courses: updatedAllocatedTimetable,
        department: claims.department,
        createdBy: claims.userName,
        type: value == 0 ? "Examination/Test" : "Semester",
      };
      console.log(payload);
      fetch(`${BaseUrl}/api/v1/timetable/create`, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status == "Ok") {
            Swal.fire({
              title: "Success!",
              text: data.message,
              icon: "success",
              confirmButtonText: "Thanks",
            });
            setAllocatedTimetable(updatedAllocatedTimetable);
            setShowForm(false);
          } else {
            Swal.fire({
              title: "Error!",
              text: data.message,
              icon: "error",
              confirmButtonText: "Close",
            });
          }
        });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Kindly input course",
        icon: "error",
        confirmButtonText: "Close",
      });
    }

    console.log(updatedAllocatedTimetable);
  };

  const names = [
    "Dr. Ayinla",
    "Dr. Woods",
    "Dr. HTML",
    "Dr. php",
    "Dr. C++",
    "Dr. Python",
    "Dr. Machine Learning",
  ];
  // const [personName, setLecturer] = useState([]);
  const handleChangeLecturer = (event) => {
    const {
      target: { value },
    } = event;
    setLecturer(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeAtLecturer = (event) => {
    const {
      target: { value },
    } = event;
    setAstLecturer(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="container_2">
      <Navbar />
      <h1 style={{ marginTop: "50px" }}>
        Welcome To The Course Management System!
      </h1>
      <div className="details">
        <CourseUpload />
        <UploadLecturers />
        <UploadAsstLecturers />
      </div>

      <div className="timetable__container">
        {courseData.length <= 0 && !showForm && (
          <div className="timetable__notimetable">
            <div className="timetable__notimetable-imgdiv">
              <img src={emptyFolder} alt="empty folder" />
            </div>
            <h2>You don&#39;t have any timetable!!</h2>
            <button
              onClick={() => {
                setShowForm(true);
              }}
            >
              Create One
            </button>
          </div>
        )}
        {showForm && (
          <form action="" className="timetable__form">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Examination/Test Timetable" {...a11yProps(0)} />
                <Tab label="Semester Timetable" {...a11yProps(1)} />
              </Tabs>
            </Box>

            <div className="timetable__form-wrapper">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                value={title}
                placeholder=""
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <p className="timetable__course-text">
              Add all courses for this timetable
            </p>
            <div className="timetable__form-courses">
              <div className="timetable__form-wrapper">
                <label htmlFor="">Course</label>
                <select
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value);
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
              {value == 0 && (
                <div className="timetable__form-wrapper">
                  <label htmlFor="">For Department ONLY!!</label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => {
                      setCourse(e.target.value);
                    }}
                  />
                </div>
              )}
              {value == 0 && (
                <div className="timetable__form-wrapper-mui">
                  <label htmlFor="">Lecturer</label>
                  <Select
                    multiple
                    value={lecturer}
                    onChange={handleChangeLecturer}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={lecturer.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <select
                    value={lecturer}
                    onChange={(e) => {
                      setLecturer(e.target.value);
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
                  </select> */}
                </div>
              )}
              {value == 0 && (
                <div className="timetable__form-wrapper-mui">
                  <label htmlFor="">Assisting Staff</label>
                  <Select
                    multiple
                    value={astLecturer}
                    onChange={handleChangeAtLecturer}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={astLecturer.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                // <div className="timetable__form-wrapper">
                //   <label htmlFor="">Assisting Staff</label>
                //   <input
                //     type="text"
                //     value={astLecturer}
                //     onChange={(e) => {
                //       setAstLecturer(e.target.value);
                //     }}
                //   />
                // </div>
              )}

              <div className="timetable__form-wrapper">
                <label htmlFor="">Start Time</label>
                <input
                  type="time"
                  id="stimepicker"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                />
              </div>
              <div className="timetable__form-wrapper">
                <label htmlFor="">Finish Time</label>
                <input
                  type="time"
                  id="ftimepicker"
                  value={finishTime}
                  onChange={(e) => {
                    setFinishTime(e.target.value);
                  }}
                />
              </div>
              <div className="timetable__form-wrapper">
                <label htmlFor="">Day</label>
                <select
                  name=""
                  id=""
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
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
              </div>
              {value == 0 && (
                <div className="timetable__form-wrapper">
                  <label htmlFor="">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </div>
              )}
              <div className="timetable__form-wrapper">
                <label htmlFor="">Population</label>
                <input
                  type="number"
                  value={population}
                  onChange={(e) => {
                    setPopulation(e.target.value);
                  }}
                />
              </div>
              <div className="timetable__form-wrapper">
                <label htmlFor="">Venue(optional)</label>
                <input
                  type="text"
                  value={manualVenue}
                  onChange={(e) => {
                    setManualVenue(e.target.value);
                  }}
                />
              </div>
              <div className="timetable__form-buttonDiv">
                <button
                  onClick={() => {
                    setShowForm(true);
                  }}
                >
                  Close
                </button>
                <button
                  onClick={value == 0 ? addExamCourse : addSemesterCourse}
                >
                  Add course
                </button>
                <button onClick={handleFinish}>Finish</button>
              </div>
            </div>
          </form>
        )}
        {courseData.length > 0 && !showForm && (
          <h2 className="timtable__title">Timetables</h2>
        )}
        {courseData.length > 0 && !showForm && (
          <div className="timetable__grid">
            <div
              className="timetable__grid-card timetable__create"
              onClick={() => {
                setShowForm(true);
              }}
            >
              <h4>create a new Timetable +</h4>
            </div>
            {courseData.map((course, index) => (
              <div className="timetable__grid-card" key={index}>
                <div>
                  <h2>{course.title}</h2>
                  <div className="timetable__form-buttonDiv">
                    <button
                      onClick={() => {
                        navigate(`/admin/timetable/${course._id}`);
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/admin/timetable/edit/${course._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteTimetable(course._id, index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Updated;
