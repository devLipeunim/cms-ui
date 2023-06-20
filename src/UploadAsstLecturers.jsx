import React, { useState } from "react";
// import axios from 'axios';

const UploadAsstLecturers = () => {
  const [file, setFile] = useState(null);
  const [uploadedcourses, setUploadedCourses] = useState([]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split("\n");
      const uploadedCourses = lines.filter((line) => line.trim() !== "");
      setUploadedCourses(uploadedCourses);
    };

    reader.readAsText(uploadedFile);
  };

  // Handle form submission
  const handleSubmitUpload = (event) => {
    event.preventDefault();

    // Send courses to the database
    axios
      .post("http://your-api-endpoint", { uploadedcourses })
      .then((response) => {
        console.log(response.data); // Handle success
      })
      .catch((error) => {
        console.log(error); // Handle error
      });

    setFile(null);
    setUploadedCourses([]);
  };

  return (
    <div>
      {/* <h4>Course Upload</h4> */}
      <form onSubmit={handleSubmitUpload}>
        <div className="uploadFiles">
          <input type="file" onChange={handleFileUpload} />
          <button type="submit" disabled={!file}>
            Submit Asst.Staff
          </button>
        </div>
      </form>
      {/* {uploadedcourses.length > 0 && (
        <div>
          <h4>Uploaded Courses:</h4>
          <ul>
            {uploadedcourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default UploadAsstLecturers ;
