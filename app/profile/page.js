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
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "20px"
    }}>
      <div style={{ 
        maxWidth: "500px",
        width: "100%",
        padding: "40px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ 
          textAlign: "center", 
          marginBottom: "35px", 
          color: "#0070f3",
          fontSize: "32px"
        }}>
          Your Profile
        </h1>

        <div style={{ marginBottom: "30px" }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            marginBottom: "30px" 
          }}>
            <div style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: user.photoURL ? "transparent" : "#0070f3",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "48px",
              fontWeight: "bold",
              border: "4px solid #0070f3",
              overflow: "hidden"
            }}>
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
          </div>

          <div style={{ 
            padding: "18px", 
            backgroundColor: "#f9f9f9", 
            borderRadius: "8px",
            marginBottom: "15px",
            border: "1px solid #e0e0e0"
          }}>
            <p style={{ margin: "0", fontSize: "13px", color: "#888", fontWeight: "600" }}>
              NAME
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: "20px", fontWeight: "bold", color: "#333" }}>
              {userProfile?.userName || user.displayName || "Not set"}
            </p>
          </div>

          <div style={{ 
            padding: "18px", 
            backgroundColor: "#f9f9f9", 
            borderRadius: "8px",
            marginBottom: "15px",
            border: "1px solid #e0e0e0"
          }}>
            <p style={{ margin: "0", fontSize: "13px", color: "#888", fontWeight: "600" }}>
              EMAIL
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: "18px", fontWeight: "600", color: "#333" }}>
              {user.email}
            </p>
          </div>

          <div style={{ 
            padding: "18px", 
            backgroundColor: "#f9f9f9", 
            borderRadius: "8px",
            marginBottom: "30px",
            border: "1px solid #e0e0e0"
          }}>
            <p style={{ margin: "0", fontSize: "13px", color: "#888", fontWeight: "600" }}>
              YOUR BIKE
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: "20px", fontWeight: "bold", color: "#333" }}>
              {userProfile?.bikeName || "Not set"}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleBackToDashboard}
            style={{
              flex: 1,
              padding: "14px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            Dashboard
          </button>

          <button
            onClick={handleLogout}
            style={{
              flex: 1,
              padding: "14px",
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}