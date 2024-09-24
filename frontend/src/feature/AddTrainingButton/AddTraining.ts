'use client';

const fetchPart = async (training: string) => {
  try {
    const response = await fetch(`http://localhost:8080/${training}`, {
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
