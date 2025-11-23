"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { loginWithGoogle, user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !authLoading) {

      if (userProfile?.bikeName) {
        router.push("/dashboard");
      } else {
        router.push("/setup-profile");
      }
    }
  }, [user, userProfile, authLoading, router]);

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setIsLoggingIn(true);
      await loginWithGoogle();
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled. Please try again.");
      } else if (error.code === "auth/popup-blocked") {
        setError("Pop-up was blocked. Please allow pop-ups for this site.");
      } else if (error.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Failed to sign in: " + error.message);
      }
      
      setIsLoggingIn(false);
    }
  };

  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{ 
        maxWidth: "400px", 
        width: "100%",
        padding: "40px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ 
            fontSize: "32px", 
            marginBottom: "10px",
            color: "#0070f3" 
          }}>
            Riders App
          </h1>
          <p style={{ fontSize: "16px", color: "#666" }}>
            Welcome back! Sign in to continue
          </p>
        </div>
        
        {error && (
          <div style={{ 
            padding: "12px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "6px",
            marginBottom: "20px"
          }}>
            <p style={{ color: "#c00", margin: 0, fontSize: "14px" }}>
              {error}
            </p>
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoggingIn || authLoading}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "white",
            color: "#444",
            border: "2px solid #ddd",
            borderRadius: "8px",
            cursor: (isLoggingIn || authLoading) ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            transition: "all 0.2s",
            opacity: (isLoggingIn || authLoading) ? 0.6 : 1
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          
          {(isLoggingIn || authLoading) ? "Signing in..." : "Continue with Google"}
        </button>

        <p style={{ 
          textAlign: "center", 
          marginTop: "30px", 
          fontSize: "14px",
          color: "#888"
        }}>
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}