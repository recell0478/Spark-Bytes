import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import food from "../assets/food.jpg";
import useRedirectIfAuthenticated from "../hooks/useRedirectedIfAuthenticated";
const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useRedirectIfAuthenticated("/profile");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.endsWith("@bu.edu")) {
      setError("Email must end with @bu.edu");
      return;
    }

    const { data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName: fullName},
      }
    });

    if (data.user) {
      const { error: insertErr } = await supabase
        .from("users")
        .insert([
          {
                     
            email,
            fullname: fullName,
            profile_image: null,
            allergens: "",
          },
        ]);
  
      if (insertErr) {
        console.error(insertErr);
        setError("Could not create profile: " + insertErr.message);
        return;
      }
    }
  
    
  
    navigate("/profile");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "calc(100vh - 150px)",
        width: "100vw",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${food})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "650px",
          height: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
          Welcome Back!
        </h2>
        <p
          style={{ fontSize: "1.1rem", marginBottom: "3rem", lineHeight: 1.6 }}
        >
          Already have an account? <br />
          Sign in to access leftover food!
        </p>
        <button
          onClick={() => navigate("/sign-in")}
          style={{
            backgroundColor: "#fff",
            color: "#e71f1f",
            border: "2px solid #fff",
            borderRadius: "25px",
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          SIGN IN
        </button>
      </div>

      {/* Right Panel */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "750px",
        }}
      >
        <div
          style={{
            marginTop: "6rem",
            marginRight: "2rem",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2rem",
              marginBottom: "2rem",
            }}
          >
            Create an Account
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              htmlFor="fullName"
              style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              style={{
                padding: "0.75rem",
                marginBottom: "1.25rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />

            <label
              htmlFor="email"
              style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              BU Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your BU email"
              required
              style={{
                padding: "0.75rem",
                marginBottom: "1.25rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />

            <label
              htmlFor="password"
              style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              style={{
                padding: "0.75rem",
                marginBottom: "1.25rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />

            {error && (
              <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
            )}

            <button
              type="submit"
              style={{
                backgroundColor: "#c00",
                color: "#fff",
                padding: "0.75rem",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "2rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
