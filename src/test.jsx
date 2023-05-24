import React, { useState } from 'react';

function App() {
  const [timetable, setTimetable] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
  };

  const handleFileRead = (event) => {
    const csvData = event.target.result;
    const parsedData = parseCSV(csvData);
    const allocatedTimetable = allocateVenues(parsedData);
    setTimetable(allocatedTimetable);
  };

  const parseCSV = (csvData) => {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      if (row.length === headers.length) {
        const rowData = {};
        for (let j = 0; j < headers.length; j++) {
          rowData[headers[j]] = row[j];
        }
        data.push(rowData);
      }
    }

    return data;
  };

  const allocateVenues = (data) => {
    const venues = { KDLT: 100, NFLT: 250, CBN: 1000, FLT: 1200 };
    const venueBookings = {
      Monday: { CBN: [], KDLT: [], NFLT: [], FLT: [] },
      Tuesday: { CBN: [], KDLT: [], NFLT: [], FLT: [] },
      Wednesday: { CBN: [], KDLT: [], NFLT: [], FLT: [] },
      Thursday: { CBN: [], KDLT: [], NFLT: [], FLT: [] },
      Friday: { CBN: [], KDLT: [], NFLT: [], FLT: [] },
    };

    const allocatedTimetable = data.map((row) => {
      const { course, supervisors, start_time, end_time, day, capacity } = row;
      const availableVenues = [];

      for (const venue in venues) {
        if (capacity <= venues[venue]) {
          const bookingsForVenue = venueBookings[day][venue];
          bookingsForVenue.sort((a, b) => a.end_time - b.end_time);
          if (!bookingsForVenue.length || bookingsForVenue[bookingsForVenue.length - 1].end_time <= start_time) {
            availableVenues.push(venue);
          }
        }
      }

      if (availableVenues.length > 0) {
        const venue = availableVenues[0];
        venueBookings[day][venue].push({ start_time, end_time });
        return { ...row, venue };
      } else {
        return { ...row, venue: 'None' };
      }
    });

    return allocatedTimetable;
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

  return (
    <div className="container_2">
      <h1>Welcome to the Course Management System!</h1>
      <p>Please upload the CSV file:</p>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {timetable.length > 0 && (
        <div id="content">
          <h2>Course Management</h2>
          <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px'}} className="timetable">
            <thead>
              <tr>
                <th style={{padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2'}}>Course</th>
                <th style={{padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2'}}>Supervisors</th>
                <th style={{padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2'}}>Start Time</th>
                <th style={{padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2'}}>End Time</th>
                <th style={{padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2'}}>Day</th>
                <th style={{padding: '10px', border: '1px solid #ccc', backgroundColor: '#f2f2f2'}}>Venue</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((row, index) => (
                <tr key={index}>
                  <td style={{padding: '10px', border: '1px solid #ccc'}}>{row.course}</td>
                  <td style={{padding: '10px', border: '1px solid #ccc'}}>{row.supervisors}</td>
                  <td style={{padding: '10px', border: '1px solid #ccc'}}>{row.start_time}</td>
                  <td style={{padding: '10px', border: '1px solid #ccc'}}>{row.end_time}</td>
                  <td style={{padding: '10px', border: '1px solid #ccc'}}>{row.day}</td>
                  <td style={{padding: '10px', border: '1px solid #ccc'}}>{row.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button onClick={() => {export2Word('content', 'Timetable')}}>Export to DOCX</button>
    </div>
  );
}

export default App;
