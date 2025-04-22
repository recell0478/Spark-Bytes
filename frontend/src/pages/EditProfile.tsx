import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import useProtectRoute from "../hooks/useProtectRoute";
import { supabase } from "../utils/supabaseClient";

const EditProfile: React.FC = () => {
    const navigate = useNavigate();
    const checkingAuth = useProtectRoute();
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [allergens, setAllergens] = useState("");
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                navigate("/sign-in");
                return;
            }

            const { data, error } = await supabase
                .from("users")
                .select("fullname, email, allergens, profile_image")
                .eq("email", user.email)
                .single();

            if (!error && data) {
                setName(data.fullname || "");
                setEmail(data.email || "");
                setAllergens(data.allergens || "");
                setUploadedUrl(data.profile_image || null);
            }
            
            setLoading(false);
        };

        fetchProfile();
    }, [navigate]);

    const handleSave = async () => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            alert("Not logged in.");
            return;
        }

        const { error } = await supabase
            .from("users")
            .update({
                fullname: name,
                allergens,
                profile_image: uploadedUrl
            })
            .eq("email", user.email);

        if (error) {
            alert("Failed to update profile: " + error.message);
        } else {
            navigate("/profile");
        }
    };

    // Fix storage bucket name
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const fileName = `${crypto.randomUUID()}.${file.name.split('.').pop()}`;

        const { error } = await supabase.storage
            .from("avatars")
            .upload(fileName, file);

        if (error) {
            console.error("Upload error:", error);
            return;
        }

        const { data } = supabase.storage
            .from("avatars") // Fixed colon typo
            .getPublicUrl(fileName);

        setUploadedUrl(data.publicUrl);
    }

    if (loading) {
        return <div>Loading profile...</div>;
    }

    return (
        <div style={{ fontFamily: "Inter, sans-serif"}}>
            <Navbar isLoggedIn={true} /> 
            <main style = {{ maxWidth: "700px", margin: "2rem auto" }}>
                <h1 style= {{ fontSize: "2rem", borderBottom: "1px solid #aaa", paddingBottom: "0.5rem", marginBottom: "2rem"}}>
                    Edit Personal Profile
                </h1>

                {/* Avatar */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem"}}>
                    
                    <div
                        style={{
                            position: "relative",
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            backgroundColor: "#eee",
                            fontSize: "2rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #aaa",
                            

                        }}
                    >
                        👤
                        <span
                            style={{
                                position: "absolute",
                                bottom: 5,
                                right: 5,
                                fontSize: "0.8rem",
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                border: "1px solid #ccc",
                                padding: "0.25rem",
                                
                                
                            }}
                        >   
                            ✏️
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ marginTop: "10em", 
                                padding: "5rem",

                            }}
                            
                        />
                    </div>

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
                        {email || "Loading..."}
                    </span>
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
                        Edit Name:
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
                        }}
                    />
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
                        Edit Allergens:
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
                        }}
                    />
                </div>

                {/* Buttons  */}
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