// Sign-In page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      console.error("Error signing in:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "serif" }}>
      {/* LEFT SIDE */}
      <div style={{ flex: 1, padding: "2rem 4rem", display: "flex", flexDirection: "column" }}>
        {/* Logo */}
        <div style={{ marginBottom: "2rem" }}>
          <img src="/logo.png" alt="SparkBytes logo" style={{ width: "40px", marginRight: "8px" }} />
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>SparkBytes!</span>
        </div>

        {/* Form container */}
        <div style={{ margin: "auto", width: "100%", maxWidth: "400px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
            Sign In to SparkBytes!
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <MailOutlined style={{ position: "absolute", left: "12px", top: "12px", color: "#888" }} />
              <input
                type="email"
                placeholder="BU Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f1f1f1",
                }}
              />
            </div>

            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <LockOutlined style={{ position: "absolute", left: "12px", top: "12px", color: "#888" }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f1f1f1",
                }}
              />
            </div>

            <a href="#" style={{ textAlign: "center", marginBottom: "1rem" }}>
              Forgot Password?
            </a>

            <button
              type="submit"
              style={{
                backgroundColor: "#d80000",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "0.75rem",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              SIGN IN
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer style={{ textAlign: "center", marginTop: "auto", fontSize: "0.85rem", color: "#666" }}>
          ©BU Spark Bytes 2025
        </footer>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#d80000",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Hello Friend,</h2>
        <p style={{ fontSize: "1.1rem", textAlign: "center", maxWidth: "300px", margin: "1rem 0" }}>
          Enter your personal details and start getting free food with us!
        </p>
        <a href="/signup">
          <button
            style={{
              backgroundColor: "transparent",
              border: "1.5px solid white",
              color: "white",
              borderRadius: "15px",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            SIGN UP
          </button>
        </a>
      </div>
    </div>
  );
};

export default SignIn;
