import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { fetchData } from './NewReoisitoryButton';
import { useState } from 'react';

export const useCreateRepository = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const name = segments[1];  // パスから取得した名前
  const [part, setPart] = useState<string>('');  // リポジトリ名を格納する状態

  const router = useRouter();

  const handleClick = async () => {
    if (name && part) {
      try {
        const redirectUrl = await fetchData(part, name);  // partを引数として渡す
        if (redirectUrl) {
          router.push(redirectUrl);  // 成功時にルート遷移
        } else {
          console.error('Error: redirectUrl is undefined or falsy');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    } else {
      console.error('name or part is undefined');
    }
  };

  return { part, setPart, handleClick };
};
