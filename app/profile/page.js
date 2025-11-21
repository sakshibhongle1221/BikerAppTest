"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, userProfile, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  // Show loading while checking auth
  if (loading) {
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

  // If no user, don't render
  if (!user) {
    return null;
  }

  return (
    <div style={{ 
      maxWidth: "500px", 
      margin: "50px auto", 
      padding: "30px",
      border: "2px solid #0070f3",
      borderRadius: "12px",
      backgroundColor: "#f9f9f9"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#0070f3" }}>
        Your Profile
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          marginBottom: "20px" 
        }}>
          <div style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#0070f3",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "48px",
            fontWeight: "bold",
            border: "4px solid #005bb5"
          }}>
            {userProfile?.userName ? userProfile.userName.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

        <div style={{ 
          padding: "15px", 
          backgroundColor: "white", 
          borderRadius: "8px",
          marginBottom: "15px",
          border: "1px solid #ddd"
        }}>
          <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>Name</p>
          <p style={{ margin: "5px 0 0 0", fontSize: "20px", fontWeight: "bold" }}>
            {userProfile?.userName || "Not set"}
          </p>
        </div>

        <div style={{ 
          padding: "15px", 
          backgroundColor: "white", 
          borderRadius: "8px",
          marginBottom: "15px",
          border: "1px solid #ddd"
        }}>
          <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>Email</p>
          <p style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight: "bold" }}>
            {user.email}
          </p>
        </div>

        <div style={{ 
          padding: "15px", 
          backgroundColor: "white", 
          borderRadius: "8px",
          marginBottom: "25px",
          border: "1px solid #ddd"
        }}>
          <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>Your Bike</p>
          <p style={{ margin: "5px 0 0 0", fontSize: "20px", fontWeight: "bold" }}>
            {userProfile?.bikeName || "Not set"}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleBackToDashboard}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Back to Dashboard
        </button>

        <button
          onClick={handleLogout}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#ff4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}