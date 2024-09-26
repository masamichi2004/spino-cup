"use client";

import { useEffect, useState } from 'react';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getColor = (count: number) => {
  if (count === 0) return 'bg-gray-100';
  if (count < 3) return 'bg-palegreen';
  if (count < 6) return 'bg-lightgreen';
  if (count < 9) return 'bg-green';
  return 'bg-green-500';
};

export default function ContributionGraph() {
  const [days, setDays] = useState<Date[]>([]);
  const [contributionData, setContributionData] = useState<{ commit: { [key: string]: number } }>({ commit: {} });

  useEffect(() => {
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const allDays = [];
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      allDays.push(new Date(d));
    }
    setDays(allDays);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 'exampleUserId',
            dateKey: '20240926',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setContributionData(data); // サーバーから取得したデータをセット
      } catch (error) {
        console.error('Error fetching contribution data:', error);
      }
    };

    fetchData(); // データ取得関数を呼び出す
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-wrap gap-1">
        {days.map((day, index) => {
          const dateString = day.toISOString().split('T')[0].replace(/-/g, '');
          const count = contributionData.commit[dateString] || 0; // サーバーから取得したデータを使う

          return (
            <div key={index} className="relative group">
              <div
                className={`w-3 h-3 rounded-sm ${getColor(count)}`}
                title={`${day.toDateString()}: ${count} contributions`}
              ></div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 hidden group-hover:block whitespace-nowrap">
                {day.toDateString()}: {count} contributions
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2">
        {monthNames.map((month, index) => (
          <span key={index} className="text-xs text-gray-500">{month}</span>
        ))}
      </div>
      <div className="flex items-center justify-end mt-2">
        <span className="text-xs text-gray-500 mr-2">Less</span>
        {[0, 2, 5, 8, 10].map((count, index) => (
          <div key={index} className={`w-3 h-3 rounded-sm ${getColor(count)} mr-1`}></div>
        ))}
        <span className="text-xs text-gray-500 ml-1">More</span>
      </div>
    </div>
  );
}
