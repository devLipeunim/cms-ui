import React, { useState } from "react";
import Me from "./assets/Me.png";

const ProgramCodes = () => {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(!showContent);
    var confetti = {
      maxCount: 150, //set max confetti count
      speed: 2, //set the particle animation speed
      frameInterval: 15, //the confetti animation frame interval in milliseconds
      alpha: 1.0, //the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
      gradient: false, //whether to use gradients for the confetti particles
      start: null, //call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
      stop: null, //call to stop adding confetti
      toggle: null, //call to start or stop the confetti animation depending on whether it's already running
      pause: null, //call to freeze confetti animation
      resume: null, //call to unfreeze confetti animation
      togglePause: null, //call to toggle whether the confetti animation is paused
      remove: null, //call to stop the confetti animation and remove all confetti immediately
      isPaused: null, //call and returns true or false depending on whether the confetti animation is paused
      isRunning: null, //call and returns true or false depending on whether the animation is running
    };

    (function () {
      confetti.start = startConfetti;
      confetti.stop = stopConfetti;
      confetti.toggle = toggleConfetti;
      confetti.pause = pauseConfetti;
      confetti.resume = resumeConfetti;
      confetti.togglePause = toggleConfettiPause;
      confetti.isPaused = isConfettiPaused;
      confetti.remove = removeConfetti;
      confetti.isRunning = isConfettiRunning;
      var supportsAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;
      var colors = [
        "rgba(30,144,255,",
        "rgba(107,142,35,",
        "rgba(255,215,0,",
        "rgba(255,192,203,",
        "rgba(106,90,205,",
        "rgba(173,216,230,",
        "rgba(238,130,238,",
        "rgba(152,251,152,",
        "rgba(70,130,180,",
        "rgba(244,164,96,",
        "rgba(210,105,30,",
        "rgba(220,20,60,",
      ];
      var streamingConfetti = false;
      var animationTimer = null;
      var pause = false;
      var lastFrameTime = Date.now();
      var particles = [];
      var waveAngle = 0;
      var context = null;

      function resetParticle(particle, width, height) {
        particle.color =
          colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
        particle.color2 =
          colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
        particle.x = Math.random() * width;
        particle.y = Math.random() * height - height;
        particle.diameter = Math.random() * 10 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = Math.random() * Math.PI;
        return particle;
      }

      function toggleConfettiPause() {
        if (pause) resumeConfetti();
        else pauseConfetti();
      }

      function isConfettiPaused() {
        return pause;
      }

      function pauseConfetti() {
        pause = true;
      }

      function resumeConfetti() {
        pause = false;
        runAnimation();
      }

      function runAnimation() {
        if (pause) return;
        else if (particles.length === 0) {
          context.clearRect(0, 0, window.innerWidth, window.innerHeight);
          animationTimer = null;
        } else {
          var now = Date.now();
          var delta = now - lastFrameTime;
          if (!supportsAnimationFrame || delta > confetti.frameInterval) {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            updateParticles();
            drawParticles(context);
            lastFrameTime = now - (delta % confetti.frameInterval);
          }
          animationTimer = requestAnimationFrame(runAnimation);
        }
      }

      function startConfetti(timeout, min, max) {
        var width = window.innerWidth;
        var height = window.innerHeight;
        window.requestAnimationFrame = (function () {
          return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              return window.setTimeout(callback, confetti.frameInterval);
            }
          );
        })();
        var canvas = document.getElementById("confetti-canvas");
        if (canvas === null) {
          canvas = document.createElement("canvas");
          canvas.setAttribute("id", "confetti-canvas");
          canvas.setAttribute(
            "style",
            "display:block;z-index:999999;pointer-events:none;position:fixed;top:0"
          );
          document.body.prepend(canvas);
          canvas.width = width;
          canvas.height = height;
          window.addEventListener(
            "resize",
            function () {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
            },
            true
          );
          context = canvas.getContext("2d");
        } else if (context === null) context = canvas.getContext("2d");
        var count = confetti.maxCount;
        if (min) {
          if (max) {
            if (min == max) count = particles.length + max;
            else {
              if (min > max) {
                var temp = min;
                min = max;
                max = temp;
              }
              count =
                particles.length + ((Math.random() * (max - min) + min) | 0);
            }
          } else count = particles.length + min;
        } else if (max) count = particles.length + max;
        while (particles.length < count)
          particles.push(resetParticle({}, width, height));
        streamingConfetti = true;
        pause = false;
        runAnimation();
        if (timeout) {
          window.setTimeout(stopConfetti, timeout);
        }
      }

      function stopConfetti() {
        streamingConfetti = false;
      }

      function removeConfetti() {
        stop();
        pause = false;
        particles = [];
      }

      function toggleConfetti() {
        if (streamingConfetti) stopConfetti();
        else startConfetti();
      }

      function isConfettiRunning() {
        return streamingConfetti;
      }

      function drawParticles(context) {
        var particle;
        var x, y, x2, y2;
        for (var i = 0; i < particles.length; i++) {
          particle = particles[i];
          context.beginPath();
          context.lineWidth = particle.diameter;
          x2 = particle.x + particle.tilt;
          x = x2 + particle.diameter / 2;
          y2 = particle.y + particle.tilt + particle.diameter / 2;
          if (confetti.gradient) {
            var gradient = context.createLinearGradient(x, particle.y, x2, y2);
            gradient.addColorStop("0", particle.color);
            gradient.addColorStop("1.0", particle.color2);
            context.strokeStyle = gradient;
          } else context.strokeStyle = particle.color;
          context.moveTo(x, particle.y);
          context.lineTo(x2, y2);
          context.stroke();
        }
      }

      function updateParticles() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var particle;
        waveAngle += 0.01;
        for (var i = 0; i < particles.length; i++) {
          particle = particles[i];
          if (!streamingConfetti && particle.y < -15) particle.y = height + 100;
          else {
            particle.tiltAngle += particle.tiltAngleIncrement;
            particle.x += Math.sin(waveAngle) - 0.5;
            particle.y +=
              (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
            particle.tilt = Math.sin(particle.tiltAngle) * 15;
          }
          if (
            particle.x > width + 20 ||
            particle.x < -20 ||
            particle.y > height
          ) {
            if (streamingConfetti && particles.length <= confetti.maxCount)
              resetParticle(particle, width, height);
            else {
              particles.splice(i, 1);
              i--;
            }
          }
        }
      }
    })();

    // start

    const start = () => {
      setTimeout(function () {
        confetti.start();
      }, 800); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
    };

    //  Stop

    const stop = () => {
      setTimeout(function () {
        confetti.stop();
      }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
    };

    start();
    stop();
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
