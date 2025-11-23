"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function SetupProfile() {
  const [userName, setUserName] = useState("");
  const [bikeName, setBikeName] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { user, userProfile, updateUserProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.displayName && !userName) {
      setUserName(user.displayName);
    }
  }, [user, userName]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }

    if (!loading && user && userProfile?.bikeName) {
      router.push("/dashboard");
    }
  }, [user, userProfile, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !bikeName.trim()) {
      setError("Please fill in both fields");
      return;
    }

    try {
      setError("");
      setIsSaving(true);

      await updateUserProfile({
        userName: userName.trim(),
        bikeName: bikeName.trim()
      });

      router.push("/dashboard");
    } catch (error) {
      setError("Failed to save profile: " + error.message);
      setIsSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-[500px] w-full p-10 bg-white rounded-xl shadow-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-blue-600 overflow-hidden relative">
               {user.photoURL ? (
                 <Image src={user.photoURL} alt="Profile" fill className="object-cover" />
               ) : (
                 <div className="w-full h-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                   {userName ? userName.charAt(0).toUpperCase() : "U"}
                 </div>
               )}
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2 text-blue-600">
            Complete Your Profile
          </h1>
          <p className="text-sm text-gray-500">
            Tell us about yourself and your ride
          </p>
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-5">
            <p className="text-red-600 m-0 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Your Bike
            </label>
            <input
              type="text"
              value={bikeName}
              onChange={(e) => setBikeName(e.target.value)}
              placeholder="e.g., Royal Enfield Classic 350"
              required
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className={`
              w-full p-3.5 bg-blue-600 text-white border-none rounded-lg
              text-base font-bold cursor-pointer transition-colors
              ${isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}
            `}
          >
            {isSaving ? "Saving..." : "Continue to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}