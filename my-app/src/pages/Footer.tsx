import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "1rem 0",
        textAlign: "center",
        marginTop: "auto", // Makes sure the footer stays at the bottom
      }}
    >
      <div style={{ marginBottom: "0.5rem" }}>
        <p>&copy; 2025 Boston Dynamics SparkBytes</p>
      </div>
      <div>
        <a
          href="/privacy-policy"
          style={{
            color: "#fff",
            textDecoration: "none",
            margin: "0 1rem",
          }}
        >
          Privacy Policy
        </a>
        <a
          href="/terms-of-service"
          style={{
            color: "#fff",
            textDecoration: "none",
            margin: "0 1rem",
          }}
        >
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
