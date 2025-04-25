/* pages/Register.tsx */
import { useEffect, useState, useCallback } from "react";
import { Card, Button, Spin, message } from "antd";
import dayjs from "dayjs";
import { supabase } from "../utils/supabaseClient";

// TODO: IMPLEMENT FILTERING

type EventRow = {
  id: number;
  name: string;
  location: string | null;
  spots_remaining: number | null;
  description: string | null;
  allergens: string | null;
  time_start: string | null;
  time_end: string | null;
};

export default function RegisterPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [registeringId, setRegisteringId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("Events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        message.error("Unable to load events.");
      } else {
        setEvents(data);
      }
      setLoading(false);
    })();
  }, []);

  const handleRegister = useCallback(
    async (evt: EventRow) => {
      const {
        data: { user },
        error: authErr,
      } = await supabase.auth.getUser();

      if (authErr || !user) {
        message.warning("You must be signed in to register.");
        return;
      }

      setRegisteringId(evt.id);

      const { error } = await supabase.from("Events_emails").insert({
        email: user.email,
        event_name: evt.name,
      });

      setRegisteringId(null);

      if (error) {
        console.error(error);
        message.error(error.message);
      } else {
        message.success("Registered for event!");

        const { error } = await supabase
          .from("Events")
          .update({ spots_remaining: (evt.spots_remaining ?? 0) - 1 })
          .eq("id", evt.id)
          .gt("spots_remaining", 0);

        setEvents((old) =>
          old.map((e) =>
            e.id === evt.id && e.spots_remaining !== null
              ? { ...e, spots_remaini: e.spots_remaining - 1 }
              : e
          )
        );
      }
    },
    [setRegisteringId, setEvents]
  );

  const formatTime = (t: string | null) =>
    t ? dayjs(`1970-01-01T${t}`).format("h:mm A") : "—";

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 120 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center px-4 py-8">
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
      </div>
      <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 12px" }}>
        {events.length === 0 && (
          <p style={{ textAlign: "center" }}>No events available right now.</p>
        )}
        {events.map((evt) => (
          <Card
            key={evt.id}
            title={
              <span style={{ fontSize: 24, fontWeight: 700 }}>{evt.name}</span>
            }
            style={{
              marginBottom: 32,
              fontSize: 18,
              margin: "60px auto",
              padding: "24px", // changed from "0 12px" to match form padding
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.09)",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
            }}
          >
            <p>
              <strong>Number of Spots:</strong>{" "}
              {evt.spots_remaining !== null ? evt.spots_remaining : "—"}
            </p>
            <p>
              <strong>Location:</strong> {evt.location ?? "—"}
            </p>
            <p>
              <strong>Time:</strong> {formatTime(evt.time_start)} –{" "}
              {formatTime(evt.time_end)}
            </p>
            <p>
              <strong>Allergy:</strong>{" "}
              {(() => {
                if (!evt.allergens) return "None specified";
                try {
                  const parsed = JSON.parse(evt.allergens);
                  return Array.isArray(parsed) && parsed.length > 0
                    ? parsed.join(", ")
                    : "None specified";
                } catch (e) {
                  return evt.allergens; // fallback in case it's just a plain string
                }
              })()}
            </p>

            <p>
              <strong>Food Description:</strong> {evt.description ?? "—"}
            </p>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                loading={registeringId === evt.id}
                disabled={
                  evt.spots_remaining !== null && evt.spots_remaining <= 0
                }
                onClick={() => handleRegister(evt)}
                style={{
                  backgroundColor: "#E71F1F",
                  borderColor: "#E71F1F",
                  minWidth: 160,
                  fontWeight: 600,
                  transition: "transform 0.2s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Register
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
