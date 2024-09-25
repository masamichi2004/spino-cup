'use client';

// アクセストークンを取得
const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

const fetchData = async (part: string) => {
  try {
    // const token = getAccessToken(); // 動的にトークンを取得
    const token = process.env.TAICHI_TMP_ACCESS_TOKEN;
    const userId = 'valen0306'; // ユーザーID
    const repositoryName = part; // 引数として渡されたpartがリポジトリ名

    const response = await fetch(`http://localhost:8080/create/repo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
      },
      body: JSON.stringify({
        repoName: repositoryName, // リポジトリ名を送信データに含める
        githubId: userId, // ユーザーIDを送信データに含める
      }),
    });
    console.log(response);

    // HTTPステータスコードが200番台以外の場合はエラーをスロー
    if (!response.ok) {
      const errorText = await response.text(); // エラー内容を取得
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const redirectUrl = await response.text(); // リダイレクトURLを取得

    location.href = redirectUrl;
  } catch (error: any) {
    // エラーハンドリングの強化
    if (error.name === 'TypeError') {
      // ネットワークエラー（例えばサーバーがダウンしている場合）
      console.error('Network error or server is unreachable.');
    } else {
      // サーバーからのレスポンスエラーやその他のエラー
      console.error('Fetch error:', error.message);
    }
    return undefined; // エラー時はundefinedを返す
  }
};

export { fetchData };
