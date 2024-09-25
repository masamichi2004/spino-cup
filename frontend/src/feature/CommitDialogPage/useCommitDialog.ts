'use client';

import { useEffect, useState } from "react";
import { HomeName, getFromLocalStorage } from "@/src/feature/HomeNameMain/HomeName";
import useSegment from "@/src/hooks/useSegment";

export const useHomeName = () => {
  const { lastSegment } = useSegment();
  const userId = lastSegment;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // localStorage からデータを取得
    const storedData = getFromLocalStorage('homeNameData');
    
    // データが存在すればコンソールに表示
    if (storedData) {
      console.log('Stored data from localStorage:', storedData);
    } else {
      console.log('No data found in localStorage for key: homeNameData');
    }
  }, []);

  return { data, loading };
};
