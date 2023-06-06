import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

function ManageVenue() {
  const BaseUrl = "https://cms-api-o973.onrender.com";
  const [venues, setVenues] = useState([]);
  const [newVenue, setNewVenue] = useState({ name: "", capacity: "" });
  const [editIndex, setEditIndex] = useState(-1);
  const [editId, setEditId] = useState("");
  //state variables to track the edited venue's name and capacity:?
  const [editedVenueName, setEditedVenueName] = useState("");
  const [editedVenueCapacity, setEditedVenueCapacity] = useState("");
  useEffect(() => {
    fetch(`${BaseUrl}/api/v1/venue`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVenues(data.data);
      });
  }, []);

  // Function for adding a venue and its capacity
  const addVenue = () => {
    if (newVenue.name !== "" && newVenue.capacity !== 0) {
      let payload = {
        name: newVenue.name,
        capacity: newVenue.capacity,
      };
      fetch(`${BaseUrl}/api/v1/venue/create`, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === "Ok") {
            Swal.fire({
              title: "Success!",
              text: data.message,
              icon: "success",
              confirmButtonText: "Thanks",
            });
            setVenues([
              ...venues,
              { name: newVenue.name, capacity: newVenue.capacity },
            ]);
            setNewVenue({ name: "", capacity: 0 });
          } else {
            Swal.fire({
              title: "Error!",
              text: data.message,
              icon: "error",
              confirmButtonText: "Close",
            });
          }
        });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Kindly input venue and capacity",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };
  // Function for editing a venue and its capacity
  const editVenue = (index, id) => {
    setEditIndex(index);
    setEditId(id);
    const { name, capacity } = venues[index];
    setNewVenue({ name, capacity });
    setEditedVenueName(name);
    setEditedVenueCapacity(capacity);
  };
  // Function for removing a venue
  const handleVenueRemove = (index) => {
    const updatedVenues = [...venues];
    updatedVenues.splice(index, 1);
    setVenues(updatedVenues);
  };
  // Function for updating a venue and its capacity
  const updateVenue = () => {
    if (newVenue.name !== "" && newVenue.capacity !== 0) {
      let payload = {
        name: newVenue.name,
        capacity: newVenue.capacity,
      };
      fetch(`${BaseUrl}/api/v1/venue/update/${editId}`, {
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === "Ok") {
            Swal.fire({
              title: "Success!",
              text: data.message,
              icon: "success",
              confirmButtonText: "Thanks",
            });
            const updatedVenues = [...venues];
            updatedVenues[editIndex] = {
              name: newVenue.name,
              capacity: newVenue.capacity,
            };
            setVenues(updatedVenues);
            setNewVenue({ name: "", capacity: 0 });
            setEditIndex(-1);
          } else {
            Swal.fire({
              title: "Error!",
              text: data.message,
              icon: "error",
              confirmButtonText: "Close",
            });
          }
        });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Kindly input venue and capacity",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };
  return (
    <div style={{ marginTop: "130px" }}>
      <Navbar />
      {venues.length > 0 && (
        <div style={{ padding: "50px 100px" }}>
          <h3>Available Venues</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Venue
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Capacity
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {venue.name}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {venue.capacity}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    <div className="aButton">
                      <button onClick={() => editVenue(index, venue._id)}>
                        Edit
                      </button>
                      <button onClick={() => handleVenueRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="addVenues" style={{ marginBottom: "20px" }}>
        <h3>Add/Edit Venue</h3>
        <div className="courseForm">
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
            onChange={(e) =>
              setNewVenue({ ...newVenue, capacity: parseInt(e.target.value) })
            }
          />
        </div>

        {editIndex !== -1 ? (
          <button onClick={updateVenue}>Update Venue</button>
        ) : (
          <button onClick={addVenue}>Add Venue</button>
        )}
      </div>
    </div>
  );
}

export default ManageVenue;
