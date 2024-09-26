'use client';

import { useEffect, useState } from 'react';
import Loading from '../loading';

export default function Home() {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const SERVER_URL = 'https://default-1018624218403.asia-northeast1.run.app';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(SERVER_URL, { mode: 'no-cors'});
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!message) return <Loading />;

  return <p>{message}</p>;
}
