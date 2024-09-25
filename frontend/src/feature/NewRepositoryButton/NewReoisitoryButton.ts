'use client';
import { getFromLocalStorage } from '../HomeNameMain/HomeName';

export async function fetchData(repoName: string, githubId: string) {
  // localStorageからトークンを取得
  const localtoken = localStorage.getItem('homeNameData');
  if (!localtoken) {
    console.error('No homeNameData found in localStorage');
    return;
  }

  const { accessToken: token } = JSON.parse(localtoken);
  if (!token) {
    console.error('No access token found in homeNameData');
    return;
  }

  console.log('Token from localStorage:', token);

  const url = `http://localhost:8080/create/repo`;
  const body = { repoName, githubId };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Responseの確認
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const { redirectUrl } = await response.json();
    if (redirectUrl) {
      window.location.href = redirectUrl;  // リダイレクト実行
    } else {
      console.error('Redirect URL not found');
    }
  } catch (error: any) {
    if (error.name === 'TypeError') {
      console.error('Network error or server is unreachable.');
    } else {
      console.error('Fetch error:', error.message);
    }
  }
}
