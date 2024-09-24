'use client';
import useSegment from '@/src/hooks/useSegment';
import React from 'react'

const page = () => {
  const { segments } = useSegment();
  const firstSegment = segments[1];
  return (
    <div>
      {firstSegment}
    </div>
  )
}

export default page