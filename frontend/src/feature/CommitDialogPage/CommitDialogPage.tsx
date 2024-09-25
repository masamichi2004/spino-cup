'use client'

import { useState } from 'react'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import { Camera, X } from 'lucide-react'
import { postWorkoutData } from './CommitDialog'
import useSegment from '@/src/hooks/useSegment'

function CommitDialog() {
  const { segments } = useSegment();
  const [weight, setWeight] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [home, ownerId, repoName, dirName] = segments;

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //数字のみ許可
    const value = e.target.value.replace(/[^0-9]/g, '')
    setWeight(value)
  }

  const handleCommit = () => {
    const sets = [
      { weight: 16, reps: 15 },
      { weight: 16, reps: 15 },
      { weight: 13, reps: 10 }
    ];
    
    postWorkoutData(ownerId, repoName, dirName, sets);
  }

  return (
    <div>
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
            <Button onClick={handleCommit} className="bg-green text-white">
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
    </div>
  )
}

export { CommitDialog };