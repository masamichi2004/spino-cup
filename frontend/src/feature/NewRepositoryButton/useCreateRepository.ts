import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { fetchData } from './NewReoisitoryButton';
import { useState } from 'react';

export const useCreateRepository = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const name = segments[1];
  const [part, setPart] = useState<string>('');

  const router = useRouter();

  const handleClick = async () => {
    if (name && part) {
      try {
        const redirectUrl = await fetchData(part, name);
        if (redirectUrl) {
          router.push(redirectUrl);
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
