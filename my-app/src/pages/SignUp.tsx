import React, { useState } from "react";
import { Layout } from "antd";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) throw authError;
  
      // 2. Insert into public.users table
      const { error: dbError } = await supabase
        .from("users")
        .insert([{ username, email }]);
  
      if (dbError) throw dbError;
      
      // Redirect to home
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed");
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
          marginTop: "80px", // Added marginTop to ensure the form starts below the navbar
        }}
      >
        <div
          style={{
            width: "600px", // Increased width for horizontal expansion
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            border: "1px solid #ddd", // Optional: adds border around the form
            borderRadius: "8px", // Rounded corners for the form
            backgroundColor: "#f9f9f9", // Light background for form area
          }}
        >
          <h2>Create an Account</h2>

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
                width: "100%", // Full width for the input
                borderRadius: "4px",
                border: "1px solid #ccc", // Light border
              }}
            />
            <label htmlFor="username" style={{ textAlign: "left" }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                marginBottom: "1rem",
                padding: "0.75rem",
                width: "100%",
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
                width: "100%", // Full width for the input
                borderRadius: "4px",
                border: "1px solid #ccc", // Light border
              }}
            />
            <label htmlFor="confirmPassword" style={{ textAlign: "left" }}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                marginBottom: "1rem",
                padding: "0.75rem",
                width: "100%", // Full width for the input
                borderRadius: "4px",
                border: "1px solid #ccc", // Light border
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
                borderRadius: "4px", // Rounded corners for the button
                width: "100%", // Full width for the button
              }}
            >
              Sign Up
            </button>
          </form>
          <a href="#" style={{ display: "block", margin: "1rem 0" }}>
            Forgot Password
          </a>
          <a href="/signin">
            <button
              style={{
                backgroundColor: "#c00",
                color: "#fff",
                padding: "0.75rem",
                border: "none",
                cursor: "pointer",
                width: "100%", // Full width for the button
                borderRadius: "4px", // Rounded corners for the button
              }}
            >
              Already have an account? Sign In
            </button>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
