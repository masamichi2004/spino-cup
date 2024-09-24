import Link from "next/link"
import { ChevronRight, Square } from "lucide-react"

export default function BackLink() {
  return (
    <nav className="flex items-center space-x-1 text-sm font-medium">
      <Link
        href="#"
        className="text-blue-600 hover:text-blue-800 transition-colors font-bold"
      >
        spino-cup
      </Link>
      <ChevronRight className="h-4 w-4 text-gray-500" />
      <Link
        href="#"
        className="text-blue-600 hover:text-blue-800 transition-colors font-bold"
      >
        backend
      </Link>
      <ChevronRight className="h-4 w-4 text-gray-500" />
      <img src="/copy.png" alt="githubのiconの代わり" className='w-4 h-4' />
    </nav>
  )
}