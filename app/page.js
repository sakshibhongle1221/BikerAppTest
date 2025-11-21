"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();

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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Auth Status Bar */}
      <div style={{ 
        position: "absolute", 
        top: "20px", 
        right: "20px",
        display: "flex",
        gap: "10px"
      }}>
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button 
              onClick={handleLogout}
              style={{
                padding: "5px 15px",
                backgroundColor: "#ff4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button style={{
                padding: "5px 15px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}>
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button style={{
                padding: "5px 15px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}>
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>

      <h1>Welcome to the Bikers App</h1>
      <h3>Select the bike you want to know about:</h3>

      <select
        value={selectedBike}
        onChange={handleSelectChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid gray",
          cursor: "pointer",
        }}
      >
        <option value="">Select the bike</option>
        {bikes.map((bike) => (
          <option key={bike.id} value={bike.id}>
            {bike.name}
          </option>
        ))}
      </select>
    </div>
  );
}