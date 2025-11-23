"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            const initialProfile = {
              userName: user.displayName || "",
              email: user.email,
              uid: user.uid,
              photoURL: user.photoURL || "",
              createdAt: new Date().toISOString()
            };
            
            await setDoc(userDocRef, initialProfile);
            setUserProfile(initialProfile);
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const updateUserProfile = async (profileData) => {
    if (!user) {
      throw new Error("No user logged in");
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      
      const updatedProfile = {
        ...profileData,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL || "",
        updatedAt: new Date().toISOString()
      };

      await setDoc(userDocRef, updatedProfile, { merge: true });
      setUserProfile(updatedProfile);
      
      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    loginWithGoogle,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}