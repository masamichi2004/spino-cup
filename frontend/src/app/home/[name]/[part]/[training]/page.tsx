'use client';
import BackFile from '@/src/feature/BackFile/BackFile';
import { DirFile } from '@/src/feature/DirFile/DirFile';
import TrainingFile from '@/src/feature/TrainingFile/TrainingFile';
import React from 'react'

const page = () => {
  return (
    <>
      <BackFile />
      <DirFile />
    </>
  )
}

export default page