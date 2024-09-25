import { getFromLocalStorage } from "../HomeNameMain/HomeName";

export async function postWorkoutData(
  ownerId: string,
  repoName: string,
  dirName: string,
  sets: { weight: number; reps: number }[]
) {
  const url = `http://localhost:8080/commit`;
  const timestamp = Date.now();

  // localStorageからトークンを取得
  const token = getFromLocalStorage('accessToken');

  const body = {
    userId: ownerId,
    repoName: repoName,
    dirName: dirName,
    jsonData: sets,
    commitMessage: timestamp,
  };

  // curlコマンド形式で出力
  const curlCommand = `
curl -X POST ${url} \\
-H "Authorization: Bearer ${token}" \\
-H "Content-Type: application/json" \\
-d '${JSON.stringify(body, null, 2)}'
  `;
  console.log("Curl command to execute:\n", curlCommand);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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
