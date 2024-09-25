'use client'
import { useState } from 'react';
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Label } from "@/src/components/ui/label";
import { Camera, X } from 'lucide-react';

function CommitDialog() {
  const [weight, setWeight] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '')
    setWeight(value)
  }

  const handleCommit = () => {
    // Here you would typically send the weight data to your backend
    console.log('Weight committed:', weight)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Enter weight"
          />
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleCommit} className="bg-green hover:bg-green text-white">
            Commit
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} variant="outline">
            <Camera className="mr-2 h-4 w-4" />
            Video Shoot
          </Button>
        </div>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Video Shooting</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center h-40 bg-gray-100 rounded-md">
            <p>Video content would go here</p>
          </div>
          <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="mt-4">
            <X className="mr-2 h-4 w-4" />
            Exit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { CommitDialog };