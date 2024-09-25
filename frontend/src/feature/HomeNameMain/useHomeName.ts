'use client';

import { useEffect, useState } from "react";
import { HomeName, saveToLocalStorage } from "./HomeName";
import useSegment from "@/src/hooks/useSegment";

export const useHomeName = () => {
  const { lastSegment } = useSegment();
  const userId = lastSegment;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const result = await HomeName(userId);
          setData(result);
          
          // データを localStorage に保存
          saveToLocalStorage('homeNameData', result);

        } catch (error) {
          console.error("Error fetching data:", error);
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
