"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const SERVER_URL = "http://localhost:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(SERVER_URL);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!message) return <p>Loading...</p>;

  return <p>{message}</p>;
}
