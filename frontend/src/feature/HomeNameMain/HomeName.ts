const HomeName = async (userId: string) => {
  try {
    const response = await fetch(`https://default-1018624218403.asia-northeast1.run.app/user/${userId}`, {
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

// localStorage にデータを保存する関数
const saveToLocalStorage = (key: string, value: any) => {
  try {
    // JSON 形式でデータを保存する
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// localStorage からデータを取得する関数（必要な場合）
const getFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

const getRepo = async (userId: string) => {
  try {
    const response = await fetch(`https://default-1018624218403.asia-northeast1.run.app/repos/${userId}`, {
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
}

export { HomeName, saveToLocalStorage, getFromLocalStorage, getRepo };
