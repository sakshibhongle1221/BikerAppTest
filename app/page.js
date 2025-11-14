"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState("");
  const router = useRouter();

  
  useEffect(() => {
    fetch("https://bikerapp-backend-694862036731.asia-south1.run.app/bikes")
      .then((res) => res.json())
      .then((data) => setBikes(data))
      .catch((err) => console.error("Error fetching bikes:", err));
  }, []);

  
  const handleSubmit = () => {
    if (selectedBike) {
      router.push(`/bike/${selectedBike}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Bikers App</h1>
      <h3>Select the bike you want to know about:</h3>

      <select
        value={selectedBike}
        onChange={(e) => setSelectedBike(e.target.value)}
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

             <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    }} >
        <button
          onClick={handleSubmit}
          style={{
            display: "flex",
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#0A6FEB",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        </div>
    
    </div>
  );
}
