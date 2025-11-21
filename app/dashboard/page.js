"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState("");
  const router = useRouter();
  const { user, userProfile, logout, loading } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch bikes from API
  useEffect(() => {
    fetch("https://bikerapp-backend-694862036731.asia-south1.run.app/bikes")
      .then((res) => res.json())
      .then((data) => setBikes(data))
      .catch((err) => console.error("Error fetching bikes:", err));
  }, []);

  const handleSelectChange = (event) => {
    const bikeId = event.target.value;
    setSelectedBike(bikeId);

    if (bikeId) {
      router.push(`/bike/${bikeId}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
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

  // If no user, don't render (useEffect will redirect)
  if (!user) {
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Header with Profile Icon and Logout */}
      <div style={{ 
        position: "absolute", 
        top: "20px", 
        right: "20px",
        display: "flex",
        alignItems: "center",
        gap: "15px"
      }}>
        {/* Profile Icon */}
        <div 
          onClick={handleProfileClick}
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            backgroundColor: "#0070f3",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            border: "2px solid #005bb5"
          }}
          title="View Profile"
        >
          {userProfile?.userName ? userProfile.userName.charAt(0).toUpperCase() : "U"}
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          style={{
            padding: "8px 20px",
            backgroundColor: "#ff4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ textAlign: "center", paddingTop: "80px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Welcome to the Riders App
        </h1>
        
        {userProfile?.userName && (
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>
            Hello, <strong>{userProfile.userName}</strong>! 👋
          </p>
        )}

        <h3 style={{ marginBottom: "20px" }}>
          Select the bike you want to know about:
        </h3>

        <select
          value={selectedBike}
          onChange={handleSelectChange}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "2px solid #0070f3",
            cursor: "pointer",
            minWidth: "250px"
          }}
        >
          <option value="">Select a bike</option>
          {bikes.map((bike) => (
            <option key={bike.id} value={bike.id}>
              {bike.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}