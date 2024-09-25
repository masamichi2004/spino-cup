import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { GitBranchIcon, GitCommitIcon, CheckCircleIcon, XCircleIcon, MoreHorizontalIcon } from "lucide-react"

export default function PrMain() {
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-none border-none">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <Button variant="outline" size="sm" className="shadow-none bg-header">Edit</Button>
            <Button variant="outline" size="sm" className="shadow-none bg-header">
              <span className="mr-2">&lt;&gt;</span>
              Code
              <span className="ml-2">▼</span>
            </Button>
          </div>
          <Button variant="link" className="text-blue-600">Jump to bottom</Button>
        </div>
        <CardTitle className="text-2xl font-bold">check pushup #1</CardTitle>
        <div className="flow-root items-center space-x-2">
          <Button variant="secondary" className="bg-green text-white shadow-none hover:bg-green-700 rounded-full">
            <GitBranchIcon className="w-4 h-4 mr-2" />
            Open
          </Button>
          <p className="text-sm text-gray-600 pt-2">
            hiromuota166 wants to merge 6 commits into <span className="bg-blue-100 text-blue-800 px-1 rounded">pushup</span> from <span className="bg-blue-100 text-blue-800 px-1 rounded">feature/RoomNameBtn</span>
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
            <Card className="w-full max-w-md">
              <CardHeader className="flex flex-row items-center space-x-4 px-4 py-1 bg-header border-b">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/testiphoneimg.png" alt="@masamichi2004" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">masamichi2004</p>
                  <p className="text-sm text-muted-foreground">commented yesterday</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                  <span className="sr-only">More options</span>
                </button>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground py-4">No description provided.</p>
                <div className="bg-header rounded-full w-8 h-8 flex justify-center items-center">
                  <img src="/smile.png" alt="笑顔" className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
            <div className="mt-4 pt-4">
              <p className="text-sm text-gray-600">hiromuota166 added 3 commits 9 months ago</p>
              <div className="mt-2 space-y-2">
                {[
                  { date: "2024-09-20 18:30:00", hash: "3c349ac" },
                  { date: "2024-09-20 18:40:00", hash: "4f1bad8", status: "error" },
                  { date: "2024-09-20 18:50:00", hash: "53d59f2", status: "success" }
                ].map((commit, index) => (
                  <div key={index} className="flex items-center space-x-2 justify-between">
                    <div className="flex">
                      <GitCommitIcon className="w-4 h-4 text-gray-400" />
                      <img src="/testiphoneimg.png" alt="Commit author" className="w-5 h-5 ml-1 rounded-full" />
                      <span className="ml-1 text-sm">{commit.date}</span>
                    </div>
                    <div className="flex items-center">
                      {commit.status === "error" && <XCircleIcon className="w-4 h-4 text-red-500" />}
                      {commit.status === "success" && <CheckCircleIcon className="w-4 h-4 text-green" />}
                      <span className="text-sm text-gray-500">{commit.hash}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}