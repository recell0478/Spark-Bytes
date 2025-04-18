import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar.tsx";
import useProtectRoute from "../hooks/useProtectRoute";
import { supabase } from "../utils/supabaseClient.ts";

const EditProfile: React.FC = () => {
    const navigate = useNavigate();

    // const checkingAuth = useProtectRoute();
    // if (checkingAuth) 
    //     return null;

    const [name, setName] = useState("Khang Le");

    const [allergens, setAllergens] = useState(
        "milk, eggs, peanuts, tree nuts, soy, wheat, fish, and shellfish"
    );

    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const handleSave = async () => {
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();
        
        if (userError || !user) {
            alert("Not logged in.");
            return;
        }

        const { error } = await supabase
            .from("profiles")
            .update({
                name,
                allergens,
                avatar_url: uploadedUrl,
            })
            .eq("id", user.id);

            if (error) {
                alert("Failed to update profile.");
            } else {
                alert("Changes saved!");
                navigate("/profile");
            }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const fileName = `${crypto.randomUUID()}.${file.name.split('.').pop()}`;

        const { error } = await supabase.storage
            .from("avatars")
            .upload(fileName, file);

        if (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image.");
            return;
        }

        const { data } = supabase.storage  
            .from("avatars:")
            .getPublicUrl(fileName);

        setUploadedUrl(data.publicUrl);
    }

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <Navbar isLoggedIn={true} />
      <main 
        style={{ 
            maxWidth: "700px", 
            margin: "2rem auto", 
            padding: "1rem" 
        }}
        >
        <h1 
            style={{ 
                fontSize: "2rem", 
                borderBottom: "1px solid #aaa", 
                marginBottom: "2rem", 
                marginTop: "5rem" 
            }}
        >
            Edit Personal Profile
        </h1>

                {/* Avatar Upload Section */}
                <div 
                style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
                    {/* Avatar as clickable label */}
                    <label
                        htmlFor="profile-upload"
                        style={{
                        position: "relative",
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        backgroundColor: "#f1f1f1",
                        border: "1px solid #ccc",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        }}
                    >
                        {/* Avatar emoji or user image */}
                        <span style={{ fontSize: "2rem" }}>👤</span>

                        {/* Edit icon overlay */}
                        <span
                            style={{
                                position: "absolute",
                                bottom: 5,
                                right: 5,
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                padding: "2px",
                                border: "1px solid #ccc",
                                fontSize: "1rem",
                            }}
                        >
                            ✏️
                        </span>
                    </label>

                    {/* Hidden File Input */}
                    <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => console.log("Selected file:", e.target.files?.[0])}
                        style={{ display: "none" }}
                    />
                </div>

                {/* Name */}
                <div
                    style={{ marginBottom: "1.5rem"}} 
                >
                    <label
                        style={{
                            fontWeight: 600,
                            display: "block",
                            marginBottom: "0.25rem"
                        }}
                    >
                        Name:
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            padding: "0.75rem",
                            width: "100%",
                            backgroundColor: "#eee",
                            border: "1px solid #ccc",
                            fontSize: "1rem",
                            textAlign: "center",
                        }}
                    />
                </div>

                {/* Email (Read-only) */}
                <div
                    style={{ 
                        marginBottom: "1.5rem"
                    }}
                >
                    <label
                        style={{ 
                            fontWeight: 600 
                        }}
                    >
                        BU Email:
                    </label>
                    <span
                        style={{ marginLeft: "1rem" }}
                    >
                        hle1@bu.edu
                    </span>
                </div>

                {/* Registered Events (Read-only) */}
                <div
                    style={{
                        marginBottom:"1.5rem"
                    }}
                >
                    <label
                        style={{
                            fontWeight: 600
                        }}
                    >
                        Registered Events:
                    </label>
                    <span
                        style={{
                            marginLeft: "1rem"
                        }}
                    >
                        Questrom Conference, CCS Workshop
                    </span>
                </div>
                
                {/* Allergens */}
                <div 
                    style={{
                        marginBottom: "2rem"
                    }}
                >
                    <label
                        style={{
                            fontWeight: 600,
                            display: "block",
                            marginBottom:"0.25rem"
                        }}
                    >
                        Allergens:
                    </label>
                    <input
                        value={allergens}
                        onChange={(e) => setAllergens(e.target.value)}
                        style={{
                            padding: "0.75rem",
                            width: "100%",
                            backgroundColor: "#eee",
                            border: "1px solid #ccc",
                            fontSize: "1rem",
                            textAlign: "center",
                        }}
                    />
                </div>

                {/* Buttons  */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "1rem",
                        paddingRight: "3rem"
                    }}
                >
                    <button
                        onClick={handleSave}
                        style={{
                            backgroundColor: "#e71f1f",
                            color: "#fff",
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

export default EditProfile;