import React from 'react'
import HumberMenu from '../HumberMenu/HumberMenu'

const Header = () => {
  return (
    <header className='bg-header border-b'>
      <div className='flex h-14 px-4 pt-4 pb-2' >
        <div className='flex justify-start w-full'>
          <div className='flex w-8 h-auto justify-start'>
            <HumberMenu />
          </div>
          <a href="" className='w-8 h-8 flex justify-center ml-4'>
            <img src="/macho.ico" alt="githubのiconの代わり" className='w-8 h-8' />
          </a>
          {/* 動的に変化 */}
          <div className='ml-4 w-40'>
            <button className='flex flex-col w-3/4 h-full'>
              <span className='text-xs'>basco shot /</span>
              <span className='text-xs font-bold'>leg</span>
            </button>
          </div>
        </div>
        <div className='flex justify-end'>
          <div className='self-end h-8 w-8 flex justify-center border-gray-500 border rounded-lg'>
            <button>
              <img src="/search.png" alt="" width={18} height={18} />
            </button>
          </div>
          <div className='self-end h-8 w-8 flex justify-center border-gray-500 border rounded-lg ml-2'>
            <button>
              <img src="/filetray.png" alt="" width={18} height={18} />
            </button>
          </div>
          {/* 動的に変化 */}
          <div className='self-end h-8 w-8 flex justify-center ml-2'>
            <img src="/testiphoneimg.png" alt="githubのiconの代わり" className='w-8 h-8 rounded-full' />
          </div>
        </div>
      </div>
      <div className='w-full h-12 px-4 py-2'>
        <div className='h-full flex justify-between'>
          <div>
            {/* この中は後々設定 */}
          </div>
          <div className=''>
            <div className='self-end h-8 w-8 flex justify-center border-gray-500 border rounded-lg ml-2'>
              <button>
                <img src="/kebab.png" alt="" width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header