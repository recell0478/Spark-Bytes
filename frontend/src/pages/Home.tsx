import React from "react";
import "@fontsource/abhaya-libre/800.css";

import dog from "../assets/dog.png";
import { Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home({ isLoggedIn = false }) {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ marginTop: "150px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={dog}
            alt="dog"
            style={{ width: "300px", marginRight: "20px" }}
          />

          <div>
            <h1
              style={{
                fontFamily: "'Abhaya Libre', serif",
                fontWeight: 800,
                fontSize: "100px",
              }}
            >
              Free Food, Less Waste:
            </h1>
            <h1
              style={{
                fontFamily: "'Abhaya Libre', serif",
                fontWeight: 800,
                fontSize: "100px",
              }}
            >
              A Sustainable Campus Solution
            </h1>
          </div>
        </div>

        <Divider
          style={{
            borderColor: "#333", // Darker color
            margin: "20px auto",
            marginTop: "80px",
          }}
        />
        <h2 style={{ fontFamily: "'Abhaya Libre', serif", fontSize: "50px" }}>
          What is Spark!Bytes?
        </h2>
        <p style={{ fontSize: "30px", textAlign: "left" }}>
          Spark!Bytes is a community-driven platform for BU students and faculty
          to share and enjoy leftover food from on-campus events. Users can
          create events to offer surplus food or sign up to claim free meals at
          various campus locations—helping reduce waste and foster
          sustainability!
        </p>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E71F1F",
            borderColor: "#E71F1F",
            fontSize: "24px", // Increases font size
            padding: "15px 40px", // More padding for a bigger button
            height: "auto", // Allows the height to adjust dynamically
            minWidth: "180px", // Ensures the button is wide enough
            marginBottom: "40px",
          }}
          onClick={() => navigate(isLoggedIn ? "/events" : "/sign-in")}
        >
          Try Spark!Bytes
        </Button>
      </div>
    </div>
  );
}
