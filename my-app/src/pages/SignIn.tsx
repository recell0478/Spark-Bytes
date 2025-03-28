// SignIn.tsx
import React, { useState } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";


const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/");
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <Layout>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
          marginTop: "80px", // Added marginTop for space between navbar and form
        }}
      >
        <div
          style={{
            width: "600px", // Consistent width
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Welcome Back!</h2> {/* Changed text for consistency */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="email" style={{ textAlign: "left" }}>
              BU Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your BU email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                marginBottom: "1rem",
                padding: "0.75rem",
                width: "100%", // Full width input
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <label htmlFor="password" style={{ textAlign: "left" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                marginBottom: "1rem",
                padding: "0.75rem",
                width: "100%", // Full width input
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <button
              type="submit"
              style={{
                backgroundColor: "#c00",
                color: "#fff",
                padding: "0.75rem",
                border: "none",
                cursor: "pointer",
                marginBottom: "1rem",
                borderRadius: "4px", // Rounded button
                width: "100%", // Full width button
              }}
            >
              Sign In
            </button>
          </form>
          <a href="#" style={{ display: "block", margin: "1rem 0" }}>
            Forgot Password
          </a>
          <a href="/signup">
            <button
              style={{
                backgroundColor: "#c00",
                color: "#fff",
                padding: "0.75rem",
                border: "none",
                cursor: "pointer",
                width: "100%",
                borderRadius: "4px", // Rounded button
              }}
            >
              Don't have an account? Sign Up
            </button>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
