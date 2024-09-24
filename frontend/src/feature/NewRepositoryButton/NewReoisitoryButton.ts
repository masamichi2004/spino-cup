'use client';

const fetchData = async (part: string) => {
  try {
    const response = await fetch(`http://localhost:8080/${part}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data; // データを返す
  } catch (error) {
    console.error('Fetch error:', error);
    return undefined; // エラー時はundefinedを返す
  }
};

export { fetchData };
