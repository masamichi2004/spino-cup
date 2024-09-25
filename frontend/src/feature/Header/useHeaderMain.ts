'use client';

import { useEffect, useState } from 'react';
import { fetchHeaderData } from './fetchHeaderData';
import useSegment from '@/src/hooks/useSegment';

export const useHeader = () => {
  const { segments } = useSegment();
  const userId = segments[1];
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const result = await fetchHeaderData(userId);
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return { data, loading };
};
