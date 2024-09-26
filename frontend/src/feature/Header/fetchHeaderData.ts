const fetchHeaderData = async (userId: string) => {
  try {
    const response = await fetch(`https://default-1018624218403.asia-northeast1.run.app/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return undefined;
  }
};

export { fetchHeaderData };