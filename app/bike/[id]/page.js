"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BikeDetail() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    setLoading(true);
    fetch(`${apiUrl}/bikes/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Bike not found");
        }
        return res.json();
      })
      .then(data => {
        setBike(data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h3 className="text-center mt-12 text-xl">Loading...</h3>;
  
  if (error) return (
    <div className="text-center mt-12">
      <h3 className="text-red-500 text-xl font-bold">Error: {error}</h3>
      <Link href="/dashboard" className="text-blue-600 underline mt-4 block">
        Return to Dashboard
      </Link>
    </div>
  );

  if (!bike) return null;

  return (
    <div className="text-center mt-12 max-w-2xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{bike.name}</h1>
      
      <div className="space-y-3 text-left max-w-md mx-auto">
        <p className="text-lg"><strong className="font-semibold text-gray-700">Brand:</strong> {bike.brand}</p>
        <p className="text-lg"><strong className="font-semibold text-gray-700">Engine:</strong> {bike.engine}</p>
        <p className="text-lg"><strong className="font-semibold text-gray-700">Price:</strong> {bike.price}</p>
        <p className="text-lg"><strong className="font-semibold text-gray-700">Description:</strong> {bike.description}</p>
      </div>

      <div className="mt-8">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 underline font-medium">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}