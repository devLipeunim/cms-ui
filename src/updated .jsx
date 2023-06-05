import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ProgramUx from "./Program_ux";
import ProgramCodes from "./Program_codes";
import Navbar from "./Navbar";
import Swal from 'sweetalert2';
import emptyFolder from './assets/empty-folder.svg'
import './index.css';
import './timetable.css'


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
     "MAT 102",
     "PHY 102",
     "CHE 102",
     "PSY 102",
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

const Updated = () => {
     let claims = JSON.parse(localStorage.getItem('claims'))
     const BaseUrl = 'https://cms-api-o973.onrender.com'
     const navigate = useNavigate()

  const [venues, setVenues] = useState([]);
  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [lecturer, setLecturer] = useState('')
  const [astLecturer, setAstLecturer] = useState('')
  const [startTime, setStartTime] = useState('')
  const [finishTime, setFinishTime] = useState('')
  const [day, setDay] = useState('')
  const [population, setPopulation] = useState('')
  const [manualVenue, setManualVenue] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [courseData, setCourseData] = useState([]);
  const [newCourseData, setNewCourseData] = useState([])
  const [allocatedTimetable, setAllocatedTimetable] = useState([]);
  useEffect(() => {
     fetch(`${BaseUrl}/api/v1/venue`).then(res => {return res.json()}).then((data) => {
          setVenues(data.data);
     })
  }, [])
  useEffect(() => {
     fetch(`${BaseUrl}/api/v1/timetable/?creator=${claims.userName}`).then(res => {return res.json()}).then((data) => {
          setCourseData(data.data);
     })
  }, [])
  


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
     setCourse(""); setLecturer(''); setAstLecturer(""); setDay(""); setStartTime(""); setFinishTime(""); setPopulation(""); setManualVenue("");
  }
  // Function for adding a new course
  const addCourse = (e) => {
     e.preventDefault()
     if(course!=='' && lecturer!=='' && astLecturer!=='' && startTime!=='' && finishTime !=='' && day !== '' && population !== ''){
          if(manualVenue !== ''){
               setNewCourseData([
                    ...newCourseData,
                    {
                      course: course,
                      supervisors:lecturer,
                      assisting_supervisors:astLecturer,
                      start_time: startTime,
                      end_time: finishTime,
                      day: day,
                      capacity: population,
                      venue: manualVenue
                    },
               ]);
          }else{
               setNewCourseData([
                    ...newCourseData,
                    {
                      course: course,
                      supervisors:lecturer,
                      assisting_supervisors:astLecturer,
                      start_time: startTime,
                      end_time: finishTime,
                      day: day,
                      capacity: population,
                    },
               ]);
          }
          
         if(newCourseData.length <= 1){
               Swal.fire({
                    title: 'Success!',
                    text: 'Course has been added. Now you can keep adding as much as you want.',
                    icon: 'success',
                    confirmButtonText: 'Thanks'
               })
               clearForm();
         }else{
          Swal.fire({
               title: 'Success!',
               text: 'Course has been added!',
               icon: 'success',
               confirmButtonText: 'Ok'
          })
          clearForm();
         }
     }else{
          Swal.fire({
               title: 'Error!',
               text: 'Kindly fill all fields 😒',
               icon: 'error',
               confirmButtonText: 'Close'
          })
     }
  };

  const handleFinish = (e) => {
     e.preventDefault();
     if(newCourseData.length >= 1 && title !==''){
          Swal.fire({
               title: 'Are you done?',
               text: 'Have you added all courses for this timetable? 😏',
               icon: 'info',
               showDenyButton: true,
               confirmButtonText: 'Yes I have 🙂',
               denyButtonText: `Ooops🤭`,
             }).then((result) => {
               /* Read more about isConfirmed, isDenied below */
               if (result.isConfirmed) {
                 allocateVenues();
                 setTitle("")
               } else if (result.isDenied) {
                    // Do nothing
               }
          })
    }else{
          Swal.fire({
               title: 'Error!',
               text: 'Kindly add at least a course and a title 😒',
               icon: 'error',
               confirmButtonText: 'Close'
          })
    }
    
  }

  // Function for removing a course
  const deleteTimetable = (id, index) => {
     Swal.fire({
          title: 'Are you sure?',
          text: 'You want to delete this timetable ?',
          icon: 'info',
          showDenyButton: true,
          confirmButtonText: 'Yes delete 🙂',
          denyButtonText: `Cancel`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
               fetch(`${BaseUrl}/api/v1/timetable/delete/${id}`,{
                    method: 'DELETE'
               }).then(res => {return res.json()}).then((data) => {
                    Swal.fire({
                         title: 'Success!',
                         text: 'Timetable has been deleted!',
                         icon: 'success',
                         confirmButtonText: 'Close'
                    })
                    courseData.splice(index, 1)
               })
          } else if (result.isDenied) {
               // Do nothing
          }
     })
     
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
        venue
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
        console.log(manualVenue)
        manualVenue !== '' ? console.log(manualVenue) : console.log(selectedVenue.name)
        return {
          course,
          supervisors,
          assisting_supervisors,
          start_time,
          end_time,
          day,
          capacity,
          venue: venue  ? venue : selectedVenue.name,
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
      };
    });
     if(updatedAllocatedTimetable != [ ]){
          let payload={
               title: title,
               courses: updatedAllocatedTimetable,
               department: claims.department,
               createdBy: claims.userName
          }
          console.log(payload)
         fetch(`${BaseUrl}/api/v1/timetable/create`,{
               headers:{
                    'content-type':'application/json'
               },
               method: 'POST',
               body: JSON.stringify(payload)
         }).then(res =>{return res.json()}).then((data) => {
               if(data.status == 'Ok'){
                    Swal.fire({
                         title: 'Success!',
                         text: data.message,
                         icon: 'success',
                         confirmButtonText: 'Thanks'
                    })
                    setAllocatedTimetable(updatedAllocatedTimetable)
                    setShowForm(false);
               }else{
                    Swal.fire({
                         title: 'Error!',
                         text: data.message,
                         icon: 'error',
                         confirmButtonText: 'Close'
                    })
               }
         })
     }else{
          Swal.fire({
               title: 'Error!',
               text: "Kindly input course",
               icon: 'error',
               confirmButtonText: 'Close'
          })
     }

    
    
    console.log(updatedAllocatedTimetable)
  };

  

  return (
    <div className="container_2">
          <Navbar/>
      <h1 style={{marginTop: '50px'}}>Welcome To The Course Management System!</h1>
      <div className="details">
        <ProgramUx />
        <ProgramCodes />
      </div>      

      <div className="timetable__container">
             { (courseData.length<=0 && !showForm) && <div className="timetable__notimetable">
                    <div className="timetable__notimetable-imgdiv">
                         <img src={emptyFolder} alt="empty folder" />
                    </div>
                    <h2>You don&#39;t have any timetable!!</h2>
                    <button onClick={() => {setShowForm(true)}}>Create One</button>
               </div>}
              {showForm&&<form action="" className="timetable__form">
                    <div className="timetable__form-wrapper">
                         <label htmlFor="title">Title</label>
                         <input type="text" value={title} placeholder="" onChange={(e) => {setTitle(e.target.value)}} />
                    </div>
                    <p className="timetable__course-text">Add all courses for this timetable</p>
                    <div className="timetable__form-courses">
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Course</label>
                              <select value={course} onChange={(e) =>{setCourse(e.target.value)}}>
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
                              <select value={lecturer} onChange={(e) =>{setLecturer(e.target.value)}}>
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
                              <label htmlFor="">Assisting Lecturer</label>
                              <input type="text" value={astLecturer} onChange={(e) =>{setAstLecturer(e.target.value)}} />
                        </div>
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Start Time</label>
                              <input type="time" id="stimepicker" value={startTime} onChange={(e) =>{setStartTime(e.target.value)}} />
                        </div>
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Finish Time</label>
                              <input type="time" id="ftimepicker" value={finishTime} onChange={(e) =>{setFinishTime(e.target.value)}} />
                        </div>
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Day</label>
                             <select name="" id="" value={day} onChange={(e) =>{setDay(e.target.value)}}>
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
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Population</label>
                              <input type="number" value={population} onChange={(e) =>{setPopulation(e.target.value)}} />
                        </div>
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Venue(optional)</label>
                              <input type="text" value={manualVenue} onChange={(e) =>{setManualVenue(e.target.value)}} />
                        </div>
                        <div className="timetable__form-buttonDiv">
                         <button onClick={() => {setShowForm(true)}}>Close</button>
                         <button onClick={addCourse}>Add course</button>
                         <button onClick={handleFinish}>Finish</button>
                        </div>
                    </div>
               </form>}
               {(courseData.length>0 && !showForm)&&<h2 className="timtable__title">Timetables</h2>}
              {(courseData.length>0 && !showForm)&&<div className="timetable__grid">
                    <div className="timetable__grid-card timetable__create" onClick={() => {setShowForm(true)}}>
                         <h4>create a new Timetable</h4>
                    </div>
                    {
                         courseData.map((course, index) => (
                              <div className="timetable__grid-card" key={index}>
                                   <div>
                                        <h2>{course.title}</h2>
                                        <div className="timetable__form-buttonDiv">
                                             <button onClick={() => {navigate(`/admin/timetable/${course._id}`)}}>View</button>
                                             <button onClick={() => {navigate(`/admin/timetable/edit/${course._id}`)}}>Edit</button>
                                             <button onClick={() => {deleteTimetable(course._id, index)}}>Delete</button>
                                        </div>
                                   </div>
                              </div>
                         ))
                    }
              </div>}
      </div>

    </div>
  );
};

export default Updated;