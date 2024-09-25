'use client';
import { useState } from 'react'
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"

export default function DialogComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [dir, setDir] = useState('')

  const handleClick = () => {
    if (dir) {
      console.log("Directory name:", dir)
    } else {
      console.error("No directory name provided.")
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog content. You can add any information or src/components here.
          </DialogDescription>
        </DialogHeader>
        <div>
          <input
            type="text"
            value={dir}
            onChange={(e) => setDir(e.target.value)}
            placeholder="Enter directory name"
            className="input"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => handleClick()}>Submit and Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
