import { Button } from '@/src/components/ui/button'
import React from 'react'

const NewRepositoryButton = () => {
  return (
    <Button className="w-full mb-6 bg-green shadow-none border">
      <span className="text-white">New Repository</span>
    </Button>
  )
}

export { NewRepositoryButton };