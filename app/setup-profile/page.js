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
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg w-full px-8 py-10 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-600"
            />
          )}
          
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 text-sm">
            Tell us about yourself and your ride
          </p>
        </div>
        
        {error && (
          <div className="p-3 mb-5 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Your Bike
            </label>
            <input
              type="text"
              value={bikeName}
              onChange={(e) => setBikeName(e.target.value)}
              placeholder="e.g., Royal Enfield Classic 350"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Continue to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}