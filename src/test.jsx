import React, { useState } from 'react';
import { Document, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import * as docx from 'docx';

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
          if (
            !bookingsForVenue ||
            bookingsForVenue[bookingsForVenue.length - 1].end_time <= start_time
          ) {
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

  const generateDocx = () => {
    const doc = new Document();
    doc.addSection({
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun('HACKATHON PROJECT (GROUP 5 (Participants))'),
            new TextRun('\n'),
            new TextRun('1. ANIAH MOSES LIPEUNIM (230890), 2. OGHENEKOHWO OGHENEMARO OGHENEVWOKE (230907), 3. SANGOGADE AYOMIDE EPHRAIM (223322), 4. OLUWATOLA ENOCH ADEBAYO (230919), 5. OLOWE ANTHONY OLUBOBA (230916)'),
            new TextRun('\n'),
            new TextRun('EXAMINATION TIMETABLE'),
          ],
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('Course')] }),
                new TableCell({ children: [new Paragraph('Supervisors')] }),
                new TableCell({ children: [new Paragraph('Start Time')] }),
                new TableCell({ children: [new Paragraph('End Time')] }),
                new TableCell({ children: [new Paragraph('Day')] }),
                new TableCell({ children: [new Paragraph('Venue')] }),
              ],
            }),
            ...timetable.map((row) =>
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(row.course)] }),
                  new TableCell({ children: [new Paragraph(row.supervisors)] }),
                  new TableCell({ children: [new Paragraph(row.start_time)] }),
                  new TableCell({ children: [new Paragraph(row.end_time)] }),
                  new TableCell({ children: [new Paragraph(row.day)] }),
                  new TableCell({ children: [new Paragraph(row.venue)] }),
                ],
              })
            ),
          ],
        }),
      ],
    });

    const buffer = docx.Packer.toBuffer(doc);
    saveAs(new Blob([buffer]), 'exam_timetable.docx');
  };


  return (
    <div>
      <h1>Welcome to Course Management System!</h1>
      <p>Please upload the CSV file:</p>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {timetable.length > 0 && (
        <div>
          <h2>Examination Timetable</h2>
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Supervisors</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Day</th>
                <th>Venue</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((row, index) => (
                <tr key={index}>
                  <td>{row.course}</td>
                  <td>{row.supervisors}</td>
                  <td>{row.start_time}</td>
                  <td>{row.end_time}</td>
                  <td>{row.day}</td>
                  <td>{row.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={generateDocx}>Export to DOCX</button>
        </div>
      )}
    </div>
  );
}

export default App;
