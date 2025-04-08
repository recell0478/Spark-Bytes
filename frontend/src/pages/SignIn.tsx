import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../backend/supabaseClient";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import SignInImage from "../assets/SignIn.jpg";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/profile");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "85vh",
        width: "100%",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
        gap: "4rem",
        boxSizing: "border-box",
        flexWrap: "nowrap",
      }}
    >
      {/* Left Side: Sign In */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2rem",
              marginBottom: "2rem",
            }}
          >
            Sign In to SparkBytes!
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
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
              placeholder="Enter your password"
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
                marginBottom: "1rem",
              }}
            >
              SIGN IN
            </button>

            <a
              href="#"
              style={{
                textAlign: "center",
                fontSize: "0.95rem",
                textDecoration: "underline",
                color: "#555",
              }}
            >
              Forgot Password?
            </a>
          </form>
        </div>
      </div>

      {/* Right Side: Sign Up CTA */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${SignInImage})`,
          backgroundRepeat: "no-repeat",
          filter: "brightness(1.2)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          minWidth: "400px",
        }}
      >
        {/* Overlay for better readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontSize: "2.2rem",
              marginBottom: "1rem",
              textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            Hello Friend,
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: "3rem",
              lineHeight: 1.6,
              textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            Enter your personal details <br /> and start getting free food with
            us!
          </p>

          <button
            onClick={() => navigate("/sign-up")}
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
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
