// hooks/useCreateTraining.ts
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { fetchPart } from './AddTraining';
import { useState } from "react";

export const useCreateTraining = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const name = segments[1];
  const part = segments[2];
  const [training, setTraining] = useState<string>('');

  const router = useRouter();

  const handleClick = async () => {
    if (name && training) {
      try {
        const result = await fetchPart(training);
        if (result) {
          router.push(`/home/${name}/${part}/${training}`);
        } else {
          console.error('Error: result is undefined or falsy');
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    } else {
      console.error("name or part is undefined");
    }
  };

  return { training, setTraining, handleClick };
};
