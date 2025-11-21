"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Load user profile from localStorage
        const savedProfile = localStorage.getItem(`userProfile_${user.uid}`);
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up function
  const signup = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  };

  // Login function
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  };

  // Logout function
  const logout = () => {
    return signOut(auth);
  };

  // Update user profile
  const updateUserProfile = (profileData) => {
    if (user) {
      const profile = {
        ...profileData,
        email: user.email,
        uid: user.uid
      };
      
      // Save to localStorage
      localStorage.setItem(`userProfile_${user.uid}`, JSON.stringify(profile));
      setUserProfile(profile);
      
      return Promise.resolve(profile);
    }
    return Promise.reject(new Error("No user logged in"));
  };

  const value = {
    user,
    userProfile,
    loading,
    signup,
    login,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}