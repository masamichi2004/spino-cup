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
import { FolderIcon, FileIcon, EditIcon } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type FileItem = {
  name: string;
  type: string;
};

export default async function TrainingFile() {
  const pathname = usePathname();

  const router = useRouter();
  const handleClick = () => {
    router.push(`${pathname}/commit`);
  };

  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
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

    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/dirs/masamichi2004/spino-cup?path=',
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        const filesData = data.dirs as FileItem[];

        setFiles(filesData);
      } catch (error) {
        console.error('Error fetching directories:', error);
      }
    };

    fetchData();
  }, []); // 空の依存配列を指定して初回レンダリング時のみ実行

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex items-center space-x-2 text-sm text-gray-500 justify-between">
        <div className="flex items-center gap-x-2">
          <img
            src="/testiphoneimg.png"
            alt="githubのiconの代わり"
            className="w-8 h-8 rounded-full"
          />
          <span>masamichi2004</span>
          <span>15 hours ago</span>
        </div>
        <div>
          <Button onClick={handleClick}>Add Commit</Button>
        </div>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Repository Files</CardTitle>
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
                  <TableCell className="font-medium">
                    {file.type === 'dir' ? (
                      <FolderIcon className="inline mr-2 h-4 w-4 text-blue-500" />
                    ) : (
                      <FileIcon className="inline mr-2 h-4 w-4 text-gray-500" />
                    )}
                    {/* 一旦ね */}
                    <a href="/home/name/part/training">{file.name}</a>
                  </TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            README.md
            <EditIcon className="h-4 w-4 text-gray-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-md">
            <code>
              {`npm install
npm run dev

open http://localhost:3000`}
            </code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
