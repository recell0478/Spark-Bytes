import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { Button, Divider } from "antd";
import useProtectRoute from "../hooks/useProtectRoute";
import { Navbar } from "./Navbar";
import { useLocation } from "react-router";
import RegisteredEvents from "./profilecards/RegisteredEvents";
import dayjs from "dayjs";

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
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndEvents = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/sign-in");
          return;
        }

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("users")
          .select("id, email, fullname, created_at, allergens")
          .eq("email", user.email)
          .single();

        if (profileError) throw profileError;
        setUserProfile(profileData);

        // Fetch registered events
        const { data: regsData, error: regsError } = await supabase
          .from("Events_emails")
          .select(
            `id, event:Events(id, name, location, time_start, time_end, allergens, description, spots_remaining)`
          )
          .eq("email", user.email);
        if (regsError) throw regsError;
        setRegisteredEvents(
          regsData.map((r: any) => ({ id: r.id, event: r.event }))
        );

        // Fetch events created by user
        const { data: createdEvents, error: createdError } = await supabase
          .from("Events")
          .select("*")
          .eq("creator_email", profileData.email);

        if (createdError) throw createdError;
        setMyEvents(createdEvents || []);
      } catch (error) {
        console.error("Error loading profile or events:", error);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndEvents();
  }, [navigate]);

  const handleUnregister = async (regId: number) => {
    if (!window.confirm("Are you sure you want to unregister from this event?"))
      return;
    const { error } = await supabase
      .from("Events_emails")
      .delete()
      .eq("id", regId);
    if (error) {
      console.error("Error unregistering:", error);
      alert("Failed to unregister.");
    } else {
      setRegisteredEvents((regs) => regs.filter((r) => r.id !== regId));
    }
  };
  const formatTime = (t: string | null) =>
    t ? dayjs(`1970-01-01T${t}`).format("h:mm A") : "—";

  const handleEdit = (eventId: number) => {
    navigate(`/edit-events?id=${eventId}`);
  };

  const handleDelete = async (eventId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      // Fetch the event's name (for foreign key cleanup)
      const { data: eventsData, error: eventsError } = await supabase
        .from("Events")
        .select("name")
        .eq("id", eventId)
        .single();
      if (eventsError || !eventsData) {
        console.error("Error fetching event name:", eventsError);
        alert("Could not find the event to delete.");
        return;
      }
      const eventName = eventsData.name;

      // Delete all registrations referencing this event name
      const { error: regError } = await supabase
        .from("Events_emails")
        .delete()
        .eq("event_name", eventName);
      if (regError) {
        console.error("Error deleting related registrations:", regError);
        // proceed even if registrations cleanup fails
      }

      // Now delete the event itself
      const { error: delErr } = await supabase
        .from("Events")
        .delete()
        .eq("id", eventId);
      if (delErr) {
        console.error("Error deleting event:", delErr);
        alert("Failed to delete event.");
        return;
      }

      alert("Event deleted successfully.");
      // Update local state to remove the deleted event
      setMyEvents((events) => events.filter((e) => e.id !== eventId));
    } catch (error) {
      console.error("Unexpected error deleting event:", error);
      alert("An unexpected error occurred.");
    }
  };

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
      <Navbar isLoggedIn={true} />

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

        {/* Buttons */}
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

      {/* My Events */}
      <div style={{ maxWidth: 1000, margin: "3rem auto", padding: "1rem" }}>
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
        {myEvents.length > 0 ? (
          myEvents.map((event) => (
            <div
              key={event.id}
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <h3>{event.name}</h3>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <Button
                style={{
                  marginRight: "1rem",
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                }}
                onClick={() => navigate(`/edit-events/${event.id}`)}
              >
                Edit
              </Button>
              <Button danger onClick={() => handleDelete(event.id)}>
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p>No events created yet.</p>
        )}
      </div>

      {/* Registered Events */}
      <div style={{ maxWidth: 1000, margin: "3rem auto", padding: "1rem" }}>
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
        <Divider />

        {registeredEvents.length > 0 ? (
          registeredEvents.map(({ id, event }) => (
            <div
              key={id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 10,
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h2>{event.name}</h2>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Start:</strong> {formatTime(event.time_start)}
              </p>
              <p>
                <strong>End:</strong> {formatTime(event.time_end)}
              </p>
              <p>
                <strong>Spots Remaining:</strong> {event.spots_remaining}
              </p>
              <p>
                <strong>Allergy:</strong>{" "}
                {(() => {
                  if (!event.allergens) return "None specified";
                  try {
                    const parsed = JSON.parse(event.allergens);
                    return Array.isArray(parsed) && parsed.length
                      ? parsed.join(", ")
                      : "None specified";
                  } catch {
                    return event.allergens;
                  }
                })()}
              </p>{" "}
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <Button danger onClick={() => handleUnregister(id)}>
                Unregister
              </Button>
            </div>
          ))
        ) : (
          <p>No registered events yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
