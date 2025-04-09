import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../supabaseClient";
import Image from "next/image";
import styles from "./Profile.module.css";
import { Button, Divider } from "antd";
import Myevents from "./profilecards/Myevents";
import RegisteredEvents from "./profilecards/RegisteredEvents";

const mockUserProfile = {
  name: "Khang Le",
  email: "hle1@bu.edu",
  events: ["Questrom Conference", "CCD Workshop"],
  allergens: ["milk", "eggs", "peanuts", "shellfish"],
};

const ProfilePage: React.FC = () => {
  const userProfile = mockUserProfile;

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#e71f1f",
          color: "#fff",
          padding: "1rem 2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/bulldog_logo.png"
            alt="Logo"
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <span style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
            Spark!Bytes
          </span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </a>
          <a href="/events" style={{ color: "#fff", textDecoration: "none" }}>
            Create Events
          </a>
          <a href="/sign-up" style={{ color: "#fff", textDecoration: "none" }}>
            Food Sign Up
          </a>
          <div
            style={{
              width: 36,
              height: 36,
              backgroundColor: "#222",
              borderRadius: "50%",
            }}
          ></div>
        </nav>
      </header>

      {/* Profile Main */}
      <main style={{ maxWidth: 750, margin: "3rem auto", padding: "1rem" }}>
        {/* Title */}
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "1.5rem",
            fontFamily: "'Abhaya Libre', serif",
          }}
        >
          Personal Profile
        </h1>

        {/* Avatar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#f2f2f2",
              border: "1px solid #ccc",
              fontSize: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            👤
            <span
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "50%",
                padding: "4px 6px",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
              title="Edit"
            >
              ✏️
            </span>
          </div>
        </div>

        {/* Profile Fields */}
        <div style={{ padding: "0 1rem" }}>
          {[
            { label: "Name", value: userProfile.name },
            { label: "BU Email", value: userProfile.email },
            { label: "Signed Up Events", value: userProfile.events.join(", ") },
            { label: "Allergens", value: userProfile.allergens.join(", ") },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                marginBottom: "1.5rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid #aaa",
              }}
            >
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#000",
                  marginBottom: "0.25rem",
                }}
              >
                {label}
              </h4>
              <p style={{ margin: 0, fontSize: "1rem", color: "#333" }}>
                {value}
              </p>
            </div>
          ))}
        </div>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ backgroundColor: "#E71F1F", borderColor: "#E71F1F" }}
        >
          Delete Account
        </Button>
      </main>
      <div>
        <h1
          style={{
            fontFamily: "'Abhaya Libre', serif",
            fontWeight: 800,
            fontSize: "50px",
            marginBottom: "8px",
            textAlign: "left",
          }}
        >
          My Events
        </h1>
        <Divider
          style={{ height: "0.3px", backgroundColor: "#000", marginTop: "0" }}
        />
        <Myevents />
      </div>

      <div>
        <h1
          style={{
            fontFamily: "'Abhaya Libre', serif",
            fontWeight: 800,
            fontSize: "50px",
            marginBottom: "8px",
            textAlign: "left",
          }}
        >
          Registered Events
        </h1>
        <Divider
          style={{ height: "0.3px", backgroundColor: "#000", marginTop: "0" }}
        />
        <RegisteredEvents />
      </div>
    </div>
  );
};

export default ProfilePage;
