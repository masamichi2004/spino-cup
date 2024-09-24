import {
  Eye,
  GitFork,
  Star,
  GitBranch,
  Tag,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export default function Component() {
  return (
    <div className="w-full max-w-3xl  bg-white rounded-lg shadow-none border-none pb-4">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="w-8 h-8">
            <Eye className="w-4 h-4" />
            <span className="sr-only">Watch</span>
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8">
            <GitFork className="w-4 h-4" />
            <span className="sr-only">Fork</span>
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8">
            <Star className="w-4 h-4" />
            <span className="sr-only">Star</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <LinkIcon className="w-4 h-4 text-blue-500" />
          <Link href="#" className="text-blue-500 hover:underline">
            mood-hub-five.vercel.app
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-4">
        <Button variant="outline" size="sm" className="h-8">
          <Star className="w-4 h-4 mr-1" />
          Star
          <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full">0</span>
        </Button>
        <div className="flex items-center">
          <GitFork className="w-4 h-4 mr-1" />
          <span className="font-semibold mr-1">0</span> forks
        </div>
        <div className="flex items-center">
          <Eye className="w-4 h-4 mr-1" />
          <span className="font-semibold mr-1">1</span> watching
        </div>
        <div className="flex items-center">
          <GitBranch className="w-4 h-4 mr-1" />
          <span className="font-semibold mr-1">28</span> Branches
        </div>
        <div className="flex items-center">
          <Tag className="w-4 h-4 mr-1" />
          <span className="font-semibold mr-1">0</span> Tags
        </div>
        <Button variant="ghost" size="sm" className="h-8">
          Activity
        </Button>
      </div>
      <div className="mt-4 text-sm text-gray-600">Public repository</div>
    </div>
  );
}
