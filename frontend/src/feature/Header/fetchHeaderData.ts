const fetchHeaderData = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:8080/user/${userId}`, {
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
    return undefined;
  }
};

export { fetchHeaderData };