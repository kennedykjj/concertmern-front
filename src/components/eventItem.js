import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EventItem = ({ event }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/events/${event._id}`);
      navigate(0); //Reload the page to update the event list
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <li>
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.location}</p>
      <Link to={`/edit/${event._id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default EventItem;
