import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import './timetableDetails.css'
import { useParams } from 'react-router'
import {formatTime, export2Word} from './updated '
const TimetableDetails = () => {
     const BaseUrl = 'https://cms-api-o973.onrender.com';
     let params = useParams()
     const [timetable, setTimetable] = useState({});
     useEffect(() => {
          fetch(`${BaseUrl}/api/v1/timetable/${params.id}`).then(res => {return res.json()}).then((data) => {
               console.log(data.data)
               setTimetable(data.data)

          })
     }, [])
     
  return (
    <div>
          <Navbar />
          {timetable !== {} &&(<div id={'content'} className = 'timtable__details-container' >
               <h3>{timetable.title}</h3>
               <table style={{width: "100%",borderCollapse: "collapse",marginTop: "20px",}}className="timetable">
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
                         </tr>
                    ))}
                    </tbody>
               </table>
                         <button onClick={() => {export2Word(`content`, "Timetable");}}>
                              Export to DOCX
                         </button>
          </div>)}
    </div>
  )
}

export default TimetableDetails