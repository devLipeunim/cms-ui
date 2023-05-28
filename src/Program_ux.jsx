import React, { useState } from "react";
import Me from "./assets/Me.png";

const ProgramUx = () => {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(!showContent);
  };

  const handleClose = () => {
    setShowContent(false);
  };

  return (
    <div>
      <button onClick={handleClick}>Program UX</button>
      {showContent && (
        <div id="popUp" className="modal">
          <div className="modal-content">
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
                  The program displays a user interface with different sections:
                  <p className="detail_sections">
                    <ol>
                      <li>
                        The <b>&#34;Available Venues&#34;</b> section displays
                        the list of venues and their capacities in a table. It
                        allows users to edit or remove the venues.
                      </li>
                      <li>
                        The <b>&#34;Add/Edit Venue&#34;</b> section provides
                        input fields to add or edit a venue&#39;s name and
                        capacity. It includes buttons to either add a venue or
                        update a venue if edited.
                      </li>
                      <li>
                        The <b>&#34;Add Course&#34;</b> section displays a form
                        to add multiple courses. Users can select a course,
                        lecturer, day, start time, end time, and population of the students for
                        each course. Users can also remove courses using the
                        &#34;Remove&#34; button.
                      </li>
                      <li>
                        The <b>&#34;Allocate Venues</b>&#34; section includes
                        buttons to allocate venues based on the course data
                        entered.
                      </li>
                      <li>
                        The <b>&#34;Allocated Timetable</b>&#34; section
                        displays the allocated timetable for courses,.
                      </li>
                      <li>
                        And <b>Finally</b> users can export the allocated
                        timetable as a Word document..
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

export default ProgramUx;
