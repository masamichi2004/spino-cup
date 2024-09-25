'use client';
import React from 'react';
import RepositoryInfo from '@/src/feature/RepositoryInfo/RepositoryInfo';
import TrainingFile from '@/src/feature/TrainingFile/TrainingFile';

const page = () => {
  return (
    <div>
      <div className="p-4">
        <h1>
          <div>
            <RepositoryInfo />
            <hr className="border border-gray-300 px-0" />
            <TrainingFile />
          </div>
        </h1>
      </div>
    </div>
  );
};

export default page;
