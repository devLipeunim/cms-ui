import React, {useState, useEffect} from 'react'
import Navbar from './Navbar';
import { useParams } from 'react-router'
import {formatTime, availableCourses, availableDays, availableLecturers} from './updated '
import Swal from 'sweetalert2';
function EditTimetable() {
     const BaseUrl = 'https://cms-api-o973.onrender.com'
     let params = useParams()
     const [venues, setVenues] = useState([]);
     const [timetable, setTimetable] = useState({});
     const[title, setTitle] = useState('')
     const [editCourse, setEditCourse] = useState('')
     const [editLecturer, setEditLecturer] = useState('')
     const [editAstLecturer, setEditAstLecturer] = useState('')
     const [editStartTime, setEditStartTime] = useState('')
     const [editFinishTime, setEditFinishTime] = useState('')
     const [editDay, setEditDay] = useState('')
     const [editPopulation, setEditPopulation] = useState('')
     const [showForm, setShowForm] = useState(false)
     const [courseData, setCourseData] = useState([]);
     const[editVenues, setEditVenues] = useState('')
     const [newVenue, setNewVenue] = useState({ name: "", capacity: "" });
     const [editIndex, setEditIndex] = useState(-1);
     const [editId, setEditId] = useState('');
      //state variables to track the edited venue's name and capacity:?
     const [editedVenueName, setEditedVenueName] = useState("");
     const [editedVenueCapacity, setEditedVenueCapacity] = useState("");
     useEffect(() => {
          fetch(`${BaseUrl}/api/v1/timetable/${params.id}`).then(res => {return res.json()}).then((data) => {
               console.log(data.data)
               setTimetable(data.data)
               setTitle(data.data.title)

          })
     }, [])



     const clearForm = () => {
          setEditCourse(""); setEditLecturer(''); setEditAstLecturer(""); setEditDay(""); setEditStartTime(""); setEditFinishTime(""); setEditPopulation("");
       }
       // Function for adding a new course
       const addCourse = (e) => {
          e.preventDefault()
          if(course!=='' && lecturer!=='' && astLecturer!=='' && startTime!=='' && finishTime !=='' && day !== '' && population !== ''){
               setCourseData([
                    ...courseData,
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
              if(courseData.length <= 1){
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




  // Function for adding a venue and its capacity
  const addVenue = () => {
     if (newVenue.name !== "" && newVenue.capacity !== 0) {
           let payload ={
                name: newVenue.name,
                capacity: newVenue.capacity
           }
           fetch(`${BaseUrl}/api/v1/venue/create`, {
                headers:{
                     'content-type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
           }).then(res => {return res.json()}).then((data) => {
                if (data.status === "Ok") {
                     Swal.fire({
                          title: 'Success!',
                          text: data.message,
                          icon: 'success',
                          confirmButtonText: 'Thanks'
                     })
                     setVenues([...venues, { name: newVenue.name, capacity: newVenue.capacity },]);
                     setNewVenue({ name: "", capacity: 0 });
                }else{
                     Swal.fire({
                          title: 'Error!',
                          text: data.message,
                          icon: 'error',
                          confirmButtonText: 'Close'
                     })
                }
           })
      } else {
           Swal.fire({
                title: 'Error!',
                text: "Kindly input venue and capacity",
                icon: 'error',
                confirmButtonText: 'Close'
           })
      }
   };

   // Function for editing a venue and its capacity
   const editVenue = (index, id) => {
     setEditIndex(index);
     setEditId(id)
     const { day, course, assisting_supervisors,supervisors,end_time,start_time,capacity, venue } = timetable.courses[index];
     console.log(timetable.courses[index])
     setEditDay(day); setEditCourse(course); setEditAstLecturer(assisting_supervisors); setEditLecturer(supervisors);setEditFinishTime(end_time);
     setEditedVenueCapacity(capacity); setEditStartTime(start_time); setEditPopulation(capacity); setEditVenues(venue)
     
   };
   // Function for removing a venue
   const handleVenueRemove = (index) => {
     const updatedVenues = [...venues];
     updatedVenues.splice(index, 1);
     setVenues(updatedVenues);
   };
   // Function for updating a venue and its capacity
   const updateVenue = () => {
     setNewVenue({  day:editDay, course:editCourse,  assisting_supervisors: editAstLecturer, supervisors: editLecturer, end_time:editFinishTime, start_time: editStartTime, capacity: editPopulation});
     timetable.courses[editIndex] = newVenue
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
    <div style={{marginTop: '130px', }}>
     <Navbar/>
          {timetable !== {} && (
        <div style={{padding: '50px 100px'}}>
          <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} style={{padding: '10px', border: '1px solid gray', borderRadius: '8px', fontSize:'20px', fontWeight: 900}} />
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
                                   rowSpan={timetable.courses.filter((c) => c.day === course.day).length}
                                   
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
                              <button onClick={() => editVenue(index)}>Edit</button>
                              <button >Remove</button>
                         </div>
                    </td>
                    </tr>
               ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="addVenues" style={{marginBottom: '20px'}}>
        <h3>Edit Timetable</h3>
        <div className="courseForm">
        <div className="timetable__form-wrapper">
                              <label htmlFor="">Course</label>
                              <select value={editCourse} onChange={(e) =>{setEditCourse(e.target.value)}}>
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
                              <select value={editLecturer} onChange={(e) =>{setEditLecturer(e.target.value)}}>
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
                              <input type="text" value={editAstLecturer} onChange={(e) =>{setEditAstLecturer(e.target.value)}} />
                        </div>
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Start Time</label>
                              <input type="time" id="stimepicker" value={editStartTime} onChange={(e) =>{setEditStartTime(e.target.value)}} />
                        </div>
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Finish Time</label>
                              <input type="time" id="ftimepicker" value={editFinishTime} onChange={(e) =>{setEditFinishTime(e.target.value)}} />
                        </div>
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Day</label>
                             <select name="" id="" value={editDay} onChange={(e) =>{setEditDay(e.target.value)}}>
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
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Population</label>
                              <input type="number" value={editPopulation} onChange={(e) =>{setEditPopulation(e.target.value)}} />
                        </div>
                        <div className="timetable__form-wrapper">
                              <label htmlFor="">Venue(optional)</label>
                              <input type="number" value={editVenues} onChange={(e) =>{setEditVenues(e.target.value)}} />
                        </div>
                        <div className="timetable__form-buttonDiv">
                         <button onClick={() => {setShowForm(true)}}>Close</button>
                         <button onClick={editVenue}>Save</button>
                         {/* <button onClick={handleFinish}>Finish</button> */}
                        </div>
        </div>

        {editIndex !== -1 ? (
          <button onClick={updateVenue}>Update Venue</button>
        ) : (
          <button onClick={addVenue}>Add Venue</button>
        )}
      </div>
    </div>
  )
}

export default EditTimetable