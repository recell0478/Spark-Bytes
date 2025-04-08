import React, { useState } from "react";
import EventCard from "../EventCard";

function Food() {
  const [isSignedUp, setIsSignedUp] = useState(false); // Track if the user is signed up

  const handleSignUpClick = () => {
    setIsSignedUp(!isSignedUp); // Toggle sign-up state
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <h1
          style={{
            fontFamily: "'Abhaya Libre', serif",
            fontWeight: 800,
            fontSize: "80px",

            marginTop: "200px",
          }}
        >
          Sign Up for Free Food!
        </h1>
        <div
          style={{
            marginBottom: "40px",
            display: "flex", // Use flexbox to layout children
            flexDirection: "column", // Align children vertically (column direction)
            justifyContent: "space-between", // Space out the cards evenly
            alignItems: "center", // Horizontally center the content
            height: "100%",
            gap: "20px",
          }}
        >
          <EventCard
            isSignedUp={isSignedUp}
            onSignUpClick={handleSignUpClick}
          />
          <EventCard
            isSignedUp={isSignedUp}
            onSignUpClick={handleSignUpClick}
          />
          <EventCard
            isSignedUp={isSignedUp}
            onSignUpClick={handleSignUpClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Food;
