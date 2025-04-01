import { Button, Card } from "antd";
import React from "react";

function EventCard() {
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
        <Button
          type="primary"
          style={{
            backgroundColor: "#E71F1F",
            borderColor: "#E71F1F",
            fontSize: "25px",
            padding: "10px 30px", // Increases inner spacing
            height: "auto", // Ensures it expands as needed
            minWidth: "140px", // Ensures it’s wide enough
            marginBottom: "40px",
          }}
        >
          Sign Up
        </Button>
      </Card>
    </div>
  );
}

export default EventCard;
