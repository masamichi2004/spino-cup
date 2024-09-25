'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { MonitorIcon } from 'lucide-react';
import { NewRepositoryButton } from '../NewRepositoryButton/NewRepositoryButton';
import { useHomeName } from './useHomeName';
import Loading from '@/src/app/loading';
import { Repo } from "@/src/types/Repo";
import { useRouter } from "next/navigation";

export default function HomeNameMain() {
  const { data, loading, repos } = useHomeName();

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <p>Error: Data not found</p>;
  }

  const router = useRouter();
  const handleClick = (name: string, userId: string) => {
    router.push(`/home/${userId}/${name}`);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white">
      <div className="flex items-center space-x-4 my-6">
        <img
          src={data.avatarUrl}
          alt="Profile picture"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{data.name || 'John'}</h1>
          <p className="text-gray-600">{data.userId || 'Doe'}</p>
        </div>
      </div>
      <Input type="text" placeholder="Set status" className="mb-4" />

      <Button className="w-full mb-6 bg-header shadow-none border">
        <span className="text-black">Edit profile</span>
      </Button>

      <div className="flex justify-between mb-6">
        <span className="text-gray-600">
          <strong className="text-black">{data.followers}</strong> followers
        </span>
        <span className="text-gray-600">
          <strong className="text-black">{data.following}</strong> following
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Achievements</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <svg
              className="w-12 h-12 text-blue-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <text
                x="12"
                y="16"
                textAnchor="middle"
                fill="white"
                fontSize="10"
              >
                M
              </text>
            </svg>
            <span className="absolute bottom-0 right-0 bg-orange-500 text-white text-xs rounded-full px-1">
              x2
            </span>
          </div>
          <svg
            className="w-12 h-12 text-pink-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8">
              YOLO
            </text>
          </svg>
          <svg
            className="w-12 h-12 text-yellow-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10">
              😄
            </text>
          </svg>
        </div>
      </div>
      <NewRepositoryButton />
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Pinned</h2>
          <a href="#" className="text-blue-500 text-sm">
            Customize your pins
          </a>
        </div>
        {/* pinnedItemsをmapでループ */}
        {repos.map((repo : Repo) => (
          <button className="w-full" onClick={() => handleClick(repo.name, repo.userId)}>
            <div key={repo.name} className="border rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <MonitorIcon className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{repo.name}</span>
                <span className="text-gray-500 text-sm">{repo.userId}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
