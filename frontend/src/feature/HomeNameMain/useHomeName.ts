'use client';

import { useEffect, useState } from "react";
import { HomeName } from "./HomeName";
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
          const result = await HomeName(userId);          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error); // エラーの詳細を確認
        } finally {
          setLoading(false); // ローディングの終了
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return { data, loading };
};
