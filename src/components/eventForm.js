import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventForm = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        const response = await axios.get(`/api/events/${id}`);
        const { name, date, location, description } = response.data;
        setName(name);
        setDate(date);
        setLocation(location);
        setDescription(description);
      };
      fetchEvent();
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { name, date, location, description };
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (id) {
      axios
        .put(`/api/events/${id}`, eventData, config)
        .then(() => {
          toast.success("Event updated successfully");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Error updating event");
          console.error("Error updating event:", error);
        });
    } else {
      axios
        .post("/api/events", eventData, config)
        .then(() => {
          toast.success("Event created successfully");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Error creating event");
          console.error("Error creating event:", error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? "Update" : "Create"} Event</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EventForm;
