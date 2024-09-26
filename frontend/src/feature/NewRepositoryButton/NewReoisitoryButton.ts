export async function fetchData(repoName: string, githubId: string): Promise<string | undefined> {
  const localtoken = localStorage.getItem('homeNameData');
  if (!localtoken) {
    console.error('No homeNameData found in localStorage');
    return undefined;
  }

  const token = JSON.parse(localtoken).accessToken;
  if (!token) {
    console.error('No access token found in homeNameData');
    return undefined;
  }

  const url = `https://default-1018624218403.asia-northeast1.run.app/create/repo`;

  const body = {
    repoName: repoName,
    githubId: githubId,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.redirectUrl;
  } catch (error) {
    console.error('Fetch error:', error);
    return undefined;
  }
}
