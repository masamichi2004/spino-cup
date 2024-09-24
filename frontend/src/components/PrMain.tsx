import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { GitBranchIcon, GitCommitIcon, CheckCircleIcon, XCircleIcon, MoreHorizontalIcon } from "lucide-react"

export default function PrMain() {
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-none border-none">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="outline" size="sm">
              <span className="mr-2">&lt;&gt;</span>
              Code
              <span className="ml-2">▼</span>
            </Button>
          </div>
          <Button variant="link" className="text-blue-600">Jump to bottom</Button>
        </div>
        <CardTitle className="text-2xl font-bold">check pushup #1</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" className="bg-green-600 text-white hover:bg-green-700">
            <GitBranchIcon className="w-4 h-4 mr-2" />
            Open
          </Button>
          <p className="text-sm text-gray-600">
            hiromuota166 wants to merge 6 commits into <span className="bg-blue-100 text-blue-800 px-1 rounded">develop</span> from <span className="bg-blue-100 text-blue-800 px-1 rounded">feature/RoomNameBtn</span>
            <GitBranchIcon className="inline-block w-4 h-4 ml-2" />
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="conversation" className="w-full">
          <TabsList>
            <TabsTrigger value="conversation">Conversation 1</TabsTrigger>
            <TabsTrigger value="commits">Commits 6</TabsTrigger>
            <TabsTrigger value="checks">Checks 3</TabsTrigger>
          </TabsList>
          <TabsContent value="conversation">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <img src="/testiphoneimg.png" alt="User avatar" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">hiromuota166 commented</p>
                      <p className="text-sm text-gray-500">on Dec 31, 2023</p>
                    </div>
                    <p className="mt-2">腕の角度調整</p>
                    <div className="mt-2 text-2xl">😃</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-4 border-t pt-4">
              <p className="text-sm text-gray-600">hiromuota166 added 3 commits 9 months ago</p>
              <div className="mt-2 space-y-2">
                {[
                  { date: "2024-09-20 18:30:00", hash: "3c349ac" },
                  { date: "2024-09-20 18:40:00", hash: "4f1bad8", status: "error" },
                  { date: "2024-09-20 18:50:00", hash: "53d59f2", status: "success" }
                ].map((commit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <GitCommitIcon className="w-4 h-4 text-gray-400" />
                    <img src="/testiphoneimg.png" alt="Commit author" className="w-5 h-5 rounded-full" />
                    <span className="text-sm">{commit.date}</span>
                    <span className="text-sm text-gray-500">{commit.hash}</span>
                    {commit.status === "error" && <XCircleIcon className="w-4 h-4 text-red-500" />}
                    {commit.status === "success" && <CheckCircleIcon className="w-4 h-4 text-green-500" />}
                  </div>
                ))}
              </div>
            </div>
            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <img src="/testiphoneimg.png" alt="Bot avatar" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">vercel[bot] commented on Dec 31, 2023 • edited</p>
                      <MoreHorizontalIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}