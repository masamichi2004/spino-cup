import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FolderIcon, FileIcon, EditIcon } from "lucide-react"

export default function TrainingFile() {
  const files = [
    { name: "..", type: "folder", lastCommit: "" },
    { name: "src", type: "folder", lastCommit: "15 hours ago" },
    { name: ".gitignore", type: "file", lastCommit: "last week" },
    { name: "README.md", type: "file", lastCommit: "last week" },
    { name: "package.json", type: "file", lastCommit: "last week" },
    { name: "pnpm-lock.yaml", type: "file", lastCommit: "last week" },
    { name: "tsconfig.json", type: "file", lastCommit: "last week" },
  ]

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <img src="/testiphoneimg.png" alt="githubのiconの代わり" className='w-8 h-8 rounded-full' />
        <span>masamichi2004</span>
        <span>15 hours ago</span>
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
                    {file.type === "folder" ? (
                      <FolderIcon className="inline mr-2 h-4 w-4 text-blue-500" />
                    ) : (
                      <FileIcon className="inline mr-2 h-4 w-4 text-gray-500" />
                    )}
                    {/* 一旦ね */}
                    <a href="/home/name/part/training">
                      {file.name}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">{file.lastCommit}</TableCell>
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
  )
}