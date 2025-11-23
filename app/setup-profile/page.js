"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SetupProfile() {
  const [userName, setUserName] = useState("");
  const [bikeName, setBikeName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, userProfile, updateUserProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.displayName) {
      setUserName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !bikeName.trim()) {
      setError("Please fill in both fields");
      return;
    }

    try {
      setError("");
      setLoading(true);

      await updateUserProfile({
        userName: userName.trim(),
        bikeName: bikeName.trim()
      });

      router.push("/dashboard");
    } catch (error) {
      setError("Failed to save profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{ 
        maxWidth: "500px",
        width: "100%",
        padding: "40px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt="Profile"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                marginBottom: "15px",
                border: "3px solid #0070f3"
              }}
            />
          )}
          
          <h1 style={{ fontSize: "28px", marginBottom: "8px", color: "#0070f3" }}>
            Complete Your Profile
          </h1>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Tell us about yourself and your ride
          </p>
        </div>
        
        {error && (
          <div style={{ 
            padding: "12px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "6px",
            marginBottom: "20px"
          }}>
            <p style={{ color: "#c00", margin: 0, fontSize: "14px" }}>
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#333"
            }}>
              Your Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "2px solid #ddd",
                fontSize: "16px"
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#333"
            }}>
              Your Bike
            </label>
            <input
              type="text"
              value={bikeName}
              onChange={(e) => setBikeName(e.target.value)}
              placeholder="e.g., Royal Enfield Classic 350"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "2px solid #ddd",
                fontSize: "16px"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading ? "#ccc" : "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            {loading ? "Saving..." : "Continue to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}