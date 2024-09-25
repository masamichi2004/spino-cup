export async function postWorkoutData(
  ownerId: string,
  repoName: string,
  dirName: string,
  sets: { weight: number; reps: number }[]
) {
  const url = `http://localhost:8080/commit/${ownerId}/${repoName}/${dirName}`;

  const body = {
    sets: sets
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // 後々localstorageからaccessTokenを取得するように変更する
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Response:', result);
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
