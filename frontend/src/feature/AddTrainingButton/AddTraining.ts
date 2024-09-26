'use client';

const fetchPart = async (training: string) => {
  try {
    const response = await fetch(`https://default-1018624218403.asia-northeast1.run.app/${training}`, {
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
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return undefined;
  }
};

export { fetchPart };
