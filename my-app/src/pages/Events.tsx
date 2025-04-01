import { Button } from "antd";
import React from "react";
import EventCard from "../EventCard";
import { Divider } from "antd";
import { Navbar } from "./Navbar";

function Events() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div style={{ marginTop: "250px" }}>
        <h1
          style={{
            fontFamily: "'Abhaya Libre', serif",
            fontWeight: 800,
          }}
        >
          Create an Event!
        </h1>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li
            style={{
              marginBottom: "15px",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              style={{ fontSize: "24px", padding: "8px" }}
            />
          </li>
          <li
            style={{
              marginBottom: "15px",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              style={{ fontSize: "24px", padding: "8px" }}
            />
          </li>
          <li
            style={{
              marginBottom: "15px",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              style={{ fontSize: "24px", padding: "8px" }}
            />
          </li>
          <li
            style={{
              marginBottom: "15px",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              style={{ fontSize: "24px", padding: "8px" }}
            />
          </li>
          <li
            style={{
              marginBottom: "15px",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <label htmlFor="allergy">Allergy:</label>
            <input
              type="text"
              id="allergy"
              name="allergy"
              style={{ fontSize: "24px", padding: "8px" }}
            />
          </li>
          <li
            style={{
              marginBottom: "15px",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <label htmlFor="foodDescription">Food Description:</label>
            <textarea
              id="foodDescription"
              name="foodDescription"
              style={{ fontSize: "24px", padding: "8px", width: "100%" }}
            />
          </li>
        </ul>

        <Button
          type="primary"
          style={{
            backgroundColor: "#E71F1F",
            borderColor: "#E71F1F",
            fontSize: "35px",
            padding: "20px 40px", // Increases inner spacing
            height: "auto", // Ensures it expands as needed
            minWidth: "250px", // Ensures it’s wide enough
            marginBottom: "40px",
          }}
        >
          Create Event
        </Button>
        <Divider
          style={{
            borderColor: "#333", // Darker color
            margin: "20px auto",
          }}
        />
        <h1
          style={{
            fontFamily: "'Abhaya Libre', serif",
            fontWeight: 800,
          }}
        >
          Sign Up for Free Food!
        </h1>
        <EventCard />
      </div>
    </div>
  );
}

export default Events;
