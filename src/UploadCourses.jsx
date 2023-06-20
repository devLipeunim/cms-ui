import React, { useState } from "react";
import Swal from "sweetalert2";
const BaseUrl = "https://cms-api-o973.onrender.com";
const CourseUpload = () => {
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
     let formatedCourses = uploadedcourses.map((course) => {
          return {name: course}
     })
     let payload ={
          courses:formatedCourses
     }
    if(uploadedcourses !== [ ]){
          fetch(`${BaseUrl}/api/v1/courses/create`, {
               headers:{
                    'content-type':'application/json'
               },
               method: 'POST',
               body: JSON.stringify(payload)
          }).then(res => {return res.json()}).then((result) => {
               if(result.status === 'Ok'){
                    Swal.fire({
                         title: 'Success!',
                         text: result.message,
                         icon: 'success',
                         confirmButtonText: 'Thanks'
                    })
                    setFile(null);
                    setUploadedCourses([]);
               }else{
                    Swal.fire({
                         title: 'Error!',
                         text: result.message,
                         icon: 'error',
                         confirmButtonText: 'close'
                    })
                    setFile(null);
                    setUploadedCourses([]);
               }
          })
    }else{
          Swal.fire({
               title: 'Error!',
               text: "Your file is empty. Please choose one if you haven't already",
               icon: 'info',
          })
          setFile(null);
          setUploadedCourses([]);
    }

  };

  return (
    <div>
      {/* <h4>Course Upload</h4> */}
      <form onSubmit={handleSubmitUpload}>
        <div className="uploadFiles">
          <input type="file" onChange={handleFileUpload} />
          <button type="submit" disabled={!file}>
            Submit Courses
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

export default CourseUpload;
