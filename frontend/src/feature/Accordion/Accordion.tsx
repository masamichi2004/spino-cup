'use client';
import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Branches')
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const branches = [
    { name: 'main', isDefault: true },
    { name: 'chore/set-ci', isDefault: false },
    { name: 'feat/enverment', isDefault: false },
    { name: 'feat/fetch-components-example', isDefault: false },
    { name: 'feat/name-part-page', isDefault: false },
    { name: 'feat/repository-info', isDefault: false },
    { name: 'feat/shadcn', isDefault: false },
    { name: 'infra/apprunner-deploy', isDefault: false },
  ]

  const filteredBranches = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="w-64 font-sans relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className="justify-between text-left font-normal flex bg-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" />
          </svg>
          main
        </div>
        <ChevronDown className="h-4 w-4 pl-2" />
      </Button>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 rounded-md border border-gray-200 bg-white shadow-lg z-10">
          <div className="p-2">
            <h2 className="mb-2 text-sm font-semibold">Switch branches/tags</h2>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Find or create a branch..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex border-b border-gray-200">
            <Button
              variant="ghost"
              className={`flex-1 rounded-none ${activeTab === 'Branches' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('Branches')}
            >
              Branches
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 rounded-none ${activeTab === 'Tags' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('Tags')}
            >
              Tags
            </Button>
          </div>
          <ul className="max-h-64 overflow-auto p-2">
            {filteredBranches.map((branch) => (
              <li key={branch.name} className="flex items-center justify-between py-1">
                <span className="text-sm">{branch.name}</span>
                {branch.isDefault && (
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs">default</span>
                )}
                {branch.name === 'main' && <Check className="h-4 w-4 text-green-500" />}
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 p-2">
            <Button variant="ghost" className="w-full justify-start text-sm font-normal">
              View all branches
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}