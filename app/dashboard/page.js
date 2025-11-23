"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/bikes`)
        .then((res) => res.json())
        .then((data) => setBikes(data))
        .catch((err) => console.error("Error fetching bikes:", err));
    }
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
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen relative bg-gray-50">
      <div className="absolute top-5 right-5 flex items-center gap-4">
        <div 
          onClick={handleProfileClick}
          className="w-[50px] h-[50px] rounded-full bg-blue-600 text-white flex justify-center items-center text-xl font-bold cursor-pointer border-2 border-blue-600 overflow-hidden relative"
          title="View Profile"
        >
          {user.photoURL ? (
            <Image 
              src={user.photoURL} 
              alt="Profile"
              fill
              className="object-cover"
              sizes="50px"
            />
          ) : (
            userProfile?.userName ? userProfile.userName.charAt(0).toUpperCase() : "U"
          )}
        </div>

        <button 
          onClick={handleLogout}
          className="px-5 py-2.5 bg-red-500 text-white border-none rounded-md cursor-pointer text-sm font-bold hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="text-center pt-[100px] px-5 pb-5">
        <h1 className="text-4xl font-bold mb-2 text-blue-600">
           Welcome to Riders App
        </h1>
        
        {userProfile?.userName && (
          <p className="text-xl text-gray-600 mb-10">
            Hello, <strong>{userProfile.userName}</strong>!
          </p>
        )}

        <h3 className="mb-6 text-xl text-gray-800">
          Select the bike you want to know about:
        </h3>

        <select
          value={selectedBike}
          onChange={handleSelectChange}
          className="p-3.5 text-base rounded-lg border-2 border-blue-600 cursor-pointer min-w-[300px] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
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