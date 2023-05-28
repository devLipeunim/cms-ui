import React, { useState } from "react";
import Me from "./assets/Me.png";

const ProgramCodes = () => {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(!showContent);
  };

  const handleClose = () => {
    setShowContent(false);
  };

  return (
    <div>
      <button onClick={handleClick}>Program Codes</button>
      {showContent && (
        <div id="popUp" className="modal">
          <div className="modal-content codes">
            <div className="newsletter">
              <div className="newsletter-header">
                <img src={Me} alt="Profile_pic" />
                <h3 className="newsletter-title">Lipeunim</h3>
                <p className="newsletter-desc">
                  <b>
                    This program is a Course Management System implemented using
                    the React JavaScript library. It allows users to manage
                    courses, venues, and their allocations. The system helps in
                    scheduling courses and allocating suitable venues based on
                    the course requirements and venue availability.
                  </b>
                  <br />
                  <br />
                  The program consists of various state variables managed using
                  the &#39;useState hook&#39;. Here is a breakdown of the major
                  parts of the program:
                  <p className="detail_sections">
                    <ol>
                      <li>
                        <b>State variables:</b>
                        <ul>
                          <li>
                            <b>&#34;venues&#34;</b>: It represents a list of
                            available venues with their names and capacities.
                          </li>
                          <li>
                            <b>&#34;courseData&#34;</b>: It represents the
                            course data, including courses, lecturers,
                            assisting-lecturers, start time, finish time, day,
                            and population of the students.
                          </li>
                          <li>
                            <b>&#34;allocatedTimetable&#34;</b>: It stores the
                            allocated timetable, which includes the course
                            details along with the assigned venue.
                          </li>
                          <li>
                            <b>&#34;newVenue&#34;</b>: It represents the form
                            for adding or editing a venue, including the name
                            and capacity.
                          </li>
                          <li>
                            <b>&#34;editIndex&#34;</b>: It keeps track of the
                            index of the venue being edited.
                          </li>
                        </ul>
                      </li>
                      <li>
                        <b>Handler functions:</b>
                        <ul>
                          <li>
                            <b>&#34;handleCourseChange&#34;</b>: It is a handler
                            function for updating the course data when a user
                            modifies a course field.
                          </li>
                          <li>
                            <b>&#34;handleVenueChange&#34;</b>: It is a handler
                            function for updating the venue data when a user
                            modifies a venue field.
                          </li>
                          <li>
                            <b>&#34;export2Word&#34;</b>: It is a function for
                            exporting HTML content to a Word document.
                          </li>
                          <li>
                            <b>&#34;addCourse&#34;</b>: It adds a new course
                            entry to the &#39;courseData&#39; state variable.
                          </li>
                          <li>
                            <b>&#34;removeCourse&#34;</b>: It removes a course
                            entry from the &#39;courseData&#39; state variable
                            based on the index.
                          </li>
                          <li>
                            <b>&#34;addVenue&#34;</b>: It adds a new venue with
                            its capacity to the &#39;venues&#39; state variable.
                          </li>
                          <li>
                            <b>&#34;editVenue&#34;</b>: It sets the index of the
                            venue being edited and updates the
                            &#39;newVenue&#39; state variable with the
                            venue&#39;s data.
                          </li>
                          <li>
                            <b>&#34;handleVenueRemove&#34;</b>: It removes a
                            venue from the &#39;venues&#39; state variable based
                            on the index.
                          </li>
                          <li>
                            <b>&#34;updateVenue&#34;</b>: It updates the venue
                            at the specified index with the new data provided in
                            the &#39;newVenue&#39; state variable.
                          </li>
                          <li>
                            <b>&#34;formatTime&#34;</b>: It converts a time in
                            24-hour format to 12-hour format with AM/PM
                            indication.
                          </li>
                          <li>
                            <b>&#34;allocateVenues&#34;</b>: It allocates venues
                            to the courses based on their schedule and capacity.
                            It updates the &#39;allocatedTimetable&#39; state
                            variable with the allocated timetable.
                          </li>
                        </ul>
                      </li>
                      <li>
                        <b>Selecting options:</b>
                        <ul>
                          <li>
                            <b>&#34;availableCourses&#34;</b>: It represents the
                            available courses that can be selected from a
                            dropdown menu.
                          </li>
                          <li>
                            <b>&#34;availableLecturers&#34;</b>: It represents
                            the available lecturers that can be selected from a
                            dropdown menu.
                          </li>
                          <li>
                            <b>&#34;availableDays&#34;</b>: It represents the
                            available days of the week that can be selected from
                            a dropdown menu.
                          </li>
                        </ul>
                      </li>
                    </ol>
                  </p>
                </p>
                <button onClick={handleClose} className="check">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramCodes;
