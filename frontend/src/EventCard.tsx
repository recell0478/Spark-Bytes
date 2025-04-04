import { Button, Card } from "antd";
import React from "react";

interface EventCardProps {
  isSignedUp: boolean;
  onSignUpClick: () => void;
}

function EventCard({ isSignedUp, onSignUpClick }: EventCardProps) {
  return (
    <div>
      <Card
        title={
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>
            Questrom Conference
          </span>
        }
        style={{ width: 600, fontSize: "20px" }}
      >
        <p>Number of Spots: 5</p>
        <p>Location: 555 Commonwealth Avenue</p>
        <p>Time: 12 PM - 3 PM</p>
        <p>Allergy: May contain Gluten, Dairy products</p>
        <p>Food Description: Pita, Hummus, Lamb, Beef, Feta</p>

        {/* Conditional rendering for the Sign-Up button */}
        <Button
          type={isSignedUp ? "default" : "primary"}
          style={{
            backgroundColor: isSignedUp ? "#B0B0B0" : "#E71F1F",
            borderColor: isSignedUp ? "#B0B0B0" : "#E71F1F",
            fontSize: "25px",
            padding: "10px 30px",
            height: "auto",
            minWidth: "140px",
            marginBottom: "40px",
          }}
          onClick={onSignUpClick} // Handle both sign-up and unsign-up
        >
          {isSignedUp ? "You are signed up!" : "Sign Up"}
        </Button>
      </Card>
    </div>
  );
}

export default EventCard;
