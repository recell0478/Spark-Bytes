import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      if (error) throw error;
      navigate("/");
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "serif" }}>
      {/* LEFT - Welcome Panel */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#d80000",
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "2rem 3rem",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "2rem" }}>
          <img src="/logo.png" alt="SparkBytes logo" style={{ width: "40px", marginRight: "8px" }} />
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>SparkBytes!</span>
        </div>

        {/* Message */}
        <div style={{ margin: "auto", textAlign: "center", maxWidth: "320px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Welcome Back!</h2>
          <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
            To learn more about the food at the events, please login with your personal info
          </p>
          <a href="/signin">
            <button
              style={{
                marginTop: "2rem",
                backgroundColor: "transparent",
                border: "1.5px solid white",
                borderRadius: "15px",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              SIGN IN
            </button>
          </a>
        </div>
      </div>

      {/* RIGHT - Sign Up Form */}
      <div
        style={{
          flex: 1,
          padding: "2rem 4rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ margin: "auto", width: "100%", maxWidth: "400px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
            Get Access to Free Food — Sign Up Now!
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            {/* Name */}
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <UserOutlined style={{ position: "absolute", left: "12px", top: "12px", color: "#888" }} />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f1f1f1",
                }}
              />
            </div>

            {/* Email */}
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <MailOutlined style={{ position: "absolute", left: "12px", top: "12px", color: "#888" }} />
              <input
                type="email"
                placeholder="BU Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f1f1f1",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <LockOutlined style={{ position: "absolute", left: "12px", top: "12px", color: "#888" }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f1f1f1",
                }}
              />
            </div>

            {/* Confirm Password */}
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <LockOutlined style={{ position: "absolute", left: "12px", top: "12px", color: "#888" }} />
              <input
                type="password"
                placeholder="Verify Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f1f1f1",
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                backgroundColor: "#d80000",
                color: "white",
                padding: "0.75rem",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
              }}
            >
              SIGN UP
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer style={{ textAlign: "center", marginTop: "auto", fontSize: "0.85rem", color: "#666" }}>
          ©BU Spark Bytes 2025
        </footer>
      </div>
    </div>
  );
};

export default SignUp;