"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      router.push("/"); 
    } 
    catch (error) {
      setError("Failed to login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: "400px", 
      margin: "50px auto", 
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px"
    }}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Don't have an account?{" "}
        <Link href="/signup" style={{ color: "blue" }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}