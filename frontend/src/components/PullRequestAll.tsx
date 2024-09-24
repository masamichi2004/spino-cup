import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { GitPullRequest, Check, X, AlertCircle } from "lucide-react"

export default function GitHubPRPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button variant="outline">Labels</Button>
          <Button variant="outline">Milestones</Button>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">New</Button>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="filter" className="sr-only">Filter</Label>
        <Input id="filter" placeholder="is:pr is:open" className="w-full" />
      </div>
      
      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
        <span><GitPullRequest className="inline mr-1" size={16} /> 2 Open</span>
        <span><Check className="inline mr-1" size={16} /> 13 Closed</span>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-2 text-sm font-medium text-gray-500">
        <div>Author</div>
        <div>Label</div>
        <div>Assignee</div>
        <div>Sort</div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <GitPullRequest className="text-green-600" size={16} />
          <span className="font-medium">fix: fix return user data</span>
          <Check className="text-green-600" size={16} />
        </div>
        <div className="text-sm text-gray-500">#15 opened 40 minutes ago by shoooooma415</div>
        
        <div className="flex items-center space-x-2">
          <GitPullRequest className="text-green-600" size={16} />
          <span className="font-medium">chore: ESLintとPrettierのCIを追加</span>
          <X className="text-red-600" size={16} />
        </div>
        <div className="text-sm text-gray-500">#4 opened yesterday by masamichi2004</div>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">CI/CD</span>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="text-blue-600 mt-1" size={20} />
          <div>
            <span className="font-bold">ProTip!</span> What's not been updated in a month: 
            <a href="#" className="text-blue-600 hover:underline">updated:&lt;2024-08-24</a>.
          </div>
        </div>
      </div>
      
      <footer className="mt-8 text-sm text-gray-500">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Security</a>
          <a href="#" className="hover:underline">Status</a>
          <a href="#" className="hover:underline">Docs</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Manage cookies</a>
          <a href="#" className="hover:underline">Do not share my personal information</a>
        </div>
        <div className="text-center mt-4">
          © 2024 GitHub, Inc.
        </div>
      </footer>
    </div>
  )
}