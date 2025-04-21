import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import Image from "next/image";
import styles from "./Profile.module.css";
import { Button, Divider } from "antd";
import Myevents from "./profilecards/Myevents";
import RegisteredEvents from "./profilecards/RegisteredEvents";
import { useNavigate } from "react-router";
import useProtectRoute from "../hooks/useProtectRoute";
import { Navbar } from "./Navbar.tsx";

interface UserProfile {
  id: string;
  email: string;
  fullname: string;
  created_at: string;
  allergens: string;
}

const ProfilePage: React.FC = () => {
  const checkingAuth = useProtectRoute("/sign-in");
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  // adding a notification state
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Starting profile fetch...");
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log("Auth user:", user);

        if (!user) {
          console.log("No authenticated user");
          navigate("/sign-in");
          return;
        }

        console.log("Fetching profile for ID:", user.id);
        const { data, error } = await supabase
          .from("users")
          .select("id, email, fullname, created_at, allergens")
          .eq("email", user.email)
          .single();

        console.log("Profile data response:", { data, error });
        if (error) throw error;

        setUserProfile(data);
      } catch (error) {
        console.error("Error:", error);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const onSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/sign-in");
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!userProfile) {
    return <div>Error loading profile</div>;
  }

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
    >
      <div style={{ fontFamily: "Inter, sans-serif" }}></div>

      {/* Profile Main */}
      <main style={{ maxWidth: 750, margin: "3rem auto", padding: "1rem" }}>
        {/* Title */}
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
            marginTop: "4rem",
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
          </div>
        </div>

        {/* Profile Fields */}
        <div style={{ padding: "0 1rem" }}>
          {[
            { label: "Name", value: userProfile.fullname },
            { label: "BU Email", value: userProfile.email },
            //{ label: "Signed Up Events", value: userProfile.events.join(", ") },
            { label: "Allergens", value: userProfile.allergens },
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

        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: "#000", borderColor: "#000" }}
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ backgroundColor: "#000", borderColor: "#000" }}
            onClick={onSignOut}
          >
            Log Out
          </Button>
        </div>
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
