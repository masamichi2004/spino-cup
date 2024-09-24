import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SmileIcon, MonitorIcon } from "lucide-react"

export default function UserProfile() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src="/placeholder.svg?height=80&width=80"
          alt="Profile picture"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">hiromu</h1>
          <p className="text-gray-600">hiromuota166</p>
        </div>
      </div>

      <Input
        type="text"
        placeholder="Set status"
        className="mb-4"
        icon={<SmileIcon className="w-4 h-4 text-gray-400" />}
      />

      <Button className="w-full mb-6">Edit profile</Button>

      <div className="flex justify-between mb-6">
        <span className="text-gray-600">
          <strong className="text-black">10</strong> followers
        </span>
        <span className="text-gray-600">
          <strong className="text-black">10</strong> following
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

      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Pinned</h2>
          <a href="#" className="text-blue-500 text-sm">
            Customize your pins
          </a>
        </div>
        <div className="border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <MonitorIcon className="w-5 h-5 text-gray-500" />
            <span className="font-medium">chest</span>
            <span className="text-gray-500 text-sm">Public</span>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  )
}