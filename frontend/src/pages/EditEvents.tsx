import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import useProtectRoute from "../hooks/useProtectRoute";
import { Navbar } from "./Navbar";

const EditEvent: React.FC = () => {
    const navigate = useNavigate();
    const checkingAuth = useProtectRoute();
    const [eventData, setEventData] = useState({
        eventName: "",
        spots: 0,
        location:"",
        time:"",
        allergy: "",
        foodDescription: "",
    });

    const eventId = "your-event-id"; // Replace with dynamic ID or props

    useEffect (() => {
        const fetchEvent = async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .eq("id", eventId)
                .single();
                
            if (error) {
                console.error("Error fetching event:", error);
            } else if (data) {
                setEventData({
                    eventName: data.name,
                    spots: data.spots,
                    location: data.location,
                    time: data.time,
                    allergy: data.allergy,
                    foodDescription: data.description,
                });
            }
        };

        fetchEvent();
    }, []);

    if (checkingAuth) 
        return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value});
    };

    const handleSave = async () => {
        const { error } = await supabase
            .from("events")
            .update({
                name: eventData.eventName,
                spots: eventData.spots,
                location: eventData.location,
                time: eventData.time,
                allergy: eventData.allergy,
                description: eventData.foodDescription,
            })
            .eq("id", eventId);
        
        if (error) {
            alert("Error saving event.");
        } else {
            alert("Changes saved!");
            navigate("/profile");
        }
    };

    return (
        <div
            style={{ 
                fontFamily: "Inter, sans-serif",
                padding: "2rem"
            }}
        >
            <Navbar isLoggedIn={true} />

            <main
                style={{
                    maxWidth: "700px",
                    margin: "2rem auto"
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",
                        borderBottom: "1px solid #aaa",
                        marginBottom: "2rem"
                    }}
                >
                    Edit My Event
                </h1>

                {[
                    { label: "Event Name", name: "eventName"},
                    { label: "Number of Spots" , name: "spots", type: "number" },
                    { label: "Location", name: "location"},
                    { label: "Time", name: "time"},
                    { label: "Allergy", name: "allergy"},
                    { label: "Food Description", name: "foodDescription" },
                ].map(({ label, name, type = "text"}) => (
                    <div key={name} style={{ marginBottom: "1.5rem"}}
                    >
                        <label style={{ fontWeight: 600, marginRight: "1rem"}}>{label}:</label>
                        <input
                            type={type}
                            name={name}
                            value={eventData[name as keyof typeof eventData]}
                            onChange={handleChange}
                            style={{
                                padding: "0.75rem",
                                backgroundColor: "#eee",
                                border: "1px solid #ccc",
                                width: "100%",
                                marginTop: "0.5rem",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                ))}

                {/* Action buttons */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "1rem"
                    }}
                >
                    <button
                        onClick={handleSave}
                        style={{
                            backgroundColor: "#e71f1f",
                            color:"#fff",
                            border: "none",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontWeight: 500,
                        }}
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => navigate("/profile")}
                        style={{
                            backgroundColor: "#fff",
                            color: "#e71f1f",
                            border: "2px solid #e71f1f",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontWeight: 500,
                        }}
                    >
                        Back to Profile
                    </button>
                </div>
            </main>
        </div>
    );
};

export default EditEvent;