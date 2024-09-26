import { getFromLocalStorage } from '../HomeNameMain/HomeName';

export async function postWorkoutData(
  ownerId: string,
  repoName: string,
  dirName: string,
  sets: { weight: number; reps: number }[]
) {
  const url = `https://default-1018624218403.asia-northeast1.run.app/commit`;
  const timestamp = Date.now().toString();

  // localStorageからトークンを取得
  const localtoken = localStorage.getItem('homeNameData');
  if (!localtoken) {
    console.error('No homeNameData found in localStorage');
    return;
  }

  const token = JSON.parse(localtoken).accessToken;
  if (!token) {
    console.error('No access token found in homeNameData');
    return;
  }

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
  console.log('Curl command to execute:\n', curlCommand);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // レスポンスのステータスが200-299以外の場合はエラーを投げる
    if (!response.ok) {
      const errorText = await response.text(); // エラーメッセージを取得
      throw new Error(`HTTP error! Status: ${response.status}: ${errorText}`);
    }

    // 成功レスポンスをパースして返す
    const result = await response.json();
    console.log('Response:', result);
    return result;
  } catch (error: any) {
    console.error('Error during fetch:', error.message || error);
    throw error; // 再度エラーを投げることで呼び出し元で処理できる
  }
}
