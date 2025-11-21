"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SetupProfile() {
  const [userName, setUserName] = useState("");
  const [bikeName, setBikeName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, updateUserProfile } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !bikeName.trim()) {
      setError("Please fill in both fields");
      return;
    }

    try {
      setError("");
      setLoading(true);

      // Save user profile data
      await updateUserProfile({
        userName: userName.trim(),
        bikeName: bikeName.trim()
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      setError("Failed to save profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: "400px", 
      margin: "50px auto", 
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px"
    }}>
      <h1 style={{ textAlign: "center" }}>Complete Your Profile</h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
        Tell us about yourself
      </p>
      
      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Your Name:
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Your Bike:
          </label>
          <input
            type="text"
            value={bikeName}
            onChange={(e) => setBikeName(e.target.value)}
            placeholder="Enter your bike name"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px"
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>
  );
}