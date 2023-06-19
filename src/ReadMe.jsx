import React from "react";
import Swal from "sweetalert2";

function ReadMe() {
  const Read = () => {
    Swal.fire({
      title: "Note!",
      text: "(1.) Please know that this CGPA Calculator uses 4.0 scale. \n (2.) To calculate your GPA for a semester, kindly remove those courses not for that semester.",
      icon: "info",
      confirmButtonText: "Okay",
    });
  };

  return (
    <div>
      <button className="readMe" onClick={Read}>
        Read Me!
      </button>
    </div>
  );
}

export default ReadMe;
