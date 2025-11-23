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
      router.push(`/bikes/${bikeId}`);
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
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="absolute top-5 right-5 flex items-center gap-4">
        <div 
          onClick={handleProfileClick}
          className="w-12 h-12 rounded-full bg-blue-600 border-4 border-blue-700 flex items-center justify-center text-white text-xl font-bold cursor-pointer hover:scale-110 transition-transform overflow-hidden"
          title="View Profile"
        >
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            userProfile?.userName ? userProfile.userName.charAt(0).toUpperCase() : "U"
          )}
        </div>

        <button 
          onClick={handleLogout}
          className="px-5 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="text-center pt-24 px-5">
        <h1 className="text-5xl font-bold text-blue-600 mb-3">
          Welcome to Riders App
        </h1>
        
        {userProfile?.userName && (
          <p className="text-xl text-gray-700 mb-10">
            Hello, <strong>{userProfile.userName}</strong>! 
          </p>
        )}

        <h3 className="text-xl text-gray-800 mb-6 font-semibold">
          Select the bike you want to know about:
        </h3>

        <select
          value={selectedBike}
          onChange={handleSelectChange}
          className="px-6 py-3 text-lg border-2 border-blue-600 rounded-lg cursor-pointer min-w-[300px] bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
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