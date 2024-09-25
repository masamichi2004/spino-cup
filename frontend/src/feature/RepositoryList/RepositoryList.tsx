import {
  ChevronDown,
  MoreHorizontal,
  Folder,
  FileText,
  Clock,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { AddMachoButton } from '@/src/feature/AddTrainingButton/AddTrainingButton';

export default function Component() {
  const files = [
    { name: 'chestpress', type: 'folder', timeAgo: '10 months ago' },
    { name: 'pushup', type: 'folder', timeAgo: '10 months ago' },
    { name: 'declinepush-up', type: 'folder', timeAgo: '10 months ago' },
    { name: 'inclinepush-up', type: 'folder', timeAgo: '7 months ago' },
    { name: 'archerpush-up', type: 'folder', timeAgo: '7 months ago' },
    { name: '.eslintignore', type: 'file', timeAgo: '10 months ago' },
    { name: '.eslintrc.json', type: 'file', timeAgo: '10 months ago' },
    { name: '.gitignore', type: 'file', timeAgo: '7 months ago' },
    { name: 'prettierignore', type: 'file', timeAgo: '10 months ago' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white">
      <div className="flex justify-between items-center py-4 px-0 ">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="bg-header">
            develop
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {/* ここにadd machoをを挿入します */}
          <AddMachoButton />
          <Button variant="outline" size="icon" className="w-8 h-8 bg-header">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto bg-header rounded-lg shadow-none border">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-6 w-6 bg-header">
              <AvatarImage src="/testiphoneimg.png" alt="@shunkicreate" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Shunkicreate</span>
            <span className="text-sm text-gray-500">7 months ago</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Clock className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <ul>
          {files.map((file, index) => (
            <li
              key={file.name}
              className={`flex items-center justify-between py-2 px-4 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {file.type === 'folder' ? (
                  <Folder className="h-5 w-5 text-blue-500" />
                ) : (
                  <FileText className="h-5 w-5 text-gray-500" />
                )}
                <span className="text-sm">{file.name}</span>
              </div>
              <span className="text-sm text-gray-500">{file.timeAgo}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
