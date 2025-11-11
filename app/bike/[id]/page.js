"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BikeDetail() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5050/bikes/${id}`)
      .then(res => res.json())
      .then(data => setBike(data));
  }, [id]);

  if (!bike) return <h3>Loading...</h3>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{bike.name}</h1>
      <p><strong>Brand:</strong> {bike.brand}</p>
      <p><strong>Engine:</strong> {bike.engine}</p>
      <p><strong>Price:</strong> {bike.price}</p>
      <p><strong>Description:</strong> {bike.description}</p>

      <p>
  <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
    ← Back to Home
  </a>
</p>

    </div>

    
  );
}
