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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-5">
      <div className="max-w-lg w-full px-10 py-12 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Your Profile
        </h1>

        <div className="mb-8">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-blue-600 border-4 border-blue-700 flex items-center justify-center text-white text-5xl font-bold overflow-hidden">
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
          </div>

          <div className="p-5 bg-gray-50 rounded-lg mb-4 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Name
            </p>
            <p className="text-xl font-bold text-gray-800">
              {userProfile?.userName || user.displayName || "Not set"}
            </p>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg mb-4 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Email
            </p>
            <p className="text-lg font-semibold text-gray-800">
              {user.email}
            </p>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg mb-8 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Your Bike
            </p>
            <p className="text-xl font-bold text-gray-800">
              {userProfile?.bikeName || "Not set"}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleBackToDashboard}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}