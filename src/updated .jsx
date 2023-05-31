import React, { useState } from 'react';

const Updated = () => {
  const [venues, setVenues] = useState([
    { name: 'KDLT', capacity: 100 },
    { name: 'NFLT', capacity: 250 },
    { name: 'CBN', capacity: 1000 },
    { name: 'FLT', capacity: 1200 },
  ]);

  const [courseData, setCourseData] = useState([]);
  const [allocatedTimetable, setAllocatedTimetable] = useState([]);

  const [newVenue, setNewVenue] = useState({ name: '', capacity: 0 });
  const [editIndex, setEditIndex] = useState(-1);

  const handleCourseChange = (index, field, value) => {
    const updatedCourseData = [...courseData];
    updatedCourseData[index][field] = value;
    setCourseData(updatedCourseData);
  };

  const handleVenueChange = (index, field, value) => {
    const updatedVenues = [...venues];
    updatedVenues[index][field] = value;
    setVenues(updatedVenues);
  };

  function export2Word(element, filename = '') {
     var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
     var postHtml = "</body></html>";
     var html = preHtml + document.getElementById(element).innerHTML + postHtml;
 
     var blob = new Blob(['\ufeff', html], {
       type: 'application/msword',
     });
 
     // Specify link url
     var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
 
     // Specify file name
     filename = filename ? filename + '.doc' : 'document.doc';
 
     // Create download link element
     var downloadLink = document.createElement('a');
 
     document.body.appendChild(downloadLink);
 
     if (navigator.msSaveOrOpenBlob) {
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

  const addCourse = () => {
    setCourseData([...courseData, { course: '', supervisors: 0, start_time: 0, end_time: 0, day: '', capacity: 0 }]);
  };

  const removeCourse = (index) => {
    const updatedCourseData = [...courseData];
    updatedCourseData.splice(index, 1);
    setCourseData(updatedCourseData);
  };

  const addVenue = () => {
     if(newVenue.name !== '' && newVenue.capacity!== 0){
          setVenues([...venues, { name: newVenue.name, capacity: newVenue.capacity }]);
          setNewVenue({ name: '', capacity: 0 });
     }else{
          alert('kindly input venue name and capacity.')
     }
    
  };

  const editVenue = (index) => {
    setEditIndex(index);
    const { name, capacity } = venues[index];
    setNewVenue({ name, capacity });
  };

  const updateVenue = () => {
    const updatedVenues = [...venues];
    updatedVenues[editIndex] = { name: newVenue.name, capacity: newVenue.capacity };
    setVenues(updatedVenues);
    setNewVenue({ name: '', capacity: 0 });
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
          const bookingsForVenue = venueBookings[day][venue.name];
          console.log(bookingsForVenue)
          bookingsForVenue.sort((a, b) => a.end_time - b.end_time);
          if (!bookingsForVenue.length || bookingsForVenue[bookingsForVenue.length - 1].end_time <= start_time) {
            availableVenues.push(venue);
          }
        }
      }

      if (availableVenues.length > 0) {
        const selectedVenue = availableVenues[0];
        const bookingsForVenue = venueBookings[day][selectedVenue.name];
        bookingsForVenue.push({ course, supervisors, start_time, end_time });
        return { course, supervisors, start_time, end_time, day, capacity, venue: selectedVenue.name };
      }

      return { course, supervisors, start_time, end_time, day, capacity, venue: 'Not available' };
    });

    setAllocatedTimetable(updatedAllocatedTimetable);
  };

  return (
    <div>
      <h1>Course Details</h1>
      {venues.length > 0 && (
        <div>
          <h2>Available Venues</h2>
          <table>
            <thead>
              <tr>
                <th>Venue</th>
                <th>Capacity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue, index) => (
                <tr key={index}>
                  <td>{venue.name}</td>
                  <td>{venue.capacity}</td>
                  <td>
                    <button onClick={() => editVenue(index)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <h2>Add/Edit Venue</h2>
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
          onChange={(e) => setNewVenue({ ...newVenue, capacity: parseInt(e.target.value) })}
        />
        {editIndex !== -1 ? (
          <button onClick={updateVenue}>Update Venue</button>
        ) : (
          <button onClick={addVenue}>Add Venue</button>
        )}
      </div>
      <h2>Add Course</h2>
      {courseData.map((course, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Course"
            value={course.course}
            onChange={(e) => handleCourseChange(index, 'course', e.target.value)}
          />
          <input
            type="number"
            placeholder="Supervisors"
            value={course.supervisors}
            onChange={(e) => handleCourseChange(index, 'supervisors', parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="Start Time"
            value={course.start_time}
            onChange={(e) => handleCourseChange(index, 'start_time', parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="End Time"
            value={course.end_time}
            onChange={(e) => handleCourseChange(index, 'end_time', parseInt(e.target.value))}
          />
          <input
            type="text"
            placeholder="Day"
            value={course.day}
            onChange={(e) => handleCourseChange(index, 'day', e.target.value)}
          />
          <input
            type="number"
            placeholder="Capacity"
            value={course.capacity}
            onChange={(e) => handleCourseChange(index, 'capacity', parseInt(e.target.value))}
          />
          <button onClick={() => removeCourse(index)}>Remove</button>
        </div>
      ))}
      <button onClick={addCourse}>Add Course</button>
      <button onClick={allocateVenues}>Allocate Venues</button>
      {allocatedTimetable.length > 0 && (
        <div id='content'>
          <h2>Allocated Timetable</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }} className="timetable">
            <thead>
              <tr>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2' }}>Course</th>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2' }}>Supervisors</th>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2' }}>Start Time</th>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2' }}>End Time</th>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2' }}>Day</th>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2' }}>Venue</th>
              </tr>
            </thead>
            <tbody>
              {allocatedTimetable.map((row, index) => (
                <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{row.course}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{row.supervisors}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{row.start_time}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{row.end_time}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{row.day}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{row.venue}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      { allocatedTimetable.length > 0 && <button onClick={() => { export2Word('content', 'Timetable') }}>Export to DOCX</button>}
    </div>
  );
};

export default Updated;
         