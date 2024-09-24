import React from 'react';
import Accordion from './Accordion';
import BackLink from './BackLink';

const BackFile = () => {
  return (
    <div className='w-auto h-24'>
      <div className='w-full px-4 pt-4 pb-0 flex justify-between'>
        <div>
          <div className='flex'>
            <div className='ml-2 mr-4 flex items-center'>
              <div className='mr-2'>
                <img src="/arrow.png" alt="githubのiconの代わり" className='w-4 h-4' />
              </div>
              <div>
                <h1 className='text-xs'>Back</h1>
              </div>
            </div>
            <div>
              <Accordion/>
            </div>
          </div>
          <div>
            <div className='mt-2'>
              <BackLink/>
            </div>
          </div>
        </div>
        <div>
          <div className=''>
            <div className='self-end h-8 w-8 flex justify-center border-gray-500 border rounded-lg ml-2 bg-header'>
              <button>
                <img src="/kebab.png" alt="" width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackFile