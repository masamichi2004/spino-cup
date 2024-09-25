"use client"

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { MonitorIcon } from "lucide-react";
import { NewRepositoryButton } from "../NewRepositoryButton/NewRepositoryButton";
import { useHomeName } from "./useHomeName";

export default function HomeNameMain() {
  const { data, loading } = useHomeName();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Error: Data not found</p>;
  }

  const pinnedItems = [
    {
      title: "chest",
      visibility: "Public",
      language: "Level 3",
      color: "bg-blue-500"
    },
    {
      title: "legs",
      visibility: "Private",
      language: "Level 2",
      color: "bg-yellow-500"
    },
    {
      title: "back",
      visibility: "Public",
      language: "Level 1",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-white">
      <div className="flex items-center space-x-4 my-6">
        <img
          src={data.avatarUrl}
          alt="Profile picture"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{data.name || "John"}</h1>
          <p className="text-gray-600">{data.userId || "Doe"}</p>
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
            <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10">
                M
              </text>
            </svg>
            <span className="absolute bottom-0 right-0 bg-orange-500 text-white text-xs rounded-full px-1">
              x2
            </span>
          </div>
          <svg className="w-12 h-12 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8">
              YOLO
            </text>
          </svg>
          <svg className="w-12 h-12 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
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
        {pinnedItems.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2">
              <MonitorIcon className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{item.title}</span>
              <span className="text-gray-500 text-sm">{item.visibility}</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span>{item.language}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
