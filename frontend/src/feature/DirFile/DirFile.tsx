'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FileIcon } from 'lucide-react';

const DirFile = () => {
  const [token, setToken] = useState<string | null>(null); // Store token in state
  const [files, setFiles] = useState<any[]>([]); // State to store the fetched data

  // Get the path segments from the URL
  const pathsegments = usePathname();
  const segments = pathsegments.split('/').filter(Boolean);
  const [home, userId, repoName, filePath] = segments;

  // Only run the localStorage access in the client (browser)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localstorage = localStorage.getItem('homeNameData');
      if (localstorage) {
        const parsedData = JSON.parse(localstorage);
        setToken(parsedData.accessToken); // Set token from localStorage
      }
    }
  }, []); // Empty dependency array to run only once

  // Fetch data when token, userId, repoName, and filePath are available
  useEffect(() => {
    const fetchData = async (userId: string, repoName: string, filePath: string) => {
      if (!token) return; // Ensure the token is available

      try {
        const response = await fetch(`https://default-1018624218403.asia-northeast1.run.app/dirs/${userId}/${repoName}?path=${filePath}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data:', data); // Log the response to see the returned data
        setFiles(data.dirs); // Set the fetched data into the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (token && userId && repoName && filePath) {
      fetchData(userId, repoName, filePath); // Fetch data once token is available
    }
  }, [token, userId, repoName, filePath]); // Fetch data when these dependencies change

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Directory Files</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Last commit date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.name}>
                  <TableCell className="font-medium flex">
                    <FileIcon className='w-5 h-5'/>
                    <div className='mx-2'>
                      {file.name}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export { DirFile };
