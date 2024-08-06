import React from "react";
import { Route, Routes } from "react-router-dom";
import EventList from "../components/eventList";
import EventForm from "../components/eventForm";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<EventForm />} />
        <Route path="/edit/:id" element={<EventForm />} />
      </Routes>
    </div>
  );
};

export default Home;
