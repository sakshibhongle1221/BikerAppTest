"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function BikeDetail() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (id && user && !authLoading) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://bikerapp-backend-694862036731.asia-south1.run.app';
      
      setIsLoading(true);
      fetch(`${apiUrl}/bikes/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Failed to fetch bike: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setBike(data);
          setError(null);
        })
        .catch(err => {
          console.error("Error fetching bike:", err);
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, user, authLoading]);

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl text-gray-700">Loading...</h3>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 gap-4 p-5">
        <div className="max-w-md w-full px-8 py-10 bg-white rounded-xl shadow-lg text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-red-600 mb-2">Error Loading Bike</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h3 className="text-xl text-gray-700">No bike found</h3>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-5">
      <div className="max-w-2xl w-full px-8 py-10 bg-white rounded-xl shadow-lg border-2 border-blue-600">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          {bike.name}
        </h1>
        
        <div className="space-y-5">
          <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-semibold text-gray-500 mb-1">Brand</p>
            <p className="text-xl font-bold text-gray-800">{bike.brand}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-semibold text-gray-500 mb-1">Engine</p>
            <p className="text-xl font-bold text-gray-800">{bike.engine}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-semibold text-gray-500 mb-1">Price</p>
            <p className="text-xl font-bold text-gray-800">{bike.price}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 mb-8">
            <p className="text-sm font-semibold text-gray-500 mb-1">Description</p>
            <p className="text-base text-gray-700 leading-relaxed">{bike.description}</p>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}