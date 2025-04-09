import { Button, Card } from "antd";
import React from "react";

function RegisteredEvents() {
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
          htmlType="submit"
          size="large"
          style={{ backgroundColor: "#888888", borderColor: "#888888" }}
        >
          Unregister
        </Button>
      </Card>
    </div>
  );
}

export default RegisteredEvents;
