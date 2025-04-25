

import { useEffect, useState, useCallback } from "react";
import { Card, Button, Spin, message } from "antd";
import dayjs from "dayjs";
import { supabase } from "../utils/supabaseClient";


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

type RegistrationRow = { event_name: string };

export default function RegisterPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [registrations, setRegistrations] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState<number | null>(null);


  useEffect(() => {
    (async () => {
      const { data: eventsData, error: eventsErr } = await supabase
        .from("Events")
        .select("*")
        .order("created_at", { ascending: false });
      if (eventsErr) {
        console.error(eventsErr);
        message.error("Unable to load events.");
      } else {
        setEvents(eventsData ?? []);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: regData, error: regErr } = await supabase
          .from("Events_emails")
          .select("event_name")
          .eq("email", user.email);
        if (!regErr && regData) {
          setRegistrations(new Set(regData.map((r: RegistrationRow) => r.event_name)));
        }
      }

      setLoading(false);
    })();
  }, []);

  
  const adjustSpotsLocal = (eventId: number, delta: number) =>
    setEvents((old) =>
      old.map((e) =>
        e.id === eventId && e.spots_remaining !== null
          ? { ...e, spots_remaining: e.spots_remaining + delta }
          : e
      )
    );

  /* register / unregister*/
  const handleRegister = useCallback(async (evt: EventRow) => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      message.warning("You must be signed in to register.");
      return;
    }
    setRegisteringId(evt.id);

    const { error: insertErr } = await supabase.from("Events_emails").insert({
      email: user.email,
      event_name: evt.name,
    });
    if (!insertErr) {
      await supabase
        .from("Events")
        .update({ spots_remaining: (evt.spots_remaining ?? 0) - 1 })
        .eq("id", evt.id);

      adjustSpotsLocal(evt.id, -1);
      setRegistrations((old) => new Set(old).add(evt.name));
      message.success("Registered for event!");
    } else {
      message.error(insertErr.message);
    }
    setRegisteringId(null);
  }, []);

  const handleUnregister = useCallback(async (evt: EventRow) => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      message.warning("You must be signed in to unregister.");
      return;
    }
    setRegisteringId(evt.id);

    const { error: delErr } = await supabase
      .from("Events_emails")
      .delete()
      .eq("email", user.email)
      .eq("event_name", evt.name);
    if (!delErr) {
      await supabase
        .from("Events")
        .update({ spots_remaining: (evt.spots_remaining ?? 0) + 1 })
        .eq("id", evt.id);

      adjustSpotsLocal(evt.id, +1);
      setRegistrations((old) => {
        const next = new Set(old);
        next.delete(evt.name);
        return next;
      });
      message.success("Unregistered from event.");
    } else {
      message.error(delErr.message);
    }
    setRegisteringId(null);
  }, []);

  const formatTime = (t: string | null) =>
    t ? dayjs(`1970-01-01T${t}`).format("h:mm A") : "—";

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 120 }}>
        <Spin size="large" />
      </div>
    );
  }


  return (
    <div>
      {/* header banner */}
      <div className="min-h-screen flex flex-col items-center px-4 py-8">
        <h1 style={{ fontFamily: "'Abhaya Libre', serif", fontWeight: 800, fontSize: 80, marginTop: 200 }}>
          Sign Up for Free Food!
        </h1>
      </div>

      <div style={{ maxWidth: 800, margin: "60px auto", padding: "0 12px" }}>
        {events.length === 0 && <p style={{ textAlign: "center" }}>No events available right now.</p>}

        {events.map((evt) => {
          const isRegistered = registrations.has(evt.name);
          const btnLabel = isRegistered ? "Unregister" : "Register";
          const btnStyle = isRegistered
          ? { backgroundColor: "#E71F1F", borderColor: "#E71F1F" }
            : { backgroundColor: "#4CAF50", borderColor: "#4CAF50" };
           

          return (
            <Card key={evt.id} title={<span style={{ fontSize: 24, fontWeight: 700 }}>{evt.name}</span>} style={{ marginBottom: 32, fontSize: 18 }}>
              <p><strong>Number of Spots:</strong> {evt.spots_remaining ?? "—"}</p>
              <p><strong>Location:</strong> {evt.location ?? "—"}</p>
              <p><strong>Time:</strong> {formatTime(evt.time_start)} – {formatTime(evt.time_end)}</p>
              <p><strong>Allergy:</strong> {(() => {
                if (!evt.allergens) return "None specified";
                try {
                  const parsed = JSON.parse(evt.allergens);
                  return Array.isArray(parsed) && parsed.length ? parsed.join(", ") : "None specified";
                } catch {
                  return evt.allergens;
                }
              })()}</p>
              <p><strong>Food Description:</strong> {evt.description ?? "—"}</p>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  loading={registeringId === evt.id}
                  disabled={!isRegistered && evt.spots_remaining !== null && evt.spots_remaining <= 0}
                  onClick={() => (isRegistered ? handleUnregister(evt) : handleRegister(evt))}
                  style={{ ...btnStyle, minWidth: 160, fontWeight: 600 }}
                >
                  {btnLabel}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
