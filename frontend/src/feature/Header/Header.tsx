"use client"

import React from 'react';
import HumberMenu from '../HumberMenu/HumberMenu';
import { useHeader } from './useHeaderMain';

export default function Header() {
  const { data, loading } = useHeader();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Error: Data not found</p>;
  }

  return (
    <header className="bg-header border-b">
      <div className="flex h-14 px-4 pt-4 pb-2">
        <div className="flex justify-start w-full">
          <div className="flex w-8 h-auto justify-start">
            <HumberMenu />
          </div>
          <a href="" className="w-8 h-8 flex justify-center ml-4">
            <img src="/testicon.svg" alt="githubのiconの代わり" className="w-8 h-8" />
          </a>
          {/* 動的に変化 */}
          <div className="ml-4 w-40">
            <button className="flex flex-col w-3/4 h-full">
              {data.repo && data.dir ? (
                <>
                  <span className="text-xs">{data.repo}</span>
                  <span className="text-xs font-bold">{data.dir}</span>
                </>
              ) : (
                <span className="text-xs">{data.userId}</span>
              )}
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="self-end h-8 w-8 flex justify-center border-gray-500 border rounded-lg">
            <button>
              <img src="/search.png" alt="Search icon" width={18} height={18} />
            </button>
          </div>
          <div className="self-end h-8 w-8 flex justify-center border-gray-500 border rounded-lg ml-2">
            <button>
              <img src="/filetray.png" alt="File tray icon" width={18} height={18} />
            </button>
          </div>
          {/* 動的に変化 */}
          <div className="self-end h-8 w-8 flex justify-center ml-2">
            <img
              src="/testiphoneimg.png"
              alt="githubのiconの代わり"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-12 px-4 py-2">
        <div className="h-full flex justify-between">
          <div>
            {/* この中は後々設定 */}
          </div>
          <div className="">
            <div className="self-end h-8 w-8 flex justify-center border-gray-500 border rounded-lg ml-2">
              <button>
                <img src="/kebab.png" alt="Kebab icon" width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
