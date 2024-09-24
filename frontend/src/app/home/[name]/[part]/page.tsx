'use client';
import React from 'react';
import RepositoryInfo from '@/src/feature/RepositoryInfo/RepositoryInfo';
import RepositoryList from '@/src/feature/RepositoryList/RepositoryList';

const page = () => {
  return (
    <div>
      <div className="p-4">
        <h1>
          <div>
            <RepositoryInfo />
            <hr className="border border-gray-300 px-0" />
            <RepositoryList />
          </div>
        </h1>
      </div>
    </div>
  );
};

export default page;
