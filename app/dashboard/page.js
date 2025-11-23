"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState("");
  const router = useRouter();
  const { user, userProfile, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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

  if (!user) {
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative", backgroundColor: "#f9f9f9" }}>
      <div style={{ 
        position: "absolute", 
        top: "20px", 
        right: "20px",
        display: "flex",
        alignItems: "center",
        gap: "15px"
      }}>
        <div 
          onClick={handleProfileClick}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: user.photoURL ? "transparent" : "#0070f3",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            border: "3px solid #0070f3",
            overflow: "hidden"
          }}
          title="View Profile"
        >
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          ) : (
            userProfile?.userName ? userProfile.userName.charAt(0).toUpperCase() : "U"
          )}
        </div>

        <button 
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ textAlign: "center", paddingTop: "100px", padding: "100px 20px 20px 20px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "10px", color: "#0070f3" }}>
           Welcome to Riders App
        </h1>
        
        {userProfile?.userName && (
          <p style={{ fontSize: "20px", color: "#666", marginBottom: "40px" }}>
            Hello, <strong>{userProfile.userName}</strong>!
          </p>
        )}

        <h3 style={{ marginBottom: "25px", fontSize: "20px", color: "#333" }}>
          Select the bike you want to know about:
        </h3>

        <select
          value={selectedBike}
          onChange={handleSelectChange}
          style={{
            padding: "14px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "2px solid #0070f3",
            cursor: "pointer",
            minWidth: "300px",
            backgroundColor: "white",
            color: "#333"
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